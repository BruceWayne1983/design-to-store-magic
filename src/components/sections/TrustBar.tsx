import { Sparkles, Shield, Factory, Eye } from "lucide-react";

const items = [
  { icon: Sparkles, title: "Clinically Dosed", desc: "Every ingredient at effective doses" },
  { icon: Shield, title: "Trademarked Ingredients", desc: "Premium patented compounds" },
  { icon: Factory, title: "Manufactured in UK", desc: "GMP certified facilities" },
  { icon: Eye, title: "Transparent Formulas", desc: "Full label transparency" },
];

const TrustBar = () => (
  <section className="w-full bg-background border-b border-border py-6 px-16">
    <div className="max-w-[1280px] mx-auto flex items-center justify-between">
      {items.map((item) => (
        <div key={item.title} className="flex items-center gap-3">
          <item.icon className="w-6 h-6 text-primary" />
          <div>
            <div className="text-sm font-semibold text-foreground">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBar;
