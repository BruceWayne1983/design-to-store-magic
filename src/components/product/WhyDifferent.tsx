import { Zap, Shield, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const features = [
  { icon: Zap, title: "Fast AMPK Activation", desc: "Dihydroberberine · ALA" },
  { icon: Shield, title: "GLUT-4 Translocation", desc: "Cinnamon · Banaba" },
  { icon: ArrowRight, title: "Glycogen Storage Support", desc: "Chromium · Vanadium" },
];

const WhyDifferent = () => (
  <section className="w-full bg-background py-16 px-4 md:py-28 md:px-8 lg:px-16 border-t border-border">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-8 md:gap-12">
      <SectionHeader heading="Why GLYCO8™ is different" text="Advanced glucose control beyond basic GDAs." />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center text-center gap-4 border border-border rounded-lg p-6 md:p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-base font-black text-foreground uppercase tracking-wide">{f.title}</h4>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyDifferent;
