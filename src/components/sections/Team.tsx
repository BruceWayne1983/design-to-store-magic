import SectionHeader from "../SectionHeader";

const team = [
  { name: "Dr. Alex Chen", role: "Chief Science Officer" },
  { name: "Jordan Park", role: "Head of Product" },
  { name: "Dr. Lisa Moore", role: "Nutrition Researcher" },
  { name: "Sam Torres", role: "Performance Coach" },
];

const Team = () => (
  <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-20">
      <SectionHeader heading="The team behind Baseline" text="World-class scientists and athletes building the future of performance nutrition." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {team.map((m) => (
          <div key={m.name} className="flex flex-col items-center gap-3 md:gap-4">
            <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg md:text-2xl font-bold text-primary">{m.name[0]}{m.name.split(" ")[1]?.[0]}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm md:text-base font-semibold text-foreground">{m.name}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
