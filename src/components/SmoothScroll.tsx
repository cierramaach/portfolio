import { useEffect } from 'react'
import { useNav } from '../lib/nav'

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
}

function canSelfScroll(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  const node = target.closest(
    'textarea, select, [contenteditable="true"], [data-scroll]',
  )
  if (!(node instanceof HTMLElement)) return false
  return node.scrollHeight - node.clientHeight > 1
}

export function SmoothScroll() {
  const { path, hash } = useNav()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    let current = window.scrollY
    let target = current
    let frame = 0

    const tick = () => {
      const limit = maxScroll()
      target = Math.min(limit, Math.max(0, target))
      const delta = target - current
      if (Math.abs(delta) < 0.35) {
        current = target
        window.scrollTo(0, current)
        frame = 0
        return
      }
      current += delta * 0.135
      window.scrollTo(0, current)
      frame = window.requestAnimationFrame(tick)
    }

    const run = () => {
      if (!frame) frame = window.requestAnimationFrame(tick)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return
      if (canSelfScroll(event.target)) return
      event.preventDefault()
      const step = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY
      const limit = maxScroll()
      const next = target + step
      if (next < 0) {
        target += step * Math.max(0, 1 + next / 280)
      } else if (next > limit) {
        target += step * Math.max(0, 1 - (next - limit) / 280)
      } else {
        target = next
      }
      run()
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }
      const tag = event.target instanceof HTMLElement ? event.target.tagName : ''
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      const page = window.innerHeight * 0.84
      if (event.key === 'PageDown' || (event.key === ' ' && !event.shiftKey)) {
        event.preventDefault()
        target += page
        run()
      } else if (event.key === 'PageUp' || (event.key === ' ' && event.shiftKey)) {
        event.preventDefault()
        target -= page
        run()
      } else if (event.key === 'Home') {
        event.preventDefault()
        target = 0
        run()
      } else if (event.key === 'End') {
        event.preventDefault()
        target = maxScroll()
        run()
      }
    }

    const onScroll = () => {
      if (frame) return
      current = window.scrollY
      target = current
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [path, hash])

  return null
}
