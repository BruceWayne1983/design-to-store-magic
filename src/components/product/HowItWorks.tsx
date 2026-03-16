import { Zap, Droplets, BarChart3 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const icons = [Zap, Droplets, BarChart3];

const HowItWorks = ({ product }: { product: ProductData }) => (
  <section className="w-full bg-secondary py-16 px-4 md:py-28 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-8 md:gap-12">
      <ScrollReveal>
        <SectionHeader tagline="Mechanism" heading="How it works" text={`${product.name} three-stage system`} />
      </ScrollReveal>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {product.howSteps.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <StaggerItem key={s.title}>
              <div className="flex flex-col gap-4 bg-background border border-border rounded-lg p-6 md:p-8 h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">{s.tagline}</span>
                <h4 className="text-lg font-bold text-foreground">{s.title}</h4>
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
