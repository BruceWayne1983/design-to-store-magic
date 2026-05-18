import { Link } from "react-router-dom";
import { Atom, Wind, BarChart3 } from "lucide-react";

const mechanisms = [
  {
    icon: Atom,
    title: "AMPK Activation",
    desc: "Targeted activation of AMP-activated protein kinase to enhance cellular energy metabolism, glucose uptake and fat oxidation pathways.",
  },
  {
    icon: Wind,
    title: "Nitric Oxide Signalling",
    desc: "Clinically dosed precursors drive endothelial nitric oxide production for vasodilation, blood flow and nutrient delivery to working muscle.",
  },
  {
    icon: BarChart3,
    title: "Metabolic Partitioning",
    desc: "Precision glucose disposal and nutrient partitioning agents direct carbohydrates toward glycogen storage rather than adipose tissue.",
  },
];

const ScienceSection = () => (
  <section className="w-full bg-[hsl(var(--hero-dark))] py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <div className="flex flex-col gap-3 text-center max-w-[640px] mx-auto">
        <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">The Science</span>
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
          Formulated for Mechanism — Not Marketing
        </h2>
        <p className="text-sm md:text-base text-white/60">
          Every formula targets a specific biological pathway backed by peer-reviewed research and clinical dosing protocols.
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
