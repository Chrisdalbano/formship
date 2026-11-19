<script setup lang="ts">
import { GAMES, RELEASES } from '~/data/games'
import { TEAM } from '~/data/team'
import { SITE } from '~~/shared/site'

const [lead, ...rest] = GAMES

usePageSeo({
  title: 'Formship Games | Independent game studio in Orlando, Florida',
  description: 'Formship Games is an independent game studio in Orlando, Florida. Spare Knight, a tactical roguelike where attacks never miss, is in development for desktop. The alpha is playable in the browser.',
  path: '/',
  image: lead!.og,
})

/** The released games as one wall of tiles. Capture first, then the title. */
const wall = [
  ...rest.map(g => ({
    title: g.title,
    logline: g.logline,
    meta: g.genre,
    to: `/games/${g.slug}`,
    href: '',
    // ThunderBashers shows a match instead of its logo plate.
    image: g.slug === 'thunderbashers' ? g.shots[0]! : g.cover,
  })),
  ...RELEASES.map(r => ({ title: r.title, logline: r.logline, meta: r.engine, to: '', href: r.href, image: r.image })),
]

const camp = lead!.shots[0]!
const act2 = lead!.shots[1]!
const mail = `mailto:${SITE.email}?subject=${encodeURIComponent('Formship Games')}`
</script>

<template>
  <div class="home">
    <section class="hero" aria-labelledby="hero-title">
      <NuxtLink :to="`/games/${lead!.slug}`" class="hero__art" aria-label="Spare Knight">
        <img :src="lead!.cover.src" :alt="lead!.cover.alt" :width="lead!.cover.width" :height="lead!.cover.height" fetchpriority="high">
      </NuxtLink>
      <div class="container hero__bar">
        <div class="hero__copy">
          <p class="hero__status">In development for desktop. Alpha playable now.</p>
          <h1 id="hero-title" class="hero__title">A tactical roguelike where attacks never miss.</h1>
        </div>
        <div class="hero__actions">
          <a :href="lead!.play[0]!.href" class="btn btn--fill" rel="noopener">Play the alpha</a>
          <NuxtLink :to="`/games/${lead!.slug}`" class="btn">About Spare Knight</NuxtLink>
        </div>
      </div>
    </section>

    <section class="feature" aria-label="Spare Knight">
      <div class="container feature__grid">
        <figure class="feature__main">
          <img :src="camp.src" :alt="camp.alt" :width="camp.width" :height="camp.height" loading="lazy">
        </figure>
        <div class="feature__side">
          <p class="feature__lede">{{ lead!.story[0] }}</p>
          <p class="body-mute">
            Combat runs on a small grid where speed sets the turn order. What you commit is what
            happens, so every fight is about timing.
          </p>
          <figure>
            <img :src="act2.src" :alt="act2.alt" :width="act2.width" :height="act2.height" loading="lazy">
          </figure>
        </div>
      </div>
    </section>

    <section class="wall" aria-labelledby="wall-title">
      <div class="container wall__head">
        <h2 id="wall-title" class="h2">Released and playable</h2>
        <NuxtLink to="/games/" class="more">All games</NuxtLink>
      </div>
      <div class="container wall__grid">
        <component
          :is="g.to ? resolveComponent('NuxtLink') : 'a'"
          v-for="g in wall"
          :key="g.title"
          v-bind="g.to ? { to: g.to } : { href: g.href, rel: 'noopener' }"
          class="tile"
        >
          <img :src="g.image.src" :alt="g.image.alt" :width="g.image.width" :height="g.image.height" loading="lazy">
          <span class="tile__title">{{ g.title }}</span>
          <span class="tile__meta">{{ g.meta }}</span>
        </component>
      </div>
    </section>

    <section class="studio" aria-labelledby="studio-title">
      <div class="container studio__grid">
        <div class="studio__copy">
          <h2 id="studio-title" class="h2">Four people in Orlando, making games by hand.</h2>
          <p class="body-mute">
            The design, art, story and music are our own work. Every game starts from one rule a
            player can repeat after one match.
          </p>
          <p class="studio__links">
            <NuxtLink to="/games/studio" class="more">How we work</NuxtLink>
            <a :href="mail" class="more">{{ SITE.email }}</a>
          </p>
        </div>
        <ul class="people">
          <li v-for="m in TEAM" :key="m.name">
            <h3 class="h3">{{ m.name }}</h3>
            <p class="body-mute">{{ m.role }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
img { display: block; width: 100%; height: auto; background: var(--surface); }

/* Hero: the key art runs edge to edge. Text sits under it, never on it. */
.hero__art { display: block; }
.hero__art img {
  height: clamp(18rem, 62vh, 44rem);
  object-fit: cover;
  object-position: 62% 4%;
}

.hero__bar {
  display: grid;
  gap: 1.75rem;
  padding-block: clamp(1.75rem, 4vw, 3rem) clamp(3rem, 6vw, 5rem);
}
@media (min-width: 56rem) {
  .hero__bar { grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 3rem; }
}

.hero__copy { display: grid; gap: 0.75rem; }
.hero__status { color: var(--accent); font-size: 0.9375rem; font-weight: 600; }
.hero__title {
  max-width: 20ch;
  font-size: clamp(2.125rem, 5vw, 4rem);
  font-weight: 640;
  line-height: 1.04;
  letter-spacing: -0.038em;
}

.hero__actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }

