# AUDIT REPORT — Baseline Nutrition (design-to-store-magic) — 2026-05-18

## URGENT — REVIEW IMMEDIATELY

1. **Client-side password gate with hard-coded password** — `src/components/PasswordGate.tsx:5` stores `SITE_PASSWORD = "baseline2025"` in source. Anyone who opens the JS bundle or `View Source` can read it; sessionStorage can be set manually to bypass it. This is fine ONLY if the gate is a soft "private preview" curtain, not a real access control. The Supabase publishable key is acceptable in client code because RLS is enabled (`supabase/migrations/...sql`), but the password gate offers no real protection. Flag for owner decision: either remove the gate or move it behind a server-rendered route (Cloudflare Access, Vercel password protection, etc.).
2. **`.env` is committed and not in `.gitignore`** — `.env` is tracked at the repo root and `.gitignore` does not list it. The keys it contains are the Supabase anon (publishable) key and URL, which are designed to be public, so no secret is currently exposed. But the pattern is dangerous: the next person to add a real secret will commit it. Add `.env` to `.gitignore` and rely on `.env.example` for shape, or move env values into the platform's env settings.
3. **`AppLanding.tsx` "Join Waitlist" form is a dead button** — `src/pages/AppLanding.tsx:147-154` renders an email input and submit button with NO handler, no state, no Supabase call. Users will type their email, click, and nothing happens. This breaks the page's stated purpose ("Be the first to try it").
4. **Build resolution is broken** — `package.json` pins `vite ^8.0.0`, `@vitejs/plugin-react ^6.0.0`, `vitest ^4.1.0`, but `lovable-tagger@1.1.13` peers vite `>=5.0.0 <8.0.0`. `npm install` fails without `--legacy-peer-deps`. Build does work once forced. Pin vite back to 7.x or upgrade/replace `lovable-tagger`.

---

## EXECUTIVE SUMMARY

- **Code quality**: AMBER. Good Tailwind/Radix discipline and a tidy Zustand cart store. Two genuinely dead components (`ProductCard`, `NavLink`), ~20 unused product image assets, duplicated hard-coded product lists across 4 files, lint errors (4) and warnings (13), and bundle 1.45 MB unsplit.
- **UI/UX**: AMBER. Visual language is consistent (tokens used throughout, single typography family, sensible spacing), but ~20 placeholder buttons and `href="#"` links across primary marketing pages. Empty/loading states are inconsistent (cart drawer good; product detail, filters, reviews missing). Hero carousel reuses the same image for all 3 slides.
- **Functionality**: AMBER. Real cart flow (Shopify Storefront API) is wired correctly. Real Supabase email signup works on PreLaunch and Newsletter. But on Shop/PerformanceCategory/AppLanding pages, multiple critical CTAs (filters, search, write-a-review, join-waitlist, write-review, Quick Add modal "Add to basket") are non-functional placeholders.

### Top 5 issues by severity
1. AppLanding "Join Waitlist" form is dead. (HIGH, functionality)
2. PerformanceCategory search input + Goal/Category/Sort filter buttons are all non-functional placeholders. (HIGH, functionality)
3. QuickAddModal "Add to basket" button has no `onClick`. The modal opens but cannot add to cart from Shop. (HIGH, functionality)
4. Multiple "support team" links and 4 social icons (PreLaunch + Footer) are `href="#"`. (HIGH, UX + SEO + a11y)
5. Hard-coded product list is duplicated in 4 places (Navbar mega-menu desktop and mobile, SearchOverlay, Shop, PerformanceCategory, TrustedFormulas) — when a product is added or renamed the team has to remember 4-6 files. (MEDIUM, code quality, real maintenance trap)

### Top 5 quick wins (high impact, low effort)
1. Add `.env` to `.gitignore`. (SAFE — applied)
2. Remove the two confirmed-dead components: `src/components/ProductCard.tsx`, `src/components/NavLink.tsx`. (REVIEW — flagged for review, no auto-delete)
3. Fix the 4 ESLint errors. (SAFE — applied: `cartStore.ts:135` ternary-as-expression, `tailwind.config.ts:90` require-import, two empty-interface declarations in `command.tsx` and `textarea.tsx`.)
4. Add lazy route imports to `App.tsx` so the 1.45 MB bundle splits per page. (REVIEW — could affect first-paint perception, not auto-applied)
5. Wire CSP/security headers via Vercel/Netlify config and remove the hard-coded password gate. (REVIEW)

