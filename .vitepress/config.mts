import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

const repository = "https://github.com/modelcontextprotocol/ext-skills";

export default withMermaid(
  defineConfig({
    title: "MCP Skills Extension",
    description:
      "Discover and read Agent Skills over the Model Context Protocol",
    cleanUrls: true,
    rewrites: { "README.md": "index.md" },
    srcExclude: ["CONTRIBUTING.md", "AGENTS.md", "CLAUDE.md", "docs/**"],
    head: [["link", { rel: "icon", href: "/mcp.png" }]],

    markdown: {
      config(md) {
        // Reuse the repository README as the homepage without changing its GitHub links.
        md.core.ruler.before("block", "readme-links", (state) => {
          if (!(state.env.realPath ?? state.env.path)?.endsWith("/README.md"))
            return;
          state.src = state.src.replace(
            /\]\((specification\/stable\/skills\.mdx|docs\/[^)]*|AGENTS\.md|CONTRIBUTING\.md)\)/g,
            (_, target: string) =>
              target === "specification/stable/skills.mdx"
                ? "](/specification/stable/skills)"
                : `](${repository}/${target.endsWith("/") ? "tree" : "blob"}/main/${target})`,
          );
        });

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
        { text: "Home", link: "/" },
        {
          text: "Overview",
          link: "https://modelcontextprotocol.io/extensions/skills/overview",
        },
        { text: "Specification", link: "/specification/stable/skills" },
        {
          text: "SEP-2640",
          link: "https://modelcontextprotocol.io/seps/2640-skills-extension",
        },
        {
          text: "Working Group",
          link: "https://modelcontextprotocol.io/community/working-groups/skills-over-mcp",
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
          `https://github.com/modelcontextprotocol/ext-skills/edit/main/${relativePath === "specification/stable/skills.md" ? "specification/stable/skills.mdx" : relativePath === "index.md" ? "README.md" : relativePath}`,
      },
    },
  }),
);
