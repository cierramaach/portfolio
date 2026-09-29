from pathlib import Path

from PIL import Image, ImageFilter

src = Path(
  r'C:\Users\cierr\.cursor\projects\c-Users-cierr-OneDrive-Desktop-Cierra-Portfolio\assets\c__Users_cierr_AppData_Roaming_Cursor_User_workspaceStorage_bda54dfb2d561527795f0dbc22787831_images_64202ba0-7cc9-4d2d-a5ab-095134f8faaa-ae4b0453-089e-4ffd-85c7-cfedc461623c.jpg'
)
out = Path(r'C:\Users\cierr\OneDrive\Desktop\Cierra_Portfolio\public\hero-hex.jpg')

im = Image.open(src).convert('RGB')
w, h = im.size
top = int(h * 0.09)
left = int(w * 0.575)
crop = im.crop((left, top, w, h))
crop = crop.resize((crop.width * 3, crop.height * 3), Image.Resampling.LANCZOS)
crop = crop.filter(ImageFilter.UnsharpMask(radius=1.1, percent=85, threshold=2))
crop.save(out, quality=94, optimize=True)
print(im.size, '->', crop.size, out.stat().st_size)
