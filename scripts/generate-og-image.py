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
FOREST = (78, 107, 63)  # #4e6b3f
GRAPHITE = (62, 74, 68)  # #3e4a44

# --- per-project share cards ------------------------------------------------
# Kept in step by hand with src/data/projects.ts, exactly like NAME/ROLE/PROJECTS
# above: these are static assets, regenerated deliberately rather than at build
# time, so the deploy never needs Python. Re-run this script after changing a
# project's title, tagline or specs. The three specs are the same facts the site
# shows under the title.
PROJECT_CARDS = [
    {
        "slug": "ergovigilance",
        "eyebrow": "AI / ML \u00b7 2026",
        "award": None,
        "title": "ErgoVigilance",
        "tagline": "Computer vision for workplace ergonomics",
        "specs": [
            ("Agreement", "87.6% with assessors"),
            ("Tests", "765 automated"),
            ("API", "110+ endpoints"),
        ],
        "accent": GRAPHITE,
    },
    {
        "slug": "marmaai",
        "eyebrow": "AI / ML \u00b7 2025\u2013",
        "award": None,
        "title": "MarmaAI",
        "tagline": "AI-guided self-acupressure",
        "specs": [
            ("Acupoints", "21 modelled"),
            ("Tests", "805 automated"),
            ("Accuracy", "16-point table"),
        ],
        "accent": TERRACOTTA,
    },
    {
        "slug": "kisan360",
        "eyebrow": "WEB & PRODUCT \u00b7 2026",
        "award": None,
        "title": "Kisan360",
        "tagline": "Market linkages and price discovery for farmers",
        "specs": [
            ("Services", "4-service stack"),
            ("Snapshot", "85 real price rows"),
            ("Headline", "Net realization"),
        ],
        "accent": FOREST,
    },
    {
        "slug": "cultural-diversity-multiplier",
        "eyebrow": "POLICY & RESEARCH \u00b7 2026",
        "award": "Honorable Proposal \u00b7 GDPPYI Contest Finals 2026",
        "title": "Digital Cultural Equity Act",
        "tagline": "Linguistic equity in algorithmically governed platforms",
        "specs": [
            ("Tiers", "3 language tiers"),
            ("Prototype", "Live on GitHub Pages"),
            ("Recognition", "Honorable Proposal"),
        ],
        "accent": TERRACOTTA,
    },
]

NAME = "RIAN HUSSAIN"
ROLE = "AI/ML ENGINEER & PRODUCT BUILDER"
TAGLINE = "Applied AI \u00d7 Computer Vision \u00d7 Product Engineering"
PROJECTS = ["ERGOVIGILANCE", "MARMAAI", "KISAN360"]
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


def wrap_lines(
    draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, max_width: float, max_lines: int
) -> list[str] | None:
    """Greedy wrap; returns None when the text needs more than max_lines."""
    lines: list[str] = []
    current = ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if not current or measure(draw, candidate, f) <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines if len(lines) <= max_lines else None


def fit_paragraph(
    draw: ImageDraw.ImageDraw,
    text: str,
    sizes: tuple[int, ...],
    max_width: float,
    max_lines: int,
) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    """Largest size at which the text still fits the allowed number of lines."""
    for size in sizes:
        f = font("Inter", size, 500, opsz=size)
        lines = wrap_lines(draw, text, f, max_width, max_lines)
        if lines:
            return f, lines
    f = font("Inter", sizes[-1], 500, opsz=sizes[-1])
    return f, wrap_lines(draw, text, f, max_width, 99) or [text]


def brand_mark(size: int) -> Image.Image | None:
    """The RH monogram, used as the corner mark on project cards."""
    source = ROOT / "public" / "favicon.png"
    if not source.exists():
        return None
    mark = Image.open(source).convert("RGBA")
    return mark.resize((size, size), Image.LANCZOS)


