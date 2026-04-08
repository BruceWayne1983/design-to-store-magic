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
}

export const products: Record<string, ProductData> = {
  "fusion-lite-plus": {
    slug: "fusion-lite-plus",
    name: "Fusion Lite+",
    tagline: "Clinically Dosed Focus & Energy",
    subtitle: "Performance",
    format: "Powder (150g / 30 servings)",
    price: "£31.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: ["Clinically Dosed Focus & Energy", "Smooth Energy Without Crash", "Enhanced Mind-Muscle Connection"],
    images: [fusionLitePlusHero, fusionLitePlus, fusionLitePlusHero, fusionLitePlus],
    suggestedUse: "Mix 1 scoop (5g) with 200-300ml cold water and consume 20-30 minutes before training. Assess tolerance with ½ scoop on first use. Do not exceed 1 scoop per day.",
    supplementSummary: "Clinically dosed focus and energy pre-workout formula. Full ingredient panel coming soon.",
    whyDifferentHeading: "Why Fusion Lite+ is different",
    whyDifferentText: "A lighter, clinically dosed pre-workout built for clean focus and sustained energy — without over-stimulation.",
    whyFeatures: [
      { title: "Clinical Doses", desc: "Every ingredient at research-backed levels" },
      { title: "Clean Energy", desc: "Smooth focus without jitters or crash" },
      { title: "Versatile Formula", desc: "Stack with VASCUL8 for pumps" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "Neurotransmitter priming & focus", desc: "Targeted nootropics elevate acetylcholine and dopamine for razor-sharp focus and mind-muscle connection within 15 minutes of consumption." },
      { tagline: "Step 2", title: "Clean energy activation", desc: "Precisely dosed stimulants provide smooth, sustained energy without the jitters or crash associated with over-stimulated pre-workouts." },
      { tagline: "Step 3", title: "Performance enhancement", desc: "Clinically dosed ergogenic aids support strength output, endurance, and training intensity throughout your entire session." },
    ],
    ingredients: [
      { title: "Focus & Energy Matrix", tagline: "Key ingredient", dosage: "Clinical dose", desc: "A precisely formulated blend of nootropics and clean stimulants designed to deliver sharp focus and sustained energy without over-stimulation. Full ingredient breakdown coming soon.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismAtpEnergy, title: "Clean Energy Production", subtitle: "Clinically Dosed Stimulants", desc: "Precisely dosed stimulant matrix delivers smooth, sustained energy without the jitters or crash.", stats: [{ value: "150g", label: "Per tub" }, { value: "30", label: "Servings" }] },
    ],
    supplementRows: [
      { ingredient: "Full formula", spec: "", dose: "TBC", purpose: "Focus & Energy Pre-Workout", flag: "" },
    ],
    clinicalMechanisms: [
      { title: "Clean Energy & Focus", subtitle: "Clinically dosed pre-workout formula", image: mechanismAtpEnergy, badges: [{ dose: "TBC", name: "Focus Matrix" }], checks: ["Smooth Energy Without Over-Stimulation", "Enhanced Mind-Muscle Connection"] },
    ],
    testimonials: [
      { name: "Jake M.", role: "Gym Enthusiast", quote: "Fusion Lite+ gives me the perfect level of energy and focus without feeling wired. Love it for morning sessions." },
      { name: "Lauren H.", role: "Personal Trainer", quote: "Finally a pre-workout I can recommend to clients who are sensitive to heavy stimulants. Clean energy, great focus." },
    ],
    relatedSlugs: ["vascul8", "glyco8"],
    faqs: [
      { q: "How does Fusion Lite+ compare to heavier pre-workouts?", a: "Fusion Lite+ is designed for clean, focused energy without the over-stimulation of high-stim formulas. Perfect for those who want performance without the jitters." },
      { q: "Can I stack it with VASCUL8?", a: "Absolutely. Fusion Lite+ for energy and focus + VASCUL8 for pumps is an excellent combination." },
      { q: "When should I take it?", a: "20-30 minutes before training for optimal effect." },
    ],
  },

  vascul8: {
    slug: "vascul8",
    name: "VASCUL8™",
    tagline: "Stimulant-Free Pump Formula",
    subtitle: "Performance",
    format: "Powder (360g / 30 servings)",
    price: "£39.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: ["Extreme Vasodilation & Pumps", "Enhanced Nutrient Delivery", "Stim-Free — Stack with Any Pre"],
    images: [vascul8Hero, vascul8, vascul8Hero, vascul8],
    suggestedUse: "Take 1 scoop 30 minutes before training with 300ml water. For enhanced pumps, combine with Fusion Lite+. Can be taken on non-training days for cardiovascular support.",
    supplementSummary: "L-Citrulline 3000mg · Nitrosigine® 1500mg · S7™ 50mg · Pine Bark Extract 300mg · Grape Seed Extract 300mg · VasoDrive-AP® 254mg",
    whyDifferentHeading: "Why VASCUL8™ is different",
    whyDifferentText: "Multi-pathway nitric oxide system — not just another citrulline capsule.",
    whyFeatures: [
      { title: "Triple NO Pathway", desc: "Citrulline · Nitrosigine® · S7™" },
      { title: "Endothelial Protection", desc: "Pine Bark · Grape Seed antioxidants" },
      { title: "Stim-Free Formula", desc: "Stack freely with any pre-workout" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "eNOS enzyme activation", desc: "Nitrosigine® and S7™ directly stimulate endothelial nitric oxide synthase (eNOS), the enzyme responsible for NO production in blood vessel walls, increasing circulating NO levels within 15 minutes." },
      { tagline: "Step 2", title: "Sustained vasodilation cascade", desc: "L-Citrulline provides the arginine substrate for continuous NO synthesis while Pine Bark Extract inhibits NO breakdown, creating a sustained vasodilation effect that lasts 4-6 hours." },
      { tagline: "Step 3", title: "Vascular protection & recovery", desc: "Grape Seed Extract and VasoDrive-AP® protect endothelial cells from oxidative damage while supporting healthy blood pressure response during intense training." },
    ],
    ingredients: [
      { title: "Nitrosigine®", tagline: "Key ingredient", dosage: "1500mg", desc: "A patented complex of bonded arginine silicate clinically shown to increase NO levels within 30 minutes and sustain them for up to 6 hours. Unlike standard L-Arginine, Nitrosigine® is not degraded by arginase in the gut.", hasImage: false },
      { title: "L-Citrulline", dosage: "3000mg", desc: "Converts to L-Arginine in the kidneys, providing the essential substrate for nitric oxide synthase. Combined with Nitrosigine®, this dual-source approach ensures both rapid onset and sustained NO production.", hasImage: false },
      { title: "S7™", dosage: "50mg", desc: "A blend of seven plant-based ingredients clinically shown to increase nitric oxide levels by 230%. S7™ works by stimulating your body's own NO production rather than providing external precursors.", hasImage: true },
      { title: "Pine Bark Extract", dosage: "300mg", desc: "Rich in oligomeric proanthocyanidins (OPCs), Pine Bark Extract enhances NO bioavailability by inhibiting the enzymes that break down nitric oxide.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismNitricOxide, title: "eNOS Activation", subtitle: "Nitrosigine® · S7™", desc: "Nitrosigine® directly stimulates endothelial nitric oxide synthase while S7™ boosts your body's own NO production by 230%.", stats: [{ value: "230%", label: "Increase in NO production" }, { value: "15 min", label: "Time to onset" }] },
      { step: "02", image: mechanismGlut4Pathway, title: "Sustained Vasodilation", subtitle: "L-Citrulline · Pine Bark", desc: "L-Citrulline provides continuous arginine substrate while Pine Bark's OPCs inhibit NO degradation enzymes.", stats: [{ value: "6 hrs", label: "Duration of effect" }, { value: "3g", label: "Clinical citrulline dose" }] },
      { step: "03", image: mechanismAmpkPathway, title: "Vascular Protection", subtitle: "Grape Seed · VasoDrive-AP®", desc: "Grape Seed Extract neutralises free radicals in blood vessel walls while VasoDrive-AP® supports healthy ACE inhibition.", stats: [{ value: "95%", label: "OPC standardisation" }, { value: "↓", label: "Oxidative vascular damage" }] },
    ],
    supplementRows: [
      { ingredient: "L-Citrulline", spec: "(Pure)", dose: "3,000 mg", purpose: "NO Substrate & Vasodilation", flag: "" },
      { ingredient: "Nitrosigine®", spec: "(Arginine Silicate)", dose: "1,500 mg", purpose: "Direct eNOS Activation", flag: "Nitrosigine®" },
      { ingredient: "Pine Bark Extract", spec: "(95% OPC)", dose: "300 mg", purpose: "NO Bioavailability Extension", flag: "" },
      { ingredient: "Grape Seed Extract", spec: "(95% Polyphenols)", dose: "300 mg", purpose: "Antioxidant & Vascular Protection", flag: "" },
      { ingredient: "VasoDrive-AP®", spec: "(Casein Hydrolysate)", dose: "254 mg", purpose: "ACE Inhibition & Blood Pressure", flag: "VasoDrive-AP®" },
      { ingredient: "S7™", spec: "(Plant Blend)", dose: "50 mg", purpose: "Endogenous NO Amplification", flag: "S7™" },
    ],
    clinicalMechanisms: [
      { title: "Triple NO Pathway", subtitle: "Nitrosigine® + L-Citrulline + S7™", image: mechanismNitricOxide, badges: [{ dose: "1,500 MG", name: "Nitrosigine®" }, { dose: "3,000 MG", name: "L-Citrulline" }], checks: ["230% Increase in Nitric Oxide Production", "Sustained 6-Hour Vasodilation Effect"] },
      { title: "Vascular Protection Matrix", subtitle: "Pine Bark + Grape Seed + VasoDrive-AP®", image: mechanismGlut4Pathway, badges: [{ dose: "300 MG", name: "Pine Bark" }, { dose: "254 MG", name: "VasoDrive-AP®" }], checks: ["95% OPC Antioxidant Protection", "Healthy Blood Pressure Support During Training"] },
    ],
    testimonials: [
      { name: "Ryan C.", role: "Classic Physique", quote: "VASCUL8 gives me pumps that last for hours after training. The vascularity is insane." },
      { name: "Emma D.", role: "Fitness Model", quote: "I stack this with Fusion Lite+ and the pumps are absolutely unreal. Best combo I've ever used." },
      { name: "Alex P.", role: "Natural Bodybuilder", quote: "Stim-free pump product that actually delivers. I take it on rest days too for the cardiovascular benefits." },
    ],
    relatedSlugs: ["fusion-lite-plus", "glyco8"],
    faqs: [
      { q: "Can I stack VASCUL8 with a pre-workout?", a: "Yes! VASCUL8 is completely stimulant-free and designed to stack with any pre-workout, especially Fusion Lite+." },
      { q: "How long do the pumps last?", a: "Clinical studies show Nitrosigine® sustains elevated NO levels for up to 6 hours after ingestion." },
      { q: "Can I take it on non-training days?", a: "Yes. VASCUL8 provides cardiovascular and blood flow benefits that support recovery on rest days." },
      { q: "Is it vegan-friendly?", a: "Yes. All ingredients are plant-derived and the capsules are vegetable-based." },
    ],
  },

  glycoshift: {
    slug: "glycoshift",
    name: "GLYCOSHIFT™",
    tagline: "Intra-Workout Fuel & GDA",
    subtitle: "Metabolic",
    format: "Powder (1.5kg / 33 servings)",
    price: "£39.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: ["Rapid Glycogen Replenishment", "Zero Bloating Carb Source", "Sustained Intra-Workout Energy"],
    images: [glycoshiftHero, glycoshift, glycoshiftHero, glycoshift],
    suggestedUse: "Mix 1 scoop (45g) with 500-700ml water and sip throughout your training session. For prolonged sessions (90+ minutes), use 1.5 scoops. Can also be used post-workout for rapid glycogen replenishment.",
    supplementSummary: "Cluster Dextrin® 25g · Palatinose™ 5g · Coconut Water Powder 2g · Pink Himalayan Salt 500mg · Magnesium Bisglycinate 200mg",
    whyDifferentHeading: "Why GLYCOSHIFT™ is different",
    whyDifferentText: "Engineered carbohydrate matrix with GDA properties — not sugar water.",
    whyFeatures: [
      { title: "Rapid Gastric Emptying", desc: "Cluster Dextrin® — zero bloating" },
      { title: "Sustained Energy Release", desc: "Palatinose™ low-GI fuel" },
      { title: "Complete Electrolyte Matrix", desc: "Coconut Water · Magnesium · Sodium" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "Ultra-fast gastric emptying", desc: "Cluster Dextrin® (HBCD) has the fastest gastric emptying rate of any carbohydrate source. Its unique cyclic molecular structure passes through the stomach rapidly, delivering glucose to working muscles without bloating." },
      { tagline: "Step 2", title: "Sustained glycogen delivery", desc: "Palatinose™ provides a low-GI carbohydrate source that releases glucose steadily over 2-3 hours, preventing energy spikes and crashes while maintaining consistent fuel availability." },
      { tagline: "Step 3", title: "Electrolyte balance & hydration", desc: "Coconut Water Powder, Pink Himalayan Salt, and Magnesium Bisglycinate replace the key electrolytes lost through sweat, maintaining muscular contraction quality." },
    ],
    ingredients: [
      { title: "Cluster Dextrin® (HBCD)", tagline: "Key ingredient", dosage: "25g", desc: "Highly Branched Cyclic Dextrin is the most advanced carbohydrate source available. Its unique cyclic molecular structure provides rapid gastric emptying with sustained energy release and zero osmotic pressure — meaning zero bloating.", hasImage: false },
      { title: "Palatinose™ (Isomaltulose)", dosage: "5g", desc: "A naturally-sourced, low-GI disaccharide that provides sustained energy release over 2-3 hours. Promotes fat oxidation alongside glucose utilisation.", hasImage: false },
      { title: "Coconut Water Powder", dosage: "2g", desc: "Nature's electrolyte solution, standardised for potassium content. Provides natural potassium, sodium, and magnesium in ratios that mirror human sweat composition.", hasImage: true },
      { title: "Magnesium Bisglycinate", dosage: "200mg", desc: "The most bioavailable form of magnesium, chelated with glycine for enhanced absorption. Supports ATP production, muscular contraction, and nervous system function.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismGlycogenReplenish, title: "Rapid Gastric Clearance", subtitle: "Cluster Dextrin® HBCD", desc: "Cluster Dextrin's cyclic molecular structure creates near-zero osmotic pressure in the stomach, enabling the fastest gastric emptying of any carbohydrate source.", stats: [{ value: "2×", label: "Faster gastric emptying vs maltodextrin" }, { value: "0", label: "GI distress or bloating" }] },
      { step: "02", image: mechanismGlycogen, title: "Sustained Glycogen Delivery", subtitle: "Palatinose™ · Cluster Dextrin®", desc: "The dual-carb matrix provides both immediate and sustained glucose availability.", stats: [{ value: "3 hrs", label: "Sustained energy release" }, { value: "30g", label: "Total carbohydrate per serve" }] },
      { step: "03", image: mechanismAmpkPathway, title: "Electrolyte Homeostasis", subtitle: "Coconut Water · Mg · Na", desc: "The electrolyte matrix replaces sodium, potassium, and magnesium lost through sweat.", stats: [{ value: "500mg", label: "Sodium per serve" }, { value: "200mg", label: "Chelated magnesium" }] },
    ],
    supplementRows: [
      { ingredient: "Cluster Dextrin®", spec: "(HBCD)", dose: "25 g", purpose: "Rapid Gastric Emptying Carbohydrate", flag: "Cluster Dextrin®" },
      { ingredient: "Palatinose™", spec: "(Isomaltulose)", dose: "5 g", purpose: "Low-GI Sustained Energy", flag: "Palatinose™" },
      { ingredient: "Coconut Water Powder", spec: "", dose: "2 g", purpose: "Natural Electrolyte Source", flag: "" },
      { ingredient: "Pink Himalayan Salt", spec: "", dose: "500 mg", purpose: "Sodium & Trace Minerals", flag: "" },
      { ingredient: "Magnesium Bisglycinate", spec: "(Chelated)", dose: "200 mg", purpose: "ATP Production & Muscle Function", flag: "" },
      { ingredient: "Vitamin B6", spec: "(P-5-P)", dose: "10 mg", purpose: "Glycogen Metabolism Cofactor", flag: "" },
    ],
    clinicalMechanisms: [
      { title: "Zero-Bloat Carb Delivery", subtitle: "Cluster Dextrin® HBCD technology", image: mechanismGlycogenReplenish, badges: [{ dose: "25 G", name: "Cluster Dextrin®" }, { dose: "5 G", name: "Palatinose™" }], checks: ["Fastest Gastric Emptying of Any Carb Source", "Zero Osmotic Pressure — No Bloating"] },
      { title: "Complete Electrolyte Matrix", subtitle: "Coconut Water + Magnesium + Sodium", image: mechanismGlycogen, badges: [{ dose: "2 G", name: "Coconut Water" }, { dose: "200 MG", name: "Mg Bisglycinate" }], checks: ["Mirrors Human Sweat Electrolyte Ratios", "Chelated Magnesium for Maximum Absorption"] },
    ],
    testimonials: [
      { name: "Chris B.", role: "Endurance Athlete", quote: "GLYCOSHIFT is the only intra-workout carb I can use without bloating. I can train hard for 2+ hours and feel fuelled the entire time." },
      { name: "Natalie S.", role: "CrossFit Competitor", quote: "Game changer for long WODs. My energy stays consistent and I don't crash." },
      { name: "David L.", role: "Bodybuilder", quote: "I pair GLYCOSHIFT with GLYCO8 for the ultimate carb management stack. Glycogen loading without the spill-over." },
    ],
    relatedSlugs: ["glyco8", "fusion-lite-plus"],
    faqs: [
      { q: "When should I drink GLYCOSHIFT?", a: "Sip throughout your training session. Begin drinking 10-15 minutes into your workout." },
      { q: "Can I use it post-workout?", a: "Yes. GLYCOSHIFT is excellent for rapid post-workout glycogen replenishment." },
      { q: "Will it cause bloating?", a: "No. Cluster Dextrin® has near-zero osmotic pressure, meaning it passes through the stomach rapidly." },
      { q: "Can I stack it with GLYCO8?", a: "Absolutely. GLYCO8 + GLYCOSHIFT is the ultimate carbohydrate management stack." },
    ],
  },

  glyco8: {
    slug: "glyco8",
    name: "GLYCO8™",
    tagline: "Fast-Acting Nutrient Partitioning Support",
    subtitle: "Metabolic",
    format: "Capsules (90 caps / 30 servings)",
    price: "£39.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: ["Accelerates Glucose Clearance", "Enhances Carb Partitioning", "Supports Superior Muscle Fullness"],
    images: [glyco8Hero, glyco8Capsules, glyco8Label, glyco8],
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
    name: "Electro Flow",
    tagline: "Advanced Electrolyte Support",
    subtitle: "Health",
    format: "Powder (210g / 30 servings)",
    price: "£27.99",
    prices: { "1": "TBC", "4": "TBC", "6": "TBC" },
    savings: { "1": "TBC", "4": "TBC", "6": "TBC" },
    benefits: ["Complete Electrolyte Replenishment", "Enhanced Hydration & Performance", "Zero Sugar, Zero Calories"],
    images: [electroFlowHero, electroFlow, electroFlowHero, electroFlow],
    suggestedUse: "Mix 1 scoop (7g) with 300-500ml cold water. Consume during or after exercise, or throughout the day for optimal hydration support.",
    supplementSummary: "Full electrolyte panel with sodium, potassium, magnesium, and trace minerals. Complete formula details coming soon.",
    whyDifferentHeading: "Why Electro Flow is different",
    whyDifferentText: "A complete electrolyte formula designed for serious hydration — not a sugar-laden sports drink.",
    whyFeatures: [
      { title: "Full Electrolyte Spectrum", desc: "Sodium · Potassium · Magnesium · Trace minerals" },
      { title: "Zero Sugar Formula", desc: "No added sugars or artificial sweeteners" },
      { title: "Rapid Absorption", desc: "Optimised ratios for fast rehydration" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "Rapid electrolyte replenishment", desc: "Optimised sodium and potassium ratios facilitate rapid fluid absorption through the intestinal wall, restoring hydration faster than water alone." },
      { tagline: "Step 2", title: "Sustained mineral balance", desc: "Chelated magnesium and trace minerals maintain cellular hydration and support muscular contraction quality throughout extended activity." },
      { tagline: "Step 3", title: "Performance maintenance", desc: "By maintaining optimal electrolyte balance, Electro Flow helps prevent cramping, fatigue, and performance decline during intense or prolonged exercise." },
    ],
    ingredients: [
      { title: "Electrolyte Complex", tagline: "Key ingredient", dosage: "Clinical dose", desc: "A comprehensive electrolyte blend featuring sodium, potassium, magnesium, and trace minerals in optimised ratios designed for rapid rehydration and sustained performance.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismGlycogenReplenish, title: "Rapid Rehydration", subtitle: "Optimised Electrolyte Ratios", desc: "Sodium and potassium in precise ratios drive fluid absorption through the intestinal wall.", stats: [{ value: "210g", label: "Per tub" }, { value: "30", label: "Servings" }] },
    ],
    supplementRows: [
      { ingredient: "Full formula", spec: "", dose: "TBC", purpose: "Advanced Electrolyte Support", flag: "" },
    ],
    clinicalMechanisms: [
      { title: "Complete Hydration System", subtitle: "Full-spectrum electrolyte replenishment", image: mechanismGlycogenReplenish, badges: [{ dose: "TBC", name: "Electrolyte Matrix" }], checks: ["Rapid Fluid Absorption", "Sustained Mineral Balance"] },
    ],
    testimonials: [
      { name: "Mike T.", role: "Marathon Runner", quote: "Electro Flow keeps me hydrated through 20+ mile runs without the sugar crash of other electrolyte drinks." },
      { name: "Sophie R.", role: "CrossFit Athlete", quote: "I drink this throughout the day and my training performance has noticeably improved. No more mid-session cramps." },
    ],
    relatedSlugs: ["glycoshift", "h2o-go"],
    faqs: [
      { q: "When should I take Electro Flow?", a: "During or after exercise, or sip throughout the day for optimal hydration." },
      { q: "Is it sugar-free?", a: "Yes. Electro Flow contains zero sugar and zero calories." },
      { q: "Can I stack it with other Baseline products?", a: "Absolutely. It pairs well with GLYCOSHIFT for intra-workout use or H2O GO for comprehensive hydration support." },
    ],
  },

  "purest-creatine": {
    slug: "purest-creatine",
    name: "Pürest Creatine™",
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
    whyDifferentText: "A capsule-based hydration optimizer that supports water balance at the cellular level — not just another electrolyte tablet.",
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
