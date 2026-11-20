<script setup lang="ts">
import { KONAMI } from '~/data/banter'

/** Up, up, down, down, left, right, left, right, B, A: Cog crosses the screen. */
const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const on = ref(false)
let at = 0
let timer: ReturnType<typeof setTimeout> | undefined

function onKey(e: KeyboardEvent) {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
  at = key === CODE[at] ? at + 1 : key === CODE[0] ? 1 : 0
  if (at < CODE.length) return
  at = 0
  on.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { on.value = false }, 7000)
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  clearTimeout(timer)
})
</script>

<template>
  <div v-if="on" class="egg">
    <span class="egg__cog" aria-hidden="true" />
    <p class="egg__say" role="status">{{ KONAMI }}</p>
  </div>
</template>

<style scoped>
.egg { position: fixed; inset: auto 0 0 0; z-index: 90; pointer-events: none; }

.egg__cog {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 144px;
  height: 180px;
  background: url('/mascot/cog-walk.webp') 0 0 / 700% 100% no-repeat;
  animation: egg-step 0.7s steps(7) infinite, egg-cross 7s linear both;
}

.egg__say {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  width: max-content;
  max-width: calc(100vw - 2rem);
  padding: 0.75rem 1.125rem;
  border: 3px solid #17120a;
  border-radius: 16px;
  background: var(--ink);
  color: #17120a;
  box-shadow: 0 6px 0 rgba(0, 0, 0, 0.55);
  font: 600 1rem/1.4 var(--display);
  transform: translateX(-50%);
  animation: egg-pop 320ms var(--snap) both;
}

@keyframes egg-step { to { background-position: -1008px 0; } }
@keyframes egg-cross { from { transform: translateX(-160px); } to { transform: translateX(100vw); } }
@keyframes egg-pop { from { opacity: 0; transform: translateX(-50%) scale(0.6) translateY(12px); } }

@media (prefers-reduced-motion: reduce) {
  .egg__cog { display: none; }
  .egg__say { animation: none; }
}
</style>
