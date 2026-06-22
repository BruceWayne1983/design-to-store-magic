import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, FlaskConical, ShieldCheck, Factory, FileText } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import fusionLitePlus from "@/assets/products/fusion-lite-plus.jpg";
import vascul8 from "@/assets/products/vascul8.jpg";
import glyco8 from "@/assets/products/glyco8.jpg";
import glycoshift from "@/assets/products/glycoshift.jpg";
import electroFlow from "@/assets/products/electro-flow.jpg";
import purestCreatine from "@/assets/products/purest-creatine-300g.jpg";
import h2oGo from "@/assets/products/h2o-go.jpg";

type SortKey = "featured" | "price-asc" | "price-desc" | "az";
type CategoryFilter = "all" | "Performance" | "Metabolic" | "Health & Hydration";

const trustItems = [
  { icon: FlaskConical, label: "Clinically Dosed" },
  { icon: ShieldCheck, label: "Trademarked Ingredients" },
  { icon: Factory, label: "Made in the UK" },
  { icon: FileText, label: "Transparent Formulas" },
];

const categories: { title: string; key: CategoryFilter; desc: string; image: string }[] = [
  {
    title: "PERFORMANCE",
    key: "Performance",
    desc: "Pre-workout, pump and performance enhancers engineered for maximum training output.",
    image: fusionLitePlus,
  },
  {
    title: "METABOLIC",
    key: "Metabolic",
    desc: "Glucose disposal agents and metabolic optimisers built on real clinical mechanisms.",
    image: glyco8,
  },
  {
    title: "HEALTH & HYDRATION",
    key: "Health & Hydration",
    desc: "Advanced electrolyte formulas and hydration support for daily performance.",
    image: electroFlow,
  },
];

const products = [
  { name: "Fusion Lite+", slug: "fusion-lite-plus", desc: "Clinically Dosed Focus & Energy", price: "£31.99", priceNum: 31.99, image: fusionLitePlus, tag: "Best Seller", category: "Performance" as const },
  { name: "VASCUL8™", slug: "vascul8", desc: "Stimulant-Free Pump Formula", price: "£39.99", priceNum: 39.99, image: vascul8, tag: null, category: "Performance" as const },
  { name: "GLYCOSHIFT™", slug: "glycoshift", desc: "Intra-Workout Fuel & GDA", price: "£39.99", priceNum: 39.99, image: glycoshift, tag: null, category: "Metabolic" as const },
  { name: "GLYCO8™", slug: "glyco8", desc: "Fast-Acting Nutrient Partitioning Support", price: "£39.99", priceNum: 39.99, image: glyco8, tag: null, category: "Metabolic" as const },
  { name: "Electro Flow", slug: "electro-flow", desc: "Advanced Electrolyte Support", price: "£27.99", priceNum: 27.99, image: electroFlow, tag: null, category: "Health & Hydration" as const },
  { name: "Pürest Creatine™", slug: "purest-creatine", desc: "Pure NNB Creatine Monohydrate", price: "From £23.99", priceNum: 23.99, image: purestCreatine, tag: null, category: "Performance" as const },
  { name: "H2O GO", slug: "h2o-go", desc: "Water Balance & Electrolyte Support", price: "Coming Soon", priceNum: 0, image: h2oGo, tag: "Coming Soon", category: "Health & Hydration" as const },
];

const categoryFilters: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Performance", label: "Performance" },
  { key: "Metabolic", label: "Metabolic" },
  { key: "Health & Hydration", label: "Health & Hydration" },
];

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "az", label: "A-Z" },
];

