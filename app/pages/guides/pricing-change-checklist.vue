<template>
  <GuideArticle slug="pricing-change-checklist">
    <p>
      A pricing change reaches the pricing page first. The same facts also sit in the help center, in
      more places than most teams remember: plan comparisons, feature articles that say "available on
      Pro", billing questions, and troubleshooting steps that quote a limit. Every copy has to change.
      The ones nobody remembers are the ones that stay wrong.
    </p>
    <p>
      In our <NuxtLink to="/research">early field note</NuxtLink>, the most common contradiction we
      found was an article stating a limit or a plan restriction after the changelog said it was gone.
      Plan changes are where that starts.
    </p>

    <h2 class="h3">Start with a written diff</h2>
    <p>Before searching anything, write down exactly what changed, old value next to new value.</p>
    <ul>
      <li>Plan names that were added, renamed or retired.</li>
      <li>Prices, monthly and annual, in every currency you show.</li>
      <li>Limits per plan: seats, projects, storage, guests, API calls, whatever you meter.</li>
      <li>Features that moved between plans, in either direction.</li>
      <li>Trial length and what the trial includes.</li>
      <li>Billing rules: proration, refunds, cancellation, and what existing customers keep.</li>
    </ul>
    <p>Every old value on that list is a search term for the steps below.</p>

    <h2 class="h3">Where to look</h2>
    <ol>
      <li>
        <strong>Plan comparison and pricing FAQ articles.</strong> These are the obvious ones, so do
        them first and get them out of the way.
      </li>
      <li>
        <strong>Feature articles.</strong> Search for every old plan name. Read the sentences near
        "available on", "only on", "requires" and "upgrade to". A feature that moved to a cheaper plan
        often leaves "Upgrade to Pro to use this" behind.
      </li>
      <li>
        <strong>Numbers with units.</strong> Search for each old limit as written, such as "5 projects"
        or "10 GB". Check tables and bulleted lists by eye, since search results tend to show them
        without context.
      </li>
      <li>
        <strong>Billing and account articles.</strong> Changing plans, adding seats, invoices, refunds
        and cancellation. These often restate prices and proration rules in full.
      </li>
      <li>
        <strong>Troubleshooting articles.</strong> Explanations of errors such as "You've reached your
        project limit" often quote the old number.
      </li>
      <li>
        <strong>Screenshots.</strong> Pricing tables and upgrade dialogs inside images won't show up in
        search. Open every article in the billing category and look at the pictures.
      </li>
      <li>
        <strong>Translated articles.</strong> If your help center has other languages, run the same
        searches there. Translations are often updated last.
      </li>
      <li>
        <strong>Things that copy the help center.</strong> Saved replies your support team uses, in-app
        tooltips, and any support bot that answers from your articles. A bot repeats whatever the
        articles still say.
      </li>
    </ol>

    <h2 class="h3">Customers who keep the old terms</h2>
    <p>
      If existing customers keep their old plan or price, some old sentences are still true for them.
      Label those sentences instead of deleting them, for example: "Workspaces created before
      September 1, 2026 keep a limit of 5 projects." The article stays true for both groups, and support
      has something to point to.
    </p>

    <h2 class="h3">After the sweep</h2>
    <ul>
      <li>
        Search for the old plan names once more a week after launch. Articles written during launch week
        can pick up old wording from drafts.
      </li>
      <li>
        Keep the diff. The next pricing change starts from it, and it doubles as a record of what changed
        and when.
      </li>
      <li>
        Add a changelog entry for the pricing change if you didn't publish one. Without it, the next
        person checking the help center has no date to work from.
      </li>
    </ul>
  </GuideArticle>
</template>
