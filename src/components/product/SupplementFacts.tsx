import SectionHeader from "@/components/SectionHeader";
import { ScrollReveal, scaleIn } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const SupplementFacts = ({ product }: { product: ProductData }) => (
  <section className="w-full bg-secondary py-16 px-4 md:py-28 md:px-8 lg:px-16">
    <div className="max-w-[1000px] mx-auto flex flex-col gap-8 md:gap-12">
      <ScrollReveal><SectionHeader heading="Clinically dosed formula" /></ScrollReveal>
      <ScrollReveal variants={scaleIn}>
        <div className="bg-background border border-border rounded-lg overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-lg md:text-xl font-black text-foreground uppercase">{product.name} <span className="font-normal text-sm md:text-base text-muted-foreground">Nutrition Information</span></h3>
            <span className="text-xs text-muted-foreground">Manufactured in a UK GMP-certified facility</span>
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 font-semibold text-foreground">Ingredient</th>
                  <th className="text-left p-4 font-semibold text-foreground">Per Serving</th>
                  <th className="text-left p-4 font-semibold text-foreground">Function / %NRV*</th>
                  <th className="text-left p-4 font-semibold text-foreground">Source</th>
                </tr>
              </thead>
              <tbody>
                {product.supplementRows.map((r) => (
                  <tr key={r.ingredient} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-4"><span className="font-semibold text-foreground">{r.ingredient}</span>{r.spec && <span className="text-muted-foreground text-xs ml-1">{r.spec}</span>}</td>
                    <td className="p-4 text-foreground">{r.dose}</td>
                    <td className="p-4 text-muted-foreground">{r.purpose}</td>
                    <td className="p-4 text-primary text-xs font-semibold">{r.flag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y divide-border">
            {product.supplementRows.map((r) => (
              <div key={r.ingredient} className="p-4 flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div><span className="font-semibold text-foreground text-sm">{r.ingredient}</span>{r.spec && <span className="text-muted-foreground text-xs ml-1">{r.spec}</span>}</div>
                  <span className="text-sm font-semibold text-foreground flex-shrink-0">{r.dose}</span>
                </div>
                <p className="text-xs text-muted-foreground">{r.purpose}</p>
                {r.flag && <span className="text-xs text-primary font-semibold">{r.flag}</span>}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border space-y-2">
            <p className="text-xs text-muted-foreground">*NRV = Nutrient Reference Value (Regulation (EU) No 1169/2011 as retained in UK law).</p>
            <p className="text-xs text-muted-foreground"><strong className="text-foreground">Ingredients:</strong> Full ingredient declaration printed on product label in descending order of weight. Allergens highlighted in <strong>bold</strong> in line with UK FIC Regulations.</p>
            <p className="text-xs text-muted-foreground"><strong className="text-foreground">Directions:</strong> Use as directed on label. Do not exceed the stated recommended daily dose.</p>
            <p className="text-xs text-muted-foreground"><strong className="text-foreground">Warnings:</strong> Food supplement. Not a substitute for a varied, balanced diet and healthy lifestyle. Keep out of reach of young children. Not suitable for pregnant or breastfeeding women unless advised by a healthcare professional. Store in a cool, dry place below 25°C, out of direct sunlight.</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default SupplementFacts;