### Estimated effort to reach production-ready
~3-5 days of focused work:
- 1 day: wire the dead CTAs (waitlist, filters, search on PerformanceCategory, review button, QuickAddModal add-to-cart, footer social links).
- 0.5 day: image optimisation (prelaunch hero is 1.1 MB on its own).
- 0.5 day: lazy-load routes, dedupe product data into a single source.
- 1 day: fix accessibility gaps (toggle ARIA on CookieConsent, labels on inputs, focus return on overlays).
- 0.5-1 day: replace stub hero carousel with 3 distinct backgrounds, replace "Team Reveal Coming Soon" stub, replace "★" character ratings with semantic markup.
- 0.5 day: real auth gate or remove it.

---

## PILLAR A — CODE QUALITY

### Critical
- **Build resolution broken** — `package.json` requires vite 8 but `lovable-tagger` peers vite < 8. `npm install` fails without `--legacy-peer-deps`. **Fix**: pin `vite` to `^7.0.0` (the version `lovable-tagger` accepts) or remove `lovable-tagger` from dev deps and from `vite.config.ts:4,11`. — REVIEW.
- **`src/stores/cartStore.ts:135`** — `newItems.length === 0 ? clearCart() : set({ items: newItems });` is a ternary used for its side effect, which ESLint flags as `no-unused-expressions`. Replace with `if (newItems.length === 0) clearCart(); else set({ items: newItems });` — SAFE, applied.
- **`tailwind.config.ts:90`** — `plugins: [require("tailwindcss-animate")]` uses CommonJS `require` in a TS ESM file; ESLint errors and TS strict modes will too. Switch to an `import` at the top. — SAFE, applied.

### High
- **Duplicate product data across 5+ files** — Hard-coded product arrays are repeated in `src/components/Navbar.tsx:10-58` (mega menu desktop + mobile), `src/components/SearchOverlay.tsx:17-25`, `src/pages/Shop.tsx:21-29`, `src/pages/PerformanceCategory.tsx:39-47`, `src/components/sections/TrustedFormulas.tsx:13-18`, `src/components/sections/CompleteProtocols.tsx:7-30`. There is already a canonical source at `src/data/products.ts` — these places should import from it. **Fix**: consolidate to one product registry. — REVIEW (refactor of shape; not safe to auto-apply because of trademark glyphs, custom descriptions per surface).
- **Dead components**: `src/components/ProductCard.tsx` (no imports), `src/components/NavLink.tsx` (no imports). — REVIEW (flag for deletion, do not auto-delete).
- **Dead file**: `src/App.css` is never imported (only `index.css` is in `src/main.tsx:3`). — REVIEW.
- **VARIANT_MAP misplaced** — `src/components/product/ProductHero.tsx:9-19` exports the variant ID map alongside an unrelated component. Cross-feature imports from `TrustedFormulas` reach into `product/ProductHero` for it. Should live in `src/lib/shopify.ts` or `src/data/products.ts`. — REVIEW.
- **`src/lib/shopify.ts:6`** — Storefront token hard-coded. Storefront API tokens ARE public by design (like Stripe publishable keys), so this is not a credential leak, but it should still come from `import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN` and `VITE_SHOPIFY_STORE_DOMAIN` so dev/prod stores can be swapped without code edits. — REVIEW.
- **`src/pages/Deck.tsx:62`** — `useCallback(...)` deps array omits `slides.length` (used inside `next`). ESLint warns. — REVIEW (low priority; behaviour is fine because slides is a stable import).

### Medium
- **`src/components/ui/command.tsx:24`** — empty interface declares no members. Replace with `type CommandDialogProps = DialogProps;`. — SAFE, applied.
- **`src/components/ui/textarea.tsx:5`** — same pattern, empty interface extending base. — SAFE, applied.
- **`src/components/HeroSection.tsx:6-26`** — All three carousel slides use the same `heroBg` image. Three distinct backgrounds are needed for the carousel to mean anything. — REVIEW (content task).
- **`src/components/HeroSection.tsx:41`** — `setInterval(next, 6000)` uses a bare 6000 ms. Promote to `const SLIDE_INTERVAL_MS = 6000;`. — REVIEW.
- **Two `HowItWorks` components** — `src/components/product/HowItWorks.tsx` and `src/components/sections/HowItWorks.tsx` serve different surfaces but share the name. Rename `sections/HowItWorks` to `sections/FormulationPrinciples` or similar to avoid confusion. — REVIEW.
- **`src/integrations/supabase/types.ts:1-175`** — 175-line auto-generated types file is fine, but the leading comment says "Do not edit it directly" — confirm the regen workflow is documented somewhere for future contributors. — REVIEW.
- **Bundle size** — single 1.45 MB chunk, no route code-splitting in `src/App.tsx`. Convert each page import to `React.lazy(() => import(...))` and wrap routes in `<Suspense>`. — REVIEW.
- **`src/data/products.ts:1-15`** — Aliases like `const glyco8Hero = glyco8;` suggest a half-finished migration from per-image hero assets to a single product photo. Either remove the aliases (use `glyco8` directly) or restore the dedicated images. — REVIEW.

