#!/usr/bin/env python3
"""Render the 1200x630 Open Graph card for the portfolio.

LinkedIn (and most other crawlers) do not execute JavaScript, so `og:image`
has to point at a real static file rather than a client-rendered screenshot.
This script draws that file from scratch so it can be regenerated whenever the
headline changes.

    python scripts/generate-og-image.py

Writes `public/og-image.png`. Requires Pillow (`pip install pillow`) and
downloads the Outfit / Inter variable fonts into a temp cache on first run.
"""

from __future__ import annotations

import io
import os
import sys
import tempfile
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

BG_TOP = (11, 19, 38)      # #0b1326
BG_BOTTOM = (6, 14, 32)    # #060e20
CYAN = (0, 217, 255)       # #00d9ff
PURPLE = (221, 183, 255)   # #ddb7ff
WHITE = (255, 255, 255)
MUTED = (187, 201, 206)    # #bbc9ce
DIM = (127, 147, 173)      # #7f93ad

NAME = "Rian Hussain"
ROLE = "AI/ML Engineer & Product Builder"
TAGS = "Computer Vision  \u2022  Applied AI  \u2022  Product Engineering"
CHIPS = [
    "ErgoVigilance \u2014 real-time CV ergonomics",
    "MarmaAI \u2014 AI-guided self-acupressure",
]
LINKS = "github.com/rianhussain007  \u00b7  linkedin.com/in/rian-hussain-dev"

ROOT = Path(__file__).resolve().parent.parent
FONT_CACHE = Path(tempfile.gettempdir()) / "rian-og-fonts"
FONT_URLS = {
    "Outfit.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/Outfit%5Bwght%5D.ttf",
    "Inter.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf",
}

_font_cache: dict[tuple[str, int, str], ImageFont.FreeTypeFont] = {}


def font(family: str, size: int, weight: str = "Regular") -> ImageFont.FreeTypeFont:
    """Load a variable font at a named weight, e.g. font('Outfit', 84, 'Bold')."""
    key = (family, size, weight)
    if key in _font_cache:
        return _font_cache[key]

    path = FONT_CACHE / f"{family}.ttf"
    if not path.exists():
        FONT_CACHE.mkdir(parents=True, exist_ok=True)
        url = FONT_URLS[f"{family}.ttf"]
        try:
            with urllib.request.urlopen(url, timeout=60) as response:
                path.write_bytes(response.read())
        except Exception as exc:  # pragma: no cover - network dependent
            sys.exit(f"Could not download {family} from {url}: {exc}")

    loaded = ImageFont.truetype(str(path), size)
    try:
        loaded.set_variation_by_name(weight)
    except (OSError, ValueError):  # static fallback font
        pass
    _font_cache[key] = loaded
    return loaded


def measure(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont) -> float:
    left, _, right, _ = draw.textbbox((0, 0), text, font=f)
    return right - left


def fit(family: str, weight: str, text: str, start: int, max_width: float) -> ImageFont.FreeTypeFont:
    """Shrink the size until `text` fits max_width (keeps the card layout stable)."""
    probe = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    size = start
    while size > 12 and measure(probe, text, font(family, size, weight)) > max_width:
        size -= 2
    return font(family, size, weight)


def gradient_background() -> Image.Image:
    strip = Image.new("RGB", (1, H))
    for y in range(H):
        t = y / (H - 1)
        strip.putpixel(
            (0, y),
            tuple(round(BG_TOP[i] + (BG_BOTTOM[i] - BG_TOP[i]) * t) for i in range(3)),
        )
    return strip.resize((W, H), Image.BILINEAR).convert("RGBA")


