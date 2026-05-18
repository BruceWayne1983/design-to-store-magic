import SectionHeader from "../SectionHeader";

const testimonials = [
  { name: "Sarah K.", role: "Marathon Runner", quote: "Baseline protocols transformed my recovery time. I PR'd my last marathon by 12 minutes." },
  { name: "James R.", role: "CrossFit Athlete", quote: "Finally, a supplement brand that uses real science. The pre-workout stack is incredible." },
  { name: "Maria L.", role: "Olympic Swimmer", quote: "I've tried everything. Baseline is the only brand I trust with my nutrition." },
];

const Testimonials = () => (
  <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-20">
      <SectionHeader heading="What athletes say" text="Hear from athletes who trust Baseline." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="flex flex-col gap-4 md:gap-6 border border-border rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow">
            <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-primary" aria-hidden="true">★</span>
              ))}
            </div>
            <p className="text-sm md:text-base text-foreground leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{t.name[0]}</span>
              </div>
              <div>
                <div className="text-sm md:text-base font-semibold text-foreground">{t.name}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
