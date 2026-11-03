"""Usage: python3 scripts/generate-hero-images.py public/hero  (requires Pillow and numpy)

Generate brand-styled hero artwork in a dark and a light variant (blue -> violet accents).
Writes <name>.jpg (dark) and <name>-light.jpg (light). Visual weight sits on the right so the
slider's text on the left stays readable."""
import math
import random
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

OUT = sys.argv[1]
W, H, S = 2400, 1350, 2  # draw at 2x, downsample for anti-aliasing
WS, HS = W * S, H * S

BLUE = (59, 130, 246)
VIOLET = (139, 92, 246)
CYAN = (34, 211, 238)
GREEN = (16, 185, 129)
RED = (244, 63, 94)
WHITE = (255, 255, 255)
NAVY = (30, 27, 75)

DARK = True  # set per render


def mix(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def scale(c, k):
    return tuple(max(0, min(255, int(v * k))) for v in c)


def T(dark, light):
    return dark if DARK else light


def tint(c, k):
    """A dim version of c: darker on dark backgrounds, paler on light ones."""
    return scale(c, k) if DARK else mix(c, WHITE, 1 - k)


def P(x, y):
    return (x * S, y * S)


def layer():
    img = Image.new("RGBA", (WS, HS), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def background(cx, cy, dark_tint, light_tint=(222, 226, 255)):
    base_col = T((3, 7, 18), (248, 250, 252))
    glow_col = T(dark_tint, light_tint)
    size = int(WS * 1.3)
    g = ImageOps.invert(Image.radial_gradient("L").resize((size, size)))
    g = g.point(lambda v: int((v / 255) ** 2.2 * 255))
    mask = Image.new("L", (WS, HS), 0)
    mask.paste(g, (int(cx * S - size / 2), int(cy * S - size / 2)))
    img = Image.composite(Image.new("RGB", (WS, HS), glow_col), Image.new("RGB", (WS, HS), base_col), mask)
    return np.asarray(img).astype(np.float32) / 255


def glow(base, lay, radius=18, strength=1.0):
    """Composite an RGBA layer with a soft halo: additive light on dark, coloured haze on light."""
    a = np.asarray(lay).astype(np.float32) / 255
    rgb, alpha = a[..., :3], a[..., 3:4]
    pre = rgb * alpha
    pre_img = Image.fromarray((pre * 255).astype(np.uint8))
    a_img = Image.fromarray((alpha[..., 0] * 255).astype(np.uint8))
    r = max(1, radius * S)
    bpre = np.asarray(pre_img.filter(ImageFilter.GaussianBlur(r))).astype(np.float32) / 255
    ba = np.asarray(a_img.filter(ImageFilter.GaussianBlur(r))).astype(np.float32)[..., None] / 255
    if DARK:
        halo = np.clip(bpre * strength, 0, 1)
        out = 1 - (1 - base) * (1 - halo)
        out = 1 - (1 - out) * (1 - pre)
    else:
        color = np.divide(bpre, ba, out=np.zeros_like(bpre), where=ba > 1e-4)
        ha = np.clip(ba * strength * 0.45, 0, 1)
        out = base * (1 - ha) + color * ha
        out = out * (1 - alpha) + rgb * alpha
    return out


def flat(base, lay):
    return glow(base, lay, radius=0, strength=0) if not DARK else 1 - (1 - base) * (1 - _pre(lay))


def _pre(lay):
    a = np.asarray(lay).astype(np.float32) / 255
    return a[..., :3] * a[..., 3:4]


def grid(base, x0, spacing=80, alpha=10):
    lay, d = layer()
    c = T((255, 255, 255, alpha), (15, 23, 42, int(alpha * 1.3)))
    for x in range(int(x0), W, spacing):
        d.line([P(x, 0), P(x, H)], fill=c, width=S)
    for y in range(0, H, spacing):
        d.line([P(x0, y), P(W, y)], fill=c, width=S)
    # fade the grid out toward the left
    fade = ImageOps.invert(Image.linear_gradient("L").rotate(90).resize((WS, HS)))
    la = np.asarray(lay).astype(np.float32)
    la[..., 3] *= np.asarray(fade).astype(np.float32) / 255
    return glow(base, Image.fromarray(la.astype(np.uint8)), radius=0, strength=0)


def save(arr, name):
    img = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8)).resize((W, H), Image.LANCZOS)
    suffix = "" if DARK else "-light"
    img.save(f"{OUT}/{name}{suffix}.jpg", quality=88, optimize=True, progressive=True)
    print("wrote", name + suffix)


