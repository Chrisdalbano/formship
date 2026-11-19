<script setup lang="ts">
import { GAMES } from '~/data/games'
import { SITE } from '~~/shared/site'

const [lead, ...rest] = GAMES

usePageSeo({
  title: 'Formship Games | Independent game studio in Orlando, Florida',
  description: 'Formship Games is an independent game studio in Orlando, Florida. Tactical and systemic games with hand-drawn art. Spare Knight, a tactical roguelike where attacks never miss, is in development for desktop.',
  path: '/',
  image: lead!.og,
})

const mail = `mailto:${SITE.email}?subject=${encodeURIComponent('Formship Games')}`
</script>

<template>
  <div class="home">
    <section class="container intro" aria-labelledby="home-title">
      <p class="label">Independent game studio · {{ SITE.location }}</p>
      <h1 id="home-title" class="intro__title">Small games built around one rule you can say out loud.</h1>
      <p class="intro__sub">
        We are four people making Spare Knight, a tactical roguelike where attacks never miss. The
        browser alpha is playable today, and the full game is in development for desktop, aimed at Steam.
      </p>
      <div class="intro__action">
        <NuxtLink :to="`/games/${lead!.slug}`" class="line__button">About Spare Knight</NuxtLink>
        <a :href="lead!.play[0]!.href" class="line__more" rel="noopener">{{ lead!.play[0]!.label }}</a>
      </div>
    </section>

    <section id="games" class="line" aria-labelledby="games-title">
      <div class="container line__top">
        <div class="line__copy">
          <p class="label line__eyebrow">Games</p>
          <h2 id="games-title" class="h2">One in development, the rest released and playable.</h2>
          <p class="line__sub">
            Tactical and systemic games with hand-drawn art. Each one was updated after release from
            what players could not read.
          </p>
        </div>
        <div class="line__action">
          <NuxtLink to="/games/" class="line__button">See the games</NuxtLink>
        </div>
      </div>
      <div class="container games">
        <NuxtLink :to="`/games/${lead!.slug}`" class="games__lead">
          <img :src="lead!.cover.src" :alt="lead!.cover.alt" :width="lead!.cover.width" :height="lead!.cover.height">
          <span class="label">{{ lead!.title }} · {{ lead!.status }}</span>
        </NuxtLink>
        <NuxtLink v-for="g in rest" :key="g.slug" :to="`/games/${g.slug}`" class="games__item">
          <img :src="g.cover.src" :alt="g.cover.alt" :width="g.cover.width" :height="g.cover.height" loading="lazy">
          <span class="label">{{ g.title }} · {{ g.status }}</span>
        </NuxtLink>
      </div>
    </section>

    <section id="studio" class="line line--last" aria-labelledby="studio-title">
      <div class="container line__top">
        <div class="line__copy">
          <p class="label line__eyebrow">Studio</p>
          <h2 id="studio-title" class="h2">Four people. The design, art, story and music are our own work.</h2>
        </div>
        <div class="line__action">
          <NuxtLink to="/games/studio" class="line__button">How we work</NuxtLink>
          <a :href="mail" class="line__more">{{ SITE.email }}</a>
        </div>
      </div>
      <div class="container">
        <TeamList />
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro {
  display: grid;
  gap: 1.25rem;
  padding-block: clamp(3rem, 9vw, 7rem) clamp(3rem, 6vw, 5rem);
}

.intro__title {
  max-width: 18ch;
  font-size: clamp(2.5rem, 6.4vw, 5.5rem);
  font-weight: 640;
  line-height: 1.02;
  letter-spacing: -0.042em;
}

.intro__sub, .line__sub {
  max-width: 38rem;
  font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
  line-height: 1.5;
  color: var(--mute);
  letter-spacing: -0.006em;
}

.intro__action { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; margin-top: 0.5rem; }

.line { border-top: 1px solid var(--line); scroll-margin-top: 1rem; }
.line--last { padding-bottom: clamp(3rem, 7vw, 5.5rem); }

.line__top {
  display: grid;
  gap: 2rem;
  padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2rem, 4vw, 3rem);
}
@media (min-width: 60rem) {
  .line__top { grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 3rem; }
}

.line__copy { display: grid; gap: 1rem; }
.line__copy .h2 { max-width: 24ch; }
.line__eyebrow { color: var(--accent); }

.line__action { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; }
.line__more { color: var(--mute); font-size: 0.9375rem; }
.line__more:hover { color: var(--ink); }

.line__button {
  display: inline-block;
  padding: 0.875rem 1.375rem;
  border: 1px solid var(--line-strong);
  border-radius: 4px;
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}
.line__button:hover { border-color: var(--accent); color: var(--accent); }

.games {
  display: grid;
  gap: 1.5rem;
  padding-bottom: clamp(3rem, 7vw, 5.5rem);
}
@media (min-width: 48rem) {
  .games { grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr; }
  .games__lead { grid-row: span 2; }
}
.games a { display: grid; gap: 0.6rem; text-decoration: none; align-content: start; }
.games img { width: 100%; height: 100%; object-fit: cover; border-radius: 4px; background: var(--surface); }
.games__lead img { aspect-ratio: 16 / 10; }
.games__item img { aspect-ratio: 16 / 9; }
.games a:hover .label { color: var(--ink); }
</style>
