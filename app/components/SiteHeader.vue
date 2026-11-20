<script setup lang="ts">
// One header on every page: the white Formship logo and two links.
const route = useRoute()
const section = computed(() => {
  const p = route.path
  if (p.startsWith('/studio')) return 'studio'
  if (p.startsWith('/games')) return 'games'
  return ''
})

// The bar is clear over the top of a page and turns solid once you scroll.
const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 8 }
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="bar" :class="{ 'is-scrolled': scrolled }">
    <div class="container bar__in">
      <NuxtLink to="/" class="home" aria-label="Formship Games home">
        <FormshipLogo :height="30" />
      </NuxtLink>
      <nav class="nav" aria-label="Main">
        <NuxtLink to="/games/" :class="{ 'is-section': section === 'games' }">Games</NuxtLink>
        <NuxtLink to="/studio" :class="{ 'is-section': section === 'studio' }">Studio</NuxtLink>
        <a href="https://wavedash.com/games/spareknight-game" rel="noopener" class="play">Play the alpha</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.bar {
  position: sticky;
  top: 0;
  z-index: 50;
  view-transition-name: site-header;
  border-bottom: 1px solid transparent;
  transition: background-color 200ms linear, border-color 200ms linear;
}
.bar.is-scrolled {
  background: color-mix(in srgb, var(--bg) 86%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom-color: var(--line);
}

.bar__in {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  min-height: 4rem;
}

.home { display: block; padding-block: 0.5rem; color: var(--ink); }
.home:hover { color: var(--ink); }

.nav {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2.5vw, 2rem);
  font-size: 0.9375rem;
  font-weight: 500;
}

.nav a { position: relative; color: var(--mute); text-decoration: none; padding-block: 0.5rem; }
.nav a:hover, .nav a.is-section { color: var(--ink); }

/* The underline grows from the left on hover and stays under the current section. */
.nav a:not(.play)::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.2rem;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms var(--out);
}
.nav a:not(.play):hover::after, .nav a.is-section::after { transform: scaleX(1); }

.nav .play {
  padding: 0.4375rem 0.9375rem;
  border: 2px solid var(--line-strong);
  border-radius: 999px;
  color: var(--ink);
  transition: border-color 140ms linear, color 140ms linear, transform 180ms var(--snap);
}
.nav .play:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

@media (max-width: 30rem) {
  .nav .play { display: none; }
}
</style>
