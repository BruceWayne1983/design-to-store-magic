import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronDown, FlaskConical, ShieldCheck, Factory, Repeat } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import glyco8 from "@/assets/products/glyco8.jpg";
import purestCreatine from "@/assets/products/purest-creatine-300g.jpg";
import glycoshift from "@/assets/products/glycoshift.jpg";

/* TODO: swap placeholder images when peptide product photography is ready */
/* SKUs defined in docs/peptides/02-formulation-side-arm.md */
const peptideProducts = [
  { name: "PEPTI-BUILD M14", slug: "pepti-build-m14", desc: "Whey & Leucine Peptide Matrix", price: "£54.99", priceNum: 54.99, category: "Peptides" as const, badge: "FLAGSHIP" },
  { name: "PEPTI-RECON J22", slug: "pepti-recon-j22", desc: "Tendon, Joint & Recovery Peptides", price: "£42.99", priceNum: 42.99, category: "Peptides" as const, badge: "NEW" },
  { name: "PEPTI-GLO S30", slug: "pepti-glo-s30", desc: "Bioactive Skin & Hair Peptides", price: "£39.99", priceNum: 39.99, category: "Peptides" as const, badge: null },
  { name: "PEPTI-LEAN E08", slug: "pepti-lean-e08", desc: "Natural GLP-1 & Satiety Stack", price: "£44.99", priceNum: 44.99, category: "Peptides" as const, badge: null },
  { name: "PEPTI-FLOW V07", slug: "pepti-flow-v07", desc: "Vascular & Blood Pressure Peptides", price: "£36.99", priceNum: 36.99, category: "Peptides" as const, badge: null },
  { name: "PEPTI-CALM N03", slug: "pepti-calm-n03", desc: "Casein Peptide Sleep & Stress", price: "£32.99", priceNum: 32.99, category: "Peptides" as const, badge: null },
];

const howSteps = [
  { tagline: "Step 1", title: "Absorption", desc: "Small bioactive peptide sequences are absorbed intact across the gut wall via PEPT1 transporters, entering circulation without being broken down into single amino acids." },
  { tagline: "Step 2", title: "Signalling", desc: "Once in circulation, peptides bind to specific cellular receptors and trigger downstream biological effects — from mTOR activation to nitric oxide release to GLP-1 mimicry." },
  { tagline: "Step 3", title: "Adaptation", desc: "Sustained signalling drives measurable adaptation — collagen synthesis, muscle protein synthesis, vasodilation and metabolic balance — depending on the peptide sequence." },
];

const stacks = [
  {
    name: "The Build Stack",
    products: ["PEPTI-BUILD M14", "Pürest Creatine™"],
    benefit: "Pair the post-training whey-leucine peptide matrix with clinical-dose creatine for measurable lean-mass gains across an 8-week training block.",
  },
  {
    name: "The Recon Stack",
    products: ["PEPTI-RECON J22", "GLYCOSHIFT™"],
    benefit: "Bioactive collagen peptides for tendon and joint adaptation, layered onto intra-workout carb delivery for compounding recovery under heavy training load.",
  },
  {
    name: "The Lean Stack",
    products: ["PEPTI-LEAN E08", "GLYCO8™"],
    benefit: "Natural GLP-1 satiety modulators paired with dihydroberberine glucose disposal — appetite control and nutrient partitioning working in tandem.",
  },
];

const faqs = [
  {
    q: "What are bioactive peptides?",
    a: "Bioactive peptides are short chains of amino acids — typically 2 to 50 residues — that exert a measurable biological effect once absorbed. Unlike whole proteins, these sequences are small enough to survive digestion and interact directly with cellular receptors and signalling pathways.",
  },
  {
    q: "What is the difference between food-grade peptides and research peptides?",
    a: "Food-grade bioactive peptides are derived from hydrolysed food proteins (collagen, whey, casein, marine sources) and are approved for oral consumption in the UK. Research peptides are injectable, prescription-controlled, and not legal to sell as supplements. Every Baseline peptide product uses food-grade, orally bioavailable sequences.",
  },
  {
    q: "Do peptides actually survive digestion?",
    a: "Yes — short bioactive peptides resist gastric and pancreatic protease activity and are absorbed intact via the PEPT1 transporter in the small intestine. Clinical studies show measurable plasma concentrations of specific di- and tri-peptides within 30 to 90 minutes of oral dosing.",
  },
  {
    q: "How quickly will I notice results?",
    a: "Acute effects such as vascular flow and post-meal glucose response can be felt within hours. Structural adaptations — collagen density, joint comfort, lean mass — typically take 6 to 12 weeks of consistent clinical dosing to become measurable.",
  },
  {
    q: "Can I stack peptides with creatine or pre-workout?",
    a: "Absolutely. Bioactive peptides operate on signalling pathways that complement creatine, electrolytes and pre-workout actives rather than competing with them. The Baseline stacks above are designed to layer cleanly with our existing range.",
  },
  {
    q: "Are peptide supplements safe for long-term use?",
    a: "Food-grade bioactive peptides have an excellent long-term safety record — they are metabolised through the same pathways as the dietary proteins they originate from. Every Baseline peptide formula is third-party tested and uses doses supported by published human trials.",
  },
];

