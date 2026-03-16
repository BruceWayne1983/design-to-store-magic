import SectionHeader from "../SectionHeader";
import glyco8 from "@/assets/glyco8.png";
import fusionBlack from "@/assets/fusion-black.png";
import vascul8 from "@/assets/vascul8.png";

const categories = [
  { title: "PERFORMANCE", desc: "Traditionally reformulated. Comparable reliable results.", image: glyco8 },
  { title: "METABOLIC\n& HEALTH", desc: "Potent interventional at extensions of positive net clinical markers.", image: fusionBlack },
  { title: "RECOVERY\n& SLEEP", desc: "Optimise to rejuvenate the biodynamics an entirely restorative form.", image: vascul8 },
];

const FindWhatYouNeed = () => (
  <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <SectionHeader heading="Best Sellers" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((c) => (
          <div key={c.title} className="relative rounded-lg overflow-hidden group cursor-pointer">
            <div className="w-full h-[300px] md:h-[400px] bg-[hsl(var(--hero-dark))] flex items-center justify-center p-8 relative">
              <img src={c.image} alt={c.title} className="w-full h-full object-contain relative z-10 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,50%,8%)] via-[hsl(215,50%,8%)/0.6] to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 z-10">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider whitespace-pre-line">{c.title}</h3>
                <p className="text-xs md:text-sm text-white/70 mt-2 max-w-[200px]">{c.desc}</p>
              </div>
              <button className="self-start px-4 md:px-5 py-2 border border-white text-white text-xs md:text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-foreground transition-colors">
                Shop Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FindWhatYouNeed;
