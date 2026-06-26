// Tiered multibuy discounts applied automatically per-line based on quantity.
// 2 = 10% off, 3 = 15% off, 4+ = 20% off.
export interface MultibuyTier {
  minQty: number;
  discount: number;
  label: string;
}

export const MULTIBUY_TIERS: MultibuyTier[] = [
  { minQty: 4, discount: 0.2, label: "Buy 4+ · Save 20%" },
  { minQty: 3, discount: 0.15, label: "Buy 3 · Save 15%" },
  { minQty: 2, discount: 0.1, label: "Buy 2 · Save 10%" },
];

export const discountForQty = (qty: number): number => {
  for (const tier of MULTIBUY_TIERS) {
    if (qty >= tier.minQty) return tier.discount;
  }
  return 0;
};

export const lineSubtotal = (unitPrice: number, qty: number): number =>
  unitPrice * qty;

export const lineSavings = (unitPrice: number, qty: number): number =>
  lineSubtotal(unitPrice, qty) * discountForQty(qty);

export const lineDiscountedTotal = (unitPrice: number, qty: number): number =>
  lineSubtotal(unitPrice, qty) - lineSavings(unitPrice, qty);
