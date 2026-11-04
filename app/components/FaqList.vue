<script setup lang="ts">
import { MAILTO_AUDIT, SITE } from '~~/shared/site'
</script>

<template>
  <section id="faq" class="container">
    <div class="faq">
      <details>
        <summary>How do I get one?</summary>
        <p>
          Email <a :href="MAILTO_AUDIT">{{ SITE.email }}</a> with your help-center URL and your
          changelog or release notes URL. The report comes back within 48 hours.
        </p>
      </details>
      <details>
        <summary>What does the report look like?</summary>
        <p>
          Each finding quotes the outdated sentence, the dated changelog entry that made it wrong, and
          a corrected sentence to paste in. <NuxtLink to="/sample">See a sample report</NuxtLink> for a
          made-up product.
        </p>
      </details>
      <details>
        <summary>Do you need access to anything?</summary>
        <p>No. We only read pages that are already public. If your help center or changelog sits behind a login, we can't audit it.</p>
      </details>
      <details>
        <summary>What if you find nothing?</summary>
        <p>The report says so and there is no invoice.</p>
      </details>
      <details>
        <summary>What if the report isn't useful?</summary>
        <p>You don't pay. The payment link comes at the end of the report, so you read it first.</p>
      </details>
      <details>
        <summary>How do you check a finding?</summary>
        <p>Both quotes are machine-checked word for word against the live pages, and a second review has to agree the article is wrong today. We only report what we can show, so unannounced changes and screenshots aren't covered.</p>
      </details>
    </div>
  </section>
</template>

<style scoped>
.faq {
  max-width: 46rem;
  padding-bottom: var(--section);
}

details { border-top: 1px solid var(--line); }
details:last-child { border-bottom: 1px solid var(--line); }

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

details p a:hover { color: var(--ink); }

details p {
  max-width: 40rem;
  padding-bottom: 1.25rem;
  color: var(--mute);
}
</style>
