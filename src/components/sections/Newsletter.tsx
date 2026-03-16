const Newsletter = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-5xl font-bold leading-[1.2] text-foreground">
          Stay informed on performance
        </h2>
        <p className="text-lg text-foreground">
          Subscribe to get the latest research, product launches, and performance tips.
        </p>
      </div>
      <div className="flex w-full max-w-md gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 border border-foreground bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
        />
        <button className="px-6 py-3 bg-foreground text-background border border-foreground text-base hover:opacity-90 transition-opacity">
          Subscribe
        </button>
      </div>
      <p className="text-sm text-muted-foreground">By subscribing you agree to our Privacy Policy and consent to receive updates.</p>
    </div>
  </section>
);

export default Newsletter;
