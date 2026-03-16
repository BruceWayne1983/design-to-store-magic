import SectionHeader from "@/components/SectionHeader";
import { ScrollReveal, slideLeft, slideRight } from "@/components/ui/scroll-animations";
import ampkPathway from "@/assets/mechanism-ampk-pathway.jpg";
import glut4Pathway from "@/assets/mechanism-glut4-pathway.jpg";
import glycogenPathway from "@/assets/mechanism-glycogen.jpg";

const mechanisms = [
  {
    step: "01",
    image: ampkPathway,
    title: "AMPK Activation",
    subtitle: "Dihydroberberine · Na-R-ALA",
    desc: "Dihydroberberine activates AMPK — the master metabolic switch — 5× more effectively than standard berberine. This signals muscle cells to open glucose transporters and pull sugar from the bloodstream into working tissue, independent of insulin.",
    stats: [
      { value: "5×", label: "More bioavailable than berberine" },
      { value: "30 min", label: "Time to measurable effect" },
    ],
  },
  {
    step: "02",
    image: glut4Pathway,
    title: "GLUT-4 Translocation",
    subtitle: "Cinnamon · Banaba Leaf",
    desc: "Cinnamon polyphenols and Banaba's corosolic acid directly activate GLUT-4 transporter proteins, moving them to the cell membrane surface. This creates additional glucose channels — allowing carbohydrates to enter muscle cells without requiring extra insulin.",
    stats: [
      { value: "2×", label: "Increased GLUT-4 surface expression" },
      { value: "20%", label: "Reduction in post-meal glucose" },
    ],
  },
  {
    step: "03",
    image: glycogenPathway,
    title: "Glycogen Partitioning",
    subtitle: "Chromium · Vanadium",
    desc: "Once glucose enters the cell, Chromium and Vanadium ensure it's stored as muscle glycogen rather than converted to fat. This nutrient partitioning effect means carbohydrates fuel performance and recovery, not adipose tissue accumulation.",
    stats: [
      { value: "40%", label: "More glycogen stored in muscle" },
      { value: "↓", label: "De novo lipogenesis reduced" },
    ],
  },
];

const IngredientMechanisms = () => (
  <section className="w-full bg-[hsl(var(--hero-dark))] py-28 px-6 md:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
      <ScrollReveal className="text-center">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">Science</span>
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-3">
          How the ingredients work
        </h2>
        <p className="text-sm text-white/50 mt-3 max-w-xl mx-auto">
          A three-stage glucose management system — each ingredient targets a specific metabolic pathway.
        </p>
      </ScrollReveal>

      {mechanisms.map((m, i) => (
        <div
          key={m.step}
          className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-stretch gap-0 rounded-lg overflow-hidden border border-white/10`}
        >
          <ScrollReveal className="md:w-1/2 relative" variants={i % 2 === 1 ? slideRight : slideLeft}>
            <img src={m.image} alt={m.title} className="w-full h-full object-cover min-h-[320px]" />
            <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-black text-primary-foreground">{m.step}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-5 bg-[hsl(215,50%,10%)]" variants={i % 2 === 1 ? slideLeft : slideRight} delay={0.15}>
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">{m.subtitle}</span>
            <h3 className="text-2xl font-black text-white uppercase">{m.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{m.desc}</p>
            <div className="flex gap-8 mt-2">
              {m.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-primary">{s.value}</span>
                  <span className="text-xs text-white/40">{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      ))}
    </div>
  </section>
);

export default IngredientMechanisms;
