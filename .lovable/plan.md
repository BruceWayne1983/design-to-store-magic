# Plan: Content Expansion + Legal Rewrite

## 1. Request-an-Article (Ingredient Insights)

- Add a `RequestArticleForm` component below the existing newsletter block on `/ingredient-insights`.
- Fields: name, email, ingredient/topic, optional note. Zod validation (trim, max lengths, email format).
- Submission: POST to a placeholder handler that fires a custom `window.dispatchEvent('klaviyo:article-request', detail)` and shows a success toast. Wired to drop into Klaviyo later — you supply list ID + key, we connect.
- Link "View all articles" CTA on Ingredient Insights → `/blog?category=ingredient-science`.

## 2. Training Science page (`/training-science`)

Same architectural pattern as Ingredient Insights so it feels native:

- **Hero band** — Bebas headline, navy gradient, sub-line on evidence-based training.
- **Category filter rail** — Programming, Periodisation, Nutrient Timing, Recovery, Hydration Strategy.
- **Article grid** — pulls from `src/data/articles.ts` filtered by `category: 'training-science'` (seed with 6 placeholder posts you can replace).
- **Protocol Guides block** — 3 long-form guide cards (Programming, Periodisation, Nutrient Timing) linking to `/blog/[slug]` stubs.
- **Featured Coaches section** — 3-up coach cards (photo, name, credentials, link to their articles). Placeholder data in `src/data/coaches.ts`.
- **Newsletter signup + Request-an-Article** — reuse the components from Ingredient Insights.
- **"View all training articles" CTA** → `/blog?category=training-science`.
- Add nav entry under the Health/Performance mega menu and footer.

## 3. Founders page (`/founders`)

- New top-level route. Layout shell matches About:
  - Hero with founder portrait slot + brand mission line.
  - "Our Story" rich-text block (placeholder until you supply copy).
  - Founder profile cards (name, role, bio, portrait, optional LinkedIn).
  - "Why Baseline" pillars (3-up, reuses TrustBar styling).
  - CTA band → Shop / About.
- Linked from: main nav (under About), `/about` body, and Footer "Company" column.
- All copy left as clearly-marked `{{PLACEHOLDER}}` blocks until you send the content.

## 4. Terms & Conditions rewrite — `/terms`

Rewrite to UK e-commerce best practice. Sections:

1. Definitions & company info (placeholder for registered address, company no., VAT no. — you supply)
2. Acceptance of terms
3. Eligibility (18+, supplements disclaimer)
4. Products, descriptions, pricing (GBP, VAT-inclusive, right to correct errors)
5. Orders & contract formation (offer/acceptance per Consumer Contracts Regs 2013)
6. Payment & security
7. Delivery (UK + international, risk transfer on delivery)
8. **Right to cancel** — 14-day cooling-off under Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, with the sealed-goods/hygiene exemption for opened supplements
9. Returns, refunds, faulty goods — Consumer Rights Act 2015 (satisfactory quality, fit for purpose, as described)
10. Subscriptions (cancellation, billing cycle, price changes)
11. Promotional codes & discounts
12. Health disclaimer & intended use (not medical advice, consult GP)
13. Intellectual property
14. Acceptable use / accounts
15. Liability (cap, statutory rights preserved, no exclusion for death/personal injury)
16. Privacy & data → links `/privacy`
17. Force majeure
18. Governing law & jurisdiction — England & Wales
19. Complaints & ADR contact
20. Changes to terms + last-updated date

Placeholders flagged in-page for: registered address, company number, VAT number, complaints email, ADR provider. You send → we drop in.

## Technical notes

- New routes registered in `src/App.tsx`: `/training-science`, `/founders`. T&Cs edits `src/pages/Terms.tsx`.
- New components: `src/components/forms/RequestArticleForm.tsx`, `src/components/sections/CoachGrid.tsx`, `src/components/sections/ProtocolGuides.tsx`.
- New data files: `src/data/coaches.ts`, extend `src/data/articles.ts` with `training-science` category + seed posts.
- Sitemap.xml + nav/mega-menu + Footer updated to include the three new routes.
- Zod schemas for the request form; no backend table created (Klaviyo-only as requested).

## Out of scope (this round)

- Klaviyo API wiring (waiting on list IDs/keys).
- Real founder/coach copy and portraits.
- Legal sign-off — output is a strong UK-standard draft, not solicitor-reviewed.
