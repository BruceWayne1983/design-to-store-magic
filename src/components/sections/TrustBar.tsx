import { Truck, Leaf, ShieldCheck, FlaskConical } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD } from "@/data/brand";

const items = [
  { icon: Truck, title: "UK Delivery", desc: `Free over £${FREE_SHIPPING_THRESHOLD}, tracked dispatch` },
  { icon: Leaf, title: "Trademarked Actives", desc: "Patented ingredients at label-stated doses" },
  { icon: FlaskConical, title: "Batch Tested", desc: "Independent third-party assay per batch" },
  { icon: ShieldCheck, title: "30-Day Returns", desc: "Unopened tubs, full refund" },
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
