import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { VARIANT_MAP } from "@/lib/shopify";
import type { ProductData } from "@/data/products";

interface StickyAddToCartProps {
  product: ProductData;
  buyButtonRef: React.RefObject<HTMLButtonElement>;
  selectedSize?: string;
  selectedFlavor?: string;
}

const StickyAddToCart = ({ product, buyButtonRef, selectedSize, selectedFlavor }: StickyAddToCartProps) => {
  const [visible, setVisible] = useState(false);
  const { addItem, isLoading, setCartOpen } = useCartStore();

  const selectedSizeData = product.sizes?.find((s) => s.name === selectedSize) || product.sizes?.[0];
  const currentPrice = selectedSizeData?.price || product.price;
  const priceNum = parseFloat(currentPrice.replace(/[^0-9.]/g, ""));
  const selectedVariantId = selectedSizeData?.variantId || VARIANT_MAP[product.slug];
  const canAddToCart = !!selectedVariantId && !product.comingSoon;

  useEffect(() => {
    const el = buyButtonRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [buyButtonRef]);

  const handleAddToCart = async () => {
    if (!selectedVariantId) return;
    const variantTitle = [selectedSize, selectedFlavor].filter(Boolean).join(" • ") || "Default Title";
    await addItem({
      variantId: selectedVariantId,
      variantTitle,
      productTitle: product.name,
      productSlug: product.slug,
      productImage: product.images[0],
      price: priceNum,
      currencyCode: "GBP",
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
    setCartOpen(true);
  };

  const detailLabel = [selectedSize, selectedFlavor].filter(Boolean).join(" • ");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg"
        >
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-contain flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-foreground truncate">{product.name}</h4>
                <span className="text-sm text-muted-foreground">
                  {product.comingSoon ? "Coming Soon" : currentPrice}
                  {detailLabel && <span className="ml-1.5 text-[10px] uppercase tracking-wider">({detailLabel})</span>}
                </span>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isLoading || !canAddToCart}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity rounded flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.comingSoon ? "Coming Soon" : isLoading ? "Adding..." : "Add to basket"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyAddToCart;
