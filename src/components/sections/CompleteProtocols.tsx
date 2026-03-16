import SectionHeader from "../SectionHeader";
import { ChevronRight } from "lucide-react";

const protocols = [
  { name: "Pre-workout stack", desc: "Everything you need before training" },
  { name: "Athletic recovery", desc: "Comprehensive post-training protocol" },
  { name: "Daily performance", desc: "Foundation protocol for every day" },
];

const CompleteProtocols = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
      <SectionHeader tagline="Protocols" heading="Complete protocols" text="Curated stacks designed for specific goals" />
      <div className="grid grid-cols-3 gap-8">
        {protocols.map((p) => (
          <div key={p.name} className="flex flex-col border border-foreground">
            <div className="w-full h-[240px] bg-muted flex items-center justify-center">
              <div className="w-10 h-10 bg-muted-foreground/20 rounded" />
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <h5 className="text-xl font-bold text-foreground">{p.name}</h5>
                <p className="text-base text-muted-foreground">{p.desc}</p>
              </div>
              <a href="#" className="flex items-center gap-2 text-base text-foreground hover:opacity-70">
                Learn more <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CompleteProtocols;