### Low / Nice to have
- React Refresh warnings on `src/components/ui/badge.tsx`, `button.tsx`, `form.tsx`, `navigation-menu.tsx`, `scroll-animations.tsx`, `sidebar.tsx`, `sonner.tsx`, `toggle.tsx` — variant helpers exported from the same file as components. Standard shadcn pattern; safe to leave. — REVIEW (cosmetic).
- `src/hooks/use-toast.ts` (custom) and Sonner (`src/components/ui/sonner.tsx`) are both wired into `App.tsx:37-38`. Two toast systems coexist — pick one. Most components use Sonner; the custom Toaster is rarely used. — REVIEW.
- `src/components/sections/CountdownBanner.tsx:25,30` — magic number `3 * 86400000` for default end date. Extract to a named constant. — REVIEW.
- `src/data/products.ts` is 589 lines of inline data — fine for now, but splitting per-product would make collaboration easier. — REVIEW.
- `eslint.config.js:18-21` — `"@typescript-eslint/no-unused-vars": "off"` disables a useful safety net globally. — REVIEW.

### Security
- **`.env` tracked, not gitignored** — see URGENT #2. SAFE auto-fix applied: added `.env` and `.env.local` to `.gitignore`. The file itself stays in the repo (would need explicit deletion + history rewrite to fully scrub; flagged for review).
- **Hard-coded password gate** — see URGENT #1.
- **Hard-coded Shopify token** — Storefront token is intended to be public; safe in client code. Should move to env vars for hygiene.
- **Supabase RLS** — Confirmed correct. `supabase/migrations/20260409124451_f19f8000-591b-4f0f-a536-94cbbd66db0f.sql` enables RLS on `email_signups`, allows anon INSERT only, denies SELECT. Good.
- **No CSP / security headers** — no headers file (`vercel.json`, `_headers`, etc.) found. Adding a basic CSP would help. — REVIEW.

### Accessibility (code level)
- **`src/components/CartDrawer.tsx:36-39`** — close button has no `aria-label`. — SAFE, applied.
- **`src/components/SearchOverlay.tsx:60-62`** — close button has no `aria-label`. — SAFE, applied.
- **`src/components/PasswordGate.tsx:46`** — lock icon is decorative but has no `aria-hidden="true"`. Password input has no associated `<label>`. — SAFE (aria-hidden) applied; label flagged for review because it would change visible UI.
- **`src/components/CookieConsent.tsx:88-104`** — Analytics and Marketing toggles use `<button>` instead of true switch inputs. No `role="switch"`, no `aria-checked`. Screen readers announce them as plain buttons. — SAFE, applied (added `role="switch"` and `aria-checked` to existing buttons; visible UI unchanged).
- **`src/pages/PreLaunch.tsx:94`** — Email input has no associated `<label>`. — REVIEW (would change visible UI).
- **`src/components/sections/Testimonials.tsx:17-19`** and **`src/components/product/ProductTestimonials.tsx`** — star ratings rendered as text "★" with no `aria-label`. Add `<span aria-label="5 out of 5 stars" role="img">` wrapping. — REVIEW.
- **`src/components/ProductCard.tsx:19`** and `src/components/sections/FAQ.tsx:41`, `src/components/product/ProductFAQ.tsx:35`, `src/pages/Shop.tsx:267` — `<a href="#">` "support team" links. — REVIEW (need a real link target).
- **`src/pages/PerformanceCategory.tsx:104-107`** — search input has icon but no label, no aria-label, no state binding. — REVIEW.
- **Keyboard navigation** — Mobile drawer in `src/components/Navbar.tsx:202-298` does not trap focus; pressing Tab can move focus into the page behind. SearchOverlay (`src/components/SearchOverlay.tsx`) does not restore focus to the trigger button on close. — REVIEW.
- **`src/components/CookieConsent.tsx:74-77`** — close (X) button maps to "Reject All" rather than "dismiss" — surprising behaviour for users who expect X to close. — REVIEW.

---

## PILLAR B — UI / UX