def add_glow(base: Image.Image, center: tuple[int, int], radius: int, color: tuple[int, int, int], alpha: float) -> None:
    """Soft radial accent light, cheap: a 256px radial gradient scaled up."""
    mask = Image.radial_gradient("L").point(lambda v: 255 - v)  # bright centre -> dark edge
    size = radius * 2
    mask = mask.resize((size, size), Image.BILINEAR)
    canvas = Image.new("L", (W, H), 0)
    canvas.paste(mask, (center[0] - radius, center[1] - radius))
    canvas = canvas.point(lambda v: int(v * alpha))
    base.alpha_composite(Image.composite(Image.new("RGBA", (W, H), color + (255,)), Image.new("RGBA", (W, H), (0, 0, 0, 0)), canvas))


def add_dot_grid(base: Image.Image, step: int = 40, alpha: int = 12) -> None:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for x in range(step, W, step):
        for y in range(step, H, step):
            draw.point((x, y), fill=(255, 255, 255, alpha))
    base.alpha_composite(layer)


def circular_avatar(size: int) -> Image.Image | None:
    """Circular crop of the hero photo, or an 'RH' monogram if it is missing."""
    source = ROOT / "public" / "rian-photo.png"
    if source.exists():
        photo = Image.open(source).convert("RGBA")
    else:
        return None

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
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(photo, (0, 0), mask)
    return out


def build() -> Image.Image:
    card = gradient_background()
    add_glow(card, (1120, 60), 520, CYAN, 0.20)
    add_glow(card, (120, 660), 480, PURPLE, 0.13)
    add_dot_grid(card)

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    measure_draw = ImageDraw.Draw(Image.new("RGB", (1, 1)))

    pad = 72
    avatar_size = 200
    avatar_left = W - pad - avatar_size
    text_width = avatar_left - pad - 48

    # Accent rule
    draw.rounded_rectangle((pad, 108, pad + 68, 113), radius=3, fill=CYAN + (255,))

    y = 148
    name_font = fit("Outfit", "Bold", NAME, 88, text_width)
    draw.text((pad, y), NAME, font=name_font, fill=WHITE + (255,))
    y += measure_draw.textbbox((0, 0), NAME, font=name_font)[3] + 22

    role_font = fit("Inter", "SemiBold", ROLE, 40, text_width)
    draw.text((pad, y), ROLE, font=role_font, fill=CYAN + (255,))
    y += measure_draw.textbbox((0, 0), ROLE, font=role_font)[3] + 34

    draw.rectangle((pad, y, pad + text_width, y + 1), fill=(255, 255, 255, 34))
    y += 30

    tags_font = fit("Inter", "Medium", TAGS, 27, text_width)
    draw.text((pad, y), TAGS, font=tags_font, fill=MUTED + (255,))
    y += measure_draw.textbbox((0, 0), TAGS, font=tags_font)[3] + 46

    # Project chips
    chip_font = font("Inter", 19, "Medium")
    x = pad
    for label in CHIPS:
        width = measure(measure_draw, label, chip_font)
        box = (x, y, x + width + 40, y + 48)
        draw.rounded_rectangle(box, radius=24, outline=CYAN + (77,), width=1)
        draw.text((x + 20, y + 14), label, font=chip_font, fill=MUTED + (255,))
        x = box[2] + 16
    y += 48 + 40

    links_font = font("Inter", 18, "Regular")
    draw.text((pad, y), LINKS, font=links_font, fill=DIM + (255,))

    card.alpha_composite(layer)

    # Avatar sits top-right of the text block, vertically centred on the name/role pair.
    avatar = circular_avatar(avatar_size)
    if avatar is not None:
        ring = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ring_draw = ImageDraw.Draw(ring)
        centre = (avatar_left + avatar_size // 2, 214)
        outer = avatar_size // 2 + 6
        ring_draw.ellipse(
            (centre[0] - outer, centre[1] - outer, centre[0] + outer, centre[1] + outer),
            outline=CYAN + (110,),
            width=2,
        )
        card.alpha_composite(ring)
        card.alpha_composite(avatar, (avatar_left, centre[1] - avatar_size // 2))

    return card


def main() -> None:
    card = build().convert("RGB")
    out = ROOT / "public" / "og-image.png"
    card.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)}  {card.size}  {out.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
