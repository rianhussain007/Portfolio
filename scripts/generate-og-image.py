#!/usr/bin/env python3
"""Render the 1200x630 Open Graph card for the portfolio.

LinkedIn (and most other crawlers) do not execute JavaScript, so `og:image`
has to point at a real static file rather than a client-rendered screenshot.
This script draws that file from scratch so it can be regenerated whenever the
headline changes.

    python scripts/generate-og-image.py

Writes `public/og-image.png`. Requires Pillow (`pip install pillow`).

The card follows the site's warm editorial system — paper, ink, olive and
terracotta — rather than the blue/dark palette the site used previously.
"""

from __future__ import annotations

import sys
import tempfile
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# --- palette (mirrors src/index.css) ---------------------------------------
PAPER_TOP = (248, 246, 241)  # #f8f6f1
PAPER_BOTTOM = (238, 234, 225)  # #eeeae1
CARD = (255, 255, 255)
SAND = (236, 232, 223)  # #ece8df
LINE = (216, 210, 198)  # #d8d2c6
INK = (23, 23, 20)  # #171714
INK_SOFT = (79, 78, 71)  # #4f4e47
INK_MUTE = (106, 105, 95)  # #6a695f
OLIVE = (89, 107, 69)  # #596b45
TERRACOTTA = (158, 78, 38)  # #9e4e26 (text-safe terracotta)

NAME = "RIAN HUSSAIN"
ROLE = "AI/ML ENGINEER & PRODUCT BUILDER"
TAGLINE = "Applied AI \u00d7 Computer Vision \u00d7 Product Engineering"
PROJECTS = ["MARMAAI", "KISAN360", "ERGOVIGILANCE"]
SITE = "rianportfolio.netlify.app"

ROOT = Path(__file__).resolve().parent.parent
FONT_CACHE = Path(tempfile.gettempdir()) / "rian-og-fonts"
FONT_URLS = {
    "Newsreader.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/Newsreader%5Bopsz%2Cwght%5D.ttf",
    "Inter.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf",
    "JetBrainsMono.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf",
}

_font_cache: dict[tuple[str, int, int | None], ImageFont.FreeTypeFont] = {}


def font(family: str, size: int, weight: int = 400, opsz: int | None = None) -> ImageFont.FreeTypeFont:
    """Load a variable font at a numeric weight, e.g. font('Newsreader', 96, 500)."""
    key = (family, size, weight)
    if key in _font_cache:
        return _font_cache[key]

    path = FONT_CACHE / f"{family}.ttf"
    if not path.exists():
        FONT_CACHE.mkdir(parents=True, exist_ok=True)
        url = FONT_URLS[f"{family}.ttf"]
        try:
            with urllib.request.urlopen(url, timeout=90) as response:
                path.write_bytes(response.read())
        except Exception as exc:  # pragma: no cover - network dependent
            sys.exit(f"Could not download {family} from {url}: {exc}")

    loaded = ImageFont.truetype(str(path), size)
    try:
        values = []
        for axis in loaded.get_variation_axes():
            label = (axis.get("name") or "").lower()
            if "weight" in label:
                values.append(weight)
            elif "optical" in label or label == "opsz":
                values.append(opsz if opsz is not None else axis.get("default", 16))
            else:
                values.append(axis.get("default", axis.get("minimum", 0)))
        loaded.set_variation_by_axes(values)
    except Exception:  # pragma: no cover - static fallback font
        pass

    _font_cache[key] = loaded
    return loaded


def measure(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont) -> float:
    left, _, right, _ = draw.textbbox((0, 0), text, font=f)
    return right - left


def tracked_width(
    draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, tracking: float
) -> float:
    """Width of `text` when every character is followed by `tracking` extra px."""
    if not text:
        return 0.0
    return measure(draw, text, f) + tracking * (len(text) - 1)


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[float, float],
    text: str,
    f: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    tracking: float,
) -> None:
    """Draw text with manual letter-spacing (PIL has no tracking of its own)."""
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=f, fill=fill)
        x += measure(draw, char, f) + tracking


def fit_tracked(
    family: str,
    weight: int,
    text: str,
    start: int,
    max_width: float,
    tracking: float,
    min_size: int = 14,
    opsz: int | None = None,
) -> ImageFont.FreeTypeFont:
    """Shrink the size until the tracked text fits max_width."""
    probe = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    size = start
    while size > min_size and tracked_width(probe, text, font(family, size, weight, opsz), tracking) > max_width:
        size -= 2
    return font(family, size, weight, opsz)


def paper_background() -> Image.Image:
    """A warm vertical wash, so the card reads as paper rather than a flat fill."""
    strip = Image.new("RGB", (1, H))
    for y in range(H):
        t = y / (H - 1)
        strip.putpixel(
            (0, y),
            tuple(round(PAPER_TOP[i] + (PAPER_BOTTOM[i] - PAPER_TOP[i]) * t) for i in range(3)),
        )
    return strip.resize((W, H), Image.BILINEAR).convert("RGBA")


