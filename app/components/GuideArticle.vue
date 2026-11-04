<script setup lang="ts">
import { GUIDES, guidePath } from '~/data/guides'
import { MAILTO_AUDIT, SITE } from '~~/shared/site'

const props = defineProps<{ slug: string }>()

const guide = GUIDES.find(g => g.slug === props.slug)
if (!guide) throw createError({ statusCode: 404, statusMessage: `Unknown guide: ${props.slug}` })

const path = guidePath(guide.slug)
const url = pageUrl(path)
const others = GUIDES.filter(g => g.slug !== guide.slug)

usePageSeo({
  title: `${guide.short} | Formship`,
  description: guide.description,
  path,
  article: { published: guide.published },
})

const publisher = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.legalName,
  url: `${SITE.url}/`,
  logo: { '@type': 'ImageObject', url: SITE.logo },
}

const article = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: guide.title,
  description: guide.description,
  url,
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  image: SITE.ogImage,
  datePublished: guide.published,
  dateModified: guide.published,
  inLanguage: 'en',
  author: publisher,
  publisher,
}

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Guides', item: pageUrl('/guides/') },
    { '@type': 'ListItem', position: 2, name: guide.short, item: url },
  ],
}

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(article) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbs) },
  ],
})
</script>

<template>
  <article class="container guide">
    <header class="guide__head">
      <p class="label"><NuxtLink to="/guides/" class="guide__crumb">Guides</NuxtLink></p>
      <h1 class="h1 h1--page guide__title">{{ guide!.title }}</h1>
      <p class="lede guide__deck">{{ guide!.description }}</p>
      <p class="guide__byline">Formship. <time :datetime="guide!.published">{{ guide!.publishedLabel }}</time>.</p>
    </header>

    <div class="prose guide__body">
      <slot />
    </div>

    <aside class="guide__end prose" aria-label="About Formship">
      <p>
        If you would rather hand this check to someone else, Formship runs it as a one-off audit:
        $149, and you pay after reading the report.
        <NuxtLink to="/sample">See a sample report</NuxtLink> or
        <a :href="MAILTO_AUDIT">request one</a>.
      </p>
    </aside>

    <nav class="guide__more" aria-labelledby="more-guides">
      <h2 id="more-guides" class="label">More guides</h2>
      <ul>
        <li v-for="g in others" :key="g.slug">
          <NuxtLink :to="guidePath(g.slug)" class="guide__link">{{ g.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </article>
</template>

<style scoped>
.guide { padding-block: clamp(2.5rem, 6vw, 5rem) var(--section); }

.guide__head { display: grid; gap: 1.25rem; max-width: 56rem; margin-bottom: clamp(2.5rem, 5vw, 4rem); }
.guide__title { max-width: 22ch; }
.guide__deck { max-width: 40rem; }
.guide__crumb { color: var(--accent); text-decoration: none; }
.guide__crumb:hover { text-decoration: underline; }
.guide__byline { font: 400 0.8125rem/1.5 var(--mono); color: var(--mute); }

.guide__body :deep(strong) { font-weight: 600; }
.guide__body :deep(ol) { counter-reset: step; }
.guide__body :deep(ol > li) { position: relative; padding-left: 2rem; counter-increment: step; }
.guide__body :deep(ol > li + li) { margin-top: 0.9em; }
.guide__body :deep(ol > li)::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0.3em;
  font: 500 0.875rem/1 var(--mono);
  color: var(--accent);
}
.guide__body :deep(code) { font: 400 0.875em/1.5 var(--mono); }
.guide__body :deep(pre) {
  padding: 1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 4px;
  font: 400 0.875rem/1.6 var(--mono);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.guide__body :deep(.pair) { display: grid; gap: 0.5rem; }
.guide__body :deep(.pair p) { padding-left: 0.75rem; }
.guide__body :deep(.pair .was) { border-left: 2px solid var(--old); }
.guide__body :deep(.pair .now) { border-left: 2px solid var(--new); }

.guide__end {
  margin-top: clamp(2.5rem, 5vw, 4rem);
  padding-top: 1.5rem;
  border-top: 1px solid var(--line-strong);
}

.guide__more { display: grid; gap: 0.75rem; max-width: 40rem; margin-top: clamp(2.5rem, 5vw, 4rem); }
.guide__more ul { display: grid; }
.guide__more li { padding-block: 0.75rem; border-top: 1px solid var(--line); }
.guide__more li:last-child { border-bottom: 1px solid var(--line); }
.guide__link { text-decoration: none; font-weight: 550; letter-spacing: -0.008em; }
</style>
