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
            <h3 className="text-lg md:text-xl font-black text-foreground uppercase">{product.name} <span className="font-normal text-sm md:text-base text-muted-foreground">Supplement Facts</span></h3>
            <span className="text-xs text-muted-foreground">Manufactured in a GMP Certified Facility</span>
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 font-semibold text-foreground">Ingredient</th>
                  <th className="text-left p-4 font-semibold text-foreground">Serving</th>
                  <th className="text-left p-4 font-semibold text-foreground">Purpose</th>
                  <th className="text-left p-4 font-semibold text-foreground">Trademark</th>
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
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground"><strong>Other ingredients:</strong> Vegetable Capsule, Microcrystalline Cellulose, Silicon Dioxide.</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default SupplementFacts;
