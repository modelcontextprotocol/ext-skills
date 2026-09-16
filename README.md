# Skills Over MCP Working Group

This repository is the home of the official [Model Context Protocol](https://modelcontextprotocol.io) **Skills extension** (`io.modelcontextprotocol/skills`), based on [SEP-2640](https://modelcontextprotocol.io/seps/2640-skills-extension), and of the Skills Over MCP Working Group's working documents.

## Specification

| Resource | Where |
| :--- | :--- |
| **Specification (source of truth)** | [`specification/stable/skills.mdx`](specification/stable/skills.mdx) — the extension spec, written against base protocol revision `2026-07-28` |
| **Official documentation** | [modelcontextprotocol.io/extensions/skills/overview](https://modelcontextprotocol.io/extensions/skills/overview) — condensed overview with examples and message flow |
| **SEP-2640: Skills Extension** | [modelcontextprotocol.io/seps/2640-skills-extension](https://modelcontextprotocol.io/seps/2640-skills-extension) — the accepted SEP (Status: Final; [PR #2640](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2640) merged 2026-09-13) |
| **Client support** | [Extension client matrix](https://modelcontextprotocol.io/extensions/client-matrix) — which clients implement the extension |

The stable specification is a released snapshot and is not edited in place. Changes are proposed as dated entries in the [decision log](docs/decisions.md) (see [AGENTS.md](AGENTS.md) for the process) and, once accepted, land in a draft revision of the specification that ships as a new release.

> ℹ️ The [`docs/`](docs/) folder holds the [decision log](docs/decisions.md), the [design rationale](docs/rationale.md), and the [implementations list](docs/implementations.md). Earlier design documents, findings, and trackers are frozen in [`docs/archive/`](docs/archive/). None of it is part of the specification.

**Charter:** [modelcontextprotocol.io/community/working-groups/skills-over-mcp](https://modelcontextprotocol.io/community/working-groups/skills-over-mcp) — mission, scope, membership, active work items, and success criteria.
**Project board:** [Skills Over MCP WG](https://github.com/orgs/modelcontextprotocol/projects/38/views/1)
**Meeting notes:** [Skills Over MCP WG discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/categories/meeting-notes-skills-over-mcp-wg)
**Discord:** [#skills-over-mcp-wg](https://discord.com/channels/1358869848138059966/1464745826629976084)
**Open work:** [Pull requests](https://github.com/modelcontextprotocol/ext-skills/pulls) and [issues](https://github.com/modelcontextprotocol/ext-skills/issues) — proposals, decisions, implementations, and other in-flight contributions welcome.

## Repository Contents

| Document | Description |
| :--- | :--- |
| [Specification](specification/stable/skills.mdx) | The Skills extension specification (`io.modelcontextprotocol/skills`) — source of truth |
| [Decision Log](docs/decisions.md) | ADR-lite record of the group's decisions, and the vehicle for proposing changes to the specification |
| [Rationale](docs/rationale.md) | Design rationale for the Resources-based extension |
| [Implementations](docs/implementations.md) | Servers, SDKs, and hosts that serve or consume skills over MCP |
| [Archive](docs/archive/) | Pre-release design documents, findings, and trackers, frozen when SEP-2640 was marked Final |

For the case for serving skills over MCP, see the [official overview](https://modelcontextprotocol.io/extensions/skills/overview) and the Motivation section of [SEP-2640](https://modelcontextprotocol.io/seps/2640-skills-extension).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to participate.
