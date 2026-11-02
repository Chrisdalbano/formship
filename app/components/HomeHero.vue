<template>
  <section class="hero">
    <h1 class="h1 hero__title">
      <span class="hero__line">Your changelog moved.</span>{{ ' ' }}
      <span class="hero__line">Your help center didn't.</span>
    </h1>
    <div class="hero__grid">
      <div class="hero__copy">
        <p class="lede">
          A release can make a help article wrong: a renamed button, a moved setting, a limit that
          no longer applies. We read your public changelog against your public help center and send
          back the articles a shipped change made wrong, each with the exact quote and a corrected
          sentence.
        </p>
        <div class="hero__action">
          <CtaLink />
          <p class="hero__terms">$149 flat. 48 hours. Pay after you read it.</p>
        </div>
      </div>
      <DriftAnimation />
    </div>
  </section>
</template>

<style scoped>
.hero { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); }

.hero__title { margin-bottom: clamp(2rem, 4.5vw, 3.75rem); }

@media (min-width: 48rem) {
  .hero__line { display: block; }
}

.hero__grid { display: grid; gap: 2.5rem; align-items: start; }

@media (min-width: 60rem) {
  .hero__grid { grid-template-columns: 5fr 7fr; gap: 3.5rem; }
}

.hero__copy { display: grid; gap: 2rem; }

.hero__action { display: flex; flex-wrap: wrap; align-items: center; gap: 0.875rem 1.25rem; }

.hero__terms { font-size: 0.9375rem; color: var(--mute); }
</style>
