<script setup lang="ts">
import { SITE } from '~~/shared/site'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${SITE.url}/`,
  logo: SITE.logo,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Orlando',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  founder: { '@type': 'Person', name: SITE.founder },
}

// Mouseflow (same loader as barato.si and chrisdalbano.com). Off while the project id is empty.
const mouseflow = SITE.mouseflowProject
  ? [{
      type: 'text/javascript' as const,
      innerHTML: `window._mfq=window._mfq||[];(function(){var mf=document.createElement("script");mf.type="text/javascript";mf.defer=true;mf.src="//cdn.mouseflow.com/projects/${SITE.mouseflowProject}.js";document.getElementsByTagName("head")[0].appendChild(mf);})();`,
    }]
  : []

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(organization) }, ...mouseflow],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <a class="skip" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <NuxtPage />
  </main>
  <SiteFooter />
  <ClientOnly><EggKonami /></ClientOnly>
</template>
