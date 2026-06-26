import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import QuickAddModal from "@/components/QuickAddModal";
import { ChevronDown } from "lucide-react";
import fusionLitePlus from "@/assets/products/fusion-lite-plus.jpg";
import vascul8 from "@/assets/products/vascul8.jpg";
import glyco8 from "@/assets/products/glyco8.jpg";
import glycoshift from "@/assets/products/glycoshift.jpg";
import electroFlow from "@/assets/products/electro-flow.jpg";
import purestCreatine from "@/assets/products/purest-creatine-300g.jpg";
import h2oGo from "@/assets/products/h2o-go.jpg";

type Category = "All" | "Performance" | "Metabolic" | "Health & Hydration";
type SortKey = "featured" | "price-asc" | "price-desc" | "az";
type Collection = "All" | "Best Sellers" | "New In";
type Badge = "Best Seller" | "New";

interface ShopProduct {
  name: string;
  slug: string;
  desc: string;
  price: string;
  priceNum: number;
  image: string;
  category: Category;
  badge?: Badge;
  comingSoon?: boolean;
}

const products: ShopProduct[] = [
  { name: "Fusion Lite+", slug: "fusion-lite-plus", desc: "Clinically Dosed Focus & Energy", price: "£31.99", priceNum: 31.99, image: fusionLitePlus, category: "Performance" as Category, badge: "Best Seller" as Badge },
  { name: "VASCUL8™", slug: "vascul8", desc: "Stimulant-Free Pump Formula", price: "£39.99", priceNum: 39.99, image: vascul8, category: "Performance" as Category, badge: "New" as Badge },
  { name: "GLYCOSHIFT™", slug: "glycoshift", desc: "Intra-Workout Fuel & GDA", price: "£39.99", priceNum: 39.99, image: glycoshift, category: "Metabolic" as Category },
  { name: "GLYCO8™", slug: "glyco8", desc: "Fast-Acting Nutrient Partitioning Support", price: "£39.99", priceNum: 39.99, image: glyco8, category: "Metabolic" as Category, badge: "New" as Badge },
  { name: "Electro Flow", slug: "electro-flow", desc: "Advanced Electrolyte Support", price: "£27.99", priceNum: 27.99, image: electroFlow, category: "Health & Hydration" as Category },
  { name: "Pürest Creatine™", slug: "purest-creatine", desc: "Pure NNB Creatine Monohydrate", price: "From £23.99", priceNum: 23.99, image: purestCreatine, category: "Performance" as Category, badge: "Best Seller" as Badge },
  { name: "H2O GO", slug: "h2o-go", desc: "Water Balance & Electrolyte Support", price: "£19.99", priceNum: 19.99, image: h2oGo, category: "Health & Hydration" as Category, badge: "New" as Badge },
];

const categories: Category[] = ["All", "Performance", "Metabolic", "Health & Hydration"];
const collections: Collection[] = ["All", "Best Sellers", "New In"];
const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low–High" },
  { key: "price-desc", label: "Price: High–Low" },
  { key: "az", label: "A–Z" },
];

const categoryCards = [
  { tagline: "Performance", title: "Performance supplements", desc: "Clinically formulated pre-workout, pump and performance enhancers designed to push your limits in every session.", image: fusionLitePlus },
  { tagline: "Metabolic", title: "Metabolic support", desc: "Glucose disposal agents, carb management tools, and metabolic optimisers built on real clinical mechanisms.", image: glyco8 },
  { tagline: "Health", title: "Health & Hydration", desc: "Advanced electrolyte formulas and hydration support for daily performance and recovery.", image: electroFlow },
];

const testimonials = [
  { name: "Sarah K.", role: "Marathon Runner", quote: "Baseline protocols transformed my recovery time. I PR'd my last marathon by 12 minutes." },
  { name: "James R.", role: "CrossFit Athlete", quote: "Finally, a supplement brand that uses real science. The pre-workout stack is incredible." },
];

