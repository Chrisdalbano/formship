<script setup lang="ts">
/**
 * The homepage film: one fixed composition in four beats, on a 13.5s loop.
 *
 *   0.0s  A release ships. One big line.
 *   2.2s  That line shrinks away. A help sentence appears and turns wrong.
 *   4.7s  The sentence is struck and the corrected one writes in.
 *   7.4s  Everything settles into a finding, and the price lands. Long hold.
 *  12.6s  Fade out, a short rest, loop.
 *
 * All motion is CSS, so it starts with the first paint and needs no library. The
 * base styles are the last frame, which is what no-JS and reduced-motion readers
 * get. Everything is absolutely placed in a stage with a fixed aspect ratio and
 * sized in cqw, so nothing can shift layout. Script only pauses the loop.
 */
const DESCRIPTION = 'Illustrative example. A changelog says CSV export moved to Reports. A help article still says go to Settings to export CSV. That sentence is struck and corrected to go to Reports to export CSV. The audit costs $149, takes 48 hours, and you pay after you read it.'

const FIX_WORDS = ['Go', 'to', 'Reports'].map(word => `${word} `)
const FIX_WORDS_REST = ['to', 'export', 'CSV.'].map(word => `${word} `)

const root = useTemplateRef<HTMLElement>('root')
const pausedByUser = shallowRef(false)
const offscreen = shallowRef(false)

const paused = computed(() => pausedByUser.value || offscreen.value)

function togglePause() {
  pausedByUser.value = !pausedByUser.value
}

let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!root.value) return
  observer = new IntersectionObserver(([entry]) => {
    offscreen.value = !entry?.isIntersecting
  })
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <figure ref="root" class="film" :class="{ 'is-paused': paused }">
    <div class="stage" role="img" :aria-label="DESCRIPTION">
      <div class="comp">
        <span class="ctx ctx--1" /><span class="ctx ctx--2" />
        <span class="ctx ctx--3" /><span class="ctx ctx--4" />

        <p class="el rel">
          <span class="big">CSV export moved <br class="pb">to Reports.</span>
          <i class="rel__rule" />
        </p>

        <p class="el art">
          <i class="art__mark" />
          <span class="big art__text">Go to Settings <br class="pb">to export CSV.</span>
        </p>

        <p class="el fix">
          <span class="big">
            <span
              v-for="(word, index) in FIX_WORDS"
              :key="word"
              class="fix__word"
              :style="{ '--i': index }"
            >{{ word }}</span><br class="pb"><span
              v-for="(word, index) in FIX_WORDS_REST"
              :key="word"
              class="fix__word"
              :style="{ '--i': index + 3 }"
            >{{ word }}</span>
          </span>
        </p>

        <p class="sub sub--1">You ship a change.</p>
        <p class="sub sub--2">One sentence is now wrong.</p>
        <p class="sub sub--3">We write the fix.</p>

        <p class="lab lab--rel">Changelog</p>
        <p class="lab lab--art">Your article</p>
        <p class="lab lab--fix">Our fix</p>

        <i class="divider" />
        <p class="amt">$149.</p>
        <p class="fact fact--time">48 hours.</p>
        <p class="fact fact--pay">Pay after you read it.</p>
      </div>
    </div>
    <p class="tag">Illustrative finding</p>
    <button type="button" class="pause" @click="togglePause">{{ pausedByUser ? 'Play' : 'Pause' }}</button>
  </figure>
</template>

<style scoped>
.film {
  position: relative;
  /* Short laptop screens shrink the film rather than push it under the fold. */
  width: min(100%, max(40rem, calc((100svh - 17.5rem) * 2)));
}

