import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

const repository = "https://github.com/modelcontextprotocol/ext-skills";
const base = process.env.DOCS_BASE || "/";

export default withMermaid(
  defineConfig({
    title: "MCP Skills Extension",
    description:
      "Discover and read Agent Skills over the Model Context Protocol",
    base,
    srcExclude: [
      "README.md",
      "CONTRIBUTING.md",
      "AGENTS.md",
      "CLAUDE.md",
      "docs/**",
    ],
    head: [["link", { rel: "icon", href: `${base}mcp.png` }]],

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
        { text: "Overview", link: "/" },
        { text: "Specification", link: "/specification/stable/skills" },
        {
          text: "SEP-2640",
          link: "https://modelcontextprotocol.io/seps/2640-skills-extension",
        },
        {
          text: "Working Group",
          link: "https://modelcontextprotocol.io/community/skills-over-mcp/charter",
        },
      ],
      sidebar: {
        "/specification/": [
          {
            text: "Specification",
            items: [{ text: "Skills", link: "/specification/stable/skills" }],
          },
        ],
      },
      socialLinks: [{ icon: "github", link: repository }],
      search: { provider: "local" },
      editLink: {
        pattern: ({ relativePath }) =>
          `https://github.com/modelcontextprotocol/ext-skills/edit/main/${relativePath === "specification/stable/skills.md" ? "specification/stable/skills.mdx" : relativePath}`,
      },
    },
  }),
);