### Critical
- **`src/pages/AppLanding.tsx:147-154`** — Hero CTA "Join the Waitlist" and bottom CTA email field do nothing. Top of the page funnel is broken. — REVIEW.
- **`src/components/QuickAddModal.tsx:42-44`** — "Add to basket" button has no `onClick`. The whole quick-add flow ends at the modal. — REVIEW (wiring requires real `addItem` integration matching existing patterns in `TrustedFormulas.tsx`).
- **`src/components/product/ProductReviews.tsx:18-20`** — "Write a Review" button has no handler. — REVIEW.
- **`src/pages/PerformanceCategory.tsx:104-122`** — search input, Goal/Category/Sort filter chips are all visual-only stubs. Users will try to use them. — REVIEW.

### High
- **Dead `href="#"` links**:
  - `src/components/Footer.tsx:13,22,31,40` — 4 social icons.
  - `src/pages/PreLaunch.tsx:136-138` — 3 social icons.
  - `src/pages/Shop.tsx:267` — "support team" link.
  - `src/components/sections/FAQ.tsx:41` — "support team" link.
  - `src/components/product/ProductFAQ.tsx:35` — "support team" link.
  - `src/components/ProductCard.tsx:19` — "View all" (component is dead, but still flagged).
  - `src/components/AnnouncementBar.tsx:13-15` — "Shop Now" is in a `<span>` with `cursor-pointer` but no link target.
- **Non-functional placeholder buttons on Shop and PerformanceCategory hero/CTA sections** — `src/pages/Shop.tsx:85,86,284,285`; `src/pages/PerformanceCategory.tsx:73,152,220`. Repeat offenders: "Shop all", "View stacks", "Explore", "Explore Stack Systems", "Shop Collection", "View Stacks", "Learn more". — REVIEW.
- **`src/components/sections/ReadyToPerform.tsx:13,16`** — "Shop now" / "Take assessment" buttons with no handlers. — REVIEW.
- **`src/components/sections/ScienceSection.tsx:45`** — "Read the Science" button with no handler. — REVIEW.
- **`src/components/SearchOverlay.tsx:93-99`** — Quick Links section renders four buttons with no `onClick`. — REVIEW.
- **`src/components/HeroSection.tsx:6-26`** — All three carousel slides use the same `heroBg` image. The whole point of a carousel (visual variety) is undermined. — REVIEW.
- **Blog category filter URLs don't filter** — `src/components/Navbar.tsx:116-119,266-269` link to `/blog?category=ingredient-science` etc., but `src/pages/Blog.tsx` does not read `useSearchParams` and renders the full list every time. — REVIEW.
- **Footer link map mismatch** — `src/components/Footer.tsx:4-7` — "FAQ" links to `/about`, "Pre-workout / Recovery / Daily / Stacks" all link to `/shop` (no filter applied), "Research" and "Articles" both go to `/blog`. Functional but misleading; users expect FAQ to be FAQ. — REVIEW.

### Medium
- **`src/components/sections/Team.tsx:8-15`** — "Team Reveal Coming Soon" stub. Either populate or remove the section before launch. — REVIEW.
- **`src/components/product/ProductReviews.tsx`** — "No reviews yet" empty state is honest, but the section adds little to a product page before launch. Consider conditional rendering until reviews exist. — REVIEW.
- **`src/components/sections/HowItWorks.tsx`** vs **`src/components/sections/ScienceSection.tsx`** — overlap in message ("formulated for mechanism, not marketing" appears in both). Pick one. — REVIEW.
- **No 404 styling** — `src/pages/NotFound.tsx` uses default tokens but has no Navbar, no Footer, no brand presence. Looks like a default Vite page. — REVIEW.
- **Cookie consent X button = Reject All** — counterintuitive. — REVIEW.
- **No loading state on product detail page** — `src/pages/ProductDetail.tsx` does a synchronous `getProduct(slug)` from local data, so this is fine today, but if/when products move to Supabase or Shopify there is no skeleton.
- **No empty state on Shop filter** — `src/pages/Shop.tsx:147-167` renders an empty grid silently if no products match. Add "No products in this category" copy. — REVIEW.
- **Touch target sizes** — Several icon-only buttons use `p-1` (`CookieConsent.tsx:77`, others) giving roughly 24-28 px touch target. Recommend minimum 40-44 px on mobile. — REVIEW.

