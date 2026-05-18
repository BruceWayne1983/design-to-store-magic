import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { VARIANT_MAP } from "@/lib/shopify";

interface QuickAddModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    slug: string;
    price: string;
    image: string;
    desc: string;
    priceNum?: number;
  } | null;
}

const QuickAddModal = ({ open, onClose, product }: QuickAddModalProps) => {
  const { addItem, isLoading, setCartOpen } = useCartStore();

  if (!product) return null;

  const handleAdd = async () => {
    const variantId = VARIANT_MAP[product.slug];
    if (!variantId) {
      toast.error("This product isn't available to add right now.");
      return;
    }
    const priceNum = product.priceNum ?? parseFloat(product.price.replace(/[^0-9.]/g, ""));
    if (!priceNum) {
      toast.error("Pricing unavailable for this product.");
      return;
    }
    await addItem({
      variantId,
      variantTitle: "Default Title",
      productTitle: product.name,
      productSlug: product.slug,
      productImage: product.image,
      price: priceNum,
      currencyCode: "GBP",
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
    setCartOpen(true);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[480px] p-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name} Quick Add</DialogTitle>
        <div className="flex flex-col">
          <div className="w-full aspect-square bg-secondary flex items-center justify-center p-8">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-black text-foreground uppercase">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{product.desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-foreground">{product.price}</span>
              <div className="flex gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity rounded disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add to basket"}
            </button>
            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="text-center text-xs text-muted-foreground hover:text-primary transition-colors underline"
            >
              View full details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickAddModal;
