import type { Language, LocalizedText } from '../../types/index.ts'

/**
 * German is the authentic primary source, so it is the fallback: a page in a
 * language whose translation has not been supplied shows the source text
 * rather than an empty slot or an invented sentence.
 */
const FALLBACK: Language[] = ['de', 'en', 'bg']

export function t(text: LocalizedText | undefined, lang: Language): string {
  if (!text) return ''
  return text[lang] ?? FALLBACK.map((l) => text[l]).find(Boolean) ?? ''
}

/** `2026-03-04` and `2026-03` both occur; neither is padded into the other. */
export function formatDate(date: string, lang: Language): string {
  const locale = lang === 'de' ? 'de-AT' : lang === 'bg' ? 'bg-BG' : 'en-GB'
  const [year, month, day] = date.split('-')
  if (!month) return year
  const at = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day ?? 1)))
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    ...(day ? { day: 'numeric' } : {}),
    timeZone: 'UTC'
  }).format(at)
}
