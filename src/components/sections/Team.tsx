import SectionHeader from "../SectionHeader";

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
}

// Populate when the team page is ready. While empty, the section hides itself
// so the home page doesn't show a "Coming Soon" stub.
const team: TeamMember[] = [];

const Team = () => {
  if (team.length === 0) return null;

  return (
    <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-20">
        <SectionHeader
          heading="The team behind Baseline"
          text="World-class scientists and athletes building the future of performance nutrition."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center gap-3">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
