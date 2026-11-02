<template>
  <section class="hero">
    <div class="container hero__top">
      <h1 class="hero__title">
        <span class="hero__line">Your changelog moved.</span>{{ ' ' }}
        <span class="hero__line">Your help center didn't.</span>
      </h1>
      <div class="hero__action">
        <p class="hero__line-short">We find the help articles your last release made wrong.</p>
        <CtaLink />
      </div>
    </div>
    <div class="hero__band">
      <div class="container">
        <DriftFilm />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero__top {
  display: grid;
  gap: 1.25rem;
  padding-block: clamp(0.75rem, 2vw, 1.5rem) clamp(1.5rem, 2.5vw, 2rem);
}

.hero__title {
  font-size: clamp(2rem, 4.8vw, 4.25rem);
  font-weight: 640;
  line-height: 1.02;
  letter-spacing: -0.04em;
}

.hero__action {
  display: grid;
  gap: 1rem;
  justify-items: start;
}

.hero__line-short { color: var(--mute); max-width: 20rem; line-height: 1.4; }

@media (min-width: 48rem) {
  .hero__line { display: block; }

  .hero__top {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 2rem;
  }

  .hero__action { justify-items: end; text-align: right; }
}

.hero__band {
  background: var(--surface);
  border-block: 1px solid var(--line);
}
</style>
