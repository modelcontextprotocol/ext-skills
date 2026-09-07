# Experimental Findings

> ℹ️ **This document is not actively maintained.** It captures a snapshot of early findings. Current discussion and decisions are tracked in the [meeting notes discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/categories/meeting-notes-skills-over-mcp-wg), [Discord #skills-over-mcp-wg](https://discord.com/channels/1358869848138059966/1464745826629976084), and on the [SEP-2640 PR](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2640).

> **Contributing findings?** Start with the [experimental findings template](findings-template.md).

## VS Code: MCP-served skills as agent skills (Issue #66)

> Written against the pre-v1 draft (August 2026). The index format, `type: "skill-md"`, archive entries, and resource templates discussed below belong to that draft; v1 replaced the index with `skills/list`/`skills/get`, dropped archives and template entries (decision log, 2026-07-16), and makes digest verification a host MUST.

**Implementation:** [tobi-oye/vscode#1](https://github.com/tobi-oye/vscode/pull/1) — on a [microsoft/vscode](https://github.com/microsoft/vscode) fork (personal exploration, not submitted upstream)

Added `skill://` discovery to VS Code and verified it against the [Hugging Face MCP server](https://github.com/huggingface/hf-mcp-server) (`https://huggingface.co/mcp`). VS Code discovered 8 skills and offered them to the model with no manual attachment.

**Findings:**

- **VS Code already had the whole progressive-disclosure loop; it just had no MCP source.** `findAgentSkills()` → `name`/`description` into a `<skills>` block → a model-facing `skill` tool. Same shape as [skillsdotnet](https://github.com/PederHP/skillsdotnet)'s `SkillCatalog`. Only the MCP origin was missing.
- **The loading half needed no code.** `mcp-resource://` is already registered with VS Code's `IFileService`, so mapping `skill://…/SKILL.md` onto it is enough — the existing skill tool reads it and each read becomes a `resources/read`. "Treat filesystem and MCP skills identically" falls out for free.
- **The index wire format had already moved past the checked-in draft.** The live server serves `{url, digest, frontmatter:{name, description}}`; the draft here specifies top-level `name`/`description` and a required `type: "skill-md"`. A parser written to the draft matches **zero** entries on a real server. Accepting both shapes is three lines.
- **Per-context-computation discovery is an accidental DoS.** `findAgentSkills()` runs on every context rebuild; discovery is two round trips per server. A naive version issued 20 index reads for one chat turn. Same shape as the incident behind hf-mcp-server's client denylist ([#164](https://github.com/huggingface/hf-mcp-server/pull/164), ~100k req/min). Cache the *promise*, keyed on connection state — not just server id, or a lookup made while a server was stopped pins an empty result.
- **Cross-server name collisions are unspecified.** Skill names are a flat namespace. The SEP ties the final URI segment to the frontmatter `name` but says nothing about two servers both serving `deploy`. Local-over-MCP is defensible; MCP-vs-MCP degenerates to discovery order. **Worth an explicit note in the SEP.**
- **Provenance reaches the UI but not the model.** The `<skills>` block emits only `<name>`, `<description>`, `<file>` — and `<file>` encodes an opaque server id. Loading is never ambiguous, but a model reasoning across servers has no legible origin signal.
- **Archives cost 17 of 25 skills.** Archive-only entries have no `url` to a `SKILL.md`, so a resource-reading host skips them. Archives were removed from SEP-2640 (decision log, 2026-07-16); until servers follow, such hosts see a fraction of what is offered.
- **Adding a skill source touched four type surfaces** that must agree (storage enum, a parallel source union, an ext-host DTO, a proposed API type). Missing two produced a runtime throw that broke chat while `tsc` stayed green.
- **Identifying skills by URL alone was enough ([#54](https://github.com/modelcontextprotocol/experimental-ext-skills/issues/54)).** `skill://` prefix plus `/SKILL.md` suffix, no `_meta` read — a two-line filter with nothing to negotiate. Because the last path segment must match the skill name, the name is readable off the URL, so a picker fills without fetching every `SKILL.md`. The tradeoff is that a URL carries no structured metadata; tags, versions or provenance would still need `_meta`.
- **The index ships a `digest` that this client ignores.** The live server sends `sha256:` per entry; nothing here verifies it, so a corrupted or swapped skill loads silently. fast-agent does check it. Worth settling whether verification is the host's job — the draft currently leans on it being "the transport's concern over an authenticated MCP connection".

**Verification:** `tsc` clean; 10 unit tests (incl. `skill://` → `mcp-resource://` round trip and index parsing against verbatim live output); 112 existing promptSyntax tests pass; discovery confirmed against the live server.

**Note:** none of the three defects above were caught by type-checking or unit tests — all surfaced only from running against a real server.

**Open:**

- **Model invocation not demonstrated.** Discovery and contribution are confirmed; no run yet shows the model choosing to load an MCP-served skill. Confounded by source builds being unable to reach the Copilot service (OSS `product.json` ships no OAuth client config) and by a small auto-routed model. Consistent with the adherence problems recorded elsewhere on this page.
- Resource templates parsed but not materialized (need the completion API).
- No `resources/subscribe`, so mid-session skill updates are missed.

## Transport of an `io.modelcontextprotocol/` frontmatter `metadata` key over SEP-2640 (Issue #126, item 4)

**Date:** 2026-09-03

**Implementation:**

- **Repository (server):** [tobi-oye/skills-over-mcp-demo](https://github.com/tobi-oye/skills-over-mcp-demo), branch [`experiment/io-mcp-metadata-namespace`](https://github.com/tobi-oye/skills-over-mcp-demo/tree/experiment/io-mcp-metadata-namespace) at [`bb21190`](https://github.com/tobi-oye/skills-over-mcp-demo/commit/bb21190820a6b5f71462b657b0cbb48ae3b1070f) — one commit on top of [olaservo/skills-over-mcp-demo](https://github.com/olaservo/skills-over-mcp-demo) `main` at [`abf2262`](https://github.com/olaservo/skills-over-mcp-demo/commit/abf22626e4390d2d072e7fa2dcba194f302299aa). Serves skills with [`@olaservo/ext-skills`](https://www.npmjs.com/package/@olaservo/ext-skills) 0.13.0 on the v2 TypeScript SDK.
- **Repository (host):** [tobi-oye/vscode](https://github.com/tobi-oye/vscode), branch [`experiment/io-mcp-metadata-namespace`](https://github.com/tobi-oye/vscode/tree/experiment/io-mcp-metadata-namespace) at [`3af5423`](https://github.com/tobi-oye/vscode/commit/3af54231743), a [microsoft/vscode](https://github.com/microsoft/vscode) fork. Two commits above `feature/sep2640-content-binding` ([PR #3](https://github.com/tobi-oye/vscode/pull/3)) at [`d913b5a`](https://github.com/tobi-oye/vscode/commit/d913b5a7480fddd956a2aa988ee0ec9102424c9d): [`4d9bf00`](https://github.com/tobi-oye/vscode/commit/4d9bf00a126) adds frontmatter identity verification at read time and listing-cache handling, and [`3af5423`](https://github.com/tobi-oye/vscode/commit/3af54231743) is the experiment itself, isolated in one module and marked non-production.
- **Specification tested against:** [SEP-2640](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/sep/skills-extension/seps/2640-skills-extension.md) on the canonical `sep/skills-extension` branch at [`a3e147c`](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/a3e147ca2710f68214247aecc729731ee1ae8d03/seps/2640-skills-extension.md) (2026-08-25). Agent Skills specification at [`69ef37e`](https://github.com/agentskills/agentskills/blob/69ef37e9424c0a7ea9dd2293b559e43ec8176379/docs/specification.mdx).
- **Author:** Tobi Oyewole ([@tobi-oye](https://github.com/tobi-oye))
- **Relevant artifacts:** server fixture `skills/namespace-detection-demo/SKILL.md` and `src/metadata-namespace.test.ts`; host module `src/vs/workbench/contrib/mcp/common/mcpSkillMetadataNamespace.ts`, its hook in `mcpSkillDiscovery.ts`, and `src/vs/workbench/contrib/mcp/test/common/mcpSkillMetadataNamespace.test.ts`. Both experiment branches above are pushed at the commits given; those are the exact tested trees.

**Approach tested:** Not an approach from [approaches.md](approaches.md). This exercises one sentence of SEP-2640's [Frontmatter](sep-draft-skills-extension.md#frontmatter) rules — "keys prefixed with `io.modelcontextprotocol/` are reserved for metadata defined by MCP extensions … Implementations SHOULD ignore keys under this prefix that they do not recognize" — to produce working evidence for [#126](https://github.com/modelcontextprotocol/experimental-ext-skills/issues/126) item 4, the proposal to reserve the same prefix on the Agent Skills side.

The experimental frontmatter, exactly as served:

```yaml
---
name: namespace-detection-demo
description: Demonstrates transport of MCP-reserved Agent Skills metadata.
metadata:
  io.modelcontextprotocol/test-marker: "detected-by-vscode"
---
```

`io.modelcontextprotocol/test-marker` is a test fixture only. It is not a proposed property, it carries no production semantics, and nothing in either implementation acts on it beyond writing a log line.

**Setup:**

- **Clients tested:** Code - OSS Dev 1.133.0, source build of the host branch above, run interactively against the server over stdio. The same host code was also driven under the unit-test harness (`scripts/test.sh`, Electron renderer) for the cases the live run does not cover. Node 24.18.0.
- **Models tested:** None. By design no LLM is on the evidence path; protocol responses, assertions and deterministic logs are the evidence. The interactive session was used to observe discovery, not to prompt a model.
- **Configuration notes:** For the live run the server was launched by the host from a workspace `.vscode/mcp.json` (`type: stdio`, `node dist/index.js --dice-roller`, server name `skills-demo-local`), with `chat.useAgentSkills: true`. The host negotiated protocol `2025-11-25`. Server-side unit tests run in-process (the v2 SDK's `createMcpHandler` behind a `fetch` shim) and a separate stdio capture negotiated `2026-07-28`. macOS 25.5.0 arm64.

**What was tested:**

1. **Server, parsing:** the slash-containing key survives YAML parsing at discovery (`discoverSkills`), landing as a single object key rather than a nested path.
2. **Server, listing:** `skills/list` and `skills/get` return `frontmatter.metadata` unchanged.
3. **Server, retrieval:** `resources/read` of the `SKILL.md` still passes the client's digest and frontmatter identity checks.
4. **Host, live:** the running editor connected to the server, listed its skills, and recognized the key — the full path, one process pair, nothing captured or replayed in between.
5. **Host, four cases** (each: discovery succeeds; the detector's log output; the fetched `SKILL.md` still passes the host's frontmatter identity check, which gates loading):
   1. `io.modelcontextprotocol/test-marker: "detected-by-vscode"` present.
   2. Only `com.example/test-marker: "detected-by-vscode"` present.
   3. `io.modelcontextprotocol/unknown-test-key` present.
   4. No `metadata` field.

**Results:**

**What worked:** Everything listed above, including the live run end to end. No change to the Agent Skills reference parser, the `@olaservo/ext-skills` SDK, or VS Code's YAML parser was needed; the server change is a fixture directory plus tests, and the host change is one log-only module hooked in at discovery.

| # | Case | Discovery | Host log | Load (frontmatter identity) |
| :-- | :-- | :-- | :-- | :-- |
| 1 | `io.modelcontextprotocol/test-marker` = `detected-by-vscode` | succeeds | one `info` line, detection | passes |
| 2 | only `com.example/test-marker` | succeeds | nothing (detector does not activate) | passes |
| 3 | `io.modelcontextprotocol/unknown-test-key` | succeeds | one `trace` line, "ignoring 1 unrecognized … key(s)" | passes |
| 4 | no `metadata` | succeeds | nothing | passes |

Case 1 was confirmed both live and under test; cases 2–4 are unit tests. Test totals: server 7 new tests (28 total, all pass) and the existing stdio conformance suite passes with the fixture listed; host 13 new tests (41 total across the two skill test files, all pass).

**What didn't:** Nothing in scope failed.

**What was surprising:**

- **The detection line follows the wire call, not the context rebuild.** In the live session two `skills/list` calls produced two detection lines, but a third contribution of the same four skills to agent skills — 4.4 seconds after the first — produced none, because the host served that one from its listing cache without re-running discovery. Anything a host derives from reserved metadata therefore inherits the listing cache's lifetime, which is worth knowing for any future key that is meant to influence behaviour rather than just be logged.
- **The host's identity check makes a reserved key load-bearing whether or not the host understands it.** "Unrecognized" turned out to mean the host can read the key and its value but has no implementation for its semantics — which is not the same as leaving it out of verification. Three cases, all tested:

  | Listing vs fetched `SKILL.md` | Verification | Behaviour |
  | :-- | :-- | :-- |
  | Unrecognized key, same value in both | passes | none assigned |
  | Unrecognized key, value differs or is absent from the file | **fails**, skill does not load | none assigned |
  | Recognized key, same value in both | passes | host may then act on it |

  So "ignore keys you do not recognize" needs to say *do not interpret or act on them*, not *do not compare them*. Suggested SEP wording:

  > Implementations SHOULD NOT interpret or act on keys under this prefix that they do not recognize. They MUST still preserve those keys and include them in frontmatter identity verification.

  Without the second sentence a host could reasonably strip unknown reserved keys before comparing, which would let a server advertise one value and serve another unchallenged.
- `resources/read` from this server returns `contents[].uri` and `text` with no `mimeType`. Unrelated to the experiment, not investigated.

**Requirements or design questions addressed:**

- [#126](https://github.com/modelcontextprotocol/experimental-ext-skills/issues/126) item 4, the reservation agreed on 2026-06-16 ([meeting notes §2](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/2941)): shows the technical half is already satisfiable with shipped parsers and listings.
- Complements the `_meta` scoping decision in [decisions.md](decisions.md) ([PR #60](https://github.com/modelcontextprotocol/experimental-ext-skills/pull/60)) and the two-extension-point wording in the [glossary](glossary.md): this is the frontmatter `metadata` half, not `_meta`.

**Evidence and reproduction:**

**Live run.** The host started the server, negotiated `2025-11-25`, and received the extension declaration:

```
17:48:09.550  Starting server skills-demo-local
17:48:09.914  [server -> editor] "capabilities":{"resources":{"listChanged":true},
              "extensions":{"io.modelcontextprotocol/skills":{"directoryRead":true}} …
17:48:45.530  [editor -> server] {"jsonrpc":"2.0","id":3,"method":"skills/list","params":{}}
```

The entry that came back on the wire, verbatim:

```json
{
  "uri": "skill://namespace-detection-demo/SKILL.md",
  "frontmatter": {
    "name": "namespace-detection-demo",
    "description": "Demonstrates transport of MCP-reserved Agent Skills metadata.",
    "metadata": {
      "io.modelcontextprotocol/test-marker": "detected-by-vscode"
    }
  },
  "resources": [
    {
      "uri": "skill://namespace-detection-demo/SKILL.md",
      "digest": "sha256:e0a12713375870136ea66d96bde4b672e8cc6fa3a2f7a326b0c3be617003c9d9",
      "size": 875
    }
  ]
}
```

Four milliseconds later, the host's own log (`window1/renderer.log`) — the deterministic detection line, followed by the pre-existing discovery lines:

```
17:48:45.534 [info] [mcp-skills-experiment] io.modelcontextprotocol/test-marker detected on skill "namespace-detection-demo" from "skills-demo-local" (value "detected-by-vscode")
17:48:45.534 [info] [mcp-skills] "skills-demo-local" served 4 skill(s): tabletop-dice, mcp-glossary, namespace-detection-demo, release-notes-writer
17:48:45.534 [info] [mcp-skills] contributing 4 skill(s) to agent skills
17:48:49.932 [info] [mcp-skills] "skills-demo-local" served 4 skill(s): tabletop-dice, mcp-glossary, namespace-detection-demo, release-notes-writer
17:48:49.932 [info] [mcp-skills] contributing 4 skill(s) to agent skills
17:51:13.142 [info] [mcp-skills-experiment] io.modelcontextprotocol/test-marker detected on skill "namespace-detection-demo" from "skills-demo-local" (value "detected-by-vscode")
```

Method totals for the session: `initialize` ×1, `skills/list` ×2, `tools/list` ×1. The 17:48:49 pair has no detection line and no wire call behind it — that is the cached listing described above. The listing carried no `ttlMs`/`cacheScope`, since SEP-2549 scopes those to 2026-07-28+ and this host negotiates `2025-11-25`.

**Case 3's log line**, from the harness, for comparison:

```
[trace] [mcp-skills-experiment] ignoring 1 unrecognized io.modelcontextprotocol/ metadata key(s) on skill "unknown-reserved" from "skills-over-mcp-demo": io.modelcontextprotocol/unknown-test-key
```

Cases 2 and 4 produce no experiment output; the tests assert the captured log is empty.

**Server, on its own.** The fixture is on the experiment branch only — the public Space still serves the previous catalog. `skills/get` for the same URI returns an identical `frontmatter` object, and `resources/read` returns the `SKILL.md` whose 875 bytes hash to the listed digest.

```
git clone https://github.com/tobi-oye/skills-over-mcp-demo && cd skills-over-mcp-demo
git checkout experiment/io-mcp-metadata-namespace
npm ci
npm test          # vitest: src/metadata-namespace.test.ts
npm run smoke     # builds, then runs the stdio conformance checks (fixture must be listed)
```

**Host, live.** Build the fork, point a workspace at the built server, and open it:

```
git clone --filter=blob:none https://github.com/tobi-oye/vscode && cd vscode
git checkout experiment/io-mcp-metadata-namespace
npm ci && npm run transpile-client
./scripts/code.sh /path/to/workspace
```

with `.vscode/mcp.json` in that workspace:

```json
{
  "servers": {
    "skills-demo-local": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/skills-over-mcp-demo/dist/index.js", "--dice-roller"]
    }
  }
}
```

Set `chat.useAgentSkills: true`, start the server from the MCP view, and open a chat so skills are contributed to context. The detection line appears in the window log:

```
tail -f "$(ls -dt ~/Library/Application\ Support/code-oss-dev/logs/* | head -1)/window1/renderer.log" | grep mcp-skills
```

**Host, remaining cases:**

```
./scripts/test.sh --run src/vs/workbench/contrib/mcp/test/common/mcpSkillMetadataNamespace.test.ts
```

**Limitations:**

- **The live run covered discovery, not loading.** No `resources/read` was issued, so the "still loads" column rests on the tests and the server-side verified read.
- **Only case 1 ran live.** The other three are unit tests against the same discovery entry point.
- **The live host negotiated `2025-11-25`.** The 2026-07-28 listing attributes (`ttlMs`, `cacheScope`) were exercised server-side only.
- **Two YAML parsers were exercised** — VS Code's and the `yaml` npm package — with string values only. Other parsers may treat a key containing `.` and `/` differently.

**What this does and does not show:**

- It shows that transport, preservation and host recognition of an `io.modelcontextprotocol/`-prefixed frontmatter `metadata` key are technically possible today, end to end in a running host, with no parser changes.
- It does **not** by itself show that the namespace should be reserved. Reservation is a governance and interoperability decision for the Agent Skills project.
- `io.modelcontextprotocol/test-marker` is not a proposed production property.
- This concerns `SKILL.md` frontmatter `metadata`, not MCP protocol `_meta`.
- The existing `io.modelcontextprotocol.skills/` convention for `_meta` on skill resources ([skill-meta-keys.md](skill-meta-keys.md)) is a separate mechanism and is unaffected.

**Sources and attribution:** Server and SDK by [Ola Hungerford](https://github.com/olaservo). Fixture, tests, host module and this write-up by [Tobi Oyewole](https://github.com/tobi-oye), drafted with Claude Code (Anthropic) and reviewed by the author. Motivating discussion: [#126](https://github.com/modelcontextprotocol/experimental-ext-skills/issues/126) by [@olaservo](https://github.com/olaservo).

---

## McpGraph: Skills in MCP Server Repo

**Date:** Not documented

**Implementation:**

- **Repository:** [TeamSparkAI/mcpGraph](https://github.com/TeamSparkAI/mcpGraph)
- **Author:** Bob Dickinson
- **Relevant artifacts:** [mcpgraphtoolkit/SKILL.md](https://github.com/TeamSparkAI/mcpGraph/blob/main/skills/mcpgraphtoolkit/SKILL.md) (875+ lines)

**Approach tested:** Related to [Approach 5: Server Instructions Reference](approaches.md#5-server-instructions-reference). The standalone skill lives beside the MCP server but is not formally connected to it.

**Setup:**

- **Clients tested:** Claude; specific client not documented
- **Models tested:** Not documented
- **Configuration notes:** The skill teaches agents to build directed graphs of MCP nodes and orchestrate tool calls

**What was tested:** Whether an agent discovers and follows a colocated skill before attempting to use the server tools.

**Results:**

- **What worked:** Adding a server instruction that told the agent to read the skill before using the tool caused Claude to load it reliably
- **What didn't:** Claude initially ignored the skill even when the skill and server had similar descriptions, and only read it after failing to use the server tools
- **What was surprising:** A single server instruction changed the loading order reliably

**Requirements or design questions addressed:** Reliable skill discovery and loading, and whether server instructions can connect an MCP server to colocated skill guidance.

**Evidence and reproduction:** These are community-reported observations; the client version, model version, and runnable reproduction are not documented.

**Limitations:**

- This workaround works for 1:1 skill-to-server case, but doesn't solve discovery — users installing from a registry don't know to also install the skill
- Distinguishes between "skill required to make the server work at all" vs. "skill that orchestrates tools you could use without it" — potentially different solutions needed

## Skilljack MCP

**Repo:** [olaservo/skilljack-mcp](https://github.com/olaservo/skilljack-mcp)

Loads skills into tool descriptions. Uses dynamic tool updates to keep the skills manifest current.

Example eval approach and observations here: https://github.com/olaservo/skilljack-mcp/blob/main/evals/README.md

## FastMCP 3.0 Skills Support

**URL:** [gofastmcp.com/servers/providers/skills](https://gofastmcp.com/servers/providers/skills)

FastMCP added skills support in version 3.0. Worth examining for alignment with other approaches.

**Update model comparison (Feb 26 office hours):**

- FastMCP supports more of a "pull" model for updating resources that have changed
- The skills-as-resources implementation in this repo ([PR #16](https://github.com/modelcontextprotocol/experimental-ext-skills/pull/16)) watches for changes and allows clients to subscribe to resources via `resources/subscribe` and `resources/updated` notifications — more of a "push" model
- Both models are worth evaluating; the right choice is likely use-case specific

**Related:** [jlowin/fastmcp#2694](https://github.com/jlowin/fastmcp/issues/2694)

## PydanticAI Skills Support

**PR:** [pydantic/pydantic-ai#3780](https://github.com/pydantic/pydantic-ai/pull/3780)

Introduces support for agent skills with a tools-based approach.

## NimbleBrain: skill:// Resource Consolidation

**Date:** Not documented

**Implementation:**

- **Repositories:** [mcp-ipinfo](https://github.com/NimbleBrainInc/mcp-ipinfo), [mcp-webfetch](https://github.com/NimbleBrainInc/mcp-webfetch), [mcp-pdfco](https://github.com/NimbleBrainInc/mcp-pdfco), [mcp-folk](https://github.com/NimbleBrainInc/mcp-folk), and [mcp-brave-search](https://github.com/NimbleBrainInc/mcp-brave-search)
- **Author:** [Mat Goldsborough](https://github.com/mgoldsborough) (NimbleBrain)
- **Relevant artifacts:** Atomic MCP server repositories with skills exposed as `skill://` resources

**Approach tested:** [Approach 3: Skills as Tools and/or Resources](approaches.md#3-skills-as-tools-andor-resources).

**Setup:**

- **Clients tested:** Not documented
- **Models tested:** Not documented
- **Configuration notes:** Previously separate MCP server code, skills, and `server.json` registry metadata were consolidated into one repository per server

**What was tested:** Whether colocating skills with their MCP servers and exposing them as resources simplifies distribution while preserving or improving agent results.

**Results:**

- **What worked:** Consolidating the artifacts simplified build, versioning, and deployment; skills ship atomically with the tools they describe
- **What worked:** `skill://` resources provided ephemeral availability without git cloning or client-side file-system access
- **What worked:** Quick tests produced the same or better results than injecting skills before the LLM call
- **What didn't:** Not documented
- **What was surprising:** Not documented

**Requirements or design questions addressed:** Installless skill availability, provenance through colocation, atomic versioning, and reuse of existing MCP resource primitives.

**Evidence and reproduction:** The linked repositories are reference implementations. The comparison with upstream skill injection was reported through community discussion; a test procedure and quantitative results are not documented.

**Limitations:** Client versions, model versions, test cases, and evaluation criteria are not documented, so the result cannot yet be reproduced precisely.

**Sources and attribution:**

> "Skills living as skill:// resources on the server itself was the natural endpoint of that consolidation. The skill context is colocated with the tools it describes, versioned together, shipped together." — [Mat Goldsborough](https://github.com/mgoldsborough) (NimbleBrain), via Discord

## Skill Reliability and Adherence

Multiple community members have independently reported that models do not reliably load or follow skill instructions, even when skills are preloaded in context. This is a cross-cutting behavioral problem, not specific to any single implementation approach.

**Findings:**

- Models appear to frequently ignore available skills, requiring hooks or repeated prompting to trigger skill loading
- Skill adherence appears to be "time-decaying" similar to other model instructions — models follow instructions initially but lose adherence as the context window grows and compaction occurs
- Behavior is model-specific: weaker models show lower success rates with lazy-loaded skills
- One effective workaround observed by Kryspin: wrapping skills in a subagent whose name or description mentions the skill topic
- Community desire for "skill autoloads" and "dynamic memory autoloads" as design patterns

**Community input:**

> "Even Opus 4.6 needs to be constantly bugged to load skills when they're preloaded in the context already. I actually have a hook that reminds it to load skills and it still just doesn't a lot of the time." — Luca (AWS), via Discord

> "I also have this problem with skills: they're useful… when used. Which isn't nearly often enough." — Jeremiah (FastMCP), via Discord

> "Skills are ephemeral and/or time decaying — it clicks once and then give it some time and they lose the plot." — Kryspin (qcompute), via Discord

> "I've seen lazy load skills with various degrees of success, actually looks like it might be model specific… [best pattern is] putting them in with a subagent that similarly named or mentions the topic in their description." — Kryspin (qcompute), via Discord

**See also:** [#37](https://github.com/modelcontextprotocol/experimental-ext-skills/issues/37) — Compare skill delivery mechanisms: file-based vs MCP-based

## PHP MCP SDK + Symfony AI Mate: Skills as `skill://` resources

> Written against the pre-v1 draft (June 2026). References to `skill://index.json`, `resource_templates/list`, and `mcp-resource-template` entries describe that draft; v1 replaced the index with `skills/list`/`skills/get` and dropped template entries (decision log, 2026-07-16).

**Server / SDK:** [modelcontextprotocol/php-sdk#372](https://github.com/modelcontextprotocol/php-sdk/pull/372) — adds `io.modelcontextprotocol/skills` support to the official PHP MCP SDK
**Consumer:** [symfony/ai#2132](https://github.com/symfony/ai/pull/2132) — ships Agent Skills in the Symfony AI "Mate" MCP server
**Contributor:** Johannes Wachter ([@wachterjohannes](https://github.com/wachterjohannes))

First PHP-ecosystem implementation of SEP-2640 (prior documented implementations are
Python/TS). The SDK PR adds a one-line server affordance — `addSkillsFromDirectory()` —
that walks a directory, registers each `SKILL.md` and its supporting files as `skill://`
resources, derives `name`/`description` from YAML frontmatter, enforces the spec's
final-path-segment ↔ frontmatter-`name` rule, guards against path traversal, and serves
a `skill://index.json` discovery index. The Mate PR ships two real skills colocated with
the tools they orchestrate, including a multi-file skill with a `references/` subdirectory.

**Tested (works):**

- Serving is covered by MCP Inspector **stdio snapshot tests**: `resources/list`,
  `resources/read` of a `SKILL.md`, of a supporting file, and of `skill://index.json`,
  plus `resource_templates/list`. Unit tests cover frontmatter parsing (BOM/CRLF,
  non-mapping rejection), the name↔segment rule, and resource-name sanitization. PHPStan
  level 6 and the full suite (792 tests) green.
- The **directory model + relative supporting-file URIs** resolve correctly in a
  non-Python implementation — e.g. `skill://code-review/references/SECURITY.md` is a
  sibling resource of `skill://code-review/SKILL.md`. Positive evidence the directory
  model travels across ecosystems.

**`_meta` prefix — independent convergence (not a gap).** Our SDK independently chose
`io.modelcontextprotocol.skills/` to namespace extra frontmatter fields on the resource
descriptor — which matches the prefix SEP-2640 recommends ("When `_meta` keys are used for
skill resources, implementations SHOULD use the `io.modelcontextprotocol.skills/`
reverse-domain prefix"). Useful corroboration of the recommended prefix. Note: the
working-group repo-local draft ([`docs/sep-draft-skills-extension.md`](sep-draft-skills-extension.md))
does not yet include that sentence — its `_meta` paragraph ends at "…via the resource's
`_meta` object." — so the SEP PR and this repo's copy have drifted and could be synced.
(Discussed on [SEP-2640](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2640#issuecomment-4622668503).)

**SDK implementation notes (not spec gaps):**

- **Resource-name uniqueness, not charset.** The skill `name` charset (`[a-z0-9-]`, ≤64, no
  leading/trailing hyphen) is a strict subset of the MCP resource-name charset, so the
  SKILL.md resource `name` can carry the frontmatter `name` directly — "resource `name`
  SHOULD equal frontmatter `name`" is satisfiable. The wrinkle is uniqueness: our SDK
  registers every resource under a unique name key, including a skill's **supporting files**
  (`references/SECURITY.md`) and skills that **share a frontmatter `name` under different
  prefixes** (`acme/billing/refunds` vs `acme/support/refunds`). So we derive a unique name
  from the URI path and keep the frontmatter `name` in `title`. Identity is the URI
  regardless — an SDK registration detail, not a SEP issue.
- **Empty-payload capability serialization trap.** An extension advertising an empty `{}`
  payload (as Skills does) serialized to `[]` rather than `{}` and had to be coerced. A
  likely footgun for any SDK implementing an empty-payload extension.
- **`symfony/yaml` required** for frontmatter parsing — the feature is non-functional
  without a YAML parser; frontmatter handling is a real dependency, not free.

**Client consumption (observed from docs, not yet eval'd):**

- Per current **Claude Code** documentation (June 2026), Claude Code loads skills from the
  filesystem and plugins only; it does not discover or load MCP-served `skill://` resources
  as skills, and its MCP resource support is **user-`@`-mention attachments, not
  model-driven `resources/read`**. So end-to-end, model-driven consumption of MCP-served
  skills is not exercisable in Claude Code today — a data point for
  [#38](https://github.com/modelcontextprotocol/experimental-ext-skills/issues/38).
- **FastMCP 3.0** (per this repo's existing findings) is the consumer best positioned to
  validate the serving half against; not yet done.

**Remaining / untested:**

- No model-adherence eval yet comparing filesystem vs. `skill://` delivery.
- `mcp-resource-template` skill type (parameterized namespaces) is deferred in the SDK PR —
  the `SkillType` enum carries the value for forward-compat, but only `skill-md` entries are
  emitted; the template path is unimplemented and untested.
- Not yet tested against any client that implements model-driven `skill://` loading.
