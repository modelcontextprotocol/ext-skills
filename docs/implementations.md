# Example Implementations

Example servers, SDKs, and hosts that serve or consume skills over MCP. Official client support is tracked on the [extension client matrix](https://modelcontextprotocol.io/extensions/client-matrix); this list is broader and community-maintained.

**Status:** `beta` implements the released [Beta revision](../specification/beta/skills.mdx) · `partial` implements some of it · `draft` targets an earlier SEP draft · `prototype` fork or demo · `in progress` open PR · `planned` committed to by the maintainers · `requested` open feature request, no commitment yet. A link after the status points to the issue or PR tracking the work.

**Category:** `official` maintained by the MCP project · `community` individual or community project · unmarked rows are maintained by the organization behind the product

Implementations that predate the SEP are recorded in the archived [related work](archive/related-work.md) and are not repeated here.

To add or update a row, open a PR. Keep notes to one line.

## SDKs and frameworks

The extension ships in the TypeScript SDK v2.4.0, the C# SDK v2.4.0, the Rust SDK (rmcp) v3.9.0, the Ruby SDK v1.9.0, and FastMCP v4.2.0; the Python SDK has it merged but not yet released. Implementations built before those releases register `skills/list`, `skills/get` and `resources/directory/read` as custom request handlers. The Inspector's [`schemas.ts`](https://github.com/modelcontextprotocol/inspector/blob/main/core/extension/skills/schemas.ts) is a worked example for TypeScript; its comments record the pitfalls ([typescript-sdk#2789](https://github.com/modelcontextprotocol/typescript-sdk/issues/2789)).

| Implementation | Category | Language | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) | `official` | C# | `beta` ([#1856](https://github.com/modelcontextprotocol/csharp-sdk/pull/1856)) | In v2.4.0 as the experimental `ModelContextProtocol.Extensions.Skills` package |
| [Go SDK](https://github.com/modelcontextprotocol/go-sdk) | `official` | Go | `in progress` ([#1238](https://github.com/modelcontextprotocol/go-sdk/pull/1238)) | Changes requested; filesystem provider in [#1240](https://github.com/modelcontextprotocol/go-sdk/pull/1240) |
| [Java SDK](https://github.com/modelcontextprotocol/java-sdk) | `official` | Java | `in progress` ([#1141](https://github.com/modelcontextprotocol/java-sdk/pull/1141)) | Client APIs and stateless server; [#1214](https://github.com/modelcontextprotocol/java-sdk/pull/1214) adds the modern server. Tracking issue [#1140](https://github.com/modelcontextprotocol/java-sdk/issues/1140) |
| [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) | `official` | Kotlin | `in progress` ([#1215](https://github.com/modelcontextprotocol/kotlin-sdk/pull/1215)) | Types and capability declaration, first of a planned series. Tracking issue [#1020](https://github.com/modelcontextprotocol/kotlin-sdk/issues/1020) |
| [PHP SDK](https://github.com/modelcontextprotocol/php-sdk) | `official` | PHP | `in progress` ([#372](https://github.com/modelcontextprotocol/php-sdk/pull/372)) | Draft PR; server side, registers skills from a directory |
| [Python SDK](https://github.com/modelcontextprotocol/python-sdk) | `official` | Python | `beta` ([#3485](https://github.com/modelcontextprotocol/python-sdk/pull/3485)) | Merged, not yet released. Filesystem provider in [#3795](https://github.com/modelcontextprotocol/python-sdk/pull/3795) |
| [Ruby SDK](https://github.com/modelcontextprotocol/ruby-sdk) | `official` | Ruby | `beta` ([#635](https://github.com/modelcontextprotocol/ruby-sdk/pull/635)) | In v1.9.0: server from a directory or handler; client lists, reads and verifies |
| [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) | `official` | Rust | `beta` ([#1392](https://github.com/modelcontextprotocol/rust-sdk/pull/1392)) | In rmcp 3.9.0; directory loader (`skills-fs` feature) since 3.10.0 |
| [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | `official` | TypeScript | `beta` ([#3047](https://github.com/modelcontextprotocol/typescript-sdk/pull/3047)) | In v2.4.0 as `ext/skills`: `loadSkills` and `skills.attach` on the server, `SkillsClient` on the client. Tracking issue [#2798](https://github.com/modelcontextprotocol/typescript-sdk/issues/2798) |
| [airlift](https://github.com/airlift/airlift) | | Java | `beta` ([#2170](https://github.com/airlift/airlift/pull/2170)) | `@McpSkill` annotation, with `directoryRead` |
| [Effect](https://github.com/Effect-TS/effect) | | TypeScript | `beta` ([#10082](https://github.com/Effect-TS/effect/pull/10082)) | `McpServer` and `McpClient`, since effect 4.1.1 |
| [FastMCP](https://gofastmcp.com/servers/skills) | | Python | `beta` ([#5057](https://github.com/PrefectHQ/fastmcp/pull/5057)) | Experimental. v4.2.0 adds `SkillCatalogProvider`, client `read_skill()`, and discovery through proxies and mounted servers ([announcement](https://jlowin.dev/blog/fastmcp-4-2)); the 4.1 skills API is deprecated |
| [FastMCP TypeScript](https://github.com/PrefectHQ/fastmcp-ts) | | TypeScript | `beta` ([#131](https://github.com/PrefectHQ/fastmcp-ts/pull/131)) | Client since v1.9.0, server since v1.13.0 |
| [Frappe](https://github.com/frappe/frappe) | | Python | `in progress` ([#46189](https://github.com/frappe/frappe/pull/46189)) | Draft. Serves each installed app's `skills/` directory |
| [Laravel MCP](https://github.com/laravel/mcp) | | PHP | `beta` ([#410](https://github.com/laravel/mcp/pull/410)) | Serves skills from registered directories; no `directoryRead`. Merged, not yet released |
| [mcp-use](https://docs.mcp-use.com/v2/typescript/server/skills) | | TypeScript | `partial` | Server, client and inspector. No `ttlMs` or `cacheScope` on `skills/list` or `skills/get` |
| [mcpkit](https://github.com/panyam/mcpkit/tree/main/ext/skills) | `community` | Go | `beta` | Server and client, plus the `mcpskills` CLI. Passes the [conformance suite](https://github.com/modelcontextprotocol/conformance) server scenarios |
| [Next.js](https://github.com/vercel/next.js) | | TypeScript | `in progress` ([#101538](https://github.com/vercel/next.js/pull/101538)) | For the `next-mcp` package |
| [Skybridge](https://docs.skybridge.tech/guides/skills) | | TypeScript | `draft` ([#1036](https://github.com/alpic-ai/skybridge/pull/1036)) | Experimental; entries lack `size` and cache hints |
| [Spring AI](https://github.com/spring-projects/spring-ai) | | Java | `requested` ([#7345](https://github.com/spring-projects/spring-ai/issues/7345)) | |
| [Tachyon](https://github.com/tachyonmcp/tachyon/tree/main/examples/mcp-skills) | | Java | `beta` | Self-reported 2026-09-14; requires clients to advertise the extension capability |
| [tower-mcp](https://docs.rs/tower-mcp/latest/tower_mcp/skills/) | `community` | Rust | `beta` ([#1642](https://github.com/joshrotenberg/tower-mcp/pull/1642)) | Server and client since 0.26.1 behind the `skills` feature; `SkillSet` loads a directory, `read_verified_skill_file` checks size, digest and frontmatter. Passes the [conformance suite](https://github.com/modelcontextprotocol/conformance) server and client scenarios |
| [turul-mcp-framework](https://github.com/aussierobots/turul-mcp-framework) | `community` | Rust | `beta` ([#52](https://github.com/aussierobots/turul-mcp-framework/pull/52)) | `turul-mcp-ext-skills` crate, with directory reads |
| [xmcp](https://github.com/basementstudio/xmcp) | | TypeScript | `beta` ([#769](https://github.com/basementstudio/xmcp/pull/769)) | Serves `src/skills/` by default since 1.10.0 |

## Servers

| Implementation | Category | Language | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| [aitmpl](https://github.com/davila7/claude-code-templates) | | TypeScript | `beta` ([#1704](https://github.com/davila7/claude-code-templates/pull/1704)) | Claude Code Templates catalog server at `mcp.aitmpl.com/mcp`. Serves two skills through the TypeScript SDK, with `directoryRead` |
| [Ansible AAP MCP server](https://github.com/ansible/aap-mcp-server) | | TypeScript | `beta` ([#209](https://github.com/ansible/aap-mcp-server/pull/209)) | Off unless `skills_enabled` is set ([#213](https://github.com/ansible/aap-mcp-server/pull/213)) |
| [Arize Phoenix](https://github.com/Arize-ai/phoenix) | | TypeScript | `planned` ([#16596](https://github.com/Arize-ai/phoenix/issues/16596)) | |
| [authentik CLI](https://github.com/goauthentik/platform) | | Rust | `beta` ([#1823](https://github.com/goauthentik/platform/pull/1823)) | `ak` serves two bundled skills since v0.73.0 |
| [Azure MCP Server](https://github.com/microsoft/mcp) | | C# | `planned` ([#3655](https://github.com/microsoft/mcp/issues/3655)) | |
| [basic-memory](https://github.com/basicmachines-co/basic-memory) | | Python | `beta` ([#2022](https://github.com/basicmachines-co/basic-memory/pull/2022)) | On FastMCP |
| [Brewale](https://brewale.dev/docs#skills-over-mcp) | | TypeScript | `beta` | Hosted. Org, project and personal skills with per-user access; `directoryRead`; passes the conformance server scenarios |
| [Capgo](https://github.com/Cap-go/capgo.app) | | TypeScript | `beta` ([#4080](https://github.com/Cap-go/capgo.app/pull/4080)) | Hosted. Mirror tools for clients without the extension |
| [Cloudflare API MCP server](https://github.com/cloudflare/mcp) | | TypeScript | `beta` | Hosted. Serves the [cloudflare/skills](https://github.com/cloudflare/skills) repo with full manifests; no `directoryRead` |
| [Context7](https://github.com/upstash/context7) | | TypeScript | `beta` ([#3656](https://github.com/upstash/context7/pull/3656)) | On the TypeScript SDK's extension. Merged, not yet released |
| [Descope MCP server](https://docs.descope.com/mcp/mcp-server) | | | `partial` | Hosted. Docs confirm `skills/list`; the same skills install locally from [descope/skills](https://github.com/descope/skills) |
| [DoiT MCP server](https://github.com/doitintl/doit-mcp-server) | | TypeScript | `beta` | Since v2.6.0 ([#345](https://github.com/doitintl/doit-mcp-server/pull/345)) |
| [Executor](https://github.com/UsefulSoftwareCo/executor) | | TypeScript | `beta` ([2.0.0-beta.72](https://github.com/UsefulSoftwareCo/executor/releases/tag/executor%402.0.0-beta.72)) | Serves the skills of every app the caller can see, with `directoryRead`. Pre-release |
| [FastMCP Skill Drop](https://gofastmcp.com/skill-drop) | | Python | `beta` | Hosted. Turns an uploaded skill or repo into a server with `skills/list` and `skills/get` on FastMCP's extension, plus `list_skills` and `read_skill` tools; no `directoryRead` ([announcement](https://www.prefect.io/blog/skill-drop-share-skills-over-mcp)) |
| [GitHub MCP Server](https://github.com/github/github-mcp-server) | | Go | `beta` ([#3685](https://github.com/github/github-mcp-server/pull/3685)) | Opt-in since v2.2.0; bundled skills filtered by the enabled toolsets, with `directoryRead` |
| [github-stars-contrib-mcp-server](https://github.com/svg153/github-stars-contrib-mcp-server) | `community` | Python | `beta` ([#144](https://github.com/modelcontextprotocol/ext-skills/issues/144)) | Passes the [conformance suite](https://github.com/modelcontextprotocol/conformance) server scenarios |
| [Glean (MCP server)](https://docs.glean.com/user-guide/mcp/usage) | | Go | `beta` | Hosted. Serves each user's policy-filtered Glean Skills; no `directoryRead`. Self-reported in [#165](https://github.com/modelcontextprotocol/ext-skills/pull/165) |
| [Google MCP Toolbox](https://github.com/googleapis/mcp-toolbox) | | Go | `beta` ([#4104](https://github.com/googleapis/mcp-toolbox/pull/4104)) | Since v1.16.0 |
| [gridctl](https://github.com/gridctl/gridctl) | | Go | `beta` | Registry skills on both protocol revisions, with directory browsing ([#1418](https://github.com/gridctl/gridctl/pull/1418)) |
| [hf-mcp-server](https://github.com/huggingface/hf-mcp-server) | | TypeScript | `beta` | Hugging Face. `skills/list`, `skills/get`, `directoryRead`. HTTP transports only |
| [jshookmcp](https://github.com/vmoranv/jshookmcp) | `community` | TypeScript | `beta` ([#252](https://github.com/vmoranv/jshookmcp/pull/252)) | Experimental |
| [kernel-mcp-server](https://github.com/kernel/kernel-mcp-server) | | TypeScript | `in progress` ([#260](https://github.com/kernel/kernel-mcp-server/pull/260)) | Ships the `kernel-mcp` skill from [kernel/skills](https://github.com/kernel/skills) |
| [Kody](https://github.com/kody-hq/kody) | | TypeScript | `beta` ([#3010](https://github.com/kody-hq/kody/pull/3010)) | Serves packaged skills; out from behind its flag in [#5394](https://github.com/kody-hq/kody/pull/5394). No `directoryRead` |
| [Laminar](https://github.com/lmnr-ai/lmnr) | | TypeScript | `in progress` ([#2671](https://github.com/lmnr-ai/lmnr/pull/2671)) | |
| [Langfuse](https://github.com/langfuse/langfuse) | | TypeScript | `beta` ([#19552](https://github.com/langfuse/langfuse/pull/19552)) | Serves its `langfuse` and `migrate-to-langfuse` skills |
| [Mapbox MCP server](https://github.com/mapbox/mcp-server) | | TypeScript | `in progress` ([#295](https://github.com/mapbox/mcp-server/pull/295)) | |
| [mcpskills](https://github.com/Cali0707/mcpskills) | `community` | Go | `beta` | Reference server on the Go SDK over Streamable HTTP, with OAuth and group-based access |
| [Microsoft Foundry toolbox](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/skills) | | | `beta` | Hosted, in preview |
| [n8n](https://github.com/n8n-io/n8n) | | TypeScript | `beta` ([#41725](https://github.com/n8n-io/n8n/pull/41725)) | Serves its skills hub since 2.46.0, behind a feature flag; per-skill selection since 2.47.0 ([#41729](https://github.com/n8n-io/n8n/pull/41729)) |
| [OpenL Tablets](https://github.com/openl-tablets/openl-tablets) | | TypeScript | `beta` ([#2414](https://github.com/openl-tablets/openl-tablets/pull/2414)) | Since 7.0.0, on the TypeScript SDK's extension |
| [OpenWork](https://github.com/different-ai/openwork) | | TypeScript | `partial` | Organization and plugin skills with supporting files ([#6129](https://github.com/different-ai/openwork/pull/6129), [#7530](https://github.com/different-ai/openwork/pull/7530)). No `ttlMs` or `cacheScope` on `skills/list` or `skills/get` |
| [Outline](https://github.com/outline/outline) | | TypeScript | `beta` | Since v1.11.0; per-file digests and `skill://outline/...` URIs |
| [PDFops](https://github.com/pdfops/pdfops-mcp) | | TypeScript | `beta` | Since v0.7.0, on the TypeScript SDK's extension; serves a `pdf-workflows` skill over stdio |
| [PostHog MCP](https://github.com/PostHog/posthog) | | TypeScript | `planned` ([#99933](https://github.com/PostHog/posthog/issues/99933)) | Serves skills through a tool today |
| [Prefect MCP server](https://github.com/PrefectHQ/prefect-mcp-server) | | Python | `in progress` ([#245](https://github.com/PrefectHQ/prefect-mcp-server/pull/245)) | |
| [RavenDB MCP](https://github.com/ravendb/ravendb-mcp) | | C# | `beta` ([#38](https://github.com/ravendb/ravendb-mcp/pull/38)) | On the C# SDK's skills package |
| [Repliers MCP server](https://github.com/Repliers-io/mcp-server) | | JavaScript | `beta` | Serves its skills for ChatGPT's import ([#26](https://github.com/Repliers-io/mcp-server/pull/26)) |
| [Salesforce B2C DX MCP](https://github.com/SalesforceCommerceCloud/b2c-developer-tooling) | | TypeScript | `beta` | `@salesforce/b2c-dx-mcp` since 3.3.0; no `directoryRead` |
| [Shopify](https://help.shopify.com/en/manual/apps/connecting-ai-tools) | | | `beta` | Hosted at `setup.shopify.com/mcp`. Serves `admin-graphql` and `editing-themes` skills; no `directoryRead` |
| [skillshare](https://github.com/runkids/skillshare) | `community` | Go | `beta` ([#905](https://github.com/runkids/skillshare/pull/905)) | `skillshare mcp serve` serves synced skills, with `directoryRead` |
| [SkillzBench](https://skillzbench.com/agents) | | JavaScript | `beta` | Hosted at `mcp.skillzbench.com/mcp`, on the TypeScript SDK's extension. Serves each user's enabled skills from a benchmarked catalog, with full manifests; mirror tools for clients without the extension; no `directoryRead` |
| [Splunk Connect for Syslog](https://github.com/splunk/splunk-connect-for-syslog) | | Python | `beta` ([#3377](https://github.com/splunk/splunk-connect-for-syslog/pull/3377)) | `sc4s_mcp` serves its `create-parser` skill |
| [Supabase MCP](https://github.com/supabase/mcp) | | TypeScript | `in progress` ([#437](https://github.com/supabase/mcp/pull/437)) | Draft |
| [Tableau MCP](https://github.com/tableau/tableau-mcp) | | TypeScript | `partial` ([#1080](https://github.com/tableau/tableau-mcp/pull/1080)) | Since v5.1.1, behind a feature flag; no `directoryRead`, and no `ttlMs` or `cacheScope` on `skills/list` or `skills/get` |
| [TogoMCP](https://github.com/dbcls/togomcp) | | Python | `beta` ([#306](https://github.com/dbcls/togomcp/pull/306)) | Since v2.34.0, on FastMCP |
| [Univer Workspace](https://github.com/dream-num/univer-workspace) | | TypeScript | `beta` ([#289](https://github.com/dream-num/univer-workspace/pull/289)) | On the TypeScript SDK's extension, with a tool fallback |
| [World Monitor](https://github.com/koala73/worldmonitor) | `community` | TypeScript | `partial` ([#10518](https://github.com/koala73/worldmonitor/pull/10518)) | Lists five skills to fit a platform limit; `skills/get` serves all. No `ttlMs` or `cacheScope` on `skills/list` or `skills/get` |

## Gateways

| Implementation | Category | Language | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| [agentgateway](https://github.com/agentgateway/agentgateway) | | Rust | `in progress` ([#3579](https://github.com/agentgateway/agentgateway/issues/3579)) | Single-target pass-through merged, not yet released; multiplexing in [#4490](https://github.com/agentgateway/agentgateway/pull/4490) |
| [Archestra](https://archestra.ai/docs/platform-mcp-gateway-skills) | | TypeScript | `partial` ([#10800](https://github.com/archestra-ai/archestra/pull/10800)) | Serves organization skills; on by default from the 1.5.0 release candidates. No `ttlMs` or `cacheScope` on `skills/get` |
| [FastMCP Gateway](https://docs.horizon.prefect.io/skills) | | Python | `beta` | Hosted. Serves skills from hosted, external and virtual (Registry) servers with per-skill permissions; optional `list_skills` and `read_skill` tools |
| [LiteLLM](https://github.com/BerriAI/litellm) | | Python | `in progress` ([#47875](https://github.com/BerriAI/litellm/pull/47875)) | Fans `skills/list` and `skills/get` out to upstream servers |
| [MCPHub](https://github.com/samanhappy/mcphub) | `community` | TypeScript | `beta` ([#1508](https://github.com/samanhappy/mcphub/pull/1508)) | Since v1.3.0; publishes imported skills on global and group endpoints; no `directoryRead`. Passes the [conformance suite](https://github.com/modelcontextprotocol/conformance) server scenarios |
| [mcpproxy-go](https://github.com/smart-mcp-proxy/mcpproxy-go) | | Go | `partial` ([#1921](https://github.com/smart-mcp-proxy/mcpproxy-go/pull/1921)) | Reads upstream skills with digest checks and admin approval; gives them to agents as tools |
| [Metorial](https://github.com/metorial/metorial-platform) | | TypeScript | `partial` ([#1147](https://github.com/metorial/metorial-platform/pull/1147)) | Opt-in with `enable_skill_resources`. No `ttlMs` or `cacheScope` on `skills/get` |
| [reShapr](https://github.com/reshaprio/reshapr) | | Java | `partial` ([#606](https://github.com/reshaprio/reshapr/issues/606)) | Since 1.2.0, with `directoryRead`. No `ttlMs` or `cacheScope` on `skills/get` |
| [Speakeasy Gram](https://www.speakeasy.com/docs/ai-control-plane/mcp-gateway/skills/serving-skills-over-mcp) | | Go | `partial` ([#8268](https://github.com/speakeasy-api/gram/pull/8268)) | Behind a flag; serves `SKILL.md` only |
| [ToolHive](https://github.com/stacklok/toolhive) | | Go | `beta` ([#6512](https://github.com/stacklok/toolhive/pull/6512)) | Passes the extension through and authorizes each skill request |
| [Toolport](https://github.com/btsouth/toolport) | `community` | Rust | `in progress` ([#1335](https://github.com/btsouth/toolport/pull/1335)) | Relays the extension from upstream servers, prefixing skill URIs per server |
| [Warden](https://github.com/stephnangue/warden) | `community` | Go | `partial` ([#774](https://github.com/stephnangue/warden/pull/774)) | Filters `skills/list` and gates skill reads per caller. No `ttlMs` or `cacheScope` on `skills/get` |

## Hosts (including agent harnesses, IDEs, and web applications)

| Implementation | Category | Status | Notes |
| :--- | :--- | :--- | :--- |
| [agent-harness](https://github.com/ar27111994/agent-harness) | `community` | `planned` ([#492](https://github.com/ar27111994/agent-harness/issues/492)) | Digest-pinned skill store |
| [agentpool](https://github.com/phil65/agentpool) | `community` | `beta` | Consumes and serves skills on FastMCP 4.2 |
| [Agno](https://github.com/agno-agi/agno) | | `in progress` ([#11026](https://github.com/agno-agi/agno/pull/11026)) | Maintainer-written, in review |
| [APM](https://github.com/microsoft/apm) | | `requested` ([#3721](https://github.com/microsoft/apm/issues/3721)) | Agent Package Manager; request to install skills that servers publish. Deferred by a maintainer pending a design |
| [ChatGPT and Codex](https://developers.openai.com/plugins) | | `planned` | Skill import at plugin submission was rolled back in November 2026 until support ships across ChatGPT and Codex ([OpenAI in the working group Discord](https://discord.com/channels/1358869848138059966/1566650178935726231)) |
| [Cherry Studio](https://github.com/CherryHQ/cherry-studio) | | `partial` ([#22382](https://github.com/CherryHQ/cherry-studio/pull/22382)) | Discovery and verified loading through tools; rejects `"dynamic"` skills. Merged, not yet released |
| [Claude](https://claude.ai) | | `beta` | Public beta for connectors; on by default for Pro, Max and Ultra plans ([announcement](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)) |
| [Claude Code](https://github.com/anthropics/claude-code) | | `beta` | Public beta since v2.1.331; server skills run as `/<server>:<skill>` with per-version approval ([docs](https://code.claude.com/docs/en/mcp#use-skills-from-mcp-servers)) |
| [Enconvo](https://enconvo.com/) | | `beta` | Since 2.5.6. Lists and verifies served skills (digests, sizes, frontmatter), honors `ttlMs` and `directoryRead`. Closed source; self-reported in [#171](https://github.com/modelcontextprotocol/ext-skills/pull/171) |
| [fast-agent](https://github.com/evalstate/fast-agent/blob/main/docs/docs/mcp/skills-over-mcp.md) | `community` | `beta` | `/skills add` installs served skills after size, digest and frontmatter checks; first end-to-end interop with hf-mcp-server |
| [Glean (MCP client)](https://www.glean.com) | | `beta` | Admins import a connected server's skills via `skills/list`, verifying digests; static snapshot. Self-reported in [#165](https://github.com/modelcontextprotocol/ext-skills/pull/165) |
| [Goose](https://github.com/aaif-goose/goose) | | `planned` ([#12068](https://github.com/aaif-goose/goose/issues/12068)) | Earlier host PRs closed; to be built on rmcp's support |
| [harness](https://github.com/majorcontext/harness) | | `beta` | Lists, verifies and loads served skills ([#770](https://github.com/majorcontext/harness/pull/770)) |
| [Hermes Agent](https://github.com/NousResearch/hermes-agent) | | `in progress` ([#137746](https://github.com/NousResearch/hermes-agent/pull/137746)) | Community PR, no maintainer review yet |
| [Kilo Code](https://github.com/Kilo-Org/kilocode) | | `requested` ([#15733](https://github.com/Kilo-Org/kilocode/issues/15733)) | |
| [MCP Inspector](https://github.com/modelcontextprotocol/inspector/blob/main/clients/cli/README.md#skill-verification---verify) | `official` | `partial` | Since 2.6.0, including CLI skill verification; 2.13.0 moved onto the SDK's `ext/skills` |
| [mcpc](https://github.com/apify/mcpc) | | `beta` | Apify's MCP CLI; `skills-list` and `skills-get` with size and digest checks since v0.7.0 |
| [MCPJam Inspector](https://github.com/MCPJam/inspector) | | `beta` | App, CLI and SDK; verifies digests and frontmatter, namespaces skills by server. Aligned with the released spec in v3.17.0 |
| [Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/) | | `draft` | Released versions read `skill://index.json`. .NET adopted the extension on `main` (#10275), not yet released; the repo is not public |
| [NimbleBrain](https://github.com/NimbleBrainInc/nimblebrain) | | `beta` ([#1309](https://github.com/NimbleBrainInc/nimblebrain/pull/1309)) | Lazy fetch with digest checks |
| [opencode](https://github.com/anomalyco/opencode) | | `in progress` ([#64157](https://github.com/anomalyco/opencode/pull/64157)) | Experimental, behind the `mcp_skills` flag |
| [Paperclip](https://github.com/paperclipai/paperclip) | | `beta` ([#21219](https://github.com/paperclipai/paperclip/pull/21219)) | Verifies app skills against the manifest and asks for approval. Merged, not yet released |
| [PwrAgent](https://github.com/pwrdrvr/PwrAgent) | | `beta` ([#3707](https://github.com/pwrdrvr/PwrAgent/pull/3707)) | Desktop agent; relays server skills into threads |
| [qm](https://github.com/yc-software/qm) | | `partial` ([#3776](https://github.com/yc-software/qm/pull/3776)) | Imports each listed `SKILL.md` as a skill pack, reading all of them at import. Merged, not yet released |
| [vitehub](https://github.com/vite-hub/vitehub) | | `partial` | Serves its skills ([#3390](https://github.com/vite-hub/vitehub/pull/3390)); installs served skills by scanning `skill://` resources ([#2605](https://github.com/vite-hub/vitehub/pull/2605)) |
| [VS Code](https://github.com/microsoft/vscode) | | `beta` ([#345956](https://github.com/microsoft/vscode/pull/345956)) | GitHub Copilot; on by default since 1.147, with per-server consent ([announcement](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/skills-over-mcp-are-now-available-in-vs-code/4574580)) |
| [Warp](https://github.com/warpdotdev/warp) | | `requested` ([#16967](https://github.com/warpdotdev/warp/issues/16967)) | |
