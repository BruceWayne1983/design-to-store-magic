import { useState } from "react";
import { X } from "lucide-react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-primary text-primary-foreground relative z-[60]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-2 flex items-center justify-center">
        <p className="text-xs md:text-sm font-medium tracking-wide text-center">
          FREE SHIPPING ON ALL UK ORDERS OVER £75 — <span className="underline cursor-pointer">Shop Now</span>
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
