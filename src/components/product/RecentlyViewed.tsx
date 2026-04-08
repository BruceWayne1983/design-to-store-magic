import { Link } from "react-router-dom";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { getProduct } from "@/data/products";
import { ScrollReveal } from "@/components/ui/scroll-animations";

const RecentlyViewed = ({ currentSlug }: { currentSlug: string }) => {
  const recentSlugs = useRecentlyViewed(currentSlug);
  const recentProducts = recentSlugs.map(getProduct).filter(Boolean);

  if (recentProducts.length === 0) return null;

  return (
    <section className="w-full bg-secondary py-16 md:py-20 px-4 md:px-8 lg:px-16">
      <ScrollReveal className="max-w-[1280px] mx-auto flex flex-col gap-8">
        <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight">Recently Viewed</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {recentProducts.map((p) => p && (
            <Link
              to={`/site/product/${p.slug}`}
              key={p.slug}
              className="flex-shrink-0 w-[180px] md:w-[220px] flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-background"
            >
              <div className="w-full aspect-square bg-secondary flex items-center justify-center p-4">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
              </div>
              <div className="p-3 flex flex-col gap-1 text-center">
                <span className="text-xs font-bold text-foreground">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default RecentlyViewed;
