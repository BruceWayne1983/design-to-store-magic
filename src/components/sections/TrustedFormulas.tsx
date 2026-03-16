import SectionHeader from "../SectionHeader";
import glyco8 from "@/assets/glyco8.png";
import fusionBlack from "@/assets/fusion-black.png";
import vascul8 from "@/assets/vascul8.png";
import glycoshift from "@/assets/glycoshift.png";

const products = [
  { name: "GLYCO8", desc: "Advanced Glucose Disposal Agent", price: "£39.99", image: glyco8 },
  { name: "FUSION BLACK", desc: "Premium Performance PreWorkout", price: "£36.99", image: fusionBlack },
  { name: "VASCUL8", desc: "Nitric Oxide & Muscle Pump Catalyst", price: "£36.99", image: vascul8 },
  { name: "GLYCOSHIFT", desc: "Rapid Carb++ Hydration Fuel", price: "£29.99", image: glycoshift },
];

const TrustedFormulas = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
      <SectionHeader heading="Best Sellers" />
      <div className="grid grid-cols-4 gap-8">
        {products.map((p) => (
          <div key={p.name} className="flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="w-full aspect-square bg-secondary flex items-center justify-center p-6">
              <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
            </div>
            <div className="p-6 flex flex-col gap-2 text-center">
              <h5 className="text-lg font-bold text-foreground tracking-wide">{p.name}</h5>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <span className="text-lg font-bold text-foreground mt-1">{p.price}</span>
              <button className="mt-3 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedFormulas;
