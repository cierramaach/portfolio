export const HERO_HEX_FRAME = { w: 1600, h: 900 } as const

/** Flat-top hex: vertex-to-vertex width `w`, flat-to-flat height `√3/2 w`. */
export const HEX_ASPECT = Math.sqrt(3) / 2

/**
 * Standard circumradius. Cell `scale` is a multiple of this.
 * Small 0.62–0.76 · medium 0.80–1.18 · large 1.58 · oversized 1.68–1.85
 */
export const HEX_UNIT = 80

/** Hard minimum outline-to-outline gap for hexes that are not touching, in CSS pixels. */
export const HEX_MIN_GAP = 30

/** Target outline-to-outline gap at the 1600 × 900 reference frame, in CSS pixels. */
export const HEX_TARGET_GAP = 36

/** Minimum overlap depth for an intentional intersection, in CSS pixels. */
export const HEX_CROSS_MIN = 16

/** Minimum protrusion through the other outline so a cut is not a nest. */
export const HEX_PROTRUDE_MIN = 22

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
export type HexOutline = 'silver' | 'foil'
export type HexBreakpoint = 'desktop' | 'tablet' | 'mobile'
export type HexPairKind = 'gap' | 'intersect' | 'contain' | 'tangent'
export type HexSurface =
  | 'paper'
  | 'agate'
  | 'gold'
  | 'marble'
  | 'cream'
  | 'swirl'
  | 'calacatta'
  | 'foil'

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
  surface: HexSurface
  outline: HexOutline
  opacity: number
  intersectIds: string[]
}

/** Public texture plates. Paper faces stay HEX_LOOK fills. */
export const HEX_SURFACE_SRC: Record<Exclude<HexSurface, 'paper'>, string> = {
  agate: '/hero/agate.jpg',
  gold: '/hero/gold.jpg',
  marble: '/hero/marble.jpg',
  cream: '/hero/cream.jpg',
  swirl: '/hero/swirl.jpg',
  calacatta: '/hero/calacatta.jpg',
  foil: '/hero/foil.jpg',
}

const HEX_SOLID_SURFACE = new Set<HexSurface>(['agate', 'gold', 'marble', 'calacatta'])

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

type HexCellSpec = {
  id: string
  nx: number
  ny: number
  lift?: number
  scale: number
  depth: HexDepth
  tint: HexTint
  finish?: HexFinish
  surface?: HexSurface
  outline?: HexOutline
  at?: readonly HexBreakpoint[]
  /** Other cell ids this hex should rim-cut. Never nested. */
  touch?: readonly string[]
}

/**
 * Art-directed east field.
 *
 * Large ivory anchors crop off the top, right, and bottom. Medium slate
 * and silver cells cut their rims. Mid-field forms step toward the type
 * as real hexes, not specks. Most hexes share an authored intersection.
 * None sit inside another. Independent neighbors keep a paper gap.
 * Fade floors at 50% opacity. Dark texture is authored, rare, and east-weighted:
 * marble for weight, agate for bite, gold for one or two jewels.
 * A few paper faces take quiet ivory marble. Line hexes and the large
 * south face stay as they are.
 */
