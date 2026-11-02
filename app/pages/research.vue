<script setup lang="ts">
import { FIELD_NOTE as n } from '~/data/fieldNote'

usePageSeo({
  title: 'How often help centers drift from changelogs | Formship',
  description: `An early field note: ${n.contradicted} of ${n.sample} SaaS companies had a help article we could show was contradicted by their own changelog. Small sample, not random, method stated.`,
  path: '/research',
})

const groups = [
  { key: 'hit', count: n.contradicted, label: 'still contradicted when checked against the live pages' },
  { key: 'fixed', count: n.fixedFirst, label: 'contradicted, then fixed within a day' },
  { key: 'clean', count: n.clean, label: 'no contradiction we could prove' },
] as const

const rows = [
  { label: 'Contradictions reported', value: `${n.findings}`, note: `across ${n.contradicted} companies` },
  { label: 'Per company', value: `${n.perCompany.one} / ${n.perCompany.two} / ${n.perCompany.three}`, note: 'companies with one / two / three' },
  { label: 'A stated limit was lifted', value: `${n.kinds.limitLifted} of ${n.contradicted}`, note: 'the article says you can\'t, the changelog says now you can' },
  { label: 'A rename', value: `${n.kinds.rename} of ${n.contradicted}`, note: 'the article uses the old name' },
  { label: 'Other behavior change', value: `${n.kinds.otherBehavior} of ${n.contradicted}`, note: 'a step or status that no longer holds' },
]
</script>

<template>
  <article class="container note">
    <header class="note__head">
      <p class="label">Field note</p>
      <h1 class="h1 h1--page">How often help centers drift from changelogs</h1>
      <p class="lede note__deck">
        An early look. {{ n.sample }} companies, one week, a sample that is small and not random.
        It is a first count and an upper limit, not a rate you should quote.
      </p>
      <p class="note__byline">Formship. November 2, 2026.</p>
    </header>

    <section class="note__result">
      <div>
        <p class="note__figure num">{{ n.contradicted }} of {{ n.sample }}</p>
        <p class="note__figure-text">
          companies had a help article we could show was contradicted by their own changelog.
        </p>
      </div>
      <DriftWaffle :groups="[...groups]" />
    </section>

    <div class="prose">
      <p>
        The question is simple. A SaaS company announces a change in its public changelog. Does its
        public help center keep up?
      </p>
      <p>
        At most of the companies we read, it did. In {{ n.clean }} of {{ n.sample }} we could not
        prove a contradiction, and some of those help centers had been rewritten within days of the
        change. At one more, we found articles still using a feature's old name right after a rename.
        When we checked again a day later the docs had caught up, so we dropped it.
      </p>

      <h2 class="h3">What the contradictions looked like</h2>
      <p>
        Renames are the obvious case, but they were not the common one. The most frequent shape was
        an article stating a limit, such as a plan restriction or a setting you can't change, after
        the changelog had announced the limit was gone. Our guess at why: a launch post prompts
        someone to document the new thing, and nobody goes back to the sentence saying it was
        impossible.
      </p>
    </div>

    <dl class="note__table">
      <div v-for="row in rows" :key="row.label" class="note__row">
        <dt>{{ row.label }}</dt>
        <dd class="note__value num">{{ row.value }}</dd>
        <dd class="note__rownote">{{ row.note }}</dd>
      </div>
    </dl>

    <div class="prose">
      <p class="note__small">
        The three kinds are our own reading of our notes, with each company counted once.
      </p>

      <h2 class="h3">How long they stayed wrong</h2>
      <p>
        We have both dates for {{ n.age.companies }} of the {{ n.contradicted }} companies. From the
        changelog entry to the day we wrote to them, the article had been wrong for
        {{ n.age.min }} to {{ n.age.max }} days, with a median of {{ n.age.median }}. That is a floor,
        since we don't know when each one gets fixed. Of the {{ n.age.companies }},
        {{ n.age.overNinety }} are older than the 90-day window our paid audit covers.
      </p>

      <h2 class="h3">Method</h2>
      <ul>
        <li>
          <strong>Where the data comes from.</strong> Two logs we kept between October 27 and
          November 2, 2026, while looking for companies to write to about this service. One records a
          verdict per company, the other what we sent.
        </li>
        <li>
          <strong>Who is in the {{ n.sample }}.</strong> Small and mid-size B2B SaaS companies where
          we read a dated public changelog and a public help center, and recorded a verdict.
        </li>
        <li>
          <strong>What counts as a contradiction.</strong> A sentence in a help article that is false
          today because of a dated changelog entry. Both quotes are machine-checked word for word
          against the live page, and a second review has to agree. Ambiguous cases are dropped.
        </li>
        <li>
          <strong>What the {{ n.findings }} covers.</strong> Only the findings we sent. Weaker ones we
          left out are not counted.
        </li>
        <li>
          <strong>Who is not in the sample.</strong> About {{ n.noVerdictApprox }} other companies in
          the log got no verdict: no changelog where we looked, undated or stale entries, pages we
          couldn't fetch, help centers too large for this pass, or we didn't get to them.
        </li>
      </ul>

      <h2 class="h3">Why not to lean on this</h2>
      <ul>
        <li>
          <strong>It isn't random.</strong> We chose categories and companies where drift seemed
          likelier, left some categories out, and in some categories stopped looking after a hit.
        </li>
        <li>
          <strong>It only sees readable changelogs.</strong> A company without a dated public
          changelog can't appear here at all.
        </li>
        <li>
          <strong>A clean verdict is not a clean help center.</strong> These passes read a sample of
          articles, not all of them, so we will have missed some drift.
        </li>
        <li>
          <strong>The log has gaps.</strong> Some companies from our first night have no recorded
          verdict. One of them is in the {{ n.contradicted }} because the send log shows its finding.
          Our notes from that night say we read roughly 35 companies and most came back clean, so
          {{ n.contradicted }} of {{ n.sample }} is too high. Read it as an upper limit.
        </li>
        <li>
          <strong>One borderline call.</strong> We sent one further company a finding about two of
          its own pages disagreeing with each other. That isn't changelog drift, so it counts as no
          contradiction here.
        </li>
        <li>
          <strong>We sell the fix.</strong> Formship sells an audit for this problem. Read the count
          with that in mind.
        </li>
      </ul>

      <p class="note__close">
        We name no company here and quote none of their text. To have yours read,
        <NuxtLink to="/">see the audit</NuxtLink>.
      </p>
    </div>
  </article>
