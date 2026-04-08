import heroBg from "@/assets/products/hero-banner.jpg";
import glyco8 from "@/assets/products/glyco8.jpg";
import fusionLitePlus from "@/assets/products/fusion-lite-plus.jpg";
import vascul8 from "@/assets/products/vascul8.jpg";
import glycoshift from "@/assets/products/glycoshift.jpg";

const HeroSection = () => (
  <section className="w-full relative min-h-[400px] md:min-h-[600px] flex items-center overflow-hidden">
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-dark))] via-[hsl(var(--hero-dark)/0.85)] to-[hsl(var(--hero-dark)/0.4)]" />
    <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 md:px-8 lg:px-16 py-16 md:py-28">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left content */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-[550px] flex-1">
          <div className="flex flex-col gap-3 md:gap-4">
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">Performance Nutrition</span>
            <h1 className="text-3xl md:text-[56px] font-black leading-[1.1] text-white uppercase tracking-tight">
              Performance<br />Built on Real Science
            </h1>
            <p className="text-base md:text-lg text-white/80">
              Evidence-driven supplements engineered for measurable improvements in performance, metabolism and recovery.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
              Shop Performance
            </button>
            <button className="px-6 py-3 border border-white text-white text-sm md:text-base font-medium uppercase tracking-wider hover:bg-white/10 transition-colors">
              Explore Stack Systems
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default HeroSection;
