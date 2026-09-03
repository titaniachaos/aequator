import type { HeadConfig, SiteConfig, TransformContext } from 'vitepress'

/**
 * Every canonical URL, hreflang, sitemap entry and schema.org @id is built from
 * this, the same way the clown repository does it. It is the one thing a move
 * to another origin has to change, so it reads from the environment with
 * today's value as the default: a migration is
 * `SITE_ORIGIN=https://example.at npm run docs:build`, not a search and replace.
 */
export const WRITTEN_HOST = 'https://titaniachaos.com'

export const HOSTNAME = (process.env.SITE_ORIGIN ?? WRITTEN_HOST).replace(/\/$/, '')

/** Project Pages are served from a sub-path, so every absolute URL carries it. */
export const BASE = '/aequator/'

export interface LocaleMeta {
  prefix: string
  hreflang: string
  ogLocale: string
}

export const LOCALES: LocaleMeta[] = [
  { prefix: '', hreflang: 'en', ogLocale: 'en_GB' },
  { prefix: '/de', hreflang: 'de-AT', ogLocale: 'de_AT' },
  { prefix: '/bg', hreflang: 'bg', ogLocale: 'bg_BG' }
]

/** The main Titania Chaos site, of which this project is a part. */
export const MAIN_SITE = (prefix: string) => `${HOSTNAME}${prefix}/`

/** The legal notice belongs to the main site, one per locale. */
export const LEGAL = (prefix: string) => `${HOSTNAME}${prefix}/legal-data`

/**
 * The main site shares this host, so a link to it is a same-site navigation:
 * no new tab, no external-link icon.
 */
export const SAME_SITE = { target: '_self', rel: '', noIcon: true } as const

const SITE_NAME = 'Äquatormaßband × Titania Chaos'
const SITE_DESCRIPTION =
  'Participatory textile art and peace project by Bianca Trappl, accompanied since 2025 by Titania Chaos.'

/**
 * The poster frame of banana-encore, the one image this project has cleared for
 * publication, hosted by the main site like every other frame. It is 520x293 --
 * under the 1200x630 a social card would like, but stating its real size is
 * worth more than claiming one it does not have. Replace both the URL and the
 * numbers together if a wider crop is ever published.
 */
const OG_IMAGE = `${HOSTNAME}/images/media/banana-encore.webp`
const OG_IMAGE_SIZE = {
  w: 520,
  h: 293,
  alt: 'Titania Chaos in a long coat outdoors, holding a banana handed up from the audience'
}

/** `index.md` -> `/`, `de/actions.md` -> `/de/actions` (cleanUrls is on). */
export function toUrlPath(page: string): string {
  const p = page.replace(/\.md$/, '')
  if (p === 'index') return '/'
  if (p.endsWith('/index')) return `/${p.slice(0, -'/index'.length)}/`
  return `/${p}`
}

export function splitLocale(urlPath: string): { locale: LocaleMeta; slug: string } {
  for (const locale of LOCALES) {
    if (!locale.prefix) continue
    if (urlPath === `${locale.prefix}/`) return { locale, slug: '/' }
    if (urlPath.startsWith(`${locale.prefix}/`)) {
      return { locale, slug: urlPath.slice(locale.prefix.length) }
    }
  }
  return { locale: LOCALES[0]!, slug: urlPath }
}

/** Absolute URL for a locale-relative path, including the `/aequator/` base. */
function absolute(urlPath: string): string {
  return `${HOSTNAME}${BASE}${urlPath.replace(/^\//, '')}`
}

/**
 * An alternate is only claimed for a translation that exists. Pointing at a
 * page that was never written is worse than saying nothing.
 */
function existingAlternates(slug: string, pages: string[]) {
  const sources = new Set(pages)
  return LOCALES.flatMap((locale) => {
    const urlPath = slug === '/' ? `${locale.prefix}/` : `${locale.prefix}${slug}`
    const source =
      urlPath === '/' ? 'index.md' : `${urlPath.replace(/^\//, '').replace(/\/$/, '/index')}.md`
    return sources.has(source) ? [{ locale, url: absolute(urlPath) }] : []
  })
}

