import SectionHeader from "../SectionHeader";
import ProductCard from "../ProductCard";

const categories = [
  { tagline: "Category", heading: "Pre-workout formulas", text: "Optimized energy and focus blends" },
  { tagline: "Category", heading: "Recovery protocols", text: "Post-training nutrition essentials" },
  { tagline: "Category", heading: "Daily foundations", text: "Core vitamins and minerals" },
  { tagline: "Category", heading: "Performance stacks", text: "Bundled protocols for athletes" },
];

const FindWhatYouNeed = () => (
  <section className="w-full bg-background py-28 px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
      <SectionHeader tagline="Products" heading="Find what you need" text="Explore our complete range of performance nutrition" />
      <div className="grid grid-cols-4 gap-8">
        {categories.map((c) => (
          <ProductCard key={c.heading} {...c} />
        ))}
      </div>
    </div>
  </section>
);

export default FindWhatYouNeed;
