<script setup lang="ts">
import { MAILTO, SITE } from '~~/shared/site'

// The page-not-found screen has its own Cog, so it turns this one off.
withDefaults(defineProps<{ cog?: boolean }>(), { cog: true })
</script>

<template>
  <footer class="foot">
    <div class="container foot__in">
      <!-- Cog stands on the footer's top edge. -->
      <CogBuddy v-if="cog" class="foot__cog" />

      <div class="foot__brand">
        <NuxtLink to="/" aria-label="Formship Games home" class="foot__logo"><FormshipLogo :height="22" /></NuxtLink>
        <p>Formship Games is the studio name of {{ SITE.legalName }}. {{ SITE.location }}.</p>
        <p>© 2026 {{ SITE.legalName }}</p>
      </div>

      <ul class="foot__links">
        <li><NuxtLink to="/games/">Games</NuxtLink></li>
        <li><NuxtLink to="/studio">Studio</NuxtLink></li>
        <li><a href="https://wavedash.com/games/spareknight-game" rel="noopener">Wavedash</a></li>
        <li><a href="https://formship.itch.io" rel="noopener">itch.io</a></li>
        <li><a :href="MAILTO">{{ SITE.email }}</a></li>
        <li><NuxtLink to="/privacy">Privacy</NuxtLink></li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  position: relative;
  margin-top: 7.5rem;
  border-top: 1px solid var(--line-strong);
  view-transition-name: site-footer;
}

.foot__in {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem 3rem;
  padding-block: 2.5rem 3rem;
  color: var(--mute);
  font-size: 0.875rem;
}

/* His feet sit a few pixels into the line, so he reads as standing on it. */
.foot__cog { position: absolute; right: var(--gutter); bottom: calc(100% - 7px); }

.foot__brand { display: grid; gap: 0.5rem; max-width: 30rem; }
.foot__logo { display: block; width: max-content; margin-bottom: 0.375rem; color: var(--ink); }
.foot__logo:hover { color: var(--ink); }

.foot__links { display: flex; flex-wrap: wrap; align-content: start; gap: 0.5rem 1.5rem; }
.foot__links a { text-decoration: none; }
.foot__links a:hover { color: var(--ink); }
</style>
