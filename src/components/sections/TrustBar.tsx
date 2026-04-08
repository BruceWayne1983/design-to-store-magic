import { Sparkles, Shield, Factory, Eye } from "lucide-react";

const items = [
  { icon: Sparkles, title: "Clinically Dosed", desc: "Every ingredient at effective doses" },
  { icon: Shield, title: "Trademarked Ingredients", desc: "Premium patented compounds" },
  { icon: Factory, title: "Made in the UK", desc: "GMP certified, Peterborough" },
  { icon: Eye, title: "Transparent Formulas", desc: "Full label transparency" },
];

const TrustBar = () => (
  <section className="w-full bg-background border-b border-border py-4 md:py-6 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {items.map((item) => (
        <div key={item.title} className="flex items-center gap-3">
          <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
          <div>
            <div className="text-xs md:text-sm font-semibold text-foreground">{item.title}</div>
            <div className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBar;
