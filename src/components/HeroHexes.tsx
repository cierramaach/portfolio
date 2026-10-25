import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  HERO_HEX_FRAME,
  HEX_LOOK,
  HEX_SURFACE_SRC,
  HEX_UNIT,
  HEX_EXCLUSION_MARGIN,
  hexFace,
  layoutHexes,
  layoutsEqual,
  paintOrder,
  textureWindow,
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

function entranceStyle(hex: HeroHex): CSSProperties {
  const west = Math.max(0, Math.min(1, 1 - hex.cx / HERO_HEX_FRAME.w))
  const size = Math.max(0, Math.min(1, (hex.radius / HEX_UNIT - 0.4) / 1.5))
  let n = 2166136261
  for (let i = 0; i < hex.id.length; i++) {
    n ^= hex.id.charCodeAt(i)
    n = Math.imul(n, 16777619)
  }
  const jitter = (n >>> 0) % 7
  return {
    ['--hex-opacity' as string]: String(hex.opacity),
    ['--hex-delay' as string]: `${(0.04 + west * 0.38 + jitter * 0.012).toFixed(3)}s`,
    ['--hex-move' as string]: `${(0.92 + size * 0.42).toFixed(3)}s`,
    ['--hex-fade' as string]: `${(0.78 + size * 0.36).toFixed(3)}s`,
  }
}

function strokeOf(hex: HeroHex, line: boolean) {
  const look = HEX_LOOK[hex.tint][hex.depth]
  const base = line ? look.strokeWidth * 1.35 : look.strokeWidth
  if (hex.outline === 'foil') {
    return {
      stroke: 'url(#hero-foil-outline)',
      strokeWidth: line ? Math.max(base, 2.2) : Math.max(base * 1.75, 1.7),
    }
  }
  return { stroke: look.stroke, strokeWidth: base }
}

function HexCell({ hex }: { hex: HeroHex }) {
  const look = HEX_LOOK[hex.tint][hex.depth]
  const line = hex.finish === 'line'
  const face = points(hexFace(hex.cx, hex.cy, hex.radius))
  const rim = strokeOf(hex, line)

  if (line || hex.surface === 'paper') {
    return (
      <polygon
        className="hero-hexes__cell"
        points={face}
        fill={line ? 'none' : look.face}
        stroke={rim.stroke}
        strokeWidth={rim.strokeWidth}
        strokeLinejoin="round"
        style={entranceStyle(hex)}
      />
    )
  }

  const crop = textureWindow(hex)
  const clipId = `hero-hex-clip-${hex.id}`
  return (
    <g className="hero-hexes__cell" style={entranceStyle(hex)}>
      <clipPath id={clipId}>
        <polygon points={face} />
      </clipPath>
      <polygon points={face} fill={look.face} stroke="none" />
      <image
        href={HEX_SURFACE_SRC[hex.surface]}
        x={crop.x}
        y={crop.y}
        width={crop.size}
        height={crop.size}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
      <polygon
        points={face}
        fill="none"
        stroke={rim.stroke}
        strokeWidth={rim.strokeWidth}
        strokeLinejoin="round"
      />
    </g>
  )
}

type HeroHexesProps = {
  lockup: HTMLElement | null
}

export function HeroHexes({ lockup }: HeroHexesProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cells, setCells] = useState<HeroHex[]>([])
  const [arrived, setArrived] = useState(false)

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

  useLayoutEffect(() => {
    if (!cells.length || arrived) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) {
      setArrived(true)
      return
    }
    let cancelled = false
    const outer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setArrived(true)
      })
    })
    const fallback = window.setTimeout(() => {
      if (!cancelled) setArrived(true)
    }, 160)
    return () => {
      cancelled = true
      cancelAnimationFrame(outer)
      window.clearTimeout(fallback)
    }
  }, [cells, arrived])

  const ordered = useMemo(() => [...cells].sort(paintOrder), [cells])

  return (
    <div className={arrived ? 'hero-hexes is-in' : 'hero-hexes'} aria-hidden="true">
      <svg
        ref={svgRef}
        className="hero-hexes__canvas"
        viewBox={`0 0 ${HERO_HEX_FRAME.w} ${HERO_HEX_FRAME.h}`}
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
      >
        <defs>
          <pattern
            id="hero-foil-outline"
            patternUnits="userSpaceOnUse"
            width="180"
            height="180"
          >
            <image
              href={HEX_SURFACE_SRC.foil}
              x="0"
              y="0"
              width="180"
              height="180"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
        {ordered.map((hex) => (
          <HexCell key={hex.id} hex={hex} />
        ))}
      </svg>
    </div>
  )
}
