import test from 'node:test'
import assert from 'node:assert/strict'
import { installVisibleVideo } from '../../docs/.vitepress/theme/visible-video.mjs'

function setup({ reduced = false, reject = false } = {}) {
  const video = new EventTarget()
  Object.assign(video, { paused: true, ended: false, muted: false, plays: 0 })
  video.play = () => {
    video.plays++
    if (reject) return Promise.reject(new Error('Autoplay blocked'))
    video.paused = false
    return Promise.resolve()
  }
  video.pause = () => {
    video.paused = true
    video.dispatchEvent(new Event('pause'))
  }
  const mediaQuery = Object.assign(new EventTarget(), { matches: reduced })
  const page = Object.assign(new EventTarget(), { hidden: false })
  let callback
  let disconnected = false
  class Observer {
    constructor(cb) { callback = cb }
    observe() {}
    disconnect() { disconnected = true }
  }
  const stop = installVisibleVideo(video, { mediaQuery, page, Observer })
  const visibility = ratio => callback([{ target: video, isIntersecting: ratio > 0, intersectionRatio: ratio }])
  return { video, mediaQuery, page, visibility, stop, disconnected: () => disconnected }
}

test('plays muted only when mostly visible, pauses offscreen and resumes without looping', () => {
  const { video, visibility } = setup()
  assert.equal(video.muted, true)
  visibility(0.2)
  assert.equal(video.plays, 0)
  visibility(0.8)
  assert.equal(video.paused, false)
  visibility(0)
  assert.equal(video.paused, true)
  visibility(0.8)
  assert.equal(video.plays, 2)
  video.ended = true
  video.paused = true
  video.dispatchEvent(new Event('ended'))
  visibility(0)
  visibility(0.8)
  assert.equal(video.plays, 2)
})

test('respects manual pause across scrolling and cleans up observers', () => {
  const { video, visibility, stop, disconnected } = setup()
  visibility(1)
  video.pause()
  visibility(0)
  visibility(1)
  assert.equal(video.plays, 1)
  stop()
  assert.equal(disconnected(), true)
})

test('reduced motion disables automatic playback while manual play remains possible', () => {
  const { video, visibility } = setup({ reduced: true })
  visibility(1)
  assert.equal(video.plays, 0)
  video.play()
  assert.equal(video.paused, false)
})

test('motion preference and page visibility changes suspend playback', () => {
  const { video, visibility, mediaQuery, page } = setup()
  visibility(1)
  mediaQuery.matches = true
  mediaQuery.dispatchEvent(new Event('change'))
  assert.equal(video.paused, true)
  mediaQuery.matches = false
  mediaQuery.dispatchEvent(new Event('change'))
  assert.equal(video.paused, false)
  page.hidden = true
  page.dispatchEvent(new Event('visibilitychange'))
  assert.equal(video.paused, true)
})

test('blocked autoplay settles without retrying; native manual play is not removed', async () => {
  const { video, visibility } = setup({ reject: true })
  visibility(1)
  await Promise.resolve()
  visibility(0)
  visibility(1)
  assert.equal(video.plays, 1)
  assert.equal(typeof video.play, 'function')
})
