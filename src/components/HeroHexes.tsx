import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  HERO_HEX_FRAME,
  HEX_LOOK,
  HEX_EXCLUSION_MARGIN,
  hexFace,
  layoutHexes,
  layoutsEqual,
  paintOrder,
  type ExclusionZone,
  type HeroHex,
} from '../data/heroHex'

const TEXT_SELECTORS = '.hero-lead, .hero-mid, .hero-end, .hero-blurb span'

function points(pts: readonly (readonly [number, number])[]) {
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
}

function clientToSvg(
  inverse: DOMMatrix,
  x: number,
  y: number,
): { x: number; y: number } {
  return {
    x: inverse.a * x + inverse.c * y + inverse.e,
    y: inverse.b * x + inverse.d * y + inverse.f,
  }
}

function unionClientRect(el: HTMLElement): {
  left: number
  top: number
  right: number
  bottom: number
} | null {
  const nodes = el.querySelectorAll(TEXT_SELECTORS)
  let left = Infinity
  let top = Infinity
  let right = -Infinity
  let bottom = -Infinity
  let found = false

  nodes.forEach((node) => {
    const r = node.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) return
    found = true
    left = Math.min(left, r.left)
    top = Math.min(top, r.top)
    right = Math.max(right, r.right)
    bottom = Math.max(bottom, r.bottom)
  })

  if (!found) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) return null
    return { left: r.left, top: r.top, right: r.right, bottom: r.bottom }
  }

  return { left, top, right, bottom }
}

function measureZone(
  svg: SVGSVGElement,
  lockup: HTMLElement,
): ExclusionZone | null {
  const ctm = svg.getScreenCTM()
  if (!ctm) return null
  const inverse = ctm.inverse()
  const box = unionClientRect(lockup)
  if (!box) return null

  const expanded = {
    left: box.left - HEX_EXCLUSION_MARGIN.x,
    top: box.top - HEX_EXCLUSION_MARGIN.y,
    right: box.right + HEX_EXCLUSION_MARGIN.x + HEX_EXCLUSION_MARGIN.italic,
    bottom: box.bottom + HEX_EXCLUSION_MARGIN.y,
  }

  const corners = [
    clientToSvg(inverse, expanded.left, expanded.top),
    clientToSvg(inverse, expanded.right, expanded.top),
    clientToSvg(inverse, expanded.right, expanded.bottom),
    clientToSvg(inverse, expanded.left, expanded.bottom),
  ]

  const xs = corners.map((p) => p.x)
  const ys = corners.map((p) => p.y)
  const x = Math.min(...xs)
  const y = Math.min(...ys)
  const w = Math.max(...xs) - x
  const h = Math.max(...ys) - y
  if (w < 8 || h < 8) return null

  const scale = Math.hypot(ctm.a, ctm.b) || 1

  return {
    x,
    y,
    w,
    h,
    radius: Math.min(56 / scale, w * 0.22, h * 0.22),
    falloff: HEX_EXCLUSION_MARGIN.falloff / scale,
  }
}

function HexCell({ hex }: { hex: HeroHex }) {
  const look = HEX_LOOK[hex.tint][hex.depth]
  const line = hex.finish === 'line'
  return (
    <polygon
      points={points(hexFace(hex.cx, hex.cy, hex.radius))}
      fill={line ? 'none' : look.face}
      stroke={look.stroke}
      strokeWidth={line ? look.strokeWidth * 1.35 : look.strokeWidth}
      strokeLinejoin="round"
      opacity={hex.opacity}
    />
  )
}

type HeroHexesProps = {
  lockup: HTMLElement | null
}

export function HeroHexes({ lockup }: HeroHexesProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cells, setCells] = useState<HeroHex[]>([])

  useLayoutEffect(() => {
    const svg = svgRef.current
    const text =
      lockup ?? svg?.closest('.hero')?.querySelector<HTMLElement>('.hero-lockup')
    if (!svg || !text) return

    let frame = 0

    const apply = () => {
      const zone = measureZone(svg, text)
      const ctm = svg.getScreenCTM()
      const screenScale = ctm ? Math.hypot(ctm.a, ctm.b) : 1
      const next = layoutHexes(zone, window.innerWidth, screenScale)
      setCells((prev) => (layoutsEqual(prev, next) ? prev : next))
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        apply()
      })
    }

    apply()

    const observer = new ResizeObserver(schedule)
    observer.observe(text)
    observer.observe(svg)

    window.addEventListener('resize', schedule)
    window.visualViewport?.addEventListener('resize', schedule)
    const fonts = document.fonts
    const onFonts = () => schedule()
    fonts?.addEventListener('loadingdone', onFonts)
    void fonts?.ready.then(onFonts)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', schedule)
      window.visualViewport?.removeEventListener('resize', schedule)
      fonts?.removeEventListener('loadingdone', onFonts)
    }
  }, [lockup])

  const ordered = useMemo(() => [...cells].sort(paintOrder), [cells])

  return (
    <div className="hero-hexes" aria-hidden="true">
      <svg
        ref={svgRef}
        className="hero-hexes__canvas"
        viewBox={`0 0 ${HERO_HEX_FRAME.w} ${HERO_HEX_FRAME.h}`}
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
      >
        {ordered.map((hex) => (
          <HexCell key={hex.id} hex={hex} />
        ))}
      </svg>
    </div>
  )
}
