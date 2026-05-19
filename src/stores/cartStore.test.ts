import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/shopify", () => ({
  createShopifyCart: vi.fn(),
  addLineToShopifyCart: vi.fn(),
  updateShopifyCartLine: vi.fn(),
  removeLineFromShopifyCart: vi.fn(),
  fetchCartStatus: vi.fn(),
  VARIANT_MAP: {},
}));

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

import * as shopify from "@/lib/shopify";
import { useCartStore } from "./cartStore";

const sample = {
  variantId: "gid://shopify/ProductVariant/1",
  variantTitle: "Default Title",
  productTitle: "Glyco8",
  productSlug: "glyco8",
  productImage: "/glyco8.jpg",
  price: 39.99,
  currencyCode: "GBP",
  quantity: 1,
};

const resetStore = () => {
  useCartStore.setState({
    items: [],
    cartId: null,
    checkoutUrl: null,
    isLoading: false,
    isSyncing: false,
    cartOpen: false,
  });
  localStorage.clear();
};

describe("cartStore", () => {
  beforeEach(() => {
    resetStore();
    vi.clearAllMocks();
  });

  afterEach(() => {
    resetStore();
  });

  it("totalItems and subtotal are 0 for an empty cart", () => {
    expect(useCartStore.getState().totalItems()).toBe(0);
    expect(useCartStore.getState().subtotal()).toBe(0);
  });

  it("creates a Shopify cart on first addItem and tracks the line", async () => {
    vi.mocked(shopify.createShopifyCart).mockResolvedValue({
      cartId: "cart-1",
      checkoutUrl: "https://example.com/checkout",
      lineId: "line-1",
    });

    await useCartStore.getState().addItem(sample);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].lineId).toBe("line-1");
    expect(state.cartId).toBe("cart-1");
    expect(state.checkoutUrl).toBe("https://example.com/checkout");
    expect(state.totalItems()).toBe(1);
    expect(state.subtotal()).toBeCloseTo(39.99);
  });

  it("totalItems sums quantities across items, subtotal multiplies by price", () => {
    useCartStore.setState({
      cartId: "cart-1",
      checkoutUrl: "https://x",
      items: [
        { ...sample, lineId: "line-1", quantity: 2 },
        { ...sample, variantId: "v2", lineId: "line-2", price: 10, quantity: 3 },
      ],
    });
    expect(useCartStore.getState().totalItems()).toBe(5);
    expect(useCartStore.getState().subtotal()).toBeCloseTo(2 * 39.99 + 3 * 10);
  });

  it("clearCart drops items and ids", () => {
    useCartStore.setState({
      cartId: "cart-1",
      checkoutUrl: "https://x",
      items: [{ ...sample, lineId: "line-1" }],
    });
    useCartStore.getState().clearCart();
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.cartId).toBeNull();
    expect(state.checkoutUrl).toBeNull();
  });

  it("updateQuantity removes the line when quantity hits 0", async () => {
    vi.mocked(shopify.removeLineFromShopifyCart).mockResolvedValue({ success: true });
    useCartStore.setState({
      cartId: "cart-1",
      checkoutUrl: "https://x",
      items: [{ ...sample, lineId: "line-1", quantity: 1 }],
    });

    await useCartStore.getState().updateQuantity(sample.variantId, 0);

    expect(shopify.removeLineFromShopifyCart).toHaveBeenCalledWith("cart-1", "line-1");
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
