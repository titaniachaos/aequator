import { defineConfig, type DefaultTheme } from 'vitepress'
import {
  BASE,
  HOSTNAME,
  LEGAL,
  MAIN_SITE,
  SAME_SITE,
  WRITTEN_HOST,
  buildHead,
  localeAlternateTags
} from './seo.ts'

/**
 * Standalone VitePress project, served from titaniachaos.com/aequator/ the way
 * the clown repository is served from /clown/: its own repository and its own
 * Pages deployment, integrated into the main site by sub-path and by the
 * cross-links below.
 */

/** English, German, Bulgarian -- in the column order used throughout. */
type Column = 0 | 1 | 2

interface Page {
  slug: string
  labels: readonly [string, string, string]
}

const PAGES: Page[] = [
  { slug: '', labels: ['Home', 'Start', 'Начало'] },
  { slug: 'collaboration', labels: ['Collaboration', 'Zusammenarbeit', 'Сътрудничество'] },
  { slug: 'actions', labels: ['Actions', 'Aktionen', 'Акции'] },
  { slug: 'learning', labels: ['Learning', 'Lernen', 'Обучение'] },
  { slug: 'journal', labels: ['Journal', 'Journal', 'Дневник'] },
  { slug: 'credits', labels: ['Credits', 'Mitwirkende', 'Екип'] }
]

const link = (prefix: string, slug: string) => (slug ? `${prefix}/${slug}` : `${prefix}/`)

function nav(prefix: string, column: Column, mainSiteLabel: string): DefaultTheme.NavItem[] {
  return [
    ...PAGES.map((page) => ({ text: page.labels[column], link: link(prefix, page.slug) })),
    // Same domain, different repository: keep the reader in their own language
    // and in the same tab.
    { text: mainSiteLabel, link: MAIN_SITE(prefix), ...SAME_SITE }
  ]
}

function sidebar(prefix: string, heading: string, column: Column): DefaultTheme.Sidebar {
  return [
    {
      text: heading,
      items: PAGES.map((page) => ({ text: page.labels[column], link: link(prefix, page.slug) }))
    }
  ]
}

