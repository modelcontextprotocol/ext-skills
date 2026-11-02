import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { fromMarkdown } from "mdast-util-from-markdown";
import * as TJS from "typescript-json-schema";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = new URL("../", import.meta.url);
export const schemaPath = new URL("schema/beta/schema.json", root);
const typesPath = new URL("schema/beta/schema.ts", root);
const specPath = new URL("specification/beta/skills.mdx", root);
export const schemaId =
  "https://modelcontextprotocol.io/ext-skills/beta/schema.json";
const methods = new Map([
  ["skills/list", "ListSkills"],
  ["skills/get", "GetSkill"],
  ["resources/directory/read", "ReadResourceDirectory"],
  ["resources/read", "ReadResource"],
]);

export function codeBlocks(markdown) {
  const blocks = [];
  function visit(node) {
    if (node.type === "code") blocks.push(node);
    for (const child of node.children ?? []) visit(child);
  }
  visit(fromMarkdown(markdown));
  return blocks;
}

// Ignore formatting/prose comments, but preserve tags used by schema generators.
export function declarations(source) {
  const ts = TJS.ts;
  const file = ts.createSourceFile(
    "schema.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
  );
  if (file.parseDiagnostics.length) {
    throw new Error(
      ts.flattenDiagnosticMessageText(
        file.parseDiagnostics[0].messageText,
        "\n",
      ),
    );
  }
  const printer = ts.createPrinter({ removeComments: true });
  const result = new Map();
  for (const node of file.statements) {
    if (!ts.isInterfaceDeclaration(node) && !ts.isTypeAliasDeclaration(node))
      continue;
    if (result.has(node.name.text))
      throw new Error(`Duplicate type ${node.name.text}`);
    const declaration = ts.isInterfaceDeclaration(node)
      ? ts.factory.updateInterfaceDeclaration(
          node,
          undefined,
          node.name,
          node.typeParameters,
          node.heritageClauses,
          node.members,
        )
      : ts.factory.updateTypeAliasDeclaration(
          node,
          undefined,
          node.name,
          node.typeParameters,
          node.type,
        );
    const tags = [];
    function collectTags(child, path = "") {
      for (const tag of ts.getJSDocTags(child)) {
        const comment =
          typeof tag.comment === "string"
            ? tag.comment
            : (tag.comment ?? []).map((part) => part.text).join("");
        tags.push([path, tag.tagName.text, comment]);
      }
      let index = 0;
      ts.forEachChild(child, (next) => {
        if (next.kind !== ts.SyntaxKind.ExportKeyword)
          collectTags(next, `${path}/${index++}`);
      });
    }
    collectTags(node);
    result.set(
      node.name.text,
      printer.printNode(ts.EmitHint.Unspecified, declaration, file) +
        JSON.stringify(tags),
    );
  }
  if (!result.size) throw new Error("No type declarations found");
  return result;
}

export function checkDeclarations(markdown, types) {
  const documented = declarations(
    codeBlocks(markdown)
      .filter((block) => block.lang === "typescript")
      .map((block) => block.value)
      .join("\n"),
  );
  const published = declarations(types);
  if (!isDeepStrictEqual(documented, published)) {
    const names = new Set([...documented.keys(), ...published.keys()]);
    const changed = [...names].filter(
      (name) => documented.get(name) !== published.get(name),
    );
    throw new Error(`Specification/types drift: ${changed.join(", ")}`);
  }
  return [...published.keys()];
}

// The generator puts definitions at the root. Rewrite reference values only:
// global text replacement also corrupts properties called "definitions" and
// string constants containing "#/definitions/".
export function modernSchema(generated) {
  function references(value) {
    if (Array.isArray(value)) return value.map(references);
    if (value === null || typeof value !== "object") return value;
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        [
          "properties",
          "patternProperties",
          "$defs",
          "definitions",
          "dependentSchemas",
        ].includes(key)
          ? Object.fromEntries(
              Object.entries(child).map(([name, schema]) => [
                name,
                references(schema),
              ]),
            )
          : ["const", "enum", "default", "examples"].includes(key)
            ? child
            : key === "$ref" && typeof child === "string"
              ? child.replace(/^#\/definitions\//, "#/$defs/")
              : references(child),
      ]),
    );
  }
  const { definitions, ...rest } = generated;
  return { ...references(rest), $defs: references(definitions) };
}

