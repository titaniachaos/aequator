import { readFileSync } from 'node:fs'
import { defineLoader } from 'vitepress'
import type { ProjectMetadata, SourceLink } from '../types/index.ts'

export interface ProjectData {
  project: ProjectMetadata
  sources: SourceLink[]
}

declare const data: ProjectData
export { data }

export default defineLoader({
  watch: ['../data/project.json', '../data/sources.json'],
  load(): ProjectData {
    const read = (name: string) =>
      JSON.parse(readFileSync(new URL(`../data/${name}`, import.meta.url), 'utf8'))
    const { project } = read('project.json') as { project: ProjectMetadata }
    // sources.json is public by contract; the validator is what enforces it.
    const { sources } = read('sources.json') as { sources: SourceLink[] }
    return { project, sources }
  }
})
