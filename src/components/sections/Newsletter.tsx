import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ResultState = "idle" | "subscribed" | "already";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<ResultState>("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError("");
    try {
      const { error: dbError } = await supabase
        .from("email_signups")
        .insert({ email: email.trim().toLowerCase(), source: "newsletter" });
      if (dbError) {
        if (dbError.code === "23505") {
          setResult("already");
        } else {
          throw dbError;
        }
      } else {
        setResult("subscribed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitted = result !== "idle";

  return (
    <section className="w-full bg-[hsl(215,50%,8%)] py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="text-3xl md:text-5xl font-black leading-[1.1] text-white uppercase tracking-tight">
            Ingredient briefings, by email
          </h2>
          <p className="text-base md:text-lg text-white/70">
            A short read every other Sunday: one active, the trial data behind it, and how we use it in our formulas. No sales emails between.
          </p>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-3 md:gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary rounded text-sm md:text-base"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium hover:opacity-90 transition-opacity rounded disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Subscribe"}
            </button>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </form>
        ) : (
          <div className="flex items-center gap-2 text-primary font-semibold">
            <span>✓</span>
            {result === "already" ? "You're already on the list." : "You're subscribed!"}
          </div>
        )}
        <p className="text-xs md:text-sm text-white/40">By subscribing you agree to our Privacy Policy and consent to receive updates.</p>
      </div>
    </section>
  );
};

export default Newsletter;