def build_project_card(spec: dict) -> Image.Image:
    """One share card for one project: name, claim, three facts, and the URL."""
    accent = spec["accent"]
    card = paper_background()
    add_dot_grid(card)

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    pad = 88
    text_width = W - pad * 2 - 120  # keep clear of the monogram

    draw.rounded_rectangle((26, 26, W - 27, H - 27), radius=6, outline=LINE + (255,), width=1)

    # Eyebrow: a short accent rule, then the discipline and year.
    draw.rounded_rectangle((pad, 100, pad + 58, 105), radius=3, fill=accent + (255,))
    eyebrow_font = font("JetBrainsMono", 20, 400)
    draw_tracked(draw, (pad + 78, 92), spec["eyebrow"], eyebrow_font, accent + (255,), 2.2)

    y = 156

    if spec["award"]:
        draw_tracked(
            draw,
            (pad, y),
            spec["award"].upper(),
            font("JetBrainsMono", 19, 500),
            TERRACOTTA + (255,),
            1.8,
        )
        y += 42

    title_font = fit_tracked("Newsreader", 500, spec["title"], 84, text_width, tracking=-1, opsz=72)
    draw_tracked(draw, (pad, y), spec["title"], title_font, INK + (255,), -1)
    y += int(title_font.size * 1.06) + 22

    tag_font, tag_lines = fit_paragraph(
        draw, spec["tagline"], (34, 30, 26, 22), text_width, max_lines=2
    )
    for line in tag_lines:
        draw.text((pad, y), line, font=tag_font, fill=INK_SOFT + (255,))
        y += int(tag_font.size * 1.32)

    # --- spec band, anchored to the bottom of the card ----------------------
    band_top = 400
    band_bottom = band_top + 112
    draw.rectangle((pad, band_top, W - pad, band_bottom), fill=SAND + (255,))
    draw.rectangle((pad, band_top, W - pad, band_top + 1), fill=LINE + (255,))
    draw.rectangle((pad, band_bottom - 1, W - pad, band_bottom), fill=LINE + (255,))

    inner = W - pad * 2
    slot = inner / len(spec["specs"])
    label_font = font("JetBrainsMono", 16, 400)

    for i, (label, value) in enumerate(spec["specs"]):
        x = pad + slot * i + 30
        draw_tracked(draw, (x, band_top + 26), label.upper(), label_font, INK_MUTE + (255,), 1.5)
        value_font = fit_tracked("Inter", 600, value, 27, slot - 46, tracking=0, min_size=18, opsz=26)
        draw.text((x, band_top + 58), value, font=value_font, fill=INK + (255,))
        if i > 0:
            draw.rectangle(
                (pad + slot * i, band_top + 22, pad + slot * i + 1, band_bottom - 22), fill=LINE + (255,)
            )

    site_font = font("JetBrainsMono", 19, 400)
    draw.text((pad, band_bottom + 30), SITE, font=site_font, fill=INK_MUTE + (255,))
    path = f"/work/{spec['slug']}/"
    path_width = measure(draw, path, site_font)
    draw.text((W - pad - path_width, band_bottom + 30), path, font=site_font, fill=INK_MUTE + (255,))

    card.alpha_composite(layer)

    mark = brand_mark(96)
    if mark is not None:
        card.alpha_composite(mark, (W - pad - 96, 92))

    return card


def main() -> None:
    card = build().convert("RGB")
    out = ROOT / "public" / "og-image.png"
    card.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)}  {card.size}  {out.stat().st_size / 1024:.1f} KB")

    og_dir = ROOT / "public" / "og"
    og_dir.mkdir(parents=True, exist_ok=True)
    for spec in PROJECT_CARDS:
        project_card = build_project_card(spec).convert("RGB")
        target = og_dir / f"{spec['slug']}.png"
        project_card.save(target, "PNG", optimize=True)
        print(
            f"wrote {target.relative_to(ROOT)}  {project_card.size}  "
            f"{target.stat().st_size / 1024:.1f} KB"
        )


if __name__ == "__main__":
    main()