# 1. Capital markets: candlestick uptrend ---------------------------------------------------
def markets():
    random.seed(21)
    img = background(1700, 620, (12, 34, 64), (214, 236, 255))
    img = grid(img, 800, 90, alpha=14)
    x0, x1, n = 900, 2320, 52
    step = (x1 - x0) / n
    price = 100.0
    candles = []
    for i in range(n):
        o = price
        drift = 0.55 + (0.9 if 30 < i < 40 else 0)
        c = o + random.gauss(drift, 2.6)
        hi = max(o, c) + abs(random.gauss(0, 1.4))
        lo = min(o, c) - abs(random.gauss(0, 1.4))
        candles.append((o, hi, lo, c))
        price = c
    lo_all = min(c[2] for c in candles)
    hi_all = max(c[1] for c in candles)
    top, bot = 230, 1000

    def Y(v):
        return bot - (v - lo_all) / (hi_all - lo_all) * (bot - top)

    ma = []
    for i in range(n):
        win = [candles[j][3] for j in range(max(0, i - 6), i + 1)]
        ma.append((x0 + i * step + step / 2, Y(sum(win) / len(win))))

    # soft area under the moving average, fading downward
    area, d = layer()
    d.polygon([P(*p) for p in ma] + [P(ma[-1][0], bot + 40), P(ma[0][0], bot + 40)], fill=VIOLET + (T(34, 40),))
    aa = np.asarray(area).astype(np.float32)
    aa[..., 3] *= 1 - np.asarray(Image.linear_gradient("L").resize((WS, HS))).astype(np.float32) / 255
    img = glow(img, Image.fromarray(aa.astype(np.uint8)).filter(ImageFilter.GaussianBlur(4 * S)), 0, 0)

    random.seed(5)
    cl, d = layer()
    for i, (o, hi, lo, c) in enumerate(candles):
        x = x0 + i * step + step / 2
        col = GREEN if c >= o else RED
        k = 0.55 + 0.45 * (i / n)
        col = scale(col, k) if DARK else mix(col, WHITE, (1 - k) * 0.6)
        d.line([P(x, Y(hi)), P(x, Y(lo))], fill=col + (255,), width=2 * S)
        w = step * 0.32
        y1, y2 = sorted([Y(o), Y(c)])
        d.rectangle([P(x - w, y1), P(x + w, max(y2, y1 + 3))], fill=col + (255,))
        vh = random.uniform(20, 110) * (1.6 if 30 < i < 40 else 1)
        d.rectangle([P(x - w, 1180 - vh), P(x + w, 1180)], fill=tint(col, 0.35) + (255,))
    img = glow(img, cl, 8, 0.8)

    line, d = layer()
    for i in range(len(ma) - 1):
        d.line([P(*ma[i]), P(*ma[i + 1])], fill=mix(BLUE, VIOLET, i / n) + (255,), width=4 * S)
    lx, ly = ma[-1]
    d.ellipse([P(lx - 9, ly - 9), P(lx + 9, ly + 9)], fill=T(WHITE, VIOLET) + (255,))
    img = glow(img, line, 16, 1.8)

    tag, d = layer()
    d.line([P(x0 - 40, ly), P(W, ly)], fill=tint(GREEN, 0.35) + (255,), width=S)
    d.rounded_rectangle([P(2240, ly - 22), P(2380, ly + 22)], radius=8 * S, fill=T(scale(GREEN, 0.85), GREEN) + (255,))
    img = glow(img, tag, 0, 0)
    save(img, "markets")


