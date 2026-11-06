<script setup lang="ts">
import { MAILTO, SITE } from '~~/shared/site'
</script>

<template>
  <footer class="container footer">
    <div class="legal">
      <p>© 2026 {{ SITE.legalName }}. {{ SITE.location }}.</p>
      <p class="also">
        Also from {{ SITE.legalName }}:
        <a href="https://barato.si" rel="noopener">barato.si</a>, a daily index of US price drops and probable price errors,
        and <NuxtLink to="/games/">Formship Games</NuxtLink>, our game label.
      </p>
    </div>
    <ul class="links">
      <li><NuxtLink to="/sample">Sample report</NuxtLink></li>
      <li><NuxtLink to="/guides/">Guides</NuxtLink></li>
      <li><NuxtLink to="/research">Research</NuxtLink></li>
      <li><NuxtLink to="/games/">Games</NuxtLink></li>
      <li><NuxtLink to="/about">About</NuxtLink></li>
      <li><NuxtLink to="/privacy">Privacy</NuxtLink></li>
      <li><a :href="MAILTO">{{ SITE.email }}</a></li>
    </ul>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  padding-block: 2.5rem 3rem;
  color: var(--mute);
  font-size: 0.875rem;
}

.legal { display: grid; gap: 0.375rem; max-width: 34rem; }
.also { font-size: 0.8125rem; }
.also a:hover { color: var(--ink); }

.links { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; }
.links a { text-decoration: none; }
.links a:hover { color: var(--ink); }
</style>
