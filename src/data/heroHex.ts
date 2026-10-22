export const HERO_HEX_FRAME = { w: 1600, h: 900 } as const

/** Flat-top hex: vertex-to-vertex width `w`, flat-to-flat height `√3/2 w`. */
export const HEX_ASPECT = Math.sqrt(3) / 2

/**
 * Standard circumradius. Cell `scale` is a multiple of this.
 * Extra-small 0.32–0.38 · small 0.42–0.52 · medium 0.78–1.18 · large 1.58 · oversized 1.82–1.92
 */
export const HEX_UNIT = 80

/** Hard minimum outline-to-outline gap, in CSS pixels. */
export const HEX_MIN_GAP = 30

/** Target outline-to-outline gap at the 1600 × 900 reference frame, in CSS pixels. */
export const HEX_TARGET_GAP = 36

/** Interior clearance for an authored nested child, in CSS pixels. */
export const HEX_NEST_CLEARANCE = 18

/** Nearby hexes may not share a top edge, bottom edge, or mid-vertex band. */
export const HEX_ALIGN_TOL = 18

/** Breathing room around the rendered typography, in CSS pixels. */
export const HEX_EXCLUSION_MARGIN = {
  x: 40,
  y: 32,
  italic: 22,
  falloff: 220,
} as const

export type HexRole = 'anchor' | 'support' | 'accent'
export type HexDepth = 'recessed' | 'field' | 'raised'
export type HexTint = 'ivory' | 'slate' | 'silver'
export type HexFinish = 'fill' | 'line'
export type HexBreakpoint = 'desktop' | 'tablet' | 'mobile'
export type HexPairKind = 'gap' | 'intersect' | 'contain' | 'tangent'

export type HeroHex = {
  id: string
  role: HexRole
  cx: number
  cy: number
  w: number
  h: number
  radius: number
  depth: HexDepth
  tint: HexTint
  finish: HexFinish
  opacity: number
  parentId: string | null
}

export type ExclusionZone = {
  x: number
  y: number
  w: number
  h: number
  radius: number
  falloff: number
}

const HEX_STROKE = {
  recessed: 0.7,
  field: 0.9,
  raised: 1.2,
} as const

/**
 * Ivory is the field. Silver strokes give cool dimension.
 * Slate is the selected modern note — not a flood.
 */
export const HEX_LOOK = {
  ivory: {
    recessed: { face: '#ece9e3', stroke: '#c9cdce', strokeWidth: HEX_STROKE.recessed },
    field: { face: '#f1eee8', stroke: '#d4d8d9', strokeWidth: HEX_STROKE.field },
    raised: { face: '#f8f6f2', stroke: '#c5cacb', strokeWidth: HEX_STROKE.raised },
  },
  slate: {
    recessed: { face: '#adb6bc', stroke: '#d4d8d9', strokeWidth: HEX_STROKE.recessed },
    field: { face: '#99a6af', stroke: '#d4d8d9', strokeWidth: HEX_STROKE.field },
    raised: { face: '#697f91', stroke: '#d4d8d9', strokeWidth: HEX_STROKE.raised },
  },
  silver: {
    recessed: { face: '#e4e6e6', stroke: '#c5cacb', strokeWidth: HEX_STROKE.recessed },
    field: { face: '#d4d8d9', stroke: '#b7bdbf', strokeWidth: HEX_STROKE.field },
    raised: { face: '#e8eaea', stroke: '#c5cacb', strokeWidth: HEX_STROKE.raised },
  },
} as const

export const HEX_DEPTH = HEX_LOOK.ivory

type HexNestSpec = {
  id: string
  ox: number
  oy: number
  scale: number
  depth: HexDepth
  tint: HexTint
  finish?: HexFinish
  at?: readonly HexBreakpoint[]
}

type HexCellSpec = {
  id: string
  nx: number
  ny: number
  lift?: number
  scale: number
  depth: HexDepth
  tint: HexTint
  finish?: HexFinish
  at?: readonly HexBreakpoint[]
  nest?: readonly HexNestSpec[]
}

/**
 * Art-directed east field.
 *
 * Ivory `field` fill matches the paper, so anchors use recessed / raised
 * ivory, silver, or slate — never a camouflaged fill. Mass sits in the
 * visible frame and crops 15–35% off the top, right, and bottom. A pause
 * at mid-height keeps the type clear. Nested children are authored groups.
 * Independent cells keep a paper gap. Fade is right-to-left with a 0.14 floor.
 */
