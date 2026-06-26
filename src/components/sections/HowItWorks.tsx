import SectionHeader from "../SectionHeader";
import { Beaker, Shield, TrendingUp } from "lucide-react";

const features = [
  { icon: Beaker, title: "Dosed to the Research", desc: "Every active is included at the level used in the human trials we cite — not a fractional gesture dose." },
  { icon: Shield, title: "Trademarked Ingredients", desc: "Branded actives (Pycnogenol®, EnXtra®, Cluster Dextrin®, Aquamin™) with documented bioavailability data." },
  { icon: TrendingUp, title: "UK Manufactured", desc: "GMP-certified UK facility, FIC-compliant labelling, third-party assay on every production run." },
];

const HowItWorks = () => (
  <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <SectionHeader heading="Why Baseline Reads Differently" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <f.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <h4 className="text-base md:text-lg font-bold text-primary">{f.title}</h4>
            <p className="text-xs md:text-sm text-muted-foreground max-w-[260px]">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
