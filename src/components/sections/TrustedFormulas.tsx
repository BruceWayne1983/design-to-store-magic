import SectionHeader from "../SectionHeader";
import { Link } from "react-router-dom";
import glyco8 from "@/assets/glyco8.png";
import fusionBlack from "@/assets/fusion-black.png";
import vascul8 from "@/assets/vascul8.png";
import glycoshift from "@/assets/glycoshift.png";

const products = [
  { name: "GLYCO8", slug: "glyco8", desc: "Advanced Glucose Disposal Agent", price: "£39.99", image: glyco8 },
  { name: "FUSION BLACK", slug: "fusion-black", desc: "Premium Performance PreWorkout", price: "£36.99", image: fusionBlack },
  { name: "VASCUL8", slug: "vascul8", desc: "Nitric Oxide & Muscle Pump Catalyst", price: "£36.99", image: vascul8 },
  { name: "GLYCOSHIFT", slug: "glycoshift", desc: "Rapid Carb++ Hydration Fuel", price: "£29.99", image: glycoshift },
];

const TrustedFormulas = () => (
  <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <SectionHeader heading="Best Sellers" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((p) => (
          <Link to={`/product/${p.slug}`} key={p.name} className="flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="w-full aspect-square bg-secondary flex items-center justify-center p-4 md:p-6">
              <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
            </div>
            <div className="p-4 md:p-6 flex flex-col gap-1 md:gap-2 text-center">
              <h5 className="text-sm md:text-lg font-bold text-foreground tracking-wide">{p.name}</h5>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{p.desc}</p>
              <span className="text-sm md:text-lg font-bold text-foreground mt-1">{p.price}</span>
              <button className="mt-2 md:mt-3 px-3 md:px-4 py-2 bg-primary text-primary-foreground text-xs md:text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
                View Product
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedFormulas;