export const HEX_FIELD = {
  fade: {
    floor: 0.14,
    range: 240,
    west: 0.56,
    westSpan: 0.32,
  },
  cells: [
    {
      id: 'north',
      nx: 0.92,
      ny: 0.1,
      scale: 1.78,
      depth: 'recessed',
      tint: 'ivory',
      nest: [
        {
          id: 'north-in',
          ox: -0.32,
          oy: 0.18,
          scale: 0.48,
          depth: 'recessed',
          tint: 'slate',
          at: ['desktop', 'tablet'],
        },
      ],
    },
    {
      id: 'north-arm',
      nx: 0.76,
      ny: 0.19,
      lift: -4,
      scale: 1.08,
      depth: 'raised',
      tint: 'ivory',
      at: ['desktop', 'tablet'],
    },
    {
      id: 'north-ghost',
      nx: 0.69,
      ny: 0.05,
      lift: 4,
      scale: 0.4,
      depth: 'field',
      tint: 'silver',
      finish: 'line',
      at: ['desktop'],
    },
    {
      id: 'high-slate',
      nx: 0.98,
      ny: 0.34,
      lift: 4,
      scale: 0.92,
      depth: 'field',
      tint: 'slate',
    },
    {
      id: 'high-taper',
      nx: 0.66,
      ny: 0.25,
      lift: 6,
      scale: 0.36,
      depth: 'recessed',
      tint: 'ivory',
      finish: 'line',
      at: ['desktop'],
    },
    {
      id: 'fore',
      nx: 0.825,
      ny: 0.33,
      lift: 4,
      scale: 0.44,
      depth: 'recessed',
      tint: 'ivory',
      at: ['desktop', 'tablet'],
    },
    {
      id: 'mid-step',
      nx: 0.71,
      ny: 0.39,
      lift: 4,
      scale: 0.5,
      depth: 'recessed',
      tint: 'ivory',
      at: ['desktop', 'tablet'],
    },
    {
      id: 'mid-ghost',
      nx: 0.94,
      ny: 0.46,
      lift: -4,
      scale: 0.38,
      depth: 'field',
      tint: 'silver',
      finish: 'line',
    },
    {
      id: 'west-taper',
      nx: 0.68,
      ny: 0.54,
      lift: 4,
      scale: 0.36,
      depth: 'recessed',
      tint: 'silver',
      at: ['desktop'],
    },
    {
      id: 'east-cut',
      nx: 1.006,
      ny: 0.556,
      scale: 0.82,
      depth: 'raised',
      tint: 'silver',
    },
    {
      id: 'south',
      nx: 0.838,
      ny: 0.71,
      lift: 1,
      scale: 1.62,
      depth: 'raised',
      tint: 'ivory',
      at: ['desktop', 'tablet'],
      nest: [
        {
          id: 'south-in',
          ox: 0.22,
          oy: -0.28,
          scale: 0.46,
          depth: 'recessed',
          tint: 'ivory',
          at: ['desktop'],
        },
      ],
    },
    {
      id: 'low-slate',
      nx: 0.95,
      ny: 0.878,
      scale: 1.12,
      depth: 'field',
      tint: 'slate',
    },
    {
      id: 'low-taper',
      nx: 0.662,
      ny: 0.844,
      scale: 0.44,
      depth: 'recessed',
      tint: 'silver',
      at: ['desktop', 'tablet'],
    },
    {
      id: 'bottom',
      nx: 0.766,
      ny: 1.006,
      scale: 1.68,
      depth: 'recessed',
      tint: 'ivory',
    },
    {
      id: 'rim-ghost',
      nx: 1.025,
      ny: 0.978,
      lift: -2,
      scale: 0.4,
      depth: 'raised',
      tint: 'silver',
      finish: 'line',
      at: ['desktop', 'tablet'],
    },
  ] satisfies readonly HexCellSpec[],
} as const

export function breakpointForWidth(width: number): HexBreakpoint {
  if (width <= 860) return 'mobile'
  if (width <= 1100) return 'tablet'
  return 'desktop'
}

type Pt = readonly [number, number]

export function hexFace(cx: number, cy: number, radius: number): Pt[] {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * 60 * i
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)] as const
  })
}

function strokeOf(hex: HeroHex) {
  const width = HEX_LOOK[hex.tint][hex.depth].strokeWidth
  return hex.finish === 'line' ? width * 1.35 : width
}

function inradiusOf(hex: HeroHex) {
  return hex.radius * HEX_ASPECT
}

function outerInradius(hex: HeroHex) {
  return inradiusOf(hex) + strokeOf(hex) / 2
}

