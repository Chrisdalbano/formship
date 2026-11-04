<template>
  <GuideArticle slug="help-center-drift">
    <p>
      Help-center drift is a help article saying something that a shipped change has made false.
      The page still loads and people still read it. It gives them the wrong answer.
    </p>
    <p>
      Nobody decides to let this happen. It comes from how releases and docs are usually split
      between people, and it can be caught with a short check once a month.
    </p>

    <h2 class="h3">How it happens</h2>
    <p>
      Most teams document new features well. A launch gets an article and a changelog entry. What
      gets missed is an older sentence somewhere else that the launch quietly contradicted. These are
      the usual paths.
    </p>
    <ul>
      <li>
        <strong>A limit is lifted.</strong> An article says a feature is only on the top plan, or that a
        setting can't be changed. Later the changelog announces the opposite. The old sentence stays,
        because nobody searches the help center for the word "can't".
      </li>
      <li>
        <strong>Something is renamed.</strong> The product now says Labels. Some articles still say
        Tags, and a user can't find the button the article names.
      </li>
      <li>
        <strong>A step moves.</strong> Export moves from Settings to a File menu. The how-to still
        starts with "Go to Settings".
      </li>
      <li>
        <strong>A plan or price changes.</strong> Plan names, prices and limits are repeated across
        many articles, and every copy has to change.
        <NuxtLink to="/guides/pricing-change-checklist">There is a separate checklist for that.</NuxtLink>
      </li>
    </ul>
    <p>
      In our own <NuxtLink to="/research">early field note</NuxtLink>, renames were the obvious case
      but the first shape was the common one: an article stating a limit after the changelog said the
      limit was gone. That sample was small and not random, so treat it as a hint about where to look.
    </p>

    <h2 class="h3">Why it's hard to catch</h2>
    <p>
      The person who writes the changelog is often not the person who owns the help center. Each one
      does their part, and the gap sits between them.
    </p>
    <p>
      Help-center search matches words. Searching for the feature that changed finds the new article
      you just wrote. It does not find the old sentence that now disagrees with it, unless you search
      for the old words.
    </p>
    <p>
      Support agents who know an article is wrong can answer around it in tickets for months. Each
      ticket gets solved and the article never gets flagged.
    </p>

    <h2 class="h3">The 20-minute monthly check</h2>
    <p>
      You need your changelog, your help center's search box (or Google), and a doc for notes. Block
      20 minutes on the first working day of the month. The times below are a guide for a month with
      a handful of changes.
    </p>
    <ol>
      <li>
        <strong>List last month's changes (5 minutes).</strong> Open the changelog and copy every entry
        from the last month that changes how someone does something: a rename, a moved menu, a new or
        removed limit, a changed default, a plan change, a removed feature. Skip bug fixes and
        performance work. Skip brand new features too, since there is nothing older for them to
        contradict.
      </li>
      <li>
        <strong>Write down the old words (5 minutes).</strong> For each change, write the words an
        article would have used before it. If Tags became Labels, the old words are "tag" and "tags". If
        export left Settings, search for "Settings" together with "export". If a feature reached a
        cheaper plan, search for the old plan name next to "only", "available on" or "upgrade".
      </li>
      <li>
        <strong>Search for the old words (8 minutes).</strong> Use the help center's own search. If it
        is weak, use Google with <code>site:help.example.com "old phrase"</code>, swapping in your help
        center's host. Open each hit and read the sentence around the match. Ask one question: would a
        user who follows this sentence today get stuck or get the wrong answer?
      </li>
      <li>
        <strong>Log it and fix it (2 minutes, plus the fixes).</strong> For each wrong sentence, note
        the article URL, the sentence as it reads now, the changelog entry and date that made it wrong,
        and the sentence that should replace it. Fix the easy ones on the spot. Send the rest to whoever
        owns those articles.
      </li>
    </ol>

    <h2 class="h3">Things that make it faster</h2>
    <ul>
      <li>
        <strong>Search for negatives.</strong> Sentences with "only", "not available", "can't",
        "requires" or "upgrade to" go stale when a limit moves.
      </li>
      <li>
        <strong>Read the tables.</strong> Plan comparison tables and lists of limits hold a lot of old
        values, and they are easy to skim past.
      </li>
      <li>
        <strong>Keep the log.</strong> After a few months it shows which parts of the product drift
        most. Those articles deserve a look after every release that touches them.
      </li>
      <li>
        <strong>Ask support.</strong> A one-line message to the support team, "which articles do you
        answer around?", often surfaces drift that search misses.
      </li>
    </ul>

    <h2 class="h3">What this check misses</h2>
    <p>
      It only finds drift from changes you announced. A change that never reached the changelog won't
      show up. Search also can't read screenshots or videos, so an old menu in an image stays until
      someone looks at it. A clean month means nothing obvious turned up. It doesn't mean every article
      is current.
    </p>
  </GuideArticle>
</template>
