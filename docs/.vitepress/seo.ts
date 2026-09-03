/**
 * Every canonical URL and cross-site link is built from this, the same way the
 * clown repository does it: a move to another origin is
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
