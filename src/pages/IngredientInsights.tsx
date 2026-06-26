import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FileText, Check, Download, FlaskConical, Mail, MessageCircleQuestion, ArrowRight } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import RequestArticleForm from "@/components/forms/RequestArticleForm";
import { supabase } from "@/integrations/supabase/client";
import { createIngredientPdf } from "@/lib/ingredientPdf";
import { downloadPdfFile } from "@/lib/deckPdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PDF_FILENAME = "Baseline-Nutrition-Ingredient-Insights.pdf";

const signatureIngredients = [
  { name: "EnXtra®", source: "Alpinia galanga", blurb: "5-hour sustained alertness without jitters — synergistic with caffeine." },
  { name: "NeuroPEA™", source: "Phenylethylamine HCl", blurb: "Rapid-onset mood and cognitive elevation for sharper focus." },
  { name: "Zynamite®", source: "Mangifera indica", blurb: "Boosts brain energy metabolism and reaction time." },
  { name: "Infinergy®", source: "Di-Caffeine Malate", blurb: "Buffered caffeine for extended energy and a smoother tail." },
  { name: "Pycnogenol®", source: "French Maritime Pine Bark", blurb: "Complementary eNOS pathway for fuller, longer-lasting pumps." },
  { name: "HydroPrime®", source: "65% Glycerol Powder", blurb: "Highest-purity glycerol for cellular hyperhydration and power output." },
  { name: "Cluster Dextrin®", source: "Highly Branched Cyclic Dextrin", blurb: "Low-osmolality carb that fuels training without bloating." },
  { name: "GlucoVantage®", source: "Dihydroberberine", blurb: "Potent AMPK activator for rapid glucose uptake and disposal." },
  { name: "AstraGin®", source: "Astragalus + Panax notoginseng", blurb: "Amplifies absorption of the actives it's paired with." },
];

const pdfIncludes = [
  "Every active across the full Baseline range — by product",
  "Exact clinical doses, not proprietary-blend hand-waving",
  "The purpose and mechanism behind each ingredient",
  "Trademarked, patented ingredients and their sources",
];

type ResultState = "idle" | "done" | "error";

