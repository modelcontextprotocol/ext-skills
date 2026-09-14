# Publishing the Skills website

The site uses the same VitePress theme as `ext-tasks`, with GitHub Actions building
and deploying to GitHub Pages. The tasks custom domain currently points to
Cloudflare Pages; this site uses GitHub Pages.

## One-time Pages setup

An administrator must enable Pages with **GitHub Actions** as the source in
[repository settings](https://github.com/modelcontextprotocol/ext-skills/settings/pages).
For a repository that has not enabled Pages, the equivalent authenticated GitHub
CLI command is:

```sh
gh api --method POST repos/modelcontextprotocol/ext-skills/pages -f build_type=workflow
```

Merge the website changes, or run the deployment workflow on `main`:

```sh
gh workflow run deploy.yml --repo modelcontextprotocol/ext-skills --ref main
```

The initial site is available at `https://modelcontextprotocol.github.io/ext-skills/`.
The workflow takes the base path from `actions/configure-pages`, so assets, search,
and navigation work at the project URL and after adding a custom domain.

## Custom domain

Add this entry under the GitHub Pages sites in
[`modelcontextprotocol/dns/src/config/records.ts`](https://github.com/modelcontextprotocol/dns/blob/main/src/config/records.ts):

```typescript
{ subdomain: 'skills.extensions', type: 'CNAME', content: 'modelcontextprotocol.github.io' },
```

The DNS repository's GitHub Actions workflow applies the record through Pulumi
after merge. Coordinate that merge with setting the Pages custom domain:

```sh
gh api --method PUT repos/modelcontextprotocol/ext-skills/pages \
  -f cname=skills.extensions.modelcontextprotocol.io
gh workflow run deploy.yml --repo modelcontextprotocol/ext-skills --ref main
```

Once DNS verification and GitHub's certificate provisioning complete, enable
**Enforce HTTPS** in Pages settings, or run:

```sh
gh api --method PUT repos/modelcontextprotocol/ext-skills/pages -F https_enforced=true
```

GitHub Actions deployments use the repository's Pages domain setting; a `CNAME`
file in the build artifact does not configure that setting. No custom deployment
token is needed for routine publishing: the deployment job uses `GITHUB_TOKEN`
with `pages: write` and `id-token: write`. The one-time setup commands require an
authenticated administrator; those credentials are not stored in the workflow.

After setup, every push to `main` publishes the latest overview and specification.
Check the `github-pages` environment URL in the deployment run to verify publication.