const trustChips = [
  { icon: FlaskConical, label: "Clinically Dosed" },
  { icon: ShieldCheck, label: "Third-Party Tested" },
  { icon: Factory, label: "UK Formulated & Shipped" },
  { icon: Repeat, label: "Subscribe & Save" },
];

const collectionUrl = "https://baselinenutrition.co.uk/shop/peptides";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Peptide Supplements UK — Bioactive Collagen, Whey & GLP-1 | Baseline",
  description:
    "Clinically dosed peptide supplements made in the UK. Bioactive collagen for joints and skin, whey hydrolysate for muscle, lactotripeptides for blood pressure, natural GLP-1 modulators.",
  url: collectionUrl,
  isPartOf: {
    "@type": "WebSite",
    name: "Baseline Nutrition",
    url: "https://baselinenutrition.co.uk",
  },
  about: {
    "@type": "Thing",
    name: "Bioactive Peptide Supplements",
  },
  hasPart: peptideProducts.map((p) => ({
    "@type": "Product",
    name: p.name,
    description: p.desc,
    category: "Peptide Supplements",
    offers: {
      "@type": "Offer",
      price: p.priceNum,
      priceCurrency: "GBP",
      availability: "https://schema.org/PreOrder",
      url: `${collectionUrl}#${p.slug}`,
    },
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://baselinenutrition.co.uk/" },
    { "@type": "ListItem", position: 2, name: "Shop", item: "https://baselinenutrition.co.uk/shop" },
    { "@type": "ListItem", position: 3, name: "Peptides", item: collectionUrl },
  ],
};

const stackImageMap: Record<string, string> = {
  "Pürest Creatine™": purestCreatine,
  "GLYCOSHIFT™": glycoshift,
  "GLYCO8™": glyco8,
};

const Peptides = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col items-start w-full">
      <Helmet>
        <title>Peptide Supplements UK — Bioactive Collagen, Whey & GLP-1 | Baseline</title>
        <meta
          name="description"
          content="Clinically dosed peptide supplements made in the UK. Bioactive collagen for joints & skin, whey hydrolysate for muscle, lactotripeptides for blood pressure, natural GLP-1 modulators. Trademarked actives at full clinical doses."
        />
        <link rel="canonical" href={collectionUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Peptide Supplements UK — Bioactive Collagen, Whey & GLP-1 | Baseline" />
        <meta
          property="og:description"
          content="Clinically dosed peptide supplements made in the UK. Bioactive collagen for joints & skin, whey hydrolysate for muscle, lactotripeptides for blood pressure, natural GLP-1 modulators."
        />
        <meta property="og:url" content={collectionUrl} />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-[hsl(215,50%,8%)] py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Peptide Science</span>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
            Peptide Supplements — Bioactive, Food-Grade, Fully Disclosed
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-[680px]">
            Six clinically validated peptide actives, dosed at or above the trial level. No proprietary blends. No prescription overlap. Legal to buy and use in the United Kingdom as a food supplement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="button"
              onClick={() => scrollTo("peptide-products")}
              className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Shop peptides
            </button>
            <button
              type="button"
              onClick={() => scrollTo("how-peptides-work")}
              className="px-6 py-3 border border-white/30 text-white text-sm md:text-base font-medium uppercase tracking-wider hover:bg-white/10 transition-colors text-center"
            >
              How peptides work
            </button>
          </div>
        </div>
      </section>

      {/* What "peptide" means at Baseline */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[820px] mx-auto flex flex-col gap-6"
        >
          <SectionHeader tagline="Education" heading={'What "peptide" means at Baseline'} center={false} />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Peptides are short chains of amino acids — between two and fifty — that act differently from intact proteins. When a whole protein is hydrolysed by food-grade enzymes, it releases di-peptide and tri-peptide fragments small enough to cross the gut barrier intact, fast enough to spike plasma amino acids within thirty minutes, and specific enough to bind receptors and modulate enzymes whole proteins cannot reach.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            The Baseline peptide range is built on six clinically validated, food-grade peptide actives — Verisol®, Fortigel®, Tendoforte®, Lacprodan® BLG-100, PepForm® Leucine Peptides, AMEALPEPTIDE® and Lactium® — each dosed at or above the trial-validated clinical level. No proprietary blends, no peptide-fairy-dust labels, no prescription overlap. Everything in this range is legal to buy and use in the United Kingdom as a food supplement.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            We've split the range across six roles. <span className="text-foreground font-semibold">PEPTI-BUILD M14</span> is the post-training muscle-protein-synthesis driver — whey hydrolysate plus BLG-100 plus a peptide-bonded leucine carrier, delivering more than five grams of leucine per serving. <span className="text-foreground font-semibold">PEPTI-RECON J22</span> combines Fortigel® and Tendoforte® bioactive collagen peptides at full clinical doses for joint and tendon adaptation under load. <span className="text-foreground font-semibold">PEPTI-GLO S30</span> is the bioactive skin stack — Verisol® at twice the trial dose, supported by marine collagen, hyaluronic acid and AstaReal® astaxanthin. <span className="text-foreground font-semibold">PEPTI-FLOW V07</span> is the cardiovascular maintenance capsule — AMEALPEPTIDE® lactotripeptides plus sardine peptide Val-Tyr plus ubiquinol Kaneka™. <span className="text-foreground font-semibold">PEPTI-LEAN E08</span> is the natural GLP-1 satiety stack — Eriomin® lemon flavonoid, Yerba Mate and Caralluma fimbriata, with the explicit guardrail that this is not semaglutide and contains no prescription drug. <span className="text-foreground font-semibold">PEPTI-CALM N03</span> is Lactium® alpha-casozepine for stress and sleep, dosed at the 150mg clinical-trial level.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Read the science before you buy. Choose by goal, not by marketing.
          </p>
        </motion.div>
      </section>

      {/* Product Grid */}
      <section id="peptide-products" className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
          <SectionHeader
            tagline="The Range"
            heading="Peptide supplements"
            text="Six clinically dosed bioactive peptide formulas — pre-launch. Join the notify list to be first in line."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8">
            {peptideProducts.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group relative"
              >
                {p.badge && (
                  <span className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {p.badge}
                  </span>
                )}
                <div className="w-full aspect-square bg-secondary flex items-center justify-center p-4 md:p-8">
                  <motion.img
                    src={glyco8}
                    alt={`${p.name} placeholder`}
                    className="w-full h-full object-contain opacity-80"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-4 md:p-6 flex flex-col gap-2 text-center">
                  <h5 className="text-sm md:text-lg font-bold text-foreground tracking-wide">{p.name}</h5>
                  <p className="text-xs md:text-sm text-muted-foreground">{p.desc}</p>
                  <span className="text-sm md:text-lg font-bold text-foreground mt-1">{p.price}</span>
                  <button
                    type="button"
                    disabled
                    className="mt-3 w-full px-4 py-2 bg-secondary text-foreground text-xs font-bold uppercase tracking-wider border border-border cursor-not-allowed opacity-70"
                  >
                    Notify me
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How peptides work */}
      <section id="how-peptides-work" className="w-full bg-secondary py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
          <SectionHeader tagline="Mechanism" heading="How peptides work" text="Three stages from oral dose to measurable adaptation." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {howSteps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex flex-col gap-3 border border-border rounded-lg p-6 md:p-8 bg-background"
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">{s.tagline}</span>
                <h3 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight">{s.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack with Baseline */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
          <SectionHeader tagline="Pairings" heading="Stack with Baseline" text="Peptides layer cleanly with the existing Baseline range. Three protocols to start." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stacks.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex flex-col gap-4 border border-border rounded-lg p-6 md:p-8"
              >
                <div className="flex items-center gap-3">
                  {s.products.map((prod) =>
                    stackImageMap[prod] ? (
                      <div key={prod} className="w-14 h-14 md:w-16 md:h-16 bg-secondary rounded flex items-center justify-center p-2">
                        <img src={stackImageMap[prod]} alt={prod} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div key={prod} className="w-14 h-14 md:w-16 md:h-16 bg-secondary rounded flex items-center justify-center p-2 border border-border">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider text-center leading-tight">Peptide</span>
                      </div>
                    )
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-black text-foreground uppercase tracking-tight">{s.name}</h3>
                <div className="flex flex-col gap-1">
                  {s.products.map((prod) => (
                    <span key={prod} className="text-xs md:text-sm font-semibold text-foreground">{prod}</span>
                  ))}
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-secondary py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[768px] mx-auto flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest">Peptide FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">Common questions</h2>
            <p className="text-base md:text-lg text-muted-foreground">Everything UK customers ask before starting a peptide protocol.</p>
          </div>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm md:text-base font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-sm md:text-base text-muted-foreground leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-base md:text-lg font-bold text-foreground">Still researching?</h4>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Speak to our <Link to="/contact" className="text-primary underline">science team</Link> or browse the <Link to="/blog" className="text-primary underline">protocol guides</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="w-full bg-background py-12 md:py-16 px-4 md:px-8 lg:px-16 border-t border-border">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustChips.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className="flex flex-col md:flex-row items-center justify-center gap-3 border border-border rounded-lg p-4 md:p-5 text-center md:text-left"
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                <span className="text-xs md:text-sm font-bold text-foreground uppercase tracking-wider">{t.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-6 md:gap-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1]">Be first on peptides</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-[500px]">
            The Baseline peptide range launches soon. Join the notify list to lock in early-access pricing on every formula.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => scrollTo("peptide-products")}
              className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              View the range
            </button>
            <Link
              to="/shop"
              className="px-6 py-3 border border-border text-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors text-center"
            >
              Shop all Baseline
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Peptides;