const IngredientInsights = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultState>("idle");
  const [error, setError] = useState("");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterResult, setNewsletterResult] = useState<ResultState>("idle");
  const [newsletterError, setNewsletterError] = useState("");

  const generateAndDownload = async () => {
    const pdf = createIngredientPdf();
    await downloadPdfFile(pdf, PDF_FILENAME);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError("");
    try {
      const { error: dbError } = await supabase
        .from("email_signups")
        .insert({ email: email.trim().toLowerCase(), source: "ingredient-pdf" });
      // Duplicate email (already on the list) is fine — still deliver the PDF.
      if (dbError && dbError.code !== "23505") throw dbError;
      await generateAndDownload();
      setResult("done");
    } catch {
      setError("Something went wrong generating your PDF. Please try again.");
      setResult("error");
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || newsletterLoading) return;
    setNewsletterLoading(true);
    setNewsletterError("");
    try {
      const { error: dbError } = await supabase
        .from("email_signups")
        .insert({ email: newsletterEmail.trim().toLowerCase(), source: "weekly-insights" });
      if (dbError) {
        if (dbError.code === "23505") {
          setNewsletterResult("done");
        } else {
          throw dbError;
        }
      } else {
        setNewsletterResult("done");
      }
    } catch {
      setNewsletterError("Something went wrong. Please try again.");
      setNewsletterResult("error");
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <Helmet>
        <title>Ingredient Insights | Baseline Nutrition</title>
        <meta name="description" content="Get the full PDF breakdown of every ingredient in the Baseline Nutrition range — clinical doses, mechanisms, and trademarked actives. Free with email signup." />
      </Helmet>
      <AnnouncementBar />
      <Navbar />

      {/* Hero + signup */}
      <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.25em]">
              <FlaskConical className="w-4 h-4" /> Ingredient Insights
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[1.1]">
              Know exactly what's in your supplements
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-[520px]">
              We've got nothing to hide. Download the full ingredient breakdown of the entire Baseline range — every active, every clinical dose, and the science behind it.
            </p>
            <ul className="flex flex-col gap-2.5">
              {pdfIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm md:text-base text-white/85">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Signup card */}
          <div className="bg-white/[0.04] border border-white/15 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-bold">The Full Ingredient PDF</h2>
                <p className="text-xs text-white/50">Free · Instant download</p>
              </div>
            </div>

            {result !== "done" ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label htmlFor="ingredient-email" className="text-sm text-white/70">
                  Enter your email and we'll send your copy straight to your screen.
                </label>
                <input
                  id="ingredient-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-5 py-3.5 bg-white/[0.06] border border-white/20 rounded text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? "Preparing your PDF…" : (<><Download className="w-4 h-4" /> Get the PDF</>)}
                </button>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <p className="text-[11px] text-white/40 leading-relaxed">
                  By downloading you agree to our Privacy Policy and consent to receive occasional updates. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Check className="w-5 h-5" /> Your download has started.
                </div>
                <p className="text-sm text-white/60">
                  If it didn't open automatically, use the button below. We've also added you to the list for ingredient deep-dives.
                </p>
                <button
                  type="button"
                  onClick={generateAndDownload}
                  className="px-5 py-3 border border-white/25 text-white text-sm font-semibold uppercase tracking-wider rounded hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Signature ingredients */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-16">
          <SectionHeader
            tagline="A Preview"
            heading="Signature trademarked actives"
            text="A glimpse of the patented, clinically studied ingredients you'll find fully detailed in the PDF."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {signatureIngredients.map((ing) => (
              <div
                key={ing.name}
                className="flex flex-col gap-2 border border-border rounded-xl p-5 md:p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-base font-black text-foreground uppercase tracking-tight">{ing.name}</h3>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{ing.source}</span>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{ing.blurb}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground max-w-[720px]">
            Food supplements should not be used as a substitute for a varied, balanced diet and a healthy lifestyle. Not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>

      {/* Weekly insights mailing list */}
      <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
            <Mail className="w-7 h-7 text-primary" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-[1.1]">
              Join the weekly ingredient insights
            </h2>
            <p className="text-base md:text-lg text-white/70">
              Get one clinically researched ingredient breakdown, mechanism note, or supplement myth-buster delivered to your inbox every week.
            </p>
          </div>

          {newsletterResult !== "done" ? (
            <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 bg-white/[0.06] border-white/20 text-white placeholder:text-white/40 focus-visible:ring-primary/40 focus-visible:border-primary"
              />
              <Button
                type="submit"
                disabled={newsletterLoading}
                className="px-6 bg-primary text-primary-foreground uppercase tracking-wider font-bold hover:opacity-90 disabled:opacity-50"
              >
                {newsletterLoading ? "Joining…" : "Join"}
              </Button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Check className="w-5 h-5" />
              You're on the list — look out for your first insight.
            </div>
          )}
          {newsletterError && <p className="text-red-400 text-xs">{newsletterError}</p>}
          <p className="text-xs text-white/40">No spam. Unsubscribe anytime. Read our Privacy Policy.</p>
        </div>
      </section>

      {/* Request an ingredient insight */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.25em]">
              <MessageCircleQuestion className="w-4 h-4" /> Request an insight
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[1.1] text-foreground">
              Want to know what's in your supps? Ask — we'll help you.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-[520px]">
              Not sure what's in your current stack, whether a dose is legit, or what an ingredient actually does? Send it to us and we'll break it down.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="request-name" className="text-sm font-medium text-foreground">Your name</label>
                <Input id="request-name" placeholder="e.g. Alex" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="request-email" className="text-sm font-medium text-foreground">Email</label>
                <Input id="request-email" type="email" placeholder="you@email.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="request-product" className="text-sm font-medium text-foreground">Product or ingredient</label>
                <Input id="request-product" placeholder="e.g. 'XYZ Pre-Workout' or 'Beta-Alanine'" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="request-question" className="text-sm font-medium text-foreground">What do you want to know?</label>
                <textarea
                  id="request-question"
                  rows={4}
                  placeholder="Paste the label, list the ingredients, or ask a question..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button type="submit" className="w-full uppercase tracking-wider font-bold">
                Request insight
              </Button>
              <p className="text-xs text-muted-foreground">
                Our team reviews every request and responds with a clear, evidence-backed breakdown.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IngredientInsights;
