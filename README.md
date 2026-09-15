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

> ℹ️ The [`docs/`](docs/) folder holds the Working Group's design history, rationale, findings, and trackers. Those documents are exploratory and are not part of the specification.

**Charter:** [modelcontextprotocol.io/community/working-groups/skills-over-mcp](https://modelcontextprotocol.io/community/working-groups/skills-over-mcp) — mission, scope, membership, active work items, and success criteria.
**Project board:** [Skills Over MCP WG](https://github.com/orgs/modelcontextprotocol/projects/38/views/1)
**Meeting notes:** [Skills Over MCP WG discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/categories/meeting-notes-skills-over-mcp-wg)
**Discord:** [#skills-over-mcp-wg](https://discord.com/channels/1358869848138059966/1464745826629976084)
**Open work:** [Pull requests](https://github.com/modelcontextprotocol/ext-skills/pulls) and [issues](https://github.com/modelcontextprotocol/ext-skills/issues) — proposals, decisions, implementations, and other in-flight contributions welcome.

## Why Skills Over MCP?

MCP servers give agents tools, but tools alone are insufficient for complex workflows — tool descriptions tell an agent *what* a tool does, not *how to orchestrate* multiple tools to achieve a goal. Skills bridge this gap. They are structured "how-to" knowledge: multi-step workflows, conditional logic, and orchestration instructions that can run to hundreds of lines.

Skills are *context*, and MCP is a *context protocol*. Agents already connect to remote services over MCP to get tools — they can get the know-how to use those tools through the same channel. A remote MCP server can serve both its tools and the instructions for using them together, as a single atomic unit. This also enables automatic discovery (connect to a server, find its skills), dynamic updates (server-side changes flow without reinstall), multi-server composition (skills orchestrating tools across servers), and enterprise distribution (RBAC, multi-tenant, version-adaptive content) — all through infrastructure MCP servers already provide.

See [why-and-when.md](docs/archive/why-and-when.md) for the full value proposition and a guide for when MCP distribution applies vs. simpler alternatives. For an accessible external framing of the premise, see Angie Jones's ["Skills Over MCP"](https://aaif.io/blog/skills-over-mcp/) (Agentic AI Foundation) — "ship the manual with the product."

## Problem Statement

Native "skills" support in host applications demonstrates demand for rich workflow instructions, but there's no convention for exposing equivalent functionality through MCP primitives. Current limitations include:

- **Server instructions load only at initialization** — new or updated skills require re-initializing the server
- **Complex workflows exceed practical instruction size** — some skills require hundreds of lines of markdown with references to bundled files
- **No discovery mechanism** — users installing MCP servers don't know if there's a corresponding skill they should also install
- **Multi-server orchestration** — skills may need to coordinate tools from multiple servers

See [problem-statement.md](docs/problem-statement.md) for full details.

## Repository Contents

| Document | Description |
| :--- | :--- |
| [Specification](specification/stable/skills.mdx) | The Skills extension specification (`io.modelcontextprotocol/skills`) — source of truth |
| [Decision Log](docs/decisions.md) | ADR-lite record of the group's decisions, and the vehicle for proposing changes to the specification |
| [Threat Model](docs/threat-model.md) | Threat model for skills served over MCP, with delivery-model recommendations and an archive appendix |
| [Experimental Findings](docs/experimental-findings.md) | Results from implementations and testing ([template](docs/findings-template.md) for new entries) |
| [Skills Extension Candidates](docs/skills-extension-candidates.md) | MCP servers, dev tools, SDKs, and skills repositories that are candidates for adopting the extension |
| [Problem Statement](docs/problem-statement.md) | The gaps the extension addresses |
| [Rationale](docs/rationale.md) | Design rationale for the Resources-based extension |
| [Related Work](docs/related-work.md) | SEPs, implementations, and external resources |
| [Open Questions](docs/open-questions.md) | Early open questions; kept for reference, see the decision log for what was settled |
| [Using `_meta` for Skill Resources](docs/skill-meta-keys.md) | Guidelines for `_meta` on skill resources; see the 2026-03-16 decision |
| [Archive](docs/archive/) | Pre-release design documents, frozen when SEP-2640 was marked Final |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to participate.
