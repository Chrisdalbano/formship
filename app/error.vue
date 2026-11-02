<script setup lang="ts">
useSeoMeta({ title: 'Page not found | Formship', robots: 'noindex' })
</script>

<template>
  <SiteHeader />
  <main class="container missing">
    <h1 class="h1 h1--page">This page isn't here.</h1>
    <p class="lede"><NuxtLink to="/">Go to the home page.</NuxtLink></p>
  </main>
  <SiteFooter />
</template>

<style scoped>
.missing { padding-block: var(--section); display: grid; gap: 1.5rem; }
</style>
