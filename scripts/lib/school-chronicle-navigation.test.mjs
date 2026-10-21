import test from 'node:test'
import assert from 'node:assert/strict'
import { schoolChronicleLocaleLink } from '../../docs/.vitepress/theme/school-chronicle-navigation.mjs'

test('German chronicle switches to existing locale homes', () => {
  const route = { data: { relativePath: 'de/schulchronik.md' }, query: '?x=1', hash: '#besuch-2026-10-21' }
  assert.equal(schoolChronicleLocaleLink({}, route, 'root'), '/')
  assert.equal(schoolChronicleLocaleLink({}, route, 'bg'), '/bg/')
})
test('existing German pages retain their counterpart, query and anchor', () => {
  assert.equal(schoolChronicleLocaleLink({}, { data: { relativePath: 'de/actions.md' }, query: '?x=1', hash: '#a' }, 'bg'), '/bg/actions?x=1#a')
  assert.equal(schoolChronicleLocaleLink({}, { data: { relativePath: 'de/index.md' } }, 'root'), '/')
})