function innerInradius(hex: HeroHex) {
  return inradiusOf(hex) - strokeOf(hex) / 2
}

function circumFromInradius(ir: number) {
  return ir / HEX_ASPECT
}

function outlinePolygon(hex: HeroHex, side: 'outer' | 'inner'): Pt[] {
  const ir = side === 'outer' ? outerInradius(hex) : innerInradius(hex)
  return hexFace(hex.cx, hex.cy, circumFromInradius(Math.max(ir, 0.5)))
}

export function hexSilhouette(hex: HeroHex): Pt[] {
  return outlinePolygon(hex, 'outer')
}

function project(poly: Pt[], axis: Pt) {
  let min = Infinity
  let max = -Infinity
  for (const p of poly) {
    const d = p[0] * axis[0] + p[1] * axis[1]
    if (d < min) min = d
    if (d > max) max = d
  }
  return { min, max }
}

function axesOf(poly: Pt[]): Pt[] {
  const axes: Pt[] = []
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]
    const b = poly[(i + 1) % poly.length]
    const ex = b[0] - a[0]
    const ey = b[1] - a[1]
    const len = Math.hypot(ex, ey) || 1
    axes.push([-ey / len, ex / len])
  }
  return axes
}

/** Signed polygon-edge clearance along the best SAT axis. Positive = separated. */
function convexGap(a: Pt[], b: Pt[]) {
  let gap = -Infinity
  for (const axis of [...axesOf(a), ...axesOf(b)]) {
    const pa = project(a, axis)
    const pb = project(b, axis)
    const sep = Math.max(pb.min - pa.max, pa.min - pb.max)
    if (sep > gap) gap = sep
  }
  return gap
}

function convexGapAxis(a: Pt[], b: Pt[], acx: number, acy: number, bcx: number, bcy: number) {
  let gap = -Infinity
  let axis: Pt = [1, 0]
  for (const candidate of [...axesOf(a), ...axesOf(b)]) {
    const pa = project(a, candidate)
    const pb = project(b, candidate)
    const sep = Math.max(pb.min - pa.max, pa.min - pb.max)
    if (sep > gap) {
      gap = sep
      const toward = (bcx - acx) * candidate[0] + (bcy - acy) * candidate[1]
      axis = toward < 0 ? [-candidate[0], -candidate[1]] : candidate
    }
  }
  return { gap, axis }
}

function polygonsOverlap(a: Pt[], b: Pt[]) {
  return convexGap(a, b) < 0
}

function orient(a: Pt, b: Pt, c: Pt) {
  return (b[1] - a[1]) * (c[0] - b[0]) - (b[0] - a[0]) * (c[1] - b[1])
}

function segmentsCross(p1: Pt, p2: Pt, q1: Pt, q2: Pt) {
  const o1 = orient(p1, p2, q1)
  const o2 = orient(p1, p2, q2)
  const o3 = orient(q1, q2, p1)
  const o4 = orient(q1, q2, p2)
  return o1 * o2 < -1e-8 && o3 * o4 < -1e-8
}

function outlinesCross(a: HeroHex, b: HeroHex) {
  const pa = outlinePolygon(a, 'outer')
  const pb = outlinePolygon(b, 'outer')
  for (let i = 0; i < pa.length; i++) {
    const a1 = pa[i]
    const a2 = pa[(i + 1) % pa.length]
    for (let j = 0; j < pb.length; j++) {
      if (segmentsCross(a1, a2, pb[j], pb[(j + 1) % pb.length])) return true
    }
  }
  return false
}

function zonePolygon(zone: ExclusionZone): Pt[] {
  const { x, y, w, h } = zone
  return [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ]
}

export function hexHitsZone(hex: HeroHex, zone: ExclusionZone) {
  return polygonsOverlap(hexSilhouette(hex), zonePolygon(zone))
}

/** Outline-to-outline distance, including stroke widths. */
export function outlineGap(a: HeroHex, b: HeroHex) {
  return convexGap(outlinePolygon(a, 'outer'), outlinePolygon(b, 'outer'))
}

/**
 * How far `inner` sits inside `outer`.
 * Positive = fully contained with that much inner-outline clearance.
 */
export function containmentClearance(outer: HeroHex, inner: HeroHex) {
  const outerInner = outlinePolygon(outer, 'inner')
  const innerOuter = outlinePolygon(inner, 'outer')
  let min = Infinity
  for (const inward of axesOf(outerInner)) {
    const outward: Pt = [-inward[0], -inward[1]]
    const outerSupport = project(outerInner, outward).max
    const innerSupport = project(innerOuter, outward).max
    const room = outerSupport - innerSupport
    if (room < min) min = room
  }
  return min
}

