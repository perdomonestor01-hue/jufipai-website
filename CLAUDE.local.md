# jufipai-website - Local Project Instructions

## Stack
- **Framework:** Astro 5.x (SSG, zero JS by default)
- **Hosting:** GitHub Pages (custom domain: jufipai.com)
- **Content:** Fetched from multiposter API at build time
- **API:** `https://jufipai-linkedin-poster.onrender.com/articles`
- **Rebuild trigger:** `repository_dispatch` webhook from multiposter

## Quick Commands

```bash
npm run dev          # Dev server with HMR
npm run build        # Build static site (fetches articles)
npm run preview      # Preview production build

# Scan for secrets before committing
python3 ~/agents/security-lib/scan_secrets.py .
```

## Architecture

- `src/pages/` — 4 pages: index, writing, about, contact
- `src/components/` — Header, Footer, Hero, ContentCard
- `src/layouts/Base.astro` — HTML wrapper with SEO, fonts, View Transitions
- `src/lib/api.ts` — Build-time article fetch from Render API
- `src/lib/i18n.ts` — EN/ES translations (client-side toggle)
- `src/styles/` — tokens.css (design tokens) + global.css (reset, utilities)
- `public/` — favicon, CNAME (copied to dist as-is)

## Content Types

Articles display differently based on `contentType`:
- `article` — image card with Unsplash photo, title, teaser, read time
- `deep_question` — pull-quote style, large serif italic
- `unpopular_take` — accent-left-border card
- `creative`/`shuffle` — standard card with teal dot indicator

## Design Rules

- **Anti-AI aesthetic** — NO particles, gradients, floating robots, icon grids
- **Color:** warm off-white (#FAFAF8), teal accent (#14B8A6)
- **Type:** Instrument Serif (display) + Inter (body) + JetBrains Mono (accents)
- **Layout:** asymmetric, editorial, generous whitespace

## Deployment

GitHub Actions (`deploy.yml`) uses `withastro/action@v5` for build + deploy.
Multiposter webhook triggers rebuild via `repository_dispatch` event type `new_article`.
