# Äquatormaßband × Titania Chaos

The `/aequator/` section of titaniachaos.com: a standalone VitePress project with its
own repository and its own GitHub Pages deployment, integrated into the main site by
sub-path and by cross-links — the same arrangement as
[`titaniachaos/clown`](https://github.com/titaniachaos/clown), which serves `/clown/`.

The Äquatormaßband is a participatory textile art and peace project created by Bianca
Trappl, accompanied since 2025 by Titania Chaos as ambassador and performative
collaboration partner.

## Commands

```bash
npm install
npm run docs:dev        # local development server
npm run check           # validate:data + typecheck + build, what CI runs
npm run validate:data   # schema validation and the privacy scan
npm run typecheck       # vue-tsc --noEmit
npm run docs:build      # production build into docs/.vitepress/dist
npm run docs:preview    # serve the built site
```

## Layout

```
docs/
├── index.md, collaboration.md, actions.md,     English — canonical root locale
│   learning.md, journal.md, credits.md
├── de/                                          German — the authentic source language
├── bg/                                          Bulgarian
├── data/          project.json, actions.json, media.json, sources.json
├── types/         the TypeScript interfaces the data is validated against
├── public/        approved static assets only
└── .vitepress/
    ├── config.ts        base '/aequator/', three locales, cleanUrls
    ├── seo.ts           BASE and HOSTNAME; an origin move is SITE_ORIGIN=…
    ├── *.data.ts        build-time loaders — see "What the build refuses to publish"
    └── theme/           custom.css and the four components
```

## Source authority

German is the authentic primary source for the project description and the action
summaries. English and Bulgarian are machine-generated drafts and say so on the page
(`DraftTranslation`) until they have been reviewed.

Nothing on these pages is inferred, embellished or freely translated. Where verified
material does not exist, the page says **TBD** rather than filling the gap.

## What the build refuses to publish

Three rules are enforced by code rather than by care:

- **Unpublished actions never reach the build.** `actions.data.ts` is a VitePress data
  loader, so it runs at build time and only its return value is serialised. It emits
  `publicationStatus: 'published'` only — a draft action is absent from the HTML, the
  client bundle and the search index, not hidden by CSS.
- **Media without consent never reaches the build.** `media.data.ts` emits
  `consentStatus: 'approved'` only. `pending` and `internal-only` entries stay in
  `docs/data/media.json` and go nowhere else.
- **Internal material cannot be committed into a public file.** `npm run validate:data`
  scans everything under `docs/` for Google Drive and Docs URLs, private document ids,
  e-mail addresses, telephone numbers and internal markers, and fails the build.
  `docs/data/sources.json` holds public, verified, `https://` links only.

The validator also pins the two verified dates (Türkenschanzpark 2025-10-30, Märzpark
2026-03-04).

## Open questions

Recorded in the `tbd` arrays of the data files and on the pages themselves:

- The exact day is not verified for two actions: Platz der Menschenrechte (September 2025)
  and the "Sucht & Menschsein" festival (March 2026). Both are month-precision.
- No media, creators, copyright holders or consent records have been supplied — so the
  journal and credits pages have nothing to show.
- No public verified source URLs exist yet for the project or any action.
- The project's own start year and its current measured length are not recorded.
- Learning and Journal are routed and translated but have no verified content.
