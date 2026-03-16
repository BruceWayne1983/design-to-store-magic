import { ScrollReveal } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const IngredientBreakdown = ({ product }: { product: ProductData }) => (
  <section className="w-full bg-background py-16 px-4 md:py-28 md:px-8 lg:px-16">
    <div className="max-w-[900px] mx-auto flex flex-col gap-10 md:gap-16">
      {product.ingredients.map((ing, i) => (
        <ScrollReveal key={ing.title} delay={i * 0.08}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-foreground">{ing.title}</h3>
                {ing.tagline && <span className="text-xs font-semibold text-primary uppercase tracking-widest">{ing.tagline}</span>}
              </div>
              <div className="sm:text-right">
                <span className="text-sm font-semibold text-foreground">{ing.dosage}</span>
                <span className="text-xs text-muted-foreground block">per serving</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{ing.desc}</p>
            {ing.hasImage && (
              <div className="w-full h-[200px] md:h-[300px] bg-secondary rounded-lg flex items-center justify-center mt-4">
                <img src={product.images[0]} alt={ing.title} className="h-full object-contain" />
              </div>
            )}
            {i < product.ingredients.length - 1 && <div className="border-b border-border mt-4" />}
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default IngredientBreakdown;