function nestedPair(a: HeroHex, b: HeroHex) {
  return a.parentId === b.id || b.parentId === a.id
}

export function classifyPair(a: HeroHex, b: HeroHex, minGap: number): HexPairKind {
  const insideA = containmentClearance(a, b)
  const insideB = containmentClearance(b, a)
  if (insideA >= 0 || insideB >= 0) return 'contain'

  const gap = outlineGap(a, b)
  if (gap >= minGap) return 'gap'
  if (gap > -1) return 'tangent'
  if (!outlinesCross(a, b)) return 'tangent'
  return 'intersect'
}

function pxToView(px: number, screenScale: number) {
  return px / Math.max(screenScale, 0.0001)
}

function clamp(t: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, t))
}

function smoothstep(t: number) {
  const x = clamp(t)
  return x * x * (3 - 2 * x)
}

function visibleAt(at: readonly HexBreakpoint[] | undefined, bp: HexBreakpoint) {
  return !at || at.includes(bp)
}

function roleFor(scale: number): HexRole {
  if (scale >= 1.5) return 'anchor'
  if (scale >= 0.7) return 'support'
  return 'accent'
}

function makeHex(
  id: string,
  cx: number,
  cy: number,
  scale: number,
  depth: HexDepth,
  tint: HexTint,
  finish: HexFinish = 'fill',
  parentId: string | null = null,
): HeroHex {
  const radius = HEX_UNIT * scale
  const w = radius * 2
  return {
    id,
    role: roleFor(scale),
    cx,
    cy,
    w,
    h: w * HEX_ASPECT,
    radius,
    depth,
    tint,
    finish,
    opacity: 1,
    parentId,
  }
}

function relocate(hex: HeroHex, cx: number, cy: number): HeroHex {
  return { ...hex, cx, cy }
}

function moveHex(hexes: HeroHex[], id: string, dx: number, dy: number) {
  return hexes.map((hex) => {
    if (hex.id !== id && hex.parentId !== id) return hex
    return relocate(hex, hex.cx + dx, hex.cy + dy)
  })
}

export type HexViolation =
  | { type: 'gap'; a: string; b: string; gap: number; min: number }
  | { type: 'overlap'; a: string; b: string }
  | { type: 'containment'; a: string; b: string }
  | { type: 'nest'; a: string; b: string; room: number; min: number }
  | { type: 'tangent'; a: string; b: string; gap: number }
  | { type: 'opacity'; id: string; opacity: number; min: number }

export type HexValidation = {
  ok: boolean
  violations: HexViolation[]
}

export type HexLayoutStats = {
  generated: number
  placed: number
  rejected: number
  clipped: number
  nested: number
  alignments: number
  ids: string[]
  minGapPx: number | null
  minOpacity: number | null
  targetGap: number
  screenScale: number
  zone: { x: number; y: number; w: number; h: number } | null
  validation: HexValidation
}

let lastLayoutStats: HexLayoutStats | null = null

export function getLastHexLayoutStats() {
  return lastLayoutStats
}

function emptyStats(): HexLayoutStats {
  return {
    generated: 0,
    placed: 0,
    rejected: 0,
    clipped: 0,
    nested: 0,
    alignments: 0,
    ids: [],
    minGapPx: null,
    minOpacity: null,
    targetGap: 0,
    screenScale: 1,
    zone: null,
    validation: { ok: true, violations: [] },
  }
}

function sdfBox(px: number, py: number, zone: ExclusionZone) {
  const hx = zone.w / 2
  const hy = zone.h / 2
  const dx = Math.abs(px - (zone.x + hx)) - hx
  const dy = Math.abs(py - (zone.y + hy)) - hy
  const ox = Math.max(dx, 0)
  const oy = Math.max(dy, 0)
  return Math.hypot(ox, oy) + Math.min(Math.max(dx, dy), 0)
}

function copyProximity(hex: HeroHex, zone: ExclusionZone) {
  let min = Infinity
  for (const [x, y] of hexSilhouette(hex)) {
    const d = sdfBox(x, y, zone)
    if (d < min) min = d
  }
  return min
}

