import SectionHeader from "@/components/SectionHeader";

const rows = [
  { ingredient: "Dihydroberberine", spec: "(Biopelletized†)", dose: "410 mg", purpose: "Activates AMPK for Rapid Glucose Uptake", flag: "P" },
  { ingredient: "Na-R-Alpha Lipoic Acid", spec: "(BioEnhanced†)", dose: "300 mg", purpose: "Enhanced Fat & Carb Sensitivity, Insulin to GLUT-4", flag: "" },
  { ingredient: "Cinnamon Bark Extract", spec: "", dose: "300 mg", purpose: "Enhanced Extract Responding, Type 2 Agonist", flag: "Cinnulin PF®" },
  { ingredient: "Banaba Extract", spec: "(Corosolic Acid 20%)", dose: "330 mg", purpose: "Direct Activation GLUT-4 Translocation", flag: "" },
  { ingredient: "Bitter Melon Extract", spec: "(Charantin 1%)", dose: "300 mg", purpose: "Insulin Mimetic Action", flag: "" },
  { ingredient: "Chromium", spec: "", dose: "300 mcg", purpose: "Essential Cofactor for Insulin Signalling", flag: "" },
  { ingredient: "VanaBerry®", spec: "Vanadium Complex", dose: "2 mg", purpose: "AstraGin® Enhanced Absorption", flag: "" },
];

const SupplementFacts = () => (
  <section className="w-full bg-secondary py-28 px-16">
    <div className="max-w-[1000px] mx-auto flex flex-col gap-12">
      <SectionHeader heading="Clinically dosed formula" />
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-foreground uppercase">GLYCO8™ <span className="font-normal text-base text-muted-foreground">Supplement Facts</span></h3>
          </div>
          <span className="text-xs text-muted-foreground">Manufactured in a GMP Certified Facility</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left p-4 font-semibold text-foreground">Ingredient</th>
                <th className="text-left p-4 font-semibold text-foreground">Serving</th>
                <th className="text-left p-4 font-semibold text-foreground">Purpose</th>
                <th className="text-left p-4 font-semibold text-foreground">Trademark</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.ingredient} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-foreground">{r.ingredient}</span>
                    {r.spec && <span className="text-muted-foreground text-xs ml-1">{r.spec}</span>}
                  </td>
                  <td className="p-4 text-foreground">{r.dose}</td>
                  <td className="p-4 text-muted-foreground">{r.purpose}</td>
                  <td className="p-4 text-primary text-xs font-semibold">{r.flag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Other ingredients:</strong> Polyethylene Glycol, Microcrystalline Cellulose, Magnesium Stearate, Silicon Dioxide, Vegetable Capsule.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default SupplementFacts;
