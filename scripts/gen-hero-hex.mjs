import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const W = 1600
const H = 900
const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function flatHex(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * 60 * i
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  })
}

function poly(pts) {
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
}

const cells = [
  [1285, 118, 118],
  [1158, 78, 76],
  [1398, 210, 108],
  [1075, 188, 86],
  [1218, 268, 132],
  [1352, 348, 112],
  [968, 248, 58],
  [1108, 388, 120],
  [1268, 468, 142],
  [1412, 508, 96],
  [998, 478, 78],
  [864, 538, 54],
  [1148, 588, 112],
  [1322, 648, 128],
  [984, 648, 88],
  [1228, 758, 106],
  [1418, 728, 86],
  [898, 728, 50],
  [1074, 798, 72],
].sort((a, b) => a[1] + a[0] * 0.15 - (b[1] + b[0] * 0.15))

const ex = 14
const ey = 16
const parts = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" aria-hidden="true">`,
  `  <rect width="${W}" height="${H}" fill="#f4f3f0"/>`,
]

for (const [cx, cy, r] of cells) {
  const face = flatHex(cx, cy, r)
  const back = face.map(([x, y]) => [x + ex, y + ey])
  for (const i of [0, 1, 2]) {
    const a = face[i]
    const b = face[(i + 1) % 6]
    const c = back[(i + 1) % 6]
    const d = back[i]
    const fill = i === 0 ? '#ddd9d1' : i === 1 ? '#cfcac2' : '#e7e3dc'
    parts.push(`  <polygon points="${poly([a, b, c, d])}" fill="${fill}"/>`)
  }
  parts.push(
    `  <polygon points="${poly(face)}" fill="#fcfcfb" stroke="#d5d1ca" stroke-width="0.9" stroke-linejoin="round"/>`,
  )
}

parts.push(`</svg>`)
writeFileSync(join(root, 'public', 'hero-hex.svg'), `${parts.join('\n')}\n`)
console.log('wrote public/hero-hex.svg', cells.length, 'hexes')
