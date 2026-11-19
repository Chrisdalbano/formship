<script setup lang="ts">
import { MAILTO, SITE } from '~~/shared/site'

usePageSeo({
  title: 'About | Formship Games',
  description: "Formship Games is the studio name of Formship LLC, an independent game studio in Orlando, Florida, founded by Christian D'Albano.",
  path: '/about',
})
</script>

<template>
  <div class="container about">
    <h1 class="h1 h1--page">An independent game studio in Orlando, Florida.</h1>
    <div class="about__grid">
      <div class="prose">
        <p class="lede">
          Formship Games is the studio name of Formship LLC. The company started in software and now
          makes games only.
        </p>
        <p>
          Four people work here. Spare Knight, a tactical roguelike where attacks never miss, is the
          game in development, and the earlier games are released and playable.
          <NuxtLink to="/games/">See the games</NuxtLink> or read
          <NuxtLink to="/games/studio">who we are and how we work</NuxtLink>.
        </p>
        <p>
          The help-center audit service that Formship ran in 2026 is closed. If you received a report
          from us and have a question about it, write to <a :href="MAILTO">{{ SITE.email }}</a>.
        </p>
      </div>
      <dl class="about__facts">
        <div class="about__fact">
          <dt class="label">Studio</dt>
          <dd>Formship Games</dd>
        </div>
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