.stage {
  container-type: inline-size;
  position: relative;
  overflow: hidden;

  /* Landscape composition, in cqw of a 2:1 stage. */
  aspect-ratio: 2 / 1;
  --big: 6.1cqw;
  --sub: 2.5cqw;
  --lab: max(11px, 1.05cqw);

  --rel-ya: 18cqw;
  --rel-yb: 5cqw;
  --rel-sb: 0.42;
  --rel-yc: 13.9cqw;
  --rel-sc: 0.46;

  --art-ya: 18cqw;
  --art-yb: 9.5cqw;
  --art-sb: 0.72;
  --art-yc: 23.9cqw;
  --art-sc: 0.5;

  --fix-ya: 20cqw;
  --fix-yc: 33.9cqw;
  --fix-sc: 0.5;

  --lab-rel: 11.3cqw;
  --lab-art: 21.3cqw;
  --lab-fix: 31.3cqw;

  --sub-y: 39cqw;
  --ctx-a: 10cqw;
  --ctx-b: 14cqw;
  --ctx-c: 28cqw;
  --ctx-d: 32cqw;
  --ctx-w: 74cqw;

  --price-x: 61cqw;
  --amt: 13cqw;
  --amt-y: 9.5cqw;
  --fact: 3.1cqw;
  --time-y: 25.9cqw;
  --pay-y: 30.9cqw;

  --div-x: 56.5cqw;
  --div-y: 9.5cqw;
  --div-w: 1px;
  --div-h: 30cqw;
  --div-origin: 0 0;
  --div-from: scaleY(0);
}

@media (max-width: 39.99rem) {
  .film { width: 100%; }

  .stage {
    /* Portrait composition, a 100 by 122 stage. */
    aspect-ratio: 100 / 122;
    --big: 9.6cqw;
    --sub: 5cqw;
    --lab: 11px;

    --rel-ya: 40cqw;
    --rel-yb: 13cqw;
    --rel-sb: 0.5;
    --rel-yc: 15cqw;
    --rel-sc: 0.5;

    --art-ya: 40cqw;
    --art-yb: 25cqw;
    --art-sb: 0.66;
    --art-yc: 34cqw;
    --art-sc: 0.5;

    --fix-ya: 48cqw;
    --fix-yc: 53cqw;
    --fix-sc: 0.5;

    --lab-rel: 10.5cqw;
    --lab-art: 29.5cqw;
    --lab-fix: 48.5cqw;

    --sub-y: 88cqw;
    --ctx-a: 30cqw;
    --ctx-b: 35cqw;
    --ctx-c: 70cqw;
    --ctx-d: 75cqw;
    --ctx-w: 88cqw;

    --price-x: 0cqw;
    --amt: 21cqw;
    --amt-y: 72cqw;
    --fact: 6cqw;
    --time-y: 96cqw;
    --pay-y: 104cqw;

    --div-x: 0cqw;
    --div-y: 68.5cqw;
    --div-w: 100cqw;
    --div-h: 1px;
    --div-from: scaleX(0);
  }
}

.comp { position: absolute; inset: 0; }

.pb { display: none; }

@media (max-width: 39.99rem) {
  .pb { display: inline; }
}

/* The base styles below are the final frame. */
.el {
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: 0 0;
  white-space: nowrap;
}

.big {
  display: inline-block;
  font-size: var(--big);
  font-weight: 620;
  line-height: 1.16;
  letter-spacing: -0.032em;
}

.rel { color: var(--ink); transform: translateY(var(--rel-yc)) scale(var(--rel-sc)); }

.rel__rule {
  position: absolute;
  left: 0;
  bottom: -0.16em;
  width: 100%;
  height: 0.5cqw;
  background: var(--old);
  transform-origin: 0 50%;
  transform: scaleX(0);
  font-size: var(--big);
}

.art { color: var(--mute); transform: translateY(var(--art-yc)) scale(var(--art-sc)); }

.art__text {
  --strike: 0.075em;
}

/* The strike is a single line on one landscape row and two on portrait, drawn in order. */
.art__text {
  display: inline;
  background-image: linear-gradient(var(--old), var(--old));
  background-repeat: no-repeat;
  background-position: 0 58%;
  background-size: 100% var(--strike);
  -webkit-box-decoration-break: slice;
  box-decoration-break: slice;
}

.art__mark {
  position: absolute;
  left: -1.6cqw;
  top: 0.08em;
  bottom: 0.08em;
  width: 0.5cqw;
  background: var(--old);
  transform-origin: 50% 0;
  transform: scaleY(0);
}

.fix { color: var(--new); transform: translateY(var(--fix-yc)) scale(var(--fix-sc)); }

.fix__word { display: inline; }

.ctx {
  position: absolute;
  left: 0;
  height: 0.9cqw;
  background: var(--line-strong);
  border-radius: 1px;
  opacity: 0;
}

