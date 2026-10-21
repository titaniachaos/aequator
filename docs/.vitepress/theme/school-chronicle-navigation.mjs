/** A German-only chronicle must not link to nonexistent translations. */
export function schoolChronicleLocaleLink(data, route, targetLocale) {
  const prefix = targetLocale === 'root' ? '' : `/${targetLocale}`
  if (route.data.relativePath === 'de/schulchronik.md') return `${prefix}/`
  const path = route.data.relativePath.replace(/^(de|bg)\//, '').replace(/index\.md$/, '').replace(/\.md$/, '')
  return `${prefix}/${path}${route.query || ''}${route.hash || ''}`
}
