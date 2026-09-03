#!/usr/bin/env node
/**
 * A quantity stated in prose and also derivable from the data is two copies of
 * one fact, and two copies drift. This asks the arbiter -- docs/data/*.json --
 * and then checks that every page saying the number out loud still says the
 * number the data holds.
 *
 * The rule that matters: nothing below declares an answer. Counts are computed;
 * the only thing written here is how to say a number in three languages, and
 * where each claim lives.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DOCS = join(ROOT, 'docs')
const read = (f) => readFileSync(join(ROOT, f), 'utf8')
const json = (f) => JSON.parse(read(f))

const problems = []
const fail = (where, message) => problems.push(`${where}: ${message}`)

/* -- the arbiter ---------------------------------------------------------- */

const actionsFile = json('docs/data/actions.json')
const mediaFile = json('docs/data/media.json')

const published = actionsFile.actions.filter((a) => a.publicationStatus === 'published')
/** A date of `YYYY-MM` was verified to the month; `YYYY-MM-DD` to the day. */
const monthOnly = published.filter((a) => a.date.length === 7).map((a) => a.stableId)
const approved = mediaFile.media.filter((m) => m.consentStatus === 'approved')
const eventsWithMedia = new Set(approved.map((m) => m.eventId).filter(Boolean))
const withoutMedia = published.filter((a) => !eventsWithMedia.has(a.stableId))

/** Numerals, not answers: how to say a count, not what the count is. */
const WORDS = {
  en: { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 7: 'Seven', 12: 'Twelve' },
  de: { 1: 'ein', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 7: 'sieben', 12: 'zwölf' },
  bg: { 1: 'един', 2: 'две', 3: 'три', 4: 'четири', 5: 'пет', 7: 'седем', 12: 'дванадесет' }
}
const word = (lang, n) => WORDS[lang]?.[n]

/* -- claims --------------------------------------------------------------- */

/**
 * Each entry says where a count is stated and how the sentence is built from it.
 * The count itself always arrives as an argument.
 */
const CLAIMS = [
  // "Three actions are verified to the month only"
  ['docs/actions.md', 'en', () => monthOnly.length, (w) => `${w} actions are verified to the month only`],
  ['docs/de/actions.md', 'de', () => monthOnly.length, (w) => `Bei ${w} Aktionen ist nur der Monat geprüft`],
  ['docs/bg/actions.md', 'bg', () => monthOnly.length, (w) => `При ${w} акции е проверен само месецът`],
  // "One cleared entry is recorded"
  ['docs/credits.md', 'en', () => approved.length, (w) => `${w} cleared entries are recorded`],
  ['docs/de/credits.md', 'de', () => approved.length, (w) => `${w} freigegebene Beiträge`],
  ['docs/bg/credits.md', 'bg', () => approved.length, (w) => `${w} изчистени по права приноса`],
  // README
  ['README.md', 'en', () => monthOnly.length, (w) => `not verified for ${w.toLowerCase()} actions`],
  ['README.md', 'en', () => withoutMedia.length, (w) => `${w} of the five recorded actions still have no media`]
]

for (const [file, lang, count, sentence] of CLAIMS) {
  const n = count()
  const w = word(lang, n)
  if (!w) {
    fail(file, `no ${lang} numeral for ${n} -- add it to WORDS, then update the prose`)
    continue
  }
  const expected = sentence(w)
  if (!read(file).includes(expected)) {
    fail(file, `the data says ${n}, so this page should read "${expected}" -- it does not`)
  }
}

// The month-precision list, restated inside the arbiter file itself.
const tbdLine = (actionsFile.tbd ?? []).find((t) => t.includes('month-precision')) ?? ''
if (!tbdLine) {
  fail('docs/data/actions.json', 'no tbd entry records which actions are month-precision')
} else {
  const named = (tbdLine.match(/action-[a-z0-9-]+/g) ?? []).sort()
  const actual = [...monthOnly].sort()
  if (named.join() !== actual.join()) {
    fail('docs/data/actions.json', `tbd names [${named}] as month-precision; the dates say [${actual}]`)
  }
}

