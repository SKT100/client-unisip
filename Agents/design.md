# UniSip Complete Design System & Specification

## 1. Primary Brand Identity
UniSip is a premium custom-branded hydration solution. The brand aesthetic balances bold, high-contrast editorial typography with clean, tactile paper-cut sticker emblems, rich blue water textures, and off-white background tones.

---

## 2. Color Palette Tokens (Exact Figma Inspect Extractions)

### A. Core Base Colors
- `--color-bg-primary`: `#F5F4EF` (100% — Off-White / Main Page Canvas)
- `--color-bg-primary-75`: `rgba(245, 244, 239, 0.75)`
- `--color-bg-dark`: `#101A35` (100% — Deep Brand Navy / Primary Text & Headings)
- `--color-bg-card-dark`: `#0D152D` / `#101522` (85% — Dark Feature Section Cards)
- `--color-white`: `#FFFFFF` (100% — Clean White)
- `--color-neutral-gray`: `#D9D9D9` (100% — Card Borders & Dividers)
- `--color-[#1E1E1E]`: `#1E1E1E` (100% — Neutral Dark Accents)

### B. Brand Blues & Accents
- `--color-blue-deep`: `#2D468A` (100% — Rich Royal Blue)
- `--color-blue-[#0E47AB]`: `#0E47AB` (100% — Vibrant Royal Blue)
- `--color-blue-[#173B8F]`: `#173B8F` (100% — Solid Emblem & Button Blue)
- `--color-blue-[#203264]`: `#203264` (100% — Deep Slate Blue)
- `--color-blue-[#223856]`: `#223856` (100% — Muted Navy Blue)
- `--color-blue-[#3F619F]`: `#3F619F` (100% — Medium Steel Blue)
- `--color-blue-soft`: `#669EFF` (100% — Electric Soft Accent)
- `--color-blue-periwinkle`: `#9BBBF4` (100% — Light Periwinkle Card Fill)
- `--color-blue-ice`: `#B4CFFF` (100% — Light Ice Blue)
- `--color-blue-cyan`: `#39B8F2` (100% — Cyan Focus & Highlight)

### C. Opacity Variations (`#101A35` Text & Surface Hierarchy)
- `100%` (`#101A35`) — Primary Headlines, Solid Buttons
- `85%` (`rgba(16, 26, 53, 0.85)`) — Navbar Background & Dense Text
- `60%` (`rgba(16, 26, 53, 0.60)`) — Secondary Body Copy
- `50%` (`rgba(16, 26, 53, 0.50)`) — Subtitles & Meta Details
- `30%` (`rgba(16, 26, 53, 0.30)`) — Input Borders & Subtle Strokes
- `10.2%` (`rgba(16, 26, 53, 0.102)`) — Icon Circle Fill & Light Hover Surfaces

---

## 3. Typography System

### A. Primary Font Family: Fira Sans Extra Condensed
*Used for ALL Headings, Banners, Badges, Navigation Labels, and Display Copy.*
- **Font Family**: `"Fira Sans Extra Condensed", sans-serif`
- **Supported Weights**:
  - `400` (Regular)
  - `500` (Medium)
  - `600` (SemiBold)
  - `700` (Bold)
  - `800` (ExtraBold)
  - `900` (Black / Heavy Campaign Display)

### B. Secondary Font Family: Manrope
*Used for Paragraph Body Copy, Form Inputs, and Technical Details.*
- **Font Family**: `"Manrope", sans-serif`
- **Supported Weights**: `400`, `500`, `600`, `700`

### C. Typographic Scale
- **Display Hero Headline**: `clamp(52px, 7.5vw, 130px)`, Line Height: `0.82`, Letter Spacing: `-0.03em`, Font Weight: `900`
- **Page Title Banner**: `clamp(44px, 7vw, 96px)`, Line Height: `0.88`, Font Weight: `900`
- **Section Heading (H2)**: `clamp(36px, 5.5vw, 76px)`, Line Height: `0.86`, Font Weight: `900`
- **Subsection Heading (H3)**: `24px – 32px`, Line Height: `1.05`, Font Weight: `800`
- **Subtitle / Lead Paragraph**: `16px – 20px`, Line Height: `1.5`, Font Weight: `400 / 500`
- **Button Labels**: `12px`, Letter Spacing: `0.08em`, Font Weight: `800`, Text Transform: `UPPERCASE`
- **Meta / Micro Tags**: `11px`, Letter Spacing: `0.22em`, Font Weight: `800`, Text Transform: `UPPERCASE`

---

## 4. Spacing & Container Guidelines
- **Container Max-Width**: `1440px`
- **Horizontal Viewport Padding**: `clamp(36px, 8vw, 140px)` (Prevents headline cutoff)
- **Section Vertical Padding**: `64px – 120px`
- **Border Radii**:
  - Large Hero Cards & Sections: `32px – 48px`
  - Cards & Modal Shells: `16px – 28px`
  - Buttons & Pill Tags: `999px` (Full Pill)

---

## 5. UI Component Specifications

### A. Solid Monocolor Banner (`.emblem-remembered-solid`)
- **Background**: `#173B8F`
- **Text Color**: `#FFFFFF`
- **Border**: `8px solid #F5F4EF` (Matches exact page canvas background)
- **Outline Fix**: `1px solid #F5F4EF` (Eliminates GPU subpixel render lines)
- **Transform**: `rotate(-3.5deg)`
- **Shadow**: `none` (Strict flat cutout look)

### B. Reusable Buttons
- **Primary Button**: Background `#101A35`, Text `#FFFFFF`, Hover `#173B8F`. Includes a circular icon badge (`w-5 h-5 bg-white/20`).
- **Secondary Button**: Background `transparent`, Border `1px solid rgba(16, 26, 53, 0.32)`, Text `#111827`, Hover `#111827` border. Includes a circular icon badge (`w-5 h-5 bg-[#101A35]/10`).

### C. Sticker Placements
- **Top-Left Custom Sticker (`custom-botttle-sticker.png`)**: Positioned over the top-left of `BOTTLES` headline, `rotate(-10deg)`.
- **Right Slogan Sticker (`sip-slogan-sticker.png`)**: Positioned on the right side near `BUILT TO BE`, `rotate(12deg)`.