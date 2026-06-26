// Product images — new mockups
import glyco8 from "@/assets/products/glyco8.jpg";
const glyco8Hero = glyco8;
const glyco8Capsules = glyco8;
const glyco8Label = glyco8;
import fusionLitePlus from "@/assets/products/fusion-lite-plus.jpg";
const fusionLitePlusHero = fusionLitePlus;
import vascul8 from "@/assets/products/vascul8.jpg";
const vascul8Hero = vascul8;
import glycoshift from "@/assets/products/glycoshift.jpg";
const glycoshiftHero = glycoshift;
import electroFlow from "@/assets/products/electro-flow.jpg";
const electroFlowHero = electroFlow;
import purestCreatine from "@/assets/products/purest-creatine-300g.jpg";
import h2oGo from "@/assets/products/h2o-go.jpg";
import purestCreatineLogo from "@/assets/products/purest-creatine-logo.png";
import hydroprimeLogo from "@/assets/ingredients/hydroprime.png";
import oxystormLogo from "@/assets/ingredients/oxystorm.png";
import electroprimeLogo from "@/assets/ingredients/electroprime.png";
import aquaminLogo from "@/assets/ingredients/aquamin.png";
import maxCatalystLogo from "@/assets/ingredients/max-catalyst.webp";
import glucovantageLogo from "@/assets/ingredients/glucovantage.png";

// Mechanism images
import mechanismAmpkPathway from "@/assets/mechanism-ampk-pathway.jpg";
import mechanismGlut4Pathway from "@/assets/mechanism-glut4-pathway.jpg";
import mechanismGlycogen from "@/assets/mechanism-glycogen.jpg";
import mechanismNitricOxide from "@/assets/mechanism-nitric-oxide.jpg";
import mechanismAtpEnergy from "@/assets/mechanism-atp-energy.jpg";
import mechanismGlycogenReplenish from "@/assets/mechanism-glycogen-replenish.jpg";
import mechanismAmpk from "@/assets/mechanism-ampk.jpg";
import mechanismGlut4 from "@/assets/mechanism-glut4.jpg";

export interface ProductMechanism {
  step: string;
  image: string;
  title: string;
  subtitle: string;
  desc: string;
  stats: { value: string; label: string }[];
}

export interface ProductIngredient {
  title: string;
  tagline?: string;
  dosage: string;
  desc: string;
  hasImage: boolean;
}

export interface SupplementRow {
  ingredient: string;
  spec: string;
  dose: string;
  purpose: string;
  flag: string;
}

export interface ClinicalMechanism {
  title: string;
  subtitle: string;
  image: string;
  badges: { dose: string; name: string }[];
  checks: string[];
}

export interface ProductTestimonial {
  name: string;
  role: string;
  quote: string;
}

export interface ProductFAQItem {
  q: string;
  a: string;
}

export interface ProductData {
  slug: string;
  name: string;
  tagline: string;
  subtitle: string;
  format: string;
  price: string;
  prices: Record<string, string>;
  savings: Record<string, string>;
  benefits: string[];
  images: string[];
  suggestedUse: string;
  supplementSummary: string;

  // Why different
  whyDifferentHeading: string;
  whyDifferentText: string;
  whyFeatures: { title: string; desc: string }[];

  // How it works
  howSteps: { tagline: string; title: string; desc: string }[];

  // Ingredient breakdown
  ingredients: ProductIngredient[];

  // Mechanisms visual
  mechanisms: ProductMechanism[];

  // Supplement facts
  supplementRows: SupplementRow[];

  // Clinical mechanisms
  clinicalMechanisms: ClinicalMechanism[];

  // Testimonials
  testimonials: ProductTestimonial[];

  // Related products
  relatedSlugs: string[];

  // FAQs
  faqs: ProductFAQItem[];

  // Trademarked ingredient logos (optional)
  ingredientLogos?: { image: string; name: string; caption?: string; forIngredient?: string }[];

  // V2 PDP optional fields
  shortDescription?: string;
  outcomeBullets?: string[];
  flavours?: { name: string; image?: string; available?: boolean }[];
  expectations?: { window: string; headline: string; bullets: string[]; summary: string }[];

  // Merchandising / availability
  comingSoon?: boolean;
  badge?: "Best Seller" | "New";
}

