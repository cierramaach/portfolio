from pathlib import Path

from PIL import Image

src = Path(r'C:\Users\cierr\OneDrive\Desktop\Cierra_Portfolio\public\coe\index-experience.jpg')
out = Path(r'C:\Users\cierr\OneDrive\Desktop\Cierra_Portfolio\public\coe\index-experience-earth.jpg')

im = Image.open(src)
w, h = im.size
# Zoom on the globe. Original earth sits in the middle with large black field.
cw = int(w * 0.42)
ch = int(cw * 2 / 3)
cx = w // 2
cy = int(h * 0.53)
left = max(0, cx - cw // 2)
top = max(0, cy - ch // 2)
right = min(w, left + cw)
bottom = min(h, top + ch)
crop = im.crop((left, top, right, bottom))
crop.save(out, 'JPEG', quality=92, optimize=True)
print('src', im.size, 'crop', crop.size, 'box', (left, top, right, bottom))
