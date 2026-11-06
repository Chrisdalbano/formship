<script setup lang="ts">
import { GAMES } from '~/data/games'
import { SITE } from '~~/shared/site'

usePageSeo({
  title: 'Studio | Formship Games',
  description: "How Formship Games works: one rule per game, hand-drawn characters, and updates driven by what players could not read. A label of Formship LLC, Orlando, Florida.",
  path: '/games/studio',
  image: GAMES[0]!.cover,
})

const mail = `mailto:${SITE.email}?subject=${encodeURIComponent('Formship Games')}`
</script>

<template>
  <div class="container studio">
    <p class="label"><NuxtLink to="/games/">Formship Games</NuxtLink> / Studio</p>
    <h1 class="h1 h1--page">Pick one rule. Spend the rest of the game making it fair.</h1>

    <div class="studio__grid">
      <div class="prose">
        <p class="lede">
          Formship started as a software company and still is one. Formship Games is where the same
          company makes games: one designer who programs and paints, and collaborators credited by
          name on every game they touch.
        </p>

        <h2 class="h3">One rule you can say out loud</h2>
        <p>
          Each game starts from a rule a player can repeat after one match. In Spare Knight, attacks
          never miss. In ThunderBashers, spinning is the only verb. In I Won't Be Abducted, the boy's
          kit never changes and only the night gets harder. The rest of the work is making that rule
          feel fair, and that work is mostly about what the player can see.
        </p>

        <h2 class="h3">The drawing is the slow step on purpose</h2>
        <p>
          Characters are drawn by hand: Spare Knight's painted cast, the papercraft standees in I Won't
          Be Abducted, the zombie portraits in Undead Signal. Tools exist to make everything around the
          drawing fast, so a finished frame reaches the game in under a minute.
        </p>

        <h2 class="h3">Ship small, then fix what players could not read</h2>
        <p>
          Every game here has a playable build first and an update after it. The updates come from
          watching people play: an interface that was hard to read, a boss nobody understood, a ball
          that killed without warning. Spare Knight is the first one going further, from a browser alpha
          to a full desktop game.
        </p>
      </div>

      <dl class="facts">
        <div><dt class="label">Label</dt><dd>Formship Games</dd></div>
        <div><dt class="label">Company</dt><dd>{{ SITE.legalName }}</dd></div>
        <div><dt class="label">Based in</dt><dd>{{ SITE.location }}</dd></div>
        <div><dt class="label">Founder and designer</dt><dd>{{ SITE.founder }}</dd></div>
        <div><dt class="label">Engines</dt><dd>Phaser, Unity, Godot</dd></div>
        <div><dt class="label">In development</dt><dd><NuxtLink to="/games/spare-knight">Spare Knight</NuxtLink></dd></div>
        <div><dt class="label">Contact</dt><dd><a :href="mail">{{ SITE.email }}</a></dd></div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.studio { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); display: grid; gap: 1.25rem; }
.studio .label a { text-decoration: none; }
.studio .h1 { max-width: 54rem; margin-bottom: clamp(1.5rem, 4vw, 3rem); }

.studio__grid { display: grid; gap: 3rem; align-items: start; }
@media (min-width: 52rem) { .studio__grid { grid-template-columns: 7fr 4fr; gap: 4rem; } }

.facts > div { display: grid; gap: 0.25rem; padding-block: 0.875rem; border-top: 1px solid var(--line); }
.facts > div:first-child { border-top-color: var(--line-strong); }
</style>