const faqs = [
  { q: "What makes your formulas different?", a: "Our formulas are backed by peer-reviewed research and use clinically effective dosages of every ingredient." },
  { q: "Are your products clinically dosed?", a: "Yes. Every active ingredient is included at its full, research-backed dose — no proprietary blends and no under-dosing." },
  { q: "Where do you ship?", a: "We currently ship across the UK, with free delivery on orders over £75. See our Shipping & Returns page for full details." },
  { q: "What is your return policy?", a: "We offer a 14-day return policy on unopened products from the date of delivery. See Shipping & Returns for full details." },
];

const Shop = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [filter, setFilter] = useState<Category>("All");
  const [collection, setCollection] = useState<Collection>("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [quickAdd, setQuickAdd] = useState<ShopProduct | null>(null);

  const filtered = products
    .filter((p) => filter === "All" || p.category === filter)
    .filter((p) =>
      collection === "All" ||
      (collection === "Best Sellers" && p.badge === "Best Seller") ||
      (collection === "New In" && p.badge === "New")
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.priceNum - b.priceNum;
      if (sort === "price-desc") return b.priceNum - a.priceNum;
      if (sort === "az") return a.name.localeCompare(b.name);
      return 0;
    });

  const scrollToProducts = () => {
    document.getElementById("shop-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col items-start w-full">
      <Helmet>
        <title>Shop All Supplements | Baseline Nutrition</title>
        <meta name="description" content="Browse the full range of clinically dosed Baseline Nutrition supplements. Performance, metabolic, hydration and recovery formulas." />
      </Helmet>
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-[hsl(215,50%,8%)] py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Performance Nutrition</span>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">Shop all baseline</h1>
          <p className="text-base md:text-lg text-white/60 max-w-[600px]">Clinically formulated supplements designed for measurable results. Every dose backed by science.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="button"
              onClick={scrollToProducts}
              className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Shop all
            </button>
            <Link
              to="/category/performance"
              className="px-6 py-3 border border-white/30 text-white text-sm md:text-base font-medium uppercase tracking-wider hover:bg-white/10 transition-colors text-center"
            >
              View stacks
            </Link>
          </div>
        </div>
      </section>

      {/* Filter + Sort bar */}
      <section className="w-full bg-background border-b border-border px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-colors ${
                    filter === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-foreground border-border hover:border-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mr-1">Collections</span>
              {collections.map((c) => (
                <button
                  key={c}
                  onClick={() => setCollection(c)}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors ${
                    collection === c
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none bg-secondary border border-border rounded px-4 py-2 pr-8 text-xs font-medium text-foreground cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="shop-products" className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
          <SectionHeader tagline="Full Range" heading="Products" text={`Showing ${filtered.length} product${filtered.length !== 1 ? "s" : ""}`} />
          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <p className="text-base text-foreground font-semibold">No products in this category yet.</p>
              <button
                type="button"
                onClick={() => setFilter("All")}
                className="text-sm text-primary underline hover:opacity-80"
              >
                View all products
              </button>
            </div>
          )}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group relative"
                >
                  {p.badge && !p.comingSoon && (
                    <span className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                      {p.badge}
                    </span>
                  )}
                  {p.comingSoon && (
                    <span className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-full bg-foreground text-background text-[10px] font-bold uppercase tracking-wider">
                      Coming Soon
                    </span>
                  )}
                  <Link to={`/product/${p.slug}`} className="w-full aspect-square bg-secondary flex items-center justify-center p-4 md:p-8">
                    <motion.img
                      src={p.image}
                      alt={p.name}
                      className={`w-full h-full object-contain ${p.comingSoon ? "opacity-60" : ""}`}
                      whileHover={p.comingSoon ? undefined : { scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                  {/* Quick-add hover overlay */}
                  {!p.comingSoon && (
                    <button
                      onClick={() => setQuickAdd(p)}
                      className="absolute top-2 right-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded hover:opacity-90"
                    >
                      Quick Add
                    </button>
                  )}
                  <Link to={`/product/${p.slug}`} className="p-4 md:p-6 flex flex-col gap-1 text-center">
                    <h5 className="text-sm md:text-lg font-bold text-foreground tracking-wide">{p.name}</h5>
                    <p className="text-xs md:text-sm text-muted-foreground">{p.desc}</p>
                    <span className="text-sm md:text-lg font-bold text-foreground mt-1">{p.comingSoon ? "Coming Soon" : p.price}</span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Find Your Category */}
      <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-20">
          <SectionHeader heading="Find your category" text="Explore our full range by goal" />
          <div className="flex flex-col gap-0">
            {categoryCards.map((cat, i) => {
              const isReversed = i % 2 !== 0;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`flex flex-col md:flex-row items-stretch border-t border-border ${i === categoryCards.length - 1 ? "border-b" : ""}`}
                >
                  {isReversed ? (
                    <>
                      <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:py-16 md:pr-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-widest">{cat.tagline}</span>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mt-2">{cat.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-[450px]">{cat.desc}</p>
                        <button
                          type="button"
                          onClick={() => setFilter(cat.tagline === "Health" ? "Health & Hydration" : (cat.tagline as Category))}
                          className="mt-6 self-start px-5 py-2 border border-border text-foreground text-sm font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
                        >
                          Explore
                        </button>
                      </div>
                      <div className="w-full md:w-1/2 bg-secondary flex items-center justify-center p-8 md:p-12 min-h-[250px] md:min-h-[350px]">
                        <img src={cat.image} alt={cat.title} className="w-full max-w-[280px] object-contain" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full md:w-1/2 bg-secondary flex items-center justify-center p-8 md:p-12 min-h-[250px] md:min-h-[350px]">
                        <img src={cat.image} alt={cat.title} className="w-full max-w-[280px] object-contain" />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:py-16 md:pl-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-widest">{cat.tagline}</span>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mt-2">{cat.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-[450px]">{cat.desc}</p>
                        <button
                          type="button"
                          onClick={() => setFilter(cat.tagline === "Health" ? "Health & Hydration" : (cat.tagline as Category))}
                          className="mt-6 self-start px-5 py-2 border border-border text-foreground text-sm font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
                        >
                          Explore
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
          <SectionHeader heading="Real results" text="Hear from athletes who trust Baseline" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="flex flex-col gap-6 border border-border rounded-lg p-6 md:p-8"
              >
                <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">{[...Array(5)].map((_, j) => <span key={j} className="text-primary" aria-hidden="true">★</span>)}</div>
                <p className="text-sm md:text-base text-foreground leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-sm font-bold text-primary">{t.name[0]}</span></div>
                  <div>
                    <div className="text-sm md:text-base font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <div className="max-w-[768px] mx-auto flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">Questions</h2>
            <p className="text-base md:text-lg text-muted-foreground">Everything you need to know about our products.</p>
          </div>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button className="w-full flex items-center justify-between py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-sm md:text-base font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="pb-5 text-sm md:text-base text-muted-foreground">{faq.a}</div>}
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-base md:text-lg font-bold text-foreground">Need more help?</h4>
            <p className="text-sm md:text-base text-muted-foreground mt-1">Contact our <Link to="/contact" className="text-primary underline">support team</Link>.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-6 md:gap-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1]">Elevate your baseline</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-[500px]">Start your journey to peak performance with science-backed nutrition protocols.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={scrollToProducts}
              className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Shop now
            </button>
            <Link
              to="/about"
              className="px-6 py-3 border border-border text-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors text-center"
            >
              Learn more
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />

      <QuickAddModal open={!!quickAdd} onClose={() => setQuickAdd(null)} product={quickAdd} />
    </div>
  );
};

export default Shop;
