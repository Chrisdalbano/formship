export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },
  telemetry: false,
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'color-scheme', content: 'dark light' },
        { name: 'theme-color', content: '#141414', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#fdfdfd', media: '(prefers-color-scheme: light)' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/brand/formship-icon-gold.svg' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/inter-latin-wght-normal.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/jetbrains-mono-latin-wght-normal.woff2', crossorigin: 'anonymous' },
      ],
    },
  },
  experimental: {
    // No data fetching on this site. Skipping _payload.json also means no
    // research/ directory sits next to research.html, which keeps /research clean.
    payloadExtraction: false,
    appManifest: false,
  },
  nitro: {
    prerender: {
      routes: ['/', '/sample', '/guides/', '/research', '/about', '/privacy'],
      crawlLinks: true,
      // The crawler strips trailing slashes, so links to /guides/ would also produce a
      // guides.html beside the guides/ folder. Only guides/index.html should exist.
      ignore: [/^\/guides$/],
      // /research.html rather than /research/index.html, so GitHub Pages serves
      // the canonical URL directly with no trailing-slash redirect. The one exception
      // is /guides/: a route ending in a slash still becomes guides/index.html, which
      // keeps the index and guides/<slug>.html in one folder with no guides.html beside it.
      autoSubfolderIndex: false,
    },
  },
})