// "The other four recorded actions have no media."
const mediaTbd = (mediaFile.tbd ?? []).join(' ')
const otherWord = word('en', withoutMedia.length)
if (otherWord && !mediaTbd.includes(`other ${otherWord.toLowerCase()} recorded actions`)) {
  fail('docs/data/media.json', `${withoutMedia.length} actions have no media; the tbd note does not say so`)
}

/* -- the rights notice lives in one place --------------------------------- */

// The needle is taken from the data, so this file holds no copy of its own.
const rightsNeedle = (mediaFile.rights ?? '').slice(0, 48)
if (rightsNeedle) {
  for (const path of walk(DOCS)) {
    if (!path.endsWith('.md')) continue
    if (readFileSync(path, 'utf8').includes(rightsNeedle)) {
      fail(relative(ROOT, path), 'retypes the rights notice; render <MediaRights /> instead')
    }
  }
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === 'cache') continue
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) yield* walk(path)
    else yield path
  }
}

/* -- every pinned value names an authority -------------------------------- */

/**
 * validate-data.mjs pins two dates and cites "Blueprint section 5" -- a document
 * that is not in this repository, so the citation named something no reader
 * could reach. provenance.json now records what each stated fact rests on and
 * whether anyone can check it, and this makes sure a pin cannot be added
 * without saying where it came from.
 *
 * The pinned ids are read out of the validator's source rather than written
 * here, so this file declares no answer of its own.
 */
const provenance = json('provenance.json')
const authorities = provenance.authorities ?? []
const KINDS = new Set(Object.keys(provenance.checkableMeanings ?? {}))

for (const a of authorities) {
  if (!KINDS.has(a.checkable)) {
    fail('provenance.json', `authority ${a.id} declares checkable "${a.checkable}", which is not one of ${[...KINDS].join(', ')}`)
  }
  if (!(a.authorises ?? []).length) {
    fail('provenance.json', `authority ${a.id} authorises nothing -- remove it or say what rests on it`)
  }
}

const validatorSource = read('scripts/validate-data.mjs')
const pinBlock = /const VERIFIED_DATES = \{([^}]*)\}/.exec(validatorSource)?.[1] ?? ''
const pinnedIds = [...pinBlock.matchAll(/'(action-[a-z0-9-]+)'/g)].map((m) => m[1])
if (!pinnedIds.length) {
  fail('scripts/validate-data.mjs', 'VERIFIED_DATES could not be read -- the provenance check is blind')
}
const authorisesPins = authorities.some((a) => (a.authorises ?? []).some((t) => t.includes('VERIFIED_DATES')))
if (pinnedIds.length && !authorisesPins) {
  fail('provenance.json', `${pinnedIds.length} dates are pinned in validate-data.mjs, but no authority claims VERIFIED_DATES`)
}
for (const id of pinnedIds) {
  if (!published.some((a) => a.stableId === id)) {
    fail('scripts/validate-data.mjs', `pins ${id}, which is not a published action`)
  }
}

const checkable = authorities.filter((a) => a.checkable === 'live' || a.checkable === 'public').length

/* -- ratchet -------------------------------------------------------------- */

/**
 * The floor: how many places still state a fact the data already holds. It went
 * 3 lower when the rights notice became a component. Lower it deliberately;
 * raising it should take an argument.
 */
const FLOOR = 10
const restatements = CLAIMS.length + 2 // the two tbd notes inside the data files

if (restatements > FLOOR) {
  fail('scripts/check-claims.mjs', `${restatements} restatements, floor is ${FLOOR} -- remove one or raise the floor on purpose`)
}

/* -- report --------------------------------------------------------------- */

if (problems.length) {
  console.error('Claims disagree with the data:\n')
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}

console.log(
  `Claims agree with the data: ${restatements} restatements (floor ${FLOOR}), ` +
    `${monthOnly.length} month-precision of ${published.length} actions, ` +
    `${approved.length} approved media, ${withoutMedia.length} actions without.`
)
console.log(
  `Authorities: ${authorities.length} recorded, ${checkable} of them checkable ` +
    `(${authorities.length - checkable} rest on a document or a statement), ` +
    `${pinnedIds.length} pinned dates accounted for.`
)
