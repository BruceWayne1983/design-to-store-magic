import SectionHeader from "../SectionHeader";
import { Beaker, Shield, TrendingUp } from "lucide-react";

const features = [
  { icon: Beaker, title: "Clinical Dosing", desc: "Clinically proven protocols with evidence-backed ingredients." },
  { icon: Shield, title: "Trademarked Ingredients", desc: "Premium performance compounds for optimal bioavailability." },
  { icon: TrendingUp, title: "UK Regulatory Compliance", desc: "Stringent quality assurance and testing standards." },
];

const HowItWorks = () => (
  <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <SectionHeader heading="Formulated From Mechanism, Not Marketing." />
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
