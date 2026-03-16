const Newsletter = () => (
  <section className="w-full bg-[hsl(215,50%,8%)] py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
      <div className="flex flex-col gap-4 md:gap-6">
        <h2 className="text-3xl md:text-5xl font-black leading-[1.1] text-white uppercase tracking-tight">
          Stay informed on performance
        </h2>
        <p className="text-base md:text-lg text-white/70">
          Subscribe to get the latest research, product launches, and performance tips.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full max-w-md gap-3 md:gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary rounded text-sm md:text-base"
        />
        <button className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium hover:opacity-90 transition-opacity rounded">
          Subscribe
        </button>
      </div>
      <p className="text-xs md:text-sm text-white/40">By subscribing you agree to our Privacy Policy and consent to receive updates.</p>
    </div>
  </section>
);

export default Newsletter;