.ctx--1 { top: var(--ctx-a); width: calc(var(--ctx-w) * 0.82); }
.ctx--2 { top: var(--ctx-b); width: var(--ctx-w); }
.ctx--3 { top: var(--ctx-c); width: calc(var(--ctx-w) * 0.94); }
.ctx--4 { top: var(--ctx-d); width: calc(var(--ctx-w) * 0.6); }

.sub {
  position: absolute;
  left: 0;
  top: var(--sub-y);
  font-size: var(--sub);
  font-weight: 500;
  letter-spacing: -0.015em;
  white-space: nowrap;
  color: var(--ink);
  opacity: 0;
}

.lab {
  position: absolute;
  left: 0;
  font: 500 var(--lab)/1.3 var(--mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--mute);
}

.lab--rel { top: var(--lab-rel); }
.lab--art { top: var(--lab-art); }
.lab--fix { top: var(--lab-fix); }

.divider {
  position: absolute;
  left: var(--div-x);
  top: var(--div-y);
  width: var(--div-w);
  height: var(--div-h);
  background: var(--line-strong);
  transform-origin: var(--div-origin);
}

.amt {
  position: absolute;
  left: var(--price-x);
  top: var(--amt-y);
  font-size: var(--amt);
  font-weight: 640;
  line-height: 1.1;
  letter-spacing: -0.05em;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

.fact {
  position: absolute;
  left: var(--price-x);
  font-size: var(--fact);
  font-weight: 560;
  line-height: 1.2;
  letter-spacing: -0.022em;
  white-space: nowrap;
  color: var(--ink);
}

.fact--time { top: var(--time-y); }
.fact--pay { top: var(--pay-y); }

.tag, .pause {
  font: 400 max(11px, 0.72rem)/1.4 var(--mono);
  color: var(--mute);
}

.tag {
  position: absolute;
  right: 0;
  top: 0.75rem;
}

.pause {
  position: absolute;
  right: 0;
  bottom: 0.75rem;
  appearance: none;
  background: none;
  border: 0;
  padding: 0.25rem 0;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
  visibility: hidden;
}

.pause:hover { color: var(--ink); }

/*
 * The film. Percentages are seconds divided by 13.5, for example 7.4s is 54.81%.
 * Only runs when scripting is on and motion is allowed; otherwise the frame above stands.
 */
@media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
  .pause { visibility: visible; }

  .comp,
  .rel, .rel__rule,
  .art, .art__text, .art__mark,
  .fix, .fix__word,
  .ctx, .sub, .lab,
  .divider, .amt, .fact {
    animation-duration: 13.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-fill-mode: both;
  }

  .is-paused * { animation-play-state: paused; }

  .comp { animation-name: comp; }
  .rel { animation-name: rel; }
  .rel__rule { animation-name: rel-rule; }
  .art { animation-name: art; }
  .art__text { animation-name: art-strike; }
  .art__mark { animation-name: art-mark; }
  .fix { animation-name: fix; }
  .fix__word { animation-name: fix-word; animation-delay: calc(var(--i) * 75ms); }
  .ctx { animation-name: ctx; }
  .sub--1 { animation-name: sub-1; }
  .sub--2 { animation-name: sub-2; }
  .sub--3 { animation-name: sub-3; }
  .lab { animation-name: lab; }
  .divider { animation-name: divider; }
  .amt { animation-name: amt; }
  .fact--time { animation-name: fact-time; }
  .fact--pay { animation-name: fact-pay; }
}

/* A calm loop point: the whole frame fades, a short rest, then the next release. */
@keyframes comp {
  0%, 93.33% { opacity: 1; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); }
  97.78%, 100% { opacity: 0; }
}