function composeOpacity(hex: HeroHex, zone: ExclusionZone) {
  const { w } = HERO_HEX_FRAME
  const { floor, range, west, westSpan } = HEX_FIELD.fade
  const dist = Math.max(0, copyProximity(hex, zone))
  const copy = smoothstep(dist / range)
  const east = smoothstep((hex.cx / w - west) / westSpan)
  const size = clamp((hex.radius / HEX_UNIT - 0.32) / 1.6)
  const accent = hex.tint === 'slate' ? 1.12 : hex.finish === 'line' ? 0.92 : 1
  const t = clamp(copy * (0.2 + 0.8 * east) * (0.86 + 0.14 * size) * accent)
  return clamp(floor + (1 - floor) * t, floor, 1)
}

function isClipped(hex: HeroHex) {
  const { w, h } = HERO_HEX_FRAME
  return (
    hex.cx - hex.radius < 0 ||
    hex.cx + hex.radius > w ||
    hex.cy - hex.radius * HEX_ASPECT < 0 ||
    hex.cy + hex.radius * HEX_ASPECT > h
  )
}

function isLoud(hex: HeroHex) {
  return hex.radius / HEX_UNIT >= 1.15 || (hex.tint === 'slate' && hex.finish === 'fill')
}

function mobility(hex: HeroHex) {
  return 1 / (hex.radius * hex.radius)
}

function hexTop(hex: HeroHex) {
  return hex.cy - hex.radius * HEX_ASPECT
}

function hexBottom(hex: HeroHex) {
  return hex.cy + hex.radius * HEX_ASPECT
}

function nearbyHorizontally(a: HeroHex, b: HeroHex) {
  return Math.abs(a.cx - b.cx) < a.radius + b.radius + 72
}

function sharedBand(a: HeroHex, b: HeroHex, tol: number) {
  return (
    Math.abs(hexTop(a) - hexTop(b)) < tol ||
    Math.abs(hexBottom(a) - hexBottom(b)) < tol ||
    Math.abs(a.cy - b.cy) < tol
  )
}

function idHash(id: string) {
  let n = 2166136261
  for (let i = 0; i < id.length; i++) {
    n ^= id.charCodeAt(i)
    n = Math.imul(n, 16777619)
  }
  return n >>> 0
}

function inZone(hex: HeroHex, zone: ExclusionZone | null) {
  if (!zone || !isLoud(hex) || !hexHitsZone(hex, zone)) return false
  // Right-edge cells may clip the lockup and still belong in the crop.
  return hex.cx < HERO_HEX_FRAME.w * 0.78
}

function independentsOf(hexes: HeroHex[]) {
  return hexes.filter((hex) => !hex.parentId)
}

function childrenOf(hexes: HeroHex[], parentId: string) {
  return hexes.filter((hex) => hex.parentId === parentId)
}

function pairOk(
  hex: HeroHex,
  other: HeroHex,
  minGap: number,
  nestMin: number,
) {
  if (nestedPair(hex, other)) {
    const parent = hex.parentId ? other : hex
    const child = hex.parentId ? hex : other
    return containmentClearance(parent, child) >= nestMin
  }
  return classifyPair(hex, other, minGap) === 'gap' && outlineGap(hex, other) >= minGap
}

function relationsHold(
  hex: HeroHex,
  others: HeroHex[],
  minGap: number,
  nestMin: number,
) {
  for (const other of others) {
    if (other.id === hex.id) continue
    if (!pairOk(hex, other, minGap, nestMin)) return false
  }
  return true
}

export function canPlace(
  hex: HeroHex,
  placed: HeroHex[],
  minGap: number,
  nestMin: number,
) {
  return relationsHold(hex, placed, minGap, nestMin)
}

function alongLine(from: HeroHex, away: HeroHex, distance: number) {
  const dx = from.cx - away.cx
  const dy = from.cy - away.cy
  const len = Math.hypot(dx, dy) || 1
  return relocate(from, away.cx + (dx / len) * distance, away.cy + (dy / len) * distance)
}

function pushToGap(mobile: HeroHex, fixed: HeroHex, minGap: number, zone: ExclusionZone | null) {
  const base = Math.hypot(mobile.cx - fixed.cx, mobile.cy - fixed.cy) || 1
  for (let i = 1; i <= 24; i++) {
    let next = alongLine(mobile, fixed, base + 8 * i)
    if (next.cx < mobile.cx) {
      next = relocate(next, mobile.cx + Math.abs(next.cx - mobile.cx) * 0.35, next.cy)
    }
    if (inZone(next, zone)) continue
    if (outlineGap(next, fixed) >= minGap) return next
  }
  return null
}