export const products: Record<string, ProductData> = {
  "fusion-lite-plus": {
    slug: "fusion-lite-plus",
    name: "Fusion Lite+",
    badge: "Best Seller",
    tagline: "Pre-Workout Stimulant",
    subtitle: "Focus that hits. Energy that lasts.",
    format: "150g Powder | 30 Servings | 5g Scoop",
    ingredientLogos: [
      { image: maxCatalystLogo, name: "MAX Catalyst™", forIngredient: "MAX Catalyst™" },
    ],
    price: "£31.99",
    prices: { "1": "£31.99", "4": "TBC", "6": "TBC" },
    savings: { "1": "", "4": "TBC", "6": "TBC" },
    benefits: [
      "Sharp, sustained mental focus from three trademarked nootropics",
      "Dual-phase caffeine system — fast onset, no crash",
      "Enhanced reaction time and brain energy",
      "Mood elevation and motivation support",
      "Complete pre-workout in a single 5g scoop",
    ],
    images: [fusionLitePlusHero, fusionLitePlus, fusionLitePlusHero, fusionLitePlus],
    suggestedUse: "Mix 1 scoop (5g) with 300–400ml cold water. 20–30 minutes before exercise. Max 1 serving/day. Not for evening use.",
    supplementSummary: "Caffeine Anhydrous 200mg · Infinergy® 150mg · L-Tyrosine 1,500mg · NeuroPEA™ 250mg · EnXtra® 200mg · Zynamite® 150mg · MAX Catalyst™ 5mg",
    whyDifferentHeading: "Why Fusion Lite+ is different",
    whyDifferentText: "Built on three trademarked nootropic actives — EnXtra®, NeuroPEA™, and Zynamite® — that no other single pre-workout on the UK market combines at full clinical doses. The dual-phase caffeine system (Caffeine Anhydrous 200mg + Infinergy® 150mg) provides immediate onset followed by a sustained tail — total caffeine ~310–315mg. Supplement Needs PRE Stim+ contains the same three nootropics but has no pump matrix and requires a separate £39.99 purchase. Fusion Lite+ delivers everything in one scoop at £31.99.",
    whyFeatures: [
      { title: "Triple Nootropic Stack", desc: "EnXtra® · NeuroPEA™ · Zynamite®" },
      { title: "Dual-Phase Caffeine", desc: "Anhydrous + Infinergy® — no crash" },
      { title: "One-Scoop Simplicity", desc: "Complete pre-workout in 5g" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "Activate Focus", desc: "EnXtra® amplifies alertness for 5 hours. NeuroPEA™ provides rapid-onset mood elevation. Zynamite® enhances brain energy and reaction speed at the cellular level." },
      { tagline: "Step 2", title: "Sustain Energy", desc: "Caffeine Anhydrous (200mg) for immediate energy. Infinergy® (150mg) for buffered, sustained release. Total ~310–315mg caffeine with no crash." },
      { tagline: "Step 3", title: "Support Performance", desc: "L-Tyrosine (1,500mg) replenishes dopamine under stress. L-Citrulline and Beta-Alanine provide ergogenic foundation. MAX Catalyst™ amplifies absorption." },
    ],
    ingredients: [
      { title: "L-Citrulline", dosage: "Clinical dose", desc: "Vasodilation and blood flow foundation. Stack with VASCUL8™ for maximum pump.", hasImage: false },
      { title: "Beta-Alanine", dosage: "Clinical dose", desc: "Increases carnosine, buffers fatigue, delays muscular failure. Tingling is normal.", hasImage: false },
      { title: "L-Tyrosine", tagline: "Key ingredient", dosage: "1,500mg", desc: "Dopamine precursor. Maintains focus under stress and stimulant load.", hasImage: false },
      { title: "Caffeine Anhydrous", dosage: "200mg", desc: "Fastest-acting caffeine. Immediate alertness and energy.", hasImage: false },
      { title: "Infinergy® (Di-Caffeine Malate)", dosage: "150mg", desc: "Buffered caffeine bonded to malic acid. Extends energy, reduces crash. TM: Creative Compounds.", hasImage: false },
      { title: "EnXtra® (Alpinia galanga)", tagline: "Key ingredient", dosage: "200mg", desc: "5-hour alertness without jitters. Synergistic with caffeine. TM: Enovate Biolife.", hasImage: true },
      { title: "NeuroPEA™ (Phenylethylamine HCl)", dosage: "250mg", desc: "Rapid-onset mood and cognitive elevation. TM: Compound Solutions.", hasImage: false },
      { title: "Zynamite® (Mangifera indica)", dosage: "150mg", desc: "Brain energy metabolism and reaction time. TM: Nektium Pharma.", hasImage: true },
      { title: "MAX Catalyst™", dosage: "5mg", desc: "Proprietary absorption amplifier. TM: Protein Partners.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismAtpEnergy, title: "Nootropic Focus Activation", subtitle: "EnXtra® · NeuroPEA™ · Zynamite®", desc: "Three trademarked nootropics work synergistically — EnXtra® amplifies alertness for 5 hours, NeuroPEA™ elevates mood rapidly, and Zynamite® enhances brain energy metabolism.", stats: [{ value: "5 hrs", label: "Sustained alertness" }, { value: "3", label: "Trademarked nootropics" }] },
      { step: "02", image: mechanismNitricOxide, title: "Dual-Phase Energy System", subtitle: "Caffeine Anhydrous · Infinergy®", desc: "Caffeine Anhydrous delivers immediate onset while Infinergy® provides a buffered, sustained tail. Total ~310–315mg caffeine with no crash.", stats: [{ value: "310mg", label: "Total caffeine" }, { value: "0", label: "Crash risk" }] },
      { step: "03", image: mechanismAmpkPathway, title: "Dopamine & Performance Support", subtitle: "L-Tyrosine · MAX Catalyst™", desc: "L-Tyrosine at 1,500mg replenishes dopamine under stimulant load and stress. MAX Catalyst™ amplifies absorption of all active compounds.", stats: [{ value: "1,500mg", label: "L-Tyrosine dose" }, { value: "5mg", label: "MAX Catalyst™" }] },
    ],
    supplementRows: [
      { ingredient: "Caffeine Anhydrous", spec: "", dose: "200 mg", purpose: "Immediate Energy & Alertness", flag: "" },
      { ingredient: "Infinergy®", spec: "(Di-Caffeine Malate)", dose: "150 mg (~110mg caffeine)", purpose: "Sustained Energy, Reduced Crash", flag: "Infinergy®" },
      { ingredient: "L-Tyrosine", spec: "", dose: "1,500 mg", purpose: "Dopamine Precursor Under Stress", flag: "" },
      { ingredient: "NeuroPEA™", spec: "(Phenylethylamine HCl)", dose: "250 mg", purpose: "Rapid Mood & Cognitive Elevation", flag: "NeuroPEA™" },
      { ingredient: "EnXtra®", spec: "(Alpinia galanga)", dose: "200 mg", purpose: "5-Hour Alertness Without Jitters", flag: "EnXtra®" },
      { ingredient: "Zynamite®", spec: "(Mangifera indica)", dose: "150 mg", purpose: "Brain Energy & Reaction Time", flag: "Zynamite®" },
      { ingredient: "MAX Catalyst™", spec: "", dose: "5 mg", purpose: "Proprietary Absorption Amplifier", flag: "MAX Catalyst™" },
    ],
    clinicalMechanisms: [
      { title: "Triple Nootropic Stack", subtitle: "EnXtra® + NeuroPEA™ + Zynamite®", image: mechanismAtpEnergy, badges: [{ dose: "200 MG", name: "EnXtra®" }, { dose: "250 MG", name: "NeuroPEA™" }], checks: ["5-Hour Sustained Alertness Without Jitters", "Rapid-Onset Mood Elevation & Brain Energy"] },
      { title: "Dual-Phase Caffeine System", subtitle: "Caffeine Anhydrous + Infinergy®", image: mechanismNitricOxide, badges: [{ dose: "200 MG", name: "Caffeine Anhydrous" }, { dose: "150 MG", name: "Infinergy®" }], checks: ["Immediate Onset + Sustained Tail (~310–315mg Total)", "Zero Crash — Buffered Release via Malic Acid Bond"] },
    ],
    testimonials: [
      { name: "Jake M.", role: "Gym Enthusiast", quote: "Fusion Lite+ gives me laser focus and the energy lasts my entire session. No crash, no jitters — just clean performance." },
      { name: "Lauren H.", role: "Personal Trainer", quote: "The nootropic stack in this is unreal. My clients notice the focus difference within 20 minutes. Nothing else on the UK market compares." },
      { name: "Tom W.", role: "Competitive CrossFitter", quote: "I stack this with VASCUL8 and it's the best pre-workout combo I've ever used. Focus, energy, and pumps all covered." },
    ],
    relatedSlugs: ["vascul8", "glyco8"],
    faqs: [
      { q: "How much caffeine?", a: "~310–315mg total (200mg anhydrous + ~110mg from Infinergy®). Equivalent to 3–4 cups of coffee." },
      { q: "What is dual-phase caffeine?", a: "Two forms absorbing at different speeds — immediate onset + sustained tail. Longer energy, no crash." },
      { q: "Will I get tingles?", a: "Possibly — Beta-Alanine causes harmless paraesthesia. Subsides within 15–30 mins." },
      { q: "Can I stack with VASCUL8™?", a: "Yes — the recommended Performance Stack. Fusion Lite+ for focus/energy, VASCUL8™ for pump." },
      { q: "Suitable for beginners?", a: "Caffeine is high. Start with half a scoop (2.5g, ~155mg caffeine) to assess tolerance." },
      { q: "Why only 5g serving?", a: "It's a nootropic-focus formula — concentrated compounds at mg doses. Stack with VASCUL8™ (12g) for full pre-workout." },
    ],
  },

  vascul8: {
    slug: "vascul8",
    name: "VASCUL8™",
    badge: "New",
    tagline: "Pre-Workout Pump (Non-Stimulant)",
    subtitle: "Performance",
    format: "360g Powder | 30 Servings | 12g Scoop",
    ingredientLogos: [
      { image: hydroprimeLogo, name: "HydroPrime®", forIngredient: "HydroPrime®" },
      { image: oxystormLogo, name: "OxyStorm®", forIngredient: "OxyStorm®" },
    ],
    price: "£39.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: [
      "Extreme vascularity and muscle fullness",
      "6g L-Citrulline — full clinical vasodilation dose",
      "HydroPrime® glycerol for hyperhydration and skin-splitting pumps",
      "Stimulant-free — stack with any stim or use for evening sessions",
      "Effects compound over consecutive days via AstraGin®",
    ],
    images: [vascul8Hero, vascul8Hero, vascul8Hero, vascul8Hero],
    suggestedUse: "Mix 1 scoop (12g) with 400–500ml cold water. 20–30 minutes before exercise. Can be stacked with Fusion Lite+.",
    supplementSummary: "L-Citrulline 6,000mg · HydroPrime® 2,500mg · Betaine Anhydrous 1,500mg · CellFlo6™ 300mg · Pycnogenol® 100mg · AstraGin® 50mg · MAX Catalyst™ 4mg",
    whyDifferentHeading: "Why VASCUL8™ is different",
    whyDifferentText: "6,000mg pure L-Citrulline — not Citrulline Malate which dilutes active dose with malic acid. HydroPrime® at 2,500mg with 65% glycerol yield — the highest-purity glycerol available. CellFlo6™ for endothelial function. Pycnogenol® pine bark for nitric oxide via a completely different pathway to citrulline. AstraGin® at the clinically validated 50mg dose building cumulative benefits over weeks. Strom VascuMAX PRO uses Citrulline Malate (lower yield), generic glycerol, and no trademarked absorption enhancer.",
    whyFeatures: [
      { title: "Pure L-Citrulline 6g", desc: "Full clinical dose — not diluted Citrulline Malate" },
      { title: "HydroPrime® 65% Glycerol", desc: "Highest-purity glycerol for hyperhydration" },
      { title: "Stim-Free Formula", desc: "Stack with any pre-workout or use for evening sessions" },
    ],
    howSteps: [
      { tagline: "Step 1 — Vasodilate", title: "Nitric oxide production", desc: "L-Citrulline (6,000mg) drives nitric oxide production. Pycnogenol® (100mg) enhances NO via endothelial NOS — a complementary pathway." },
      { tagline: "Step 2 — Hyperhydrate", title: "Cellular water & power", desc: "HydroPrime® (2,500mg, 65% glycerol) pulls water into muscle cells. Betaine Anhydrous (1,500mg) supports cellular hydration and power output." },
      { tagline: "Step 3 — Sustain & Amplify", title: "Compounding absorption", desc: "CellFlo6™ (300mg) supports endothelial function over time. AstraGin® (50mg) enhances absorption — amino acid uptake increases up to 14% after 4 weeks. MAX Catalyst™ adds bioavailability support." },
    ],
    ingredients: [
      { title: "L-Citrulline", tagline: "Key ingredient", dosage: "6,000mg", desc: "Pure citrulline, not malate. Full clinical vasodilation dose. Converts to L-Arginine in the kidneys, providing the essential substrate for nitric oxide synthase.", hasImage: false },
      { title: "HydroPrime® (65% Glycerol)", dosage: "2,500mg", desc: "Highest-purity glycerol available. Pulls water into muscle cells for hyperhydration and skin-splitting muscle fullness. TM: NNB Nutrition.", hasImage: false },
      { title: "Betaine Anhydrous", dosage: "1,500mg", desc: "Osmolyte for cell hydration, power output, and body composition. Works synergistically with HydroPrime® to maximise intracellular water volume.", hasImage: false },
      { title: "CellFlo6™ (Green Tea Extract)", dosage: "300mg", desc: "Patented endothelial support extract that improves blood vessel function over time. TM: Compound Solutions.", hasImage: true },
      { title: "Pycnogenol® (Pine Bark Extract)", dosage: "100mg", desc: "French maritime pine bark for eNOS activation and NO enhancement via a completely different pathway to citrulline. Slight bitterness = quality. TM: Horphag Research.", hasImage: false },
      { title: "AstraGin®", dosage: "50mg", desc: "Clinically validated dose. Absorption compounds over weeks — valine uptake +14%, leucine +8% at 4 weeks of daily use. TM: NuLiv Science.", hasImage: false },
      { title: "MAX Catalyst™", dosage: "4mg", desc: "Proprietary absorption amplifier. TM: Protein Partners.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismNitricOxide, title: "Vasodilation", subtitle: "L-Citrulline · Pycnogenol®", desc: "L-Citrulline drives NO production while Pycnogenol® activates eNOS via a complementary pathway for dual-source vasodilation.", stats: [{ value: "6,000mg", label: "Pure L-Citrulline dose" }, { value: "2×", label: "NO pathways activated" }] },
      { step: "02", image: mechanismGlut4Pathway, title: "Hyperhydration", subtitle: "HydroPrime® · Betaine", desc: "HydroPrime® 65% glycerol pulls water into muscle cells. Betaine supports cellular hydration and power output.", stats: [{ value: "65%", label: "Glycerol yield" }, { value: "2,500mg", label: "HydroPrime® dose" }] },
      { step: "03", image: mechanismAmpkPathway, title: "Cumulative Absorption", subtitle: "AstraGin® · CellFlo6™ · MAX Catalyst™", desc: "AstraGin® enhances amino acid absorption up to 14% after 4 weeks. CellFlo6™ supports endothelial function over time.", stats: [{ value: "+14%", label: "Amino acid uptake at 4 weeks" }, { value: "300mg", label: "CellFlo6™ dose" }] },
    ],
    supplementRows: [
      { ingredient: "L-Citrulline", spec: "(Pure)", dose: "6,000 mg", purpose: "Vasodilation & NO Production", flag: "" },
      { ingredient: "HydroPrime®", spec: "(65% Glycerol)", dose: "2,500 mg", purpose: "Hyperhydration & Muscle Fullness", flag: "HydroPrime®" },
      { ingredient: "Betaine Anhydrous", spec: "", dose: "1,500 mg", purpose: "Cell Hydration & Power Output", flag: "" },
      { ingredient: "CellFlo6™", spec: "(Green Tea Extract)", dose: "300 mg", purpose: "Endothelial Function Support", flag: "CellFlo6™" },
      { ingredient: "Pine Bark Extract", spec: "(Pycnogenol®)", dose: "100 mg", purpose: "eNOS Activation & NO Enhancement", flag: "Pycnogenol®" },
      { ingredient: "AstraGin®", spec: "", dose: "50 mg", purpose: "Cumulative Absorption Enhancement", flag: "AstraGin®" },
      { ingredient: "MAX Catalyst™", spec: "", dose: "4 mg", purpose: "Absorption Amplifier", flag: "MAX Catalyst™" },
    ],
    clinicalMechanisms: [
      { title: "Dual-Pathway Vasodilation", subtitle: "L-Citrulline + Pycnogenol®", image: mechanismNitricOxide, badges: [{ dose: "6,000 MG", name: "L-Citrulline" }, { dose: "100 MG", name: "Pycnogenol®" }], checks: ["Full Clinical Vasodilation Dose — Pure, Not Malate", "Complementary eNOS Activation Pathway"] },
      { title: "Hyperhydration System", subtitle: "HydroPrime® + Betaine Anhydrous", image: mechanismGlut4Pathway, badges: [{ dose: "2,500 MG", name: "HydroPrime®" }, { dose: "1,500 MG", name: "Betaine" }], checks: ["65% Glycerol Yield — Highest Purity Available", "Cellular Hydration & Power Output Support"] },
    ],
    testimonials: [
      { name: "Ryan C.", role: "Classic Physique", quote: "The pumps from VASCUL8 are unmatched — skin-splitting fullness that lasts hours after training." },
      { name: "Emma D.", role: "Fitness Model", quote: "I stack this with Fusion Lite+ and the pumps are absolutely unreal. Best combo I've ever used." },
      { name: "Alex P.", role: "Natural Bodybuilder", quote: "Stim-free pump product that actually delivers. I take it on rest days too — AstraGin® compounding is real." },
    ],
    relatedSlugs: ["fusion-lite-plus", "glyco8"],
    faqs: [
      { q: "Why no stimulants?", a: "Designed as the pump half of a complete system. Control caffeine separately, use for evening sessions, or stack with Fusion Lite+." },
      { q: "Why L-Citrulline not Citrulline Malate?", a: "Citrulline Malate is ~56% active citrulline. \"8g Citrulline Malate\" = ~4.5g actual citrulline. VASCUL8™ has 6,000mg pure citrulline." },
      { q: "What's the slight bitterness?", a: "Pycnogenol® pine bark polyphenols. Indicates quality. Minimised by the malic acid base and dual sweetener system." },
      { q: "Can I use on non-training days?", a: "Yes — AstraGin® benefits compound with daily use through gut barrier repair and transporter upregulation." },
      { q: "How to stack with Fusion Lite+?", a: "Mix both in 500–600ml, or take separately. Consume 20–30 mins before training." },
    ],
  },

  glycoshift: {
    slug: "glycoshift",
    name: "GLYCOSHIFT™",
    tagline: "Carbohydrate & Glucose Disposal Formula",
    subtitle: "Metabolic",
    format: "1.5kg Powder | 33 Servings | 45g Scoop",
    price: "£39.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: [
      "Triple-source carb matrix with Cluster Dextrin® and Palatinose™",
      "Full electrolyte spectrum for training hydration",
      "Sustained energy without spike-and-crash",
      "Glucose management via OpunTia® prickly pear",
      "No UK competitor combines trademarked carb sources at disclosed doses",
    ],
    images: [glycoshiftHero, glycoshift, glycoshiftHero, glycoshift],
    suggestedUse: "Mix 1 scoop (45g) with 500–750ml cold water. Sip throughout training. Max 2 servings/day.",
    supplementSummary: "Cluster Dextrin® 15g · Palatinose™ 10g · Maltodextrin DE10-12 5g · Fructose 5g · Taurine 1g · Coconut Water 1g · Pink Himalayan Salt 800mg · OpunTia® 250mg · Potassium 200mg · Magnesium 70mg · Calcium 70mg",
    whyDifferentHeading: "Why GLYCOSHIFT™ is different",
    whyDifferentText: "Strom CarbMAX is 83% Palatinose with trace electrolytes. Conteh Carb Drive uses generic carb sources. GLYCOSHIFT™ is built around Cluster Dextrin®, Palatinose™, and Maltodextrin DE10-12 — each chosen for a distinct absorption speed and metabolic pathway. A structured energy delivery system covering immediate, sustained, and slow-release windows. Plus a full electrolyte stack at real doses (Pink Himalayan Salt 800mg, Potassium, Magnesium, Calcium, Coconut Water) and OpunTia® for glucose disposal. No UK carb product combines multiple trademarked carb sources at fully disclosed doses.",
    whyFeatures: [
      { title: "Triple-Source Carb Matrix", desc: "Cluster Dextrin® · Palatinose™ · Maltodextrin — three speeds" },
      { title: "Full Electrolyte Stack", desc: "Real doses — Salt 800mg, K, Mg, Ca, Coconut Water" },
      { title: "Glucose Disposal", desc: "OpunTia® prickly pear for glucose management" },
    ],
    howSteps: [
      { tagline: "Step 1 — Immediate Energy", title: "Fast-acting glycogen restoration", desc: "Maltodextrin DE10-12 (5g) and Fructose (5g) provide fast-acting carbs for rapid glycogen restoration at the start of training." },
      { tagline: "Step 2 — Sustained Delivery", title: "Steady glucose without bloating", desc: "Cluster Dextrin® (15g) passes through the stomach rapidly without bloating, delivering steady glucose. Palatinose™ (10g) provides low-GI sustained energy while promoting fat oxidation." },
      { tagline: "Step 3 — Hydrate & Manage", title: "Electrolyte balance & glucose disposal", desc: "Full electrolyte matrix (Sodium, Potassium, Magnesium, Calcium) + Coconut Water Powder for fluid balance. OpunTia® supports glucose management." },
    ],
    ingredients: [
      { title: "Cluster Dextrin® (HBCD)", tagline: "Key ingredient", dosage: "15g", desc: "Gold standard intra-workout carb. High molecular weight, low osmolality, rapid gastric emptying, no bloating. TM: Glico Nutrition.", hasImage: false },
      { title: "Palatinose™ (Isomaltulose)", dosage: "10g", desc: "Low-GI, sustained-release disaccharide that promotes fat oxidation alongside glucose utilisation. Strom uses only this; we use it as one of three. TM: BENEO.", hasImage: false },
      { title: "Maltodextrin DE10-12", dosage: "5g", desc: "Fast-acting glucose polymer for immediate glycogen restoration at the start of training.", hasImage: false },
      { title: "Fructose Crystalline", dosage: "5g", desc: "Metabolised via liver through GLUT5 transporter. Replenishes liver glycogen — a separate pathway to muscle glycogen.", hasImage: false },
      { title: "Taurine", dosage: "1g", desc: "Cell hydration, antioxidant, and endurance support. Enhances cellular water balance during training.", hasImage: false },
      { title: "Coconut Water Powder", dosage: "1g", desc: "Natural potassium and trace mineral source. Provides electrolytes in ratios that mirror human sweat composition.", hasImage: true },
      { title: "Pink Himalayan Salt", dosage: "800mg", desc: "Primary electrolyte for fluid balance. Real dose, not trace — 800mg provides meaningful sodium for training hydration.", hasImage: false },
      { title: "OpunTia® (Prickly Pear)", dosage: "250mg", desc: "Glucose management and insulin sensitivity support from patented prickly pear extract. TM: BioActor.", hasImage: false },
      { title: "Potassium Citrate", dosage: "200mg", desc: "10% NRV. Essential electrolyte for muscular contraction and nerve function during training.", hasImage: false },
      { title: "Magnesium Citrate/Glycinate", dosage: "70mg", desc: "19% NRV. Dual-form magnesium for ATP production, muscular contraction, and nervous system support.", hasImage: false },
      { title: "Calcium Citrate", dosage: "70mg", desc: "9% NRV. Supports muscular contraction signalling during intense training.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismGlycogenReplenish, title: "Triple-Speed Carb Delivery", subtitle: "Maltodextrin · Cluster Dextrin® · Palatinose™", desc: "Three carb sources absorbing at different speeds — fast, sustained, and slow-release — for consistent energy from start to finish.", stats: [{ value: "35g", label: "Total carbs per serving" }, { value: "3×", label: "Absorption pathways" }] },
      { step: "02", image: mechanismGlycogen, title: "Zero-Bloat Gastric Clearance", subtitle: "Cluster Dextrin® HBCD", desc: "Cluster Dextrin's cyclic molecular structure creates near-zero osmotic pressure, enabling the fastest gastric emptying of any carbohydrate source.", stats: [{ value: "15g", label: "Cluster Dextrin® dose" }, { value: "0", label: "GI distress or bloating" }] },
      { step: "03", image: mechanismAmpkPathway, title: "Electrolyte & Glucose Management", subtitle: "Full mineral matrix · OpunTia®", desc: "Real-dose electrolytes replace what sweat removes. OpunTia® supports glucose disposal and insulin sensitivity.", stats: [{ value: "800mg", label: "Pink Himalayan Salt" }, { value: "250mg", label: "OpunTia® dose" }] },
    ],
    supplementRows: [
      { ingredient: "Cluster Dextrin®", spec: "(HBCD)", dose: "15 g", purpose: "Sustained Zero-Bloat Carbohydrate", flag: "Cluster Dextrin®" },
      { ingredient: "Palatinose™", spec: "(Isomaltulose)", dose: "10 g", purpose: "Low-GI Sustained Energy", flag: "Palatinose™" },
      { ingredient: "Maltodextrin", spec: "(DE10-12)", dose: "5 g", purpose: "Fast-Acting Glycogen Restoration", flag: "" },
      { ingredient: "Fructose Crystalline", spec: "", dose: "5 g", purpose: "Liver Glycogen via GLUT5", flag: "" },
      { ingredient: "Taurine", spec: "", dose: "1 g", purpose: "Cell Hydration & Endurance", flag: "" },
      { ingredient: "Coconut Water Powder", spec: "", dose: "1 g", purpose: "Natural Electrolyte Source", flag: "" },
      { ingredient: "Pink Himalayan Salt", spec: "", dose: "800 mg", purpose: "Primary Sodium & Fluid Balance", flag: "" },
      { ingredient: "OpunTia®", spec: "(Prickly Pear)", dose: "250 mg", purpose: "Glucose Management", flag: "OpunTia®" },
      { ingredient: "Potassium Citrate", spec: "", dose: "200 mg", purpose: "Electrolyte — 10% NRV", flag: "" },
      { ingredient: "Magnesium Citrate/Glycinate", spec: "", dose: "70 mg", purpose: "ATP & Muscle Function — 19% NRV", flag: "" },
      { ingredient: "Calcium Citrate", spec: "", dose: "70 mg", purpose: "Muscular Contraction — 9% NRV", flag: "" },
    ],
    clinicalMechanisms: [
      { title: "Triple-Source Carb Matrix", subtitle: "Cluster Dextrin® + Palatinose™ + Maltodextrin", image: mechanismGlycogenReplenish, badges: [{ dose: "15 G", name: "Cluster Dextrin®" }, { dose: "10 G", name: "Palatinose™" }], checks: ["Three Absorption Speeds — Immediate, Sustained, Slow-Release", "Zero Bloating via Low Osmolality HBCD"] },
      { title: "Full Electrolyte & Glucose Management", subtitle: "Real-Dose Minerals + OpunTia®", image: mechanismGlycogen, badges: [{ dose: "800 MG", name: "Himalayan Salt" }, { dose: "250 MG", name: "OpunTia®" }], checks: ["Full Mineral Spectrum at Meaningful Doses", "Glucose Disposal Support via Prickly Pear Extract"] },
    ],
    testimonials: [
      { name: "Chris B.", role: "Endurance Athlete", quote: "GLYCOSHIFT is the only intra-workout carb I can use without bloating. I can train hard for 2+ hours and feel fuelled the entire time." },
      { name: "Natalie S.", role: "CrossFit Competitor", quote: "Game changer for long WODs. My energy stays consistent and I don't crash. The electrolyte dose is actually real too." },
      { name: "David L.", role: "Bodybuilder", quote: "I pair GLYCOSHIFT with GLYCO8 for the ultimate carb management stack. Three carb sources, three speeds — nothing else comes close." },
    ],
    relatedSlugs: ["glyco8", "fusion-lite-plus"],
    faqs: [
      { q: "Why three carb sources?", a: "Different speeds and pathways. Fast (Maltodextrin), sustained (Cluster Dextrin®), slow/low-GI (Palatinose™). Consistent energy start to finish." },
      { q: "What is Cluster Dextrin®?", a: "Trademarked HBCD by Glico Nutrition (Japan). High molecular weight, low osmolality — passes through stomach fast with no bloating. Gold standard intra-workout carb." },
      { q: "How does this compare to Strom CarbMAX?", a: "CarbMAX is ~83% Palatinose with trace electrolytes (Calcium 2.96mg vs our 70mg). GLYCOSHIFT™ has three carb sources including Cluster Dextrin, full electrolytes at real doses, plus OpunTia® glucose disposal." },
      { q: "Can I use on non-training days?", a: "Yes — with high-carb meals as a carb management tool, especially paired with GLYCO8™." },
      { q: "Contains allergens?", a: "Contains coconut (tree nut). Made in a facility handling milk, egg, soya, nuts, wheat, gluten." },
    ],
  },

  glyco8: {
    slug: "glyco8",
    name: "GLYCO8™",
    badge: "New",
    tagline: "Fast-Acting Nutrient Partitioning Support",
    subtitle: "Metabolic",
    format: "Capsules (90 caps / 30 servings)",
    price: "£39.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: ["Accelerates Glucose Clearance", "Enhances Carb Partitioning", "Supports Superior Muscle Fullness"],
    images: [glyco8Hero, glyco8Capsules, glyco8Label, glyco8],
    ingredientLogos: [
      { image: glucovantageLogo, name: "GlucoVantage®", forIngredient: "Dihydroberberine (DHB)", caption: "Patented dihydroberberine — 5× more bioavailable than standard berberine." },
    ],
    suggestedUse: "Take 2 capsules with your highest carbohydrate meal of the day. For enhanced results, take an additional 2 capsules with a second high-carb meal. Do not exceed 4 capsules per day.",
    supplementSummary: "Dihydroberberine 400mg · Na-R-Alpha Lipoic Acid 300mg · Cinnamon Bark Extract 300mg · Banaba Extract 330mg · Bitter Melon Extract 300mg · Chromium 300mcg · VanaBerry 2mg",
    whyDifferentHeading: "Why GLYCO8™ is different",
    whyDifferentText: "Advanced glucose control beyond basic GDAs.",
    whyFeatures: [
      { title: "Fast AMPK Activation", desc: "Dihydroberberine · ALA" },
      { title: "GLUT-4 Translocation", desc: "Cinnamon · Banaba" },
      { title: "Glycogen Storage Support", desc: "Chromium · Vanadium" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "AMPK activation and energy metabolism", desc: "Dihydroberberine rapidly activates AMPK, the master metabolic switch, increasing glucose uptake into muscle cells and enhancing insulin sensitivity within minutes." },
      { tagline: "Step 2", title: "Nitric oxide signalling and blood flow", desc: "ALA and Cinnamon work synergistically to boost nitric oxide production, improving nutrient delivery to working muscles and accelerating glucose clearance." },
      { tagline: "Step 3", title: "Metabolite partitioning and recovery", desc: "Banaba and Chromium drive GLUT-4 translocation, directing carbohydrates preferentially into muscle glycogen stores rather than adipose tissue." },
    ],
    ingredients: [
      { title: "Dihydroberberine (DHB)", tagline: "Key ingredient", dosage: "400mg", desc: "A bioavailable form of berberine that activates AMPK 5x more effectively than standard berberine. DHB rapidly improves insulin sensitivity and accelerates glucose disposal into muscle cells.", hasImage: false },
      { title: "Na-R-Alpha Lipoic Acid", dosage: "300mg", desc: "The stabilised, bioavailable form of ALA that acts as both a potent antioxidant and insulin mimetic. Na-R-ALA enhances glucose uptake independently of insulin.", hasImage: false },
      { title: "Cinnamon Bark Extract", dosage: "300mg", desc: "Standardised extract containing bioactive polyphenols that mimic insulin action at the cellular level. Enhances GLUT-4 transporter activity.", hasImage: true },
      { title: "Banaba Leaf Extract", dosage: "330mg", desc: "Containing corosolic acid at 20% standardisation, Banaba activates glucose transport proteins and inhibits adipogenesis.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismAmpkPathway, title: "AMPK Activation", subtitle: "Dihydroberberine · Na-R-ALA", desc: "Dihydroberberine activates AMPK — the master metabolic switch — 5× more effectively than standard berberine.", stats: [{ value: "5×", label: "More bioavailable than berberine" }, { value: "30 min", label: "Time to measurable effect" }] },
      { step: "02", image: mechanismGlut4Pathway, title: "GLUT-4 Translocation", subtitle: "Cinnamon · Banaba Leaf", desc: "Cinnamon polyphenols and Banaba's corosolic acid directly activate GLUT-4 transporter proteins.", stats: [{ value: "2×", label: "Increased GLUT-4 surface expression" }, { value: "20%", label: "Reduction in post-meal glucose" }] },
      { step: "03", image: mechanismGlycogen, title: "Glycogen Partitioning", subtitle: "Chromium · Vanadium", desc: "Chromium and Vanadium ensure glucose is stored as muscle glycogen rather than converted to fat.", stats: [{ value: "40%", label: "More glycogen stored in muscle" }, { value: "↓", label: "De novo lipogenesis reduced" }] },
    ],
    supplementRows: [
      { ingredient: "Dihydroberberine", spec: "(Biopelletized†)", dose: "410 mg", purpose: "Activates AMPK for Rapid Glucose Uptake", flag: "P" },
      { ingredient: "Na-R-Alpha Lipoic Acid", spec: "(BioEnhanced†)", dose: "300 mg", purpose: "Enhanced Fat & Carb Sensitivity", flag: "" },
      { ingredient: "Cinnamon Bark Extract", spec: "", dose: "300 mg", purpose: "Type 2 Agonist", flag: "Cinnulin PF®" },
      { ingredient: "Banaba Extract", spec: "(Corosolic Acid 20%)", dose: "330 mg", purpose: "Direct GLUT-4 Translocation", flag: "" },
      { ingredient: "Bitter Melon Extract", spec: "(Charantin 1%)", dose: "300 mg", purpose: "Insulin Mimetic Action", flag: "" },
      { ingredient: "Chromium", spec: "", dose: "300 mcg", purpose: "Insulin Signalling Cofactor", flag: "" },
      { ingredient: "VanaBerry®", spec: "Vanadium Complex", dose: "2 mg", purpose: "AstraGin® Enhanced Absorption", flag: "" },
    ],
    clinicalMechanisms: [
      { title: "Fast AMPK Activation", subtitle: "Dihydroberberine + advanced glucose GLUTase", image: mechanismAmpk, badges: [{ dose: "400 MG", name: "GlucoVantage®" }, { dose: "200 MG", name: "Bio-Enhanced™" }], checks: ["Activates AMPK for Rapid Glucose Uptake", "Potent Insulin Mimetic — Improves GLUT-4 Translocation"] },
      { title: "GLUT-4 Translocation", subtitle: "Cinnamon · Banaba active cluster activation", image: mechanismGlut4, badges: [{ dose: "1500 MG", name: "Cinnulin®" }, { dose: "1100 MG", name: "Banaba" }], checks: ["Direct GLUT-4 Transport Protein Activation", "Synergistic Insulin-Independent Glucose Partitioning"] },
    ],
    testimonials: [
      { name: "Marcus T.", role: "Bodybuilder", quote: "GLYCO8 completely changed how I handle high-carb refeeds. Muscle fullness is insane and I stay lean." },
      { name: "Sarah K.", role: "Marathon Runner", quote: "I use GLYCO8 before my largest meal. Recovery is noticeably faster and my energy stays stable all day." },
      { name: "James R.", role: "CrossFit Athlete", quote: "Finally a GDA that actually works. I can feel the difference in pump and vascularity within days." },
    ],
    relatedSlugs: ["glycoshift", "vascul8"],
    faqs: [
      { q: "When should I take GLYCO8?", a: "Take 2 capsules 15-30 minutes before your highest carbohydrate meal of the day." },
      { q: "Can I stack GLYCO8 with other supplements?", a: "Yes. GLYCO8 pairs exceptionally well with Fusion Lite+ pre-workout and GLYCOSHIFT intra-workout." },
      { q: "How quickly will I notice results?", a: "Most users report improved muscle fullness within the first 3-5 days." },
      { q: "Is GLYCO8 suitable for diabetics?", a: "GLYCO8 is designed for healthy individuals. Consult your healthcare provider if you have a metabolic condition." },
    ],
  },

  "electro-flow": {
    slug: "electro-flow",
    name: "ELECTRO FLOW",
    tagline: "Hydration & Electrolyte Formula",
    subtitle: "Health",
    format: "210g Powder | 30 Servings | 7g Scoop",
    ingredientLogos: [
      { image: electroprimeLogo, name: "ElectroPrime™", forIngredient: "Cocomineral™" },
      { image: aquaminLogo, name: "Aquamin™", forIngredient: "MAX Catalyst™" },
    ],
    price: "£27.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: [
      "Complete electrolyte profile at clinical doses",
      "Cocomineral™ coconut water mineral concentrate",
      "500mg sodium — what your body actually needs",
      "Great taste at 500ml dilution",
      "Suitable for daily use, intra-workout, or recovery",
    ],
    images: [electroFlow, electroFlow, electroFlow, electroFlow],
    suggestedUse: "Mix 1 scoop (7g) with 500ml cold water. During exercise or throughout the day. Max 2 servings/day. Best served chilled.",
    supplementSummary: "Sodium 500mg · Potassium 200mg · Magnesium 56mg · Calcium 48mg · Coconut Water 500mg · Cocomineral™ 250mg · MAX Catalyst™ TBC",
    whyDifferentHeading: "Why ELECTRO FLOW is different",
    whyDifferentText: "Most electrolyte products are flavoured water with mineral dusting. Electro Flow delivers real doses. Sodium at 500mg — not the 50–100mg token found in hydration tablets. Potassium at 200mg (10% NRV). Magnesium and Calcium in bioavailable citrate forms. Plus Cocomineral™ concentrated coconut water minerals. No direct Strom equivalent. Better value than Conteh Hydra Flow (£29.99) with a more comprehensive formula at £27.99.",
    whyFeatures: [
      { title: "Real Sodium Dose — 500mg", desc: "What your body actually needs, not token amounts" },
      { title: "Cocomineral™ Complex", desc: "Concentrated coconut water minerals for trace depth" },
      { title: "Bioavailable Citrate Forms", desc: "Magnesium & Calcium as citrate — absorbs without food" },
    ],
    howSteps: [
      { tagline: "Step 1 — Replace What You Lose", title: "Full electrolyte replenishment", desc: "Training depletes sodium, potassium, magnesium, calcium through sweat. Electro Flow replaces all four at doses matching actual sweat losses." },
      { tagline: "Step 2 — Enhance with Natural Minerals", title: "Broad-spectrum trace minerals", desc: "Coconut Water Powder (500mg) and Cocomineral™ (250mg) provide broad-spectrum trace minerals beyond targeted electrolyte compounds." },
      { tagline: "Step 3 — Maintain Fluid Balance", title: "Water where your body needs it", desc: "Sodium drives fluid retention. Potassium maintains intracellular balance. Magnesium and Calcium support muscle contraction/relaxation. Together they keep water where your body needs it." },
    ],
    ingredients: [
      { title: "Sodium (from NaCl)", tagline: "Key ingredient", dosage: "500mg", desc: "Most important athletic electrolyte. Meaningful dose vs token amounts in competitors. Drives fluid retention and prevents hyponatraemia during intense training.", hasImage: false },
      { title: "Potassium (from Potassium Citrate)", dosage: "200mg (10% NRV)", desc: "Essential for muscle contraction, nerve transmission, and intracellular fluid balance. Citrate form for optimal absorption.", hasImage: false },
      { title: "Magnesium (from Magnesium Citrate)", dosage: "56mg (15% NRV)", desc: "Involved in 300+ enzymatic reactions. Citrate form provides significantly better bioavailability than magnesium oxide.", hasImage: false },
      { title: "Calcium (from Calcium Citrate)", dosage: "48mg (6% NRV)", desc: "Supports muscle contraction and neuromuscular signalling. Citrate form absorbs without food — unlike carbonate.", hasImage: false },
      { title: "Coconut Water Powder", dosage: "500mg", desc: "Natural potassium and trace mineral source providing electrolytes in ratios that mirror human sweat composition.", hasImage: true },
      { title: "Cocomineral™", dosage: "250mg", desc: "Concentrated coconut water mineral complex for trace mineral depth beyond targeted electrolyte compounds. TM: Coconut Water Processing.", hasImage: false },
      { title: "MAX Catalyst™", dosage: "TBC", desc: "Proprietary absorption amplifier. TM: Protein Partners.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismGlycogenReplenish, title: "Electrolyte Replenishment", subtitle: "Sodium · Potassium · Magnesium · Calcium", desc: "All four major electrolytes at doses matching actual sweat losses — not the token amounts found in hydration tablets.", stats: [{ value: "500mg", label: "Sodium dose" }, { value: "4×", label: "Major electrolytes" }] },
      { step: "02", image: mechanismGlycogen, title: "Trace Mineral Depth", subtitle: "Coconut Water · Cocomineral™", desc: "Natural coconut water minerals provide broad-spectrum trace elements beyond targeted electrolyte compounds.", stats: [{ value: "500mg", label: "Coconut Water Powder" }, { value: "250mg", label: "Cocomineral™" }] },
      { step: "03", image: mechanismAmpkPathway, title: "Fluid Balance", subtitle: "Citrate mineral forms", desc: "Bioavailable citrate forms of magnesium and calcium absorb efficiently without food. Sodium drives retention, potassium maintains intracellular balance.", stats: [{ value: "15%", label: "NRV Magnesium" }, { value: "10%", label: "NRV Potassium" }] },
    ],
    supplementRows: [
      { ingredient: "Sodium", spec: "(from NaCl)", dose: "500 mg", purpose: "Primary Athletic Electrolyte", flag: "" },
      { ingredient: "Potassium", spec: "(from Potassium Citrate)", dose: "200 mg", purpose: "Muscle & Nerve Function — 10% NRV", flag: "" },
      { ingredient: "Magnesium", spec: "(from Magnesium Citrate)", dose: "56 mg", purpose: "Enzymatic & Muscle Function — 15% NRV", flag: "" },
      { ingredient: "Calcium", spec: "(from Calcium Citrate)", dose: "48 mg", purpose: "Contraction Signalling — 6% NRV", flag: "" },
      { ingredient: "Coconut Water Powder", spec: "", dose: "500 mg", purpose: "Natural Trace Mineral Source", flag: "" },
      { ingredient: "Cocomineral™", spec: "", dose: "250 mg", purpose: "Concentrated Mineral Complex", flag: "Cocomineral™" },
      { ingredient: "MAX Catalyst™", spec: "", dose: "TBC", purpose: "Absorption Amplifier", flag: "MAX Catalyst™" },
    ],
    clinicalMechanisms: [
      { title: "Real-Dose Electrolyte System", subtitle: "Sodium 500mg + Full Mineral Spectrum", image: mechanismGlycogenReplenish, badges: [{ dose: "500 MG", name: "Sodium" }, { dose: "200 MG", name: "Potassium" }], checks: ["Meaningful Doses Matching Actual Sweat Losses", "Bioavailable Citrate Mineral Forms"] },
      { title: "Coconut Water Mineral Complex", subtitle: "Cocomineral™ + Coconut Water Powder", image: mechanismGlycogen, badges: [{ dose: "500 MG", name: "Coconut Water" }, { dose: "250 MG", name: "Cocomineral™" }], checks: ["Broad-Spectrum Trace Minerals", "Natural Electrolyte Ratios Mirroring Sweat"] },
    ],
    testimonials: [
      { name: "Mike T.", role: "Marathon Runner", quote: "Electro Flow keeps me hydrated through 20+ mile runs. The sodium dose is actually real — not the token amounts in hydration tablets." },
      { name: "Sophie R.", role: "CrossFit Athlete", quote: "I drink this throughout the day and my training performance has noticeably improved. No more mid-session cramps." },
      { name: "James H.", role: "PT & Coach", quote: "Finally an electrolyte product with real doses. I recommend this to every client — training days and rest days." },
    ],
    relatedSlugs: ["glycoshift", "fusion-lite-plus"],
    faqs: [
      { q: "How much water?", a: "500ml is correct. 750ml = too dilute, 300ml = too concentrated." },
      { q: "Can I use every day?", a: "Yes — recommended. Electrolyte balance affects energy, cognition, and sleep." },
      { q: "Is this just a sports drink?", a: "No. Commercial sports drinks are primarily sugar with minimal electrolytes. This has no sugar and real electrolyte doses." },
      { q: "Contains allergens?", a: "Yes — coconut (tree nut). Made in facility handling milk, egg, soya, nuts, wheat, gluten." },
      { q: "Best flavour?", a: "Pineapple and Orange Citrus both 9/10 in testing. Vimto 7/10." },
    ],
  },

  "purest-creatine": {
    slug: "purest-creatine",
    name: "Pürest Creatine™",
    badge: "Best Seller",
    tagline: "Pure NNB Creatine Monohydrate",
    subtitle: "Performance",
    format: "Powder (300g / 500g)",
    price: "£23.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: ["99.9% Pure NNB Creatine Monohydrate", "Increased Strength & Power Output", "Enhanced Muscle Recovery"],
    images: [purestCreatine, purestCreatine, purestCreatine, purestCreatine],
    suggestedUse: "Mix 1 scoop (5g) with water or your favourite beverage daily. Can be taken at any time. For loading phase, take 4 scoops (20g) daily for 5-7 days, then maintain with 1 scoop.",
    supplementSummary: "NNB Creatine Monohydrate 5g per serving. 300g (60 servings) or 500g (100 servings).",
    whyDifferentHeading: "Why Pürest Creatine™ is different",
    whyDifferentText: "The purest creatine monohydrate available — sourced from NNB Nutrition for unmatched quality and purity.",
    whyFeatures: [
      { title: "99.9% Purity", desc: "NNB-sourced creatine monohydrate" },
      { title: "No Fillers", desc: "Single ingredient — nothing else added" },
      { title: "Two Size Options", desc: "300g (£23.99) or 500g (£34.99)" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "Creatine phosphate loading", desc: "Daily supplementation saturates intramuscular creatine phosphate stores over 2-4 weeks, increasing the readily available fuel for high-intensity muscular contractions." },
      { tagline: "Step 2", title: "ATP regeneration", desc: "Elevated creatine phosphate levels accelerate ATP resynthesis during intense exercise, enabling more reps, heavier loads, and greater training volume." },
      { tagline: "Step 3", title: "Recovery & adaptation", desc: "Enhanced ATP availability supports faster recovery between sets and sessions, while increased training capacity drives superior long-term strength and muscle gains." },
    ],
    ingredients: [
      { title: "NNB Creatine Monohydrate", tagline: "Single ingredient", dosage: "5g", desc: "99.9% pure creatine monohydrate sourced from NNB Nutrition. The most researched sports supplement in history, with over 500 peer-reviewed studies confirming its efficacy for strength, power, and muscle development.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismAtpEnergy, title: "ATP Regeneration", subtitle: "Creatine Phosphate System", desc: "Creatine monohydrate saturates intramuscular creatine phosphate stores, accelerating ATP resynthesis during high-intensity exercise.", stats: [{ value: "5g", label: "Clinical daily dose" }, { value: "500+", label: "Peer-reviewed studies" }] },
    ],
    supplementRows: [
      { ingredient: "NNB Creatine Monohydrate", spec: "(99.9% Pure)", dose: "5 g", purpose: "ATP Regeneration & Strength", flag: "NNB Nutrition" },
    ],
    clinicalMechanisms: [
      { title: "Creatine Phosphate System", subtitle: "NNB 99.9% pure creatine monohydrate", image: mechanismAtpEnergy, badges: [{ dose: "5 G", name: "NNB Creatine" }], checks: ["Accelerated ATP Resynthesis", "Enhanced Strength & Power Output"] },
    ],
    testimonials: [
      { name: "Dan K.", role: "Powerlifter", quote: "Finally a creatine I trust. No bloating, mixes perfectly, and the NNB purity is unmatched." },
      { name: "Rachel W.", role: "Strength Coach", quote: "I recommend Pürest Creatine to all my clients. Single ingredient, no nonsense, just results." },
    ],
    relatedSlugs: ["fusion-lite-plus", "vascul8"],
    ingredientLogos: [
      { image: purestCreatineLogo, name: "Pürest Creatine™", caption: "Pürest Creatine™ — ultra-purity creatine monohydrate, verified by third-party testing.", forIngredient: "NNB Creatine Monohydrate" },
    ],
    faqs: [
      { q: "What sizes are available?", a: "300g (60 servings, £23.99) and 500g (100 servings, £34.99)." },
      { q: "Do I need a loading phase?", a: "Optional. You can load with 20g/day for 5-7 days for faster saturation, or simply take 5g daily and reach full saturation in 2-4 weeks." },
      { q: "When should I take it?", a: "Creatine timing is flexible — take it at any time of day with water or your favourite beverage." },
      { q: "Is it safe long-term?", a: "Yes. Creatine monohydrate is the most researched supplement in history with an excellent long-term safety profile." },
    ],
  },

  "h2o-go": {
    slug: "h2o-go",
    name: "H2O GO",
    comingSoon: true,
    tagline: "Water Balance & Electrolyte Support",
    subtitle: "Health",
    format: "Capsules (90 caps / 30 servings)",
    price: "TBC",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: ["Optimised Cellular Hydration", "Water Balance Support", "Electrolyte & Mineral Replenishment"],
    images: [h2oGo, h2oGo, h2oGo, h2oGo],
    suggestedUse: "Take 3 capsules daily with water, preferably with meals. For enhanced hydration support during training, take 3 capsules 30 minutes before exercise.",
    supplementSummary: "Comprehensive water balance and electrolyte support formula. Full ingredient panel coming soon.",
    whyDifferentHeading: "Why H2O GO is different",
    whyDifferentText: "A capsule-based hydration optimiser that supports water balance at the cellular level — not just another electrolyte tablet.",
    whyFeatures: [
      { title: "Cellular Hydration", desc: "Supports water balance at the cellular level" },
      { title: "Convenient Capsule Format", desc: "No mixing, no mess — just take and go" },
      { title: "Comprehensive Formula", desc: "Electrolytes + water balance minerals" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "Cellular water balance", desc: "Key minerals and compounds support optimal water distribution between intracellular and extracellular compartments, ensuring cells are properly hydrated." },
      { tagline: "Step 2", title: "Electrolyte equilibrium", desc: "A balanced electrolyte profile maintains nerve impulse transmission, muscular contraction, and fluid balance during and after exercise." },
      { tagline: "Step 3", title: "Performance hydration", desc: "Proper cellular hydration supports endurance, reduces fatigue, and maintains cognitive function during demanding physical activity." },
    ],
    ingredients: [
      { title: "Water Balance Complex", tagline: "Key ingredient", dosage: "Clinical dose", desc: "A comprehensive blend of electrolytes and water-balance minerals designed to optimise cellular hydration. Full ingredient breakdown coming soon.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismGlycogenReplenish, title: "Cellular Hydration", subtitle: "Water Balance Complex", desc: "Supports optimal water distribution between intracellular and extracellular compartments for proper cellular hydration.", stats: [{ value: "90", label: "Capsules per tub" }, { value: "30", label: "Servings" }] },
    ],
    supplementRows: [
      { ingredient: "Full formula", spec: "", dose: "TBC", purpose: "Water Balance & Electrolyte Support", flag: "" },
    ],
    clinicalMechanisms: [
      { title: "Cellular Hydration System", subtitle: "Capsule-based water balance support", image: mechanismGlycogenReplenish, badges: [{ dose: "TBC", name: "Hydration Complex" }], checks: ["Optimised Cellular Water Balance", "Convenient Capsule Format"] },
    ],
    testimonials: [
      { name: "Amy L.", role: "Fitness Enthusiast", quote: "H2O GO is so convenient — I just pop the capsules before training and I stay properly hydrated throughout." },
    ],
    relatedSlugs: ["electro-flow", "glycoshift"],
    faqs: [
      { q: "How is H2O GO different from Electro Flow?", a: "H2O GO is a capsule-based formula focused on cellular water balance, while Electro Flow is a powder-based electrolyte drink for during/after exercise. They complement each other perfectly." },
      { q: "When will pricing be confirmed?", a: "Pricing is being finalised and will be announced soon." },
      { q: "Can I take it every day?", a: "Yes. H2O GO is designed for daily use to maintain optimal hydration levels." },
    ],
  },
};

export const getProduct = (slug: string): ProductData | undefined => products[slug];
export const getRelatedProducts = (slugs: string[]) => slugs.map(s => products[s]).filter(Boolean);
