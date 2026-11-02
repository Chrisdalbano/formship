<script setup lang="ts">
interface Group {
  key: 'hit' | 'fixed' | 'clean'
  count: number
  label: string
}

const props = defineProps<{ groups: Group[] }>()

const cells = computed(() =>
  props.groups.flatMap(group =>
    Array.from({ length: group.count }, () => ({ key: group.key, label: group.label })),
  ),
)

const total = computed(() => cells.value.length)

const summary = computed(() =>
  `${total.value} companies: ${props.groups.map(g => `${g.count} ${g.label}`).join(', ')}.`,
)
</script>

<template>
  <figure class="waffle">
    <div class="waffle__grid" role="img" :aria-label="summary">
      <span
        v-for="(cell, index) in cells"
        :key="index"
        class="waffle__cell"
        :class="`waffle__cell--${cell.key}`"
        :title="cell.label"
      />
    </div>
    <figcaption>
      <ul class="waffle__legend">
        <li v-for="group in groups" :key="group.key" class="waffle__item">
          <span class="waffle__cell" :class="`waffle__cell--${group.key}`" />
          <span class="waffle__count num">{{ group.count }}</span>
          <span class="waffle__label">{{ group.label }}</span>
        </li>
      </ul>
    </figcaption>
  </figure>
</template>

<style scoped>
.waffle { display: grid; gap: 1.25rem; }

.waffle__grid {
  display: grid;
  grid-template-columns: repeat(14, minmax(0, 1fr));
  gap: 3px;
  max-width: 28rem;
}

.waffle__grid .waffle__cell { width: 100%; height: auto; aspect-ratio: 1; }

.waffle__cell {
  display: block;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 2px;
  flex: none;
}

.waffle__cell--hit { background: var(--old); }
.waffle__cell--fixed { background: var(--new); }
.waffle__cell--clean { background: transparent; box-shadow: inset 0 0 0 1px var(--line-strong); }

.waffle__legend { display: grid; gap: 0.5rem; }

.waffle__item {
  display: grid;
  grid-template-columns: 0.875rem 1.75rem minmax(0, 1fr);
  gap: 0.625rem;
  align-items: baseline;
  font-size: 0.9375rem;
}

.waffle__item .waffle__cell { align-self: center; }
.waffle__count { font-weight: 600; text-align: right; }
.waffle__label { color: var(--mute); }
</style>