export const HEX_FIELD = {
  fade: {
    floor: 0.5,
    range: 240,
    west: 0.56,
    westSpan: 0.32,
  },
  cells: [
    {
      id: 'north',
      nx: 0.93,
      ny: 0.07,
      scale: 1.82,
      depth: 'recessed',
      tint: 'ivory',
      surface: 'swirl',
    },
    {
      id: 'north-ghost',
      nx: 0.88,
      ny: -0.02,
      scale: 0.68,
      depth: 'field',
      tint: 'silver',
      finish: 'line',
      outline: 'foil',
      at: ['desktop'],
      touch: ['north'],
    },
    {
      id: 'north-cut',
      nx: 1.02,
      ny: 0.12,
      scale: 0.46,
      depth: 'raised',
      tint: 'ivory',
      finish: 'line',
      outline: 'foil',
      at: ['desktop', 'tablet'],
      touch: ['north'],
    },
    {
      id: 'north-arm',
      nx: 0.84,
      ny: 0.2,
      lift: -4,
      scale: 1.16,
      depth: 'raised',
      tint: 'ivory',
      surface: 'marble',
      at: ['desktop', 'tablet'],
      touch: ['north'],
    },
    {
      id: 'high-slate',
      nx: 0.99,
      ny: 0.26,
      lift: 4,
      scale: 0.96,
      depth: 'field',
      tint: 'slate',
      surface: 'cream',
      touch: ['north', 'north-cut'],
    },
    {
      id: 'high-taper',
      nx: 0.755,
      ny: 0.255,
      lift: 6,
      scale: 0.8,
      depth: 'recessed',
      tint: 'ivory',
      finish: 'line',
      outline: 'foil',
      at: ['desktop'],
      touch: ['north-arm'],
    },
    {
      id: 'high-step',
      nx: 0.86,
      ny: 0.36,
      scale: 0.88,
      depth: 'recessed',
      tint: 'ivory',
      surface: 'calacatta',
      at: ['desktop', 'tablet'],
      touch: ['north-arm'],
    },
    {
      id: 'fore',
      nx: 0.94,
      ny: 0.31,
      lift: 4,
      scale: 0.76,
      depth: 'recessed',
      tint: 'ivory',
      surface: 'agate',
      at: ['desktop', 'tablet'],
      touch: ['high-slate'],
    },
    {
      id: 'mid-step',
      nx: 0.75,
      ny: 0.43,
      lift: 4,
      scale: 0.9,
      depth: 'recessed',
      tint: 'ivory',
      at: ['desktop', 'tablet'],
      touch: ['west-taper'],
    },
    {
      id: 'mid-ghost',
      nx: 0.985,
      ny: 0.47,
      lift: -4,
      scale: 0.72,
      depth: 'field',
      tint: 'silver',
      finish: 'line',
      outline: 'foil',
      touch: ['east-cut'],
    },
    {
      id: 'west-taper',
      nx: 0.72,
      ny: 0.58,
      lift: 4,
      scale: 0.76,
      depth: 'recessed',
      tint: 'silver',
      at: ['desktop'],
      touch: ['mid-step'],
    },
    {
      id: 'east-cut',
      nx: 0.96,
      ny: 0.5,
      scale: 0.84,
      depth: 'raised',
      tint: 'silver',
      surface: 'marble',
      touch: ['south-cut'],
    },
    {
      id: 'south-cut',
      nx: 0.87,
      ny: 0.555,
      scale: 0.82,
      depth: 'recessed',
      tint: 'ivory',
      surface: 'cream',
      at: ['desktop'],
      touch: ['south'],
    },
    {
      id: 'south',
      nx: 0.84,
      ny: 0.7,
      lift: 1,
      scale: 1.58,
      depth: 'raised',
      tint: 'ivory',
      surface: 'calacatta',
      at: ['desktop', 'tablet'],
    },
    {
      id: 'south-arm',
      nx: 0.755,
      ny: 0.78,
      scale: 0.98,
      depth: 'field',
      tint: 'ivory',
      surface: 'marble',
      at: ['desktop', 'tablet'],
      touch: ['south'],
    },
    {
      id: 'low-slate',
      nx: 0.92,
      ny: 0.826,
      scale: 1.12,
      depth: 'field',
      tint: 'slate',
      surface: 'cream',
      touch: ['south', 'bottom'],
    },
    {
      id: 'low-taper',
      nx: 0.705,
      ny: 0.83,
      scale: 0.86,
      depth: 'recessed',
      tint: 'silver',
      outline: 'foil',
      at: ['desktop', 'tablet'],
      touch: ['south-arm'],
    },
    {
      id: 'high-pocket',
      nx: 0.658,
      ny: 0.742,
      lift: -5,
      scale: 0.46,
      depth: 'field',
      tint: 'ivory',
      surface: 'cream',
      at: ['desktop'],
      touch: ['west-taper'],
    },
    {
      id: 'high-rim',
      nx: 0.642,
      ny: 0.812,
      lift: 3,
      scale: 0.44,
      depth: 'field',
      tint: 'ivory',
      finish: 'line',
      at: ['desktop'],
      touch: ['low-taper'],
    },
    {
      id: 'high-dot',
      nx: 0.628,
      ny: 0.905,
      lift: -4,
      scale: 0.38,
      depth: 'recessed',
      tint: 'ivory',
      surface: 'swirl',
      at: ['desktop'],
      touch: ['low-taper'],
    },
    {
      id: 'field-anchor',
      nx: 0.608,
      ny: 0.738,
      lift: 2,
      scale: 0.96,
      depth: 'recessed',
      tint: 'ivory',
      at: ['desktop'],
      touch: ['high-pocket'],
    },
    {
      id: 'field-cut',
      nx: 0.592,
      ny: 0.855,
      lift: -3,
      scale: 0.7,
      depth: 'field',
      tint: 'ivory',
      surface: 'cream',
      at: ['desktop'],
      touch: ['field-anchor'],
    },
    {
      id: 'field-line',
      nx: 0.568,
      ny: 0.958,
      lift: 4,
      scale: 0.5,
      depth: 'field',
      tint: 'ivory',
      finish: 'line',
      at: ['desktop'],
      touch: ['field-cut'],
    },
    {
      id: 'bottom',
      nx: 0.86,
      ny: 1.06,
      scale: 1.68,
      depth: 'recessed',
      tint: 'ivory',
      surface: 'marble',
    },
    {
      id: 'bottom-cut',
      nx: 0.94,
      ny: 1.08,
      scale: 0.5,
      depth: 'raised',
      tint: 'silver',
      at: ['desktop', 'tablet'],
      touch: ['bottom'],
    },
    {
      id: 'low-nub',
      nx: 0.748,
      ny: 0.99,
      lift: 2,
      scale: 0.4,
      depth: 'field',
      tint: 'ivory',
      finish: 'line',
      at: ['desktop'],
      touch: ['bottom'],
    },
    {
      id: 'low-chip',
      nx: 0.692,
      ny: 0.958,
      lift: -3,
      scale: 0.36,
      depth: 'recessed',
      tint: 'ivory',
      surface: 'cream',
      at: ['desktop'],
      touch: ['bottom'],
    },
    {
      id: 'low-speck',
      nx: 0.805,
      ny: 1.145,
      scale: 0.34,
      depth: 'raised',
      tint: 'ivory',
      surface: 'swirl',
      at: ['desktop'],
      touch: ['bottom'],
    },
    {
      id: 'rim-ghost',
      nx: 1.01,
      ny: 0.88,
      lift: -2,
      scale: 0.42,
      depth: 'raised',
      tint: 'ivory',
      surface: 'gold',
      at: ['desktop', 'tablet'],
      touch: ['low-slate'],
    },
    {
      id: 'mid-fill',
      nx: 0.82,
      ny: 0.422,
      lift: 2,
      scale: 0.86,
      depth: 'recessed',
      tint: 'ivory',
      surface: 'agate',
      at: ['desktop'],
      touch: ['high-step', 'mid-step'],
    },
    {
      id: 'mid-fill-2',
      nx: 0.854,
      ny: 0.529,
      scale: 0.8,
      depth: 'field',
      tint: 'silver',
      surface: 'cream',
      at: ['desktop'],
      touch: ['south', 'south-cut', 'mid-fill'],
    },
  ] satisfies readonly HexCellSpec[],
} as const

