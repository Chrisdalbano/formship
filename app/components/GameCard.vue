<script setup lang="ts">
import { NuxtLink } from '#components'
import type { Shot } from '~/data/games'

/**
 * One game as a card: the picture, the title, one quiet line. The picture leans toward
 * the pointer, and when the card opens a game page the picture travels there (`slug`
 * names it for the view transition).
 */
const props = withDefaults(defineProps<{
  title: string
  meta: string
  image: Shot
  /** Internal route. Leave empty and set `href` for a game that lives on another site. */
  to?: string
  href?: string
  slug?: string
  sizes?: string
}>(), { to: '', href: '', slug: '', sizes: '(min-width: 44rem) 40vw, 100vw' })

const link = computed(() => props.to ? { to: props.to } : { href: props.href, rel: 'noopener' })
const { onMove, onLeave } = useTilt()
</script>

<template>
  <component
    :is="to ? NuxtLink : 'a'"
    v-bind="link"
    class="card"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <span class="card__art">
      <Pic :shot="image" :sizes="sizes" :style="slug ? { viewTransitionName: `art-${slug}` } : undefined" />
    </span>
    <span class="card__title">
      {{ title }}
      <span class="card__go" aria-hidden="true">{{ to ? '→' : '↗' }}</span>
    </span>
    <span class="card__meta">{{ meta }}</span>
  </component>
</template>

<style scoped>
.card {
  --tx: 0;
  --ty: 0;
  display: grid;
  gap: 0.25rem;
  align-content: start;
  text-decoration: none;
  color: var(--ink);
  perspective: 900px;
}
.card:hover { color: var(--ink); }

.card__art {
  display: block;
  margin-bottom: 0.875rem;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line);
  transition: transform 260ms var(--out), box-shadow 260ms var(--out);
  will-change: transform;
}
.card__art img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform 500ms var(--out);
}

.card__title {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-family: var(--display);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.card__go {
  color: var(--accent);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 160ms linear, transform 220ms var(--snap);
}
.card__meta { color: var(--mute); font-size: 0.9375rem; }

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .card:hover .card__art {
    transform: rotateX(calc(var(--ty) * -3.5deg)) rotateY(calc(var(--tx) * 4.5deg)) translateY(-6px);
    box-shadow: 0 0 0 2px var(--accent), 0 22px 40px -18px rgba(0, 0, 0, 0.9);
  }
  .card:hover .card__art img { transform: scale(1.04); }
}
.card:hover .card__go, .card:focus-visible .card__go { opacity: 1; transform: none; }
</style>
