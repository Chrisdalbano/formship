<template>
  <header class="container header">
    <NuxtLink to="/" class="home" aria-label="Formship home">
      <SiteLogo />
    </NuxtLink>
    <nav class="nav" aria-label="Main">
      <NuxtLink to="/research">Research</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <CtaLink compact class="nav-cta" />
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
.nav a.router-link-exact-active:not(.nav-cta) { color: var(--ink); }

@media (max-width: 30rem) {
  .nav-cta { display: none; }
}
</style>
