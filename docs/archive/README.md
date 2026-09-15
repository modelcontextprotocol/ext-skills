# Archive

Documents the Working Group produced while designing the Skills extension, frozen once [SEP-2640](https://modelcontextprotocol.io/seps/2640-skills-extension) was marked Final (2026-09-13). They are kept for history and so the [decision log](../decisions.md) can link to the material it cites. Nothing here is normative; the specification is [`specification/stable/skills.mdx`](../../specification/stable/skills.mdx).

| Document | What it was | Superseded by |
| :--- | :--- | :--- |
| [SEP-2640 baseline copy](sep-draft-skills-extension.md) | Verbatim copy of the SEP text pinned at an August 2026 draft commit, kept so discussion could quote stable text | The published [SEP-2640](https://modelcontextprotocol.io/seps/2640-skills-extension) and the [stable specification](../../specification/stable/skills.mdx) |
| [Why Skills Over MCP?](why-and-when.md) | Value proposition and decision guide written while the approach was being argued for | SEP-2640 Motivation; the README |
| [Use Cases](use-cases.md) | Use cases that drove the design | SEP-2640 Motivation |
| [Approaches](approaches.md) | Map of the six approaches considered before converging on the convention approach | Decision log entries 2026-02-21 and 2026-02-26; SEP-2640 |
| [Skill URI Scheme Proposal](skill-uri-scheme.md) | Survey of `skill://` URI patterns across early implementations and the proposed convention | Decision log 2026-04-16 (superseded in part by the 2026-07-16 v1 scope entry); the specification's URI rules |
| [Open Questions](open-questions.md) | Early open questions with community input, gathered before the SEP existed | Decision log entries and the specification; remaining post-v1 items are tracked in issues ([#131](https://github.com/modelcontextprotocol/ext-skills/issues/131), [#126](https://github.com/modelcontextprotocol/ext-skills/issues/126)) |
| [Using `_meta` for Skill Resources](skill-meta-keys.md) | Draft guidelines for `_meta` keys on skill resources | Decision log 2026-03-16; the specification reserves the `io.modelcontextprotocol.skills/` prefix and defines no keys |
| [Glossary](glossary.md) | Working definitions used across the design documents | The terms as defined in the specification and the [Agent Skills specification](https://agentskills.io/specification) |
| [Client MCP Support](client-mcp-support.md) | Survey of model-facing resource loading and draft-revision SEP-2640 support across open-source clients | The official [extension client matrix](https://modelcontextprotocol.io/extensions/client-matrix) |
| [Agent Plugins x Skills Over MCP](agent-plugins-analysis.md) | Analysis of how the Agent Plugins packaging format relates to the extension | Point-in-time analysis; no successor document |
