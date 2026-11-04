/**
 * The sample report on /sample. Acme Notes is invented, and so is every quote here.
 * Hosts use the reserved .example TLD so nothing points at a real site.
 * The shape mirrors a real delivery (Formship-Drift templates/audit-agent.md and
 * drift_audit.py render()): article quote, dated changelog quote, why, fix, confidence.
 */
export const SAMPLE = {
  product: 'Acme Notes',
  date: 'October 30, 2026',
  helpCenter: 'help.acme-notes.example',
  changelog: 'acme-notes.example/changelog',
  window: 'August 1 to October 30, 2026 (90 days)',
  changelogEntries: 11,
  userFacingChanges: 6,
  articlesListed: 214,
  articlesRead: 48,
  findings: [
    {
      title: 'Guest sharing is no longer Team-only',
      article: 'help.acme-notes.example/articles/share-a-notebook-with-guests',
      articleTitle: 'Share a notebook with guests',
      articleQuote: 'Guest sharing is available on the Team plan only.',
      changelogDate: '2026-09-18',
      changelogQuote: 'Guest sharing is now available on the Free plan, for up to 10 guests per workspace. Team workspaces keep unlimited guests.',
      why: 'A Free user reading this article is told to upgrade for something they already have.',
      fix: 'Guest sharing is available on every plan. Free workspaces can invite up to 10 guests, and Team workspaces have no guest limit.',
      confidence: 0.95,
    },
    {
      title: 'Tags were renamed to Labels',
      article: 'help.acme-notes.example/articles/organize-notes-with-tags',
      articleTitle: 'Organize notes with tags',
      articleQuote: 'Click Add tag at the bottom of any note.',
      changelogDate: '2026-08-05',
      changelogQuote: 'Tags are now called Labels. Your existing tags carry over automatically.',
      why: 'The button this sentence names no longer exists under that name. The article title and URL use the old word too.',
      fix: 'Click Add label at the bottom of any note.',
      confidence: 0.9,
    },
    {
      title: 'Export moved out of Settings',
      article: 'help.acme-notes.example/articles/export-a-notebook',
      articleTitle: 'Export a notebook',
      articleQuote: 'Go to Settings > Data and click Export notebook.',
      changelogDate: '2026-10-14',
      changelogQuote: 'Export has moved from Settings to the File menu. Choose File > Export to download a notebook as Markdown or PDF.',
      why: 'Settings > Data no longer has an export button, so the first step fails.',
      fix: 'Open the notebook, choose File > Export, then pick Markdown or PDF.',
      confidence: 0.85,
    },
  ],
  /** Shown on /sample as a note outside the report: the kind of candidate a strict pass drops. */
  notReported: [
    {
      article: 'help.acme-notes.example/articles/attach-files',
      articleQuote: 'Attachments can be up to 25 MB on the Free plan.',
      changelogDate: '2026-09-02',
      changelogQuote: 'Team workspaces can now attach files up to 100 MB.',
      reason: 'The changelog only names the Team plan. The Free limit may still be 25 MB, so we did not call it wrong.',
    },
  ],
  notChecked: [
    'Changes that never appeared in the changelog.',
    'Changelog entries older than 90 days.',
    'Screenshots, GIFs and videos inside articles.',
    'Articles behind a login, and translated copies of articles.',
    'In-app tooltips, emails and anything outside the public help center.',
    'The 166 listed articles we did not read. We chose the 48 most likely to mention a changed feature.',
  ],
} as const
