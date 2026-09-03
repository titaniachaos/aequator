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
    ├── seo.ts           BASE and HOSTNAME, canonical, hreflang, OG and the
    │                    schema.org graph; an origin move is SITE_ORIGIN=…
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

## Media

Frames are borrowed from the main site, not copied. `titaniachaos.com` publishes the
archive and the rights record at [`/media.json`](https://titaniachaos.com/media.json),
and `docs/data/media.json` holds the index of what this project shows — the origin URLs,
the trilingual alt text and caption, and the consent status. Nothing lives in
`docs/public`.

That is the clown repository's arrangement, and the reason for it is withdrawal: a frame
taken down on the main site is taken down here in the same act, and there is one place to
honour that request rather than two.

To add a frame, publish it on the main site first, then copy its record into
`docs/data/media.json` with `consentStatus: 'approved'`. The validator requires a creator
or a copyright holder, and alt text or a caption, before it will let one through.

## Open questions

Recorded in the `tbd` arrays of the data files and on the pages themselves:

- The exact day is not verified for three actions: Platz der Menschenrechte (September 2025),
  Vienna (November 2025) and the "Sucht & Menschsein" festival (March 2026).
- Four of the five recorded actions still have no media of their own. Türkenschanzpark is described
  as filmed, but no rights-cleared footage of it is published on the main site.
- `action-2025-11-wien` has no recorded venue within Vienna. Its title and summary restate
  the published caption and alt text of `banana-encore` and claim nothing beyond them.
- Photographers are credited as one notice for the whole archive, not per frame, so there is
  no per-image attribution.
- No public verified source URLs exist yet for the project or any action.
- The project's own start year and its current measured length are not recorded.
- Learning and Journal are routed and translated but have no verified content.
