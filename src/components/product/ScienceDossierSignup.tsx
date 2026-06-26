import { useState } from "react";
import { z } from "zod";
import { Check, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { ProductData } from "@/data/products";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

const ScienceDossierSignup = ({ product }: { product: ProductData }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your email");
      return;
    }
    setLoading(true);
    try {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("klaviyo:science-dossier", {
            detail: { email: parsed.data.email, sku: product.slug, product: product.name },
          })
        );
      }
      const { error } = await supabase
        .from("email_signups")
        .insert({
          email: parsed.data.email.toLowerCase(),
          source: `science-dossier:${product.slug}`,
        });
      if (error && error.code !== "23505") throw error;
      setDone(true);
      toast.success("Dossier on its way — check your inbox shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-secondary py-14 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center bg-background border border-border rounded-2xl p-6 md:p-10 lg:p-12 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-widest">
              <FileText className="w-4 h-4" />
              Ingredient Insights · PDF Dossier
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight tracking-tight uppercase">
              Want the full science behind {product.name}?
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Sign up for Ingredient Insights and we'll email you the in-depth scientific review of this SKU — every active,
              dose, mechanism and supporting study referenced — delivered as a PDF straight to your inbox.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-foreground/80 mt-1">
              {[
                "Clinical dose breakdown",
                "Mechanism of action",
                "Referenced study list",
                "Stacking & timing guide",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {done ? (
            <div className="flex flex-col items-start gap-3 bg-secondary border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Check className="w-5 h-5" /> You're on the list
              </div>
              <p className="text-sm text-muted-foreground">
                Your {product.name} dossier is being prepared and will arrive shortly. You'll also receive future Ingredient
                Insights as new research drops.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="dossier-email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Email me the PDF
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="dossier-email"
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="pl-9 h-12"
                />
              </div>
              <Button type="submit" disabled={loading} className="h-12 uppercase tracking-wider font-bold">
                {loading ? "Sending…" : `Send me the ${product.name} dossier`}
              </Button>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                One email per dossier plus our weekly Ingredient Insights. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScienceDossierSignup;
