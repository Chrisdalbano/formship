<template>
  <section id="finding" class="container">
    <div class="sheet">
      <p class="label">The report</p>
      <div>
        <h2 v-reveal class="h2 finding__title">What a finding looks like.</h2>
        <article v-reveal class="finding">
          <header class="finding__head">
            <span>Finding 1 of 3</span>
            <span class="finding__tag">Illustrative, not a real company</span>
          </header>
          <dl class="finding__rows">
            <div class="finding__row">
              <dt class="label">Article</dt>
              <dd>Export your data<br><span class="finding__url">help.example.com/articles/export-data</span></dd>
            </div>
            <div class="finding__row">
              <dt class="label">Article says</dt>
              <dd class="finding__quote finding__quote--old">"Go to Settings &gt; Data and click Export CSV."</dd>
            </div>
            <div class="finding__row">
              <dt class="label">Changelog, Oct 14</dt>
              <dd class="finding__quote">"CSV export moved to Reports &gt; Downloads."</dd>
            </div>
            <div class="finding__row">
              <dt class="label">Corrected sentence</dt>
              <dd class="finding__quote finding__quote--new">"Go to Reports &gt; Downloads and choose CSV."</dd>
            </div>
          </dl>
        </article>
        <p v-reveal class="finding__note body-mute">
          In a real report, both quotes are copied from your live pages and each one links to its
          source.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.finding__title { margin-bottom: clamp(2rem, 4vw, 3.5rem); }

.finding {
  border-block: 1px solid var(--line-strong);
}

.finding__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 1.5rem;
  padding-block: 0.75rem;
  border-bottom: 1px solid var(--line);
  font: 500 0.8125rem/1.5 var(--mono);
}

.finding__tag { color: var(--mute); font-weight: 400; }

.finding__row {
  display: grid;
  gap: 0.375rem;
  padding-block: 1.125rem;
}

.finding__row + .finding__row { border-top: 1px solid var(--line); }

@media (min-width: 40rem) {
  .finding__row { grid-template-columns: 11rem minmax(0, 1fr); gap: 1.5rem; align-items: baseline; }
}

.finding__url { font: 400 0.8125rem/1.5 var(--mono); color: var(--mute); overflow-wrap: anywhere; }

.finding__quote { font-size: clamp(1.0625rem, 1.8vw, 1.25rem); line-height: 1.4; letter-spacing: -0.01em; }
.finding__quote--old { color: var(--old); }
.finding__quote--new { color: var(--new); }

.finding__note { margin-top: 1rem; font-size: 0.9375rem; }
</style>
