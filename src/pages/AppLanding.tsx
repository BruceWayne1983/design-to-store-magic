import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BarChart3, ScanLine, Layers, Bell, ShieldCheck, Zap, ArrowRight, Smartphone } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import appDashboard from "@/assets/app-mockup-dashboard.jpg";
import appScanner from "@/assets/app-mockup-scanner.jpg";
import appStacks from "@/assets/app-mockup-stacks.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const features = [
  { icon: BarChart3, title: "Protocol Tracking", desc: "Log every dose, track adherence, and visualise your supplement schedule across the week." },
  { icon: ScanLine, title: "Label Scanner", desc: "Scan any supplement label to verify clinical doses, flag proprietary blends, and compare to Baseline standards." },
  { icon: Layers, title: "Stack Builder", desc: "Build personalised stacks based on your goals. Get synergy scores and timing recommendations." },
  { icon: Bell, title: "Smart Reminders", desc: "Never miss a dose. Timed notifications aligned to your training and meal schedule." },
  { icon: ShieldCheck, title: "Ingredient Database", desc: "Access our clinical ingredient library — doses, mechanisms, and research citations at your fingertips." },
  { icon: Zap, title: "Performance Insights", desc: "Track energy, recovery, and training readiness over time to see what's actually working." },
];

const screenshots = [
  { img: appDashboard, label: "Dashboard", desc: "Your daily protocol at a glance" },
  { img: appScanner, label: "Label Scanner", desc: "Verify any supplement instantly" },
  { img: appStacks, label: "Stack Builder", desc: "Personalised recommendations" },
];

const AppLanding = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError("");
    try {
      const { error: dbError } = await supabase
        .from("email_signups")
        .insert({ email: email.trim().toLowerCase(), source: "app-waitlist" });
      if (dbError && dbError.code !== "23505") throw dbError;
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById("app-waitlist")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
  <>
    <Helmet>
      <title>The App — Baseline Nutrition</title>
      <meta name="description" content="Track your supplement protocol, scan labels for clinical doses, and build personalised stacks with the Baseline Nutrition app." />
    </Helmet>

    <AnnouncementBar />
    <Navbar />

    {/* Hero */}
    <section className="w-full bg-[hsl(var(--hero-dark))] text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">Coming Soon</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Your Supplement<br />Protocol, <span className="text-primary">Perfected.</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-8">
            Track every dose, scan any label, and build clinically-backed stacks — all from your pocket. The Baseline app turns supplement science into a daily system.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              type="button"
              onClick={scrollToWaitlist}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              <Smartphone className="w-4 h-4" /> Join the Waitlist
            </button>
            <a
              href="#features"
              className="flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors text-sm"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex-shrink-0 w-[260px] md:w-[300px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img src={appDashboard} alt="Baseline Nutrition App Dashboard" className="w-full rounded-[2rem] shadow-2xl shadow-primary/10 border border-white/10" width={640} height={1024} />
        </motion.div>
      </div>
    </section>

    {/* Features grid */}
    <section id="features" className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3 block">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">Everything You Need to Optimise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Built for athletes and biohackers who take their supplementation seriously.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Screenshots showcase */}
    <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3 block">App Preview</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Designed for Performance</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Clean, clinical UI built around the science — not the marketing.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {screenshots.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="flex flex-col items-center text-center"
            >
              <div className="w-[220px] md:w-[240px] mb-6">
                <img src={s.img} alt={s.label} className="w-full rounded-[1.5rem] shadow-xl shadow-black/30 border border-white/10" loading="lazy" width={640} height={1024} />
              </div>
              <h3 className="text-lg font-bold mb-1">{s.label}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section id="app-waitlist" className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[720px] mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3 block">Early Access</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">Be the First to Try It</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Join the waitlist for early access to the Baseline Nutrition app. Free for all Baseline customers at launch.
        </p>
        {!submitted ? (
          <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
            <label htmlFor="app-waitlist-email" className="sr-only">Email address</label>
            <input
              id="app-waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm whitespace-nowrap disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Join Waitlist"}
            </button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/30 bg-primary/5 text-primary font-semibold">
            <span>✓</span> You're on the waitlist!
          </div>
        )}
        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
        <p className="text-xs text-muted-foreground mt-4">Available on iOS & Android. No spam, ever.</p>
      </div>
    </section>

    <Footer />
  </>
  );
};

export default AppLanding;
