import { Zap, Droplets, BarChart3 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const icons = [Zap, Droplets, BarChart3];

const HowItWorks = ({ product }: { product: ProductData }) => (
  <section className="w-full bg-secondary py-12 px-4 md:py-16 md:px-8 lg:px-16">
    <div className="max-w-[1080px] mx-auto flex flex-col gap-6 md:gap-8">
      <ScrollReveal>
        <SectionHeader tagline="Mechanism" heading="How it works" text={`${product.name} — a three-stage system`} />
      </ScrollReveal>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {product.howSteps.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <StaggerItem key={s.title}>
              <div className="flex flex-col gap-2.5 bg-background border border-border rounded-lg p-5 h-full hover:border-primary/30 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">{s.tagline}</span>
                </div>
                <h4 className="text-base font-bold text-foreground leading-snug">{s.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  </section>
);

export default HowItWorks;
