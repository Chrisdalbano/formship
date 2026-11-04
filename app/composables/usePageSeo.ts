import { SITE } from '~~/shared/site'

interface PageSeo {
  title: string
  description: string
  /** Path as served, e.g. '/sample' or '/guides/'. Becomes the canonical and og:url. */
  path: string
  /** Set for guides: switches og:type to article and adds the article dates. ISO dates. */
  article?: { published: string, modified?: string }
}

export function pageUrl(path: string) {
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`
}

export function usePageSeo({ title, description, path, article }: PageSeo) {
  const url = pageUrl(path)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogType: article ? 'article' : 'website',
    ogSiteName: SITE.name,
    ogImage: SITE.ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Formship. Help-center drift audits, $149 flat, report in 48 hours.',
    twitterCard: 'summary_large_image',
    ...(article
      ? {
          articlePublishedTime: article.published,
          articleModifiedTime: article.modified ?? article.published,
        }
      : {}),
  })

  useHead({ link: [{ rel: 'canonical', href: url }] })
}
