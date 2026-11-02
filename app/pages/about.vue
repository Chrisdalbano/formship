<script setup lang="ts">
import { MAILTO, SITE } from '~~/shared/site'

usePageSeo({
  title: 'About | Formship',
  description: "Formship LLC is a small software company in Orlando, Florida, founded by Christian D'Albano. We sell help-center drift audits.",
  path: '/about',
})
</script>

<template>
  <div class="container about">
    <h1 class="h1 h1--page">A small software company in Orlando, Florida.</h1>
    <div class="about__grid">
      <div class="prose">
        <p class="lede">
          Formship LLC makes one thing right now: an audit that compares a SaaS company's public
          changelog with its public help center and returns the articles a shipped change made wrong.
        </p>
        <p>
          We work from public pages only. We don't ask for logins, calls or a contract before you
          have read the report, and we don't report anything we can't quote word for word from your
          live pages.
        </p>
        <p>
          <NuxtLink to="/">See the audit</NuxtLink> or read
          <NuxtLink to="/research">our early field note</NuxtLink>.
        </p>
      </div>
      <dl class="about__facts">
        <div class="about__fact">
          <dt class="label">Company</dt>
          <dd>{{ SITE.legalName }}</dd>
        </div>
        <div class="about__fact">
          <dt class="label">Location</dt>
          <dd>{{ SITE.location }}</dd>
        </div>
        <div class="about__fact">
          <dt class="label">Founder</dt>
          <dd>{{ SITE.founder }}</dd>
        </div>
        <div class="about__fact">
          <dt class="label">Contact</dt>
          <dd><a :href="MAILTO">{{ SITE.email }}</a></dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.about { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); }

.about .h1 { max-width: 56rem; margin-bottom: clamp(2.5rem, 5vw, 4rem); }

.about__grid { display: grid; gap: 3rem; align-items: start; }

@media (min-width: 52rem) {
  .about__grid { grid-template-columns: 7fr 4fr; gap: 4rem; }
}

.about__fact {
  display: grid;
  gap: 0.25rem;
  padding-block: 0.875rem;
  border-top: 1px solid var(--line);
}

.about__fact:first-child { border-top-color: var(--line-strong); }
</style>