const TOUCH = (() => {
  const map = new Map<string, Set<string>>()
  const add = (a: string, b: string) => {
    if (a === b) return
    if (!map.has(a)) map.set(a, new Set())
    if (!map.has(b)) map.set(b, new Set())
    map.get(a)!.add(b)
    map.get(b)!.add(a)
  }
  for (const spec of HEX_FIELD.cells) {
    for (const id of spec.touch ?? []) add(spec.id, id)
  }
  return map
})()

function shouldTouch(a: string, b: string) {
  return TOUCH.get(a)?.has(b) ?? false
}

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
 * Positive = fully contained. Negative = protrudes through the outline.
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

function linked(a: HeroHex, b: HeroHex) {
  return a.intersectIds.includes(b.id) || b.intersectIds.includes(a.id)
}

function link(a: HeroHex, b: HeroHex) {
  if (!a.intersectIds.includes(b.id)) a.intersectIds.push(b.id)
  if (!b.intersectIds.includes(a.id)) b.intersectIds.push(a.id)
}

export function classifyPair(
  a: HeroHex,
  b: HeroHex,
  minGap: number,
  minCross: number,
  minProtrude: number,
): HexPairKind {
  const insideA = containmentClearance(a, b)
  const insideB = containmentClearance(b, a)
  if (insideA >= 0 || insideB >= 0) return 'contain'

  const gap = outlineGap(a, b)
  if (gap >= minGap) return 'gap'
  if (gap > -minCross) return 'tangent'
  if (!outlinesCross(a, b)) return 'tangent'

  const poke = Math.min(-insideA, -insideB)
  if (poke < minProtrude) return 'tangent'
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
  surface: HexSurface = 'paper',
  outline: HexOutline = 'silver',
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
    surface: finish === 'line' ? 'paper' : surface,
    outline,
    opacity: 1,
    intersectIds: [],
  }
}

