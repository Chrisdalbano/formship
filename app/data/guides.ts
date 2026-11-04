/** Guide metadata. The body of each guide lives in its own page under app/pages/guides/. */
export interface Guide {
  slug: string
  title: string
  /** Shorter title for the <title> tag and cards. */
  short: string
  description: string
  published: string
  publishedLabel: string
}

export const GUIDES: Guide[] = [
  {
    slug: 'help-center-drift',
    title: 'How help-center drift happens, and a 20-minute monthly check you can run yourself',
    short: 'How help-center drift happens',
    description: 'Why help articles fall behind a product, where the wrong sentences usually sit, and a monthly check one person can run with a changelog and a search box.',
    published: '2026-11-04',
    publishedLabel: 'November 4, 2026',
  },
  {
    slug: 'release-notes-for-docs',
    title: 'Writing release notes your docs team can act on',
    short: 'Release notes your docs team can act on',
    description: 'Many release notes describe the new behavior and skip the old one. A docs owner needs both to find the sentences a change made wrong. A short format, with examples.',
    published: '2026-11-04',
    publishedLabel: 'November 4, 2026',
  },
  {
    slug: 'pricing-change-checklist',
    title: 'What to check in your help center after a pricing or plan change',
    short: 'Help center checklist for a pricing change',
    description: 'Plan names, prices and limits get copied into more help articles than anyone remembers. Where those copies sit and how to find each one after a change.',
    published: '2026-11-04',
    publishedLabel: 'November 4, 2026',
  },
]

export function guidePath(slug: string) {
  return `/guides/${slug}`
}
