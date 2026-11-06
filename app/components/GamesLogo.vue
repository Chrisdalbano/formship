<script setup lang="ts">
const props = withDefaults(defineProps<{ height?: number }>(), { height: 56 })

// The games lockups share the 1100 by 400 viewBox of the Formship wordmark files.
const width = computed(() => Math.round(props.height * 2.75))
</script>

<template>
  <picture>
    <source srcset="/brand/games/formship-games-lockup-light.svg" media="(prefers-color-scheme: light)">
    <img src="/brand/games/formship-games-lockup-dark.svg" alt="Formship Games" :height="height" :width="width">
  </picture>
</template>