function relocate(hex: HeroHex, cx: number, cy: number): HeroHex {
  return { ...hex, cx, cy, intersectIds: [...hex.intersectIds] }
}

export type HexViolation =
  | { type: 'gap'; a: string; b: string; gap: number; min: number }
  | { type: 'overlap'; a: string; b: string }
  | { type: 'containment'; a: string; b: string }
  | { type: 'tangent'; a: string; b: string; gap: number }
  | { type: 'intersect'; a: string; b: string; kind: HexPairKind }
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
  intersections: number
  touching: number
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
    intersections: 0,
    touching: 0,
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
  if (HEX_SOLID_SURFACE.has(hex.surface)) return 1
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

/** Deterministic crop window so sibling faces never share the same sticker. */
export function textureWindow(hex: HeroHex) {
  const n = idHash(hex.id)
  const zoom = 1.58 + ((n % 92) / 100)
  const size = hex.w * zoom
  const slack = Math.max(size - hex.w, 1)
  const tx = ((n >>> 5) % 1000) / 999
  const ty = ((n >>> 15) % 1000) / 999
  return {
    x: hex.cx - size / 2 + (tx - 0.5) * slack * 0.92,
    y: hex.cy - size / 2 + (ty - 0.5) * slack * 0.92,
    size,
  }
}

function inZone(hex: HeroHex, zone: ExclusionZone | null) {
  if (!zone || !isLoud(hex) || !hexHitsZone(hex, zone)) return false
  return hex.cx < HERO_HEX_FRAME.w * 0.78
}

function pairOk(
  hex: HeroHex,
  other: HeroHex,
  minGap: number,
  minCross: number,
  minProtrude: number,
) {
  const kind = classifyPair(hex, other, minGap, minCross, minProtrude)
  if (shouldTouch(hex.id, other.id) || linked(hex, other)) return kind === 'intersect'
  return kind === 'gap' && outlineGap(hex, other) >= minGap
}

function relationsHold(
  hex: HeroHex,
  others: HeroHex[],
  minGap: number,
  minCross: number,
  minProtrude: number,
) {
  for (const other of others) {
    if (other.id === hex.id) continue
    if (!pairOk(hex, other, minGap, minCross, minProtrude)) return false
  }
  return true
}

export function canPlace(
  hex: HeroHex,
  placed: HeroHex[],
  minGap: number,
  minCross: number,
  minProtrude: number,
) {
  return relationsHold(hex, placed, minGap, minCross, minProtrude)
}

