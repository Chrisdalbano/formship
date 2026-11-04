<script setup lang="ts">
import { GUIDES, guidePath } from '~/data/guides'

usePageSeo({
  title: 'Guides for help-center and docs owners | Formship',
  description: 'Practical guides for docs and support owners on keeping a help center in step with a product that keeps shipping.',
  path: '/guides/',
})

const list = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: GUIDES.map((g, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: pageUrl(guidePath(g.slug)),
    name: g.title,
  })),
}

useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(list) }] })
</script>

<template>
  <div class="container guides">
    <header class="guides__head">
      <p class="label">Guides</p>
      <h1 class="h1 h1--page">Keeping a help center true to the product.</h1>
      <p class="lede guides__deck">
        Short, practical notes for whoever owns the docs or the support site. Each one works without
        buying anything from us.
      </p>
    </header>

    <ul class="guides__list">
      <li v-for="g in GUIDES" :key="g.slug" class="guides__item">
        <NuxtLink :to="guidePath(g.slug)" class="guides__link">
          <h2 class="h3 guides__title">{{ g.title }}</h2>
          <p class="guides__desc">{{ g.description }}</p>
        </NuxtLink>
      </li>
    </ul>

    <RequestBlock heading="Or have us check it for you." />
  </div>
</template>

<style scoped>
.guides { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); }

.guides__head { display: grid; gap: 1.25rem; max-width: 56rem; }
.guides__deck { max-width: 40rem; }

.guides__list { margin-block: clamp(2.5rem, 5vw, 4rem); max-width: 48rem; }

.guides__item { border-top: 1px solid var(--line); }
.guides__item:last-child { border-bottom: 1px solid var(--line); }

.guides__link {
  display: grid;
  gap: 0.375rem;
  padding-block: 1.25rem;
  text-decoration: none;
}

.guides__link:hover .guides__title { color: var(--accent); }
.guides__title { font-size: 1.3125rem; transition: color 140ms linear; }
.guides__desc { color: var(--mute); max-width: 40rem; }
</style>
