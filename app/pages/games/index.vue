<script setup lang="ts">
import { GAMES, RELEASES } from '~/data/games'
import { SITE } from '~~/shared/site'

const description = "Formship Games is the game label of Formship LLC in Orlando, Florida. Tactical and systemic games with hand-drawn art, designed and programmed by Christian D'Albano."

const [lead, ...rest] = GAMES

usePageSeo({
  title: 'Formship Games',
  description,
  path: '/games/',
  image: lead!.cover,
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
</script>

<template>
  <div class="games">
    <section class="container intro">
      <GamesLogo :height="72" class="intro__logo" />
      <h1 class="h1 h1--page">Small games built around one rule you can say out loud.</h1>
      <p class="lede">
        Formship Games is the game label of Formship LLC in Orlando, Florida. Tactical and systemic
        games with hand-drawn art, designed, programmed and directed by Christian D'Albano.
      </p>
    </section>

    <section class="container lead" aria-labelledby="lead-title">
      <NuxtLink :to="`/games/${lead!.slug}`" class="lead__art">
        <img :src="lead!.cover.src" :alt="lead!.cover.alt" :width="lead!.cover.width" :height="lead!.cover.height">
      </NuxtLink>
      <div class="lead__text">
        <p class="label status">{{ lead!.status }}</p>
        <h2 id="lead-title" class="h2">
          <NuxtLink :to="`/games/${lead!.slug}`">{{ lead!.title }}</NuxtLink>
        </h2>
        <p class="body-mute">{{ lead!.logline }}</p>
        <p>
          The browser alpha is playable today. The full game is being remade and expanded for a
          desktop release on Steam.
        </p>
        <p class="links">
          <NuxtLink :to="`/games/${lead!.slug}`">About the game</NuxtLink>
          <a :href="lead!.play[0]!.href" rel="noopener">{{ lead!.play[0]!.label }}</a>
        </p>
      </div>
    </section>

    <section class="container grid" aria-label="Released games">
      <article v-for="g in rest" :key="g.slug" class="card">
        <NuxtLink :to="`/games/${g.slug}`" class="card__art">
          <img :src="g.cover.src" :alt="g.cover.alt" :width="g.cover.width" :height="g.cover.height" loading="lazy">
        </NuxtLink>
        <p class="label status">{{ g.status }} · {{ g.engine }}</p>
        <h2 class="h3">
          <NuxtLink :to="`/games/${g.slug}`">{{ g.title }}</NuxtLink>
        </h2>
        <p class="body-mute">{{ g.logline }}</p>
      </article>
    </section>

    <section class="container sheet more" aria-labelledby="more-title">
      <h2 id="more-title" class="label">Also released</h2>
      <ul class="rows">
        <li v-for="r in RELEASES" :key="r.title" class="row">
          <img :src="r.image.src" :alt="r.image.alt" :width="r.image.width" :height="r.image.height" loading="lazy">
          <div>
            <h3 class="h3"><a :href="r.href" rel="noopener">{{ r.title }}</a></h3>
            <p class="body-mute">{{ r.logline }}</p>
            <p class="label">{{ r.engine }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="container sheet" aria-labelledby="studio-title">
      <h2 id="studio-title" class="label">Studio</h2>
      <div class="prose">
        <p class="lede">
          One designer who also programs and paints, with collaborators credited by name on each game.
          Every game here was updated after release, based on what players could and could not read.
        </p>
        <p>
          <NuxtLink to="/games/studio">How the studio works</NuxtLink> or write to
          <a :href="`mailto:${SITE.email}?subject=${encodeURIComponent('Formship Games')}`">{{ SITE.email }}</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro { padding-block: clamp(2.5rem, 6vw, 5rem) clamp(2rem, 4vw, 3.5rem); display: grid; gap: 1.25rem; }
.intro .h1 { max-width: 52rem; }
.intro .lede { max-width: 40rem; }
.intro__logo { margin: -10px 0 0 -18px; }

.status { color: var(--old); }

img { width: 100%; height: auto; border-radius: 4px; background: var(--surface); }

.lead {
  display: grid;
  gap: 1.75rem;
  align-items: center;
  padding-bottom: clamp(3rem, 6vw, 5rem);
}
@media (min-width: 56rem) {
  .lead { grid-template-columns: 7fr 5fr; gap: 3rem; }
}
.lead__text { display: grid; gap: 0.9rem; }
.lead__text h2 a, .card h2 a, .row h3 a { text-decoration: none; }
.links { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; }

.grid {
  display: grid;
  gap: 2.5rem 2rem;
  padding-bottom: var(--section);
}
@media (min-width: 44rem) { .grid { grid-template-columns: 1fr 1fr; } }

.card { display: grid; gap: 0.6rem; align-content: start; }
.card__art { margin-bottom: 0.4rem; }
.card__art img { aspect-ratio: 16 / 9; object-fit: cover; }

.rows { display: grid; gap: 1.75rem; }
.row { display: grid; gap: 1rem; align-items: start; }
@media (min-width: 40rem) { .row { grid-template-columns: 12rem 1fr; gap: 1.5rem; } }
.row img { aspect-ratio: 16 / 10; object-fit: cover; }
.row div { display: grid; gap: 0.35rem; }

.more { padding-block: clamp(3rem, 6vw, 5rem); }
</style>
