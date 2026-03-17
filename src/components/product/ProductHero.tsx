import { useState } from "react";
import { ChevronDown, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const ProductHero = ({ product }: { product: ProductData }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState<"subscribe" | "onetime">("subscribe");
  const [frequency, setFrequency] = useState<"1" | "4" | "6">("6");
  const [suggestedUseOpen, setSuggestedUseOpen] = useState(false);
  const [suppFactsOpen, setSuppFactsOpen] = useState(false);

  const isStaticDeckRender = (() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get("deckCapture") === "true") return true;
    try {
      return window.self !== window.top;
    } catch {
      return false;
    }
  })();

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
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
              loading="eager"
              decoding="sync"
            />
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
            <button className="w-16 h-16 md:w-20 md:h-20 rounded border-2 border-border flex items-center justify-center text-muted-foreground hover:border-primary transition-colors flex-shrink-0">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal className="flex flex-col gap-5 md:gap-6 w-full lg:w-1/2" variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }} delay={0.15}>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">{product.name}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-1">{product.tagline}</p>
          </div>

          <ul className="flex flex-col gap-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-foreground text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" /> {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-black text-foreground">
              {purchaseType === "subscribe" ? product.prices[frequency] : product.price}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
            </div>
            <span className="text-sm text-muted-foreground">· Reviews</span>
          </div>

          <div className="border border-border rounded-lg p-4 md:p-5 flex flex-col gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={purchaseType === "subscribe"} onChange={() => setPurchaseType("subscribe")} className="accent-primary" />
              <div>
                <span className="text-sm font-semibold text-foreground">Subscribe & Save</span>
                <span className="text-xs text-muted-foreground ml-2">Save up to 20%</span>
              </div>
            </label>
            {purchaseType === "subscribe" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-col gap-3 pl-6">
                <p className="text-xs text-muted-foreground">Save up to {product.savings[frequency]}. Deliver automatically. Pause or cancel anytime.</p>
                <div className="flex gap-2">
                  {(["1", "4", "6"] as const).map((f) => (
                    <button key={f} onClick={() => setFrequency(f)}
                      className={`flex-1 py-2 text-center text-xs font-medium rounded transition-colors ${frequency === f ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
                      {f} week{f !== "1" ? "s" : ""}<br /><span className="text-[10px]">Save {product.savings[f]}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            <label className="flex items-center gap-2 cursor-pointer border-t border-border pt-4">
              <input type="radio" checked={purchaseType === "onetime"} onChange={() => setPurchaseType("onetime")} className="accent-primary" />
              <div>
                <span className="text-sm font-semibold text-foreground">One-time</span>
                <span className="text-sm text-muted-foreground ml-2">{product.price}</span>
              </div>
            </label>
          </div>

          <motion.button whileHover={isStaticDeckRender ? undefined : { scale: 1.02 }} whileTap={isStaticDeckRender ? undefined : { scale: 0.98 }}
            className="w-full py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded">
            Add to basket
          </motion.button>

          <div className="flex flex-col border-t border-border">
            <button className="flex items-center justify-between py-4 border-b border-border" onClick={() => setSuggestedUseOpen(!suggestedUseOpen)}>
              <span className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Suggested Use</span>
              <motion.div animate={{ rotate: suggestedUseOpen ? 180 : 0 }} transition={{ duration: 0.25 }}><ChevronDown className="w-4 h-4 text-muted-foreground" /></motion.div>
            </button>
            {suggestedUseOpen && <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-muted-foreground pb-4">{product.suggestedUse}</motion.p>}
            <button className="flex items-center justify-between py-4 border-b border-border" onClick={() => setSuppFactsOpen(!suppFactsOpen)}>
              <span className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Supplement Facts</span>
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
