# Contributing

## Documentation Website

Use Node.js 22 or later:

```sh
npm ci
npm run docs:dev
```

Before submitting a change, build and preview the production site:

```sh
npm run docs:build
npm run docs:preview
```

The homepage renders the full specification from `specification/stable/skills.mdx`.
The adjacent `.md` file includes it for VitePress and is routed to `/`, so there
is one documentation page and one copy of the specification
text. Follow the [specification change process](AGENTS.md#proposing-changes-to-the-specification)
when proposing changes.
Navigation links to the condensed overview on the
[MCP website](https://modelcontextprotocol.io/extensions/skills/overview).
Working Group research and historical documents under `docs/` remain available on GitHub.

Pull requests build the website in CI, including contributions from forks.
Broken internal page links fail the build. Cloudflare Pages builds the site with
`npm run docs:build` and serves `.vitepress/dist`.

## How to Participate

This Working Group welcomes contributions from anyone interested in skills distribution over MCP. You can participate by:

- Joining discussions in the [#skills-over-mcp-wg Discord channel](https://discord.com/channels/1358869848138059966/1464745826629976084) (info on joining the Discord server [here](https://modelcontextprotocol.io/community/communication#discord))
- Opening or commenting on [GitHub Discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/categories/meeting-notes-skills-over-mcp-wg) in the main MCP repo
- Sharing findings from your own implementations as GitHub issues
- Contributing to documentation and pattern evaluation

## Communication Channels

| Channel | Purpose | Response Expectation |
| :--- | :--- | :--- |
| [Discord #skills-over-mcp-wg](https://discord.com/channels/1358869848138059966/1464745826629976084) | Quick questions, coordination, async discussion | Best effort |
| [GitHub Discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/categories/meeting-notes-skills-over-mcp-wg) | Meeting notes, long-form technical proposals, experimental findings | Weekly triage |
| This repository | The specification, decision log, and design rationale | Updated after meetings |

## Coordination with the Agent Skills Spec

The [Agent Skills spec](https://agentskills.io/) is maintained in the [agentskills/agentskills](https://github.com/agentskills/agentskills) repository. For topics that intersect with both this WG and the Agent Skills spec (e.g., protocol design questions, proposed extensions, or alignment on terminology), the recommended channel is [Discussions](https://github.com/agentskills/agentskills/discussions) in that repository.

Before opening a discussion, review the [Agent Skills contributing guide](https://github.com/agentskills/agentskills/blob/main/CONTRIBUTING.md).

## Meetings

Working Session cadence is defined in the [charter](https://modelcontextprotocol.io/community/skills-over-mcp/charter#operations); the schedule is published on [meet.modelcontextprotocol.io](https://meet.modelcontextprotocol.io). Meeting requirements — advance notice, agendas, and notes — follow MCP [group governance](https://modelcontextprotocol.io/community/working-interest-groups#meeting-requirements).

Notes are published to [Meeting Notes — Skills Over MCP WG](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/categories/meeting-notes-skills-over-mcp-wg). Scheduling surveys and between-meeting coordination happen in [#skills-over-mcp-wg](https://discord.com/channels/1358869848138059966/1464745826629976084).

## Decision-Making

Scope and per-decision-type authority are defined in the [charter](https://modelcontextprotocol.io/community/skills-over-mcp/charter#authority-decision-rights). The decision progression (lazy consensus → formal vote → escalation) follows MCP [group governance](https://modelcontextprotocol.io/community/working-interest-groups#decision-making-process).

Outputs include:

- SEPs we shepherd from proposal through review (Extensions Track and related protocol changes)
- Reference implementations demonstrating skill discovery and consumption
- Documented requirements, evaluated approaches, and experimental findings

## Contribution Guidelines

### Sharing Implementation Findings

Findings from implementations are shared as [GitHub issues](https://github.com/modelcontextprotocol/ext-skills/issues) rather than as documents in this repository. The pre-v1 findings and their template are frozen in [`docs/archive/`](docs/archive/). When reporting a finding:

- Include enough detail for others to reproduce or evaluate
- Note which clients and servers were tested, and the specification revision
- Be explicit about what worked, what didn't, and what remains untested
- Write "Not documented" for missing details instead of inferring them
- Attribute community input with GitHub handles and link to the source where possible

### Community Input

When adding quotes or input from community discussions:

- Attribute to the contributor by name and GitHub handle
- Link to the original source (Discord thread, GitHub comment, etc.) where possible
- Present input as blockquotes to distinguish it from editorial content

### Decision Log

Significant decisions made during meetings or through async discussion should be recorded in [docs/decisions.md](docs/decisions.md) using the ADR-lite format defined there. A decision is worth logging when it:

- Chooses one approach over alternatives
- Sets or changes the group's scope
- Establishes a convention or coordination mechanism

Add a new entry after the meeting where the decision was made or when consensus is reached asynchronously. Include context, the decision itself, rationale, and links to relevant issues, PRs, or discussion threads.

### Filing Issues

Use GitHub Issues for:

- Proposing new approaches or use cases
- Reporting gaps in documentation
- Tracking action items from meetings