export default defineConfig({
  base: BASE,
  title: 'Äquatormaßband × Titania Chaos',
  titleTemplate: ':title | Äquatormaßband',
  description:
    'Participatory textile art and peace project by Bianca Trappl, accompanied since 2025 by Titania Chaos.',

  // GitHub Pages serves extensionless routes, which is what the clown site on
  // the same host already relies on.
  cleanUrls: true,

  // Stated rather than left to the default, so nobody reaches for it to make a
  // red build green: an unresolved internal link fails the build.
  ignoreDeadLinks: false,

  markdown: {
    // The main site shares this host, so a link to it is a same-site
    // navigation: no new tab, no external-link arrow. Markdown is written with
    // the host the site has today, so on an origin move SITE_ORIGIN carries
    // these links with it.
    config: (md) => {
      const renderLink =
        md.renderer.rules.link_open ??
        ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const written = tokens[idx].attrGet('href') ?? ''
        const href = written.startsWith(WRITTEN_HOST)
          ? written.replace(WRITTEN_HOST, HOSTNAME)
          : written
        if (href !== written) tokens[idx].attrSet('href', href)
        if (!href.startsWith(HOSTNAME)) return renderLink(tokens, idx, options, env, self)

        tokens[idx].attrJoin('class', 'no-icon')
        return renderLink(tokens, idx, options, env, self)
          .replace(' target="_blank"', '')
          .replace(' rel="noreferrer"', '')
      }
    }
  },

  // Canonical, hreflang alternates, Open Graph and the schema.org graph. Three
  // locales without alternates read to a crawler as three competing pages
  // rather than one page in three languages.
  transformHead: (ctx) => buildHead(ctx, ctx.siteConfig),

  transformHtml: (code, _id, ctx) => {
    const tags = localeAlternateTags(ctx.page)
    return tags ? code.replace('</head>', `${tags}</head>`) : code
  },

  sitemap: {
    hostname: `${HOSTNAME}${BASE}`
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: nav('', 0, 'Titania Chaos'),
        sidebar: sidebar('', 'Äquatormaßband', 0),
        outline: { level: [2, 3], label: 'On this page' },
        docFooter: { prev: 'Previous page', next: 'Next page' },
        footer: {
          message: `Part of <a href="${MAIN_SITE('')}">Titania Chaos</a>. · <a href="${LEGAL('')}">Legal notice &amp; privacy</a>`,
          copyright: '© 2026 Bianca Trappl · Titania Chaos'
        },
        notFound: {
          title: 'PAGE NOT FOUND',
          quote: 'The measuring tape does not reach this far yet.',
          linkLabel: 'go to home',
          linkText: 'Take me home'
        }
      }
    },

    de: {
      label: 'Deutsch',
      lang: 'de-AT',
      titleTemplate: ':title | Äquatormaßband',
      description:
        'Partizipatives Textilkunst- und Friedensprojekt von Bianca Trappl, seit 2025 begleitet von Titania Chaos.',
      themeConfig: {
        nav: nav('/de', 1, 'Titania Chaos'),
        sidebar: sidebar('/de', 'Äquatormaßband', 1),
        outline: { level: [2, 3], label: 'Auf dieser Seite' },
        docFooter: { prev: 'Vorherige Seite', next: 'Nächste Seite' },
        footer: {
          message: `Teil von <a href="${MAIN_SITE('/de')}">Titania Chaos</a>. · <a href="${LEGAL('/de')}">Impressum &amp; Datenschutz</a>`,
          copyright: '© 2026 Bianca Trappl · Titania Chaos'
        },
        darkModeSwitchLabel: 'Darstellung',
        lightModeSwitchTitle: 'Zum hellen Design wechseln',
        darkModeSwitchTitle: 'Zum dunklen Design wechseln',
        sidebarMenuLabel: 'Menü',
        returnToTopLabel: 'Nach oben',
        langMenuLabel: 'Sprache wechseln',
        skipToContentLabel: 'Zum Inhalt springen',
        notFound: {
          title: 'SEITE NICHT GEFUNDEN',
          quote: 'So weit reicht das Maßband noch nicht.',
          linkLabel: 'zur Startseite',
          linkText: 'Zur Startseite'
        }
      }
    },

    bg: {
      label: 'Български',
      lang: 'bg',
      title: 'Екваторна ролетка × Titania Chaos',
      titleTemplate: ':title | Äquatormaßband',
      description:
        'Партиципативен проект за текстилно изкуство и мир на Бианка Трапл, съпровождан от 2025 г. от Titania Chaos.',
      themeConfig: {
        nav: nav('/bg', 2, 'Титания Хаос'),
        sidebar: sidebar('/bg', 'Äquatormaßband', 2),
        outline: { level: [2, 3], label: 'На тази страница' },
        docFooter: { prev: 'Предишна страница', next: 'Следваща страница' },
        footer: {
          message: `Част от <a href="${MAIN_SITE('/bg')}">Титания Хаос</a>. · <a href="${LEGAL('/bg')}">Правна информация и поверителност</a>`,
          copyright: '© 2026 Бианка Трапл · Титания Хаос'
        },
        darkModeSwitchLabel: 'Изглед',
        lightModeSwitchTitle: 'Към светлата тема',
        darkModeSwitchTitle: 'Към тъмната тема',
        sidebarMenuLabel: 'Меню',
        returnToTopLabel: 'Към началото',
        langMenuLabel: 'Смяна на езика',
        skipToContentLabel: 'Към съдържанието',
        notFound: {
          title: 'СТРАНИЦАТА НЕ Е НАМЕРЕНА',
          quote: 'Ролетката още не стига дотук.',
          linkLabel: 'към началната страница',
          linkText: 'Към началото'
        }
      }
    }
  }
})
