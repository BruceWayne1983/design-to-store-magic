import { Link } from "react-router-dom";
import { Atom, Wind, BarChart3 } from "lucide-react";

const mechanisms = [
  {
    icon: Atom,
    title: "AMPK Activation",
    desc: "AMP-activated protein kinase regulates substrate selection. Targeted activation upregulates GLUT4 translocation and supports fatty-acid oxidation in skeletal muscle.",
  },
  {
    icon: Wind,
    title: "Endothelial NO Production",
    desc: "Pycnogenol® and L-citrulline raise plasma nitric oxide via the eNOS pathway, increasing arterial diameter and intramuscular blood flow during work.",
  },
  {
    icon: BarChart3,
    title: "Glucose Partitioning",
    desc: "Chromium, berberine and Glucovantage® improve insulin sensitivity, biasing post-meal glucose toward muscle glycogen rather than de novo lipogenesis.",
  },
];

const ScienceSection = () => (
  <section className="w-full bg-[hsl(var(--hero-dark))] py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <div className="flex flex-col gap-3 text-center max-w-[640px] mx-auto">
        <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">The Science</span>
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
          Formulated to a Pathway
        </h2>
        <p className="text-sm md:text-base text-white/60">
          Each product targets a defined biological mechanism. Doses match those used in the human trials cited on the product page.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {mechanisms.map((m) => (
          <div key={m.title} className="flex flex-col gap-4 p-6 md:p-8 border border-white/10 rounded-lg hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <m.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <h4 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">{m.title}</h4>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          to="/knowledge-base"
          className="px-6 py-3 border border-white/30 text-white text-xs md:text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors"
        >
          Read the Science
        </Link>
      </div>
    </div>
  </section>
);

export default ScienceSection;
