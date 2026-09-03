import { readFileSync } from 'node:fs'
import { defineLoader } from 'vitepress'
import type { Action } from '../types/index.ts'

/**
 * The public actions list. Filtering happens here rather than in the component
 * because a data loader runs at build time and only its return value reaches
 * the client bundle -- so a draft or unverified action is absent from the HTML,
 * the bundle and the search index, not merely hidden by CSS.
 */
export interface ActionsData {
  actions: Action[]
}

declare const data: ActionsData
export { data }

export default defineLoader({
  watch: ['../data/actions.json'],
  load(): ActionsData {
    const file = new URL('../data/actions.json', import.meta.url)
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as { actions: Action[] }
    const actions = parsed.actions
      .filter((action) => action.publicationStatus === 'published')
      .sort((a, b) => a.date.localeCompare(b.date))
    return { actions }
  }
})