### Low / Nice to have
- **Star rating uses literal "★" character** — `src/pages/Shop.tsx:206`, `src/components/sections/Testimonials.tsx:17-19`, `src/components/product/ProductReviews.tsx:11-13`. Mixed style with `lucide-react`'s `<Star />` used elsewhere (`ProductTestimonials.tsx`, `QuickAddModal.tsx`). Standardise. — REVIEW.
- **Hard-coded address appears in three places**: `Footer.tsx:59-61`, `Contact.tsx:42-46`, `About.tsx:57-60`. Make a `BRAND_ADDRESS` constant or pull from a content file. — REVIEW.
- **Emoji in `src/components/CookieConsent.tsx:55`** — "🍪 We value your privacy" — first-class emoji in heading reads casually for a clinical brand. — REVIEW.
- **PreLaunch page heading "BASE**LINE**" pattern in `PasswordGate.tsx:38` and prelaunch logo image** — minor inconsistency between brand text rendering. — REVIEW.
- **`src/pages/AppLanding.tsx:33-35`** — Three "screenshot" entries use the same three real assets; if any one image fails to load it's not obvious to the user (no `onError` fallback). — REVIEW.

### Anti-pattern flags
- **Identical card grids** — Best Sellers (`TrustedFormulas.tsx`), Shop products grid (`Shop.tsx`), PerformanceCategory products grid all use the same 4-up image-then-title pattern. Consider one varied surface to break the rhythm.
- **Generic stock photography** — `category-performance.jpg`, `category-metabolic.jpg`, `category-recovery.jpg`, `category-health.jpg` look like AI/stock placeholders (not visible but worth a content review). — REVIEW.
- **Centred-text-only hero on AppLanding CTA** — works, but combined with centred testimonials and centred Newsletter CTA the page rarely breaks alignment.

---

## PILLAR C — FUNCTIONALITY

### Critical
- **AppLanding waitlist form** — dead. (HIGH)
- **PerformanceCategory search + filters** — dead. (HIGH)
- **QuickAddModal add-to-basket** — dead. (HIGH)

### High
- **Cart sync error handling silent** — `src/stores/cartStore.ts:92,118,140,159` and `src/lib/shopify.ts:162,184,202,217` all `console.error` on Shopify failures but never surface to the user. The Sonner toast library is already imported (`src/lib/shopify.ts:1`). Add `toast.error("Couldn't update your basket — please try again")` on failure paths. — REVIEW.
- **`src/components/sections/Newsletter.tsx:18-22`** — duplicate-email path silently treats `23505` as success. User has no way to tell they were already subscribed; not strictly broken but misleading. The same pattern in `src/pages/PreLaunch.tsx:25-29`. — REVIEW.
- **No double-submit guard on PreLaunch form** — `src/pages/PreLaunch.tsx:14-38`. The `loading` state disables the button but the form does not check `loading` at the top of `handleSubmit`. Likely fine because of the disabled prop, but worth a tightening. — REVIEW.
- **`src/pages/Deck.tsx:55`** — `console.error("Export failed:", e)` but no user-facing toast when the deck PDF export fails. — REVIEW.

### Medium
- **`src/lib/shopify.ts:62-67`** — 402 Payment Required surfaces a toast `"Shopify: Payment required"`. Good defensive code, but the user-facing copy is too technical. — REVIEW.
- **Browser back/forward on cart** — Cart drawer is open-state in Zustand, not in URL. Pressing back while drawer is open will navigate away from the page instead of closing the drawer. — REVIEW.
- **Mobile drawer body-scroll-lock** — `src/components/Navbar.tsx:77-80` correctly sets `body.overflow = "hidden"`, but resets to `""` (not the previous value). If anything else writes to `body.overflow` (cookie consent, modals), they could trample each other. — REVIEW.
- **Cookie consent timer** — `src/components/CookieConsent.tsx:18` shows banner after 1500 ms delay, but until the user accepts/rejects we are loading every cookie unconditionally. Verify nothing analytics-driven runs before consent. — REVIEW.

### Low / Nice to have
- **`src/pages/NotFound.tsx:8`** — console.error is for dev only; ship-time consider routing 404s to an analytics event instead. — REVIEW.
- **`useCartSync.ts:8-13`** — Re-syncs on visibility change; fine. Consider also syncing on `pageshow` for back/forward cache.

### Cross-browser / cross-device
- Not tested in this audit (no live env).
- Animations rely on `framer-motion` and Tailwind transitions — supported everywhere.
- The mobile drawer uses fixed positioning with z-index 70; verify no Safari iOS scroll-bleed.

