import { useState } from "react";
import { ChevronDown, ChevronRight, Star } from "lucide-react";
import glyco8Hero from "@/assets/glyco8-hero.png";
import glyco8Capsules from "@/assets/glyco8-capsules.png";
import glyco8Label from "@/assets/glyco8-label.png";
import glyco8 from "@/assets/glyco8.png";

const images = [glyco8Hero, glyco8Capsules, glyco8Label, glyco8];

const ProductHero = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState<"subscribe" | "onetime">("subscribe");
  const [frequency, setFrequency] = useState<"1" | "4" | "6">("6");
  const [suggestedUseOpen, setSuggestedUseOpen] = useState(false);
  const [suppFactsOpen, setSuppFactsOpen] = useState(false);

  const prices: Record<string, string> = { "1": "£35.99", "4": "£33.99", "6": "£31.99" };
  const savings: Record<string, string> = { "1": "10%", "4": "15%", "6": "20%" };

  return (
    <section className="w-full bg-background py-16 px-16">
      <div className="max-w-[1280px] mx-auto flex gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4 w-1/2">
          <div className="w-full aspect-square bg-secondary rounded-lg flex items-center justify-center p-8">
            <img src={images[selectedImage]} alt="GLYCO8" className="w-full h-full object-contain" />
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded border-2 overflow-hidden bg-secondary flex items-center justify-center p-2 transition-colors ${
                  selectedImage === i ? "border-primary" : "border-border"
                }`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
            <button className="w-20 h-20 rounded border-2 border-border flex items-center justify-center text-muted-foreground hover:border-primary transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6 w-1/2">
          <div>
            <h1 className="text-4xl font-black text-foreground uppercase tracking-tight">GLYCO8™</h1>
            <p className="text-xl text-muted-foreground mt-1">Advanced Fast-Acting Glucose Disposal Agent</p>
          </div>

          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 text-foreground text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" /> Accelerates Glucose Clearance
            </li>
            <li className="flex items-center gap-2 text-foreground text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" /> Enhances Carb Partitioning
            </li>
            <li className="flex items-center gap-2 text-foreground text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" /> Supports Superior Muscle Fullness
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-foreground">
              {purchaseType === "subscribe" ? prices[frequency] : "£39.99"}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-primary font-semibold">16</span>
            <span className="text-sm text-muted-foreground">· 18 Reviews</span>
          </div>

          {/* Subscribe & Save */}
          <div className="border border-border rounded-lg p-5 flex flex-col gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={purchaseType === "subscribe"}
                onChange={() => setPurchaseType("subscribe")}
                className="accent-primary"
              />
              <div>
                <span className="text-sm font-semibold text-foreground">Subscribe & Save</span>
                <span className="text-xs text-muted-foreground ml-2">Save up to 20%</span>
              </div>
            </label>

            {purchaseType === "subscribe" && (
              <div className="flex flex-col gap-3 pl-6">
                <p className="text-xs text-muted-foreground">
                  Save up to {savings[frequency]}. New customers 60+ 1. Deliver automatically. Pause or cancel anytime.
                </p>
                <div className="flex gap-2">
                  {(["1", "4", "6"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={`flex-1 py-2 text-center text-xs font-medium rounded transition-colors ${
                        frequency === f
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {f} week{f !== "1" ? "s" : ""}
                      <br />
                      <span className="text-[10px]">Save {savings[f]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer border-t border-border pt-4">
              <input
                type="radio"
                checked={purchaseType === "onetime"}
                onChange={() => setPurchaseType("onetime")}
                className="accent-primary"
              />
              <div>
                <span className="text-sm font-semibold text-foreground">One-time</span>
                <span className="text-sm text-muted-foreground ml-2">£39.99</span>
              </div>
            </label>
          </div>

          <button className="w-full py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded">
            Add to basket
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Pay in 4 interest-free instalments of £10.19 with <span className="underline text-foreground">Klarna</span>{" "}
            <span className="underline text-primary">learn more</span>
          </p>

          {/* Accordions */}
          <div className="flex flex-col border-t border-border">
            <button
              className="flex items-center justify-between py-4 border-b border-border"
              onClick={() => setSuggestedUseOpen(!suggestedUseOpen)}
            >
              <span className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Suggested Use</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${suggestedUseOpen ? "rotate-180" : ""}`} />
            </button>
            {suggestedUseOpen && (
              <p className="text-sm text-muted-foreground pb-4">
                Take 2 capsules with your highest carbohydrate meal of the day. For enhanced results, take an additional 2 capsules with a second high-carb meal. Do not exceed 4 capsules per day.
              </p>
            )}
            <button
              className="flex items-center justify-between py-4 border-b border-border"
              onClick={() => setSuppFactsOpen(!suppFactsOpen)}
            >
              <span className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Supplement Facts</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${suppFactsOpen ? "rotate-180" : ""}`} />
            </button>
            {suppFactsOpen && (
              <div className="text-sm text-muted-foreground pb-4">
                <p>Serving Size: 2 Capsules · Servings Per Container: 30</p>
                <p className="mt-2">Dihydroberberine 400mg · Na-R-Alpha Lipoic Acid 300mg · Cinnamon Bark Extract 300mg · Banaba Extract 330mg · Bitter Melon Extract 300mg · GYCo6o 300mg · Chromium 300mcg · VanaBerry 2mg</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
