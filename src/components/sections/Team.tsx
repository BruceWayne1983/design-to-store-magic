import SectionHeader from "../SectionHeader";

const team = [
  { name: "Dr. Alex Chen", role: "Chief Science Officer" },
  { name: "Jordan Park", role: "Head of Product" },
  { name: "Dr. Lisa Moore", role: "Nutrition Researcher" },
  { name: "Sam Torres", role: "Performance Coach" },
];

const Team = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
      <SectionHeader heading="The team behind Baseline" text="World-class scientists and athletes building the future of performance nutrition." />
      <div className="grid grid-cols-4 gap-8">
        {team.map((m) => (
          <div key={m.name} className="flex flex-col items-center gap-4">
            <div className="w-full aspect-square bg-muted flex items-center justify-center">
              <div className="w-10 h-10 bg-muted-foreground/20 rounded" />
            </div>
            <div className="text-center">
              <div className="text-base font-semibold text-foreground">{m.name}</div>
              <div className="text-sm text-muted-foreground">{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
