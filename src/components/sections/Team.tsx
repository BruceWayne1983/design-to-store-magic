import SectionHeader from "../SectionHeader";

const Team = () => (
  <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-20">
      <SectionHeader heading="The team behind Baseline" text="World-class scientists and athletes building the future of performance nutrition." />
      <div className="flex flex-col items-center gap-6 py-12 md:py-20">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-3xl md:text-4xl font-bold text-primary">BN</span>
        </div>
        <div className="text-center max-w-[500px]">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Team Reveal Coming Soon</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Our team of scientists, formulators, and performance coaches is working behind the scenes to bring you the most effective supplements on the market.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Team;
