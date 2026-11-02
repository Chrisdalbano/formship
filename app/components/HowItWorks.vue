<script setup lang="ts">
const STEPS = [
  {
    title: 'We read the changelog',
    text: 'We take the last 90 days and keep the changes that alter how a customer does something: renamed UI, moved settings, new defaults, limits, plans.',
  },
  {
    title: 'We read the help center',
    text: 'We match each change to the public articles that describe the old behavior, up to 60 of them, and look for sentences that are false today.',
  },
  {
    title: 'We check every finding',
    text: 'Both quotes are machine-checked word for word against the live page, and a second review has to agree the article is wrong. If a finding is ambiguous, we drop it.',
  },
]
</script>

<template>
  <section id="how" class="container">
    <div class="sheet">
      <p class="label">How it works</p>
      <div>
        <h2 v-reveal class="h2 how__title">You send two links. We read both.</h2>
        <ol class="how__steps">
          <li
            v-for="(step, index) in STEPS"
            :key="step.title"
            v-reveal="index * 90"
            class="how__step"
          >
            <p class="how__num">{{ index + 1 }}</p>
            <h3 class="h3">{{ step.title }}</h3>
            <p class="body-mute">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how__title { margin-bottom: clamp(2rem, 4vw, 3.5rem); }

.how__steps { display: grid; gap: 2rem; }

@media (min-width: 48rem) {
  .how__steps { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
}

.how__step {
  display: grid;
  gap: 0.625rem;
  align-content: start;
  padding-top: 1rem;
  border-top: 1px solid var(--line-strong);
}

.how__num {
  font: 500 0.8125rem/1.4 var(--mono);
  color: var(--accent);
  margin-bottom: 0.75rem;
}
</style>
