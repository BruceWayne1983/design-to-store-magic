import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductData } from "@/data/products";

interface StickyAddToCartProps {
  product: ProductData;
  buyButtonRef: React.RefObject<HTMLButtonElement>;
}

const StickyAddToCart = ({ product, buyButtonRef }: StickyAddToCartProps) => {
  const [visible, setVisible] = useState(false);

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
                <span className="text-sm text-muted-foreground">{product.price}</span>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity rounded flex-shrink-0">
              Add to basket
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyAddToCart;
