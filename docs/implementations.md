# Implementations

Example servers, SDKs, and hosts that serve or consume skills over MCP. Official client support is tracked on the [extension client matrix](https://modelcontextprotocol.io/extensions/client-matrix); this list is broader and community-maintained.

**Status:** `v1` implements the released extension · `partial` implements some of it · `pre-v1` targets an earlier draft · `prototype` fork or demo · `planned`. A link after the status points to the issue or PR tracking the work.

**Category:** `vendor` maintained by the organization behind the product or SDK · `community` individual or community project

To add or update a row, open a PR. Keep notes to one line.

## Servers and SDKs

| Implementation | Category | Language | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| [hf-mcp-server](https://github.com/huggingface/hf-mcp-server) | `vendor` | TypeScript | `v1` | Hugging Face. `skills/list`, `skills/get`, `directoryRead`. HTTP transports only |
| [github-stars-contrib-mcp-server](https://github.com/svg153/github-stars-contrib-mcp-server) | `community` | TypeScript | `v1` ([#144](https://github.com/modelcontextprotocol/ext-skills/issues/144)) | Passes the [conformance suite](https://github.com/modelcontextprotocol/conformance/pull/330) server scenarios |
| [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | `vendor` | TypeScript | `planned` ([#2798](https://github.com/modelcontextprotocol/typescript-sdk/issues/2798)) | First-class skills APIs; phase 1 in [#2818](https://github.com/modelcontextprotocol/typescript-sdk/pull/2818) |
| [github-mcp-server](https://github.com/github/github-mcp-server/pull/2428) | `vendor` | Go | `prototype` | Demo branch, not for merge |
| [mcpkit](https://github.com/panyam/mcpkit) | `community` | Go | `partial` ([#780](https://github.com/panyam/mcpkit/issues/780)) | Server and host. v1 security rules; catalog still on the index-resource shape |
| [FastMCP SkillsProvider](https://gofastmcp.com/servers/providers/skills) | `vendor` | Python | `pre-v1` ([#129](https://github.com/modelcontextprotocol/ext-skills/issues/129)) | Own `skill://` shape |
| [PHP MCP SDK + Symfony AI](https://github.com/modelcontextprotocol/ext-skills/pull/95) | `vendor` | PHP | `pre-v1` | Skills as `skill://` resources |
| [skillsdotnet](https://github.com/PederHP/skillsdotnet) | `community` | C# | `pre-v1` | `skill://` resources, `load_skill` tool, file-hash manifest |
| [skilljack-mcp](https://github.com/olaservo/skilljack-mcp) | `community` | TypeScript | `pre-v1` | `skill://` resources with progressive disclosure |
| [skills-over-mcp](https://github.com/keithagroves/skills-over-mcp) | `community` | TypeScript | `pre-v1` | `skill://` resources, Zod validation |
| [NimbleBrain servers](https://github.com/NimbleBrainInc) | `vendor` | TypeScript | `pre-v1` | `skill://` colocation across several servers |

## Hosts and clients

| Implementation | Category | Status | Notes |
| :--- | :--- | :--- | :--- |
| [fast-agent](https://github.com/evalstate/fast-agent/blob/main/docs/docs/mcp/skills-over-mcp.md) | `community` | `partial` | First client interoperated end-to-end with hf-mcp-server |
| [MCP Inspector](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md#skill-verification---verify) | `vendor` | `partial` | CLI skill verification |
| [ChatGPT plugins](https://developers.openai.com/plugins/build/mcp-server#import-skills-from-the-mcp-server) | `vendor` | `partial` | Imports skills at plugin submission, static snapshot |
| [VS Code fork](https://github.com/tobi-oye/vscode/pull/1) | `community` | `prototype` | `skills/list` discovery and loading ([findings](archive/experimental-findings.md)) |
| [Goose fork](https://github.com/modelcontextprotocol/ext-skills/pull/125) | `community` | `prototype` | Skills-over-MCP loading path alongside file-based skills |
| [mcpkit host](https://github.com/panyam/mcpkit) | `community` | `partial` | `load_skill` tool, verified reads, per-origin resolution |
| [agent-harness](https://github.com/ar27111994/agent-harness) | `community` | `planned` ([#492](https://github.com/ar27111994/agent-harness/issues/492)) | Digest-pinned skill store |