// Titania Chaos is one person across both sites, so the id is the main site's.
const TITANIA_ID = `${HOSTNAME}/#titania`
// Bianca Trappl has no page of her own that this repository can point at, so
// the entity is declared here, with a name and nothing asserted beyond it.
const BIANCA_ID = `${HOSTNAME}${BASE}#bianca`
const PROJECT_ID = `${HOSTNAME}${BASE}#project`
const WEBSITE_ID = `${HOSTNAME}${BASE}#website`

export function buildHead(ctx: TransformContext, siteConfig: SiteConfig): HeadConfig[] {
  const urlPath = toUrlPath(ctx.page)

  if (ctx.page === '404.md') {
    return [['meta', { name: 'robots', content: 'noindex, follow' }]]
  }

  const { locale, slug } = splitLocale(urlPath)
  const canonical = absolute(urlPath)
  const alternates = existingAlternates(slug, siteConfig.pages)
  const title = ctx.pageData.title || ctx.title
  const description = ctx.description || ctx.siteData.description

  const head: HeadConfig[] = [
    ['link', { rel: 'canonical', href: canonical }],

    ['meta', { property: 'og:type', content: slug === '/' ? 'website' : 'article' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: canonical }],
    ['meta', { property: 'og:locale', content: locale.ogLocale }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: String(OG_IMAGE_SIZE.w) }],
    ['meta', { property: 'og:image:height', content: String(OG_IMAGE_SIZE.h) }],
    ['meta', { property: 'og:image:alt', content: OG_IMAGE_SIZE.alt }],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],
    ['meta', { name: 'twitter:image:alt', content: OG_IMAGE_SIZE.alt }]
  ]

  for (const alt of alternates) {
    head.push(['link', { rel: 'alternate', hreflang: alt.locale.hreflang, href: alt.url }])
  }
  const fallback = alternates.find((a) => a.locale.prefix === '')
  if (fallback) {
    head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: fallback.url }])
  }

  head.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': BIANCA_ID,
          name: 'Bianca Trappl'
        },
        {
          '@type': 'Person',
          '@id': TITANIA_ID,
          name: 'Tatiana Petkova',
          alternateName: 'Titania Chaos',
          url: `${HOSTNAME}/`,
          sameAs: [
            'https://www.instagram.com/titaniachaos',
            'https://www.facebook.com/titaniachaos'
          ]
        },
        {
          // A growing archive rather than a finished work, and the German source
          // calls it textile art and a peace project in the same breath.
          '@type': 'CreativeWork',
          '@id': PROJECT_ID,
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          genre: ['Textile art', 'Participatory art'],
          creator: { '@id': BIANCA_ID },
          contributor: { '@id': TITANIA_ID },
          inLanguage: LOCALES.map((l) => l.hreflang),
          creativeWorkStatus: 'Ongoing'
        },
        {
          '@type': 'WebSite',
          '@id': WEBSITE_ID,
          url: `${HOSTNAME}${BASE}`,
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          inLanguage: LOCALES.map((l) => l.hreflang),
          publisher: { '@id': TITANIA_ID }
        },
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: title,
          description,
          inLanguage: locale.hreflang,
          isPartOf: { '@id': WEBSITE_ID },
          about: { '@id': PROJECT_ID }
        }
      ]
    })
  ])

  return head
}

/**
 * og:locale:alternate has to repeat the same property name, which the head
 * config cannot express -- it is a map. So these are appended to the built HTML
 * instead.
 */
export function localeAlternateTags(page: string): string {
  if (page === '404.md') return ''
  const { locale } = splitLocale(toUrlPath(page))
  return LOCALES.filter((l) => l.ogLocale !== locale.ogLocale)
    .map((l) => `<meta property="og:locale:alternate" content="${l.ogLocale}">`)
    .join('')
}
