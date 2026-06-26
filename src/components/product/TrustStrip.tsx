import type { ProductData } from "@/data/products";

const TrustStrip = ({ product }: { product: ProductData }) => {
  if (!product.ingredientLogos || product.ingredientLogos.length === 0) return null;
  return (
    <section className="w-full border-y border-border bg-secondary/40">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-6 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-foreground text-center md:text-left whitespace-nowrap">
          Formulated with 3rd-party tested ingredients
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 flex-1">
          {product.ingredientLogos.map((logo) => (
            <div key={logo.name} className="h-10 md:h-12 flex items-center">
              <img src={logo.image} alt={logo.name} className="max-h-full max-w-[140px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
