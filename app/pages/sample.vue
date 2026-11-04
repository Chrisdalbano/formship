<script setup lang="ts">
import { SAMPLE as s } from '~/data/sample'

usePageSeo({
  title: 'Sample drift audit report | Formship',
  description: 'What a Formship help-center drift audit looks like, shown for a made-up product. Each finding quotes the outdated help sentence, the dated changelog entry behind it, and a corrected sentence to paste in.',
  path: '/sample',
})

const pct = (n: number) => `${Math.round(n * 100)}%`
</script>

<template>
  <article class="container sample">
    <header class="sample__head">
      <p class="label">Sample report</p>
      <h1 class="h1 h1--page">What you get back.</h1>
      <p class="lede sample__deck">
        This is a sample for {{ s.product }}, a product we made up. Every quote below was written for
        this page. A real report has the same parts, with your own pages quoted word for word.
      </p>
    </header>

    <div class="report">
      <p class="report__flag label">Sample. {{ s.product }} is fictional.</p>

      <header class="report__head">
        <h2 class="h2">Help-center drift audit: {{ s.product }}</h2>
        <dl class="report__meta">
          <div><dt class="label">Date</dt><dd>{{ s.date }}</dd></div>
          <div><dt class="label">Help center</dt><dd class="mono">{{ s.helpCenter }}</dd></div>
          <div><dt class="label">Changelog</dt><dd class="mono">{{ s.changelog }}</dd></div>
          <div><dt class="label">Window</dt><dd>{{ s.window }}</dd></div>
          <div>
            <dt class="label">Changelog entries</dt>
            <dd class="num">{{ s.changelogEntries }} in the window, {{ s.userFacingChanges }} that change how someone uses the product</dd>
          </div>
          <div>
            <dt class="label">Articles read</dt>
            <dd class="num">{{ s.articlesRead }} of {{ s.articlesListed }} listed</dd>
          </div>
          <div>
            <dt class="label">Findings</dt>
            <dd class="num">{{ s.findings.length }}</dd>
          </div>
        </dl>
      </header>

      <ol class="findings">
        <li v-for="(f, i) in s.findings" :key="f.article" class="finding">
          <h3 class="h3 finding__title">
            <span class="finding__num">{{ i + 1 }}</span>
            {{ f.title }}
          </h3>
          <p class="finding__where">
            <span class="label">Article</span>
            <span class="mono">{{ f.article }}</span>
          </p>

          <dl class="finding__body">
            <div class="finding__row finding__row--old">
              <dt class="label">Your article says</dt>
              <dd><q>{{ f.articleQuote }}</q></dd>
            </div>
            <div class="finding__row">
              <dt class="label">Changelog, {{ f.changelogDate }}</dt>
              <dd><q>{{ f.changelogQuote }}</q></dd>
            </div>
            <div class="finding__row">
              <dt class="label">Why it's wrong now</dt>
              <dd class="body-mute">{{ f.why }}</dd>
            </div>
            <div class="finding__row finding__row--fix">
              <dt class="label">Paste this instead</dt>
              <dd>{{ f.fix }}</dd>
            </div>
            <div class="finding__row">
              <dt class="label">Confidence</dt>
              <dd class="num">{{ pct(f.confidence) }}</dd>
            </div>
          </dl>
        </li>
      </ol>

      <section class="report__limits" aria-labelledby="not-checked">
        <h3 id="not-checked" class="h3">What we didn't check</h3>
        <ul class="report__list">
          <li v-for="item in s.notChecked" :key="item">{{ item }}</li>
        </ul>
      </section>
    </div>

    <section class="aside" aria-labelledby="how-strict">
      <div class="aside__head">
        <p class="label">Not in the report</p>
        <h2 id="how-strict" class="h3">A candidate we would drop</h2>
      </div>
      <div class="prose">
        <p>
          A finding has to be wrong for a user today. When a sentence might still be true for some
          plan, platform or version, it stays out. Here is the kind of candidate that doesn't make it.
        </p>
        <div v-for="d in s.notReported" :key="d.article" class="dropped">
          <p><span class="label">Article says</span> <q>{{ d.articleQuote }}</q></p>
          <p><span class="label">Changelog, {{ d.changelogDate }}</span> <q>{{ d.changelogQuote }}</q></p>
          <p class="body-mute">{{ d.reason }}</p>
        </div>
        <p>
          Quotes in a real report are checked word for word against your live pages, and a second
          review has to agree each article is wrong before it goes in.
        </p>
      </div>
    </section>

    <RequestBlock heading="Want this for your help center?" />
  </article>