function settleIndependent(
  hex: HeroHex,
  placed: HeroHex[],
  minGap: number,
  nestMin: number,
  zone: ExclusionZone | null,
): HeroHex | null {
  let current = hex

  for (let pass = 0; pass < 6; pass++) {
    let changed = false
    for (const other of placed) {
      if (nestedPair(current, other)) continue
      const kind = classifyPair(current, other, minGap)
      if (kind === 'gap' && outlineGap(current, other) >= minGap) continue

      const gapped = pushToGap(current, other, minGap, zone)
      if (!gapped) return null
      current = gapped
      changed = true
    }
    if (!changed) break
  }

  if (inZone(current, zone)) return null
  if (!canPlace(current, placed, minGap, nestMin)) return null
  return current
}

function tryPlace(
  hex: HeroHex,
  placed: HeroHex[],
  minGap: number,
  nestMin: number,
  zone: ExclusionZone | null,
): HeroHex | null {
  const homeX = hex.cx
  const homeY = hex.cy
  const tries: HeroHex[] = [hex]

  for (const dx of [0, 24, 48, 80, 112]) {
    for (const dy of [0, -28, 28, -56, 56, -88, 88]) {
      if (dx === 0 && dy === 0) continue
      tries.push(relocate(hex, homeX + dx, homeY + dy))
    }
  }

  tries.sort((a, b) => {
    const da = Math.hypot(a.cx - homeX, a.cy - homeY)
    const db = Math.hypot(b.cx - homeX, b.cy - homeY)
    return da - db
  })

  for (const next of tries) {
    if (inZone(next, zone)) continue
    const settled = settleIndependent(next, placed, minGap, nestMin, zone)
    if (settled) return settled
  }
  return null
}

function placeNested(
  parent: HeroHex,
  spec: HexNestSpec,
  nestMin: number,
): HeroHex | null {
  const scale = spec.scale
  let ox = spec.ox
  let oy = spec.oy

  for (let i = 0; i < 12; i++) {
    const child = makeHex(
      spec.id,
      parent.cx + ox * parent.radius,
      parent.cy + oy * parent.radius,
      scale,
      spec.depth,
      spec.tint,
      spec.finish ?? 'fill',
      parent.id,
    )
    if (containmentClearance(parent, child) >= nestMin) return child
    ox *= 0.82
    oy *= 0.82
  }
  return null
}

function separateHexes(
  hexes: HeroHex[],
  minGap: number,
  nestMin: number,
  zone: ExclusionZone | null,
): HeroHex[] {
  let out = hexes.map((hex) => relocate(hex, hex.cx, hex.cy))
  const hosts = independentsOf(out)

  for (let iter = 0; iter < 8; iter++) {
    let moved = false
    for (let i = 0; i < hosts.length; i++) {
      for (let j = i + 1; j < hosts.length; j++) {
        const a = out.find((hex) => hex.id === hosts[i].id)
        const b = out.find((hex) => hex.id === hosts[j].id)
        if (!a || !b) continue
        const gap = outlineGap(a, b)
        if (gap < 0 || gap >= minGap) continue

        const aPoly = outlinePolygon(a, 'outer')
        const bPoly = outlinePolygon(b, 'outer')
        const { axis } = convexGapAxis(aPoly, bPoly, a.cx, a.cy, b.cx, b.cy)
        const need = Math.min(minGap - gap, 12)
        const tot = mobility(a) + mobility(b) || 1

        const tryShift = (hex: HeroHex, dir: number) => {
          let dx = axis[0] * need * dir * (mobility(hex) / tot)
          const dy = axis[1] * need * dir * (mobility(hex) / tot)
          dx = dx < 0 ? dx * 0.12 : dx
          const next = relocate(hex, hex.cx + dx, hex.cy + dy)
          if (inZone(next, zone)) return 0
          const trial = moveHex(out, hex.id, dx, dy)
          const movedHex = trial.find((item) => item.id === hex.id)
          if (!movedHex) return 0
          const others = trial.filter((item) => item.id !== hex.id && item.parentId !== hex.id)
          if (!relationsHold(movedHex, others, minGap, nestMin)) return 0
          for (const child of childrenOf(trial, hex.id)) {
            if (!relationsHold(child, trial.filter((item) => item.id !== child.id), minGap, nestMin)) {
              return 0
            }
          }
          out = trial
          return 1
        }

        if (tryShift(a, -1) || tryShift(b, 1)) moved = true
      }
    }
    if (!moved) break
    for (let k = 0; k < hosts.length; k++) {
      const latest = out.find((hex) => hex.id === hosts[k].id)
      if (latest) hosts[k] = latest
    }
  }

  return out
}

