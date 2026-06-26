import SectionHeader from "../SectionHeader";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { VARIANT_MAP } from "@/lib/shopify";
import fusionLitePlus from "@/assets/products/fusion-lite-plus.jpg";
import vascul8 from "@/assets/products/vascul8.jpg";
import glyco8 from "@/assets/products/glyco8.jpg";
import glycoshift from "@/assets/products/glycoshift.jpg";

const products = [
  { name: "Fusion Lite+", slug: "fusion-lite-plus", desc: "Stepped-caffeine pre-workout, EnXtra® + Infinergy®", price: "£31.99", priceNum: 31.99, image: fusionLitePlus, tag: "Best Seller" },
  { name: "VASCUL8™", slug: "vascul8", desc: "Stim-free NO precursor with Pycnogenol® 100mg", price: "£39.99", priceNum: 39.99, image: vascul8, tag: null },
  { name: "GLYCO8™", slug: "glyco8", desc: "Eight-pathway glucose-disposal stack", price: "£39.99", priceNum: 39.99, image: glyco8, tag: null },
  { name: "GLYCOSHIFT™", slug: "glycoshift", desc: "Intra-workout Cluster Dextrin® with insulin co-factors", price: "£39.99", priceNum: 39.99, image: glycoshift, tag: null },
];

const TrustedFormulas = () => {
  const { addItem, isLoading, setCartOpen } = useCartStore();

  const handleAdd = async (p: typeof products[0]) => {
    const variantId = VARIANT_MAP[p.slug];
    if (!variantId) return;
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
    <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
        <SectionHeader heading="Best Sellers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <div key={p.name} className="group flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
              <Link to={`/product/${p.slug}`} className="relative w-full aspect-square bg-secondary flex items-center justify-center p-4 md:p-8 overflow-hidden">
                {p.tag && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm z-10">
                    {p.tag}
                  </span>
                )}
                <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
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
                    onClick={(e) => { e.stopPropagation(); handleAdd(p); }}
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

export default TrustedFormulas;