# 2. Cloud & security: isometric platform stack with shield ---------------------------------
def cloud():
    random.seed(3)
    cx, cy = 1700, 760
    img = background(cx, cy - 80, (20, 22, 72), (230, 224, 255))
    u = 270
    cos30, sin30 = math.cos(math.radians(30)), 0.5

    def iso(x, y, z):
        return (cx + (x - y) * cos30 * u, cy + (x + y) * sin30 * u - z * u)

    tr, d = layer()
    for _ in range(60):
        x, y = random.uniform(-2.6, 2.6), random.uniform(-2.6, 2.6)
        if abs(x) < 1.15 and abs(y) < 1.15:
            continue
        pts = [(x, y)]
        for _ in range(random.randint(2, 4)):
            if random.random() < 0.5:
                x += random.choice([-1, 1]) * random.uniform(0.2, 0.7)
            else:
                y += random.choice([-1, 1]) * random.uniform(0.2, 0.7)
            pts.append((x, y))
        col = tint(random.choice([BLUE, VIOLET, CYAN]), random.uniform(0.25, 0.6)) + (255,)
        d.line([P(*iso(px, py, -0.15)) for px, py in pts], fill=col, width=2 * S)
        ex, ey = iso(*pts[-1], -0.15)
        d.ellipse([P(ex - 4, ey - 4), P(ex + 4, ey + 4)], fill=col)
    img = glow(img, tr, 6, 1.0)

    for zc, colr in [(0.0, BLUE), (0.42, mix(BLUE, VIOLET, 0.5)), (0.84, VIOLET)]:
        slab, d = layer()
        a, th = 1.0, 0.1
        top = [iso(-a, -a, zc + th), iso(a, -a, zc + th), iso(a, a, zc + th), iso(-a, a, zc + th)]
        bottom = [iso(-a, -a, zc), iso(a, -a, zc), iso(a, a, zc), iso(-a, a, zc)]
        op = T(255, 235)
        d.polygon([P(*p) for p in [top[1], top[2], bottom[2], bottom[1]]], fill=tint(colr, 0.12 if DARK else 0.4) + (op,))
        d.polygon([P(*p) for p in [top[2], top[3], bottom[3], bottom[2]]], fill=tint(colr, 0.08 if DARK else 0.3) + (op,))
        d.polygon([P(*p) for p in top], fill=tint(colr, 0.22) + (op,))
        d.line([P(*p) for p in top + [top[0]]], fill=colr + (255,), width=3 * S)
        d.line([P(*top[1]), P(*bottom[1]), P(*bottom[2]), P(*bottom[3]), P(*top[3])], fill=tint(colr, 0.7) + (255,), width=2 * S)
        d.line([P(*top[2]), P(*bottom[2])], fill=tint(colr, 0.7) + (255,), width=2 * S)
        for gx in [-0.5, 0, 0.5]:
            for gy in [-0.5, 0, 0.5]:
                px, py = iso(gx, gy, zc + th)
                d.ellipse([P(px - 5, py - 3), P(px + 5, py + 3)], fill=T(scale(WHITE, 0.7), colr) + (255,))
        img = glow(img, slab, 14, 1.1)

    beams, d = layer()
    for gx, gy in [(-0.5, 0.5), (0.5, -0.5), (0.5, 0.5)]:
        x1, y1 = iso(gx, gy, 0.1)
        x2, y2 = iso(gx, gy, 1.7)
        d.line([P(x1, y1), P(x2, y2)], fill=tint(CYAN, 0.6 if DARK else 0.9) + (255,), width=2 * S)
    img = glow(img, beams, 10, 1.4)

    sh, d = layer()
    sx, sy = iso(0, 0, 1.55)
    w, h = 120, 150
    shield = []
    for t in [i / 40 for i in range(41)]:
        shield.append((sx - w + 2 * w * t, sy - h * 0.55 - 18 * math.sin(math.pi * t)))
    for t in [i / 40 for i in range(41)]:
        ang = math.pi * t
        shield.append((sx + w * math.cos(ang), sy + h * 0.05 + h * 0.85 * math.sin(ang) ** 1.4))
    edge = T((190, 180, 255), (109, 40, 217))
    d.polygon([P(*p) for p in shield], fill=T(scale(VIOLET, 0.25), mix(VIOLET, WHITE, 0.55)) + (255,))
    d.line([P(*p) for p in shield + [shield[0]]], fill=edge + (255,), width=5 * S)
    d.line([P(sx - 45, sy + 10), P(sx - 10, sy + 45), P(sx + 55, sy - 30)], fill=T(WHITE, (91, 33, 182)) + (255,), width=10 * S)
    img = glow(img, sh, 22, 1.8)
    save(img, "cloud")


