import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import type { ProductData } from "@/data/products";

const ProductInfoAccordion = ({ product }: { product: ProductData }) => {
  return (
    <Accordion type="single" collapsible defaultValue="description" className="w-full border-t border-border">
      <AccordionItem value="description">
        <AccordionTrigger className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Description</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
          {product.shortDescription || product.tagline}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="benefits">
        <AccordionTrigger className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Key Benefits</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" /> {b}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      {product.ingredientLogos && product.ingredientLogos.length > 0 && (
        <AccordionItem value="ingredients">
          <AccordionTrigger className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Key Ingredients</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {product.ingredientLogos.map((logo) => (
                <div key={logo.name} className="bg-white border border-border rounded-md aspect-square flex items-center justify-center p-3">
                  <img src={logo.image} alt={logo.name} className="max-h-[70%] max-w-[85%] object-contain" />
                </div>
              ))}
            </div>
            <ul className="flex flex-col gap-1.5">
              {product.ingredients.slice(0, 6).map((ing) => (
                <li key={ing.title} className="flex justify-between text-xs text-muted-foreground border-b border-border/60 pb-1.5">
                  <span className="text-foreground/80">{ing.title}</span>
                  <span className="font-semibold text-foreground">{ing.dosage}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}

      <AccordionItem value="how-to-use">
        <AccordionTrigger className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">How to Use</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
          {product.suggestedUse}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="nutrition">
        <AccordionTrigger className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">Nutritional Information</AccordionTrigger>
        <AccordionContent>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2">Ingredient</th>
                <th className="py-2 text-right">Per Serving</th>
              </tr>
            </thead>
            <tbody>
              {product.supplementRows.map((r) => (
                <tr key={r.ingredient} className="border-b border-border/60">
                  <td className="py-2 text-foreground">{r.ingredient} <span className="text-muted-foreground">{r.spec}</span></td>
                  <td className="py-2 text-right font-semibold text-foreground">{r.dose}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-muted-foreground mt-3 italic">{product.supplementSummary}</p>
        </AccordionContent>
      </AccordionItem>

      {product.faqs && product.faqs.length > 0 && (
        <AccordionItem value="faq">
          <AccordionTrigger className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">FAQ</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              {product.faqs.slice(0, 3).map((f) => (
                <div key={f.q}>
                  <p className="text-sm font-semibold text-foreground mb-1">{f.q}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
              <Link to="#faq" className="text-xs font-bold uppercase tracking-[0.15em] text-primary hover:underline">
                See all questions →
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default ProductInfoAccordion;
