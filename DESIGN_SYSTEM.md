# Baseline Nutrition — Design System

> Source of truth for visual design. Hand this file to Claude (or any designer/tool)
> when creating or editing pages so everything stays consistent with the live site.
> Tokens below are extracted from `tailwind.config.ts` and `src/index.css` — do not
> invent new colors, fonts, or radii; reuse these.

---

## 1. Brand foundation

- **Brand name:** Baseline Nutrition
- **Tagline:** "Performance nutrition built on real science."
- **Personality:** Clinical, premium, evidence-led, no-hype. Think lab-grade
  precision meets athletic performance. Confident, transparent, never gimmicky.
- **Market:** UK performance-nutrition / supplements (prices in £, UK spelling —
  "basket", "optimise", "colour").

---

## 2. Color tokens

Colors are defined as **HSL channels** in CSS variables and consumed via Tailwind
(`bg-primary`, `text-foreground`, etc.). Always reference the token, never a raw hex.
Hex values below are approximate, for design tools only.

### Core palette (light mode `:root`)

| Token | HSL | ~Hex | Use |
|---|---|---|---|
| `--primary` | `207 90% 54%` | `#2196F3` | Brand blue — CTAs, links, accents, active states |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Text/icons on primary |
| `--background` | `0 0% 100%` | `#FFFFFF` | Page background |
| `--foreground` | `210 20% 12%` | `#181F26` | Primary text |
| `--secondary` | `210 20% 96%` | `#F2F4F6` | Subtle fills, thumbnail tiles, chips |
| `--secondary-foreground` | `210 20% 12%` | `#181F26` | Text on secondary |
| `--muted` | `210 15% 96%` | `#F1F3F5` | Muted surfaces |
| `--muted-foreground` | `210 10% 45%` | `#69717A` | Secondary/supporting text |
| `--accent` | `207 90% 54%` | `#2196F3` | Same as primary (single accent system) |
| `--card` | `0 0% 100%` | `#FFFFFF` | Card surface |
| `--border` / `--input` | `210 15% 88%` | `#DAE0E6` | Borders, dividers, input outlines |
| `--ring` | `207 90% 54%` | `#2196F3` | Focus ring |
| `--destructive` | `0 84% 60%` | `#EF4444` | Errors, destructive actions |

### Brand-specific

| Token | HSL | ~Hex | Use |
|---|---|---|---|
| `--hero-dark` | `215 50% 8%` | `#0A1626` | Deep navy — dark hero/section backgrounds |
| `--hero-blue` | `207 90% 54%` | `#2196F3` | Hero accent (= primary) |
| `theme-color` (meta) | — | `#0a1828` | Mobile browser chrome |

### Dark mode (`.dark`)
Same primary blue. Backgrounds shift to deep navy: `--background: 215 50% 5%`
(`#06101A`), `--card: 215 50% 8%`, `--secondary/--muted: 215 30% 15%`,
`--border: 215 20% 25%`. The public storefront is predominantly **light** with
**dark navy hero/feature sections** (applied via `bg-[hsl(var(--hero-dark))]`),
rather than a global dark theme.

**Rule:** there is exactly **one accent color** (blue). Do not add a second brand
hue. Hierarchy comes from navy ↔ white ↔ blue + type weight, not from extra colors.

---

## 3. Typography

- **Family:** `Roboto` (Google Fonts), fallback `sans-serif`. Loaded in `index.css`.
- **Weights in use:** 400, 500, 600, 700, **900** (black). Headings lean on
  `font-black` (900); body on 400–500; labels/buttons on 600–700.

### Scale & recurring patterns (Tailwind classes)

| Role | Classes |
|---|---|
| Page H1 | `text-3xl md:text-5xl font-black uppercase tracking-tight` |
| Section H2 | `text-2xl md:text-4xl font-bold tracking-tight` (or `font-black uppercase`) |
| Sub-heading H3 | `text-base md:text-xl font-bold` |
| Eyebrow / kicker | `text-xs font-bold text-primary uppercase tracking-[0.2em]` |
| Body | `text-sm md:text-base text-muted-foreground leading-relaxed` |
| Small / meta | `text-xs text-muted-foreground` |
| Button label | `text-sm font-bold uppercase tracking-[0.2em]` (or `tracking-wider`) |

**Signature moves:** uppercase + heavy tracking on headings/eyebrows/buttons;
black (900) weight for impact; muted-foreground for all supporting copy.

---

## 4. Layout & spacing

- **Outer section padding:** `py-16 md:py-24 px-4 md:px-8 lg:px-16`
  (hero sections sometimes `py-16 md:py-28`).
