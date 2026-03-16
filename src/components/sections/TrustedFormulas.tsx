import SectionHeader from "../SectionHeader";

const products = [
  { name: "Formula Alpha", price: "$49.99", tags: ["energy", "focus"] },
  { name: "Recovery Plus", price: "$39.99", tags: ["recovery"] },
  { name: "Daily Stack", price: "$59.99", tags: ["daily", "vitamins"] },
  { name: "Endurance Pro", price: "$44.99", tags: ["endurance"] },
];

const TrustedFormulas = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
      <SectionHeader tagline="Bestsellers" heading="Most trusted formulas" text="Our most popular science-backed products" />
      <div className="grid grid-cols-4 gap-8">
        {products.map((p) => (
          <div key={p.name} className="flex flex-col border border-foreground">
            <div className="w-full aspect-square bg-muted flex items-center justify-center">
              <div className="w-10 h-10 bg-muted-foreground/20 rounded" />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <div className="flex gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs font-semibold text-muted-foreground uppercase">{t}</span>
                ))}
              </div>
              <h5 className="text-lg font-bold text-foreground">{p.name}</h5>
              <span className="text-base text-foreground">{p.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedFormulas;
