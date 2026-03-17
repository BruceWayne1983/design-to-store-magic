import { BookOpen } from "lucide-react";

const articles = [
  {
    title: "Understanding Glucose Disposal Agents",
    desc: "How GDAs like berberine and chromium picolinate redirect carbohydrates toward muscle glycogen instead of fat storage.",
    category: "Metabolic Science",
  },
  {
    title: "Hydration Science for Athletes",
    desc: "The role of electrolyte balance and glycerol hyperhydration in sustaining performance during high-intensity training.",
    category: "Performance",
  },
  {
    title: "Nitric Oxide and Performance",
    desc: "How L-citrulline and nitrate supplementation increase blood flow, oxygen delivery and muscular endurance.",
    category: "Mechanisms",
  },
  {
    title: "The Science of Citrulline",
    desc: "Why L-citrulline outperforms L-arginine for nitric oxide production and what the clinical data shows at effective doses.",
    category: "Ingredients",
  },
];

const Education = () => (
  <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <div className="flex flex-col gap-3 text-center max-w-[640px] mx-auto">
        <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">Education</span>
        <h2 className="text-2xl md:text-4xl font-black text-foreground uppercase tracking-tight">
          Science-Led Resources
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Deep dives into the mechanisms, ingredients and protocols behind every Baseline formula.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {articles.map((a) => (
          <div key={a.title} className="flex flex-col bg-background border border-border rounded-lg overflow-hidden hover:shadow-md hover:border-primary/30 transition-all group">
            <div className="w-full h-[160px] md:h-[180px] bg-[hsl(var(--hero-dark))] flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-primary/40" strokeWidth={1} />
            </div>
            <div className="p-5 flex flex-col gap-2 flex-1">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{a.category}</span>
              <h5 className="text-sm md:text-base font-bold text-foreground leading-snug">{a.title}</h5>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{a.desc}</p>
              <button className="self-start mt-3 text-xs font-medium text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
