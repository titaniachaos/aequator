export function installVisibleVideo(video: HTMLVideoElement, options: {
  mediaQuery: MediaQueryList
  Observer: typeof IntersectionObserver
  page: Document
}): () => void
