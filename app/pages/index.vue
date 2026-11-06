<script setup lang="ts">
import { GAMES } from '~/data/games'

usePageSeo({
  title: 'Formship | Help-center audits, barato.si and Formship Games',
  description: 'Formship LLC is a small software company in Orlando, Florida. We check help centers against changelogs for SaaS teams, publish the barato.si price index, and make games under Formship Games.',
  path: '/',
})

const [lead, ...rest] = GAMES
</script>

<template>
  <div class="home">
    <section class="container intro" aria-labelledby="home-title">
      <p class="label">Formship LLC · Orlando, Florida</p>
      <h1 id="home-title" class="intro__title">A small software company. Audits, a price index and games.</h1>
      <p class="intro__sub">
        We check help centers against changelogs for SaaS teams, publish barato.si every day, and make
        games under our label, Formship Games. Each one is below.
      </p>
      <ul class="intro__index">
        <li><a href="#audit">Help-center drift audit</a></li>
        <li><a href="#games">Formship Games</a></li>
        <li><a href="#barato">barato.si</a></li>
      </ul>
    </section>

    <section id="audit" class="line" aria-labelledby="audit-title">
      <div class="container line__top">
        <div class="line__copy">
          <p class="label line__eyebrow">Help-center drift audit</p>
          <h2 id="audit-title" class="h2">We check your help center against your changelog.</h2>
          <p class="line__sub">
            You get every article a recent release made wrong, with the outdated sentence quoted
            and a corrected one to paste in. $149, and you pay after you read it.
          </p>
        </div>
        <div class="line__action">
          <CtaLink />
          <NuxtLink to="/audit" class="line__more">How it works and pricing</NuxtLink>
          <NuxtLink to="/sample" class="line__more">Sample report</NuxtLink>
        </div>
      </div>
      <div class="line__band">
        <div class="container">
          <DriftFilm />
        </div>
      </div>
    </section>

    <section id="games" class="line" aria-labelledby="games-title">
      <div class="container line__top">
        <div class="line__copy">
          <p class="label line__eyebrow">Formship Games</p>
          <h2 id="games-title" class="h2">Small games built around one rule you can say out loud.</h2>
          <p class="line__sub">
            Our game label. Tactical and systemic games with hand-drawn art. Spare Knight, a tactical
            roguelike where attacks never miss, is in development for desktop.
          </p>
        </div>
        <div class="line__action">
          <NuxtLink to="/games/" class="line__button">See the games</NuxtLink>
        </div>
      </div>
      <div class="container games">
        <NuxtLink :to="`/games/${lead!.slug}`" class="games__lead">
          <img :src="lead!.cover.src" :alt="lead!.cover.alt" :width="lead!.cover.width" :height="lead!.cover.height" loading="lazy">
          <span class="label">{{ lead!.title }} · {{ lead!.status }}</span>
        </NuxtLink>
        <NuxtLink v-for="g in rest" :key="g.slug" :to="`/games/${g.slug}`" class="games__item">
          <img :src="g.cover.src" :alt="g.cover.alt" :width="g.cover.width" :height="g.cover.height" loading="lazy">
          <span class="label">{{ g.title }} · {{ g.status }}</span>
        </NuxtLink>
      </div>
    </section>

    <section id="barato" class="line line--last" aria-labelledby="barato-title">
      <div class="container line__top">
        <div class="line__copy">
          <p class="label line__eyebrow">barato.si</p>
          <h2 id="barato-title" class="h2">A daily index of US price drops and probable price errors.</h2>
          <p class="line__sub">
            Published every day, in Spanish and English.
          </p>
        </div>
        <div class="line__action">
          <a href="https://barato.si" class="line__button" rel="noopener">Open barato.si</a>
        </div>
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

.intro__index { display: flex; flex-wrap: wrap; gap: 0.5rem 1.75rem; margin-top: 0.5rem; }
.intro__index a { color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--line-strong); padding-bottom: 2px; }
.intro__index a:hover { color: var(--accent); border-color: var(--accent); }

.line { border-top: 1px solid var(--line); scroll-margin-top: 1rem; }
.line--last { padding-bottom: clamp(2rem, 5vw, 4rem); }

.line__top {
  display: grid;
  gap: 2rem;
  padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2rem, 4vw, 3rem);
}
@media (min-width: 60rem) {
  .line__top { grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 3rem; }
}

.line__copy { display: grid; gap: 1rem; }
.line__copy .h2 { max-width: 22ch; }
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

.line__band { background: var(--surface); border-block: 1px solid var(--line); }

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