def add_dot_grid(base: Image.Image, step: int = 34, alpha: int = 10) -> None:
    """A faint measured grid, faded towards the bottom so it never fights the type."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for x in range(step, W, step):
        for y in range(step, H, step):
            fade = max(0.25, 1 - (y / H) * 0.75)
            draw.point((x, y), fill=INK + (int(alpha * fade),))
    base.alpha_composite(layer)


def rounded_avatar(size: int, radius: int) -> Image.Image | None:
    """Rounded-square crop of the hero photo, on a white card like the site's hero."""
    source = ROOT / "public" / "rian-photo.png"
    if not source.exists():
        return None

    photo = Image.open(source).convert("RGBA")
    side = min(photo.size)
    photo = photo.crop(
        (
            (photo.width - side) // 2,
            (photo.height - side) // 2,
            (photo.width + side) // 2,
            (photo.height + side) // 2,
        )
    ).resize((size, size), Image.LANCZOS)

    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size * 4 - 1, size * 4 - 1), radius=radius * 4, fill=255
    )
    mask = mask.resize((size, size), Image.LANCZOS)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(photo, (0, 0), mask)
    return out


def build() -> Image.Image:
    card = paper_background()
    add_dot_grid(card)

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    pad = 88
    avatar = 172
    avatar_right = W - pad
    text_width = avatar_right - avatar - 56 - pad

    # Inset hairline frame — a printed card edge rather than a full-bleed photo.
    draw.rounded_rectangle((26, 26, W - 27, H - 27), radius=6, outline=LINE + (255,), width=1)

    # Eyebrow rule
    draw.rounded_rectangle((pad, 106, pad + 58, 111), radius=3, fill=OLIVE + (255,))

    y = 140
    name_font = fit_tracked("Newsreader", 500, NAME, 96, text_width, tracking=-1, opsz=72)
    draw_tracked(draw, (pad, y), NAME, name_font, INK + (255,), -1)
    y += int(name_font.size * 1.02) + 14

    role_font = fit_tracked("Inter", 600, ROLE, 34, text_width, tracking=2.6, opsz=32)
    draw_tracked(draw, (pad, y), ROLE, role_font, OLIVE + (255,), 2.6)
    y += int(role_font.size * 1.1) + 30

    draw.rectangle((pad, y, W - pad, y + 1), fill=LINE + (255,))

    # --- project band -------------------------------------------------------
    band_top = 372
    band_bottom = band_top + 108
    draw.rectangle((pad, band_top, W - pad, band_bottom), fill=SAND + (255,))
    draw.rectangle((pad, band_top, W - pad, band_top + 1), fill=LINE + (255,))
    draw.rectangle((pad, band_bottom - 1, W - pad, band_bottom), fill=LINE + (255,))

    inner = W - pad * 2
    slot = inner / len(PROJECTS)
    index_font = font("JetBrainsMono", 18, 400)
    project_font = font("Inter", 30, 600, opsz=28)

    for i, project in enumerate(PROJECTS):
        x = pad + slot * i + 30
        draw.text((x, band_top + 26), f"{i + 1:02d}", font=index_font, fill=OLIVE + (255,))
        draw.text((x + 46, band_top + 16), project, font=project_font, fill=INK + (255,))
        if i > 0:
            draw.rectangle((pad + slot * i, band_top + 20, pad + slot * i + 1, band_bottom - 20), fill=LINE + (255,))

    # --- tagline ------------------------------------------------------------
    tag_font = fit_tracked("JetBrainsMono", 400, TAGLINE, 23, W - pad * 2 - 300, tracking=1.2)
    draw_tracked(draw, (pad, band_bottom + 46), TAGLINE, tag_font, INK_MUTE + (255,), 1.2)

    site_font = font("JetBrainsMono", 20, 400)
    site_width = measure(draw, SITE, site_font)
    draw.text((W - pad - site_width, band_bottom + 48), SITE, font=site_font, fill=INK_MUTE + (255,))

    card.alpha_composite(layer)

    # --- portrait -----------------------------------------------------------
    photo = rounded_avatar(avatar, radius=14)
    if photo is not None:
        top = 104
        frame = (avatar_right - avatar - 10, top - 10, avatar_right + 10, top + avatar + 10)
        draw2 = ImageDraw.Draw(card)
        draw2.rounded_rectangle(frame, radius=22, fill=CARD + (255,), outline=LINE + (255,), width=1)
        card.alpha_composite(photo, (avatar_right - avatar, top))

    return card


def main() -> None:
    card = build().convert("RGB")
    out = ROOT / "public" / "og-image.png"
    card.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)}  {card.size}  {out.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
