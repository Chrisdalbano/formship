<script setup lang="ts">
import { TEAM } from '~/data/team'
</script>

<template>
  <ul class="team">
    <li v-for="m in TEAM" :key="m.name" class="team__member">
      <h3 class="h3">{{ m.name }}</h3>
      <p class="body-mute">{{ m.role }}</p>
    </li>
  </ul>
</template>

<style scoped>
.team { display: grid; gap: 0; }
@media (min-width: 44rem) { .team { grid-template-columns: 1fr 1fr; column-gap: 3rem; } }

/* The list sits inside .prose on the studio page; drop that list's dash and spacing. */
.team__member::before { display: none; }
.team__member {
  margin-top: 0;
  padding-left: 0;
  align-content: start;
  display: grid;
  gap: 0.35rem;
  padding-block: 1.125rem;
  border-top: 1px solid var(--line-strong);
  transition: border-color 160ms linear, padding-left 220ms var(--out);
}
.team__member:hover { border-top-color: var(--accent); padding-left: 0.5rem; }
</style>
