## What to reference as a source

**IMPORTANT**: The source of truth for the Skills extension (`io.modelcontextprotocol/skills`) is [`specification/stable/skills.mdx`](specification/stable/skills.mdx) in this repository. It is the normative text of the extension, written against base protocol revision `2026-07-28`, and is what the official documentation at [modelcontextprotocol.io/extensions/skills/overview](https://modelcontextprotocol.io/extensions/skills/overview) summarizes.

[SEP-2640](https://modelcontextprotocol.io/seps/2640-skills-extension) is the accepted proposal behind the extension (Status: Final; [PR #2640](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2640) merged 2026-09-13). [`docs/archive/sep-draft-skills-extension.md`](docs/archive/sep-draft-skills-extension.md) is a copy of that SEP text pinned at the commit named in its header, kept so Working Group discussion, meeting notes, and decision records can quote and link stable text. It is a historical baseline, not the current spec.

- **Answer questions about what the extension requires from `specification/stable/skills.mdx`**, not from the SEP copy or the `docs/` folder. Where the spec page and the SEP differ, the [decision log](docs/decisions.md) records why (see the 2026-09-08 entry).
- The `docs/` folder holds design history, rationale, experimental findings, and trackers. Treat it as context, not as normative text.

## Proposing changes to the specification

Changes are proposed here. The vehicle is a dated entry in [`docs/decisions.md`](docs/decisions.md) with `**Status:** Proposed`, in the ADR-lite format used throughout that file (Status / Context / Decision / Rationale / References) — the PR carrying that entry is the proposal.

`specification/stable/skills.mdx` is a released snapshot and is not edited in place. Once a proposal is accepted, the resulting text lands in a draft revision of the specification (a `draft/` directory alongside the released text, following the layout used by [ext-tasks](https://github.com/modelcontextprotocol/ext-tasks/tree/main/specification)), the entry's status is updated to Accepted, and the draft ships as a new stable revision when released.

When a decision supersedes or amends an earlier one, add a forward pointer to the earlier entry's `**Status:**` line rather than rewriting the entry. The log is an auditable trace of the group's reasoning over time, not a snapshot of current state.

See [CONTRIBUTING.md](CONTRIBUTING.md) for participation, meetings, decision-making authority, and full decision-log guidance.
