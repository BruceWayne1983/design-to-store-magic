import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD } from "@/data/brand";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-primary text-primary-foreground relative z-[60]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-2 flex items-center justify-center">
        <p className="text-xs md:text-sm font-medium tracking-wide text-center">
          FREE UK SHIPPING ON ORDERS OVER £{FREE_SHIPPING_THRESHOLD} ·{" "}
          <Link to="/shop" className="underline font-semibold hover:opacity-80">Unlock Free Shipping →</Link>
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 md:right-6 p-1 hover:opacity-70 transition-opacity"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
