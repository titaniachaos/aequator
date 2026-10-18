/** Only exact, editorially approved source/translation pairs are exceptions. */
export function isApprovedTranslation(approvals, id, field, language, source, translation) {
  if (!['en', 'bg'].includes(language) || !['caption', 'alt text'].includes(field)) return false
  const pair = approvals[id]?.[field]?.[language]
  return Array.isArray(pair) && pair.length === 2 &&
    typeof source === 'string' && typeof translation === 'string' &&
    pair[0] === source && pair[1] === translation
}
