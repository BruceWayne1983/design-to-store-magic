import SectionHeader from "../SectionHeader";

const testimonials = [
  { name: "Sarah K.", role: "Marathon Runner", quote: "Baseline protocols transformed my recovery time. I PR'd my last marathon by 12 minutes." },
  { name: "James R.", role: "CrossFit Athlete", quote: "Finally, a supplement brand that uses real science. The pre-workout stack is incredible." },
  { name: "Maria L.", role: "Olympic Swimmer", quote: "I've tried everything. Baseline is the only brand I trust with my nutrition." },
];

const Testimonials = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
      <SectionHeader heading="What athletes say" text="Hear from athletes who trust Baseline." />
      <div className="grid grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="flex flex-col gap-6 border border-foreground p-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-foreground">★</span>
              ))}
            </div>
            <p className="text-base text-foreground leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div>
                <div className="text-base font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
