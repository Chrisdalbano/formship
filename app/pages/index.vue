<script setup lang="ts">
import { GAMES, RELEASES } from '~/data/games'
import { FIRE } from '~/data/banter'
import { SITE } from '~~/shared/site'

const [lead, ...rest] = GAMES

usePageSeo({
  title: 'Formship Games | Independent game studio in Orlando, Florida',
  description: 'Formship Games is an independent game studio in Orlando, Florida. Spare Knight, a tactical roguelike, is in development for desktop. The alpha is playable in the browser.',
  path: '/',
  image: lead!.og,
})

/** The released games as one wall of cards. */
const wall = [
  ...rest.map(g => ({
    title: g.title,
    meta: g.genre,
    to: `/games/${g.slug}`,
    href: '',
    slug: g.slug,
    // ThunderBashers shows a match instead of its logo plate.
    image: g.slug === 'thunderbashers' ? g.shots[0]! : g.cover,
  })),
  ...RELEASES.map(r => ({ title: r.title, meta: r.engine, to: '', href: r.href, slug: '', image: r.image })),
]

const mail = `mailto:${SITE.email}?subject=${encodeURIComponent('Formship Games')}`
const { onMove, onLeave } = useTilt()

// Click the camp fire: sparks go up and the fire answers. The lines are in data/banter.ts.
const embers = ref<{ burst: (n?: number) => void }>()
const stokes = ref(0)
const quip = computed(() => stokes.value ? FIRE[Math.min(stokes.value, FIRE.length) - 1] : '')
let quiet: ReturnType<typeof setTimeout> | undefined
const quipOn = ref(false)

function stoke() {
  stokes.value += 1
  embers.value?.burst(30 + Math.min(stokes.value, 4) * 15)
  quipOn.value = true
  clearTimeout(quiet)
  quiet = setTimeout(() => { quipOn.value = false }, 2600)
}
onBeforeUnmount(() => clearTimeout(quiet))
</script>

<template>
  <div class="home">
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero__grid">
        <div class="hero__copy">
          <p class="status">In development for desktop</p>
          <h1 id="hero-title" class="h1">{{ lead!.title }}</h1>
          <p class="lede">{{ lead!.story[0] }}</p>
          <div class="hero__actions">
            <a :href="lead!.play[0]!.href" class="btn btn--fill" rel="noopener">Play the alpha <span class="arrow" aria-hidden="true">→</span></a>
            <NuxtLink :to="`/games/${lead!.slug}`" class="btn">About the game</NuxtLink>
          </div>
        </div>

        <div class="hero__stage" @pointermove="onMove" @pointerleave="onLeave">
          <div class="hero__frame">
            <NuxtLink :to="`/games/${lead!.slug}`" class="hero__art" aria-label="Spare Knight">
              <Pic
                :shot="lead!.cover"
                eager
                sizes="(min-width: 60rem) 56vw, 100vw"
                :style="{ viewTransitionName: `art-${lead!.slug}` }"
              />
            </NuxtLink>
            <div class="hero__embers">
              <ClientOnly><MotionEmberField ref="embers" :origin-x="0.494" :origin-y="0.815" /></ClientOnly>
            </div>
            <button type="button" class="hero__fire" aria-label="Stoke the camp fire" @click="stoke" />
            <p v-if="quipOn" :key="stokes" class="hero__quip" role="status">{{ quip }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="wall" aria-labelledby="wall-title">
      <div class="container wall__head">
        <h2 id="wall-title" v-reveal class="h2">Released and playable</h2>
        <NuxtLink to="/games/" class="more">All games</NuxtLink>
      </div>
      <div class="container wall__grid">
        <GameCard v-for="(g, i) in wall" :key="g.title" v-reveal="i % 2 * 90" v-bind="g" />
      </div>
    </section>

    <section class="studio" aria-labelledby="studio-title">
      <div class="container studio__grid">
        <div v-reveal class="studio__copy">
          <h2 id="studio-title" class="h2">Four people in Orlando, making games with soul.</h2>
          <p class="body-mute">
            The design, art, story and music are our own work.
          </p>
          <p class="studio__links">
            <NuxtLink to="/studio" class="more">The studio</NuxtLink>
            <a :href="mail" class="more">{{ SITE.email }}</a>
          </p>
        </div>
        <TeamList v-reveal="120" />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero: words on the left, the camp on the right at a size the painting stays sharp. */
.hero {
  position: relative;
  padding-block: clamp(1.5rem, 4vw, 3.5rem) var(--section);
  background: radial-gradient(60rem 34rem at 72% 55%, rgba(240, 166, 58, 0.11), transparent 70%);
}

.hero__grid { display: grid; gap: 2.5rem; align-items: center; }
@media (min-width: 60rem) {
  .hero__grid { grid-template-columns: 5fr 7fr; gap: clamp(2.5rem, 5vw, 4.5rem); }
}
@media (max-width: 59.99rem) {
  .hero__stage { order: -1; }
}

.hero__copy { display: grid; gap: 1.25rem; justify-items: start; }
.hero__copy .h1 { font-size: clamp(3rem, 7vw, 6rem); }
.hero__copy .lede { max-width: 30rem; }
.hero__actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.5rem; }

