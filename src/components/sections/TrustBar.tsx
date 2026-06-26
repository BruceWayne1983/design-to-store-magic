import { Truck, Leaf, ShieldCheck, FlaskConical } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD } from "@/data/brand";

const items = [
  { icon: Truck, title: "Fast UK Shipping", desc: `Free delivery on orders over £${FREE_SHIPPING_THRESHOLD}` },
  { icon: Leaf, title: "Premium Ingredients", desc: "Clinically dosed, patented actives" },
  { icon: FlaskConical, title: "3rd-Party Tested", desc: "Independently lab-verified for purity" },
  { icon: ShieldCheck, title: "Satisfaction Guarantee", desc: "30-day money-back promise" },
];

const TrustBar = () => (
  <section className="w-full bg-background border-b border-border py-5 md:py-6 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {items.map((item) => (
        <div key={item.title} className="flex items-center justify-center md:justify-start gap-3">
          <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
          <div>
            <div className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">{item.title}</div>
            <div className="text-[10px] md:text-xs text-muted-foreground">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBar;
