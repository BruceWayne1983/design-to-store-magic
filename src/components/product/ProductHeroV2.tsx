import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ui/scroll-animations";
import { useCartStore } from "@/stores/cartStore";
import { VARIANT_MAP, SELLING_PLAN_MAP, SUBSCRIPTION_DISCOUNT } from "@/lib/shopify";
import ProductInfoAccordion from "./ProductInfoAccordion";
import type { ProductData } from "@/data/products";

const gbp = (n: number) => `£${n.toFixed(2)}`;

const ProductHeroV2 = ({ product, buyButtonRef }: { product: ProductData; buyButtonRef?: React.RefObject<HTMLButtonElement> }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState<"subscribe" | "onetime">("onetime");
  const [selectedFlavour, setSelectedFlavour] = useState(product.flavours?.[0]?.name ?? "");
  const { addItem, isLoading, setCartOpen } = useCartStore();

  const basePrice = parseFloat(product.price.replace(/[^0-9.]/g, ""));
  const subscribePrice = basePrice * (1 - SUBSCRIPTION_DISCOUNT);
  const isSubscribe = purchaseType === "subscribe";

  const handleAddToCart = async () => {
    const variantId = VARIANT_MAP[product.slug];
    if (!variantId || !basePrice) return;
    const sellingPlanId = isSubscribe ? SELLING_PLAN_MAP[product.slug] : undefined;
    await addItem({
      variantId,
      variantTitle: isSubscribe ? "Subscribe & Save" : "Default Title",
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

  const outcomes = product.outcomeBullets ?? [];

  return (
    <section className="w-full bg-background py-8 px-4 md:py-16 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Gallery */}
        <ScrollReveal className="flex flex-col gap-4 w-full lg:w-1/2" variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}>
          <motion.div
            className="w-full aspect-square bg-secondary rounded-lg flex items-center justify-center p-4 md:p-8 overflow-hidden"
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-contain" loading="eager" />
          </motion.div>
          <div className="flex gap-2 md:gap-3 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded border-2 overflow-hidden bg-secondary flex items-center justify-center p-1.5 transition-colors flex-shrink-0 ${selectedImage === i ? "border-primary" : "border-border"}`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Info */}
        <ScrollReveal className="flex flex-col gap-5 md:gap-6 w-full lg:w-1/2" variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }} delay={0.15}>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">{product.name}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-1">{product.tagline}</p>
            {product.format && <p className="text-sm text-muted-foreground mt-1">{product.format}</p>}
          </div>

          {product.shortDescription && (
            <p className="text-sm text-foreground/80 leading-relaxed">{product.shortDescription}</p>
          )}

          {/* Outcome bullets */}
          {outcomes.length > 0 && (
            <div className="flex flex-col gap-2 bg-secondary/50 border-l-2 border-primary p-4 rounded-r">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Formulated to</p>
              <ul className="flex flex-col gap-1.5">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Flavour selector */}
          {product.flavours && product.flavours.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Flavour</span>
                <span className="text-xs text-muted-foreground">{selectedFlavour}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.flavours.map((f) => {
                  const active = f.name === selectedFlavour;
                  return (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFlavour(f.name)}
                      className={`relative aspect-square rounded-md border-2 bg-secondary flex items-center justify-center text-xs font-bold uppercase tracking-wider transition-colors ${active ? "border-primary text-foreground" : "border-border text-muted-foreground hover:border-primary/40"}`}
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

          {product.comingSoon ? (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-black text-foreground">Coming Soon</span>
              </div>
              <button disabled className="w-full py-4 bg-secondary text-muted-foreground text-sm font-bold uppercase tracking-[0.2em] rounded cursor-not-allowed">
                Coming Soon
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-black text-foreground">
                  {isSubscribe ? gbp(subscribePrice) : product.price}
                </span>
                {isSubscribe && <span className="text-base text-muted-foreground line-through">{product.price}</span>}
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <label className={`flex items-center justify-between gap-2 cursor-pointer p-4 transition-colors ${!isSubscribe ? "bg-secondary" : ""}`}>
                  <span className="flex items-center gap-2">
                    <input type="radio" name="purchase-v2" checked={!isSubscribe} onChange={() => setPurchaseType("onetime")} className="accent-primary" />
                    <span className="text-sm font-semibold text-foreground">One-time purchase</span>
                  </span>
                  <span className="text-sm font-semibold text-foreground">{product.price}</span>
                </label>
                <label className={`flex items-center justify-between gap-2 cursor-pointer p-4 border-t border-border transition-colors ${isSubscribe ? "bg-secondary" : ""}`}>
                  <span className="flex items-center gap-2">
                    <input type="radio" name="purchase-v2" checked={isSubscribe} onChange={() => setPurchaseType("subscribe")} className="accent-primary" />
                    <span className="text-sm font-semibold text-foreground">Subscribe &amp; Save</span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Save {Math.round(SUBSCRIPTION_DISCOUNT * 100)}%</span>
                  </span>
                  <span className="text-sm font-semibold text-foreground">{gbp(subscribePrice)}</span>
                </label>
                {isSubscribe && (
                  <p className="text-xs text-muted-foreground px-4 pb-4">Delivered automatically on your schedule. Skip, pause, or cancel anytime.</p>
                )}
              </div>

              <motion.button
                ref={buyButtonRef as React.Ref<HTMLButtonElement>}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded disabled:opacity-50"
              >
                {isLoading ? "Adding..." : isSubscribe ? "Subscribe & Save" : "Add to basket"}
              </motion.button>
            </>
          )}

          {/* Info accordion stack */}
          <ProductInfoAccordion product={product} />
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProductHeroV2;
