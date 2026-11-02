<script setup lang="ts">
const STEPS = ['Send two links.', 'We compare them.', 'Get the fixes.']
</script>

<template>
  <section id="how" class="container">
    <ol class="steps" aria-label="How it works">
      <li v-for="(step, index) in STEPS" :key="step" v-reveal="index * 80" class="step">
        <span class="step__num">{{ index + 1 }}</span>
        {{ step }}
      </li>
    </ol>
  </section>
</template>

<style scoped>
.steps {
  display: grid;
  gap: 1.25rem;
  padding-block: clamp(3rem, 7vw, 6rem);
}

@media (min-width: 48rem) {
  .steps { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
}

.step {
  display: flex;
  gap: 0.875rem;
  align-items: baseline;
  font-size: clamp(1.375rem, 2.4vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.15;
}

.step__num {
  font: 500 0.875rem/1 var(--mono);
  letter-spacing: 0;
  color: var(--accent);
}
</style>
