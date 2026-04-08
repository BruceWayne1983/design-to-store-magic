import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-animations";

const ProductReviews = () => (
  <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <ScrollReveal className="max-w-[1280px] mx-auto flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-muted-foreground/30" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">No reviews yet</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 py-8 border border-border rounded-lg w-full max-w-[500px]">
        <p className="text-sm text-muted-foreground">Be the first to write a review</p>
        <button className="px-6 py-2.5 border border-border text-foreground text-xs font-bold uppercase tracking-[0.15em] hover:border-primary hover:text-primary transition-colors rounded">
          Write a Review
        </button>
      </div>
    </ScrollReveal>
  </section>
);

export default ProductReviews;
