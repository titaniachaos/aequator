#!/usr/bin/env node
// Build-time validation of the project data files, plus the privacy scan that
// keeps internal material out of the public build. Run by `npm run validate:data`
// and by CI before the site is built.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DOCS = join(ROOT, 'docs')
const DATA = join(DOCS, 'data')

const problems = []
const fail = (where, message) => problems.push(`${where}: ${message}`)

/* -- schemas ------------------------------------------------------------- */

const LANGUAGES = ['en', 'de', 'bg']
const localizedText = z.object({
  en: z.string().min(1).optional(),
  de: z.string().min(1).optional(),
  bg: z.string().min(1).optional()
}).strict()

const status = z.enum(['published', 'draft', 'rights-pending', 'planned', 'TBD'])

/** `2026`, `2026-03` and `2026-03-04` all occur; nothing else does. */
const dateString = z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'expected YYYY, YYYY-MM or YYYY-MM-DD')

const publicUrl = z.string().url().refine((u) => u.startsWith('https://'), 'must be https')

const action = z.object({
  stableId: z.string().regex(/^action-[a-z0-9-]+$/),
  title: localizedText,
  date: dateString,
  place: localizedText,
  venueOrContext: localizedText.optional(),
  status,
  summary: localizedText,
  whatHappened: localizedText.optional(),
  artisticRelevance: localizedText.optional(),
  biancaRole: localizedText.optional(),
  titaniaRole: localizedText.optional(),
  participants: z.array(z.string()).optional(),
  mediaIds: z.array(z.string()).optional(),
  sourceLinks: z.array(publicUrl).optional(),
  credits: localizedText.optional(),
  publicationStatus: status
})

const mediaItem = z.object({
  stableId: z.string().min(1),
  type: z.enum(['image', 'youtube', 'video_file', 'audio']),
  sourceUrl: publicUrl.optional(),
  originalFile: z.string().optional(),
  title: localizedText,
  date: dateString.optional(),
  place: localizedText.optional(),
  eventId: z.string().optional(),
  description: localizedText.optional(),
  creator: z.string().optional(),
  copyrightHolder: z.string().optional(),
  consentStatus: z.enum(['approved', 'pending', 'internal-only']),
  caption: localizedText.optional(),
  altText: localizedText.optional(),
  aspectRatio: z.string().optional(),
  posterUrl: z.string().optional()
})

const projectMetadata = z.object({
  title: localizedText,
  shortTitle: z.string().min(1),
  oneSentence: localizedText,
  creator: z.string().min(1),
  collaborator: z.string().optional(),
  startYear: z.number().int().optional(),
  collaborationStartYear: z.number().int().optional(),
  targetMeasureKm: z.number().positive().optional(),
  // null is the recorded absence of a verified measurement, not a zero.
  currentMeasureMeters: z.number().nonnegative().nullable().optional(),
  officialLinks: z.array(z.object({ label: localizedText, url: publicUrl })).optional()
})

const sourceLink = z.object({
  id: z.string().min(1),
  label: localizedText,
  url: publicUrl,
  verified: z.literal(true)
})

const envelope = (key, item) =>
  z.object({
    $schemaNote: z.string().optional(),
    translationReview: z.record(z.enum(LANGUAGES), z.enum(['verified', 'draft'])).optional(),
    tbd: z.array(z.string()).optional(),
    [key]: item
  })

const FILES = [
  ['project.json', envelope('project', projectMetadata)],
  ['actions.json', envelope('actions', z.array(action))],
  ['media.json', envelope('media', z.array(mediaItem))],
  ['sources.json', envelope('sources', z.array(sourceLink))]
]

const parsed = {}
for (const [name, schema] of FILES) {
  let raw
  try {
    raw = JSON.parse(readFileSync(join(DATA, name), 'utf8'))
  } catch (error) {
    fail(`data/${name}`, `unreadable or not JSON -- ${error.message}`)
    continue
  }
  const result = schema.safeParse(raw)
  if (!result.success) {
    for (const issue of result.error.issues) {
      fail(`data/${name}`, `${issue.path.join('.') || '(root)'} -- ${issue.message}`)
    }
    continue
  }
  parsed[name] = result.data
}

/* -- cross-file and source-authority rules -------------------------------- */

const actions = parsed['actions.json']?.actions ?? []
const media = parsed['media.json']?.media ?? []

const seen = new Set()
for (const item of actions) {
  if (seen.has(item.stableId)) fail('data/actions.json', `duplicate stableId ${item.stableId}`)
  seen.add(item.stableId)
  // The German source text is the authority, so it must be present even when a
  // translation is not.
  if (!item.summary.de) fail('data/actions.json', `${item.stableId} has no German summary`)
}

const mediaIds = new Set(media.map((m) => m.stableId))
for (const item of actions) {
  for (const id of item.mediaIds ?? []) {
    if (!mediaIds.has(id)) fail('data/actions.json', `${item.stableId} references unknown media ${id}`)
  }
}

// Blueprint section 5: these two dates are verified and must not drift.
const VERIFIED_DATES = {
  'action-2025-10-tuerkenschanzpark': '2025-10-30',
  'action-2026-03-maerzpark': '2026-03-04'
}
for (const [id, date] of Object.entries(VERIFIED_DATES)) {
  const found = actions.find((a) => a.stableId === id)
  if (!found) fail('data/actions.json', `missing verified action ${id}`)
  else if (found.date !== date) fail('data/actions.json', `${id} date is ${found.date}, verified is ${date}`)
}

for (const item of media) {
  if (item.consentStatus !== 'approved') continue
  if (!item.creator && !item.copyrightHolder) {
    fail('data/media.json', `${item.stableId} is approved but records no creator or copyright holder`)
  }
  if (!item.altText && !item.caption) {
    fail('data/media.json', `${item.stableId} is approved but has neither altText nor caption`)
  }
}

/* -- privacy scan --------------------------------------------------------- */

// Everything under docs/ is shipped. Internal source registries, Drive links,
// private document ids and contact details must not be among it.
const FORBIDDEN = [
  [/drive\.google\.com/i, 'internal Google Drive URL'],
  [/docs\.google\.com/i, 'internal Google Docs URL'],
  [/\/(document|spreadsheets|presentation|file)\/d\/[A-Za-z0-9_-]{20,}/, 'private Google document id'],
  [/mailto:/i, 'contact e-mail address'],
  [/\+43[\s\d/-]{7,}/, 'telephone number'],
  [/\b(INTERNAL|DO NOT PUBLISH|NICHT VERÖFFENTLICHEN)\b/, 'internal note']
]

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === 'cache') continue
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) yield* walk(path)
    else yield path
  }
}

const TEXT = /\.(md|json|ts|mts|vue|css|html)$/
for (const path of walk(DOCS)) {
  if (!TEXT.test(path)) continue
  const source = readFileSync(path, 'utf8')
  for (const [pattern, what] of FORBIDDEN) {
    if (pattern.test(source)) fail(relative(ROOT, path), `contains ${what}`)
  }
}

/* -- report --------------------------------------------------------------- */

if (problems.length) {
  console.error('Data validation failed:\n')
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

const published = actions.filter((a) => a.publicationStatus === 'published').length
const approved = media.filter((m) => m.consentStatus === 'approved').length
console.log(
  `Data valid: ${actions.length} actions (${published} published), ` +
    `${media.length} media (${approved} approved), ` +
    `${parsed['sources.json']?.sources.length ?? 0} public sources.`
)
