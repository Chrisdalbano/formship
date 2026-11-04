import { SITE } from '~~/shared/site'

interface PageSeo {
  title: string
  description: string
  path: string
}

export function usePageSeo({ title, description, path }: PageSeo) {
  const url = path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogType: 'website',
    ogSiteName: SITE.name,
    ogImage: SITE.ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Formship. Help-center drift audits, $149 flat, report in 48 hours.',
    twitterCard: 'summary_large_image',
  })

  useHead({ link: [{ rel: 'canonical', href: url }] })
}
