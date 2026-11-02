<script setup lang="ts">
const TERMS = [
  ['Scope', 'Up to 60 public help articles'],
  ['Window', 'The last 90 days of your public changelog'],
  ['You get', 'Article link, exact quote, the change that made it wrong, a corrected sentence'],
  ['Delivery', 'By email, within 48 hours'],
  ['Payment', 'Invoice after delivery. No account, no access, no call.'],
] as const
</script>

<template>
  <section id="price" class="container">
    <div class="sheet">
      <p class="label">Price</p>
      <div class="price">
        <div v-reveal class="price__lead">
          <p class="price__amount num">$149</p>
          <h2 class="h3 price__claim">One flat price. You pay after you read it.</h2>
          <p class="body-mute">If the report isn't useful, you don't pay.</p>
          <CtaLink class="price__cta" />
        </div>
        <dl v-reveal="90" class="price__terms">
          <div v-for="[term, value] in TERMS" :key="term" class="price__term">
            <dt class="label">{{ term }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.price { display: grid; gap: 2.5rem; align-items: start; }

@media (min-width: 48rem) {
  .price { grid-template-columns: 4fr 5fr; gap: 3rem; }
}

.price__lead { display: grid; gap: 0.625rem; justify-items: start; }

.price__amount {
  font-size: clamp(4.5rem, 10vw, 8rem);
  font-weight: 620;
  line-height: 1;
  letter-spacing: -0.05em;
  margin-bottom: 0.75rem;
}

.price__cta { margin-top: 1.25rem; }

.price__term {
  display: grid;
  gap: 0.25rem;
  padding-block: 0.875rem;
  border-top: 1px solid var(--line);
}

.price__term:first-child { border-top-color: var(--line-strong); }

@media (min-width: 30rem) {
  .price__term { grid-template-columns: 6rem minmax(0, 1fr); gap: 1rem; align-items: baseline; }
}
</style>
