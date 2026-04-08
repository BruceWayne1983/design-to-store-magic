import { useState } from "react";
import { Link } from "react-router-dom";
import prelaunchHero from "@/assets/prelaunch-hero-v2.jpg";
import logoLight from "@/assets/logo-light.png";
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
      {/* Subtle top/bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(215,50%,4%)/0.6] via-[hsl(215,50%,4%)/0.3] to-[hsl(215,50%,4%)/0.9]" />
      {/* Radial vignette for extra depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,hsl(215,50%,4%)_80%)]" />

      {/* Animated particles effect */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "48px 48px",
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 max-w-[720px] w-full gap-8 md:gap-10">
        {/* Logo / Brand */}
         <div className="flex flex-col items-center gap-4">
           <span className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-primary">
             Coming Soon
           </span>
           <img
             src={logoLight}
             alt="Baseline Nutrition"
             className="h-12 md:h-16 lg:h-20 w-auto drop-shadow-[0_0_24px_hsl(var(--primary)/0.5)] [filter:drop-shadow(0_0_48px_hsl(var(--primary)/0.25))_drop-shadow(0_0_12px_hsl(var(--primary)/0.4))]"
           />
         </div>

        {/* Tagline */}
         <p className="text-base md:text-lg text-white/80 max-w-[500px] leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
           Science-backed performance nutrition is almost here. Be the first to access clinically dosed formulas engineered for results.
         </p>

        {/* Launch discount badge */}
         <div className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-md shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
           <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
           <span className="text-sm font-semibold text-white/90">
             Sign up now and get <span className="text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">20% OFF</span> your first order
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
              className="flex-1 px-5 py-3.5 bg-white/[0.08] border border-white/30 rounded text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all backdrop-blur-sm"
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
            <span className="text-2xl">✓</span>
            <p className="text-base font-semibold text-white">You're on the list!</p>
            <p className="text-sm text-white/50">We'll notify you with your exclusive 20% discount code at launch.</p>
          </div>
        )}

        {/* Extra perks */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-[560px] mt-4">
          {[
            { value: "20%", label: "Launch Discount" },
            { value: "VIP", label: "Early Access" },
            { value: "Free", label: "UK Shipping" },
          ].map((perk) => (
            <div
              key={perk.label}
               className="relative flex flex-col items-center gap-2 py-5 px-3 rounded-xl border border-primary/30 bg-primary/[0.1] backdrop-blur-md overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-[0_0_16px_hsl(var(--primary)/0.1)]"
             >
               <div className="absolute inset-0 bg-gradient-to-b from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               <span className="text-3xl md:text-4xl font-black text-primary drop-shadow-[0_0_16px_hsl(var(--primary)/0.5)]">{perk.value}</span>
               <span className="text-[10px] md:text-xs text-white/70 uppercase tracking-[0.15em] font-semibold">{perk.label}</span>
            </div>
          ))}
        </div>

        {/* Social links */}
         <div className="flex items-center gap-6 mt-4">
           <span className="text-xs text-white/50 uppercase tracking-wider font-medium">Follow us</span>
           <div className="flex gap-4">
             <a href="#" className="text-white/50 hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all"><Instagram className="w-5 h-5" /></a>
             <a href="#" className="text-white/50 hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all"><Facebook className="w-5 h-5" /></a>
             <a href="#" className="text-white/50 hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all"><Twitter className="w-5 h-5" /></a>
           </div>
         </div>

         {/* Back to main site link (for demo) */}
         <Link to="/" className="text-sm text-white/40 hover:text-primary border border-white/15 hover:border-primary/40 px-6 py-2.5 rounded-full transition-all duration-300 mt-6 backdrop-blur-sm">
            Enter Store →
         </Link>
      </div>
    </div>
  );
};

export default PreLaunch;
