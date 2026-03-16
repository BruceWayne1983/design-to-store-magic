import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="w-full relative min-h-[600px] flex items-center overflow-hidden">
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,50%,8%)] via-[hsl(215,50%,8%)/0.7] to-transparent" />
    <div className="relative z-10 max-w-[1280px] mx-auto w-full px-16 py-28">
      <div className="flex flex-col gap-8 max-w-[550px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-[56px] font-black leading-[1.1] text-white uppercase tracking-tight">
            Performance<br />Built on Real Science
          </h1>
          <p className="text-lg text-white/80">
            Clinically formulated supplements designed for measurable results.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-primary text-primary-foreground text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
            Shop Performance
          </button>
          <button className="px-6 py-3 border border-white text-white text-base font-medium uppercase tracking-wider hover:bg-white/10 transition-colors">
            Explore Stacks
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
