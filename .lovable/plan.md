
## Scope

Five changes across PDP, homepage, footer, and DB. No hero changes (kept for display). Product gallery images deferred until you upload new ones.

---

### 1. Native review system (Supabase)

**New table** `public.product_reviews`:
- `product_slug` (text) · `rating` (1–5) · `title` · `body` · `reviewer_name` · `verified` (bool, default false) · `approved` (bool, default false) · `user_id` (nullable for guest submissions) · timestamps.
- RLS: anyone can `SELECT` where `approved = true`; authenticated users can `INSERT` for themselves; guest inserts allowed with email + rate-limit check; only service_role can `UPDATE`/`DELETE` (moderation).
- GRANTs to `anon` (SELECT approved), `authenticated` (SELECT+INSERT), `service_role` (ALL).

**UI**
- Rebuild `src/components/product/ProductReviews.tsx`: pulls approved reviews for the current slug, shows aggregate rating + star breakdown, paginated list (5 per page), "Write a Review" opens a modal form (name, email, rating, title, body). Submissions land as `approved=false` and surface a "Thanks — your review is pending moderation" toast.
- Add a moderation queue to `/insights` (already password-gated `38475554`): list pending reviews with Approve / Reject buttons calling a small edge function `moderate-review` (service-role).
- Update PDP star summary in `ProductHero` / `ProductHeroV2` to read live count + average instead of "No reviews yet" placeholder.

---

### 2. Multibuy + Bundles (Both)

**Tiered multibuy on single SKUs** (applied automatically in cart):
- 2 units → 10% off, 3 → 15%, 4+ → 20%.
- Implement in `src/stores/cartStore.ts`: derive `multibuyDiscount` per line based on quantity; show savings line in `CartDrawer`.
- Surface on PDP: replace the current "Subscribe & save" sibling block with a small **"Buy more, save more"** card showing the three tiers and live "You save £X" as user changes qty.

**Curated bundles** (uses existing `/bundles` page + `src/data/bundles.ts`):
- Add `bundlePrice` + `compareAtPrice` to each bundle (Performance Stack, Metabolic Stack, Complete Stack).
- Add `BundleCard` "Add stack to cart" action that pushes all SKUs as a grouped line with the bundle discount pre-applied (flag `bundleId` on cart items so the discount can't be double-stacked with multibuy).
- Add a `BundlesStrip` to PDP under `RelatedStacks` linking to /bundles when the product appears in a stack.

---

### 3. V2 PDP for all products

- Remove the floating Before/After toggle and the `showToggle = slug === "electro-flow"` gate in `src/pages/ProductDetail.tsx`.
- Default every product to `ProductHeroV2` + `TrustStrip` + `ExpectationsTimeline`.
- Delete `ProductHero.tsx` usage (keep file temporarily for safety, mark deprecated) and remove the `pdp-layout` localStorage logic.
- Audit each product in `src/data/products.ts` to ensure the V2-required fields are populated (`outcomes`, `timeline`, `accordion` blocks, `flavours`, `sizes`). Fill gaps with the existing copy where present; flag any product missing data in the migration summary.

---

### 4. H2O Go — proper product

Currently a stub. Build out in `src/data/products.ts`:
- Full copy: tagline, hero subhead, 3-part `howItWorks`, `whyDifferentText`, `outcomes`, `timeline`, `accordion` (Ingredients / Directions / Storage / FAQs / Allergens / Subscribe).
- Nutrition Information rows (electrolytes per stick — sodium, potassium, magnesium, chloride + %NRV).
- `flavours` (e.g. Citrus, Berry, Mango — confirm with you before locking) and `sizes` (single 20-stick pack to start).
- Reuse existing Electro Flow mechanism imagery placeholders until you supply H2O Go-specific renders.
- Add to homepage `TrendingBestsellers` and mega menu under Hydration.

---

### 5. Footer logo fix

Findings from review:
- `logo-light.png` renders at `h-8 md:h-10` in `Footer.tsx` but the navbar uses `h-12 md:h-16` — visually undersized and inconsistent.
- PNG is 1× — looks soft on retina.

Fix:
- Bump footer logo to `h-10 md:h-12` (still smaller than navbar, balanced for footer hierarchy).
- Re-export from the uploaded `Baseline_logo.pdf` at 2× (≈800px wide transparent PNG) and replace `src/assets/logo-light.png`.
- Add `loading="lazy"` and explicit `width`/`height` to prevent CLS.

---

## Technical notes

- Edge function `moderate-review` (service-role) for approving/rejecting; called from `/insights` only after the password gate passes.
- Multibuy discount lives client-side for now (display + cart math); when migrating to Shopify it maps to Shopify automatic discounts / Price Rules — no schema lock-in.
- All new DB writes follow the existing pattern in `email_signups` / `product_feedback` (deny public reads, validated inserts).
- No changes to: hero slider, navbar, /coach, /community, blog, ingredient insights.

## Out of scope (this round)

- New PDP gallery images (you'll upload).
- Real review seed content (no fake reviews — empty state until first real submission).
- Shopify Price Rule sync (kept frontend-only for the prototype phase).
