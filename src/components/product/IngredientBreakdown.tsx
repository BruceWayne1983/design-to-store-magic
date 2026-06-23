import { ScrollReveal } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const IngredientBreakdown = ({ product }: { product: ProductData }) => {
  const logoMap = new Map(
    (product.ingredientLogos || [])
      .filter((l) => l.forIngredient)
      .map((l) => [l.forIngredient!, l])
  );

  return (
    <section className="w-full bg-background py-16 px-4 md:py-28 md:px-8 lg:px-16">
      <div className="max-w-[900px] mx-auto flex flex-col gap-10 md:gap-16">
        {product.ingredients.map((ing, i) => {
          const logo = logoMap.get(ing.title);
          return (
            <ScrollReveal key={ing.title} delay={i * 0.08}>
              <div className="flex flex-col gap-4">
                {logo && (
                  <div className="flex flex-col items-start gap-2 mb-2">
                    <div className="bg-white border border-border rounded-md px-5 py-3 inline-flex items-center justify-center">
                      <img src={logo.image} alt={logo.name} className="h-[60px] w-auto object-contain" />
                    </div>
                    {logo.caption && (
                      <p className="text-xs text-muted-foreground font-normal">{logo.caption}</p>
                    )}
                  </div>
                )}
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
          );
        })}
      </div>
    </section>
  );
};

export default IngredientBreakdown;
