import { ChevronRight } from "lucide-react";

interface ProductCardProps {
  tagline: string;
  heading: string;
  text: string;
}

const ProductCard = ({ tagline, heading, text }: ProductCardProps) => (
  <div className="flex flex-col border border-foreground bg-background">
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold text-foreground">{tagline}</span>
        <div className="flex flex-col gap-2">
          <h5 className="text-2xl font-bold leading-[1.4] text-foreground">{heading}</h5>
          <p className="text-base text-foreground leading-[1.5]">{text}</p>
        </div>
      </div>
      <a href="#" className="flex items-center gap-2 text-base text-foreground hover:opacity-70">
        View all <ChevronRight className="w-5 h-5" />
      </a>
    </div>
    <div className="w-full h-[171px] bg-muted flex items-center justify-center">
      <div className="w-10 h-10 bg-muted-foreground/20 rounded" />
    </div>
  </div>
);

export default ProductCard;
