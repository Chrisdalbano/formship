<script setup lang="ts">
import type { Shot } from '~/data/games'

/** Screenshots in a grid. Click one to see it large; arrow keys move between them. */
const props = defineProps<{ shots: Shot[] }>()

const dialog = ref<HTMLDialogElement>()
const at = ref(0)
const current = computed(() => props.shots[at.value]!)

function open(i: number) {
  at.value = i
  dialog.value?.showModal()
}
function step(by: number) {
  at.value = (at.value + by + props.shots.length) % props.shots.length
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
/** A click on the dark area around the picture closes it. */
function onBackdrop(e: MouseEvent) {
  if (e.target === dialog.value) dialog.value?.close()
}
</script>

<template>
  <div class="shots">
    <figure v-for="(s, i) in shots" :key="s.src" v-reveal="i % 2 * 90">
      <button type="button" class="shots__open" :aria-label="`View larger: ${s.alt}`" @click="open(i)">
        <Pic :shot="s" sizes="(min-width: 48rem) 45vw, 100vw" />
      </button>
      <figcaption>{{ s.alt }}</figcaption>
    </figure>

    <dialog ref="dialog" class="box" @click="onBackdrop" @keydown="onKey">
      <img :src="current.src" :alt="current.alt" :width="current.width" :height="current.height">
      <p class="box__bar">
        <span>{{ current.alt }}</span>
        <span class="box__nav">
          <button v-if="shots.length > 1" type="button" aria-label="Previous picture" @click="step(-1)">←</button>
          <button v-if="shots.length > 1" type="button" aria-label="Next picture" @click="step(1)">→</button>
          <button type="button" aria-label="Close" @click="dialog?.close()">✕</button>
        </span>
      </p>
    </dialog>
  </div>
</template>

<style scoped>
.shots { display: grid; gap: 2rem; }
@media (min-width: 48rem) { .shots { grid-template-columns: 1fr 1fr; } }

figure { display: grid; gap: 0.625rem; align-content: start; }
figcaption { color: var(--mute); font-size: 0.875rem; }

.shots__open {
  display: block;
  padding: 0;
  border: 0;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line);
  cursor: zoom-in;
  transition: transform 220ms var(--out), box-shadow 220ms var(--out);
}
.shots__open img { width: 100%; height: auto; }
.shots__open:hover { transform: translateY(-4px); box-shadow: 0 0 0 2px var(--accent), 0 18px 34px -18px rgba(0, 0, 0, 0.9); }

.box {
  width: min(96vw, 110rem);
  max-height: 96vh;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ink);
  overflow: visible;
}
.box::backdrop { background: rgba(8, 7, 6, 0.9); }
.box[open] { animation: box-in 240ms var(--out); }
.box img {
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: calc(96vh - 4rem);
  margin-inline: auto;
  border-radius: var(--radius);
}
.box__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 0.75rem;
  color: var(--mute);
  font-size: 0.9375rem;
}
.box__nav { display: flex; gap: 0.5rem; }
.box__nav button {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid var(--line-strong);
  border-radius: 50%;
  background: var(--surface);
  cursor: pointer;
}
.box__nav button:hover { border-color: var(--accent); color: var(--accent); }

@keyframes box-in { from { opacity: 0; transform: scale(0.96); } }

@media (prefers-reduced-motion: reduce) {
  .box[open] { animation: none; }
  .shots__open:hover { transform: none; }
}
</style>
