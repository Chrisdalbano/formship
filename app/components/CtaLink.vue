<script setup lang="ts">
import { MAILTO_AUDIT } from '~~/shared/site'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <a class="cta" :class="{ 'cta--compact': compact }" :href="MAILTO_AUDIT">Get an audit</a>
</template>

<style scoped>
.cta {
  display: inline-block;
  padding: 0.875rem 1.375rem;
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.25;
  letter-spacing: -0.008em;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 140ms linear;
  white-space: nowrap;
}

.cta:hover { background: var(--accent-hover); color: var(--accent-ink); }

.cta--compact { padding: 0.5rem 0.875rem; font-size: 0.9375rem; }
</style>
