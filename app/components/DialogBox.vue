<script setup lang="ts">
/**
 * A game-style text box. Types one line at a time; a click or Enter finishes the line,
 * then moves to the next, and after the last line it emits `done`.
 */
const props = defineProps<{ lines: string[] }>()
const emit = defineEmits<{ done: [] }>()

const index = ref(0)
const count = ref(0)
const line = computed(() => props.lines[index.value] ?? '')
const typing = computed(() => count.value < line.value.length)
const last = computed(() => index.value >= props.lines.length - 1)

let timer: ReturnType<typeof setInterval> | undefined

function type() {
  clearInterval(timer)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    count.value = line.value.length
    return
  }
  count.value = 0
  timer = setInterval(() => {
    count.value += 1
    if (count.value >= line.value.length) clearInterval(timer)
  }, 26)
}

function advance() {
  if (typing.value) {
    clearInterval(timer)
    count.value = line.value.length
  }
  else if (last.value) {
    emit('done')
  }
  else {
    index.value += 1
    type()
  }
}

onMounted(type)
watch(() => props.lines, () => {
  index.value = 0
  type()
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <button type="button" class="dlg" @click="advance">
    <span class="dlg__text" aria-hidden="true">{{ line.slice(0, count) }}<span class="dlg__rest">{{ line.slice(count) }}</span></span>
    <span class="sr" aria-live="polite">{{ line }}</span>
    <span class="dlg__next" :class="{ 'is-on': !typing }" aria-hidden="true">{{ last ? '✕' : '▼' }}</span>
  </button>
</template>

<style scoped>
.dlg {
  position: relative;
  display: block;
  width: min(21rem, calc(100vw - 2rem));
  padding: 0.9375rem 2.25rem 1.0625rem 1.125rem;
  border: 3px solid #17120a;
  border-radius: 16px;
  background: var(--ink);
  color: #17120a;
  box-shadow: 0 6px 0 rgba(0, 0, 0, 0.55);
  font: 600 1rem/1.4 var(--display);
  text-align: left;
  cursor: pointer;
  transform-origin: 85% 100%;
  animation: dlg-pop 320ms var(--snap) both;
}

/* The untyped part keeps its space, so the box never changes size while typing. */
.dlg__rest { visibility: hidden; }

.dlg__next {
  position: absolute;
  right: 0.75rem;
  bottom: 0.5rem;
  font-size: 0.75rem;
  opacity: 0;
}
.dlg__next.is-on { opacity: 1; animation: dlg-bob 700ms ease-in-out infinite; }

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@keyframes dlg-pop {
  from { opacity: 0; transform: scale(0.6) translateY(12px) rotate(-3deg); }
}
@keyframes dlg-bob {
  50% { transform: translateY(3px); }
}

@media (prefers-reduced-motion: reduce) {
  .dlg, .dlg__next.is-on { animation: none; }
}
</style>