### SEO and metadata
- **`index.html:6,11`** — Two leftover `<!-- TODO: ... -->` comments. — SAFE, applied.
- **`index.html`** — has og:title, twitter:title, etc. duplicated below the head section markup, fine but layout is messy.
- **No sitemap.xml** — Only `robots.txt` exists. — REVIEW.
- **One `<h1>` per page** — verified on Shop (`Shop all baseline`), ProductDetail (product name), Blog ("Science-Led Resources"), About, Contact, PerformanceCategory ("Performance Supplements"). Good.
- **Helmet present on**: AppLanding, BlogArticle, Blog, KnowledgeBase. Missing on: Shop, ProductDetail, Index, PerformanceCategory, About, Contact. — REVIEW (add per-page titles and descriptions).

---

## DEAD CODE / UNUSED ASSETS

Do NOT delete without owner sign-off. Listed for review.

### Components (no imports anywhere in src):
- `src/components/ProductCard.tsx`
- `src/components/NavLink.tsx`
- `src/App.css` (only `index.css` is imported in `main.tsx`)

### Image assets in `src/assets/` not referenced anywhere (the team appears to have migrated to `src/assets/products/*.jpg` versions):
- `electro-flow.png`, `electro-flow-hero.png`
- `fusion-black.png`, `fusion-black-hero.png`
- `fusion-lite-plus.png`, `fusion-lite-plus-hero.png`
- `glyco8.png`, `glyco8-hero.png`, `glyco8-label.png`, `glyco8-capsules.png`
- `glycoshift.png`, `glycoshift-hero.png`
- `h2o-go.png`
- `hero-bg.jpg`
- `logo-dark.jpg`, `logo-light.jpg` (only `.png` variants used)
- `prelaunch-hero.jpg` (v2 is the one used)
- `purest-creatine.png`
- `vascul8.png`, `vascul8-hero.png`

### Dead variable aliases in `src/data/products.ts:2-12`:
- `glyco8Hero`, `glyco8Capsules`, `glyco8Label`, `fusionLitePlusHero`, `vascul8Hero`, `glycoshiftHero`, `electroFlowHero` — all alias the same image they came from. Either remove or restore the real hero images.

---

## SECURITY FLAGS

- See URGENT section.
- `src/components/PasswordGate.tsx:5` hard-coded password — flagged.
- `.env` committed — flagged.
- `src/lib/shopify.ts:6` hard-coded Storefront token — acceptable (public by design) but should move to env.
- No CSP headers — flagged.
- Supabase RLS — verified correct.
- `target="_blank"` external links in policy pages — verified they include `rel="noopener noreferrer"` (per agent inspection of `src/pages/PrivacyPolicy.tsx:103`, `src/pages/CookiePolicy.tsx:93-96`).

---

## DEPENDENCY HEALTH

- **Conflict**: `vite@^8.0.0` vs `lovable-tagger@1.1.13` (peers `<8.0.0`). `npm install` fails plain; works with `--legacy-peer-deps`. See URGENT #4.
- **Unused dependencies in `package.json`**:
  - `@radix-ui/react-context-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-resizable-panels`, `cmdk`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `recharts`, `vaul`. Many ship with shadcn ui scaffolding but are never imported into pages. — REVIEW (manual audit recommended; do not auto-remove because shadcn ui files may use them).
- **`bun.lock`** is committed alongside `package-lock.json`. Pick one package manager.
- **Test scaffolding**: `@playwright/test` is in dev deps and `playwright.config.ts` exists, but `playwright-fixture.ts` imports from `lovable-agent-playwright-config` which is not in `package.json`. The Playwright fixture as written will fail to resolve. — REVIEW.
- No `npm audit` run (network policy may block). — REVIEW.

---

## RECOMMENDED FIX ORDER

1. **Critical / security / broken functionality**
   - Decide on the password gate (remove or move server-side).
   - Add `.env` to `.gitignore` and rotate Supabase anon key if any non-public data is ever added.
   - Pin vite back to a version `lovable-tagger` accepts, or remove `lovable-tagger`.
   - Wire AppLanding waitlist form (Supabase, same pattern as Newsletter.tsx).
   - Wire QuickAddModal "Add to basket" (use `useCartStore.addItem` + `VARIANT_MAP`).
   - Wire PerformanceCategory search and filter buttons or remove them.
   - Replace all `href="#"` social links with real URLs or remove them.

2. **High-impact UX**
   - Provide three distinct hero images on `HeroSection.tsx` carousel.
   - Make `/blog?category=...` filter actually filter.
   - Resolve footer link mismatches (FAQ pointing to /about, etc.).
   - Add per-page Helmet titles/descriptions where missing.
   - Surface cart errors via Sonner.
   - Add empty states for Shop filters and ProductReviews.

