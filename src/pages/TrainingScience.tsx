import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, Dumbbell, Mail, ArrowRight, Layers, Timer, Activity, Droplets, RotateCcw, MessageCircleQuestion } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import RequestArticleForm from "@/components/forms/RequestArticleForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { coaches } from "@/data/coaches";

const categories = [
  { label: "Programming", icon: Layers },
  { label: "Periodisation", icon: RotateCcw },
  { label: "Nutrient Timing", icon: Timer },
  { label: "Recovery", icon: Activity },
  { label: "Hydration Strategy", icon: Droplets },
];

const protocolGuides = [
  {
    title: "Programming Fundamentals",
    blurb: "Volume, intensity, frequency — how to structure a training week that actually drives adaptation.",
    href: "/blog?category=training-science",
  },
  {
    title: "Periodisation Models",
    blurb: "Linear, undulating, and block periodisation — when each model wins for strength, hypertrophy, and sport.",
    href: "/blog?category=training-science",
  },
  {
    title: "Nutrient Timing Protocols",
    blurb: "Pre-, intra-, and post-training fuelling windows backed by clinical pharmacokinetic data.",
    href: "/blog?category=training-science",
  },
];

const seedArticles = [
  { title: "Strength vs Hypertrophy: How Rep Ranges Drive Adaptation", category: "Programming" },
  { title: "The Daily Undulating Periodisation Playbook", category: "Periodisation" },
  { title: "Carb Timing for Two-a-Day Sessions", category: "Nutrient Timing" },
  { title: "Why Sleep Beats Every Recovery Modality", category: "Recovery" },
  { title: "Sweat Rate Testing: Build Your Own Hydration Plan", category: "Hydration Strategy" },
  { title: "Deload Weeks: The Evidence-Based Framework", category: "Programming" },
];

const TrainingScience = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const filtered = activeCategory === "All" ? seedArticles : seedArticles.filter((a) => a.category === activeCategory);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || newsletterLoading) return;
    setNewsletterLoading(true);
    setNewsletterError("");
    try {
      const { error } = await supabase
        .from("email_signups")
        .insert({ email: newsletterEmail.trim().toLowerCase(), source: "training-science-weekly" });
      if (error && error.code !== "23505") throw error;
      setNewsletterDone(true);
    } catch {
      setNewsletterError("Something went wrong. Please try again.");
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <Helmet>
        <title>Training Science | Baseline Nutrition</title>
        <meta name="description" content="Evidence-based programming, periodisation, nutrient timing, recovery, and hydration protocols — written by Baseline coaches and sports scientists." />
      </Helmet>
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-6 max-w-[820px]">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.25em]">
            <Dumbbell className="w-4 h-4" /> Training Science
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[1.1]">
            Evidence-based training. Written by coaches who actually program.
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-[640px]">
            Programming frameworks, periodisation models, nutrient timing windows, and recovery protocols — translated from peer-reviewed sports science into protocols you can run this week.
          </p>
        </div>
      </section>

      {/* Category filter + article grid */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
          <SectionHeader
            tagline="The Library"
            heading="Training science articles"
            text="Filter by discipline. Every article links the protocol back to the underlying mechanism."
          />

          <div className="flex flex-wrap gap-2">
            {["All", ...categories.map((c) => c.label)].map((label) => (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === label
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((article) => (
              <Link
                key={article.title}
                to="/blog?category=training-science"
                className="flex flex-col gap-3 border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{article.category}</span>
                <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{article.title}</h3>
                <span className="text-sm text-muted-foreground inline-flex items-center gap-1 mt-auto pt-2">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link
              to="/blog?category=training-science"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded text-sm font-bold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              View all training articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Protocol guides */}
      <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-[640px]">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.25em]">
              <Layers className="w-4 h-4" /> Protocol Guides
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-[1.1]">Long-form playbooks</h2>
            <p className="text-base text-white/70">Deep dives that take you from theory to a programmable protocol.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {protocolGuides.map((g) => (
              <Link
                key={g.title}
                to={g.href}
                className="flex flex-col gap-3 bg-white/[0.04] border border-white/15 rounded-2xl p-6 md:p-7 hover:border-primary/60 transition-colors group"
              >
                <h3 className="text-lg font-bold uppercase tracking-tight">{g.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{g.blurb}</p>
                <span className="text-xs font-bold text-primary uppercase tracking-wider inline-flex items-center gap-1 mt-auto pt-3">
                  Read guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured coaches */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
          <SectionHeader
            tagline="Our Coaches"
            heading="Written by people in the trenches"
            text="Every article is authored or peer-reviewed by a Baseline coach with sport-science credentials and time on the floor."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {coaches.map((c) => (
              <div key={c.slug} className="flex flex-col gap-4 border border-border rounded-2xl p-6 md:p-7 hover:border-primary/40 transition-colors">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${c.accent} flex items-center justify-center text-foreground font-black text-lg tracking-wider`}>
                  {c.initials}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-foreground">{c.name}</h3>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{c.role}</span>
                  <span className="text-xs text-muted-foreground">{c.credentials}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
            <Mail className="w-7 h-7 text-primary" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-[1.1]">
              Weekly training science, in your inbox
            </h2>
            <p className="text-base md:text-lg text-white/70">
              One programmable protocol, periodisation note, or recovery framework — delivered weekly. No fluff.
            </p>
          </div>
          {!newsletterDone ? (
            <form onSubmit={handleNewsletter} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 bg-white/[0.06] border-white/20 text-white placeholder:text-white/40 focus-visible:ring-primary/40 focus-visible:border-primary"
              />
              <Button type="submit" disabled={newsletterLoading} className="px-6 bg-primary text-primary-foreground uppercase tracking-wider font-bold hover:opacity-90 disabled:opacity-50">
                {newsletterLoading ? "Joining…" : "Join"}
              </Button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Check className="w-5 h-5" /> You're on the list — first protocol drops this week.
            </div>
          )}
          {newsletterError && <p className="text-red-400 text-xs">{newsletterError}</p>}
          <p className="text-xs text-white/40">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Request an article */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.25em]">
              <MessageCircleQuestion className="w-4 h-4" /> Request an article
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[1.1] text-foreground">
              Want a protocol on something specific? Ask — we'll write it.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-[520px]">
              Programming question, periodisation problem, fuelling window you can't crack? Send it through and we'll build a clear, evidence-backed guide.
            </p>
          </div>
          <RequestArticleForm
            source="training-science"
            topicLabel="Topic or training problem"
            topicPlaceholder="e.g. 'Two-a-day fuelling' or 'DUP for powerlifting'"
            submitLabel="Request article"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrainingScience;
