import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import categoryPerformance from "@/assets/category-performance.jpg";
import categoryMetabolic from "@/assets/category-metabolic.jpg";
import categoryHealth from "@/assets/category-health.jpg";

const bands = [
  {
    label: "Performance Line",
    headline: "Train Harder. Recover Faster.",
    desc: "Clinically dosed pre-workout, pump and intra-training formulas built for measurable output.",
    cta: "Shop Performance",
    link: "/category/performance",
    image: categoryPerformance,
    accent: "#3B82F6",
    align: "left" as const,
  },
  {
    label: "Metabolic Line",
    headline: "Master Carbs. Sharpen Body Composition.",
    desc: "Glucose disposal agents and nutrient-partitioning support built on real clinical mechanisms.",
    cta: "Shop Metabolic",
    link: "/shop",
    image: categoryMetabolic,
    accent: "#F59E0B",
    align: "right" as const,
  },
  {
    label: "Hydration Line",
    headline: "Hydration Without Compromise.",
    desc: "Full-spectrum electrolytes dosed for athletes — no sugar, no fillers, no shortcuts.",
    cta: "Shop Hydration",
    link: "/shop",
    image: categoryHealth,
    accent: "#10B981",
    align: "left" as const,
  },
];

const CategoryBands = () => (
  <section className="w-full bg-background flex flex-col">
    {bands.map((b, i) => (
      <motion.div
        key={b.label}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative w-full min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden"
      >
        <img
          src={b.image}
          alt={b.label}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${
            b.align === "left"
              ? "bg-gradient-to-r from-black/90 via-black/60 to-transparent"
              : "bg-gradient-to-l from-black/90 via-black/60 to-transparent"
          }`}
        />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16">
          <div
            className={`max-w-[560px] flex flex-col gap-4 md:gap-5 ${
              b.align === "right" ? "ml-auto text-left" : ""
            }`}
          >
            <div
              className="w-10 h-[2px]"
              style={{ backgroundColor: b.accent }}
            />
            <span
              className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: b.accent }}
            >
              {b.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-[1.05]">
              {b.headline}
            </h2>
            <p className="text-sm md:text-base text-white/80 font-light leading-relaxed max-w-[480px]">
              {b.desc}
            </p>
            <Link
              to={b.link}
              className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-white text-black text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors w-fit rounded-sm"
            >
              {b.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    ))}
  </section>
);

export default CategoryBands;
