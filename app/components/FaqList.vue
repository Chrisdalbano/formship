<script setup lang="ts">
import { FIELD_NOTE as n } from '~/data/fieldNote'
</script>

<template>
  <section id="faq" class="container">
    <div class="sheet">
      <p class="label">Questions</p>
      <div class="faq">
        <details>
          <summary>Do you need access to anything?</summary>
          <p>No. We only read pages that are already public. If your help center or changelog sits behind a login, we can't audit it.</p>
        </details>
        <details>
          <summary>How do you check a finding?</summary>
          <p>Two checks. Both quotes, the article's and the changelog's, are machine-checked word for word against the live pages. A second review then has to agree that the article is wrong today. A finding that fails either check doesn't go in the report.</p>
        </details>
        <details>
          <summary>What if you find nothing?</summary>
          <p>The report says so and there is no invoice.</p>
        </details>
        <details>
          <summary>Do you catch every outdated sentence?</summary>
          <p>No. We report what we can show: a sentence in your article that a dated changelog entry contradicts. Unannounced changes and screenshots aren't visible to this method.</p>
        </details>
        <details>
          <summary>How common is this?</summary>
          <p>In our small early sample, {{ n.contradicted }} of {{ n.sample }} companies had a contradiction we could prove. Most had none. <NuxtLink to="/research">The field note</NuxtLink> has the method and its limits.</p>
        </details>
        <details>
          <summary>Can this run on every release?</summary>
          <p>After a first audit, there is an optional monthly re-run for $99 a month that checks new changelog entries against the help center.</p>
        </details>
        <details>
          <summary>Who is behind this?</summary>
          <p>Formship LLC, a small software company in Orlando, Florida. <NuxtLink to="/about">More here.</NuxtLink></p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq { max-width: 46rem; border-bottom: 1px solid var(--line); }

details { border-top: 1px solid var(--line); }
details:first-child { border-top-color: var(--line-strong); }

summary {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  padding-block: 1rem;
  font-weight: 550;
  letter-spacing: -0.008em;
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker { display: none; }

summary::after {
  content: '+';
  font: 400 1.0625rem/1.6 var(--mono);
  color: var(--mute);
}

details[open] summary::after { content: '-'; }
summary:hover::after { color: var(--ink); }

details p {
  max-width: 40rem;
  padding-bottom: 1.25rem;
  color: var(--mute);
}
</style>
