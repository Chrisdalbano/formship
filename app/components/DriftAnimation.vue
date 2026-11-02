<script setup lang="ts">
/**
 * The signature animation: a changelog line changes, the matching help-article
 * sentence gets struck, the corrected sentence writes in. About 1.3s, played once
 * when it comes into view. All timing lives in CSS. The markup is in its final
 * state, so no-JS and reduced-motion readers just see the end result. Every line
 * has its space reserved from the start, so nothing shifts.
 */
// Each word keeps its trailing space. The template compiler would trim a literal one.
const CORRECTED_WORDS = 'Go to Reports > Downloads and choose CSV.'.split(' ').map(word => `${word} `)

const root = useTemplateRef<HTMLElement>('root')
const playing = shallowRef(false)

let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!root.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      playing.value = true
      observer?.disconnect()
    },
    { threshold: 0.45 },
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())

async function replay() {
  playing.value = false
  await nextTick()
  // Force a style flush so the keyframes restart when the class returns.
  void root.value?.offsetWidth
  playing.value = true
}
</script>

<template>
  <figure ref="root" class="sig" :class="{ 'is-playing': playing }">
    <div class="sig__cols">
      <div class="sig__col sig__col--log">
        <p class="label sig__head">Changelog</p>
        <ul class="log">
          <li class="log__row log__row--live">
            <span class="log__date">Oct 14</span>
            <span class="log__stack">
              <span class="log__old" aria-hidden="true">CSV export lives in Settings &gt; Data.</span>
              <span class="log__new">CSV export moved to Reports &gt; Downloads.</span>
            </span>
          </li>
          <li class="log__row">
            <span class="log__date">Oct 02</span>
            <span>Added XLSX to scheduled reports.</span>
          </li>
          <li class="log__row">
            <span class="log__date">Sep 18</span>
            <span>Search now covers archived projects.</span>
          </li>
        </ul>
      </div>

      <div class="sig__col sig__col--article">
        <p class="label sig__head">Help article</p>
        <p class="article__title">Export your data</p>
        <p class="article__text">You can download your records at any time.</p>
        <p class="article__text article__text--live">
          <span class="article__old">Go to Settings &gt; Data and click Export CSV.</span>
        </p>
        <p class="article__text article__fix">
          <span
            v-for="(word, index) in CORRECTED_WORDS"
            :key="index"
            class="article__word"
            :style="{ '--i': index }"
          >{{ word }}</span>
        </p>
        <p class="article__text">Large exports arrive by email.</p>
      </div>
    </div>

    <figcaption class="sig__foot">
      <span>Illustrative. Example company, example text.</span>
      <button type="button" class="sig__replay" @click="replay">Replay</button>
    </figcaption>
  </figure>
</template>

<style scoped>
.sig {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 4px;
}

.sig__cols { display: grid; }

@media (min-width: 40rem) {
  .sig__cols { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); }
  .sig__col--article { border-left: 1px solid var(--line); }
}

@media (max-width: 39.99rem) {
  .sig__col--article { border-top: 1px solid var(--line); }
}

.sig__col { padding: 1.25rem; }
.sig__head { margin-bottom: 1rem; }

.log {
  font: 400 0.8125rem/1.5 var(--mono);
  color: var(--mute);
  display: grid;
  gap: 0.875rem;
}

.log__row { display: grid; gap: 0.125rem; }
.log__date { font-size: 0.75rem; }
.log__row--live { color: var(--ink); }

/* Both lines share a cell, so swapping them cannot move anything. */
.log__stack { display: grid; }
.log__old, .log__new { grid-area: 1 / 1; }
.log__old { opacity: 0; }

.article__title {
  font-weight: 600;
  font-size: 1.0625rem;
  letter-spacing: -0.012em;
  margin-bottom: 0.5rem;
}

.article__text {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--mute);
}

.article__text + .article__text { margin-top: 0.375rem; }

.article__old {
  color: var(--mute);
  background-image: linear-gradient(var(--old), var(--old));
  background-repeat: no-repeat;
  background-position: 0 56%;
  background-size: 100% 2px;
}

.article__fix { color: var(--new); font-weight: 500; }

.sig__foot {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.625rem 1.25rem;
  border-top: 1px solid var(--line);
  color: var(--mute);
  font: 400 0.75rem/1.5 var(--mono);
}

.sig__replay {
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.sig__replay:hover { color: var(--ink); }

@media (prefers-reduced-motion: reduce) {
  .sig__replay { visibility: hidden; }
}

/*
 * Motion. With scripting on and motion allowed, elements wait in their "before"
 * state until .is-playing arrives. If it never does (a failed hydration), the
 * sig-final-* rules put everything in its end state after a few seconds.
 */
@media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
  .log__old { opacity: 1; animation: sig-final-hide 1ms linear 5s forwards; }
  .log__new { opacity: 0; animation: sig-final-show 1ms linear 5s forwards; }
  .article__old { color: var(--ink); background-size: 0% 2px; animation: sig-final-strike 1ms linear 5s forwards; }
  .article__word { opacity: 0; animation: sig-final-show 1ms linear 5s forwards; }

  .is-playing .log__old { animation: sig-line-out 320ms ease-out 0ms both; }
  .is-playing .log__new { animation: sig-line-in 320ms ease-out 120ms both; }
  .is-playing .article__old { animation: sig-strike 420ms cubic-bezier(0.5, 0, 0.3, 1) 340ms both; }
  .is-playing .article__word {
    animation: sig-word 180ms ease-out both;
    animation-delay: calc(740ms + var(--i) * 60ms);
  }
}

@keyframes sig-final-hide { to { opacity: 0; } }
@keyframes sig-final-show { to { opacity: 1; } }
@keyframes sig-final-strike { to { background-size: 100% 2px; color: var(--mute); } }

@keyframes sig-line-out {
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: translateY(-6px); }
}

@keyframes sig-line-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}

@keyframes sig-strike {
  from { background-size: 0% 2px; color: var(--ink); }
  to { background-size: 100% 2px; color: var(--mute); }
}

@keyframes sig-word {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