# 3. Software teams: floating code editors connected to engineers ---------------------------
def teams():
    random.seed(11)
    img = background(1650, 640, (24, 22, 70), (226, 228, 255))
    img = grid(img, 900, 70, alpha=9)

    def editor(x, y, w, h, accent, lines):
        lay, d = layer()
        d.rounded_rectangle([P(x, y), P(x + w, y + h)], radius=18 * S, fill=T((10, 14, 32), WHITE) + (T(255, 245),),
                            outline=T(scale(accent, 0.9), mix(accent, WHITE, 0.35)) + (255,), width=2 * S)
        d.line([P(x, y + 46), P(x + w, y + 46)], fill=T((40, 46, 70), (226, 232, 240)) + (255,), width=S)
        for i, c in enumerate([(244, 63, 94), (250, 204, 21), (16, 185, 129)]):
            d.ellipse([P(x + 22 + i * 22, y + 17), P(x + 34 + i * 22, y + 29)], fill=scale(c, 0.8) + (255,))
        palette = [VIOLET, BLUE, CYAN, T((148, 163, 184), (100, 116, 139)), (244, 114, 182), (251, 191, 36)]
        ly = y + 76
        indent = 0
        for _ in range(lines):
            if ly > y + h - 30:
                break
            indent = max(0, min(3, indent + random.choice([-1, 0, 0, 1])))
            lx = x + 30 + indent * 28
            for _ in range(random.randint(1, 4)):
                tw = random.randint(30, 120)
                if lx + tw > x + w - 30:
                    break
                col = random.choice(palette)
                d.rounded_rectangle([P(lx, ly), P(lx + tw, ly + 12)], radius=6 * S, fill=T(scale(col, 0.75), col) + (255,))
                lx += tw + 14
            ly += 30
        return lay

    for args in [
        (1180, 260, 620, 520, BLUE, 20),
        (1560, 470, 700, 560, VIOLET, 22),
        (1320, 830, 480, 330, CYAN, 12),
    ]:
        img = glow(img, editor(*args), 20, T(0.7, 0.6))

    av, d = layer()
    avatars = [(1060, 520), (2300, 330), (2200, 1130), (1100, 1110), (1880, 210)]
    hub = (1800, 720)
    for x, y in avatars:
        d.line([P(x, y), P(*hub)], fill=tint(VIOLET, 0.35 if DARK else 0.6) + (255,), width=2 * S)
    for i, (x, y) in enumerate(avatars):
        col = mix(BLUE, VIOLET, i / (len(avatars) - 1))
        r = 46
        glyph = T((230, 232, 255), WHITE)
        d.ellipse([P(x - r, y - r), P(x + r, y + r)], fill=T(scale(col, 0.35), col) + (255,), outline=T(col, mix(col, WHITE, 0.5)) + (255,), width=3 * S)
        d.ellipse([P(x - 14, y - 26), P(x + 14, y + 2)], fill=glyph + (255,))
        d.chord([P(x - 26, y + 6), P(x + 26, y + 50)], 180, 360, fill=glyph + (255,))
    img = glow(img, av, 14, 1.3)
    save(img, "teams")


for DARK in (True, False):
    markets()
    cloud()
    teams()
