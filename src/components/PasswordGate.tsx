import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import logoLight from "@/assets/logo-light.png";

// Soft preview gate. The password is shipped in the client bundle either way,
// so this offers no real protection — set VITE_SITE_PASSWORD in the deploy
// environment so it can be rotated without a code change. For real access
// control, gate the deploy at the platform level (Vercel/Netlify password
// protection, Cloudflare Access).
const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "38475554";

const PasswordGate = () => {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem("site_unlocked") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem("site_unlocked", "true");
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2500);
    }
  };

  if (unlocked) return <Outlet />;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[hsl(var(--hero-dark))] flex items-center justify-center px-4">
      {/* Layered cinematic background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[440px]">
        <div className="flex flex-col items-center gap-8 bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          {/* Logo */}
          <img
            src={logoLight}
            alt="Baseline Nutrition"
            className="h-10 md:h-12 w-auto select-none"
            draggable={false}
          />

          {/* Status pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Private Preview
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-[0.02em] text-white leading-[0.95]">
              Invite-only<br />access
            </h1>
            <p className="text-sm text-white/55 max-w-[320px] leading-relaxed">
              Enter the access code to preview the Baseline Nutrition storefront, products and clinical research.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={`flex flex-col gap-3 w-full ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden="true" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access code"
                autoFocus
                aria-label="Access code"
                className={`w-full h-12 pl-11 pr-4 bg-white/[0.04] border text-white placeholder:text-white/30 text-sm rounded-md focus:outline-none focus:border-primary focus:bg-white/[0.06] transition-colors ${
                  error ? "border-red-400/60" : "border-white/15"
                }`}
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[0.18em] rounded-md hover:bg-primary/90 transition-colors"
            >
              Enter Store
            </button>
            {error && (
              <p className="text-xs text-red-400 text-center -mb-1">Incorrect code. Please try again.</p>
            )}
          </form>

          {/* Footer line */}
          <div className="w-full pt-2 border-t border-white/10">
            <p className="text-[11px] text-white/35 text-center leading-relaxed">
              Need access? Email{" "}
              <a href="mailto:hello@baselinenutrition.co.uk" className="text-primary/80 hover:text-primary underline-offset-4 hover:underline">
                hello@baselinenutrition.co.uk
              </a>
            </p>
          </div>
        </div>

        <p className="text-[10px] text-white/25 text-center mt-6 uppercase tracking-[0.25em]">
          Baseline Nutrition · UK
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
};

export default PasswordGate;
