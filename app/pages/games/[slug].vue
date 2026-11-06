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
      <p class="label"><NuxtLink to="/games/">Formship Games</NuxtLink> / <span class="status">{{ game.status }}</span></p>
      <h1 class="h1 h1--page">{{ game.title }}</h1>
      <p class="lede">{{ game.logline }}</p>
      <p class="play">
        <a v-for="(p, i) in game.play" :key="p.href" :href="p.href" rel="noopener" :class="{ primary: i === 0 }">{{ p.label }}</a>
      </p>
    </header>

    <figure class="container cover">
      <img :src="game.cover.src" :alt="game.cover.alt" :width="game.cover.width" :height="game.cover.height">
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

    <section class="container shots" aria-label="Screenshots">
      <figure v-for="s in game.shots" :key="s.src">
        <img :src="s.src" :alt="s.alt" :width="s.width" :height="s.height" loading="lazy">
        <figcaption class="label">{{ s.alt }}</figcaption>
      </figure>
    </section>

    <section class="container sheet">
      <h2 class="label">Where it is now</h2>
      <div class="prose">
        <p v-for="(para, i) in game.now" :key="i">{{ para }}</p>
      </div>
    </section>

    <nav class="container sheet" aria-label="More games">
      <h2 class="label">More from the studio</h2>
      <ul class="more">
        <li v-for="g in others" :key="g.slug">
          <NuxtLink :to="`/games/${g.slug}`" class="h3">{{ g.title }}</NuxtLink>
          <p class="body-mute">{{ g.logline }}</p>
        </li>
      </ul>
    </nav>
  </article>
</template>

<style scoped>
.head { padding-block: clamp(2.5rem, 6vw, 5rem) 2rem; display: grid; gap: 1.1rem; }
.head .lede { max-width: 42rem; }
.head .label a { text-decoration: none; }
.status { color: var(--old); }

.play { display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem; align-items: center; margin-top: 0.5rem; }
.play .primary {
  padding: 0.75rem 1.25rem;
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
}
.play .primary:hover { background: var(--accent-hover); color: var(--accent-ink); }

img { width: 100%; height: auto; border-radius: 4px; background: var(--surface); }
.cover { padding-bottom: var(--section); }

.body { display: grid; gap: 2.5rem; align-items: start; }
@media (min-width: 64rem) { .body { grid-template-columns: 7fr 4fr; gap: 3rem; } }

.facts > div { display: grid; gap: 0.25rem; padding-block: 0.875rem; border-top: 1px solid var(--line); }
.facts > div:first-child { border-top-color: var(--line-strong); }

.shots {
  display: grid;
  gap: 2rem;
  padding-bottom: var(--section);
}
@media (min-width: 48rem) { .shots { grid-template-columns: 1fr 1fr; } }
.shots figure { display: grid; gap: 0.6rem; align-content: start; }
.shots figcaption { text-transform: none; letter-spacing: 0.01em; }

.more { display: grid; gap: 1.5rem; }
.more li { display: grid; gap: 0.3rem; }
.more a { text-decoration: none; }
</style>
