import math
from pathlib import Path

from PIL import Image, ImageDraw

W, H = 1600, 1350
PAPER = (244, 243, 240)
FACE = (255, 255, 254)
SIDE_R = (196, 190, 181)
SIDE_B = (176, 170, 162)
ROOT = Path(r'C:\Users\cierr\OneDrive\Desktop\Cierra_Portfolio')
OUT = ROOT / 'public' / 'hero-hex.png'
TILE_DIR = ROOT / 'public' / 'hero-hex'
DATA = ROOT / 'src' / 'data' / 'heroHex.ts'

def hex_pts(cx, cy, r):
    return [
        (cx + r * math.cos(math.radians(60 * i)), cy + r * math.sin(math.radians(60 * i)))
        for i in range(6)
    ]

def draw_prism_solid(draw, cx, cy, r):
    depth = max(12, r * 0.16)
    face = hex_pts(cx, cy, r)
    back = [(x + depth * 0.48, y + depth) for x, y in face]
    for i, fill in ((0, SIDE_R), (1, SIDE_B), (2, SIDE_R)):
        a, b = face[i], face[(i + 1) % 6]
        c, d = back[(i + 1) % 6], back[i]
        draw.polygon([a, b, c, d], fill=fill)
    draw.polygon(face, fill=FACE)

def prism_bbox(cx, cy, r, pad=6):
    depth = max(12, r * 0.16)
    face = hex_pts(cx, cy, r)
    back = [(x + depth * 0.48, y + depth) for x, y in face]
    xs = [p[0] for p in face + back]
    ys = [p[1] for p in face + back]
    return (
        math.floor(min(xs) - pad),
        math.floor(min(ys) - pad),
        math.ceil(max(xs) + pad),
        math.ceil(max(ys) + pad),
    )

# delay / move / fade are seconds. Right-side and bleed tiles start first;
# larger prisms take longer to settle; left cluster near type lands last.
cells = [
    {'id': 'h00', 'cx': 180, 'cy': 330, 'r': 72, 'delay': 0.41, 'move': 1.23, 'fade': 1.04},
    {'id': 'h01', 'cx': 300, 'cy': 140, 'r': 84, 'delay': 0.31, 'move': 1.24, 'fade': 1.08},
    {'id': 'h02', 'cx': 450, 'cy': 680, 'r': 90, 'delay': 0.36, 'move': 1.32, 'fade': 1.12},
    {'id': 'h03', 'cx': 700, 'cy': 420, 'r': 78, 'delay': 0.21, 'move': 1.00, 'fade': 0.88},
    {'id': 'h04', 'cx': 960, 'cy': 280, 'r': 86, 'delay': 0.17, 'move': 1.14, 'fade': 1.00},
    {'id': 'h05', 'cx': 1480, 'cy': 780, 'r': 70, 'delay': 0.00, 'move': 0.86, 'fade': 0.72},
    {'id': 'h06', 'cx': 410, 'cy': -48, 'r': 92, 'delay': 0.28, 'move': 0.96, 'fade': 0.85},
    {'id': 'h07', 'cx': 680, 'cy': -62, 'r': 118, 'delay': 0.19, 'move': 1.08, 'fade': 0.92},
    {'id': 'h08', 'cx': 1080, 'cy': -78, 'r': 148, 'delay': 0.10, 'move': 1.05, 'fade': 0.92},
    {'id': 'h09', 'cx': 1420, 'cy': -55, 'r': 88, 'delay': 0.06, 'move': 0.94, 'fade': 0.80},
    {'id': 'h10', 'cx': 290, 'cy': 470, 'r': 152, 'delay': 0.42, 'move': 1.30, 'fade': 1.12},
    {'id': 'h11', 'cx': 380, 'cy': 820, 'r': 176, 'delay': 0.38, 'move': 1.36, 'fade': 1.15},
    {'id': 'h12', 'cx': 790, 'cy': -20, 'r': 204, 'delay': 0.11, 'move': 1.37, 'fade': 1.16},
    {'id': 'h13', 'cx': 165, 'cy': 1120, 'r': 168, 'delay': 0.46, 'move': 1.34, 'fade': 1.14},
    {'id': 'h14', 'cx': 1360, 'cy': 520, 'r': 268, 'delay': 0.14, 'move': 1.48, 'fade': 1.22},
    {'id': 'h15', 'cx': 1120, 'cy': 980, 'r': 222, 'delay': 0.24, 'move': 1.46, 'fade': 1.20},
    {'id': 'h16', 'cx': 1540, 'cy': -35, 'r': 198, 'delay': 0.05, 'move': 1.55, 'fade': 1.28},
]

ordered = sorted(cells, key=lambda cell: cell['r'])

rgb = Image.new('RGB', (W, H), PAPER)
draw = ImageDraw.Draw(rgb)
for cell in ordered:
    draw_prism_solid(draw, cell['cx'], cell['cy'], cell['r'])
rgb.save(OUT, 'PNG', optimize=True)

TILE_DIR.mkdir(parents=True, exist_ok=True)
tiles = []
for z, cell in enumerate(ordered, start=1):
    x0, y0, x1, y1 = prism_bbox(cell['cx'], cell['cy'], cell['r'])
    tw, th = x1 - x0, y1 - y0
    tile = Image.new('RGBA', (tw, th), (0, 0, 0, 0))
    draw_prism_solid(ImageDraw.Draw(tile), cell['cx'] - x0, cell['cy'] - y0, cell['r'])
    path = TILE_DIR / f"{cell['id']}.png"
    tile.save(path, 'PNG', optimize=True)
    tiles.append({**cell, 'x': x0, 'y': y0, 'w': tw, 'h': th, 'z': z})

lines = [
    'export const HERO_HEX_FRAME = { w: 1600, h: 1350 } as const',
    '',
    'export const HERO_HEXES = [',
]
for tile in tiles:
    lines.append(
        '  {'
        f" id: '{tile['id']}',"
        f" src: '/hero-hex/{tile['id']}.png?v=32',"
        f" x: {tile['x']},"
        f" y: {tile['y']},"
        f" w: {tile['w']},"
        f" h: {tile['h']},"
        f" z: {tile['z']},"
        f" delay: {tile['delay']:.2f},"
        f" move: {tile['move']:.2f},"
        f" fade: {tile['fade']:.2f}"
        ' },'
    )
lines.append('] as const')
lines.append('')
DATA.write_text('\n'.join(lines), encoding='utf-8')

print('wrote', OUT, 'and', len(tiles), 'tiles')
for tile in tiles:
    land = tile['delay'] + tile['move']
    print(
        f"{tile['id']} z{tile['z']:02d} delay {tile['delay']:.2f}s "
        f"move {tile['move']:.2f}s land {land:.2f}s"
    )
