import { useState } from "react";
import { ChevronDown, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ui/scroll-animations";
import { useCartStore } from "@/stores/cartStore";
import { VARIANT_MAP } from "@/lib/shopify";
import type { ProductData } from "@/data/products";

const ProductHero = ({ product, buyButtonRef }: { product: ProductData; buyButtonRef?: React.RefObject<HTMLButtonElement> }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState<"subscribe" | "onetime">("subscribe");
  const [suggestedUseOpen, setSuggestedUseOpen] = useState(false);
  const [suppFactsOpen, setSuppFactsOpen] = useState(false);
  const { addItem, isLoading, setCartOpen } = useCartStore();

  const isStaticDeckRender = (() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get("deckCapture") === "true") return true;
    try { return window.self !== window.top; } catch { return false; }
  })();

  const handleAddToCart = async () => {
    const variantId = VARIANT_MAP[product.slug];
    if (!variantId) return;
    const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ""));
    await addItem({
      variantId,
      variantTitle: "Default Title",
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

  return (
    <section className="w-full bg-background py-8 px-4 md:py-16 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
        <ScrollReveal className="flex flex-col gap-4 w-full lg:w-1/2" variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}>
          <motion.div
            className="w-full aspect-square bg-secondary rounded-lg flex items-center justify-center p-4 md:p-8 overflow-hidden"
            key={selectedImage}
            initial={isStaticDeckRender ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={isStaticDeckRender ? { duration: 0 } : { duration: 0.35 }}
          >
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-contain" loading="eager" decoding="sync" />
          </motion.div>
          <div className="flex gap-2 md:gap-3 overflow-x-auto">
            {product.images.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedImage(i)}
                whileHover={isStaticDeckRender ? undefined : { scale: 1.05 }}
                whileTap={isStaticDeckRender ? undefined : { scale: 0.95 }}
                className={`w-16 h-16 md:w-20 md:h-20 rounded border-2 overflow-hidden bg-secondary flex items-center justify-center p-1.5 md:p-2 transition-colors flex-shrink-0 ${selectedImage === i ? "border-primary" : "border-border"}`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain" loading="eager" decoding="sync" />
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="flex flex-col gap-5 md:gap-6 w-full lg:w-1/2" variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }} delay={0.15}>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">{product.name}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-1">{product.tagline}</p>
            {product.format && <p className="text-sm text-muted-foreground mt-1">{product.format}</p>}
          </div>

          <ul className="flex flex-col gap-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-foreground text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" /> {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-black text-foreground">{product.price}</span>
          </div>

          <div className="border border-border rounded-lg p-4 md:p-5 flex flex-col gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={purchaseType === "subscribe"} onChange={() => setPurchaseType("subscribe")} className="accent-primary" />
              <div>
                <span className="text-sm font-semibold text-foreground">Subscribe & Save</span>
                <span className="text-xs text-primary ml-2 font-bold">Save 10%</span>
              </div>
            </label>
            {purchaseType === "subscribe" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-col gap-3 pl-6">
                <p className="text-xs text-muted-foreground">Save on every order. Delivered automatically on your schedule. Pause or cancel anytime.</p>
              </motion.div>
            )}
            <label className="flex items-center gap-2 cursor-pointer border-t border-border pt-4">
              <input type="radio" checked={purchaseType === "onetime"} onChange={() => setPurchaseType("onetime")} className="accent-primary" />
              <div>
                <span className="text-sm font-semibold text-foreground">One-time purchase</span>
                <span className="text-sm text-muted-foreground ml-2">{product.price}</span>
              </div>
            </label>
          </div>

          <motion.button
            ref={buyButtonRef as React.Ref<HTMLButtonElement>}
            whileHover={isStaticDeckRender ? undefined : { scale: 1.02 }}
            whileTap={isStaticDeckRender ? undefined : { scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add to basket"}
          </motion.button>

          {product.ingredientLogos && product.ingredientLogos.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">Key Ingredients</span>
              <div className="flex items-center gap-6">
                {product.ingredientLogos.map((logo) => (
                  <div key={logo.name} className="bg-[hsl(220,20%,10%)] rounded-md px-5 py-3 flex items-center justify-center">
                    <img src={logo.image} alt={logo.name} className="h-[90px] w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col border-t border-border">
            <button className="flex items-center justify-between py-4 border-b border-border" onClick={() => setSuggestedUseOpen(!suggestedUseOpen)}>
              <span className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Suggested Use</span>
              <motion.div animate={{ rotate: suggestedUseOpen ? 180 : 0 }} transition={{ duration: 0.25 }}><ChevronDown className="w-4 h-4 text-muted-foreground" /></motion.div>
            </button>
            {suggestedUseOpen && <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-muted-foreground pb-4">{product.suggestedUse}</motion.p>}
            <button className="flex items-center justify-between py-4 border-b border-border" onClick={() => setSuppFactsOpen(!suppFactsOpen)}>
              <span className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Nutritional Information</span>
              <motion.div animate={{ rotate: suppFactsOpen ? 180 : 0 }} transition={{ duration: 0.25 }}><ChevronDown className="w-4 h-4 text-muted-foreground" /></motion.div>
            </button>
            {suppFactsOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-muted-foreground pb-4"><p>{product.supplementSummary}</p></motion.div>}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProductHero;
