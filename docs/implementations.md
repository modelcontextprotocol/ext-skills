# Implementations

Servers, SDKs, and hosts that serve or consume skills over MCP. Official client support is tracked on the [extension client matrix](https://modelcontextprotocol.io/extensions/client-matrix); this list is broader and community-maintained.

**Status:** `v1` implements the released extension · `partial` implements some of it · `pre-v1` targets an earlier draft · `prototype` fork or demo · `planned`

To add or update a row, open a PR. Keep notes to one line.

## Servers and SDKs

| Implementation | Language | Status | Notes |
| :--- | :--- | :--- | :--- |
| [hf-mcp-server](https://github.com/huggingface/hf-mcp-server) | TypeScript | `v1` | Hugging Face. `skills/list`, `skills/get`, `directoryRead`. HTTP transports only |
| [github-stars-contrib-mcp-server](https://github.com/svg153/github-stars-contrib-mcp-server) | TypeScript | `v1` | Passes the [conformance suite](https://github.com/modelcontextprotocol/conformance/pull/330) server scenarios ([#144](https://github.com/modelcontextprotocol/ext-skills/issues/144)) |
| [@olaservo/ext-skills](https://www.npmjs.com/package/@olaservo/ext-skills) | TypeScript | `v1` | Reference server library. Live demo: [skills-over-mcp-demo](https://huggingface.co/spaces/olaservo/skills-over-mcp-demo) |
| [github-mcp-server](https://github.com/github/github-mcp-server/pull/2428) | Go | `prototype` | Demo branch, not for merge |
| [mcpkit](https://github.com/panyam/mcpkit) | Go | `partial` | Server and host. v1 security rules; catalog still on the index-resource shape ([#780](https://github.com/panyam/mcpkit/issues/780)) |
| [FastMCP SkillsProvider](https://gofastmcp.com/servers/providers/skills) | Python | `pre-v1` | Own `skill://` shape. Migration tracked in [#129](https://github.com/modelcontextprotocol/ext-skills/issues/129) |
| [PHP MCP SDK + Symfony AI](https://github.com/modelcontextprotocol/ext-skills/pull/95) | PHP | `pre-v1` | Skills as `skill://` resources |
| [skillsdotnet](https://github.com/PederHP/skillsdotnet) | C# | `pre-v1` | `skill://` resources, `load_skill` tool, file-hash manifest |
| [skilljack-mcp](https://github.com/olaservo/skilljack-mcp) | TypeScript | `pre-v1` | `skill://` resources with progressive disclosure |
| [skills-over-mcp](https://github.com/keithagroves/skills-over-mcp) | TypeScript | `pre-v1` | `skill://` resources, Zod validation |
| [NimbleBrain servers](https://github.com/NimbleBrainInc) | TypeScript | `pre-v1` | `skill://` colocation across several servers |

## Hosts and clients

| Implementation | Status | Notes |
| :--- | :--- | :--- |
| [fast-agent](https://github.com/evalstate/fast-agent/blob/main/docs/docs/mcp/skills-over-mcp.md) | `partial` | First client interoperated end-to-end with hf-mcp-server |
| [MCP Inspector](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md#skill-verification---verify) | `partial` | CLI skill verification |
| [ChatGPT plugins](https://developers.openai.com/plugins/build/mcp-server#import-skills-from-the-mcp-server) | `partial` | Imports skills at plugin submission, static snapshot |
| [VS Code fork](https://github.com/tobi-oye/vscode/pull/1) | `prototype` | `skills/list` discovery and loading ([findings](archive/experimental-findings.md)) |
| [Goose fork](https://github.com/modelcontextprotocol/ext-skills/pull/125) | `prototype` | Skills-over-MCP loading path alongside file-based skills |
| [mcpkit host](https://github.com/panyam/mcpkit) | `partial` | `load_skill` tool, verified reads, per-origin resolution |
| [agent-harness](https://github.com/ar27111994/agent-harness) | `planned` | Digest-pinned skill store; SEP-2640 client tracked in [#492](https://github.com/ar27111994/agent-harness/issues/492) |
