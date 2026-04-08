import { useEffect, useRef } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import fusionLitePlus from "@/assets/fusion-lite-plus.png";
import vascul8 from "@/assets/vascul8.png";
import glyco8 from "@/assets/glyco8.png";
import glycoshift from "@/assets/glycoshift.png";
import electroFlow from "@/assets/electro-flow.png";
import purestCreatine from "@/assets/purest-creatine.png";
import h2oGo from "@/assets/h2o-go.png";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const popular = [
  { name: "Fusion Lite+", slug: "fusion-lite-plus", image: fusionLitePlus, price: "£31.99" },
  { name: "VASCUL8™", slug: "vascul8", image: vascul8, price: "£39.99" },
  { name: "GLYCO8™", slug: "glyco8", image: glyco8, price: "£39.99" },
  { name: "GLYCOSHIFT™", slug: "glycoshift", image: glycoshift, price: "£39.99" },
  { name: "Electro Flow", slug: "electro-flow", image: electroFlow, price: "£27.99" },
  { name: "Pürest Creatine™", slug: "purest-creatine", image: purestCreatine, price: "£23.99" },
  { name: "H2O GO", slug: "h2o-go", image: h2oGo, price: "TBC" },
];

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-background/98 backdrop-blur-sm flex flex-col">
      <div className="max-w-[720px] mx-auto w-full px-4 md:px-8 pt-8 md:pt-16 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, ingredients, articles..."
              className="w-full pl-12 pr-4 py-4 text-base bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button onClick={onClose} className="p-3 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">All Products</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popular.map((p) => (
              <Link
                to={`/product/${p.slug}`}
                key={p.slug}
                onClick={onClose}
                className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-lg border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-xs font-bold text-foreground text-center">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.price}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quick Links</h4>
          {["Performance Supplements", "Metabolic Support", "Health & Hydration", "The Science"].map((link) => (
            <button key={link} className="flex items-center justify-between py-2 text-sm text-foreground hover:text-primary transition-colors group">
              {link}
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
