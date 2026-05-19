## Goal
Replace all user-facing "Supplement Facts" labels with "Nutritional Information" across product pages and listings. Internal variable/component names stay as-is to avoid churn.

## Changes

1. **src/components/product/SupplementFacts.tsx** (line 12)
   - Card header label: `Supplement Facts` → `Nutritional Information`

2. **src/components/product/ProductHero.tsx** (line 142)
   - Pill/badge label: `Supplement Facts` → `Nutritional Information`

3. **src/lib/deckPdf.ts** (line 15)
   - Deck description: `...supplement facts...` → `...nutritional information...`

## Not changing
- Section heading "Clinically dosed formula" (already not "Supplement Facts").
- Internal identifiers (`SupplementFacts` component, `supplementRows` field) — non-user-facing.
- Code comment in `src/data/products.ts:100`.

Confirm and I'll apply.
