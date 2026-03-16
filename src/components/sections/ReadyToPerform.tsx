const ReadyToPerform = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-5xl font-bold leading-[1.2] text-foreground">Ready to perform</h2>
        <p className="text-lg text-foreground">Start your journey to peak performance with science-backed nutrition.</p>
      </div>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-foreground text-background border border-foreground text-base hover:opacity-90 transition-opacity">
          Shop now
        </button>
        <button className="px-6 py-3 border border-foreground text-foreground text-base hover:bg-foreground hover:text-background transition-colors">
          Take assessment
        </button>
      </div>
    </div>
  </section>
);

export default ReadyToPerform;
