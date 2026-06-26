import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Quote, ArrowRight, FlaskConical, Target, ShieldCheck } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";

// Placeholder founder data — replace when copy is supplied.
const founders = [
  {
    name: "{{FOUNDER_NAME_1}}",
    role: "Co-Founder & {{ROLE_1}}",
    initials: "F1",
    bio: "{{FOUNDER_BIO_1 — short paragraph: background, why they started Baseline, what they own day-to-day.}}",
    linkedin: "",
  },
  {
    name: "{{FOUNDER_NAME_2}}",
    role: "Co-Founder & {{ROLE_2}}",
    initials: "F2",
    bio: "{{FOUNDER_BIO_2 — short paragraph: background, why they started Baseline, what they own day-to-day.}}",
    linkedin: "",
  },
];

const pillars = [
  { icon: FlaskConical, title: "Clinical Doses, Always", text: "Every active hits its researched effective dose. No proprietary blends, no pixie-dusting." },
  { icon: Target, title: "Purpose-Built Formulas", text: "Each product targets one biological pathway — not a marketing trend." },
  { icon: ShieldCheck, title: "Full Label Transparency", text: "Open-label, UK-manufactured, third-party tested. You see exactly what's in the tub." },
];

const Founders = () => (
  <div className="flex flex-col items-start w-full">
    <Helmet>
      <title>Founders | Baseline Nutrition</title>
      <meta name="description" content="Meet the founders behind Baseline Nutrition — the story, the standards, and why we built a clinically dosed, fully transparent supplement brand." />
    </Helmet>
    <AnnouncementBar />
    <Navbar />

    {/* Hero */}
    <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.25em]">
            Our Founders
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[1.1]">
            Built by athletes. Backed by science. Owned by people who use it.
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-[560px]">
            {`{{FOUNDERS_HERO_INTRO — one or two sentences setting up the story: who we are, what we were tired of, what we set out to build.}}`}
          </p>
        </div>
        <div className="bg-white/[0.04] border border-white/15 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <Quote className="w-8 h-8 text-primary mb-4" />
          <p className="text-lg md:text-xl text-white/85 leading-relaxed">
            {`"{{FOUNDERS_PULL_QUOTE — short, sharp manifesto line from the founders.}}"`}
          </p>
          <p className="text-xs text-white/40 uppercase tracking-wider mt-4">— The Baseline Founders</p>
        </div>
      </div>
    </section>

    {/* Our Story */}
    <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[800px] mx-auto flex flex-col gap-6">
        <SectionHeader tagline="Our Story" heading="Why we built Baseline" />
        <div className="flex flex-col gap-5 text-muted-foreground leading-relaxed">
          <p>{`{{STORY_PARAGRAPH_1 — origin: where the founders came from, the problem in the supplement market that started this.}}`}</p>
          <p>{`{{STORY_PARAGRAPH_2 — turning point: the moment you decided "we'll build this ourselves" and what the bar had to be.}}`}</p>
          <p>{`{{STORY_PARAGRAPH_3 — today: what Baseline stands for, who you make it for, and where it's going.}}`}</p>
        </div>
      </div>
    </section>

    {/* Founder profiles */}
    <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
        <SectionHeader tagline="The Team" heading="Meet the founders" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {founders.map((f) => (
            <div key={f.name} className="bg-white/[0.04] border border-white/15 rounded-2xl p-6 md:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center text-2xl font-black tracking-wider">
                  {f.initials}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-black uppercase tracking-tight">{f.name}</h3>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{f.role}</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-white/75 leading-relaxed">{f.bio}</p>
              {f.linkedin && (
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary uppercase tracking-wider inline-flex items-center gap-1">
                  Connect on LinkedIn <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* What we stand for */}
    <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
        <SectionHeader tagline="What We Stand For" heading="The Baseline standard" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex flex-col gap-3 border border-border rounded-2xl p-6 md:p-7 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground uppercase tracking-tight">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA band */}
    <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center justify-between">
        <div className="flex flex-col gap-3 max-w-[640px]">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-[1.1]">See what we've built</h2>
          <p className="text-base text-white/70">Browse the full range — every formula carries the founders' standard.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/shop" className="px-6 py-3 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider rounded hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            Shop the range <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/about" className="px-6 py-3 border border-white/25 text-white text-sm font-bold uppercase tracking-wider rounded hover:border-primary hover:text-primary transition-colors">
            Our standards
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Founders;