const PerformanceCategory = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products
      .filter((p) => category === "all" || p.category === category)
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
      .sort((a, b) => {
        if (sort === "price-asc") return a.priceNum - b.priceNum;
        if (sort === "price-desc") return b.priceNum - a.priceNum;
        if (sort === "az") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [search, category, sort]);

  return (
  <div className="flex flex-col items-start w-full">
    <Helmet>
      <title>Performance Supplements | Baseline Nutrition</title>
      <meta name="description" content="Clinically dosed pre-workout, pump, hydration and recovery supplements engineered for measurable training output." />
    </Helmet>
    <AnnouncementBar />
    <Navbar />

    {/* HERO */}
    <section className="w-full bg-[hsl(var(--hero-dark))] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-0 px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="flex flex-col gap-5 md:gap-6 flex-1 z-10">
          <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">Full Range</span>
          <h1 className="text-3xl md:text-5xl lg:text-[56px] font-black text-white uppercase tracking-tight leading-[1.08]">
            Performance<br />Supplements
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white/65 max-w-[520px] leading-relaxed">
            Clinical performance nutrition engineered for measurable training output, pump, hydration and recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link to="/shop" className="px-5 md:px-6 py-3 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity text-center">
              Shop Best Sellers
            </Link>
            <Link to="/shop" className="px-5 md:px-6 py-3 border border-white/30 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors text-center">
              Explore Stack Systems
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-[280px] md:w-[360px] lg:w-[420px]">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[80px]" />
            <img src={fusionLitePlus} alt="Performance supplements" className="relative z-10 w-full h-auto object-contain drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>

    {/* TRUST BAR */}
    <section className="w-full bg-[hsl(var(--hero-dark))] border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-5 md:py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={1.5} />
              <span className="text-xs md:text-sm text-white/70 font-medium tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FILTER & SORT BAR */}
    <section className="w-full bg-background border-b border-border sticky top-0 z-30">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-3 md:py-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <label htmlFor="perf-search" className="sr-only">Search products</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <input
              id="perf-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categoryFilters.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCategory(c.key)}
                className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                  category === c.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-foreground bg-secondary border-border hover:border-primary"
                }`}
              >
                {c.label}
              </button>
            ))}
            <div className="hidden sm:block w-px h-5 bg-border mx-1" />
            <label htmlFor="perf-sort" className="sr-only">Sort products</label>
            <select
              id="perf-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="px-3 py-2 text-xs font-medium text-foreground bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {sortOptions.map((s) => (
                <option key={s.key} value={s.key}>{`Sort: ${s.label}`}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>

    {/* FEATURED COLLECTION CARDS */}
    <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-2">
          <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">Browse by goal</span>
          <h2 className="text-2xl md:text-4xl font-black text-foreground uppercase tracking-tight">Featured Collections</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="group relative rounded-lg overflow-hidden cursor-pointer border border-border hover:border-primary/40 transition-colors">
              <div className="w-full h-[300px] md:h-[380px] bg-[hsl(var(--hero-dark))] flex items-center justify-center p-10 relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,50%,5%)] via-[hsl(215,50%,8%)/0.5] to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 z-10">
                <div>
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider">{cat.title}</h3>
                  <p className="text-xs md:text-sm text-white/60 mt-2 max-w-[220px] leading-relaxed">{cat.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCategory(cat.key);
                    document.getElementById("perf-search")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="self-start px-4 py-2 border border-white/40 text-white text-xs font-medium uppercase tracking-wider hover:bg-white hover:text-foreground transition-colors"
                >
                  Shop Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PRODUCT GRID */}
    <section className="w-full bg-secondary py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">All products</span>
            <h2 className="text-2xl md:text-4xl font-black text-foreground uppercase tracking-tight">Full Range</h2>
          </div>
          <span className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "product" : "products"}</span>
        </div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-base text-foreground font-semibold">No products match your filters.</p>
            <button
              type="button"
              onClick={() => { setSearch(""); setCategory("all"); setSort("featured"); }}
              className="text-sm text-primary underline hover:opacity-80"
            >
              Clear filters
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {filtered.map((p) => (
            <Link
              to={`/product/${p.slug}`}
              key={p.slug}
              className="group flex flex-col bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className="relative w-full aspect-square bg-background flex items-center justify-center p-8">
                {p.tag && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm z-10">
                    {p.tag}
                  </span>
                )}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col gap-1.5 border-t border-border">
                <h5 className="text-sm md:text-base font-bold text-foreground tracking-wide">{p.name}</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base md:text-lg font-black text-foreground">{p.price}</span>
                  <span className="text-xs font-medium text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>

    {/* CTA */}
    <section className="w-full bg-[hsl(var(--hero-dark))] py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-6">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
          Build your performance stack
        </h2>
        <p className="text-sm md:text-base text-white/60 max-w-[480px]">
          Combine clinically dosed formulas for a complete training protocol tailored to your goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link to="/shop" className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
            Shop All Products
          </Link>
          <Link to="/shop" className="px-6 py-3 border border-white/30 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors text-center">
            View Stacks
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default PerformanceCategory;
