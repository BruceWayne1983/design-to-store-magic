import SectionHeader from "../SectionHeader";
import glyco8 from "@/assets/glyco8.png";
import fusionBlack from "@/assets/fusion-black.png";
import vascul8 from "@/assets/vascul8.png";

const protocols = [
  { name: "Performance Stack", desc: "Protocol metaboost for clinical proportion results.", price: "£39.99", image: glyco8 },
  { name: "Metabolic Stack", desc: "Protocol supports biace alarmed ingredients.", price: "£29.99", image: fusionBlack },
  { name: "Recovery Stack", desc: "Protocols support throughout all blueprint health.", price: "£36.99", image: vascul8 },
];

const CompleteProtocols = () => (
  <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <SectionHeader heading="Built Protocols" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {protocols.map((p) => (
          <div key={p.name} className="flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-[220px] md:h-[280px] bg-secondary flex items-center justify-center p-6">
              <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
              <span className="absolute top-4 right-4 px-2 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase">
                Save Tips
              </span>
            </div>
            <div className="p-4 md:p-6 flex flex-col gap-2 text-center">
              <h5 className="text-base md:text-lg font-bold text-primary">{p.name}</h5>
              <p className="text-xs md:text-sm text-muted-foreground">{p.desc}</p>
              <span className="text-lg md:text-xl font-bold text-foreground border border-border inline-block mx-auto px-4 py-1 mt-2">{p.price}</span>
              <button className="mt-3 px-4 py-2 bg-primary text-primary-foreground text-xs md:text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CompleteProtocols;
