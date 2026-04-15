import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, BookOpen, FlaskConical, Compass, GitCompareArrows, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { blogArticles, type BlogArticle } from "@/data/blog";

const pillars = [
  { key: "all", label: "All Topics", icon: BookOpen },
  { key: "Ingredient Science", label: "Ingredient Science", icon: FlaskConical },
  { key: "Protocol Guides", label: "Protocol Guides", icon: Compass },
  { key: "Mechanism Deep Dives", label: "Mechanisms", icon: GitCompareArrows },
  { key: "Comparison Content", label: "Comparisons", icon: ArrowRight },
] as const;

const KnowledgeBase = () => {
  const [search, setSearch] = useState("");
  const [activePillar, setActivePillar] = useState("all");

  const filtered = useMemo(() => {
    return blogArticles.filter((a) => {
      const matchesPillar = activePillar === "all" || a.pillar === activePillar;
      const matchesSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.category.toLowerCase().includes(search.toLowerCase());
      return matchesPillar && matchesSearch;
    });
  }, [search, activePillar]);

  const pillarCounts = useMemo(() => {
    const counts: Record<string, number> = { all: blogArticles.length };
    blogArticles.forEach((a) => {
      counts[a.pillar] = (counts[a.pillar] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <>
      <Helmet>
        <title>Knowledge Base — Baseline Nutrition</title>
        <meta name="description" content="Science-backed supplement education. Explore ingredient research, dosing protocols, metabolic mechanisms, and clinical comparisons." />
      </Helmet>

      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">Knowledge Base</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Science-Backed Supplement Education
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mb-8">
            Clinical research, dosing protocols, and metabolic mechanisms — explained without the marketing fluff.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles, ingredients, mechanisms…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded">
                <X className="w-4 h-4 text-white/60" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Pillar filters */}
      <section className="w-full bg-background border-b border-border sticky top-[52px] md:top-[56px] z-40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 flex gap-2 overflow-x-auto py-3 scrollbar-none">
          {pillars.map((p) => {
            const Icon = p.icon;
            const isActive = activePillar === p.key;
            return (
              <button
                key={p.key}
                onClick={() => setActivePillar(p.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                {p.label}
                <span className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}>
                  ({pillarCounts[p.key] || 0})
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Articles grid */}
      <section className="w-full bg-background py-12 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
              <button onClick={() => { setSearch(""); setActivePillar("all"); }} className="mt-4 text-sm text-primary hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((article) => (
                  <KBCard key={article.slug} article={article} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

function KBCard({ article }: { article: BlogArticle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={`/blog/${article.slug}`}
        className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-[11px] font-bold uppercase tracking-wider text-foreground">
            {article.pillar}
          </span>
        </div>
        <div className="flex flex-col flex-1 p-5">
          <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">{article.category}</span>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
            {article.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{article.readTime}</span>
            <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
              Read <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default KnowledgeBase;
