const ReadyToPerform = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-5xl font-black leading-[1.1] text-foreground">
          Built For <span className="text-primary">Performance</span> Professionals
        </h2>
        <p className="text-lg text-muted-foreground">
          Baseline supports blood markers, conditions for health, and metabolic optimisation to satiate performance.
        </p>
      </div>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-primary text-primary-foreground text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
          Shop now
        </button>
        <button className="px-6 py-3 border border-border text-foreground text-base font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors">
          Take assessment
        </button>
      </div>
    </div>
  </section>
);

export default ReadyToPerform;
