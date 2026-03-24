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
- `deep_question` — pull-quote style, large bold Cabin
- `unpopular_take` — blue accent-left-border card
- `creative`/`shuffle` — standard card with blue dot indicator

## Design Rules (CWS Corporate Standard)

- **Anti-AI aesthetic** — NO particles, gradients, floating robots, icon grids
- **Palette:** CWS Black #0F1419 (dark bands: header, hero, footer), CWS Blue #5B9BD5 (accent decorative), #2563EB (accent text for WCAG AA), #FAFBFC (page bg), #FFFFFF (cards)
- **Type:** Cabin (display, weight 700) + Lato (body, weights 300-700) + JetBrains Mono (logo)
- **Layout:** hybrid dark/light — dark header+hero+footer, light content sections with white cards + #E2E8F0 borders
- **Interactions:** 6 CWS micro-interactions (spring card entrance, tab cross-fade, hover lift, accordion, success SVG draw, skeleton shimmer)
- **Timing:** ease cubic-bezier(0.16,1,0.3,1), spring cubic-bezier(0.34,1.56,0.64,1), 60-80ms stagger
- **Accessibility:** prefers-reduced-motion blanket rule, --accent-text (#2563EB) for WCAG AA text contrast on light bg

## Deployment

GitHub Actions (`deploy.yml`) uses `withastro/action@v5` for build + deploy.
Multiposter webhook triggers rebuild via `repository_dispatch` event type `new_article`.