.hero__stage { --tx: 0; --ty: 0; perspective: 1400px; }
.hero__frame {
  position: relative;
  transform: rotateX(calc(var(--ty) * -2.5deg)) rotateY(calc(var(--tx) * 3.5deg));
  transition: transform 300ms var(--out);
  animation: hero-in 900ms var(--out) both;
}
.hero__art {
  display: block;
  border-radius: 14px;
  overflow: hidden;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line-strong), 0 40px 80px -40px rgba(0, 0, 0, 0.9), 0 0 120px -30px rgba(240, 166, 58, 0.35);
}
.hero__art img { width: 100%; height: auto; }

/* The ember canvas is taller than the picture, so sparks drift up past its top edge. */
.hero__embers { position: absolute; inset: -18% 0 0; pointer-events: none; }

.hero__fire {
  position: absolute;
  left: 40%;
  top: 62%;
  width: 20%;
  height: 28%;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  cursor: pointer;
}

.hero__quip {
  position: absolute;
  left: 50%;
  top: 52%;
  width: max-content;
  max-width: 80%;
  padding: 0.5rem 0.875rem;
  border: 3px solid #17120a;
  border-radius: 14px;
  background: var(--ink);
  color: #17120a;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.55);
  font: 600 0.9375rem/1.3 var(--display);
  transform: translateX(-50%);
  animation: quip-in 300ms var(--snap) both;
  pointer-events: none;
}

@keyframes hero-in { from { opacity: 0; transform: translateY(24px) scale(0.97); } }
@keyframes quip-in { from { opacity: 0; transform: translateX(-50%) translateY(10px) scale(0.6); } }

@media (prefers-reduced-motion: reduce) {
  .hero__frame { transform: none; animation: none; }
  .hero__quip { animation: none; }
}

.wall { border-top: 1px solid var(--line); padding-block: var(--section); }
.wall__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem 2rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
}
.wall__grid { display: grid; gap: 3rem 2rem; }
@media (min-width: 44rem) { .wall__grid { grid-template-columns: 1fr 1fr; } }

.studio { border-top: 1px solid var(--line); padding-top: var(--section); }
.studio__grid { display: grid; gap: 3rem; align-items: start; }
@media (min-width: 60rem) { .studio__grid { grid-template-columns: 5fr 7fr; gap: 4rem; } }
.studio__copy { display: grid; gap: 1.25rem; }
.studio__copy .h2 { max-width: 18ch; }
.studio__links { display: flex; flex-wrap: wrap; gap: 0.5rem 1.75rem; }
</style>