function alongLine(from: HeroHex, away: HeroHex, distance: number) {
  const dx = from.cx - away.cx
  const dy = from.cy - away.cy
  const len = Math.hypot(dx, dy) || 1
  return relocate(from, away.cx + (dx / len) * distance, away.cy + (dy / len) * distance)
}

function escapeContainment(
  inner: HeroHex,
  outer: HeroHex,
  minGap: number,
  minCross: number,
  minProtrude: number,
) {
  const base = Math.hypot(inner.cx - outer.cx, inner.cy - outer.cy) || 1
  for (let i = 1; i <= 28; i++) {
    const next = alongLine(inner, outer, base + 10 * i)
    const kind = classifyPair(outer, next, minGap, minCross, minProtrude)
    if (kind === 'intersect') return next
    if (kind === 'gap') return next
  }
  return null
}

function deepenCross(
  mobile: HeroHex,
  fixed: HeroHex,
  minGap: number,
  minCross: number,
  minProtrude: number,
) {
  const base = Math.hypot(mobile.cx - fixed.cx, mobile.cy - fixed.cy) || 1
  let last: HeroHex | null = null
  for (let i = 1; i <= 14; i++) {
    const next = alongLine(mobile, fixed, Math.max(8, base - 7 * i))
    const kind = classifyPair(next, fixed, minGap, minCross, minProtrude)
    if (kind === 'contain') return last
    if (kind === 'intersect') return next
    last = next
  }
  return last && classifyPair(last, fixed, minGap, minCross, minProtrude) === 'intersect'
    ? last
    : null
}

function pullToCross(
  mobile: HeroHex,
  fixed: HeroHex,
  minGap: number,
  minCross: number,
  minProtrude: number,
) {
  const gap = outlineGap(mobile, fixed)
  // Never yank a distant hex across the field.
  if (gap > 80) return null
  const base = Math.hypot(mobile.cx - fixed.cx, mobile.cy - fixed.cy) || 1
  let last: HeroHex | null = null
  for (let i = 1; i <= 18; i++) {
    const next = alongLine(mobile, fixed, Math.max(8, base - 8 * i))
    const kind = classifyPair(next, fixed, minGap, minCross, minProtrude)
    if (kind === 'contain') return last
    if (kind === 'intersect') return next
    last = next
  }
  return last && classifyPair(last, fixed, minGap, minCross, minProtrude) === 'intersect'
    ? last
    : null
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

function resolveAgainstPlaced(
  hex: HeroHex,
  placed: HeroHex[],
  minGap: number,
  minCross: number,
  minProtrude: number,
  zone: ExclusionZone | null,
): HeroHex | null {
  let current = hex

  for (let pass = 0; pass < 6; pass++) {
    let changed = false
    for (const other of placed) {
      const touch = shouldTouch(current.id, other.id)
      let kind = classifyPair(current, other, minGap, minCross, minProtrude)

      if (kind === 'contain') {
        const escaped = escapeContainment(current, other, minGap, minCross, minProtrude)
        if (!escaped) return null
        current = escaped
        kind = classifyPair(current, other, minGap, minCross, minProtrude)
        changed = true
      }

      if (touch) {
        if (kind === 'intersect') continue
        const crossed =
          kind === 'tangent' || outlineGap(current, other) < 0
            ? deepenCross(current, other, minGap, minCross, minProtrude)
            : pullToCross(current, other, minGap, minCross, minProtrude)
        if (!crossed || inZone(crossed, zone)) return null
        current = crossed
        changed = true
        continue
      }

      if (kind === 'gap' && outlineGap(current, other) >= minGap) continue
      const gapped = pushToGap(current, other, minGap, zone)
      if (!gapped) return null
      current = gapped
      changed = true
    }
    if (!changed) break
  }

  if (inZone(current, zone)) return null

  for (const other of placed) {
    const kind = classifyPair(current, other, minGap, minCross, minProtrude)
    const touch = shouldTouch(current.id, other.id)
    if (kind === 'contain' || kind === 'tangent') return null
    if (touch) {
      if (kind !== 'intersect') return null
      link(current, other)
    } else if (kind !== 'gap' || outlineGap(current, other) < minGap) {
      return null
    }
  }

  return current
}

function tryPlace(
  hex: HeroHex,
  placed: HeroHex[],
  minGap: number,
  minCross: number,
  minProtrude: number,
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
    const resolved = resolveAgainstPlaced(next, placed, minGap, minCross, minProtrude, zone)
    if (resolved) return resolved
  }
  return null
}

