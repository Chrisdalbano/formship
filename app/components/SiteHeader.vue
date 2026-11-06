<script setup lang="ts">
// One header on every page: same logo, same four links. Only the active link changes.
const route = useRoute()
const section = computed(() => {
  const p = route.path
  if (p.startsWith('/games')) return 'games'
  if (p === '/audit' || p.startsWith('/sample') || p.startsWith('/guides') || p.startsWith('/research')) return 'audit'
  if (p.startsWith('/about')) return 'about'
  return ''
})
</script>

<template>
  <header class="container header">
    <NuxtLink to="/" class="home" aria-label="Formship home">
      <SiteLogo />
    </NuxtLink>
    <nav class="nav" aria-label="Main">
      <NuxtLink to="/audit" :class="{ 'is-section': section === 'audit' }">Audit</NuxtLink>
      <NuxtLink to="/games/" :class="{ 'is-section': section === 'games' }">Games</NuxtLink>
      <a href="https://barato.si" rel="noopener" class="nav-wide">barato.si</a>
      <NuxtLink to="/about" :class="{ 'is-section': section === 'about' }" class="nav-wide">About</NuxtLink>
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

.nav a { color: var(--mute); text-decoration: none; }
.nav a:hover,
.nav a.is-section { color: var(--ink); }
.nav a.is-section { text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 0.45em; text-decoration-thickness: 2px; }

/* Phones: Audit and Games stay; barato.si and About are in the footer. */
@media (max-width: 30rem) {
  .nav-wide { display: none; }
}
</style>