3. **Code quality refactors**
   - Consolidate product data into `src/data/products.ts` and import everywhere.
   - Move `VARIANT_MAP` out of `ProductHero.tsx` into `src/lib/shopify.ts` or the products data file.
   - Lazy-load routes in `App.tsx`.
   - Optimise prelaunch hero image (1.1 MB → < 300 KB WebP/AVIF).
   - Remove dead components, dead CSS file, unused image assets.
   - Pick one toast system (Sonner) and remove the other.

4. **Nice-to-haves**
   - Add a sitemap.
   - Add CSP headers.
   - Star ratings: use semantic markup.
   - Rename `sections/HowItWorks` to disambiguate from `product/HowItWorks`.
   - Move hard-coded brand address into one constant.

---

## CHANGES APPLIED — phase 1 (safe auto-fixes)

The fixes below are non-visible code hygiene changes that do not affect UI, copy, or business logic.

1. **`.gitignore`** — added `.env`, `.env.local`, `.env.*.local` entries so future env files aren't accidentally committed. The currently tracked `.env` is left in place (deletion would alter history; flagged for owner review).
2. **`src/stores/cartStore.ts:135`** — replaced ternary-used-as-expression with a real `if/else`. Fixes ESLint `no-unused-expressions` error; behaviour identical.
3. **`tailwind.config.ts:1,90`** — switched `require("tailwindcss-animate")` (CommonJS) to a top-level ESM `import tailwindcssAnimate from "tailwindcss-animate";`. Fixes ESLint `no-require-imports` error; behaviour identical.
4. **`src/components/ui/command.tsx:24`** — replaced empty interface `CommandDialogProps extends DialogProps {}` with a `type` alias. Fixes `@typescript-eslint/no-empty-object-type` error; behaviour identical.
5. **`src/components/ui/textarea.tsx:5`** — replaced empty interface `TextareaProps extends ...` with a `type` alias. Same reasoning.
6. **`src/components/CartDrawer.tsx:36-39`** — added `aria-label="Close cart"` to the cart drawer's close button.
7. **`src/components/SearchOverlay.tsx:60-62`** — added `aria-label="Close search"` to the search overlay's close button.
8. **`src/components/PasswordGate.tsx:46`** — added `aria-hidden="true"` to the decorative lock icon's container so screen readers skip it.
9. **`src/components/CookieConsent.tsx`** — added `role="switch"` and `aria-checked={analytics}` / `aria-checked={marketing}` to the toggle buttons so screen readers announce them as switches. Visual appearance unchanged.
10. **`index.html:6,11`** — removed two leftover `<!-- TODO: ... -->` comments. No visible change.

## CHANGES APPLIED — phase 2 (next-phase fixes)

### Dependencies / build
- **`package.json`**: pinned `vite` to `^7.0.0` and `@vitejs/plugin-react` to `^5.0.0` to resolve the peer-dependency conflict with `lovable-tagger`. `npm install` now succeeds without `--legacy-peer-deps`.
- **Route code splitting**: every page is now `React.lazy()` in `src/App.tsx`. Main initial JS chunk dropped from 1.45 MB to 567 KB; heavy routes (Deck with jspdf/html2canvas) load on demand.

### Wired dead CTAs
- **`src/pages/AppLanding.tsx`**: the "Join the Waitlist" form is now a real Supabase signup (`source: "app-waitlist"`) with loading, success, and error states matching `Newsletter.tsx`. Hero "Join the Waitlist" button scrolls to the form; "Learn More" jumps to features.
- **`src/components/QuickAddModal.tsx`**: "Add to basket" now calls `useCartStore.addItem` with the right Shopify variant, shows loading state, opens the cart drawer, and toasts errors when the variant isn't mapped or pricing is unavailable.
- **`src/pages/PerformanceCategory.tsx`**: search, category chips, and sort dropdown now drive real filtering. Featured collection cards' "Shop Collection" buttons set the active filter and scroll to the grid. "Explore Stack Systems" and "View Stacks" turned into `Link`s to `/shop`. Added empty-state with clear-filters reset.
- **`src/pages/Shop.tsx`**: hero "Shop all" scrolls to product grid; "View stacks" is a real link; "Explore" buttons on category cards now set the matching filter; bottom "Shop now" / "Learn more" wired to grid scroll and `/about`. Added empty state when zero products match. Added `Helmet` title/description.
- **`src/pages/Blog.tsx`**: now reads `?category=` query param (mapped through `PILLAR_BY_SLUG` to handle the slug-style URLs already in the navbar) and filters articles by pillar. Adds dynamic page title and a "View all articles" reset link.
- **`src/components/SearchOverlay.tsx`**: Quick Links now navigate to real routes and close the overlay.
- **`src/components/sections/ReadyToPerform.tsx`**: "Shop now" and "Take assessment" replaced with working `Link`s (`/shop` and `/knowledge-base`).
- **`src/components/sections/ScienceSection.tsx`**: "Read the Science" now links to `/knowledge-base`.
- **`src/components/product/ProductReviews.tsx`**: "Write a Review" button is now a `Link` to `/contact` until reviews are wired.
- **`src/components/AnnouncementBar.tsx`**: "Shop Now" span turned into a real `Link` to `/shop`. Threshold value pulled from the brand config.

