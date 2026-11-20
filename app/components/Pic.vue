<script setup lang="ts">
import type { Shot } from '~/data/games'

/**
 * A game picture. scripts/images.py writes a 960px copy beside every image wider than
 * that, so phones get the small file and large screens get the full one.
 */
const props = withDefaults(defineProps<{ shot: Shot, sizes?: string, eager?: boolean }>(), {
  sizes: '(min-width: 60rem) 60vw, 100vw',
  eager: false,
})

const srcset = computed(() =>
  props.shot.width > 960 && props.shot.src.endsWith('.webp')
    ? `${props.shot.src.replace(/\.webp$/, '-960.webp')} 960w, ${props.shot.src} ${props.shot.width}w`
    : undefined,
)
</script>

<template>
  <img
    :src="shot.src"
    :srcset="srcset"
    :sizes="srcset ? sizes : undefined"
    :alt="shot.alt"
    :width="shot.width"
    :height="shot.height"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
  >
</template>
