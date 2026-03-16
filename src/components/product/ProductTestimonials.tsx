import { Star } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const ProductTestimonials = ({ product }: { product: ProductData }) => (
  <section className="w-full bg-secondary py-16 px-4 md:py-28 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-8 md:gap-12">
      <ScrollReveal><SectionHeader heading="Real results" text={`Athletes who trust ${product.name}`} /></ScrollReveal>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {product.testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <div className="flex flex-col gap-4 bg-background border border-border rounded-lg p-6 md:p-8 h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
              <p className="text-sm text-foreground leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-xs font-bold text-primary">{t.name[0]}</span></div>
                <div><div className="text-sm font-semibold text-foreground">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default ProductTestimonials;
