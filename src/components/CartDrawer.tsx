import { X, Plus, Minus, ShoppingBag, Loader2, ExternalLink, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const FREE_SHIPPING_THRESHOLD = 75;

const CartDrawer = () => {
  const { items, isLoading, isSyncing, cartOpen, setCartOpen, updateQuantity, removeItem, getCheckoutUrl, syncCart, subtotal: getSubtotal, totalItems: getTotalItems } = useCartStore();
  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setCartOpen(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[70] transition-opacity duration-300 ${cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setCartOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-background z-[80] shadow-2xl flex flex-col transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Cart · {totalItems}</h3>
          </div>
          <button onClick={() => setCartOpen(false)} className="p-1 hover:opacity-70 transition-opacity">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-5">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
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
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 pb-4 border-b border-border">
                    <div className="w-20 h-20 bg-secondary rounded flex items-center justify-center p-2 flex-shrink-0">
                      <img src={item.productImage} alt={item.productTitle} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <h5 className="text-sm font-bold text-foreground">{item.productTitle}</h5>
                      {item.variantTitle !== "Default Title" && (
                        <p className="text-xs text-muted-foreground">{item.variantTitle}</p>
                      )}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-border rounded">
                          <button
                            className="p-1.5 hover:bg-secondary transition-colors"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            disabled={isLoading}
                          >
                            <Minus className="w-3 h-3 text-foreground" />
                          </button>
                          <span className="px-3 text-xs font-medium text-foreground">{item.quantity}</span>
                          <button
                            className="p-1.5 hover:bg-secondary transition-colors"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="w-3 h-3 text-foreground" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">£{(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            disabled={isLoading}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
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
              <button
                onClick={handleCheckout}
                disabled={isLoading || isSyncing}
                className="w-full py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading || isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    Checkout
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
