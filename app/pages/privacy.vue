<script setup lang="ts">
import { MAILTO, SITE } from '~~/shared/site'

usePageSeo({
  title: 'Privacy | Formship',
  description: SITE.mouseflowProject
    ? 'What this site measures with Mouseflow, how Formship handles business addresses found on public pages, and how to opt out.'
    : 'No cookies, no analytics, no tracking on this site. How Formship handles business addresses found on public pages, and how to opt out.',
  path: '/privacy',
})
</script>

<template>
  <div class="container policy">
    <header class="policy__head">
      <h1 class="h1 h1--page">Privacy</h1>
      <p class="policy__date">Last updated {{ SITE.mouseflowProject ? 'November 4, 2026' : 'November 2, 2026' }}.</p>
    </header>
    <div class="prose">
      <h2 class="h3">This site</h2>
      <p v-if="SITE.mouseflowProject">
        We use Mouseflow to see how the site is used: page views, clicks, scrolling and pointer
        movement, including recordings of visits. Text you type is masked and we don't use it to
        identify you. Mouseflow may set its own cookies; its policy is at
        <a href="https://mouseflow.com/privacy/">mouseflow.com/privacy</a>. To opt out, block
        cdn.mouseflow.com or turn on Do Not Track in your browser. No ad pixels, no forms.
        Fonts are served from this site, not from a third party. The site is hosted on GitHub Pages,
        which keeps its own technical logs, including IP addresses, under
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub's privacy statement</a>.
      </p>
      <p v-else>
        No cookies, no analytics, no tracking pixels, no forms. Fonts are served from this site, not
        from a third party. The site is hosted on GitHub Pages, which keeps its own technical logs,
        including IP addresses, under
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub's privacy statement</a>.
      </p>

      <h2 class="h3">If you email us</h2>
      <p>
        We use what you send to answer you and, if you ask for one, to run your audit and invoice for
        it. An audit only reads your public pages. We don't sell your email or your report to anyone.
      </p>

      <h2 class="h3">Business addresses we find on public pages</h2>
      <p>
        We sometimes write to companies whose public help center appears to contradict their public
        changelog, to show them what we found. We only use a business address published on the
        company's own site, such as a support inbox, a general inbox, or a named person's address on
        the company's own page. We don't buy lists.
      </p>
      <p>
        We keep a record of the company, the address, the page it came from and what we sent.
      </p>

      <h2 class="h3">Opting out</h2>
      <p>
        Reply to any email from us and say so, or write to
        <a :href="MAILTO">{{ SITE.email }}</a>. We add the address to a suppression list and won't
        write again. We keep that one entry so the opt-out holds. Ask us to delete anything else we
        hold about you and we will.
      </p>

      <h2 class="h3">Who we are</h2>
      <p>{{ SITE.legalName }}, {{ SITE.location }}. Questions go to the address above.</p>
    </div>
  </div>
</template>

<style scoped>
.policy { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); }
.policy__head { display: grid; gap: 1rem; margin-bottom: 1rem; }
.policy__date { font: 400 0.8125rem/1.5 var(--mono); color: var(--mute); }
</style>
