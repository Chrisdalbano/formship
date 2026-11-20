<script setup lang="ts">
import { GAMES, RELEASES } from '~/data/games'
import { SITE } from '~~/shared/site'

const description = "Formship Games is an independent game studio in Orlando, Florida. Tactical and systemic games with hand-drawn art, with Spare Knight in development for desktop."

const [lead, ...rest] = GAMES

usePageSeo({
  title: 'Games | Formship Games',
  description,
  path: '/games/',
  image: lead!.og,
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Formship Games',
      itemListElement: GAMES.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'VideoGame',
          name: g.title,
          description: g.logline,
          genre: g.genre,
          url: `${SITE.url}/games/${g.slug}`,
          author: { '@type': 'Person', name: SITE.founder },
          publisher: { '@id': `${SITE.url}/#organization` },
        },
      })),
    }),
  }],
})

const cards = [
  ...rest.map(g => ({ title: g.title, meta: `${g.genre}. ${g.status}.`, to: `/games/${g.slug}`, href: '', slug: g.slug, image: g.cover })),
  ...RELEASES.map(r => ({ title: r.title, meta: r.engine, to: '', href: r.href, slug: '', image: r.image })),
]

const { onMove, onLeave } = useTilt()
</script>

<template>
  <div class="games">
    <section class="container intro">
      <h1 class="h1 h1--page">Games</h1>
      <p class="lede">
        Tactical and systemic games with hand-drawn art. Every one of them plays in the browser,
        and credits are on each game's page.
      </p>
    </section>

    <section class="container lead" aria-labelledby="lead-title">
      <NuxtLink :to="`/games/${lead!.slug}`" class="lead__art" @pointermove="onMove" @pointerleave="onLeave">
        <Pic :shot="lead!.cover" eager :style="{ viewTransitionName: `art-${lead!.slug}` }" />
      </NuxtLink>
      <div class="lead__text">
        <p class="status">{{ lead!.status }}</p>
        <h2 id="lead-title" class="h2">
          <NuxtLink :to="`/games/${lead!.slug}`">{{ lead!.title }}</NuxtLink>
        </h2>
        <p class="lede">{{ lead!.logline }}</p>
        <p class="body-mute">
          The browser alpha is playable today. The full game is being remade and expanded for a
          desktop release on Steam.
        </p>
        <p class="lead__links">
          <a :href="lead!.play[0]!.href" class="btn btn--fill" rel="noopener">Play the alpha <span class="arrow" aria-hidden="true">→</span></a>
          <NuxtLink :to="`/games/${lead!.slug}`" class="btn">About the game</NuxtLink>
        </p>
      </div>
    </section>

    <section class="container grid" aria-labelledby="released-title">
      <h2 id="released-title" v-reveal class="h2">Released</h2>
      <div class="grid__cards">
        <GameCard v-for="(g, i) in cards" :key="g.title" v-reveal="i % 2 * 90" v-bind="g" />
      </div>
    </section>

    <section class="container outro">
      <p class="lede">
        Four people work on Spare Knight. Every game here was updated after release, based on what
        players could and could not read.
      </p>
      <p class="outro__links">
        <NuxtLink to="/studio" class="more">The studio</NuxtLink>
        <a href="https://formship.itch.io" rel="noopener" class="more">All our games on itch.io</a>
      </p>
    </section>
  </div>
</template>

<style scoped>
.intro { padding-block: clamp(2.5rem, 6vw, 5rem) clamp(2rem, 4vw, 3.5rem); display: grid; gap: 1.25rem; }
.intro .h1 { max-width: 52rem; }
.intro .lede { max-width: 40rem; }

.lead {
  display: grid;
  gap: 1.75rem;
  align-items: center;
  padding-bottom: var(--section);
}
@media (min-width: 56rem) {
  .lead { grid-template-columns: 7fr 5fr; gap: 3.5rem; }
}

.lead__art {
  --tx: 0;
  --ty: 0;
  display: block;
  border-radius: 14px;
  overflow: hidden;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line-strong), 0 0 100px -30px rgba(240, 166, 58, 0.3);
  transform: perspective(1400px) rotateX(calc(var(--ty) * -2.5deg)) rotateY(calc(var(--tx) * 3.5deg));
  transition: transform 300ms var(--out), box-shadow 300ms var(--out);
}
.lead__art:hover { box-shadow: 0 0 0 2px var(--accent), 0 0 120px -30px rgba(240, 166, 58, 0.45); }
.lead__art img { width: 100%; height: auto; }

.lead__text { display: grid; gap: 0.9rem; justify-items: start; }
.lead__text h2 a { text-decoration: none; }
.lead__links { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.5rem; }

.grid { padding-block: var(--section); border-top: 1px solid var(--line); }
.grid .h2 { margin-bottom: clamp(1.5rem, 3vw, 2.5rem); }
.grid__cards { display: grid; gap: 3rem 2rem; }
@media (min-width: 44rem) { .grid__cards { grid-template-columns: 1fr 1fr; } }

.outro { display: grid; gap: 1.25rem; padding-top: var(--section); border-top: 1px solid var(--line); }
.outro .lede { max-width: 40rem; }
.outro__links { display: flex; flex-wrap: wrap; gap: 0.5rem 1.75rem; }

@media (prefers-reduced-motion: reduce) {
  .lead__art { transform: none; }
}
</style>
