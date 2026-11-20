<script setup lang="ts">
import { COG_SETS } from '~/data/banter'

/**
 * Cog, the knight from Spare Knight, standing on the footer. Click him for a few lines
 * of dialog; when they run out he walks off the page and comes back around.
 * The sprite sheets are his idle and walk frames from the game.
 */
type State = 'idle' | 'talk' | 'leave' | 'gone' | 'return'
const state = ref<State>('idle')
const met = ref(false)
const set = ref(0)
const lines = computed(() => COG_SETS[set.value % COG_SETS.length]!)

const timers: ReturnType<typeof setTimeout>[] = []
const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

function poke() {
  if (state.value !== 'idle') return
  met.value = true
  state.value = 'talk'
}

function finished() {
  set.value += 1
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    state.value = 'idle'
    return
  }
  state.value = 'leave'
  later(() => { state.value = 'gone' }, 4200)
  later(() => { state.value = 'return' }, 4300)
  later(() => { state.value = 'idle' }, 8500)
}

onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <div class="cog" :class="`is-${state}`">
    <div v-if="state === 'talk'" class="cog__say">
      <DialogBox :lines="lines" @done="finished" />
    </div>
    <button type="button" class="cog__body" aria-label="Cog, the knight from Spare Knight. Talk to him." @click="poke">
      <span v-if="!met" class="cog__hint" aria-hidden="true">!</span>
      <span class="cog__sprite" />
    </button>
  </div>
</template>

<style scoped>
.cog { position: relative; width: 96px; height: 120px; }

.cog__body {
  display: block;
  width: 96px;
  height: 120px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.cog__sprite {
  display: block;
  width: 96px;
  height: 120px;
  background: url('/mascot/cog-idle.webp') 0 0 / 800% 100% no-repeat;
  animation: cog-idle 1.1s steps(8) infinite;
  transition: transform 200ms var(--snap);
  transform-origin: 50% 100%;
}
.is-idle .cog__body:hover .cog__sprite { transform: translateY(-6px) scale(1.04, 0.98); }
.is-idle .cog__body:active .cog__sprite { transform: scale(1.08, 0.9); }

.is-leave .cog__sprite, .is-return .cog__sprite {
  background-image: url('/mascot/cog-walk.webp');
  background-size: 700% 100%;
  animation: cog-walk 0.7s steps(7) infinite;
}

.is-leave { transform: translateX(100vw); transition: transform 4.2s linear; }
.is-gone { transform: translateX(-100vw); visibility: hidden; }
.is-return { transition: transform 4.2s linear; }

.cog__say { position: absolute; right: 0; bottom: calc(100% + 0.75rem); z-index: 5; }

.cog__hint {
  position: absolute;
  left: 50%;
  top: -1.5rem;
  display: grid;
  place-items: center;
  width: 1.625rem;
  height: 1.625rem;
  margin-left: -0.8125rem;
  border: 2.5px solid #17120a;
  border-radius: 50%;
  background: var(--accent);
  color: #17120a;
  font: 800 0.9375rem/1 var(--display);
  animation: cog-hint 2.4s var(--snap) infinite;
}

@keyframes cog-idle { to { background-position: -768px 0; } }
@keyframes cog-walk { to { background-position: -672px 0; } }
@keyframes cog-hint {
  0%, 70%, 100% { transform: translateY(0) scale(1); }
  80% { transform: translateY(-7px) scale(1.12, 0.92); }
  90% { transform: translateY(0) scale(0.94, 1.06); }
}

@media (prefers-reduced-motion: reduce) {
  .cog__sprite, .cog__hint { animation: none; }
}
</style>
