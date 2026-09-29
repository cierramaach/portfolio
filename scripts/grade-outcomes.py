"""Grade the two interview stills onto one cohesive look.

Soft masks only — no hard pixel classification — so edges stay clean.
Both frames share one deep navy field. Skin is matched last.
"""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

import numpy as np

ROOT = Path(__file__).resolve().parents[1] / "public" / "studio"

# Deep royal navy — the field that already looked right on the front frame.
TARGET_CYC = np.array([18.0, 34.0, 86.0], dtype=np.float32)
TARGET_SKIN = np.array([170.0, 136.0, 122.0], dtype=np.float32)


def arr(image: Image.Image) -> np.ndarray:
    return np.asarray(image.convert("RGB"), dtype=np.float32)


def image_from(a: np.ndarray) -> Image.Image:
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), "RGB")


def blur_mask(mask: np.ndarray, radius: float) -> np.ndarray:
    plane = Image.fromarray(np.clip(mask * 255, 0, 255).astype(np.uint8), "L")
    plane = plane.filter(ImageFilter.GaussianBlur(radius=radius))
    return np.asarray(plane, dtype=np.float32) / 255.0


def blur_rgb(a: np.ndarray, radius: float) -> np.ndarray:
    return arr(image_from(a).filter(ImageFilter.GaussianBlur(radius=radius)))


def ellipse_outside(
    shape: tuple[int, int],
    cx: float,
    cy: float,
    rx: float,
    ry: float,
) -> np.ndarray:
    h, w = shape
    ys, xs = np.ogrid[:h, :w]
    dist = np.sqrt(((xs / w - cx) / rx) ** 2 + ((ys / h - cy) / ry) ** 2)
    return blur_mask(np.clip((dist - 0.72) / 0.5, 0.0, 1.0), 42)


def backdrop_mask(
    a: np.ndarray,
    cx: float,
    cy: float,
    rx: float,
    ry: float,
) -> np.ndarray:
    r, g, b = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    blue_lead = np.clip((b - np.maximum(r, g)) / 55.0, 0.0, 1.0)
    dark = np.clip((95.0 - luma) / 95.0, 0.0, 1.0)
    outside = ellipse_outside(a.shape[:2], cx, cy, rx, ry)
    raw = np.clip(np.maximum(blue_lead, outside * np.maximum(dark, blue_lead)), 0.0, 1.0)
    return blur_mask(raw, 48)


def face_mean(a: np.ndarray, box: tuple[float, float, float, float]) -> np.ndarray:
    h, w, _ = a.shape
    x0, y0, x1, y1 = box
    crop = a[int(h * y0) : int(h * y1), int(w * x0) : int(w * x1)]
    r, g, b = crop[:, :, 0], crop[:, :, 1], crop[:, :, 2]
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    skin = (r > g) & (g > b * 0.7) & (luma > 68) & (luma < 222)
    if int(skin.sum()) < 80:
        return crop.reshape(-1, 3).mean(axis=0)
    return crop[skin].mean(axis=0)


def grade_cyc(
    a: np.ndarray,
    mask: np.ndarray,
    fill: float,
    crush: float,
    soften: float,
) -> np.ndarray:
    w = mask[..., None]
    luma = (0.2126 * a[:, :, 0] + 0.7152 * a[:, :, 1] + 0.0722 * a[:, :, 2])[..., None]
    mean = (a * w).sum(axis=(0, 1)) / (w.sum() + 1e-5)
    scale = np.where(mean > 4.0, TARGET_CYC / mean, 1.0)
    scaled = a * scale
    filled = a * (1.0 - fill) + TARGET_CYC * fill
    void = np.clip((70.0 - luma) / 70.0, 0.0, 1.0)
    glow = np.clip((luma - 40.0) / 130.0, 0.0, 1.0)
    mixed = filled * void + scaled * (1.0 - void)
    mixed = mixed * (1.0 - glow * crush)
    delta = (mixed - a) * w
    if soften:
        delta = blur_rgb(delta, soften)
    return a + delta


def grade_skin(
    a: np.ndarray,
    mask: np.ndarray,
    box: tuple[float, float, float, float],
    strength: float,
) -> np.ndarray:
    subject = (1.0 - mask)[..., None]
    current = face_mean(a, box)
    current_l = 0.2126 * current[0] + 0.7152 * current[1] + 0.0722 * current[2]
    target_l = 0.2126 * TARGET_SKIN[0] + 0.7152 * TARGET_SKIN[1] + 0.0722 * TARGET_SKIN[2]
    chroma = TARGET_SKIN * (current_l / (target_l + 1e-5))
    print(f"  skin {np.round(current, 1)} -> {np.round(chroma, 1)}")
    return a + (chroma - current) * strength * subject


def finish(a: np.ndarray, sat: float, contrast: float, brightness: float) -> np.ndarray:
    image = image_from(a)
    image = ImageEnhance.Color(image).enhance(sat)
    image = ImageEnhance.Contrast(image).enhance(contrast)
    image = ImageEnhance.Brightness(image).enhance(brightness)
    return arr(image)


def run() -> None:
    front = arr(Image.open(ROOT / "outcome-front-raw.jpg"))
    three = arr(Image.open(ROOT / "outcome-three-raw.jpg"))

    front_mask = backdrop_mask(front, 0.50, 0.46, 0.28, 0.48)
    three_mask = backdrop_mask(three, 0.40, 0.46, 0.30, 0.50)

    front = grade_cyc(front, front_mask, fill=0.40, crush=0.52, soften=0)
    three = grade_cyc(three, three_mask, fill=0.78, crush=0.10, soften=8)

    front = finish(front, sat=0.84, contrast=1.04, brightness=0.94)
    three = finish(three, sat=0.86, contrast=1.02, brightness=1.06)

    front = grade_skin(front, front_mask, (0.36, 0.14, 0.64, 0.58), 0.48)
    three = grade_skin(three, three_mask, (0.28, 0.12, 0.62, 0.62), 0.80)

    image_from(front).save(ROOT / "outcome-front.jpg", quality=93)
    image_from(three).save(ROOT / "outcome-three.jpg", quality=93)


if __name__ == "__main__":
    run()
