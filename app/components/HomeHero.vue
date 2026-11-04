<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__top">
      <div class="hero__copy">
        <p class="label hero__eyebrow">Help-center drift audit</p>
        <h1 id="hero-title" class="hero__title">We check your help center against your changelog.</h1>
        <p class="hero__sub">
          You get every article a recent release made wrong, with the outdated sentence quoted
          and a corrected one to paste in. $149, and you pay after you read it.
        </p>
      </div>
      <div class="hero__action">
        <CtaLink />
        <NuxtLink to="/sample" class="hero__sample">See a sample report</NuxtLink>
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
/*
 * The header wordmark sits directly above this block, so the hero has to read as a new
 * thing, not a second line under the logo: a hard spacing break, a mono label to start
 * on, and a headline set clearly larger and narrower than the wordmark.
 */
.hero__top {
  display: grid;
  gap: 2rem;
  padding-block: clamp(3rem, 9vw, 7.5rem) clamp(2.5rem, 5vw, 4rem);
}

.hero__copy { display: grid; gap: 1.25rem; }

.hero__eyebrow { color: var(--accent); }

.hero__title {
  max-width: 15ch;
  font-size: clamp(2.5rem, 6.4vw, 5.5rem);
  font-weight: 640;
  line-height: 1.02;
  letter-spacing: -0.042em;
}

.hero__sub {
  max-width: 36rem;
  font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
  line-height: 1.5;
  color: var(--mute);
  letter-spacing: -0.006em;
}

.hero__action {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
}

.hero__sample { color: var(--mute); font-size: 0.9375rem; }
.hero__sample:hover { color: var(--ink); }

@media (min-width: 60rem) {
  .hero__top {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 3rem;
  }
}

.hero__band {
  background: var(--surface);
  border-block: 1px solid var(--line);
}
</style>
