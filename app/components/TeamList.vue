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

.team__member {
  display: grid;
  gap: 0.35rem;
  padding-block: 1.125rem;
  border-top: 1px solid var(--line);
}
</style>
