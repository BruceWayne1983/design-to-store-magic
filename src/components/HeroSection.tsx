import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/products/hero-banner.jpg";

const slides = [
  {
    bg: heroBg,
    tagline: "Performance Nutrition",
    headline: "Performance\nBuilt on Real Science",
    desc: "Evidence-driven supplements engineered for measurable improvements in performance, metabolism and recovery.",
    cta1: { text: "Shop Performance", link: "/site/shop" },
    cta2: { text: "Explore Stack Systems", link: "/site/shop" },
  },
  {
    bg: heroBg,
    tagline: "Metabolic Support",
    headline: "Master Your\nMetabolism",
    desc: "Clinically dosed glucose disposal agents and carb management tools built on real science.",
    cta1: { text: "Shop Metabolic", link: "/site/shop" },
    cta2: { text: "Learn the Science", link: "/site/shop" },
  },
  {
    bg: heroBg,
    tagline: "Health & Hydration",
    headline: "Hydration\nRedefined",
    desc: "Advanced electrolyte formulas and cellular hydration support for daily performance.",
    cta1: { text: "Shop Hydration", link: "/site/shop" },
    cta2: { text: "View Products", link: "/site/shop" },
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
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
        <div className="flex gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-white/40 hover:bg-white/60"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
