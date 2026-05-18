import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Lock } from "lucide-react";

// Soft preview gate. The password is shipped in the client bundle either way,
// so this offers no real protection — set VITE_SITE_PASSWORD in the deploy
// environment so it can be rotated without a code change. For real access
// control, gate the deploy at the platform level (Vercel/Netlify password
// protection, Cloudflare Access).
const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "baseline2025";

const PasswordGate = () => {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem("site_unlocked") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem("site_unlocked", "true");
      setUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (unlocked) return <Outlet />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--hero-dark))] px-4">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "48px 48px",
      }} />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-[400px] w-full">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            BASE<span className="text-primary">LINE</span>
          </h1>
          <p className="text-sm text-white/40 uppercase tracking-[0.2em]">Private Preview</p>
        </div>

        {/* Lock icon */}
        <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center" aria-hidden="true">
          <Lock className="w-6 h-6 text-primary" />
        </div>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={`w-full px-5 py-3.5 bg-white/5 border text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary transition-colors backdrop-blur-sm ${
              error ? "border-red-500/60 animate-pulse" : "border-white/15"
            }`}
          />
          <button
            type="submit"
            className="w-full px-8 py-3.5 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Enter Site
          </button>
          {error && (
            <p className="text-xs text-red-400 text-center">Incorrect password. Please try again.</p>
          )}
        </form>

        <p className="text-xs text-white/20 text-center">
          This store is currently invite-only. Contact us for access.
        </p>
      </div>
    </div>
  );
};

export default PasswordGate;
