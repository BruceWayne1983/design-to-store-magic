import { Zap, Droplets, BarChart3 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animations";

const steps = [
  { icon: Zap, tagline: "Step 1", title: "AMPK activation and energy metabolism", desc: "Dihydroberberine rapidly activates AMPK, the master metabolic switch, increasing glucose uptake into muscle cells and enhancing insulin sensitivity within minutes." },
  { icon: Droplets, tagline: "Step 2", title: "Nitric oxide signalling and blood flow", desc: "ALA and Cinnamon work synergistically to boost nitric oxide production, improving nutrient delivery to working muscles and accelerating glucose clearance from the bloodstream." },
  { icon: BarChart3, tagline: "Step 3", title: "Metabolite partitioning and recovery", desc: "Banaba and Chromium drive GLUT-4 translocation, directing carbohydrates preferentially into muscle glycogen stores rather than adipose tissue, supporting faster recovery." },
];

const HowItWorks = () => (
  <section className="w-full bg-secondary py-16 px-4 md:py-28 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-8 md:gap-12">
      <ScrollReveal>
        <SectionHeader tagline="Mechanism" heading="How it works" text="Three-stage glucose management system" />
      </ScrollReveal>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {steps.map((s) => (
          <StaggerItem key={s.title}>
            <div className="flex flex-col gap-4 bg-background border border-border rounded-lg p-6 md:p-8 h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">{s.tagline}</span>
              <h4 className="text-lg font-bold text-foreground">{s.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default HowItWorks;