function preferMobile(a: HeroHex, b: HeroHex) {
  const score = (hex: HeroHex) => {
    let n = 200 / hex.radius
    if (hex.finish === 'line') n += 30
    if (hex.parentId) n += 40
    if (hex.role === 'accent') n += 20
    return n
  }
  return score(a) >= score(b) ? a : b
}

function staggerAlignments(
  hexes: HeroHex[],
  minGap: number,
  nestMin: number,
  zone: ExclusionZone | null,
): HeroHex[] {
  let out = hexes.map((hex) => relocate(hex, hex.cx, hex.cy))
  const steps = [14, 22, 34, 50, 68]

  for (let iter = 0; iter < 10; iter++) {
    let moved = false
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        const a = out[i]
        const b = out[j]
        if (nestedPair(a, b)) continue
        if (!nearbyHorizontally(a, b) || !sharedBand(a, b, HEX_ALIGN_TOL)) continue

        const sign = idHash(a.id + ':' + b.id) % 2 === 0 ? 1 : -1
        const ordered = [...steps.map((n) => sign * n), ...steps.map((n) => -sign * n)]
        const mobileFirst = preferMobile(a, b)
        const ids = mobileFirst.id === a.id ? [a.id, b.id] : [b.id, a.id]

        pair: for (const mobileId of ids) {
          const mobile = out.find((hex) => hex.id === mobileId)
          if (!mobile || mobile.parentId) continue
          const other = mobileId === a.id ? b : a
          for (const dy of ordered) {
            if (inZone(relocate(mobile, mobile.cx, mobile.cy + dy), zone)) continue
            const trial = moveHex(out, mobile.id, 0, dy)
            const next = trial.find((hex) => hex.id === mobile.id)
            if (!next) continue
            if (!relationsHold(next, trial.filter((hex) => hex.id !== next.id), minGap, nestMin)) {
              continue
            }
            if (sharedBand(next, other, HEX_ALIGN_TOL)) continue
            out = trial
            moved = true
            break pair
          }
        }
      }
    }
    if (!moved) break
  }

  return out
}

function placeField(
  shrink: number,
  shiftX: number,
  bp: HexBreakpoint,
  zone: ExclusionZone,
  minGap: number,
  nestMin: number,
): { placed: HeroHex[]; generated: number; rejected: number } {
  const { w, h } = HERO_HEX_FRAME
  const placed: HeroHex[] = []
  let generated = 0
  let rejected = 0

  for (const spec of HEX_FIELD.cells) {
    if (!visibleAt(spec.at, bp)) continue
    generated += 1
    let hex = makeHex(
      spec.id,
      spec.nx * w + shiftX,
      spec.ny * h + (spec.lift ?? 0),
      spec.scale * shrink,
      spec.depth,
      spec.tint,
      spec.finish ?? 'fill',
    )

    if (inZone(hex, zone)) {
      let found: HeroHex | null = null
      for (const east of [28, 56, 88, 128, 176]) {
        const nudged = relocate(hex, hex.cx + east, hex.cy)
        if (!inZone(nudged, zone)) {
          found = nudged
          break
        }
      }
      if (!found) {
        rejected += 1
        continue
      }
      hex = found
    }

    const next = tryPlace(hex, placed, minGap, nestMin, zone)
    if (!next) {
      rejected += 1
      continue
    }
    placed.push(next)

    for (const nest of spec.nest ?? []) {
      if (!visibleAt(nest.at, bp)) continue
      generated += 1
      const child = placeNested(next, {
        ...nest,
        scale: nest.scale * shrink,
      }, nestMin)
      if (!child) {
        rejected += 1
        continue
      }
      placed.push(child)
    }
  }

  const separated = separateHexes(placed, minGap, nestMin, zone)
  const staggered = staggerAlignments(separated, minGap, nestMin, zone)
  return { placed: staggered, generated, rejected }
}

