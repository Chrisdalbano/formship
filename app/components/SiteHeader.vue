<script setup lang="ts">
// The homepage hero has its own CTA, so one screen never shows two.
const route = useRoute()
const showCta = computed(() => route.path !== '/')
const inGuides = computed(() => route.path.startsWith('/guides'))
</script>

<template>
  <header class="container header">
    <NuxtLink to="/" class="home" aria-label="Formship home">
      <SiteLogo />
    </NuxtLink>
    <nav class="nav" aria-label="Main">
      <NuxtLink to="/sample">Sample</NuxtLink>
      <NuxtLink to="/guides/" :class="{ 'is-section': inGuides }">Guides</NuxtLink>
      <NuxtLink to="/research" class="nav-wide">Research</NuxtLink>
      <NuxtLink to="/about" class="nav-wide">About</NuxtLink>
      <CtaLink v-if="showCta" compact class="nav-cta" />
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-block: 1.25rem;
}

/* The logo file has built-in padding (100 of 1100 wide, 69 of 400 tall). Pull it out so the wordmark sits on the grid. */
.home { display: block; margin: -11px 0 -11px -16px; }

.nav {
  display: flex;
  align-items: center;
  gap: clamp(0.875rem, 2.5vw, 1.75rem);
  font-size: 0.9375rem;
}

.nav a:not(.nav-cta) { color: var(--mute); text-decoration: none; }
.nav a:not(.nav-cta):hover,
.nav a.router-link-exact-active:not(.nav-cta),
.nav a.is-section { color: var(--ink); }

/* Phones: Sample and Guides stay; Research and About are one tap away in the footer. */
@media (max-width: 30rem) {
  .nav-cta,
  .nav-wide { display: none; }
}
</style>
