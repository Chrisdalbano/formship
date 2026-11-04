<script setup lang="ts">
const FACTS = ['Up to 60 articles, last 90 days', 'Report in 48 hours', 'Pay after you read it']
</script>

<template>
  <section id="price" class="container">
    <div class="price">
      <p v-reveal class="price__amount num">$149</p>
      <div v-reveal="90" class="price__side">
        <ul class="price__facts">
          <li v-for="fact in FACTS" :key="fact" class="price__fact">{{ fact }}</li>
        </ul>
        <div class="price__action">
          <CtaLink />
          <NuxtLink to="/sample" class="price__sample">See a sample report</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.price {
  display: grid;
  gap: 2rem;
  align-items: end;
  padding-block: var(--section);
  border-top: 1px solid var(--line);
}

@media (min-width: 48rem) {
  .price { grid-template-columns: 1fr 1fr; gap: 3rem; }
}

.price__amount {
  font-size: clamp(6rem, 17vw, 14rem);
  font-weight: 640;
  line-height: 0.9;
  letter-spacing: -0.055em;
}

.price__side { display: grid; gap: 1.75rem; justify-items: start; }

.price__facts { width: 100%; }

.price__action { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; }
.price__sample { color: var(--mute); font-size: 0.9375rem; }
.price__sample:hover { color: var(--ink); }

.price__fact {
  padding-block: 0.75rem;
  border-top: 1px solid var(--line);
  font-size: 1.125rem;
  letter-spacing: -0.01em;
}
</style>