export function validateHexLayout(
  hexes: HeroHex[],
  minGap: number,
  nestMin: number,
): HexValidation {
  const violations: HexViolation[] = []

  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
      const a = hexes[i]
      const b = hexes[j]
      const kind = classifyPair(a, b, minGap)

      if (nestedPair(a, b)) {
        const parent = a.parentId ? b : a
        const child = a.parentId ? a : b
        const room = containmentClearance(parent, child)
        if (kind !== 'contain' || room < nestMin) {
          violations.push({ type: 'nest', a: parent.id, b: child.id, room, min: nestMin })
        }
        continue
      }

      if (kind === 'contain') {
        violations.push({ type: 'containment', a: a.id, b: b.id })
      } else if (kind === 'intersect') {
        violations.push({ type: 'overlap', a: a.id, b: b.id })
      } else if (kind === 'tangent') {
        violations.push({ type: 'tangent', a: a.id, b: b.id, gap: outlineGap(a, b) })
      } else {
        const gap = outlineGap(a, b)
        if (gap < minGap) {
          violations.push({ type: 'gap', a: a.id, b: b.id, gap, min: minGap })
        }
      }
    }
  }

  for (const hex of hexes) {
    if (hex.opacity + 1e-6 < HEX_FIELD.fade.floor) {
      violations.push({ type: 'opacity', id: hex.id, opacity: hex.opacity, min: HEX_FIELD.fade.floor })
    }
  }

  return { ok: violations.length === 0, violations }
}

function independentMinGap(hexes: HeroHex[]) {
  let min = Infinity
  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
      if (nestedPair(hexes[i], hexes[j])) continue
      const gap = outlineGap(hexes[i], hexes[j])
      if (gap < min) min = gap
    }
  }
  return Number.isFinite(min) ? min : null
}

function nestedCount(hexes: HeroHex[]) {
  return hexes.filter((hex) => hex.parentId).length
}

function alignmentCount(hexes: HeroHex[]) {
  let n = 0
  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
      if (nestedPair(hexes[i], hexes[j])) continue
      if (nearbyHorizontally(hexes[i], hexes[j]) && sharedBand(hexes[i], hexes[j], HEX_ALIGN_TOL)) {
        n += 1
      }
    }
  }
  return n
}

export function layoutHexes(
  zone: ExclusionZone | null,
  viewWidth: number = HERO_HEX_FRAME.w,
  screenScale = 1,
): HeroHex[] {
  if (!zone) {
    lastLayoutStats = emptyStats()
    return []
  }

  const bp = breakpointForWidth(viewWidth)
  const shrink = bp === 'mobile' ? 0.82 : bp === 'tablet' ? 0.92 : 1
  const shiftX = bp === 'mobile' ? 56 : bp === 'tablet' ? 22 : 0
  const targetGap = pxToView(HEX_TARGET_GAP, screenScale)
  const hardGap = pxToView(HEX_MIN_GAP, screenScale)
  const nestMin = pxToView(HEX_NEST_CLEARANCE, screenScale)

  const field = placeField(shrink, shiftX, bp, zone, targetGap, nestMin)
  const faded = field.placed.map((hex) => ({
    ...hex,
    opacity: composeOpacity(hex, zone),
  }))
  const validation = validateHexLayout(faded, hardGap, nestMin)
  const minGap = independentMinGap(faded)
  const opacities = faded.map((hex) => hex.opacity)

  lastLayoutStats = {
    generated: field.generated,
    placed: faded.length,
    rejected: field.rejected,
    clipped: faded.filter(isClipped).length,
    nested: nestedCount(faded),
    alignments: alignmentCount(faded),
    ids: faded.map((hex) => hex.id),
    minGapPx: minGap == null ? null : minGap * screenScale,
    minOpacity: opacities.length ? Math.min(...opacities) : null,
    targetGap,
    screenScale,
    zone: { x: zone.x, y: zone.y, w: zone.w, h: zone.h },
    validation,
  }

  if (import.meta.env.DEV) {
    ;(globalThis as { __hexLayout?: HexLayoutStats }).__hexLayout = lastLayoutStats
    if (!validation.ok) {
      console.warn('[hex layout]', validation.violations)
    }
  }

  return faded
}

export function layoutsEqual(a: HeroHex[], b: HeroHex[]) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const x = a[i]
    const y = b[i]
    if (
      x.id !== y.id ||
      x.radius !== y.radius ||
      x.cx !== y.cx ||
      x.cy !== y.cy ||
      x.depth !== y.depth ||
      x.tint !== y.tint ||
      x.finish !== y.finish ||
      x.parentId !== y.parentId ||
      x.opacity !== y.opacity
    ) {
      return false
    }
  }
  return true
}

const DEPTH_ORDER: Record<HexDepth, number> = {
  recessed: 0,
  field: 1,
  raised: 2,
}

export function paintOrder(a: HeroHex, b: HeroHex) {
  if (a.parentId === b.id) return 1
  if (b.parentId === a.id) return -1
  const size = b.radius - a.radius
  if (Math.abs(size) > 2) return size
  const finish = Number(a.finish === 'line') - Number(b.finish === 'line')
  if (finish) return finish
  return DEPTH_ORDER[a.depth] - DEPTH_ORDER[b.depth]
}
