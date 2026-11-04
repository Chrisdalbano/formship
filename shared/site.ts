export const SITE = {
  url: 'https://formship.io',
  name: 'Formship',
  legalName: 'Formship LLC',
  location: 'Orlando, Florida',
  founder: "Christian D'Albano",
  /** The one contact address. Every mailto on the site is built from this. */
  email: 'hi@formship.io',
  ogImage: 'https://formship.io/og.png',
  logo: 'https://formship.io/brand/formship-horizontal-blue.svg',
} as const

/**
 * The inbound request. There is no backend and no form service, so a request is an email.
 * The body asks for the two links an audit needs; everything else is optional.
 */
const body = [
  'Company:',
  'Help center URL:',
  'Changelog or release notes URL:',
  'Anything to focus on or skip (optional):',
  '',
].join('\n')

export const MAILTO = `mailto:${SITE.email}`

export const MAILTO_AUDIT = `${MAILTO}?subject=${encodeURIComponent('Drift audit for our help center')}&body=${encodeURIComponent(body)}`
