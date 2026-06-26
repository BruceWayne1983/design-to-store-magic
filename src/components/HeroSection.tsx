import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroPerformance from "@/assets/category-performance.jpg";
import heroMetabolic from "@/assets/category-metabolic.jpg";
import heroHealth from "@/assets/category-health.jpg";
import productFusion from "@/assets/products/fusion-lite-plus.jpg";
import productVascul8 from "@/assets/products/vascul8.jpg";
import productElectroFlow from "@/assets/products/electro-flow.jpg";
import productGlycoshift from "@/assets/products/glycoshift.jpg";
import heroAiCoach from "@/assets/hero-ai-coach.jpg";

const SLIDE_INTERVAL_MS = 6000;

const slides = [
  {
    bg: heroPerformance,
    tagline: "Performance Nutrition",
    headline: "Formulated to a\nDose, Not a Trend",
    desc: "Active ingredients at the doses used in the human trials. Nothing under-dosed to hit a price point.",
    cta1: { text: "Shop Performance", link: "/category/performance" },
    cta2: { text: "View Stack Systems", link: "/shop" },
  },
  {
    bg: heroMetabolic,
    tagline: "Metabolic Support",
    headline: "Carbohydrate\nPartitioning",
    desc: "Glucose-disposal actives that bias substrate toward skeletal muscle glycogen rather than adipose storage.",
    cta1: { text: "Shop Metabolic", link: "/shop" },
    cta2: { text: "Read the Science", link: "/knowledge-base" },
  },
  {
    bg: heroHealth,
    tagline: "Health & Hydration",
    headline: "Electrolytes at\nClinical Dose",
    desc: "Sodium, potassium and magnesium at the levels documented to support plasma volume and neuromuscular function under load.",
    cta1: { text: "Shop Hydration", link: "/shop" },
    cta2: { text: "Compare Products", link: "/shop" },
  },
  {
    bg: productFusion,
    tagline: "Fusion Lite+",
    headline: "Dual-Phase Pre-Workout,\nNo Stimulant Crash",
    desc: "EnXtra® 300mg paired with Infinergy® 150mg for a stepped caffeine curve and sustained adrenergic output.",
    cta1: { text: "Shop Fusion Lite+", link: "/product/fusion-lite-plus" },
    cta2: { text: "Compare Stacks", link: "/shop" },
  },
  {
    bg: productVascul8,
    tagline: "VASCUL8™",
    headline: "Nitric Oxide,\nWithout the Stimulants",
    desc: "Pycnogenol® 100mg with anhydrous betaine 2,500mg for endothelial NO production and cellular hydration.",
    cta1: { text: "Shop VASCUL8", link: "/product/vascul8" },
    cta2: { text: "How It Works", link: "/knowledge-base" },
  },
  {
    bg: productElectroFlow,
    tagline: "Electro Flow",
    headline: "Sodium-Led\nIntra-Workout",
    desc: "1,000mg sodium per serving with the full mineral matrix. Sugar-free, no proprietary blends.",
    cta1: { text: "Shop Electro Flow", link: "/product/electro-flow" },
    cta2: { text: "Shop Hydration", link: "/shop" },
  },
  {
    bg: productGlycoshift,
    tagline: "GLYCOSHIFT™",
    headline: "Intra-Workout Carbs,\nNo Gastric Distress",
    desc: "Cluster Dextrin® with chromium and berberine to support insulin sensitivity and gastric clearance during training.",
    cta1: { text: "Shop GLYCOSHIFT", link: "/product/glycoshift" },
    cta2: { text: "Shop Metabolic", link: "/shop" },
  },
  {
    bg: heroAiCoach,
    tagline: "Baseline AI Coach",
    headline: "Evidence-Based\nProgramming, On Demand",
    desc: "A coaching layer trained on hypertrophy, DC and PPL protocols, nutrition periodisation and bloodwork interpretation. Launching across the Baseline app and website.",
    cta1: { text: "Open AI Coach", link: "/coach" },
    cta2: { text: "How It Works", link: "/coach" },
  },
];



const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="w-full relative min-h-[400px] md:min-h-[600px] flex items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          src={slide.bg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-dark))] via-[hsl(var(--hero-dark)/0.85)] to-[hsl(var(--hero-dark)/0.4)]" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 md:px-8 lg:px-16 py-16 md:py-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 md:gap-8 max-w-[550px]"
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">{slide.tagline}</span>
              <h1 className="text-3xl md:text-[56px] font-black leading-[1.1] text-white uppercase tracking-tight whitespace-pre-line">
                {slide.headline}
              </h1>
              <p className="text-base md:text-lg text-white/80">{slide.desc}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link to={slide.cta1.link} className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity text-center">
                {slide.cta1.text}
              </Link>
              <Link to={slide.cta2.link} className="px-6 py-3 border border-white text-white text-sm md:text-base font-medium uppercase tracking-wider hover:bg-white/10 transition-colors text-center">
                {slide.cta2.text}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex flex-wrap gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-white/40 hover:bg-white/60 w-2.5"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
