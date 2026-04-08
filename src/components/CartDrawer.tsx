import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import glyco8 from "@/assets/glyco8.png";
import fusionLitePlus from "@/assets/fusion-lite-plus.png";
import vascul8 from "@/assets/vascul8.png";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FREE_SHIPPING_THRESHOLD = 75;

const demoItems = [
  { id: 1, name: "GLYCO8™", desc: "Fast-Acting Nutrient Partitioning Support", price: 39.99, qty: 1, image: glyco8 },
  { id: 2, name: "Fusion Lite+", desc: "Clinically Dosed Focus & Energy", price: 31.99, qty: 1, image: fusionLitePlus },
];

const upsells = [
  { name: "VASCUL8", desc: "Nitric Oxide & Pump", price: "£36.99", image: vascul8 },
];

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const subtotal = demoItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[70] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-background z-[80] shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Cart · {demoItems.length}</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:opacity-70 transition-opacity">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="px-5 py-3 bg-secondary border-b border-border">
          <p className="text-xs text-muted-foreground mb-2">
            {remaining > 0
              ? <>You're <span className="font-bold text-foreground">£{remaining.toFixed(2)}</span> away from free shipping!</>
              : <span className="font-bold text-primary">🎉 You've unlocked free shipping!</span>
            }
          </p>
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-4">
            {demoItems.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                <div className="w-20 h-20 bg-secondary rounded flex items-center justify-center p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <h5 className="text-sm font-bold text-foreground">{item.name}</h5>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-border rounded">
                      <button className="p-1.5 hover:bg-secondary transition-colors">
                        <Minus className="w-3 h-3 text-foreground" />
                      </button>
                      <span className="px-3 text-xs font-medium text-foreground">{item.qty}</span>
                      <button className="p-1.5 hover:bg-secondary transition-colors">
                        <Plus className="w-3 h-3 text-foreground" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-foreground">£{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upsells */}
          <div className="mt-6">
            <h6 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">You may also like</h6>
            {upsells.map((item) => (
              <div key={item.name} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <div className="w-14 h-14 flex items-center justify-center p-1.5 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h6 className="text-xs font-bold text-foreground">{item.name}</h6>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-bold text-foreground">{item.price}</span>
                  <button className="text-[10px] font-medium text-primary uppercase tracking-wider hover:underline">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border bg-background">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="text-lg font-black text-foreground">£{subtotal.toFixed(2)}</span>
          </div>
          <p className="text-[10px] text-muted-foreground mb-3">Shipping, taxes and discounts calculated at checkout.</p>
          <button className="w-full py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
