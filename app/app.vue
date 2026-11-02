<script setup lang="ts">
import { SITE } from '~~/shared/site'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/brand/formship-horizontal-blue.svg`,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Orlando',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  founder: { '@type': 'Person', name: SITE.founder },
}

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(organization) }],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <a class="skip" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <NuxtPage />
  </main>
  <div class="container"><hr class="rule"></div>
  <SiteFooter />
</template>

<style scoped>
.rule { margin: 0; border: 0; border-top: 1px solid var(--line); }
</style>
