import stackPerformance from "@/assets/products/stack-performance.jpg";
import stackPreworkout from "@/assets/products/stack-preworkout.jpg";
import stackFoundation from "@/assets/products/stack-foundation.jpg";

export interface Bundle {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  /** Product slugs included in the bundle (must exist in src/data/products.ts) */
  productSlugs: string[];
  components: string[];
  regularPrice: number;
  bundlePrice: number;
  badge?: string;
}

export const bundles: Bundle[] = [
  {
    slug: "performance-stack",
    name: "Performance Stack",
    tagline: "Focus + Pump",
    description:
      "The complete pre-workout system. Fusion Lite+ delivers clinically dosed focus and energy, while VASCUL8™ drives stimulant-free pumps and vascularity. Train harder, think sharper.",
    image: stackPerformance,
    productSlugs: ["fusion-lite-plus", "vascul8"],
    components: ["Fusion Lite+", "VASCUL8™"],
    regularPrice: 71.98,
    bundlePrice: 64.99,
    badge: "Most Popular",
  },
  {
    slug: "metabolic-stack",
    name: "Metabolic Stack",
    tagline: "Nutrient Partitioning",
    description:
      "Maximise how your body handles carbohydrates. GLYCO8™ targets glucose disposal while GLYCOSHIFT™ fuels training with a triple-source carb matrix — the ultimate intra-workout and refeed pairing.",
    image: stackPreworkout,
    productSlugs: ["glyco8", "glycoshift"],
    components: ["GLYCO8™", "GLYCOSHIFT™"],
    regularPrice: 79.98,
    bundlePrice: 71.99,
  },
  {
    slug: "foundation-stack",
    name: "Foundation Stack",
    tagline: "Everyday Essentials",
    description:
      "The daily baseline. Pürest Creatine™ for strength, power and recovery, paired with Electro Flow for real-dose hydration and electrolytes. The two essentials every athlete should run year-round.",
    image: stackFoundation,
    productSlugs: ["purest-creatine", "electro-flow"],
    components: ["Pürest Creatine™", "Electro Flow"],
    regularPrice: 51.98,
    bundlePrice: 46.99,
  },
];

export const getBundle = (slug: string): Bundle | undefined =>
  bundles.find((b) => b.slug === slug);
