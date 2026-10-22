# Example Implementations

Example servers, SDKs, and hosts that serve or consume skills over MCP. Official client support is tracked on the [extension client matrix](https://modelcontextprotocol.io/extensions/client-matrix); this list is broader and community-maintained.

**Status:** `v1` implements the released extension · `partial` implements some of it · `pre-v1` targets an earlier draft · `prototype` fork or demo · `in progress` open PR · `planned` issue only. A link after the status points to the issue or PR tracking the work.

**Category:** `official` maintained by the MCP project · `community` individual or community project · unmarked rows are maintained by the organization behind the product

Implementations that predate the SEP are recorded in the archived [related work](archive/related-work.md) and are not repeated here.

To add or update a row, open a PR. Keep notes to one line.

## SDKs and frameworks

The TypeScript and Python SDKs have merged skills support but no release carries it yet; FastMCP shipped it in v4.1.3. Every `v1` server and host below built on a released official SDK registers `skills/list`, `skills/get`, and `resources/directory/read` as custom request handlers with hand-written schemas. The Inspector's [`skillsSchemas.ts`](https://github.com/modelcontextprotocol/inspector/blob/main/core/mcp/skillsSchemas.ts) is a worked example for TypeScript. Its comments record the pitfalls, including that a 2026-07-28 result schema must not require `resultType` because the SDK codec strips it before validation ([typescript-sdk#2789](https://github.com/modelcontextprotocol/typescript-sdk/issues/2789)).

| Implementation | Category | Language | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| [Go SDK](https://github.com/modelcontextprotocol/go-sdk) | `official` | Go | `in progress` ([#1238](https://github.com/modelcontextprotocol/go-sdk/pull/1238)) | Changes requested; filesystem provider in [#1240](https://github.com/modelcontextprotocol/go-sdk/pull/1240) |
| [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | `official` | TypeScript | `v1` ([#3047](https://github.com/modelcontextprotocol/typescript-sdk/pull/3047)) | Merged 2026-10-20 under `ext/skills` on the v2 packages; not in a release (latest 2.3.1). Tracking issue [#2798](https://github.com/modelcontextprotocol/typescript-sdk/issues/2798) |
| [Python SDK](https://github.com/modelcontextprotocol/python-sdk) | `official` | Python | `v1` ([#3485](https://github.com/modelcontextprotocol/python-sdk/pull/3485)) | Merged 2026-10-11, aligned with the 2026-10-15 spec change in [#3719](https://github.com/modelcontextprotocol/python-sdk/pull/3719); not in a release (latest v2.3.0). Filesystem provider requested in [#3683](https://github.com/modelcontextprotocol/python-sdk/issues/3683) |
| [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) | `official` | C# | `in progress` ([#1856](https://github.com/modelcontextprotocol/csharp-sdk/pull/1856)) | In review; [#1864](https://github.com/modelcontextprotocol/csharp-sdk/pull/1864) closed in its favour 2026-10-12 |
| [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) | `official` | Rust | `planned` ([ext-skills#155](https://github.com/modelcontextprotocol/ext-skills/issues/155)) | Community PR [#1286](https://github.com/modelcontextprotocol/rust-sdk/pull/1286) closed 2026-10-15; maintainers to write their own |
| [Java SDK](https://github.com/modelcontextprotocol/java-sdk) | `official` | Java | `in progress` ([#1141](https://github.com/modelcontextprotocol/java-sdk/pull/1141)) | Client APIs and stateless server support. Tracking issue [#1140](https://github.com/modelcontextprotocol/java-sdk/issues/1140) |
| [PHP SDK](https://github.com/modelcontextprotocol/php-sdk) | `official` | PHP | `in progress` ([#372](https://github.com/modelcontextprotocol/php-sdk/pull/372)) | Draft PR; server side, registers skills from a directory |
| [Ruby SDK](https://github.com/modelcontextprotocol/ruby-sdk) | `official` | Ruby | `planned` ([#568](https://github.com/modelcontextprotocol/ruby-sdk/issues/568)) | |
| [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) | `official` | Kotlin | `planned` ([#1020](https://github.com/modelcontextprotocol/kotlin-sdk/issues/1020)) | |
| [FastMCP SkillsProvider](https://gofastmcp.com/servers/providers/skills) | | Python | `v1` ([#5057](https://github.com/PrefectHQ/fastmcp/pull/5057)) | Experimental; in v4.1.3 (2026-10-20) with the directory provider from [#5704](https://github.com/PrefectHQ/fastmcp/pull/5704). Proxy forwarding in [#5788](https://github.com/PrefectHQ/fastmcp/pull/5788); tracking issue [#5016](https://github.com/PrefectHQ/fastmcp/issues/5016) |
| [mcpkit](https://github.com/panyam/mcpkit/tree/main/ext/skills) | `community` | Go | `v1` | Server and client, plus the `mcpskills` CLI. Passes the [conformance suite](https://github.com/modelcontextprotocol/conformance) server scenarios |
| [Tachyon](https://github.com/tachyonmcp/tachyon/tree/main/examples/mcp-skills) | | Java | `v1` | Self-reported 2026-09-14; requires clients to advertise the extension capability |

## Servers

| Implementation | Category | Language | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| [hf-mcp-server](https://github.com/huggingface/hf-mcp-server) | | TypeScript | `v1` | Hugging Face. `skills/list`, `skills/get`, `directoryRead`. HTTP transports only |
| [github-stars-contrib-mcp-server](https://github.com/svg153/github-stars-contrib-mcp-server) | `community` | Python | `v1` ([#144](https://github.com/modelcontextprotocol/ext-skills/issues/144)) | Passes the [conformance suite](https://github.com/modelcontextprotocol/conformance) server scenarios |
| [github-mcp-server](https://github.com/github/github-mcp-server/pull/3046) | | Go | `prototype` | Demo draft, not for merge; replaces [#2428](https://github.com/github/github-mcp-server/pull/2428), closed 2026-08-10 |
| [Brewale](https://brewale.dev/docs#skills-over-mcp) | | TypeScript | `v1` | Hosted. Org, project and personal skills with per-user access; `directoryRead`; passes the conformance server scenarios |
| [Cloudflare API MCP server](https://github.com/cloudflare/mcp) | | TypeScript | `v1` | Hosted. Serves the [cloudflare/skills](https://github.com/cloudflare/skills) repo, synced every six hours, with full manifests and no `directoryRead` ([#272](https://github.com/cloudflare/mcp/pull/272), shipped 2026-10-10) |
| [Outline](https://github.com/outline/outline) | | TypeScript | `v1` | Since v1.11.0 (2026-10-12); per-file digests and `skill://outline/...` URIs ([#13989](https://github.com/outline/outline/pull/13989)) |
| [Salesforce B2C DX MCP](https://github.com/SalesforceCommerceCloud/b2c-developer-tooling) | | TypeScript | `v1` | `@salesforce/b2c-dx-mcp` since 3.3.0 (2026-10-05) ([#731](https://github.com/SalesforceCommerceCloud/b2c-developer-tooling/pull/731)) |
| [Tableau MCP](https://github.com/tableau/tableau-mcp) | | TypeScript | `partial` | `skills/list` added in [#1015](https://github.com/tableau/tableau-mcp/pull/1015), in v4.27.2; also serves `skill://` resources |
| [DoiT MCP server](https://github.com/doitintl/doit-mcp-server) | | TypeScript | `v1` | Since [#345](https://github.com/doitintl/doit-mcp-server/pull/345) (2026-10-15), in v2.7.1 |
| [Google MCP Toolbox](https://github.com/googleapis/mcp-toolbox) | | Go | `v1` | Merged 2026-10-08 ([#4050](https://github.com/googleapis/mcp-toolbox/pull/4050)), not in a release (latest v1.14.0); docs in [#4119](https://github.com/googleapis/mcp-toolbox/pull/4119), [#4104](https://github.com/googleapis/mcp-toolbox/pull/4104) open |
| [OpenWork](https://github.com/different-ai/openwork) | | TypeScript | `v1` | Serves organization and plugin skills ([#6129](https://github.com/different-ai/openwork/pull/6129), 2026-10-18) |
| [Repliers MCP server](https://github.com/Repliers-io/mcp-server) | | JavaScript | `v1` | Serves its skills so that ChatGPT's tool scan imports them ([#26](https://github.com/Repliers-io/mcp-server/pull/26), 2026-10-19) |

## Hosts (including agent harnesses, IDEs, and web applications)

| Implementation | Category | Status | Notes |
| :--- | :--- | :--- | :--- |
| [fast-agent](https://github.com/evalstate/fast-agent/blob/main/docs/docs/mcp/skills-over-mcp.md) | `community` | `v1` | `/skills add` installs served skills after checking size, SHA-256 and frontmatter; first client to interoperate end-to-end with hf-mcp-server |
| [MCP Inspector](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md#skill-verification---verify) | `official` | `partial` | SEP-2640 support since 2.6.0 (2026-09-09), including CLI skill verification |
| [MCPJam Inspector](https://github.com/MCPJam/inspector) | | `v1` | App, CLI and SDK; verifies digests and frontmatter, namespaces skills by server; alignment with the final spec in [#6796](https://github.com/MCPJam/inspector/pull/6796) and [#6797](https://github.com/MCPJam/inspector/pull/6797) |
| [mcpc](https://github.com/apify/mcpc) | | `v1` | Apify's MCP CLI; `skills-list` and `skills-get` with size and SHA-256 checks since v0.7.0 (2026-09-23) |
| [ChatGPT plugins](https://developers.openai.com/plugins/build/mcp-server#import-skills-from-the-mcp-server) | | `partial` | Imports skills at plugin submission, static snapshot |
| [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) | | `partial` | .NET discovery on `main` ([#9198](https://github.com/microsoft/agent-framework/pull/9198), pagination in [#9464](https://github.com/microsoft/agent-framework/pull/9464)), not in a release |
| [vitehub](https://github.com/vite-hub/vitehub) | | `v1` | Installs the skills a server serves ([#2605](https://github.com/vite-hub/vitehub/pull/2605), 2026-10-19) |
| [VS Code fork](https://github.com/tobi-oye/vscode/pull/1) | `community` | `prototype` | `skills/list` discovery and loading ([findings](archive/experimental-findings.md)) |
| [VS Code](https://github.com/microsoft/vscode) | | `planned` ([#338300](https://github.com/microsoft/vscode/issues/338300)) | GitHub Copilot support requested; no PR yet |
| [Goose](https://github.com/aaif-goose/goose) | | `in progress` ([#12724](https://github.com/aaif-goose/goose/pull/12724)) | Host PR on released rmcp; the maintainers' plan in [#12068](https://github.com/aaif-goose/goose/issues/12068) waits on Rust SDK support. Prototype fork in [ext-skills#125](https://github.com/modelcontextprotocol/ext-skills/pull/125) |
| [Agno](https://github.com/agno-agi/agno) | | `in progress` ([#11026](https://github.com/agno-agi/agno/pull/11026)) | Maintainer-written, in review |
| [opencode](https://github.com/anomalyco/opencode) | | `in progress` ([#52298](https://github.com/anomalyco/opencode/pull/52298)) | Community PR, no maintainer reply yet |
| [Hermes Agent](https://github.com/NousResearch/hermes-agent) | | `in progress` ([#137746](https://github.com/NousResearch/hermes-agent/pull/137746)) | Community PR, no maintainer reply yet |
| [agent-harness](https://github.com/ar27111994/agent-harness) | `community` | `planned` ([#492](https://github.com/ar27111994/agent-harness/issues/492)) | Digest-pinned skill store |