export function generateSchema(names) {
  const program = TJS.getProgramFromFiles([fileURLToPath(typesPath)], {
    strictNullChecks: true,
    skipLibCheck: true,
  });
  // Use the base protocol's generator and integer-number convention.
  const generator = TJS.buildGenerator(program, {
    required: true,
    defaultNumberType: "integer",
    skipLibCheck: true,
  });
  if (!generator) throw new Error("Cannot type-check the schema");
  // Include the base messages used in the specification's message-flow examples.
  const generated = generator.getSchemaForSymbols([
    ...names,
    "ReadResourceRequest",
    "ReadResourceResultResponse",
    "JSONRPCErrorResponse",
  ]);
  const modern = modernSchema(generated);
  delete modern.$schema;
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: schemaId,
    title: "MCP Skills Extension (Beta)",
    description:
      "Wire types for io.modelcontextprotocol/skills, based on MCP 2026-07-28. Validate a named $defs entry, not the schema container itself.",
    ...modern,
  };
}

export function validators(schema) {
  const ajv = new Ajv({ strict: false, allErrors: true });
  addFormats(ajv);
  ajv.addSchema(schema);
  return (name) => {
    const validate = ajv.getSchema(`${schema.$id}#/$defs/${name}`);
    if (!validate) throw new Error(`Missing schema definition: ${name}`);
    return validate;
  };
}

export function validateExamples(markdown, schema) {
  const getValidator = validators(schema);
  const requests = new Map();
  let count = 0;
  for (const block of codeBlocks(markdown).filter(
    (block) => block.lang === "json",
  )) {
    const location = `specification/beta/skills.mdx:${block.position.start.line}`;
    let message;
    try {
      message = JSON.parse(block.value);
    } catch (error) {
      throw new Error(`${location}: ${error.message}`);
    }
    let name;
    if ("method" in message) {
      const stem = methods.get(message.method);
      if (!stem)
        throw new Error(
          `${location}: Unmapped example method ${message.method}`,
        );
      name = `${stem}Request`;
      requests.set(message.id, stem);
    } else if ("error" in message) {
      name = "JSONRPCErrorResponse";
    } else if ("result" in message && requests.has(message.id)) {
      name = `${requests.get(message.id)}ResultResponse`;
    } else {
      throw new Error(`${location}: Cannot associate example with a schema`);
    }
    const validate = getValidator(name);
    if (!validate(message)) {
      throw new Error(
        `${location} (${name}): ${JSON.stringify(validate.errors)}`,
      );
    }
    // The base response union also includes InputRequiredResult, whose
    // resultType is not a literal discriminator. A complete response must
    // satisfy the success branch even if that permissive alternative matches.
    if (
      name === "ReadResourceResultResponse" &&
      message.result.resultType === "complete"
    ) {
      const validateResult = getValidator("ReadResourceResult");
      if (!validateResult(message.result)) {
        throw new Error(
          `${location} (ReadResourceResult): ${JSON.stringify(validateResult.errors)}`,
        );
      }
    }
    count++;
  }
  if (!count) throw new Error("No JSON examples found");
  return count;
}

function main() {
  const names = checkDeclarations(
    readFileSync(specPath, "utf8"),
    readFileSync(typesPath, "utf8"),
  );
  const content = JSON.stringify(generateSchema(names), null, 2) + "\n";
  const count = validateExamples(
    readFileSync(specPath, "utf8"),
    JSON.parse(content),
  );
  if (process.argv.includes("--write")) {
    writeFileSync(schemaPath, content);
    console.log("Generated schema/beta/schema.json");
  } else if (readFileSync(schemaPath, "utf8") !== content) {
    throw new Error("schema.json is out of date. Run npm run generate:schemas");
  }
  console.log(
    `Checked ${names.length} type declarations and ${count} JSON examples`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
