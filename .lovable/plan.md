## Scope
Fix the "How the ingredients work" mechanism blocks for the first two products only: **Fusion Lite+** and **VASCUL8™**. Generate the missing category-specific images, remap the blocks, and tighten copy/stats. No changes to other products, no PDP layout changes.

## New images to generate (4 total)
Saved under `src/assets/mechanisms/`:
1. `brain-synapse-focus.jpg` — neuron + synapse firing, electric-blue accent, dark navy bg (for Fusion Lite+ focus block)
2. `dual-phase-caffeine-curve.jpg` — energy curve diagram, two overlapping phases, navy/cyan (for Fusion Lite+ caffeine block)
3. `cell-hydration.jpg` — muscle cell drawing water in, osmotic gradient arrows, navy/cyan (for VASCUL8 hyperhydration block)
4. `gut-absorption.jpg` — intestinal villi / nutrient transporter uptake, navy/cyan (for VASCUL8 cumulative absorption block)

All match the existing clinical/molecular aesthetic (deep navy, electric blue, scientific diagram style).

## File edits — `src/data/products.ts`

### Fusion Lite+ (lines ~140–215)
- Import 2 new images: `brain-synapse-focus`, `dual-phase-caffeine-curve`.
- `mechanisms` block 01 (Focus): swap image to `brainSynapseFocus`. Replace weak stat "0 crash risk" with a dose-based stat (e.g. `300mg` Alpha-GPC or `200mg` L-Theanine).
- `mechanisms` block 02 (Caffeine): swap image to `dualPhaseCaffeineCurve`.
- `mechanisms` block 03 (Dopamine): swap image away from AMPK to `brainSynapseFocus` (reused) OR keep NO image — pick `brainSynapseFocus` for dopaminergic relevance.
- Normalise subtitle separators to `·` across all 3 blocks.
- Mirror image swaps in `clinicalMechanisms` if it reuses the same wrong assets.

### VASCUL8 (lines 261–278)
- Import 2 new images: `cellHydration`, `gutAbsorption`.
- `mechanisms` block 01 (Vasodilation): keep `mechanismNitricOxide`. Replace stat "2× NO pathways activated" with `100mg` Pycnogenol® clinical dose.
- `mechanisms` block 02 (Hyperhydration): swap `mechanismGlut4Pathway` → `cellHydration`. Replace one HydroPrime stat with `1,500mg Betaine` dose.
- `mechanisms` block 03 (Cumulative Absorption): swap `mechanismAmpkPathway` → `gutAbsorption`.
- `clinicalMechanisms` block 02: swap `mechanismGlut4Pathway` → `cellHydration` (matches mechanisms block).
- Line 250 howStep 3 copy: drop vague "MAX Catalyst™ adds bioavailability support" tail.
- Line 235 benefit: change "Effects compound over consecutive days via AstraGin®" → "Effects compound over weeks of daily use via AstraGin®".

## Out of scope
- Pricing TBC fields (separate task).
- Other 5 products (GLYCOSHIFT, GLYCO8, Electro Flow, etc.).
- PDP layout, V2 toggle, or any component changes.

## Verification
- Visual check on `/product/fusion-lite-plus` and `/product/vascul8` mechanism section.
- Confirm `clinicalMechanisms` strip still aligns with new images.
