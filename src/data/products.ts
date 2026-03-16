// Product images
import glyco8Hero from "@/assets/glyco8-hero.png";
import glyco8Capsules from "@/assets/glyco8-capsules.png";
import glyco8Label from "@/assets/glyco8-label.png";
import glyco8 from "@/assets/glyco8.png";
import fusionBlackHero from "@/assets/fusion-black-hero.png";
import fusionBlack from "@/assets/fusion-black.png";
import vascul8Hero from "@/assets/vascul8-hero.png";
import vascul8 from "@/assets/vascul8.png";
import glycoshiftHero from "@/assets/glycoshift-hero.png";
import glycoshift from "@/assets/glycoshift.png";

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
  glyco8: {
    slug: "glyco8",
    name: "GLYCO8™",
    tagline: "Advanced Fast-Acting Glucose Disposal Agent",
    subtitle: "Metabolic",
    price: "£39.99",
    prices: { "1": "£35.99", "4": "£33.99", "6": "£31.99" },
    savings: { "1": "10%", "4": "15%", "6": "20%" },
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
      { tagline: "Step 2", title: "Nitric oxide signalling and blood flow", desc: "ALA and Cinnamon work synergistically to boost nitric oxide production, improving nutrient delivery to working muscles and accelerating glucose clearance from the bloodstream." },
      { tagline: "Step 3", title: "Metabolite partitioning and recovery", desc: "Banaba and Chromium drive GLUT-4 translocation, directing carbohydrates preferentially into muscle glycogen stores rather than adipose tissue, supporting faster recovery." },
    ],
    ingredients: [
      { title: "Dihydroberberine (DHB)", tagline: "Key ingredient", dosage: "400mg", desc: "A bioavailable form of berberine that activates AMPK 5x more effectively than standard berberine. DHB rapidly improves insulin sensitivity, accelerates glucose disposal into muscle cells, and supports healthy blood sugar levels post-meal.", hasImage: false },
      { title: "Na-R-Alpha Lipoic Acid", dosage: "300mg", desc: "The stabilised, bioavailable form of ALA that acts as both a potent antioxidant and insulin mimetic. Na-R-ALA enhances glucose uptake independently of insulin and protects against oxidative stress.", hasImage: false },
      { title: "Cinnamon Bark Extract", dosage: "300mg", desc: "Standardised extract containing bioactive polyphenols that mimic insulin action at the cellular level. Enhances GLUT-4 transporter activity and improves glycogen synthesis in skeletal muscle.", hasImage: true },
      { title: "Banaba Leaf Extract", dosage: "330mg", desc: "Containing corosolic acid at 20% standardisation, Banaba activates glucose transport proteins and inhibits adipogenesis. Works synergistically with berberine to maximise insulin-independent glucose uptake.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismAmpkPathway, title: "AMPK Activation", subtitle: "Dihydroberberine · Na-R-ALA", desc: "Dihydroberberine activates AMPK — the master metabolic switch — 5× more effectively than standard berberine.", stats: [{ value: "5×", label: "More bioavailable than berberine" }, { value: "30 min", label: "Time to measurable effect" }] },
      { step: "02", image: mechanismGlut4Pathway, title: "GLUT-4 Translocation", subtitle: "Cinnamon · Banaba Leaf", desc: "Cinnamon polyphenols and Banaba's corosolic acid directly activate GLUT-4 transporter proteins, moving them to the cell membrane surface.", stats: [{ value: "2×", label: "Increased GLUT-4 surface expression" }, { value: "20%", label: "Reduction in post-meal glucose" }] },
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
      { title: "Fast AMPK Activation", subtitle: "Dihydroberberine + VOR advanced glucose GLUTase", image: mechanismAmpk, badges: [{ dose: "400 MG", name: "GlucoVantage®" }, { dose: "200 MG", name: "Bio-Enhanced™" }], checks: ["Activates AMPK for Rapid Glucose Uptake", "Potent Insulin Mimetic — Improves GLUT-4 Translocation"] },
      { title: "GLUT-4 Translocation", subtitle: "Cinnamon · Banaba active cluster activation", image: mechanismGlut4, badges: [{ dose: "1500 MG", name: "Cinnulin®" }, { dose: "1100 MG", name: "Banaba" }], checks: ["Direct GLUT-4 Transport Protein Activation", "Synergistic Insulin-Independent Glucose Partitioning"] },
    ],
    testimonials: [
      { name: "Marcus T.", role: "Bodybuilder", quote: "GLYCO8 completely changed how I handle high-carb refeeds. Muscle fullness is insane and I stay lean." },
      { name: "Sarah K.", role: "Marathon Runner", quote: "I use GLYCO8 before my largest meal. Recovery is noticeably faster and my energy stays stable all day." },
      { name: "James R.", role: "CrossFit Athlete", quote: "Finally a GDA that actually works. I can feel the difference in pump and vascularity within days." },
    ],
    relatedSlugs: ["fusion-black", "vascul8"],
    faqs: [
      { q: "When should I take GLYCO8?", a: "Take 2 capsules 15-30 minutes before your highest carbohydrate meal of the day." },
      { q: "Can I stack GLYCO8 with other supplements?", a: "Yes. GLYCO8 pairs exceptionally well with FUSION BLACK pre-workout and GLYCOSHIFT intra-workout." },
      { q: "How quickly will I notice results?", a: "Most users report improved muscle fullness within the first 3-5 days." },
      { q: "Is GLYCO8 suitable for diabetics?", a: "GLYCO8 is designed for healthy individuals. Consult your healthcare provider if you have a metabolic condition." },
      { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee." },
    ],
  },

  "fusion-black": {
    slug: "fusion-black",
    name: "FUSION BLACK™",
    tagline: "Premium Performance Pre-Workout",
    subtitle: "Performance",
    price: "£36.99",
    prices: { "1": "£33.29", "4": "£31.44", "6": "£29.59" },
    savings: { "1": "10%", "4": "15%", "6": "20%" },
    benefits: ["Explosive Strength & Power Output", "Laser-Sharp Mental Focus", "Sustained Energy Without Crash"],
    images: [fusionBlackHero, fusionBlack, fusionBlackHero, fusionBlack],
    suggestedUse: "Mix 1 scoop (12g) with 300-400ml cold water and consume 20-30 minutes before training. Assess tolerance with ½ scoop on first use. Do not exceed 1 scoop per day.",
    supplementSummary: "L-Citrulline 6000mg · Beta-Alanine 3200mg · Caffeine Anhydrous 300mg · Alpha-GPC 300mg · L-Tyrosine 1500mg · Pink Himalayan Salt 500mg",
    whyDifferentHeading: "Why FUSION BLACK™ is different",
    whyDifferentText: "Clinical-dose pre-workout engineered for serious athletes.",
    whyFeatures: [
      { title: "Full Clinical Doses", desc: "No pixie-dusting — every ingredient at research-backed levels" },
      { title: "Dual Stimulant Matrix", desc: "Caffeine + Alpha-GPC for energy with cognitive clarity" },
      { title: "Pump & Performance Stack", desc: "6g L-Citrulline + Nitrosigine® for maximum vasodilation" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "Neurotransmitter priming & focus", desc: "Alpha-GPC and L-Tyrosine rapidly elevate acetylcholine and dopamine levels, creating razor-sharp focus and mind-muscle connection within 15 minutes of consumption." },
      { tagline: "Step 2", title: "Vasodilation & blood flow surge", desc: "6g L-Citrulline converts to L-Arginine, driving nitric oxide production and creating massive vasodilation. Blood flow to working muscles increases dramatically for superior pumps." },
      { tagline: "Step 3", title: "Sustained energy & endurance", desc: "Caffeine provides immediate CNS stimulation while Beta-Alanine buffers lactic acid accumulation, extending time to fatigue by up to 25% during high-intensity training." },
    ],
    ingredients: [
      { title: "L-Citrulline", tagline: "Key ingredient", dosage: "6000mg", desc: "The gold standard for nitric oxide production. L-Citrulline converts to L-Arginine in the kidneys, providing a sustained release of NO that drives vasodilation, increases blood flow to working muscles, and delivers skin-splitting pumps that last throughout your entire session.", hasImage: false },
      { title: "Beta-Alanine", dosage: "3200mg", desc: "Clinically dosed at the research-proven 3.2g threshold, Beta-Alanine increases intramuscular carnosine levels by up to 80%. This buffers hydrogen ion accumulation during intense exercise, delaying the onset of muscular fatigue and extending endurance capacity.", hasImage: false },
      { title: "Caffeine Anhydrous", dosage: "300mg", desc: "Precisely dosed for maximum CNS stimulation without jitter or crash. 300mg represents the optimal dose for enhanced strength output, reaction time, and thermogenesis based on meta-analyses of over 300 caffeine performance studies.", hasImage: true },
      { title: "Alpha-GPC 50%", dosage: "300mg", desc: "The most bioavailable form of choline, Alpha-GPC crosses the blood-brain barrier to rapidly elevate acetylcholine — the primary neurotransmitter for muscle contraction and cognitive function. Clinically shown to increase power output by 14%.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismAtpEnergy, title: "ATP Energy Production", subtitle: "Caffeine · Beta-Alanine", desc: "Caffeine blocks adenosine receptors while Beta-Alanine increases intramuscular carnosine, creating a dual-pathway energy system that sustains high-intensity output.", stats: [{ value: "300mg", label: "Clinical caffeine dose" }, { value: "25%", label: "Extended time to fatigue" }] },
      { step: "02", image: mechanismNitricOxide, title: "Nitric Oxide Surge", subtitle: "L-Citrulline · Nitrosigine®", desc: "L-Citrulline drives sustained NO production through the arginine pathway, creating massive vasodilation and nutrient delivery to working muscles.", stats: [{ value: "6g", label: "Full clinical dose" }, { value: "3×", label: "Greater NO production vs L-Arginine" }] },
      { step: "03", image: mechanismAmpkPathway, title: "Neural Activation", subtitle: "Alpha-GPC · L-Tyrosine", desc: "Alpha-GPC elevates acetylcholine for enhanced mind-muscle connection while L-Tyrosine supports dopamine synthesis for sustained motivation and focus.", stats: [{ value: "14%", label: "Power output increase" }, { value: "50%", label: "Improved reaction time" }] },
    ],
    supplementRows: [
      { ingredient: "L-Citrulline", spec: "(Pure)", dose: "6,000 mg", purpose: "Nitric Oxide & Vasodilation", flag: "" },
      { ingredient: "Beta-Alanine", spec: "(CarnoSyn®)", dose: "3,200 mg", purpose: "Endurance & Fatigue Buffering", flag: "CarnoSyn®" },
      { ingredient: "Caffeine Anhydrous", spec: "", dose: "300 mg", purpose: "CNS Stimulation & Focus", flag: "" },
      { ingredient: "Alpha-GPC", spec: "(50%)", dose: "300 mg", purpose: "Acetylcholine & Power Output", flag: "" },
      { ingredient: "L-Tyrosine", spec: "", dose: "1,500 mg", purpose: "Dopamine & Mental Clarity", flag: "" },
      { ingredient: "Nitrosigine®", spec: "(Arginine Silicate)", dose: "1,500 mg", purpose: "Sustained Nitric Oxide", flag: "Nitrosigine®" },
      { ingredient: "Pink Himalayan Salt", spec: "", dose: "500 mg", purpose: "Electrolyte Balance & Pumps", flag: "" },
    ],
    clinicalMechanisms: [
      { title: "Nitric Oxide Vasodilation", subtitle: "L-Citrulline + Nitrosigine® dual pathway", image: mechanismNitricOxide, badges: [{ dose: "6,000 MG", name: "L-Citrulline" }, { dose: "1,500 MG", name: "Nitrosigine®" }], checks: ["Sustained NO Production for Maximum Pump", "Enhanced Blood Flow & Nutrient Delivery"] },
      { title: "Neural Drive & Focus", subtitle: "Alpha-GPC + L-Tyrosine cognitive stack", image: mechanismAtpEnergy, badges: [{ dose: "300 MG", name: "Alpha-GPC" }, { dose: "1,500 MG", name: "L-Tyrosine" }], checks: ["Elevated Acetylcholine for Mind-Muscle Connection", "Dopamine Support for Sustained Motivation"] },
    ],
    testimonials: [
      { name: "Jake M.", role: "Powerlifter", quote: "The focus from FUSION BLACK is unreal. I hit a 10kg PR on bench within the first week. No crash, no jitters." },
      { name: "Lauren H.", role: "IFBB Bikini", quote: "Best pump I've ever had from a pre. The citrulline dose actually works — you can feel the difference from day one." },
      { name: "Tom W.", role: "Strength Coach", quote: "I recommend FUSION BLACK to all my athletes. Clean energy, proper dosing, and the endurance boost from beta-alanine is legit." },
    ],
    relatedSlugs: ["glyco8", "vascul8"],
    faqs: [
      { q: "How much caffeine is in FUSION BLACK?", a: "300mg of caffeine anhydrous per serving — the clinically optimal dose for performance enhancement." },
      { q: "Will I crash after taking it?", a: "No. The combination of sustained-release ingredients with Alpha-GPC and L-Tyrosine ensures smooth energy throughout your session without a crash." },
      { q: "Can I take it on non-training days?", a: "FUSION BLACK is designed for training days only. On rest days, we recommend cycling off stimulants to maintain caffeine sensitivity." },
      { q: "Is it safe to stack with GLYCO8?", a: "Absolutely. GLYCO8 taken with your post-workout meal and FUSION BLACK pre-workout is our recommended Performance Stack." },
      { q: "What flavours are available?", a: "Currently available in Black Cherry, Tropical Punch, and Unflavoured." },
    ],
  },

  vascul8: {
    slug: "vascul8",
    name: "VASCUL8™",
    tagline: "Nitric Oxide & Muscle Pump Catalyst",
    subtitle: "Performance",
    price: "£36.99",
    prices: { "1": "£33.29", "4": "£31.44", "6": "£29.59" },
    savings: { "1": "10%", "4": "15%", "6": "20%" },
    benefits: ["Extreme Vasodilation & Pumps", "Enhanced Nutrient Delivery", "Stim-Free — Stack with Any Pre"],
    images: [vascul8Hero, vascul8, vascul8Hero, vascul8],
    suggestedUse: "Take 4 capsules 30 minutes before training with 300ml water. For enhanced pumps, combine with FUSION BLACK. Can be taken on non-training days for cardiovascular support.",
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
      { title: "Nitrosigine®", tagline: "Key ingredient", dosage: "1500mg", desc: "A patented complex of bonded arginine silicate that has been clinically shown to increase NO levels within 30 minutes and sustain them for up to 6 hours. Unlike standard L-Arginine, Nitrosigine® is not degraded by arginase in the gut, ensuring maximal bioavailability.", hasImage: false },
      { title: "L-Citrulline", dosage: "3000mg", desc: "Converts to L-Arginine in the kidneys, providing the essential substrate for nitric oxide synthase. Combined with Nitrosigine®, this dual-source approach ensures both rapid onset and sustained NO production.", hasImage: false },
      { title: "S7™", dosage: "50mg", desc: "A blend of seven plant-based ingredients clinically shown to increase nitric oxide levels by 230%. S7™ works by stimulating your body's own NO production rather than providing external precursors.", hasImage: true },
      { title: "Pine Bark Extract", dosage: "300mg", desc: "Rich in oligomeric proanthocyanidins (OPCs), Pine Bark Extract enhances NO bioavailability by inhibiting the enzymes that break down nitric oxide, effectively extending the duration of vasodilation.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismNitricOxide, title: "eNOS Activation", subtitle: "Nitrosigine® · S7™", desc: "Nitrosigine® directly stimulates endothelial nitric oxide synthase while S7™ boosts your body's own NO production by 230% through plant-based pathway activation.", stats: [{ value: "230%", label: "Increase in NO production" }, { value: "15 min", label: "Time to onset" }] },
      { step: "02", image: mechanismGlut4Pathway, title: "Sustained Vasodilation", subtitle: "L-Citrulline · Pine Bark", desc: "L-Citrulline provides continuous arginine substrate while Pine Bark's OPCs inhibit NO degradation enzymes, creating vasodilation that lasts throughout your entire session.", stats: [{ value: "6 hrs", label: "Duration of effect" }, { value: "3g", label: "Clinical citrulline dose" }] },
      { step: "03", image: mechanismAmpkPathway, title: "Vascular Protection", subtitle: "Grape Seed · VasoDrive-AP®", desc: "Grape Seed Extract neutralises free radicals in blood vessel walls while VasoDrive-AP® supports healthy ACE inhibition for optimal blood pressure response during training.", stats: [{ value: "95%", label: "OPC standardisation" }, { value: "↓", label: "Oxidative vascular damage" }] },
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
      { name: "Ryan C.", role: "Classic Physique", quote: "VASCUL8 gives me pumps that last for hours after training. The vascularity is insane — veins I didn't know I had." },
      { name: "Emma D.", role: "Fitness Model", quote: "I stack this with FUSION BLACK and the pumps are absolutely unreal. Best combo I've ever used." },
      { name: "Alex P.", role: "Natural Bodybuilder", quote: "Stim-free pump product that actually delivers. I take it on rest days too for the cardiovascular benefits." },
    ],
    relatedSlugs: ["fusion-black", "glyco8"],
    faqs: [
      { q: "Can I stack VASCUL8 with a pre-workout?", a: "Yes! VASCUL8 is completely stimulant-free and designed to stack with any pre-workout, especially FUSION BLACK." },
      { q: "How long do the pumps last?", a: "Clinical studies show Nitrosigine® sustains elevated NO levels for up to 6 hours after ingestion." },
      { q: "Can I take it on non-training days?", a: "Yes. VASCUL8 provides cardiovascular and blood flow benefits that support recovery on rest days." },
      { q: "Is it vegan-friendly?", a: "Yes. All ingredients are plant-derived and the capsules are vegetable-based." },
      { q: "When should I take it?", a: "30 minutes before training for optimal pump and blood flow effects." },
    ],
  },

  glycoshift: {
    slug: "glycoshift",
    name: "GLYCOSHIFT™",
    tagline: "Intra-Workout Carbohydrate Fuel System",
    subtitle: "Recovery",
    price: "£34.99",
    prices: { "1": "£31.49", "4": "£29.74", "6": "£27.99" },
    savings: { "1": "10%", "4": "15%", "6": "20%" },
    benefits: ["Rapid Glycogen Replenishment", "Zero Bloating Carb Source", "Sustained Intra-Workout Energy"],
    images: [glycoshiftHero, glycoshift, glycoshiftHero, glycoshift],
    suggestedUse: "Mix 1 scoop (30g) with 500-700ml water and sip throughout your training session. For prolonged sessions (90+ minutes), use 1.5 scoops. Can also be used post-workout for rapid glycogen replenishment.",
    supplementSummary: "Cluster Dextrin® 25g · Palatinose™ 5g · Coconut Water Powder 2g · Pink Himalayan Salt 500mg · Magnesium Bisglycinate 200mg",
    whyDifferentHeading: "Why GLYCOSHIFT™ is different",
    whyDifferentText: "Engineered carbohydrate matrix — not sugar water.",
    whyFeatures: [
      { title: "Rapid Gastric Emptying", desc: "Cluster Dextrin® — zero bloating" },
      { title: "Sustained Energy Release", desc: "Palatinose™ low-GI fuel" },
      { title: "Complete Electrolyte Matrix", desc: "Coconut Water · Magnesium · Sodium" },
    ],
    howSteps: [
      { tagline: "Step 1", title: "Ultra-fast gastric emptying", desc: "Cluster Dextrin® (HBCD) has the fastest gastric emptying rate of any carbohydrate source. Its unique cyclic molecular structure passes through the stomach rapidly, delivering glucose to working muscles without bloating or GI distress." },
      { tagline: "Step 2", title: "Sustained glycogen delivery", desc: "Palatinose™ provides a low-GI carbohydrate source that releases glucose steadily over 2-3 hours, preventing energy spikes and crashes while maintaining consistent fuel availability throughout your session." },
      { tagline: "Step 3", title: "Electrolyte balance & hydration", desc: "Coconut Water Powder, Pink Himalayan Salt, and Magnesium Bisglycinate replace the key electrolytes lost through sweat, maintaining muscular contraction quality and preventing cramps during extended training." },
    ],
    ingredients: [
      { title: "Cluster Dextrin® (HBCD)", tagline: "Key ingredient", dosage: "25g", desc: "Highly Branched Cyclic Dextrin is the most advanced carbohydrate source available. Its unique cyclic molecular structure provides rapid gastric emptying (faster than maltodextrin or dextrose) with sustained energy release and zero osmotic pressure — meaning zero bloating even at high doses.", hasImage: false },
      { title: "Palatinose™ (Isomaltulose)", dosage: "5g", desc: "A naturally-sourced, low-GI disaccharide that provides sustained energy release over 2-3 hours. Unlike high-GI carbs, Palatinose™ promotes fat oxidation alongside glucose utilisation, making it ideal for body recomposition athletes.", hasImage: false },
      { title: "Coconut Water Powder", dosage: "2g", desc: "Nature's electrolyte solution, standardised for potassium content. Provides a natural source of potassium, sodium, and magnesium in ratios that mirror human sweat composition for optimal rehydration.", hasImage: true },
      { title: "Magnesium Bisglycinate", dosage: "200mg", desc: "The most bioavailable form of magnesium, chelated with glycine for enhanced absorption. Supports over 300 enzymatic reactions including ATP production, muscular contraction, and nervous system function.", hasImage: false },
    ],
    mechanisms: [
      { step: "01", image: mechanismGlycogenReplenish, title: "Rapid Gastric Clearance", subtitle: "Cluster Dextrin® HBCD", desc: "Cluster Dextrin's cyclic molecular structure creates near-zero osmotic pressure in the stomach, enabling the fastest gastric emptying of any carbohydrate source — faster than dextrose, maltodextrin, or waxy maize.", stats: [{ value: "2×", label: "Faster gastric emptying vs maltodextrin" }, { value: "0", label: "GI distress or bloating" }] },
      { step: "02", image: mechanismGlycogen, title: "Sustained Glycogen Delivery", subtitle: "Palatinose™ · Cluster Dextrin®", desc: "The dual-carb matrix provides both immediate and sustained glucose availability. Cluster Dextrin® replenishes glycogen rapidly while Palatinose™ maintains steady blood glucose for consistent energy.", stats: [{ value: "3 hrs", label: "Sustained energy release" }, { value: "30g", label: "Total carbohydrate per serve" }] },
      { step: "03", image: mechanismAmpkPathway, title: "Electrolyte Homeostasis", subtitle: "Coconut Water · Mg · Na", desc: "The electrolyte matrix replaces sodium, potassium, and magnesium lost through sweat in ratios that mirror human perspiration, maintaining muscular contraction quality and hydration status.", stats: [{ value: "500mg", label: "Sodium per serve" }, { value: "200mg", label: "Chelated magnesium" }] },
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
      { name: "Natalie S.", role: "CrossFit Competitor", quote: "Game changer for long WODs. My energy stays consistent and I don't crash. Recovery between sessions is noticeably faster." },
      { name: "David L.", role: "Bodybuilder", quote: "I pair GLYCOSHIFT with GLYCO8 for the ultimate carb management stack. Glycogen loading without the spill-over." },
    ],
    relatedSlugs: ["glyco8", "fusion-black"],
    faqs: [
      { q: "When should I drink GLYCOSHIFT?", a: "Sip throughout your training session. Begin drinking 10-15 minutes into your workout and finish by the end of your session." },
      { q: "Can I use it post-workout?", a: "Yes. GLYCOSHIFT is excellent for rapid post-workout glycogen replenishment. Mix with your protein shake for a complete recovery drink." },
      { q: "Will it cause bloating?", a: "No. Cluster Dextrin® has near-zero osmotic pressure, meaning it passes through the stomach rapidly without drawing water into the GI tract." },
      { q: "What flavours are available?", a: "Available in Tropical Mango, Berry Blast, and Unflavoured." },
      { q: "Can I stack it with GLYCO8?", a: "Absolutely. GLYCO8 + GLYCOSHIFT is the ultimate carbohydrate management stack for serious athletes." },
    ],
  },
};

export const getProduct = (slug: string): ProductData | undefined => products[slug];
export const getRelatedProducts = (slugs: string[]) => slugs.map(s => products[s]).filter(Boolean);
