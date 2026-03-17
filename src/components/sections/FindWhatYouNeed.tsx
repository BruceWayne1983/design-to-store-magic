import { Link } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import categoryPerformance from "@/assets/category-performance.jpg";
import categoryMetabolic from "@/assets/category-metabolic.jpg";
import categoryRecovery from "@/assets/category-recovery.jpg";
import categoryHealth from "@/assets/category-health.jpg";

const categories = [
  {
    title: "Performance",
    desc: "Pre-workout, intra-workout and performance enhancers for maximum training output.",
    image: categoryPerformance,
    link: "/category/performance",
  },
  {
    title: "Metabolic Support",
    desc: "Glucose disposal agents and metabolic optimisers built on clinical mechanisms.",
    image: categoryMetabolic,
    link: "/shop",
  },
  {
    title: "Recovery & Sleep",
    desc: "Advanced recovery formulas targeting inflammation, sleep quality and muscle repair.",
    image: categoryRecovery,
    link: "/shop",
  },
  {
    title: "Health Optimisation",
    desc: "Foundational health supplements for immune function, gut health and longevity.",
    image: categoryHealth,
    link: "/shop",
  },
];

const FindWhatYouNeed = () => (
  <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <SectionHeader heading="Shop by Category" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {categories.map((c) => (
          <Link
            to={c.link}
            key={c.title}
            className="relative flex flex-col justify-end min-h-[320px] md:min-h-[380px] rounded-lg overflow-hidden group"
          >
            {/* Background image */}
            <img
              src={c.image}
              alt={c.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 group-hover:from-black/95 transition-colors duration-300" />
            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col gap-2">
              <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wide">{c.title}</h3>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">{c.desc}</p>
              <span className="text-xs font-medium text-primary uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop Collection →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FindWhatYouNeed;
