# Example Implementations

Example servers, SDKs, and hosts that serve or consume skills over MCP. Official client support is tracked on the [extension client matrix](https://modelcontextprotocol.io/extensions/client-matrix); this list is broader and community-maintained.

**Status:** `v1` implements the released extension · `partial` implements some of it · `pre-v1` targets an earlier draft · `prototype` fork or demo · `in progress` open PR · `planned` issue only. A link after the status points to the issue or PR tracking the work.

**Category:** `official` maintained by the MCP project · `community` individual or community project · unmarked rows are maintained by the organization behind the product

Implementations that predate the SEP are recorded in the archived [related work](archive/related-work.md) and are not repeated here.

To add or update a row, open a PR. Keep notes to one line.

## SDKs and frameworks

| Implementation | Category | Language | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| [Go SDK](https://github.com/modelcontextprotocol/go-sdk) | `official` | Go | `in progress` ([#1238](https://github.com/modelcontextprotocol/go-sdk/pull/1238)) | Passes the conformance suite; filesystem provider in [#1240](https://github.com/modelcontextprotocol/go-sdk/pull/1240) |
| [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | `official` | TypeScript | `in progress` ([#2818](https://github.com/modelcontextprotocol/typescript-sdk/pull/2818)) | Phase 1: schemas, client ops, server handlers. Tracking issue [#2798](https://github.com/modelcontextprotocol/typescript-sdk/issues/2798) |
| [Python SDK](https://github.com/modelcontextprotocol/python-sdk) | `official` | Python | `in progress` ([#3485](https://github.com/modelcontextprotocol/python-sdk/pull/3485)) | Tracking issue [#3486](https://github.com/modelcontextprotocol/python-sdk/issues/3486) |
| [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) | `official` | C# | `in progress` ([#1864](https://github.com/modelcontextprotocol/csharp-sdk/pull/1864)) | Alternative PR [#1856](https://github.com/modelcontextprotocol/csharp-sdk/pull/1856); maintainers to pick |
| [FastMCP SkillsProvider](https://gofastmcp.com/servers/providers/skills) | | Python | `pre-v1` ([#129](https://github.com/modelcontextprotocol/ext-skills/issues/129)) | Own `skill://` shape |
| [mcpkit](https://github.com/panyam/mcpkit) | `community` | Go | `partial` ([#780](https://github.com/panyam/mcpkit/issues/780)) | Server and host. v1 security rules; catalog still on the index-resource shape |
| [Tachyon](https://github.com/tachyonmcp/tachyon/tree/main/examples/mcp-skills) | | Java | `v1` | Self-reported 2026-09-14; requires clients to advertise the extension capability |

## Servers

| Implementation | Category | Language | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| [hf-mcp-server](https://github.com/huggingface/hf-mcp-server) | | TypeScript | `v1` | Hugging Face. `skills/list`, `skills/get`, `directoryRead`. HTTP transports only |
| [github-stars-contrib-mcp-server](https://github.com/svg153/github-stars-contrib-mcp-server) | `community` | Python | `v1` ([#144](https://github.com/modelcontextprotocol/ext-skills/issues/144)) | Passes the [conformance suite](https://github.com/modelcontextprotocol/conformance) server scenarios |
| [github-mcp-server](https://github.com/github/github-mcp-server/pull/2428) | | Go | `prototype` | Demo branch, not for merge |

## Hosts (including agent harnesses, IDEs, and web applications)

| Implementation | Category | Status | Notes |
| :--- | :--- | :--- | :--- |
| [fast-agent](https://github.com/evalstate/fast-agent/blob/main/docs/docs/mcp/skills-over-mcp.md) | `community` | `partial` | First client interoperated end-to-end with hf-mcp-server |
| [MCP Inspector](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md#skill-verification---verify) | `official` | `partial` | SEP-2640 support since 2.6.0 (2026-09-09), including CLI skill verification |
| [MCPJam Inspector](https://github.com/MCPJam/inspector) | | `partial` | Skills surface in the app and CLI; declares the extension capability |
| [ChatGPT plugins](https://developers.openai.com/plugins/build/mcp-server#import-skills-from-the-mcp-server) | | `partial` | Imports skills at plugin submission, static snapshot |
| [VS Code fork](https://github.com/tobi-oye/vscode/pull/1) | `community` | `prototype` | `skills/list` discovery and loading ([findings](archive/experimental-findings.md)) |
| [Goose](https://github.com/aaif-goose/goose) | | `planned` ([#12068](https://github.com/aaif-goose/goose/issues/12068)) | Prototype fork in [ext-skills#125](https://github.com/modelcontextprotocol/ext-skills/pull/125) |
| [mcpkit host](https://github.com/panyam/mcpkit) | `community` | `partial` | `load_skill` tool, verified reads, per-origin resolution |
| [agent-harness](https://github.com/ar27111994/agent-harness) | `community` | `planned` ([#492](https://github.com/ar27111994/agent-harness/issues/492)) | Digest-pinned skill store |
