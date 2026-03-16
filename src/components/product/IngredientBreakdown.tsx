import glyco8Hero from "@/assets/glyco8-hero.png";

const ingredients = [
  {
    title: "Dihydroberberine (DHB)",
    tagline: "Key ingredient",
    dosage: "400mg",
    desc: "A bioavailable form of berberine that activates AMPK 5x more effectively than standard berberine. DHB rapidly improves insulin sensitivity, accelerates glucose disposal into muscle cells, and supports healthy blood sugar levels post-meal. Clinical studies show significant reductions in post-prandial glucose spikes within 30 minutes of ingestion.",
    hasImage: false,
  },
  {
    title: "Na-R-Alpha Lipoic Acid",
    dosage: "300mg",
    desc: "The stabilised, bioavailable form of ALA that acts as both a potent antioxidant and insulin mimetic. Na-R-ALA enhances glucose uptake independently of insulin, protects against oxidative stress in metabolically active tissues, and recycles other antioxidants like Vitamin C and E for comprehensive cellular protection.",
    hasImage: false,
  },
  {
    title: "Cinnamon Bark Extract",
    dosage: "300mg",
    desc: "Standardised extract containing bioactive polyphenols that mimic insulin action at the cellular level. Enhances GLUT-4 transporter activity, improves glycogen synthesis in skeletal muscle, and supports healthy fasting glucose levels through multiple complementary pathways.",
    hasImage: true,
  },
  {
    title: "Banaba Leaf Extract",
    dosage: "330mg",
    desc: "Containing corosolic acid at 20% standardisation, Banaba activates glucose transport proteins and inhibits adipogenesis. It works synergistically with berberine to maximise insulin-independent glucose uptake and supports healthy body composition by directing nutrients toward lean tissue.",
    hasImage: false,
  },
];

const IngredientBreakdown = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[900px] mx-auto flex flex-col gap-16">
      {ingredients.map((ing, i) => (
        <div key={ing.title} className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-black text-foreground">{ing.title}</h3>
              {ing.tagline && (
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">{ing.tagline}</span>
              )}
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-foreground">{ing.dosage}</span>
              <span className="text-xs text-muted-foreground block">per serving</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{ing.desc}</p>
          {ing.hasImage && (
            <div className="w-full h-[300px] bg-secondary rounded-lg flex items-center justify-center mt-4">
              <img src={glyco8Hero} alt={ing.title} className="h-full object-contain" />
            </div>
          )}
          {i < ingredients.length - 1 && <div className="border-b border-border mt-4" />}
        </div>
      ))}
    </div>
  </section>
);

export default IngredientBreakdown;
