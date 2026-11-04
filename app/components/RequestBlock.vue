<script setup lang="ts">
import { MAILTO_AUDIT, SITE } from '~~/shared/site'

withDefaults(defineProps<{ heading?: string }>(), { heading: 'Send us two links.' })

const STEPS = [
  'Email your help-center URL and your changelog URL. The button fills in the subject and the fields.',
  'We read both public pages. No login, no call.',
  'The report reaches you within 48 hours.',
  'If it was useful, pay $149 with the link at the end of it. If we find nothing, there is no charge.',
]
</script>

<template>
  <section class="request" aria-labelledby="request-title">
    <div class="request__head">
      <p class="label request__label">Get an audit</p>
      <h2 id="request-title" class="h2">{{ heading }}</h2>
    </div>
    <div class="request__body">
      <ol class="request__steps">
        <li v-for="(step, index) in STEPS" :key="index" class="request__step">
          <span class="request__num">{{ index + 1 }}</span>
          <span>{{ step }}</span>
        </li>
      </ol>
      <div class="request__action">
        <CtaLink />
        <p class="request__alt">
          Or write to <a :href="MAILTO_AUDIT">{{ SITE.email }}</a>.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.request {
  display: grid;
  gap: 1.75rem;
  padding-block: clamp(2.5rem, 5vw, 4rem);
  border-top: 1px solid var(--line-strong);
}

@media (min-width: 52rem) {
  .request { grid-template-columns: 5fr 7fr; gap: 3rem; }
}

.request__head { display: grid; gap: 0.75rem; align-content: start; }
.request__label { color: var(--accent); }

.request__body { display: grid; gap: 1.75rem; }

.request__step {
  display: flex;
  gap: 0.875rem;
  align-items: baseline;
  padding-block: 0.75rem;
  border-top: 1px solid var(--line);
}

.request__step:last-child { border-bottom: 1px solid var(--line); }

.request__num {
  flex: none;
  font: 500 0.875rem/1 var(--mono);
  color: var(--accent);
}

.request__action { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; }
.request__alt { color: var(--mute); font-size: 0.9375rem; }
</style>
