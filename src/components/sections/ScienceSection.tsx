import SectionHeader from "../SectionHeader";
import { ChevronRight } from "lucide-react";

const articles = [
  { title: "How beta-alanine boosts VO2 max", category: "Research", readTime: "5 min read" },
  { title: "The science of creatine loading", category: "Education", readTime: "7 min read" },
  { title: "Electrolytes & performance", category: "Guides", readTime: "4 min read" },
];

const ScienceSection = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
      <SectionHeader
        tagline="Science"
        heading="Learn the science behind performance"
        text="Evidence-based articles from our research team to help you understand what works and why."
      />
      <div className="grid grid-cols-3 gap-8">
        {articles.map((a) => (
          <div key={a.title} className="flex flex-col border border-foreground">
            <div className="w-full h-[200px] bg-muted flex items-center justify-center">
              <div className="w-10 h-10 bg-muted-foreground/20 rounded" />
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{a.category}</span>
                <span>•</span>
                <span>{a.readTime}</span>
              </div>
              <h5 className="text-lg font-bold text-foreground">{a.title}</h5>
              <a href="#" className="flex items-center gap-2 text-base text-foreground hover:opacity-70">
                Read more <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ScienceSection;
