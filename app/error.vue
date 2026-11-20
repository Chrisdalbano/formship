<script setup lang="ts">
import { LOST } from '~/data/banter'

useSeoMeta({ title: 'Page not found | Formship Games', robots: 'noindex' })

const home = () => clearError({ redirect: '/games/' })
</script>

<template>
  <SiteHeader />
  <main class="container missing">
    <h1 class="h1 h1--page">This page isn't here.</h1>
    <div class="missing__scene">
      <ClientOnly><DialogBox :lines="LOST" @done="home" /></ClientOnly>
      <span class="missing__cog" aria-hidden="true" />
    </div>
    <p class="missing__links">
      <NuxtLink to="/games/" class="btn btn--fill">See the games <span class="arrow" aria-hidden="true">→</span></NuxtLink>
      <NuxtLink to="/" class="btn">Home</NuxtLink>
    </p>
  </main>
  <SiteFooter :cog="false" />
</template>

<style scoped>
.missing { padding-block: var(--section) 0; display: grid; gap: 2.5rem; justify-items: start; }
.missing__scene { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 1rem; min-height: 180px; }
.missing__cog {
  display: block;
  width: 144px;
  height: 180px;
  background: url('/mascot/cog-idle.webp') 0 0 / 800% 100% no-repeat;
  animation: missing-idle 1.1s steps(8) infinite;
}
.missing__links { display: flex; flex-wrap: wrap; gap: 0.75rem; }

@keyframes missing-idle { to { background-position: -1152px 0; } }
@media (prefers-reduced-motion: reduce) { .missing__cog { animation: none; } }
</style>
