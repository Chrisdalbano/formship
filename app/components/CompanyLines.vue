<script setup lang="ts">
// The company's three lines. Shown on the homepage (below the audit) and on About,
// so a visitor who arrives for one of them can see what else the company is.
withDefaults(defineProps<{ heading?: string }>(), { heading: 'What Formship makes' })

const lines = [
  {
    name: 'Help-center drift audits',
    to: '/',
    text: 'We read a SaaS company\'s public changelog against its public help center and report the articles a shipped change made wrong. $149 flat.',
  },
  {
    name: 'Formship Games',
    to: '/games/',
    text: 'Our game label. Tactical and systemic games with hand-drawn art. Spare Knight, a tactical roguelike, is in development.',
  },
  {
    name: 'barato.si',
    href: 'https://barato.si',
    text: 'A daily index of US price drops and probable price errors, in Spanish and English.',
  },
]
</script>

<template>
  <section class="container sheet lines" aria-labelledby="lines-title">
    <h2 id="lines-title" class="label">{{ heading }}</h2>
    <ul class="rows">
      <li v-for="l in lines" :key="l.name" class="row">
        <h3 class="h3">
          <NuxtLink v-if="l.to" :to="l.to">{{ l.name }}</NuxtLink>
          <a v-else :href="l.href" rel="noopener">{{ l.name }}</a>
        </h3>
        <p class="body-mute">{{ l.text }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.rows { display: grid; gap: 0; }
.row {
  display: grid;
  gap: 0.35rem;
  padding-block: 1.1rem;
  border-top: 1px solid var(--line);
}
.row:first-child { border-top-color: var(--line-strong); }
@media (min-width: 48rem) {
  .row { grid-template-columns: 16rem 1fr; gap: 2rem; align-items: baseline; }
}
.row h3 a { text-decoration: none; }
.row h3 a:hover { color: var(--accent); }
</style>