/* Beat 1: the release rises in. Beat 2: it steps back. Beat 4: it joins the finding. */
@keyframes rel {
  0%, 1.48% {
    opacity: 0;
    color: var(--ink);
    transform: translateY(calc(var(--rel-ya) + 1.6cqw));
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }
  6.67%, 16.3% {
    opacity: 1;
    color: var(--ink);
    transform: translateY(var(--rel-ya));
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
  21.48%, 54.81% {
    opacity: 1;
    color: var(--mute);
    transform: translateY(var(--rel-yb)) scale(var(--rel-sb));
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
  60%, 100% {
    opacity: 1;
    color: var(--ink);
    transform: translateY(var(--rel-yc)) scale(var(--rel-sc));
  }
}

@keyframes rel-rule {
  0%, 4.5% { transform: scaleX(0); opacity: 1; animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); }
  10%, 15.56% { transform: scaleX(1); opacity: 1; animation-timing-function: ease-out; }
  17.78%, 100% { transform: scaleX(1); opacity: 0; }
}

/* Beat 2: the sentence is quiet, holds, then turns. Beat 3: struck, then lifted. */
@keyframes art {
  0%, 18.52% {
    opacity: 0;
    color: var(--mute);
    transform: translateY(var(--art-ya));
    animation-timing-function: ease-out;
  }
  22.22%, 23.7% {
    opacity: 1;
    color: var(--mute);
    transform: translateY(var(--art-ya));
    animation-timing-function: cubic-bezier(0.3, 0, 0.3, 1);
  }
  25.93%, 39.26% {
    opacity: 1;
    color: var(--old);
    transform: translateY(var(--art-ya));
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
  42.96%, 54.81% {
    opacity: 1;
    color: var(--mute);
    transform: translateY(var(--art-yb)) scale(var(--art-sb));
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
  60%, 100% {
    opacity: 1;
    color: var(--mute);
    transform: translateY(var(--art-yc)) scale(var(--art-sc));
  }
}

@keyframes art-strike {
  0%, 34.81% { background-size: 0% var(--strike); animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); }
  38.52%, 100% { background-size: 100% var(--strike); }
}

@keyframes art-mark {
  0%, 23.7% { transform: scaleY(0); opacity: 1; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
  25.93%, 34.81% { transform: scaleY(1); opacity: 1; animation-timing-function: ease-out; }
  37.04%, 100% { transform: scaleY(1); opacity: 0; }
}

/* The surrounding article is only suggested, and it clears the moment the sentence turns. */
@keyframes ctx {
  0%, 18.52% { opacity: 0; animation-timing-function: ease-out; }
  22.22%, 23.7% { opacity: 0.55; animation-timing-function: ease-in-out; }
  26.67%, 100% { opacity: 0; }
}

@keyframes fix {
  0%, 54.81% { transform: translateY(var(--fix-ya)); animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); }
  60%, 100% { transform: translateY(var(--fix-yc)) scale(var(--fix-sc)); }
}

@keyframes fix-word {
  0%, 42.22% { opacity: 0; animation-timing-function: ease-out; }
  44.07%, 100% { opacity: 1; }
}

@keyframes sub-1 {
  0%, 2.96% { opacity: 0; transform: translateY(0.5cqw); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
  6.67%, 15.56% { opacity: 1; transform: none; animation-timing-function: ease-in; }
  17.78%, 100% { opacity: 0; transform: none; }
}

@keyframes sub-2 {
  0%, 24.44% { opacity: 0; transform: translateY(0.5cqw); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
  26.67%, 34.07% { opacity: 1; transform: none; animation-timing-function: ease-in; }
  36.3%, 100% { opacity: 0; transform: none; }
}

@keyframes sub-3 {
  0%, 39.26% { opacity: 0; transform: translateY(0.5cqw); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
  41.48%, 53.33% { opacity: 1; transform: none; animation-timing-function: ease-in; }
  55.56%, 100% { opacity: 0; transform: none; }
}

@keyframes lab {
  0%, 60.74% { opacity: 0; animation-timing-function: ease-out; }
  63.7%, 100% { opacity: 1; }
}

@keyframes divider {
  0%, 56.3% { transform: var(--div-from); animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); }
  60.74%, 100% { transform: none; }
}

/* Beat 4: the price is the last thing to arrive and the longest thing on screen. */
@keyframes amt {
  0%, 58.52% { opacity: 0; transform: translateY(1.6cqw); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
  62.96%, 100% { opacity: 1; transform: none; }
}

@keyframes fact-time {
  0%, 63.7% { opacity: 0; transform: translateY(0.8cqw); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
  66.67%, 100% { opacity: 1; transform: none; }
}

@keyframes fact-pay {
  0%, 66.67% { opacity: 0; transform: translateY(0.8cqw); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
  69.63%, 100% { opacity: 1; transform: none; }
}
</style>