### Removed dead `href="#"` links
- **`src/pages/Shop.tsx`**, **`src/components/sections/FAQ.tsx`**, **`src/components/product/ProductFAQ.tsx`**: all three "support team" `href="#"` anchors replaced with `<Link to="/contact">`.
- **Social icons**: introduced `src/data/brand.ts` with a `SOCIAL_LINKS` array. Entries with empty URLs render nothing, removing the four footer + three pre-launch dead links. Real URLs can be pasted into this single file when channels go live.

### Refactor / consolidation
- **`src/lib/shopify.ts`**: `VARIANT_MAP` moved here (out of `src/components/product/ProductHero.tsx`). Both `StickyAddToCart` and `TrustedFormulas` now import from the lib file. Store domain and storefront token both read from `import.meta.env` with safe fallbacks.
- **`src/data/brand.ts`** (new): centralised `BRAND_NAME`, `BRAND_TAGLINE`, `BRAND_EMAIL`, `BRAND_ADDRESS`, `FREE_SHIPPING_THRESHOLD`, and `SOCIAL_LINKS`. `Footer.tsx`, `AnnouncementBar.tsx`, `CartDrawer.tsx`, and `PreLaunch.tsx` now read from it.
- **`src/components/Footer.tsx`**: link map restructured. "FAQ" no longer points at `/about`; support column now points at contact and policy pages.
- **`src/pages/Deck.tsx`**: `useCallback` deps array includes `slides.length`; export failures now surface via Sonner toast instead of silently logging.

### Cart error surfacing
- **`src/stores/cartStore.ts`**: every `console.error` catch in `addItem`, `updateQuantity`, `removeItem` now also calls `toast.error("We couldn't update your basket. Please try again.")`.

### Per-page metadata
- Added `<Helmet>` titles and descriptions to `src/pages/Index.tsx`, `Shop.tsx`, `ProductDetail.tsx`, `PerformanceCategory.tsx`, `About.tsx`, and `Contact.tsx`. Blog now produces a category-aware title.

### Newsletter / PreLaunch hardening
- **`src/pages/PreLaunch.tsx`** `handleSubmit` now bails out when `loading` is already true (double-submit guard).
- Newsletter dedupe path unchanged in this phase (still shows success on duplicate `23505`) — flagged for review.

### Toast system consolidated to Sonner
Deleted the dead shadcn toast layer:
- `src/hooks/use-toast.ts`
- `src/components/ui/use-toast.ts`
- `src/components/ui/toaster.tsx`
- `src/components/ui/toast.tsx`
`App.tsx` no longer mounts the shadcn `<Toaster />`; Sonner is now the single toast surface.

### Dead code removed
- Components: `src/components/ProductCard.tsx`, `src/components/NavLink.tsx`
- File: `src/App.css` (never imported)
- 20 unused image assets in `src/assets/` (the `.png` files and old `.jpg` variants the team had migrated away from)

### Still REVIEW-only (owner decision required)
- **Password gate** — `src/components/PasswordGate.tsx` still uses a hard-coded password. Needs the owner to decide between removing the gate, replacing with a deploy-platform gate (Cloudflare Access / Vercel password protection), or accepting the soft-curtain model.
- **`.env` removal from git history** — destructive history rewrite, owner decision.
- **`prelaunch-hero-v2.jpg` (1.1 MB)** — needs image tooling to compress.
- **`HeroSection.tsx` 3 distinct slide images** — content task.
- **`Team.tsx` "Team Reveal Coming Soon"** — content task.
- **Social URLs** — populate `SOCIAL_LINKS` in `src/data/brand.ts` when channels go live.
- **Hero stock photography** for `category-*.jpg` images — content task.
- **Newsletter / PreLaunch duplicate-email UX** — currently silent success on dupe; UX decision.
