<template>
  <GuideArticle slug="release-notes-for-docs">
    <p>
      A changelog entry has two readers. Customers want to know what is new. Whoever maintains the
      help center needs to know what is no longer true. Many entries are written only for the first
      reader, and the second one has to guess.
    </p>
    <p>
      A few extra lines fix most of that. They can go in the public entry, or in an internal note
      that ships with it.
    </p>

    <h2 class="h3">What a docs owner needs from an entry</h2>
    <ul>
      <li>
        <strong>The old behavior, in the old words.</strong> A docs writer finds stale articles by
        searching for what the product used to say. "Tags are now called Labels" gives them a search
        term. "We've improved how you organize notes" gives them nothing to search for.
      </li>
      <li>
        <strong>The new names, exactly as the product shows them.</strong> Copy the button label, menu
        path or plan name with its capitalization. "File > Export" is better than "the export menu".
      </li>
      <li>
        <strong>Who it applies to.</strong> Name the plans, platforms and roles. "Now on every plan"
        and "now on Pro and above" send a docs writer to different articles.
      </li>
      <li>
        <strong>What was removed.</strong> A removed feature leaves instructions behind that can't be
        followed. Say plainly what is gone and what replaces it, if anything.
      </li>
      <li>
        <strong>When it reached users.</strong> If a change rolls out over several weeks, say when it
        reached everyone. Docs that change too early are wrong for the users who don't have it yet.
      </li>
    </ul>

    <h2 class="h3">A format you can copy</h2>
    <p>
      Here is one entry for a made-up note-taking app. The first line is what customers see. The rest
      is what the docs owner needs.
    </p>
    <pre>Tags are now called Labels
Date: 2026-08-05, all workspaces
Before: Notes were organized with tags, added with "Add tag" at the bottom of a note.
Now: The same feature is called Labels. The button reads "Add label". Existing tags became labels automatically.
Who: All plans, web and desktop. Mobile apps follow on 2026-08-12.
Removed: Nothing.
Docs to check: Organize notes with tags; Search by tag; Keyboard shortcuts.</pre>
    <p>
      The "Docs to check" line is the cheapest part to add and often the most useful. Whoever shipped
      the change usually knows a few pages that mention the feature. A partial list still saves the
      docs owner a search.
    </p>

    <h2 class="h3">Before and after</h2>
    <p>The same change, written two ways.</p>
    <div class="pair">
      <p class="was">Sharing just got easier. Invite guests to any notebook!</p>
      <p class="now">
        Guest sharing is now on the Free plan, for up to 10 guests per workspace. Before this, guests
        required the Team plan.
      </p>
    </div>
    <p>
      The first version is fine for customers. The second one tells a docs writer what to search for:
      "Team plan" near "guest". That search finds the article still telling Free users to upgrade.
    </p>

    <h2 class="h3">Renames need the most care</h2>
    <p>
      A rename touches every article that uses the old word, including titles, URLs and screenshots.
      Put both names in the entry, in that order: "Tags are now called Labels". Keep the old name
      somewhere in the renamed article for a while too, such as "Labels (previously called tags)". People
      still search for the word they know.
    </p>

    <h2 class="h3">Make it a release step</h2>
    <p>
      Put one item on the release checklist: search the help center for the old name or behavior,
      then fix or flag what turns up. Give it to a named person with a date. It takes a few minutes
      on the day a change ships. Finding the same sentence months later, through a support ticket,
      takes longer.
    </p>
  </GuideArticle>
</template>
