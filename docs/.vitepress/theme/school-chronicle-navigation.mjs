/** Switch between published chronicle translations; Bulgarian falls back to its home. */
export function schoolChronicleLocaleLink(data, route, targetLocale) {
  const prefix = targetLocale === 'root' ? '' : `/${targetLocale}`
  if (['de/schulchronik.md', 'schulchronik.md'].includes(route.data.relativePath)) {
    return targetLocale === 'bg' ? '/bg/' : `${prefix}/schulchronik${route.query || ''}${route.hash || ''}`
  }
  const path = route.data.relativePath.replace(/^(de|bg)\//, '').replace(/index\.md$/, '').replace(/\.md$/, '')
  return `${prefix}/${path}${route.query || ''}${route.hash || ''}`
}
