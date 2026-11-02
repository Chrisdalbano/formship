<script setup lang="ts">
import { MAILTO, SITE } from '~~/shared/site'
</script>

<template>
  <footer class="container footer">
    <p>© 2026 {{ SITE.legalName }}. {{ SITE.location }}.</p>
    <ul class="links">
      <li><NuxtLink to="/research">Research</NuxtLink></li>
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

.links { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; }
.links a { text-decoration: none; }
.links a:hover { color: var(--ink); }
</style>
