"""Rebuild the game images from the best source on this machine.

Lossless originals (game repos) are re-encoded at high quality; every image also gets a
960px variant for srcset. Run: python scripts/images.py
"""
import os, glob
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'public', 'games')
SK = r'C:\Users\chris\Desktop\SpareKnight\SpareKnight'
IWBA = r'C:\Users\chris\Documents\i-wont-be-abducted'

# published path -> lossless original
ORIGINALS = {
    'spare-knight/camp.webp': os.path.join(SK, 'assets', 'tiles', 'backgrounds', 'bg_camp.png'),
    'spare-knight/act1.webp': os.path.join(SK, 'assets', 'tiles', 'backgrounds', 'bg_combat_act1.png'),
    'spare-knight/combat-act2.webp': os.path.join(SK, 'assets', 'tiles', 'backgrounds', 'bg_combat_act2.png'),
    'i-wont-be-abducted/cover.webp': os.path.join(IWBA, 'assets', 'backgrounds', 'cover.png'),
}
MAX_W = 2400
SMALL_W = 960

def save(im, path, q):
    im.save(path, 'WEBP', quality=q, method=6)

for rel, src in ORIGINALS.items():
    if not os.path.exists(src):
        print('missing original, kept as is:', rel); continue
    im = Image.open(src).convert('RGB')
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    out = os.path.join(PUB, rel.replace('/', os.sep))
    save(im, out, 90)
    print(rel, im.size, os.path.getsize(out) // 1024, 'KB')

for f in sorted(glob.glob(os.path.join(PUB, '*', '*.webp'))):
    if f.endswith('-960.webp'): continue
    im = Image.open(f).convert('RGB')
    if im.width <= SMALL_W: continue
    small = im.resize((SMALL_W, round(im.height * SMALL_W / im.width)), Image.LANCZOS)
    save(small, f[:-5] + '-960.webp', 84)

# Cog: idle and walk frames into two horizontal sprite sheets.
cog = os.path.join(SK, 'assets', 'sprites', 'cog')
for kind, n in (('idle', 8), ('walk', 7)):
    frames = [Image.open(os.path.join(cog, f'cog_{kind}_{i:02d}.png')).convert('RGBA') for i in range(n)]
    w, h = frames[0].size
    sheet = Image.new('RGBA', (w * n, h), (0, 0, 0, 0))
    for i, fr in enumerate(frames):
        sheet.paste(fr, (i * w, 0))
    out = os.path.join(ROOT, 'public', 'mascot', f'cog-{kind}.webp')
    sheet.save(out, 'WEBP', quality=92, method=6)
    print(kind, sheet.size, os.path.getsize(out) // 1024, 'KB')
