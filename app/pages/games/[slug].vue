<script setup lang="ts">
import { gameBySlug, GAMES } from '~/data/games'
import { SITE } from '~~/shared/site'

const route = useRoute()
const game = gameBySlug(String(route.params.slug))
if (!game) throw createError({ statusCode: 404, statusMessage: 'Game not found', fatal: true })

const others = GAMES.filter(g => g.slug !== game.slug)

usePageSeo({
  title: `${game.title} | Formship Games`,
  description: game.logline,
  path: `/games/${game.slug}`,
  image: game.og,
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: game.title,
      description: game.logline,
      genre: game.genre,
      gamePlatform: game.platforms,
      image: `${SITE.url}${game.cover.src}`,
      url: `${SITE.url}/games/${game.slug}`,
      author: { '@type': 'Person', name: SITE.founder },
      publisher: { '@id': `${SITE.url}/#organization` },
    }),
  }],
})
</script>

<template>
  <article class="game">
    <header class="container head">
      <p class="status">{{ game.status }}</p>
      <h1 class="h1 h1--page">{{ game.title }}</h1>
      <p class="lede">{{ game.logline }}</p>
      <p class="play">
        <a
          v-for="(p, i) in game.play"
          :key="p.href"
          :href="p.href"
          rel="noopener"
          class="btn"
          :class="{ 'btn--fill': i === 0 }"
        >{{ p.label }} <span v-if="i === 0" class="arrow" aria-hidden="true">→</span></a>
      </p>
    </header>

    <figure class="container cover">
      <Pic :shot="game.cover" eager sizes="(min-width: 82rem) 76rem, 100vw" :style="{ viewTransitionName: `art-${game.slug}` }" />
    </figure>

    <section class="container sheet">
      <h2 class="label">The game</h2>
      <div class="body">
        <div class="prose">
          <p v-for="(para, i) in game.story" :key="i">{{ para }}</p>
        </div>
        <dl class="facts">
          <div><dt class="label">Genre</dt><dd>{{ game.genre }}</dd></div>
          <div><dt class="label">Engine</dt><dd>{{ game.engine }}</dd></div>
          <div><dt class="label">Platforms</dt><dd>{{ game.platforms }}</dd></div>
          <div><dt class="label">Credits</dt><dd>{{ game.credits }}</dd></div>
        </dl>
      </div>
    </section>

    <section class="container gallery" aria-label="Screenshots">
      <ShotGallery :shots="game.shots" />
    </section>

    <section class="container sheet">
      <h2 class="label">Where it is now</h2>
      <div class="prose">
        <p v-for="(para, i) in game.now" :key="i">{{ para }}</p>
      </div>
    </section>

    <nav class="container others" aria-labelledby="others-title">
      <h2 id="others-title" class="h2">More from the studio</h2>
      <div class="others__grid">
        <GameCard
          v-for="(g, i) in others"
          :key="g.slug"
          v-reveal="i * 90"
          :title="g.title"
          :meta="g.genre"
          :image="g.cover"
          :to="`/games/${g.slug}`"
          :slug="g.slug"
        />
      </div>
    </nav>
  </article>
</template>

<style scoped>
.head { padding-block: clamp(2.5rem, 6vw, 5rem) 2rem; display: grid; gap: 1rem; justify-items: start; }
.head .lede { max-width: 42rem; }
.play { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-top: 0.75rem; }

.cover { padding-bottom: var(--section); }
.cover img {
  width: 100%;
  height: auto;
  border-radius: 14px;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line-strong), 0 0 120px -40px rgba(240, 166, 58, 0.3);
}

.body { display: grid; gap: 2.5rem; align-items: start; }
@media (min-width: 64rem) { .body { grid-template-columns: 7fr 4fr; gap: 3rem; } }

.facts > div { display: grid; gap: 0.25rem; padding-block: 0.875rem; border-top: 1px solid var(--line); }
.facts > div:first-child { border-top-color: var(--line-strong); }

.gallery { padding-bottom: var(--section); }

.others { padding-top: var(--section); border-top: 1px solid var(--line); }
.others .h2 { margin-bottom: clamp(1.5rem, 3vw, 2.5rem); }
.others__grid { display: grid; gap: 3rem 2rem; }
@media (min-width: 44rem) { .others__grid { grid-template-columns: 1fr 1fr; } }
</style>
