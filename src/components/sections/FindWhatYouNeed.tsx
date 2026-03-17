import { Link } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import { Zap, HeartPulse, Moon, Activity } from "lucide-react";

const categories = [
  {
    title: "Performance Supplements",
    desc: "Pre-workout, intra-workout and performance enhancers for maximum training output.",
    icon: Zap,
    link: "/category/performance",
  },
  {
    title: "Metabolic Support",
    desc: "Glucose disposal agents and metabolic optimisers built on clinical mechanisms.",
    icon: Activity,
    link: "/shop",
  },
  {
    title: "Recovery & Sleep",
    desc: "Advanced recovery formulas targeting inflammation, sleep quality and muscle repair.",
    icon: Moon,
    link: "/shop",
  },
  {
    title: "Health Optimisation",
    desc: "Foundational health supplements for immune function, gut health and longevity.",
    icon: HeartPulse,
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
            className="flex flex-col gap-4 p-6 md:p-8 bg-background rounded-lg border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <c.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-base md:text-lg font-bold text-foreground uppercase tracking-wide">{c.title}</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            <span className="text-xs font-medium text-primary uppercase tracking-wider mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
              Shop Collection →
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FindWhatYouNeed;
