import SectionHeader from "@/components/SectionHeader";
import { ScrollReveal, slideLeft, slideRight } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const IngredientMechanisms = ({ product }: { product: ProductData }) => (
  <section className="w-full bg-[hsl(var(--hero-dark))] py-16 px-4 md:py-28 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-16">
      <ScrollReveal className="text-center">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">Science</span>
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-3">How the ingredients work</h2>
        <p className="text-sm text-white/50 mt-3 max-w-xl mx-auto">Each ingredient targets a specific metabolic pathway for maximum efficacy.</p>
      </ScrollReveal>

      {product.mechanisms.map((m, i) => (
        <div key={m.step} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-stretch gap-0 rounded-lg overflow-hidden border border-white/10`}>
          <ScrollReveal className="md:w-1/2 relative" variants={i % 2 === 1 ? slideRight : slideLeft}>
            <img src={m.image} alt={m.title} className="w-full h-full object-cover min-h-[280px] md:min-h-[320px]" />
            <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-black text-primary-foreground">{m.step}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center gap-4 md:gap-5 bg-[hsl(215,50%,10%)]" variants={i % 2 === 1 ? slideLeft : slideRight} delay={0.15}>
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">{m.subtitle}</span>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase">{m.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{m.desc}</p>
            <div className="flex gap-8 mt-2">
              {m.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-primary">{s.value}</span>
                  <span className="text-xs text-white/40">{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      ))}
    </div>
  </section>
);

export default IngredientMechanisms;