function separateHexes(
  hexes: HeroHex[],
  minGap: number,
  minCross: number,
  minProtrude: number,
  zone: ExclusionZone | null,
): HeroHex[] {
  const out = hexes.map((hex) => relocate(hex, hex.cx, hex.cy))

  for (let iter = 0; iter < 8; iter++) {
    let moved = false
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        const a = out[i]
        const b = out[j]
        if (linked(a, b) || shouldTouch(a.id, b.id)) continue
        const gap = outlineGap(a, b)
        if (gap >= minGap) continue

        const aPoly = outlinePolygon(a, 'outer')
        const bPoly = outlinePolygon(b, 'outer')
        const { axis } = convexGapAxis(aPoly, bPoly, a.cx, a.cy, b.cx, b.cy)
        const need = Math.min(minGap - gap, 12)
        const tot = mobility(a) + mobility(b) || 1

        const shift = (hex: HeroHex, dir: number) => {
          let dx = axis[0] * need * dir * (mobility(hex) / tot)
          const dy = axis[1] * need * dir * (mobility(hex) / tot)
          dx = dx < 0 ? dx * 0.12 : dx
          const next = relocate(hex, hex.cx + dx, hex.cy + dy)
          if (inZone(next, zone)) return hex
          if (!canPlace(next, out.filter((item) => item.id !== hex.id), minGap, minCross, minProtrude)) {
            return hex
          }
          return next
        }

        const nextA = shift(a, -1)
        const nextB = shift(b, 1)
        if (nextA !== a || nextB !== b) {
          out[i] = nextA
          out[j] = nextB
          moved = true
        }
      }
    }
    if (!moved) break
  }

  return out
}

function preferMobile(a: HeroHex, b: HeroHex) {
  const score = (hex: HeroHex) => {
    let n = 200 / hex.radius
    if (hex.finish === 'line') n += 30
    if (hex.role === 'accent') n += 20
    if (hex.intersectIds.length) n -= 15
    return n
  }
  return score(a) >= score(b) ? a : b
}

