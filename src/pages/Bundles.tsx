import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { bundles, type Bundle } from "@/data/bundles";
import { products } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { VARIANT_MAP } from "@/lib/shopify";

const gbp = (n: number) => `£${n.toFixed(2)}`;

const Bundles = () => {
  const { addItem, isLoading, setCartOpen } = useCartStore();

  const addBundle = async (bundle: Bundle) => {
    let added = 0;
    for (const slug of bundle.productSlugs) {
      const product = products[slug];
      const variantId = VARIANT_MAP[slug];
      if (!product || product.comingSoon || !variantId) continue;
      const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ""));
      if (!priceNum) continue;
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
      added += 1;
    }
    if (added > 0) {
      toast.success(`${bundle.name} added to basket`);
      setCartOpen(true);
    } else {
      toast.error("This stack isn't available to add right now.");
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <Helmet>
        <title>Stacks & Bundles | Baseline Nutrition</title>
        <meta name="description" content="Save when you stack. Clinically dosed Baseline Nutrition supplement bundles built to work together — performance, metabolic, and everyday foundation stacks." />
      </Helmet>
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-[hsl(var(--hero-dark))] py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Stacks &amp; Bundles</span>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">Stack &amp; save</h1>
          <p className="text-base md:text-lg text-white/60 max-w-[600px]">
            Our formulas are built to work together. Bundle complementary products and save versus buying separately.
          </p>
        </div>
      </section>

      {/* Bundles grid */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-16">
          <SectionHeader tagline="Curated Stacks" heading="Build your protocol" text="Every stack is discounted versus buying each product on its own." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {bundles.map((bundle, i) => {
              const saving = bundle.regularPrice - bundle.bundlePrice;
              return (
                <motion.div
                  key={bundle.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex flex-col border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300 relative"
                >
                  {bundle.badge && (
                    <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wider">
                      {bundle.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-foreground text-background text-[11px] font-bold uppercase tracking-wider">
                    Save {gbp(saving)}
                  </span>
                  <div className="w-full aspect-square bg-secondary flex items-center justify-center p-6 md:p-8">
                    <img src={bundle.image} alt={bundle.name} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <div className="flex flex-col flex-1 p-5 md:p-6 gap-4">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">{bundle.tagline}</span>
                      <h3 className="text-lg md:text-xl font-black text-foreground uppercase tracking-tight mt-1">{bundle.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{bundle.description}</p>
                    <ul className="flex flex-col gap-2">
                      {bundle.components.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" /> {c}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-black text-foreground">{gbp(bundle.bundlePrice)}</span>
                      <span className="text-sm text-muted-foreground line-through">{gbp(bundle.regularPrice)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addBundle(bundle)}
                      disabled={isLoading}
                      className="w-full py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded disabled:opacity-50"
                    >
                      {isLoading ? "Adding..." : "Add stack to basket"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Link
              to="/shop"
              className="px-6 py-3 border border-border text-foreground text-sm font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
            >
              Shop individual products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bundles;
