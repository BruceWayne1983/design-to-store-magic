import SectionHeader from "../SectionHeader";

const steps = [
  { step: "Step 1", title: "Assess your nutrition", desc: "Take our quick assessment to understand your performance needs" },
  { step: "Step 2", title: "Select your protocol", desc: "Choose a science-backed protocol tailored to your goals" },
  { step: "Step 3", title: "Optimize & perform", desc: "Track progress and optimize your nutrition over time" },
];

const HowItWorks = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
      <SectionHeader tagline="Process" heading="How it works" text="Simple steps to peak performance nutrition" />
      <div className="grid grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.step} className="flex flex-col gap-6">
            <div className="text-sm font-semibold text-muted-foreground">{s.step}</div>
            <div className="w-full h-[200px] bg-muted flex items-center justify-center">
              <div className="w-10 h-10 bg-muted-foreground/20 rounded" />
            </div>
            <div>
              <h5 className="text-xl font-bold text-foreground">{s.title}</h5>
              <p className="text-base text-muted-foreground mt-2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