function staggerAlignments(
  hexes: HeroHex[],
  minGap: number,
  minCross: number,
  minProtrude: number,
  zone: ExclusionZone | null,
): HeroHex[] {
  const out = hexes.map((hex) => relocate(hex, hex.cx, hex.cy))
  const steps = [14, 22, 34, 50, 68]

  for (let iter = 0; iter < 10; iter++) {
    let moved = false
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        const a = out[i]
        const b = out[j]
        if (!nearbyHorizontally(a, b) || !sharedBand(a, b, HEX_ALIGN_TOL)) continue

        const sign = idHash(a.id + ':' + b.id) % 2 === 0 ? 1 : -1
        const ordered = [...steps.map((n) => sign * n), ...steps.map((n) => -sign * n)]
        const mobileFirst = preferMobile(a, b)
        const indices = mobileFirst.id === a.id ? [i, j] : [j, i]

        pair: for (const mobileIdx of indices) {
          const mobile = out[mobileIdx]
          const other = mobileIdx === i ? b : a
          for (const dy of ordered) {
            const next = relocate(mobile, mobile.cx, mobile.cy + dy)
            if (inZone(next, zone)) continue
            if (!relationsHold(next, out, minGap, minCross, minProtrude)) continue
            if (sharedBand(next, other, HEX_ALIGN_TOL)) continue
            out[mobileIdx] = next
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
  minCross: number,
  minProtrude: number,
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
      spec.surface ?? 'paper',
      spec.outline ?? 'silver',
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

    const next = tryPlace(hex, placed, minGap, minCross, minProtrude, zone)
    if (!next) {
      rejected += 1
      continue
    }
    placed.push(next)
  }

  const separated = separateHexes(placed, minGap, minCross, minProtrude, zone)
  const staggered = staggerAlignments(separated, minGap, minCross, minProtrude, zone)
  return { placed: staggered, generated, rejected }
}

export function validateHexLayout(
  hexes: HeroHex[],
  minGap: number,
  minCross: number,
  minProtrude: number,
): HexValidation {
  const violations: HexViolation[] = []

  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
      const a = hexes[i]
      const b = hexes[j]
      const kind = classifyPair(a, b, minGap, minCross, minProtrude)
      const isLink = linked(a, b) || shouldTouch(a.id, b.id)

      if (kind === 'contain') {
        violations.push({ type: 'containment', a: a.id, b: b.id })
        continue
      }

      if (isLink) {
        if (kind !== 'intersect') {
          violations.push({ type: 'intersect', a: a.id, b: b.id, kind })
        }
        continue
      }

      if (kind === 'intersect') {
        violations.push({ type: 'overlap', a: a.id, b: b.id })
      } else if (kind === 'tangent') {
        violations.push({ type: 'tangent', a: a.id, b: b.id, gap: outlineGap(a, b) })
      } else if (kind === 'gap') {
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
      if (linked(hexes[i], hexes[j])) continue
      const gap = outlineGap(hexes[i], hexes[j])
      if (gap < min) min = gap
    }
  }
  return Number.isFinite(min) ? min : null
}

function intersectionCount(hexes: HeroHex[]) {
  let n = 0
  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
      if (linked(hexes[i], hexes[j])) n += 1
    }
  }
  return n
}

function touchingCount(hexes: HeroHex[]) {
  return hexes.filter((hex) => hex.intersectIds.length > 0).length
}

function nestedCount(hexes: HeroHex[]) {
  let n = 0
  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
      if (containmentClearance(hexes[i], hexes[j]) >= 0) n += 1
      else if (containmentClearance(hexes[j], hexes[i]) >= 0) n += 1
    }
  }
  return n
}

function alignmentCount(hexes: HeroHex[]) {
  let n = 0
  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
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
  const minCross = pxToView(HEX_CROSS_MIN, screenScale)
  const minProtrude = pxToView(HEX_PROTRUDE_MIN, screenScale)

  const field = placeField(shrink, shiftX, bp, zone, targetGap, minCross, minProtrude)
  const faded = field.placed.map((hex) => {
    const blocked = hex.surface !== 'paper' && hexHitsZone(hex, zone)
    const next = blocked ? { ...hex, surface: 'paper' as const } : hex
    return { ...next, opacity: composeOpacity(next, zone) }
  })
  const validation = validateHexLayout(faded, hardGap, minCross, minProtrude)
  const minGap = independentMinGap(faded)
  const opacities = faded.map((hex) => hex.opacity)

  lastLayoutStats = {
    generated: field.generated,
    placed: faded.length,
    rejected: field.rejected,
    clipped: faded.filter(isClipped).length,
    intersections: intersectionCount(faded),
    touching: touchingCount(faded),
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
      x.surface !== y.surface ||
      x.outline !== y.outline ||
      x.opacity !== y.opacity
    ) {
      return false
    }
    if (x.intersectIds.length !== y.intersectIds.length) return false
    for (let k = 0; k < x.intersectIds.length; k++) {
      if (x.intersectIds[k] !== y.intersectIds[k]) return false
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
  const size = b.radius - a.radius
  if (Math.abs(size) > 2) return size
  const finish = Number(a.finish === 'line') - Number(b.finish === 'line')
  if (finish) return finish
  return DEPTH_ORDER[a.depth] - DEPTH_ORDER[b.depth]
}
