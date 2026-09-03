import { readFileSync } from 'node:fs'
import { defineLoader } from 'vitepress'
import type { MediaItem } from '../types/index.ts'

/**
 * Only `consentStatus: 'approved'` media exists downstream of this loader.
 * 'pending' and 'internal-only' entries stay in the repository file and never
 * reach HTML, the client bundle, feeds, metadata, the search index or
 * docs/public.
 */
export interface MediaData {
  media: MediaItem[]
  byId: Record<string, MediaItem>
}

declare const data: MediaData
export { data }

export default defineLoader({
  watch: ['../data/media.json'],
  load(): MediaData {
    const file = new URL('../data/media.json', import.meta.url)
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as { media: MediaItem[] }
    const media = parsed.media.filter((item) => item.consentStatus === 'approved')
    const byId: Record<string, MediaItem> = {}
    for (const item of media) byId[item.stableId] = item
    return { media, byId }
  }
})
