import SectionHeader from "@/components/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animations";
import { motion } from "framer-motion";
import fusionBlack from "@/assets/fusion-black.png";
import vascul8 from "@/assets/vascul8.png";

const stacks = [
  { name: "FUSION BLACK", desc: "Premium Performance PreWorkout", price: "£36.99", image: fusionBlack },
  { name: "VASCUL8", desc: "Nitric Oxide & Muscle Pump Catalyst", price: "£36.99", image: vascul8 },
];

const RelatedStacks = () => (
  <section className="w-full bg-background py-16 px-4 md:py-28 md:px-8 lg:px-16">
    <div className="max-w-[768px] mx-auto flex flex-col items-center gap-8 md:gap-12">
      <ScrollReveal>
        <SectionHeader heading="Explore related stacks" text="Combine GLYCO8 with these formulas for maximum results" />
      </ScrollReveal>
      <StaggerContainer className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full">
        {stacks.map((s) => (
          <StaggerItem key={s.name}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.25 }}
              className="w-full sm:w-[200px] flex flex-row sm:flex-col border border-border rounded-lg overflow-hidden"
            >
              <div className="w-24 sm:w-full aspect-square bg-secondary flex items-center justify-center p-3 sm:p-4 flex-shrink-0">
                <img src={s.image} alt={s.name} className="w-full h-full object-contain" />
              </div>
              <div className="p-4 flex flex-col justify-center gap-1 sm:text-center">
                <h5 className="text-sm font-bold text-foreground">{s.name}</h5>
                <span className="text-xs text-muted-foreground sm:hidden">{s.desc}</span>
                <span className="text-sm font-bold text-foreground">{s.price}</span>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default RelatedStacks;
