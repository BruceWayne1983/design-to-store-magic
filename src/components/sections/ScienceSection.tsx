import glyco8 from "@/assets/glyco8.png";

const features = [
  { title: "Evidence-Based Dosing", desc: "Each formula is optimised via real-world dosing research and clinical trials." },
  { title: "Stack-Compatible Systems", desc: "Built for synergy. Supplements are designed to work together." },
  { title: "Full Transparency", desc: "Every ingredient, every dose, listed clearly. No proprietary blends." },
];

const ScienceSection = () => (
  <section className="w-full bg-[hsl(215,50%,8%)] py-0">
    <div className="max-w-[1440px] mx-auto flex items-stretch">
      <div className="w-[45%] relative flex items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(207,90%,54%)/0.1] to-transparent" />
        <img src={glyco8} alt="Product showcase" className="relative z-10 w-full max-w-[350px] object-contain" />
      </div>
      <div className="w-[55%] flex flex-col justify-center px-16 py-20">
        <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-tight">
          Formulated for<br />Mechanism — Not Marketing
        </h2>
        <div className="grid grid-cols-2 gap-8 mt-10">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col gap-2">
              <h4 className="text-base font-bold text-white">{f.title}</h4>
              <p className="text-sm text-white/60">{f.desc}</p>
            </div>
          ))}
        </div>
        <button className="mt-10 self-start px-6 py-3 border border-white text-white text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-foreground transition-colors">
          Read the Science
        </button>
      </div>
    </div>
  </section>
);

export default ScienceSection;
