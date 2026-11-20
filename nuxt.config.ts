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
        { name: 'color-scheme', content: 'dark' },
        { name: 'theme-color', content: '#100f0e' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/brand/formship-icon-dark.svg' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/bricolage-grotesque-latin-wght-normal.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/inter-latin-wght-normal.woff2', crossorigin: 'anonymous' },
      ],
    },
  },
  experimental: {
    // No data fetching on this site. Skipping _payload.json also means no
    // research/ directory sits next to research.html, which keeps /research clean.
    payloadExtraction: false,
    appManifest: false,
    // Route changes run inside the browser's View Transitions API: the page cross-fades
    // and a game's picture travels from its card to its page. Browsers without it just navigate.
    viewTransition: true,
  },
  // Old addresses. Static hosting, so each one is a small redirect page.
  routeRules: {
    '/about': { redirect: '/studio' },
    '/games/studio': { redirect: '/studio' },
  },
  nitro: {
    prerender: {
      routes: ['/', '/studio', '/about', '/games/studio', '/privacy', '/games/', '/games/spare-knight', '/games/i-wont-be-abducted', '/games/thunderbashers'],
      crawlLinks: true,
      // The crawler strips trailing slashes, so links to /guides/ would also produce a
      // guides.html beside the guides/ folder. Only guides/index.html should exist.
      ignore: [/^\/guides$/, /^\/games$/,
        // The audit service closed on 2026-11-20. Its pages are not generated; the source
        // files are still in app/pages.
        /^\/audit/, /^\/sample/, /^\/guides/, /^\/research/],
      // /research.html rather than /research/index.html, so GitHub Pages serves
      // the canonical URL directly with no trailing-slash redirect. The one exception
      // is /guides/: a route ending in a slash still becomes guides/index.html, which
      // keeps the index and guides/<slug>.html in one folder with no guides.html beside it.
      autoSubfolderIndex: false,
    },
  },
})
