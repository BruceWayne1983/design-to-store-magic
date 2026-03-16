import { Check } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { ScrollReveal, slideLeft, slideRight } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const MechanismSection = ({ product }: { product: ProductData }) => (
  <section className="w-full bg-background py-16 px-4 md:py-28 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <ScrollReveal><SectionHeader heading="Clinical mechanism of action" /></ScrollReveal>
      {product.clinicalMechanisms.map((m) => (
        <div key={m.title} className="flex flex-col md:flex-row items-stretch gap-0 border border-border rounded-lg overflow-hidden">
          <ScrollReveal className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center gap-4 md:gap-6" variants={slideLeft}>
            <h3 className="text-xl md:text-2xl font-black text-foreground uppercase">{m.title}</h3>
            <p className="text-sm text-muted-foreground">{m.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              {m.badges.map((b) => (
                <div key={b.name} className="flex items-center gap-2">
                  <span className="text-xs font-black text-primary bg-primary/10 px-2 py-1 rounded">{b.dose}</span>
                  <div><div className="text-xs font-semibold text-foreground">{b.name}</div><div className="text-[10px] text-muted-foreground">{b.dose}</div></div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {m.checks.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-foreground"><Check className="w-4 h-4 text-primary flex-shrink-0" />{c}</div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="w-full md:w-1/2 min-h-[240px]" variants={slideRight} delay={0.1}>
            <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
          </ScrollReveal>
        </div>
      ))}
    </div>
  </section>
);

export default MechanismSection;