- **Content max width:** `max-w-[1280px] mx-auto` for full sections;
  `max-w-[800px] mx-auto` for text/legal pages.
- **Container (Tailwind `container`):** centered, `2rem` padding, max `1400px`.
- **Grids:** product/article grids use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- **Vertical rhythm inside blocks:** `flex flex-col gap-4` / `gap-6` / `gap-10`.
- **Sticky bars:** announcement bar `z-[60]`; sticky filter bars `top-[52px] md:top-[56px] z-40`.

---

## 5. Shape, border, elevation

- **Radius token:** `--radius: 6px` → `rounded-lg` = 6px, `rounded-md` = 4px,
  `rounded-sm` = 2px. Pills use `rounded-full`. Cards typically `rounded-lg`/`rounded-xl`.
- **Borders:** `border border-border` (1px, `#DAE0E6`) is the default separator.
- **Elevation:** minimal. Hover lift via `hover:shadow-lg` and `hover:border-primary/40`.
  Glow accents on dark backgrounds use `shadow-[0_0_16px_hsl(var(--primary)/0.15)]`
  and `drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]`. Use glow sparingly, only on
  dark navy surfaces.

---

## 6. Component patterns (copy these verbatim)

**Primary button**
```
className="px-8 py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded disabled:opacity-50"
```

**Secondary / outline button**
```
className="px-6 py-2.5 border border-border hover:border-primary/40 text-foreground text-sm font-semibold rounded transition-colors"
```

**Eyebrow label** (above headings)
```
<span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">About Us</span>
```

**Card**
```
className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
```

**Input**
```
className="w-full px-5 py-3.5 bg-secondary border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
```
(On dark backgrounds: `bg-white/10 border-white/20 text-white placeholder:text-white/50`.)

**Chip / filter pill**
```
active:   "bg-primary text-primary-foreground"
inactive: "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
wrapper:  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
```

**Badge / tag** — `px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider`.

**Accordion row** (suggested use / nutrition / FAQ) — `border-b border-border`,
header `flex items-center justify-between py-4`, chevron rotates 180° on open.

**Dark feature section**
```
className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16"
```

**Standard page shell** (every content page):
`AnnouncementBar` → `Navbar` → sections → `Footer`. Include a `<Helmet>` with a
unique `<title>` and `<meta name="description">` on every page.

---

## 7. Motion

- Library: **framer-motion**. Keep it subtle and fast.
- **Durations:** 0.2–0.35s for UI; up to 0.5s for image hover scale.
- **Reveal on scroll:** wrap blocks in the existing `ScrollReveal` component
  (`hidden → visible`, offset `x: ±40` or `y: 12`, with a small `delay` for stagger).
- **Hover/tap on buttons & tiles:** `whileHover={{ scale: 1.02 }}`,
  `whileTap={{ scale: 0.98 }}`; image cards `group-hover:scale-105`.
- **Accordion:** uses the `accordion-down/up` keyframes (0.2s ease-out).
- Respect a static-render mode: disable animations when capturing (the codebase
  checks a `deckCapture`/iframe flag and sets `transition={{ duration: 0 }}`).

---

## 8. Iconography & imagery

- **Icons:** `lucide-react`, typically `w-4 h-4` / `w-5 h-5`, stroke inherits
  `currentColor`. Decorative icons get `aria-hidden="true"`.
- **Product images:** square tiles on `bg-secondary`, `object-contain`, with a
  thumbnail strip. Article/category images `aspect-[16/9]`, `object-cover`.
- **Photography mood:** clean, clinical, performance-oriented; navy + blue grading.
- **Accessibility:** every image needs a meaningful `alt`; icon-only buttons need
  `aria-label`; multi-star ratings wrap in one `role="img"` with an aria-label.

---

## 9. Voice & tone

- Evidence-first, plain-spoken. Cite real science where relevant.
- Anti-hype: phrases like "clinically dosed", "full transparency", "no proprietary
  blends, no pixie-dusting". Avoid unverifiable health claims.
- UK English and UK compliance: supplements are "food supplements", "not intended
  to diagnose, treat, cure or prevent any disease".

---

## 10. Notes for whoever implements this

- This is a **Vite + React + TypeScript + Tailwind + shadcn/ui** codebase. Prefer
  existing shadcn primitives in `src/components/ui/*` before building new ones.
- Centralised data lives in `src/data/` (`products.ts`, `blog.ts`, `brand.ts`) —
  pull names, prices, addresses, and social links from there, never hard-code.
- Never introduce raw hex/px for color or radius — use the tokens above so light/dark
  and future rebrands stay one-line changes in `index.css`.
</content>
</invoke>
