import { useEffect } from 'react'
import { useNav } from '../lib/nav'

export function isWorkPath(path: string) {
  return path !== '/' && path !== '/edit'
}

export function WorkParallax() {
  const { path } = useNav()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    const layers = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]'),
    )
    if (!layers.length) return

    let frame = 0

    const shift = () => {
      frame = 0
      const view = window.innerHeight || 1
      for (const layer of layers) {
        const depth = Number(layer.dataset.parallax) || 16
        const rect = layer.getBoundingClientRect()
        const fromCenter = (rect.top + rect.height / 2 - view / 2) / view
        const offset = Math.round(fromCenter * depth * -1.15)
        layer.style.transform = `translate3d(0, ${offset}px, 0)`
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(shift)
    }

    shift()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      for (const layer of layers) {
        layer.style.transform = ''
      }
    }
  }, [path])

  return null
}
