/** One automatic play per visit to the page; native controls always remain usable. */
export function installVisibleVideo(video, { mediaQuery, Observer, page }) {
  let visible = false
  let userPaused = false
  let ended = false
  let blocked = false
  let expectedPause = false
  let disposed = false

  const suspend = () => {
    if (!video.paused) {
      expectedPause = true
      video.pause()
    }
  }
  const update = () => {
    if (!visible || page.hidden || mediaQuery.matches) {
      suspend()
    } else if (!disposed && !userPaused && !ended && !blocked && video.paused) {
      // Browsers may reject autoplay. Native controls are the fallback.
      Promise.resolve(video.play()).catch(() => { blocked = true })
    }
  }
  const pause = () => {
    if (expectedPause) expectedPause = false
    else if (!video.ended) userPaused = true
  }
  const finish = () => { ended = true }
  const observer = new Observer(entries => {
    const entry = entries.find(entry => entry.target === video)
    if (!entry) return
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.5
    update()
  }, { threshold: [0, 0.5] })

  video.muted = true
  video.addEventListener('pause', pause)
  video.addEventListener('ended', finish)
  mediaQuery.addEventListener('change', update)
  page.addEventListener('visibilitychange', update)
  observer.observe(video)
  return () => {
    disposed = true
    observer.disconnect()
    mediaQuery.removeEventListener('change', update)
    page.removeEventListener('visibilitychange', update)
    video.removeEventListener('pause', pause)
    video.removeEventListener('ended', finish)
    suspend()
  }
}