</template>

<style scoped>
.sample { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); }

.sample__head { display: grid; gap: 1.25rem; max-width: 56rem; }
.sample__deck { max-width: 40rem; }

.mono { font-family: var(--mono); font-size: 0.875em; overflow-wrap: anywhere; }

q { quotes: '\201C' '\201D'; }

/* The report sits on the surface colour, like a document laid on the page. */
.report {
  position: relative;
  margin-block: clamp(2.5rem, 5vw, 4rem);
  padding: clamp(1.25rem, 4vw, 3rem);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 4px;
}

.report__flag {
  display: inline-block;
  margin-bottom: 1.5rem;
  padding: 0.25rem 0.5rem;
  color: var(--old);
  border: 1px solid var(--old);
  border-radius: 2px;
}

.report__head { display: grid; gap: 1.5rem; }

.report__meta {
  display: grid;
  gap: 0;
  max-width: 48rem;
}

.report__meta > div {
  display: grid;
  gap: 0.125rem 1.5rem;
  padding-block: 0.625rem;
  border-top: 1px solid var(--line);
}

@media (min-width: 40rem) {
  .report__meta > div { grid-template-columns: 11rem 1fr; align-items: baseline; }
}

.findings { display: grid; gap: 0; margin-top: clamp(2rem, 4vw, 3rem); }

.finding {
  display: grid;
  gap: 1rem;
  padding-block: clamp(1.75rem, 3vw, 2.5rem);
  border-top: 1px solid var(--line-strong);
}

.finding__title { display: flex; gap: 0.75rem; align-items: baseline; font-size: 1.375rem; }
.finding__num { font: 500 0.875rem/1 var(--mono); color: var(--accent); }

.finding__where { display: grid; gap: 0.25rem; }

.finding__body { display: grid; gap: 0; max-width: 48rem; }

.finding__row {
  display: grid;
  gap: 0.25rem 1.5rem;
  padding-block: 0.75rem;
  border-top: 1px solid var(--line);
}

@media (min-width: 40rem) {
  .finding__row { grid-template-columns: 11rem 1fr; align-items: baseline; }
}

/* Same mapping as the homepage film: the stale sentence is marked old, the fix is new. */
.finding__row--old dd {
  padding-left: 0.75rem;
  border-left: 2px solid var(--old);
}

.finding__row--fix dd {
  padding-left: 0.75rem;
  border-left: 2px solid var(--new);
  color: var(--new);
  font-weight: 500;
}

.report__limits {
  display: grid;
  gap: 1rem;
  padding-top: clamp(1.75rem, 3vw, 2.5rem);
  border-top: 1px solid var(--line-strong);
}

.report__list { display: grid; gap: 0.5rem; max-width: 44rem; }
.report__list li { padding-left: 1.25rem; position: relative; color: var(--mute); }
.report__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.8em;
  width: 0.5rem;
  height: 1px;
  background: var(--line-strong);
}

.aside {
  display: grid;
  gap: 1.25rem;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

@media (min-width: 52rem) {
  .aside { grid-template-columns: 5fr 7fr; gap: 3rem; }
}

.aside__head { display: grid; gap: 0.5rem; align-content: start; }

.dropped {
  display: grid;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border: 1px dashed var(--line-strong);
  border-radius: 4px;
}

.dropped .label { display: block; margin-bottom: 0.125rem; }
</style>
