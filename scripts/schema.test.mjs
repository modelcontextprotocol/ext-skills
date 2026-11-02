import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  checkDeclarations,
  codeBlocks,
  schemaPath,
  validateExamples,
  validators,
} from "./schema.mjs";

const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const validate = validators(schema);
const markdown = readFileSync(
  new URL("../specification/beta/skills.mdx", import.meta.url),
  "utf8",
);
const types = readFileSync(
  new URL("../schema/beta/schema.ts", import.meta.url),
  "utf8",
);
const jsonExamples = codeBlocks(markdown)
  .filter((block) => block.lang === "json")
  .map((block) => JSON.parse(block.value));
const fixture = (name) =>
  JSON.parse(
    readFileSync(new URL(`fixtures/${name}.json`, import.meta.url), "utf8"),
  );

test("every documented interface has a usable definition", () => {
  const names = checkDeclarations(markdown, types);
  assert.equal(names.length, 13);
  for (const name of names) assert.equal(typeof validate(name), "function");
});

test("all 16 published JSON examples validate, including the message flow and errors", () => {
  assert.equal(validateExamples(markdown, schema), 16);
});

test("directory result: files and directories are valid", () => {
  assert.equal(
    validate("ReadResourceDirectoryResult")(fixture("directory-result")),
    true,
  );
});

for (const [name, field] of [
  ["directory-result-missing-ttl", "ttlMs"],
  ["directory-result-missing-cache-scope", "cacheScope"],
]) {
  test(`directory result rejects ${field} omission (issue #158)`, () => {
    const check = validate("ReadResourceDirectoryResult");
    assert.equal(check(fixture(name)), false);
    assert.ok(
      check.errors.some((error) => error.params.missingProperty === field),
    );
  });
}

for (const [name, result] of [
  ["ListSkillsResult", jsonExamples[1].result],
  ["GetSkillResult", jsonExamples[3].result],
  ["ReadResourceDirectoryResult", fixture("directory-result")],
]) {
  for (const field of ["ttlMs", "cacheScope", "resultType"]) {
    test(`${name} requires inherited ${field}`, () => {
      const invalid = structuredClone(result);
      delete invalid[field];
      assert.equal(validate(name)(invalid), false);
      assert.equal(
        validate(`${name}Response`)({ jsonrpc: "2.0", id: 1, result: invalid }),
        false,
      );
    });
  }
}

for (const name of [
  "ListSkillsRequest",
  "GetSkillRequest",
  "ReadResourceDirectoryRequest",
]) {
  const method = {
    ListSkillsRequest: "skills/list",
    GetSkillRequest: "skills/get",
    ReadResourceDirectoryRequest: "resources/directory/read",
  }[name];
  const request = jsonExamples.find((message) => message.method === method);
  for (const field of [
    "_meta",
    "io.modelcontextprotocol/protocolVersion",
    "io.modelcontextprotocol/clientCapabilities",
  ]) {
    test(`${name} requires ${field}`, () => {
      const invalid = structuredClone(request);
      if (field === "_meta") delete invalid.params._meta;
      else delete invalid.params._meta[field];
      assert.equal(validate(name)(invalid), false);
    });
  }
  test(`${name} preserves optional base clientInfo`, () => {
    const valid = structuredClone(request);
    delete valid.params._meta["io.modelcontextprotocol/clientInfo"];
    assert.equal(validate(name)(valid), true);
  });
}

test("cache values preserve the base protocol's enum and numeric constraints", () => {
  const check = validate("ReadResourceDirectoryResult");
  const result = fixture("directory-result");
  for (const ttlMs of [-1, 0.5, "300000", null])
    assert.equal(check({ ...result, ttlMs }), false);
  for (const cacheScope of ["shared", 1, null])
    assert.equal(check({ ...result, cacheScope }), false);
  assert.equal(
    check({ ...result, ttlMs: 0, cacheScope: "private", nextCursor: "opaque" }),
    true,
  );
});

test("skill manifests allow dynamic content and arbitrary frontmatter fields", () => {
  const skill = structuredClone(jsonExamples[3].result.skill);
  skill.frontmatter.metadata = { "vendor.example/extra": [true, 1, null] };
  assert.equal(validate("Skill")(skill), true);
  assert.equal(validate("Skill")({ ...skill, resources: "dynamic" }), true);
  for (const resources of [null, "static", {}, 1]) {
    assert.equal(validate("Skill")({ ...skill, resources }), false);
  }
  delete skill.frontmatter.name;
  assert.equal(validate("Skill")(skill), false);
});

test("type drift fails even when both sources still compile", () => {
  assert.throws(
    () =>
      checkDeclarations(
        markdown,
        types.replace("size: number", "size: string"),
      ),
    /SkillResource/,
  );
  assert.throws(
    () =>
      checkDeclarations(
        markdown,
        types + "\nexport interface NewType { value: string }",
      ),
    /NewType/,
  );
  assert.throws(
    () =>
      checkDeclarations(
        markdown.replaceAll("extends CacheableResult", ""),
        types,
      ),
    /GetSkillResult/,
  );
});

test("formatting, exports, and comments do not cause false drift failures", () => {
  assert.doesNotThrow(() =>
    checkDeclarations(
      markdown,
      types
        .replaceAll("export interface ", "interface  ")
        .replace("size: number;", "size : number ; // comment"),
    ),
  );
});

test("schema-relevant JSDoc and new type aliases cannot drift silently", () => {
  assert.throws(
    () =>
      checkDeclarations(
        markdown,
        types.replace("size: number;", "/** @minimum 1 */\nsize: number;"),
      ),
    /SkillResource/,
  );
  assert.throws(
    () =>
      checkDeclarations(
        markdown,
        types.replace("size: number;", "/** @deprecated */\nsize: number;"),
      ),
    /SkillResource/,
  );
  assert.throws(
    () =>
      checkDeclarations(markdown, types + '\nexport type ExtraType = "extra";'),
    /ExtraType/,
  );
});

test("a malformed documented response fails with a source location", () => {
  const invalid = markdown.replaceAll(
    '"cacheScope": "public"',
    '"cacheScope": "unknown"',
  );
  assert.throws(
    () => validateExamples(invalid, schema),
    /skills\.mdx:\d+ \(ListSkillsResultResponse\)/,
  );
});

test("missing or unmapped examples cannot silently pass", () => {
  assert.throws(() => validateExamples("", schema), /No JSON examples/);
  assert.throws(
    () => validateExamples('```json\n{"method":"skills/new"}\n```', schema),
    /Unmapped example method/,
  );
  assert.throws(
    () => validateExamples('```json\n{"result":{}}\n```', schema),
    /Cannot associate/,
  );
  assert.throws(
    () => validateExamples("```json\n{broken}\n```", schema),
    /skills\.mdx:1/,
  );
  assert.throws(() =>
    checkDeclarations("```typescript\ninterface {\n```", types),
  );
});
