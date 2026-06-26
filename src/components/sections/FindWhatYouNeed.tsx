import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import categoryPerformance from "@/assets/category-performance.jpg";
import categoryMetabolic from "@/assets/category-metabolic.jpg";
import categoryRecovery from "@/assets/category-recovery.jpg";
import categoryHealth from "@/assets/category-health.jpg";

const categories = [
  {
    title: "Performance",
    desc: "Pre-workout, intra-workout and pump formulas dosed to the research, not to a price point.",
    image: categoryPerformance,
    link: "/category/performance",
    accent: "#3B82F6",
  },
  {
    title: "Metabolic Support",
    desc: "Glucose-disposal actives that bias carbohydrate toward muscle glycogen over adipose tissue.",
    image: categoryMetabolic,
    link: "/shop",
    accent: "#F59E0B",
  },
  {
    title: "Recovery & Sleep",
    desc: "Formulas targeting inflammatory signalling, sleep architecture and muscle protein turnover.",
    image: categoryRecovery,
    link: "/shop",
    accent: "#8B5CF6",
  },
  {
    title: "Health Optimisation",
    desc: "Foundational nutrition for immune function, gut integrity and long-term metabolic health.",
    image: categoryHealth,
    link: "/shop",
    accent: "#10B981",
  },
];

const FindWhatYouNeed = () => (
  <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <SectionHeader heading="Shop by Category" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {categories.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <Link
              to={c.link}
              className="relative flex flex-col justify-end min-h-[320px] md:min-h-[400px] rounded-lg overflow-hidden group"
            >
              {/* Background image */}
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay — bottom-left opaque, transparent at ~55% */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/95 via-black/50 to-transparent group-hover:from-black/100 transition-colors duration-300" />
              {/* Content */}
              <div className="relative z-10 p-4 md:p-6 flex flex-col gap-2">
                {/* Accent bar */}
                <div
                  className="w-5 h-[2px] mb-2"
                  style={{ backgroundColor: c.accent }}
                />
                <h3 className="text-[22px] md:text-[26px] font-black text-white uppercase tracking-wide leading-tight">
                  {c.title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  {c.desc}
                </p>
                <span
                  className="text-xs font-medium uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: c.accent }}
                >
                  Shop Collection →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FindWhatYouNeed;
