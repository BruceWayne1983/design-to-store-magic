const ReadyToPerform = () => (
  <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
      <div className="flex flex-col gap-4 md:gap-6">
        <h2 className="text-3xl md:text-5xl font-black leading-[1.1] text-foreground">
          Built For <span className="text-primary">Performance</span> Professionals
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          Baseline supports blood markers, conditions for health, and metabolic optimisation to satiate performance.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <button className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
          Shop now
        </button>
        <button className="px-6 py-3 border border-border text-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors">
          Take assessment
        </button>
      </div>
    </div>
  </section>
);

export default ReadyToPerform;
