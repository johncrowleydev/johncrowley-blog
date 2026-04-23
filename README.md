# John Crowley Blog

Professional Next.js + TypeScript markdown blog with static export for GitHub Pages.

## Stack

- Next.js App Router
- TypeScript
- Markdown posts via gray-matter + remark
- GitHub Actions deployment to GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Publish a new post

Add a new markdown file under `content/posts/` with frontmatter:

```md
---
title: "Post title"
date: "2026-04-21"
excerpt: "Short summary"
---

Your post content here.
```

Push to `main` and GitHub Actions will rebuild and deploy the site.
