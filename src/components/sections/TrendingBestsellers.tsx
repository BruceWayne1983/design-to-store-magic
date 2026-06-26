import SectionHeader from "../SectionHeader";
import { Link } from "react-router-dom";
import { ShoppingCart, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { VARIANT_MAP } from "@/lib/shopify";
import fusionLitePlus from "@/assets/products/fusion-lite-plus.jpg";
import vascul8 from "@/assets/products/vascul8.jpg";
import electroFlow from "@/assets/products/electro-flow.jpg";
import purestCreatine from "@/assets/products/purest-creatine-300g.jpg";
import bgPerformance from "@/assets/category-performance.jpg";
import bgMetabolic from "@/assets/category-metabolic.jpg";
import bgRecovery from "@/assets/category-recovery.jpg";
import bgHealth from "@/assets/category-health.jpg";

const products = [
  { name: "Fusion Lite+", slug: "fusion-lite-plus", desc: "Stepped-caffeine pre-workout with EnXtra® and Infinergy®", price: "£31.99", priceNum: 31.99, image: fusionLitePlus, alt: bgPerformance, tag: "Best Seller" },
  { name: "VASCUL8™", slug: "vascul8", desc: "Stim-free NO formula with Pycnogenol® and betaine", price: "£39.99", priceNum: 39.99, image: vascul8, alt: bgRecovery, tag: "New" },
  { name: "Electro Flow", slug: "electro-flow", desc: "Sodium-led intra-workout electrolyte matrix", price: "£24.99", priceNum: 24.99, image: electroFlow, alt: bgHealth, tag: null },
  { name: "Pürest Creatine™", slug: "purest-creatine", desc: "NNB micronised monohydrate, 200-mesh", price: "£29.99", priceNum: 29.99, image: purestCreatine, alt: bgMetabolic, tag: null },
];

const TrendingBestsellers = () => {
  const { addItem, isLoading, setCartOpen } = useCartStore();

  const handleAdd = async (p: typeof products[0]) => {
    const variantId = VARIANT_MAP[p.slug];
    if (!variantId) {
      toast.error("Product not yet available");
      return;
    }
    await addItem({
      variantId,
      variantTitle: "Default Title",
      productTitle: p.name,
      productSlug: p.slug,
      productImage: p.image,
      price: p.priceNum,
      currencyCode: "GBP",
      quantity: 1,
    });
    toast.success(`${p.name} added to cart`);
    setCartOpen(true);
  };

  return (
    <section className="w-full bg-secondary py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Most Reordered</span>
          </div>
          <SectionHeader heading="What Customers Reorder" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <div key={p.name} className="group flex flex-col bg-background border border-border rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all">
              <Link to={`/product/${p.slug}`} className="relative w-full aspect-square overflow-hidden">
                {/* Alt cinematic bg appears on hover */}
                <img
                  src={p.alt}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105"
                />
                <div className="absolute inset-0 bg-secondary opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                {p.tag && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm z-10">
                    {p.tag}
                  </span>
                )}
                <img
                  src={p.image}
                  alt={p.name}
                  className="relative w-full h-full object-contain p-4 md:p-8 group-hover:scale-110 transition-transform duration-500 z-[1]"
                />
              </Link>
              <div className="p-4 md:p-5 flex flex-col gap-1 md:gap-1.5 border-t border-border">
                <Link to={`/product/${p.slug}`}>
                  <h5 className="text-sm md:text-base font-bold text-foreground tracking-wide hover:text-primary transition-colors">{p.name}</h5>
                </Link>
                <p className="text-xs text-muted-foreground hidden sm:block leading-relaxed">{p.desc}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm md:text-lg font-black text-foreground">{p.price}</span>
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-[10px] md:text-xs font-medium uppercase tracking-wider hover:opacity-90 transition-opacity rounded-sm disabled:opacity-50"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(p); }}
                    disabled={isLoading}
                  >
                    <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingBestsellers;
