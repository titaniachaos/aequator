import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { isApprovedTranslation } from './approved-translations.mjs'

const approvals = JSON.parse(readFileSync(new URL('../approved-media-translations.json', import.meta.url))).translations

test('approved translations accept only the exact reviewed source and wording', () => {
  let reviewed = 0
  for (const [id, fields] of Object.entries(approvals)) {
    for (const [field, languages] of Object.entries(fields)) {
      for (const [language, [source, translated]] of Object.entries(languages)) {
        assert.equal(isApprovedTranslation(approvals, id, field, language, source, translated), true)
        assert.equal(isApprovedTranslation(approvals, id, field, language, source + ' changed', translated), false)
        assert.equal(isApprovedTranslation(approvals, id, field, language, source, translated + ' changed'), false)
        reviewed++
      }
    }
  }
  assert.equal(reviewed, 24)
})

test('approval cannot exempt German, unknown media, missing text, credits or URLs', () => {
  const id = Object.keys(approvals)[0]
  const [source, translated] = approvals[id].caption.en
  for (const [record, field, language, original, local] of [
    [id, 'caption', 'de', source, translated],
    ['unreviewed-film', 'caption', 'en', source, translated],
    [id, 'copyrightHolder', 'en', source, translated],
    [id, 'sourceUrl', 'en', source, translated],
    [id, 'caption', 'en', undefined, translated],
    [id, 'caption', 'en', source, undefined]
  ]) assert.equal(isApprovedTranslation(approvals, record, field, language, original, local), false)
})

test('even a malformed approval record cannot waive German or source URLs', () => {
  const forged = { film: { caption: { de: ['source', 'local'] }, sourceUrl: { en: ['source', 'local'] } } }
  assert.equal(isApprovedTranslation(forged, 'film', 'caption', 'de', 'source', 'local'), false)
  assert.equal(isApprovedTranslation(forged, 'film', 'sourceUrl', 'en', 'source', 'local'), false)
})
