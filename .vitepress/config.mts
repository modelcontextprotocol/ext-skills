import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

const repository = "https://github.com/modelcontextprotocol/ext-skills";

export default withMermaid(
  defineConfig({
    title: "MCP Skills Extension",
    description:
      "Discover and read Agent Skills over the Model Context Protocol",
    cleanUrls: true,
    rewrites: { "specification/stable/skills.md": "index.md" },
    srcExclude: [
      "README.md",
      "SECURITY.md",
      "CONTRIBUTING.md",
      "AGENTS.md",
      "CLAUDE.md",
      "docs/**",
    ],
    head: [["link", { rel: "icon", href: "/mcp.png" }]],

    markdown: {
      config(md) {
        // Render the existing MDX specification's callout after Markdown inclusion.
        md.core.ruler.before("block", "mdx-notes", (state) => {
          state.src = state.src
            .replace(/^<Note>\s*$/gm, "::: info\n")
            .replace(/^<\/Note>\s*$/gm, ":::\n");
        });
      },
    },

    themeConfig: {
      outline: [2, 3],
      nav: [
        {
          text: "Overview",
          link: "https://modelcontextprotocol.io/extensions/skills/overview",
        },
        {
          text: "SEP-2640",
          link: "https://modelcontextprotocol.io/seps/2640-skills-extension",
        },
        {
          text: "Working Group",
          link: "https://modelcontextprotocol.io/community/working-groups/skills-over-mcp",
        },
      ],
      socialLinks: [{ icon: "github", link: repository }],
      search: { provider: "local" },
      editLink: {
        pattern:
          "https://github.com/modelcontextprotocol/ext-skills/edit/main/specification/stable/skills.mdx",
      },
    },
  }),
);
