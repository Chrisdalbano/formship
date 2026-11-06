<script setup lang="ts">
import { SITE } from '~~/shared/site'

const description = 'We read your public changelog against your public help center and return the articles a shipped change made wrong, with the exact quote and a corrected sentence. $149 flat, 48 hours, pay after you read it.'

usePageSeo({ title: 'Help-center drift audits | Formship', description, path: '/audit' })

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Help-center drift audit',
  serviceType: 'Documentation audit',
  description,
  url: `${SITE.url}/audit`,
  provider: { '@id': `${SITE.url}/#organization` },
  offers: {
    '@type': 'Offer',
    price: '149',
    priceCurrency: 'USD',
    description: 'Flat price. Up to 60 public help articles against the last 90 days of a public changelog, delivered in 48 hours, paid after reading.',
  },
}

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(service) }],
})
</script>

<template>
  <div>
    <HomeHero />
    <HowItWorks />
    <PriceBlock />
    <FaqList />
  </div>
</template>
