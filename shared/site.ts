export const SITE = {
  url: 'https://formship.io',
  name: 'Formship',
  legalName: 'Formship LLC',
  location: 'Orlando, Florida',
  founder: "Christian D'Albano",
  /** The one contact address. Every mailto on the site is built from this. */
  email: 'hi@formship.io',
  ogImage: 'https://formship.io/og.png',
} as const

const body = 'Help center URL:\nChangelog URL:\n'

export const MAILTO = `mailto:${SITE.email}`

export const MAILTO_AUDIT = `${MAILTO}?subject=${encodeURIComponent('Drift audit for our help center')}&body=${encodeURIComponent(body)}`
