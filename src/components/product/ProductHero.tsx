import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ui/scroll-animations";
import { useCartStore } from "@/stores/cartStore";
import { VARIANT_MAP, SELLING_PLAN_MAP, SUBSCRIPTION_DISCOUNT } from "@/lib/shopify";
import type { ProductData } from "@/data/products";
import SubscribeBenefitsModal from "./SubscribeBenefitsModal";

const FREQUENCIES = ["3 weeks", "4 weeks", "6 weeks"] as const;

const gbp = (n: number) => `£${n.toFixed(2)}`;

interface ProductHeroProps {
  product: ProductData;
  buyButtonRef?: React.RefObject<HTMLButtonElement>;
  selectedSize?: string;
  onSizeChange?: (size: string) => void;
  selectedFlavor?: string;
  onFlavorChange?: (flavor: string) => void;
}

const ProductHero = ({
  product,
  buyButtonRef,
  selectedSize: externalSize,
  onSizeChange,
  selectedFlavor: externalFlavor,
  onFlavorChange,
}: ProductHeroProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState<"subscribe" | "onetime">("onetime");
  const [suggestedUseOpen, setSuggestedUseOpen] = useState(false);
  const [suppFactsOpen, setSuppFactsOpen] = useState(false);
  const [frequency, setFrequency] = useState<(typeof FREQUENCIES)[number]>("4 weeks");
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const { addItem, isLoading, setCartOpen } = useCartStore();

  const [internalSize, setInternalSize] = useState(product.sizes?.[0]?.name ?? "");
  const [internalFlavor, setInternalFlavor] = useState(product.flavours?.[0]?.name ?? "");

  const selectedSize = externalSize ?? internalSize;
  const selectedFlavor = externalFlavor ?? internalFlavor;

  const handleSizeChange = (size: string) => {
    if (onSizeChange) onSizeChange(size);
    else setInternalSize(size);
  };

  const handleFlavorChange = (flavor: string) => {
    if (onFlavorChange) onFlavorChange(flavor);
    else setInternalFlavor(flavor);
  };

  const selectedSizeData = product.sizes?.find((s) => s.name === selectedSize);
  const currentPrice = selectedSizeData?.price || product.price;
  const basePrice = parseFloat(currentPrice.replace(/[^0-9.]/g, ""));
  const subscribePrice = basePrice * (1 - SUBSCRIPTION_DISCOUNT);
  const isSubscribe = purchaseType === "subscribe";

  const selectedVariantId = selectedSizeData?.variantId || VARIANT_MAP[product.slug];
  const canAddToCart = !!selectedVariantId && !product.comingSoon;

  const isStaticDeckRender = (() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get("deckCapture") === "true") return true;
    try { return window.self !== window.top; } catch { return false; }
  })();

  const handleAddToCart = async () => {
    if (!selectedVariantId || !basePrice) return;
    const sellingPlanId = isSubscribe ? SELLING_PLAN_MAP[product.slug] : undefined;
    const variantTitle = [selectedSize, selectedFlavor].filter(Boolean).join(" • ") || "Default Title";
    await addItem({
      variantId: selectedVariantId,
      variantTitle,
      productTitle: product.name,
      productSlug: product.slug,
      productImage: product.images[0],
      price: isSubscribe ? subscribePrice : basePrice,
      currencyCode: "GBP",
      quantity: 1,
      sellingPlanId,
      isSubscription: isSubscribe,
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

          {product.flavours && product.flavours.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Flavour</span>
                <span className="text-xs text-muted-foreground">{selectedFlavor}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.flavours.map((f) => {
                  const active = f.name === selectedFlavor;
                  return (
                    <button
                      key={f.name}
                      onClick={() => handleFlavorChange(f.name)}
                      disabled={f.available === false}
                      className={`relative aspect-square rounded-md border-2 bg-secondary flex items-center justify-center text-xs font-bold uppercase tracking-wider transition-colors ${active ? "border-primary text-foreground" : "border-border text-muted-foreground hover:border-primary/40"} ${f.available === false ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {f.image ? (
                        <img src={f.image} alt={f.name} className="w-full h-full object-cover rounded" />
                      ) : (
                        <span>{f.name}</span>
                      )}
                      {f.available === false && (
                        <span className="absolute bottom-1 right-1 text-[8px] font-bold uppercase bg-background/80 text-muted-foreground px-1 py-0.5 rounded">Soon</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Size</span>
                <span className="text-xs text-muted-foreground">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map((s) => {
                  const active = s.name === selectedSize;
                  return (
                    <button
                      key={s.name}
                      onClick={() => handleSizeChange(s.name)}
                      className={`flex flex-col items-start gap-1 p-3 rounded-md border-2 text-left transition-colors ${active ? "border-primary bg-secondary" : "border-border hover:border-primary/40"}`}
                    >
                      <span className="text-sm font-bold text-foreground">{s.name}</span>
                      {s.servings && <span className="text-xs text-muted-foreground">{s.servings}</span>}
                      <span className="text-sm font-semibold text-foreground">{s.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {product.comingSoon ? (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-black text-foreground">Coming Soon</span>
              </div>
              <button
                type="button"
                disabled
                className="w-full py-4 bg-secondary text-muted-foreground text-sm font-bold uppercase tracking-[0.2em] rounded cursor-not-allowed"
              >
                Coming Soon
              </button>
              <p className="text-xs text-muted-foreground">
                This product is launching soon. Join the newsletter to be notified when it goes live.
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-black text-foreground">
                  {isSubscribe ? gbp(subscribePrice) : currentPrice}
                </span>
                {isSubscribe && (
                  <span className="text-base text-muted-foreground line-through">{currentPrice}</span>
                )}
              </div>

              {/* Purchase options */}
              <div className="border border-border rounded-lg overflow-hidden">
                <label className={`flex items-center justify-between gap-2 cursor-pointer p-4 transition-colors ${!isSubscribe ? "bg-secondary" : ""}`}>
                  <span className="flex items-center gap-2">
                    <input type="radio" name="purchase" checked={!isSubscribe} onChange={() => setPurchaseType("onetime")} className="accent-primary" />
                    <span className="text-sm font-semibold text-foreground">One-time purchase</span>
                  </span>
                  <span className="text-sm font-semibold text-foreground">{currentPrice}</span>
                </label>
                <label className={`flex items-center justify-between gap-2 cursor-pointer p-4 border-t border-border transition-colors ${isSubscribe ? "bg-secondary" : ""}`}>
                  <span className="flex items-center gap-2">
                    <input type="radio" name="purchase" checked={isSubscribe} onChange={() => setPurchaseType("subscribe")} className="accent-primary" />
                    <span className="text-sm font-semibold text-foreground">Subscribe &amp; Save</span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Save {Math.round(SUBSCRIPTION_DISCOUNT * 100)}%</span>
                  </span>
                  <span className="text-sm font-semibold text-foreground">{gbp(subscribePrice)}</span>
                </label>
                {isSubscribe && (
                  <p className="text-xs text-muted-foreground px-4 pb-4">
                    Delivered automatically on your schedule. Skip, pause, or cancel anytime.
                  </p>
                )}
              </div>

              <motion.button
                ref={buyButtonRef as React.Ref<HTMLButtonElement>}
                whileHover={isStaticDeckRender ? undefined : { scale: 1.02 }}
                whileTap={isStaticDeckRender ? undefined : { scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isLoading || !canAddToCart}
                className="w-full py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded disabled:opacity-50"
              >
                {isLoading ? "Adding..." : isSubscribe ? "Subscribe & Save" : "Add to basket"}
              </motion.button>

              {!selectedSizeData?.variantId && product.sizes && product.sizes.length > 1 && (
                <p className="text-xs text-muted-foreground">
                  {selectedSize} checkout is coming soon. Select {product.sizes.find((s) => s.variantId)?.name || "300g"} to purchase now.
                </p>
              )}
            </>
          )}

          {product.ingredientLogos && product.ingredientLogos.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">Key Ingredients</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.ingredientLogos.map((logo) => (
                  <div key={logo.name} className="bg-white border border-border rounded-md aspect-square flex items-center justify-center p-4 md:p-5">
                    <img src={logo.image} alt={logo.name} className="max-h-[70%] max-w-[85%] object-contain" />
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
