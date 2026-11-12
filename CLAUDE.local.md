# jufipai-website - Local Project Instructions

## Stack
- **Framework:** Astro 5.x (static output, zero JS by default)
- **Hosting:** GitHub Pages (custom domain: jufipai.com, `public/CNAME`)
- **Articles:** `public/data/articles.json` is authoritative — any array, even `[]`, wins.
  `src/lib/api.ts` falls back to `https://jufipai-linkedin-poster.onrender.com/articles` only when
  the file is missing or unreadable.
- **Rebuild trigger:** push to `main`, or `repository_dispatch` (`new_article`) from the poster.

## Quick Commands

```bash
npm ci               # Install (prove it exits 0 after any dependency change)
npm run build        # Build static site
npm run preview      # Preview production build

# Scan for secrets before committing
python3 ~/agents/security-lib/scan_secrets.py .
```

## Architecture (relaunch 2026-11)

- **English-only since 2026-11-11.** `src/pages/` — `index.astro`, `writing.astro`.
  `/about`, `/contact` and `/es` are redirects to `/` (`astro.config.mjs` `redirects`).
- `src/data/home.ts` — ALL homepage copy. Spanish strings are kept but unused.
- `src/components/` — Header, Footer (inline newsletter), Hero, HomePage, BookCall (booking
  section `#book`: email → embedded Calendly → "You're booked" + Before-the-call tiles),
  CustomerBanner ("Trusted by", bottom of home), SystemCard, ContentCard (writing cards).
- `src/scripts/` — `newsletter.ts` (footer, `type:'subscribe'`), `book-call.ts` (`type:'book_call'`,
  listens for Calendly `calendly.event_scheduled` from origin https://calendly.com only),
  `sheet-endpoint.ts` (the one Apps Script URL). All external modules, CSP-safe.
- `src/layouts/Base.astro` — lang, og:image, JSON-LD (name/url/logo only), CSP meta
  (`frame-src https://calendly.com` for the booking embed).
- Approved prototype for the booking flow: `~/prototypes/jufipai-website-book-call/` (2026-11-11).
- `src/styles/` — `tokens.css` (brand tokens) + `global.css`.
- `public/brand/` — official logo lockup, cropped customer logo, synthetic system screenshots.

## Rules (operator-approved spec, frozen 2026-11-04)

- **The approved prototype is the spec.** Visual changes need a new Rule #22 prototype first.
- **Brand:** navy `#1b365d` (deep `#142a49`), gold `#c5a44e` / `#e8d48b`. Never gold text on a light
  background. Header fully opaque navy.
- **Copy:** neutral and general. No people's names, no client or site names, no cities or states
  ("across the USA"). The customer banner is the only place a customer is named.
- **Claims:** describe only systems that exist in code. Figures come from a real data pull.
- **Systems order:** Property management featured first, then the rest alphabetically (EN and ES).
- **CSP:** `script-src 'self'` — no inline scripts or `on*` handlers; `assetsInlineLimit: 0`.
- **Public repo:** synthetic data only in assets (L192). Never commit drafts.
- **Keep untouched:** `articles.json` record shape and the sanitizer allowlist in `src/lib/api.ts`
  (the poster writes that file through the GitHub Contents API).

## Deployment

GitHub Actions (`deploy.yml`) uses `withastro/action` for build + deploy on push to `main`.
The poster's `repository_dispatch` (`new_article`) triggers the same workflow.
