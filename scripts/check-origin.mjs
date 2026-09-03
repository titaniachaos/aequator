#!/usr/bin/env node
/**
 * The borrowed facts, checked against the one source that can arbitrate them.
 *
 * docs/data/media.json restates what titaniachaos.com publishes at /media.json:
 * the rights notice, and each frame's caption, alt text and URLs. seo.ts states
 * the card image's dimensions. None of that is ours to declare, so this asks the
 * origin and compares.
 *
 * It needs the network, so it is deliberately NOT part of `npm run check`: the
 * deploy gate must pass on a fresh clone with no network, the way clown's does.
 * Run it when the origin may have moved.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const read = (f) => readFileSync(ROOT + f, 'utf8')
const local = JSON.parse(read('docs/data/media.json'))

const ORIGIN = process.env.SITE_ORIGIN ?? 'https://titaniachaos.com'
const problems = []
const fail = (m) => problems.push(m)

const res = await fetch(`${ORIGIN}/media.json`, { headers: { 'user-agent': 'aequator-check-origin' } })
if (!res.ok) {
  console.error(`Cannot reach ${ORIGIN}/media.json (HTTP ${res.status}).`)
  process.exit(2)
}
const origin = await res.json()
const byId = new Map(origin.media.map((m) => [m.id, m]))

const localRights = (local.rights ?? '').replace(/\s*Recorded verbatim from \S+\s*$/, '').trim()
if (localRights !== (origin.rights ?? '').trim()) {
  fail('the rights notice differs from the origin')
}

for (const item of local.media) {
  const o = byId.get(item.stableId)
  if (!o) {
    fail(`${item.stableId} is not published at the origin any more -- it must not be shown here`)
    continue
  }
  for (const [ours, theirs, label] of [
    [item.caption, o.caption, 'caption'],
    [item.altText, o.alt, 'alt text']
  ]) {
    for (const lang of ['en', 'de', 'bg']) {
      if (ours?.[lang] !== theirs?.[lang]) fail(`${item.stableId}: ${label} (${lang}) differs from the origin`)
    }
  }
  if (item.sourceUrl && o.film && item.sourceUrl !== o.film) fail(`${item.stableId}: sourceUrl differs from the origin`)
  if (item.posterUrl && o.url && item.posterUrl !== o.url) fail(`${item.stableId}: posterUrl differs from the origin`)
}

// The card image's real dimensions, as seo.ts claims them.
const seo = read('docs/.vitepress/seo.ts')
const url = /const OG_IMAGE = `\$\{HOSTNAME\}(\S+?)`/.exec(seo)?.[1]
const stated = { w: Number(/w: (\d+)/.exec(seo)?.[1]), h: Number(/h: (\d+)/.exec(seo)?.[1]) }
if (url) {
  const img = await fetch(`${ORIGIN}${url}`, { headers: { 'user-agent': 'aequator-check-origin' } })
  if (!img.ok) {
    fail(`the card image ${url} is not reachable (HTTP ${img.status})`)
  } else {
    const b = Buffer.from(await img.arrayBuffer())
    // WebP VP8X carries the canvas size as two 24-bit little-endian values.
    if (b.subarray(12, 16).toString() === 'VP8X') {
      const w = b.readUIntLE(24, 3) + 1
      const h = b.readUIntLE(27, 3) + 1
      if (w !== stated.w || h !== stated.h) {
        fail(`seo.ts states the card image is ${stated.w}x${stated.h}; it is ${w}x${h}`)
      }
    }
  }
}

if (problems.length) {
  console.error(`Disagrees with ${ORIGIN}:\n`)
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}
console.log(`Agrees with ${ORIGIN}: rights notice, ${local.media.length} frame(s), card image ${stated.w}x${stated.h}.`)
