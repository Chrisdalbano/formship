<script setup lang="ts">
const props = withDefaults(defineProps<{ height?: number }>(), { height: 64 })

// The logo files have a 1100 by 400 viewBox.
const width = computed(() => Math.round(props.height * 2.75))
</script>

<template>
  <picture>
    <source srcset="/brand/formship-horizontal-blue.svg" media="(prefers-color-scheme: light)">
    <img src="/brand/formship-horizontal-white.svg" alt="Formship" :height="height" :width="width">
  </picture>
</template>
