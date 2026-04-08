import { Link } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import glyco8 from "@/assets/products/glyco8.jpg";
import fusionLitePlus from "@/assets/products/fusion-lite-plus.jpg";
import vascul8 from "@/assets/products/vascul8.jpg";
import glycoshift from "@/assets/products/glycoshift.jpg";

const stacks = [
  {
    name: "Performance Stack",
    desc: "Fusion Lite+ + VASCUL8 for maximum pre-workout intensity, pump and endurance.",
    price: "£64.99",
    images: [fusionLitePlus, vascul8],
    tag: "Most Popular",
  },
  {
    name: "Metabolic Stack",
    desc: "Glyco8 + GlycoShift for optimised glucose disposal, carb utilisation and body composition.",
    price: "£59.99",
    images: [glyco8, glycoshift],
    tag: "Save 15%",
  },
  {
    name: "Recovery Stack",
    desc: "Vascul8 + Glyco8 for enhanced blood flow, nutrient delivery and post-training recovery.",
    price: "£64.99",
    images: [vascul8, glyco8],
    tag: "New",
  },
];

const CompleteProtocols = () => (
  <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <SectionHeader heading="Stack Systems" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {stacks.map((s) => (
          <div key={s.name} className="flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
            <div className="relative w-full h-[220px] md:h-[280px] bg-secondary flex items-center justify-center p-6 gap-2">
              {s.images.map((img, i) => (
                <img key={i} src={img} alt={s.name} className="h-full object-contain max-w-[45%]" />
              ))}
              <span className="absolute top-4 right-4 px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider rounded-sm">
                {s.tag}
              </span>
            </div>
            <div className="p-5 md:p-6 flex flex-col gap-2">
              <h5 className="text-base md:text-lg font-bold text-foreground">{s.name}</h5>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg md:text-xl font-black text-foreground">{s.price}</span>
                <Link to="/site/shop" className="px-4 py-2 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider hover:opacity-90 transition-opacity rounded-sm">
                  View Stack
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CompleteProtocols;