</template>

<style scoped>
.note { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); }

.note__head { display: grid; gap: 1.25rem; max-width: 56rem; }

.note__deck { max-width: 40rem; }

.note__byline { font: 400 0.8125rem/1.5 var(--mono); color: var(--mute); }

.note__result {
  display: grid;
  gap: 2.5rem;
  align-items: start;
  margin-block: clamp(3rem, 6vw, 5rem);
  padding-block: clamp(2rem, 4vw, 3rem);
  border-block: 1px solid var(--line-strong);
}

@media (min-width: 52rem) {
  .note__result { grid-template-columns: 1fr 1fr; gap: 3rem; }
}

.note__figure {
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  font-weight: 620;
  line-height: 1;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;
}

.note__figure-text { max-width: 24rem; font-size: 1.125rem; line-height: 1.45; }

.prose strong { font-weight: 600; }

.note__table {
  max-width: 40rem;
  margin-block: 2rem;
  border-bottom: 1px solid var(--line);
}

.note__row {
  display: grid;
  gap: 0.125rem 1.5rem;
  grid-template-columns: minmax(0, 1fr) auto;
  padding-block: 0.75rem;
  border-top: 1px solid var(--line);
}

.note__row:first-child { border-top-color: var(--line-strong); }

.note__value { font-weight: 600; text-align: right; }
.note__rownote { grid-column: 1 / -1; color: var(--mute); font-size: 0.9375rem; }

.note__small { font-size: 0.9375rem; color: var(--mute); }

.note__close { padding-top: 1.5rem; }
</style>
