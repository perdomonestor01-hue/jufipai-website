import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jufipai.com',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  // About/Contact are hidden until they are redone (operator, 2026-11-04). Static output
  // renders these as meta-refresh pages; no script, so they also pass CSP script-src 'self'.
  redirects: {
    '/about': '/',
    '/contact': '/',
  },
  vite: {
    build: {
      // CSP script-src 'self': never inline a client script into the HTML.
      assetsInlineLimit: 0,
    },
  },
});
