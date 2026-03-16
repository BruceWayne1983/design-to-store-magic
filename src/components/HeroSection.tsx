const HeroSection = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[1280px] mx-auto flex items-center gap-20">
      <div className="flex-1 flex flex-col gap-8 max-w-[600px]">
        <div className="flex flex-col gap-6">
          <h1 className="text-[56px] font-bold leading-[1.2] text-foreground">
            Performance nutrition built on real science
          </h1>
          <p className="text-lg text-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-foreground text-background border border-foreground text-base hover:opacity-90 transition-opacity">
            Shop all products
          </button>
          <button className="px-6 py-3 border border-foreground text-foreground text-base hover:bg-foreground hover:text-background transition-colors">
            Learn more
          </button>
        </div>
      </div>
      <div className="flex-1 max-w-[600px] aspect-square bg-muted flex items-center justify-center">
        <div className="w-16 h-16 bg-muted-foreground/20 rounded" />
      </div>
    </div>
  </section>
);

export default HeroSection;