.btn {
  display: inline-block;
  padding: 0.9375rem 1.5rem;
  border: 1px solid var(--line-strong);
  border-radius: 4px;
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}
.btn:hover { border-color: var(--accent); color: var(--accent); }
.btn--fill { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.btn--fill:hover { background: var(--accent-hover); border-color: var(--accent-hover); color: var(--accent-ink); }

.feature { padding-bottom: var(--section); }
.feature__grid { display: grid; gap: 2rem; align-items: start; }
@media (min-width: 56rem) {
  .feature__grid { grid-template-columns: 7fr 5fr; gap: 3rem; }
}
.feature__main img { border-radius: 4px; }
.feature__side { display: grid; gap: 1.25rem; }
.feature__side img { border-radius: 4px; }
.feature__lede {
  font-size: clamp(1.375rem, 2.4vw, 1.875rem);
  font-weight: 600;
  line-height: 1.22;
  letter-spacing: -0.022em;
}

.wall { border-top: 1px solid var(--line); padding-block: clamp(3rem, 7vw, 5.5rem) var(--section); }
.wall__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem 2rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
}
.more { color: var(--mute); font-size: 0.9375rem; }
.more:hover { color: var(--accent); }

.wall__grid { display: grid; gap: 2.5rem 1.5rem; }
@media (min-width: 44rem) { .wall__grid { grid-template-columns: 1fr 1fr; } }

.tile { display: grid; gap: 0.25rem; text-decoration: none; align-content: start; }
.tile img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  transition: transform 0.25s ease;
}
.tile:hover img { transform: scale(1.015); }
.tile__title { font-size: clamp(1.25rem, 2vw, 1.5rem); font-weight: 620; letter-spacing: -0.02em; color: var(--ink); }
.tile:hover .tile__title { color: var(--accent); }
.tile__meta { color: var(--mute); font-size: 0.9375rem; }

@media (prefers-reduced-motion: reduce) {
  .tile img { transition: none; }
  .tile:hover img { transform: none; }
}

.studio { background: var(--surface); border-top: 1px solid var(--line); padding-block: var(--section); }
.studio__grid { display: grid; gap: 3rem; align-items: start; }
@media (min-width: 60rem) { .studio__grid { grid-template-columns: 5fr 7fr; gap: 4rem; } }
.studio__copy { display: grid; gap: 1.25rem; }
.studio__copy .h2 { max-width: 18ch; }
.studio__links { display: flex; flex-wrap: wrap; gap: 0.5rem 1.75rem; }

.people { display: grid; gap: 0; }
@media (min-width: 36rem) { .people { grid-template-columns: 1fr 1fr; column-gap: 2.5rem; } }
.people li { display: grid; gap: 0.35rem; padding-block: 1.125rem; border-top: 1px solid var(--line-strong); }
</style>
