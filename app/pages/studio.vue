<script setup lang="ts">
import { GAMES } from '~/data/games'
import { SITE } from '~~/shared/site'

usePageSeo({
  title: 'Studio | Formship Games',
  description: "Formship Games is an independent game studio run by a small group of friends in Orlando, Florida, and the studio name of Formship LLC.",
  path: '/studio',
  image: GAMES[0]!.og,
})

const mail = `mailto:${SITE.email}?subject=${encodeURIComponent('Formship Games')}`
</script>

<template>
  <div class="container studio">
    <h1 class="h1 h1--page">A small group of friends in Orlando, making games with soul.</h1>

    <div class="studio__grid">
      <div class="prose">
        <p class="lede">
          Formship LLC started as a software company and now makes games only. Formship Games is a
          small group of friends, and everyone is credited by name on the games they work on.
        </p>

        <h2 class="h3">Who we are</h2>
        <TeamList />

        <dl v-reveal class="facts">
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

      <div class="side">
        <!-- Two snapshots, shown small because the files are small. Warm and muted until hovered. -->
        <div class="snaps">
          <figure class="snap snap--a">
            <img src="/studio/storefront.webp" alt="Four of us outside a shop at night, each holding up a small card" width="580" height="432" loading="lazy">
          </figure>
          <figure class="snap snap--b">
            <img src="/studio/premiere.webp" alt="A group of friends with arms around each other in a cinema lobby" width="1183" height="494" loading="lazy">
          </figure>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.studio { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); display: grid; gap: 1.25rem; }
.studio .h1 { max-width: 54rem; margin-bottom: clamp(1.5rem, 4vw, 3rem); }

.studio__grid { display: grid; gap: 3rem; align-items: start; }
@media (min-width: 52rem) { .studio__grid { grid-template-columns: 7fr 4fr; gap: 4rem; } }

.side { display: grid; gap: 2.5rem; }
@media (min-width: 52rem) { .side { position: sticky; top: 6rem; } }

/* Snapshots as paper prints. The tone is pulled toward the site's warm dark so two phone
   photos sit in the page; hover brings the real colours back. */
.snaps { display: grid; gap: 0; max-width: 26rem; padding: 0.5rem 0.75rem 0; }
.snap {
  padding: 0.5rem 0.5rem 1.75rem;
  border-radius: 3px;
  background: var(--ink);
  box-shadow: 0 18px 30px -16px rgba(0, 0, 0, 0.9);
  transition: transform 260ms var(--snap);
}
.snap img {
  width: 100%;
  height: auto;
  filter: grayscale(1) sepia(0.45) contrast(1.04) brightness(0.92);
  transition: filter 300ms linear;
}
.snap--a { width: 78%; transform: rotate(-2.5deg); }
.snap--b { margin-top: -1.25rem; margin-left: auto; width: 100%; transform: rotate(1.5deg); }
.snap:hover { transform: rotate(0) scale(1.03); position: relative; z-index: 1; }
.snap:hover img { filter: none; }

@media (prefers-reduced-motion: reduce) {
  .snap { transition: none; }
  .snap:hover { transform: none; }
}

/* The facts run under the team in two columns, so both sides of the page end together. */
.facts { display: grid; column-gap: 3rem; max-width: none; margin-top: 2.5rem; }
@media (min-width: 36rem) { .facts { grid-template-columns: 1fr 1fr; } }
.facts > div { display: grid; gap: 0.25rem; align-content: start; margin: 0; padding-block: 0.875rem; border-top: 1px solid var(--line); }
</style>
