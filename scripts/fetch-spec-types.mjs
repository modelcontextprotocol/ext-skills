import { writeFileSync } from "node:fs";

// Repinning is an explicit, reviewed change. Generation and CI never fetch HEAD.
const commit = "d0e246ea3c69eafaa2806bc4cd28025703ba2c2b";
const repository = "modelcontextprotocol/modelcontextprotocol";
const path = "schema/2026-07-28/schema.ts";
const source = `https://github.com/${repository}/blob/${commit}/${path}`;
const header = `/**
 * Vendored from the MCP base protocol revision 2026-07-28.
 * Source: ${source}
 * Upstream license notice: spec.LICENSE. Do not edit manually.
 */
`;

async function fetchFile(path) {
  const response = await fetch(
    `https://raw.githubusercontent.com/${repository}/${commit}/${path}`,
  );
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.text();
}

// Fetch both before writing either so a network failure cannot mix revisions.
const [types, license] = await Promise.all([
  fetchFile(path),
  fetchFile("LICENSE"),
]);
writeFileSync(
  new URL("../schema/beta/spec.types.ts", import.meta.url),
  header + types,
);
writeFileSync(new URL("../schema/beta/spec.LICENSE", import.meta.url), license);
console.log(`Vendored base types and license from ${commit}`);
