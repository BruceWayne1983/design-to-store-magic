import { useState } from "react";
import { Link } from "react-router-dom";
import prelaunchHero from "@/assets/prelaunch-hero.jpg";
import { Instagram, Facebook, Twitter } from "lucide-react";

const PreLaunch = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Full-screen hero background */}
      <img
        src={prelaunchHero}
        alt="Baseline product family"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(215,50%,4%)/0.7] via-[hsl(215,50%,4%)/0.85] to-[hsl(215,50%,4%)/0.95]" />

      {/* Animated particles effect */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "48px 48px",
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 max-w-[720px] w-full gap-8 md:gap-10">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-primary">
            Coming Soon
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.9]">
            BASE<span className="text-primary">LINE</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-base md:text-lg text-white/60 max-w-[500px] leading-relaxed">
          Science-backed performance nutrition is almost here. Be the first to access clinically dosed formulas engineered for results.
        </p>

        {/* Launch discount badge */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-semibold text-white">
            Sign up now and get <span className="text-primary">20% OFF</span> your first order
          </span>
        </div>

        {/* Signup form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-[480px]">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 bg-white/5 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary transition-colors backdrop-blur-sm"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Get Early Access
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 px-8 py-6 border border-primary/30 bg-primary/5 backdrop-blur-sm rounded-lg">
            <span className="text-2xl">🎉</span>
            <p className="text-base font-semibold text-white">You're on the list!</p>
            <p className="text-sm text-white/50">We'll notify you with your exclusive 20% discount code at launch.</p>
          </div>
        )}

        {/* Extra perks */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-[500px] mt-4">
          {[
            { value: "20%", label: "Launch Discount" },
            { value: "VIP", label: "Early Access" },
            { value: "Free", label: "UK Shipping" },
          ].map((perk) => (
            <div key={perk.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-black text-primary">{perk.value}</span>
              <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">{perk.label}</span>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6 mt-4">
          <span className="text-xs text-white/30 uppercase tracking-wider">Follow us</span>
          <div className="flex gap-4">
            <a href="#" className="text-white/30 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-white/30 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-white/30 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Back to main site link (for demo) */}
        <Link to="/" className="text-xs text-white/20 hover:text-white/40 transition-colors mt-6">
          ← Back to main site
        </Link>
      </div>
    </div>
  );
};

export default PreLaunch;
