<script setup lang="ts">
import { GAMES } from '~/data/games'
import { SITE } from '~~/shared/site'

usePageSeo({
  title: 'Studio | Formship Games',
  description: "Formship Games is an independent game studio of four in Orlando, Florida, and the studio name of Formship LLC.",
  path: '/studio',
  image: GAMES[0]!.og,
})

const mail = `mailto:${SITE.email}?subject=${encodeURIComponent('Formship Games')}`
</script>

<template>
  <div class="container studio">
    <h1 class="h1 h1--page">Four people in Orlando, making games with soul.</h1>

    <div class="studio__grid">
      <div class="prose">
        <p class="lede">
          Formship LLC started as a software company and now makes games only. Formship Games is a
          studio of four, and everyone is credited by name on the games they work on.
        </p>

        <h2 class="h3">Who we are</h2>
        <TeamList />
      </div>

      <dl v-reveal="120" class="facts">
        <div><dt class="label">Studio</dt><dd>Formship Games</dd></div>
        <div><dt class="label">Company</dt><dd>{{ SITE.legalName }}</dd></div>
        <div><dt class="label">Based in</dt><dd>{{ SITE.location }}</dd></div>
        <div><dt class="label">Founder</dt><dd>{{ SITE.founder }}</dd></div>
        <div><dt class="label">Engines</dt><dd>Phaser, Unity, Godot</dd></div>
        <div><dt class="label">In development</dt><dd><NuxtLink to="/games/spare-knight">Spare Knight</NuxtLink></dd></div>
        <div><dt class="label">Play</dt><dd><a href="https://formship.itch.io" rel="noopener">formship.itch.io</a></dd></div>
        <div><dt class="label">Contact</dt><dd><a :href="mail">{{ SITE.email }}</a></dd></div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.studio { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); display: grid; gap: 1.25rem; }
.studio .h1 { max-width: 54rem; margin-bottom: clamp(1.5rem, 4vw, 3rem); }

.studio__grid { display: grid; gap: 3rem; align-items: start; }
@media (min-width: 52rem) { .studio__grid { grid-template-columns: 7fr 4fr; gap: 4rem; } }

.facts > div { display: grid; gap: 0.25rem; padding-block: 0.875rem; border-top: 1px solid var(--line); }
.facts > div:first-child { border-top-color: var(--line-strong); }
</style>
