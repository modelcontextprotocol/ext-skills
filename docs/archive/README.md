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
| [Agent Plugins x Skills Over MCP](agent-plugins-analysis.md) | Analysis of how the Agent Plugins packaging format relates to the extension | Point-in-time analysis; no successor document |
| [Problem Statement](problem-statement.md) | The gaps the extension set out to address | SEP-2640 Motivation |
| [Related Work](related-work.md) | SEPs, implementations, and external resources gathered during design | The [extension client matrix](https://modelcontextprotocol.io/extensions/client-matrix) for client support; implementation links otherwise unmaintained |
| [Experimental Findings](experimental-findings.md) | Results from prototype implementations, mostly against pre-v1 drafts ([template](findings-template.md)) | The conformance suite; new findings are shared as GitHub issues |
| [Threat Model](threat-model.md) | Threat model for skills served over MCP, written against the draft SEP, with the archive-delivery appendix | The specification's Security Considerations, which made the host obligations normative |
