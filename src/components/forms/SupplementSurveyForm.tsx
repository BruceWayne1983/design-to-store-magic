import { useState } from "react";
import { z } from "zod";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const DISCOUNT_CODE = "INSIGHT10";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  primary_goal: z.string().min(1, "Pick a goal"),
  current_brands: z.string().trim().max(300).optional(),
  monthly_spend: z.string().min(1, "Pick a range"),
  buying_factor: z.string().min(1, "Pick what matters most"),
  missing_product: z.string().trim().max(400).optional(),
  switch_reason: z.string().trim().max(400).optional(),
});

const goals = ["Performance / strength", "Endurance", "Recovery / sleep", "Body composition", "General health"];
const spends = ["Under £30", "£30–£60", "£60–£120", "£120+"];
const factors = ["Clinical dosing", "Ingredient transparency", "Price", "Brand trust", "Flavour", "Subscription value"];

const SupplementSurveyForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    primary_goal: "",
    current_brands: "",
    monthly_spend: "",
    buying_factor: "",
    missing_product: "",
    switch_reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your answers");
      return;
    }
    setLoading(true);
    try {
      const { name, email, ...payload } = parsed.data;
      const { error } = await supabase.from("product_feedback").insert({
        kind: "survey",
        name,
        email: email.toLowerCase(),
        source: "discount-survey",
        payload,
      });
      if (error) throw error;
      await supabase.from("email_signups").insert({
        email: email.toLowerCase(),
        source: "discount-survey",
      });
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      toast.success("Code copied");
    } catch {
      toast.error("Couldn't copy — select and copy manually");
    }
  };

  if (done) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Check className="w-5 h-5" /> Thank you — here is your 10% off
        </div>
        <p className="text-sm text-muted-foreground">
          Apply this code at checkout. Valid on a single order, excludes already-discounted bundles.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-3 rounded-md border-2 border-dashed border-primary bg-primary/5 font-mono font-bold tracking-[0.3em] text-lg text-primary">
            {DISCOUNT_CODE}
          </div>
          <Button type="button" variant="outline" onClick={copyCode} className="gap-2">
            <Copy className="w-4 h-4" /> Copy code
          </Button>
          <Button type="button" asChild className="uppercase font-bold tracking-wider">
            <a href="/shop">Shop now</a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">We've also emailed it to {form.email}.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sv-name" className="text-sm font-medium">Your name</label>
            <Input id="sv-name" value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={80} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sv-email" className="text-sm font-medium">Email <span className="text-muted-foreground font-normal">(code sent here)</span></label>
            <Input id="sv-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} required />
          </div>
        </div>

        <SelectChips
          label="What's your primary training goal?"
          options={goals}
          value={form.primary_goal}
          onChange={(v) => update("primary_goal", v)}
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sv-brands" className="text-sm font-medium">Which supplement brands do you currently use? <span className="text-muted-foreground font-normal">(optional)</span></label>
          <Input id="sv-brands" value={form.current_brands} onChange={(e) => update("current_brands", e.target.value)} placeholder="e.g. Optimum Nutrition, MyProtein, Bulk…" maxLength={300} />
        </div>

        <SelectChips
          label="Roughly how much do you spend on supplements per month?"
          options={spends}
          value={form.monthly_spend}
          onChange={(v) => update("monthly_spend", v)}
        />

        <SelectChips
          label="What matters most when you buy a supplement?"
          options={factors}
          value={form.buying_factor}
          onChange={(v) => update("buying_factor", v)}
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sv-missing" className="text-sm font-medium">What's missing from the supplements you've tried?</label>
          <textarea
            id="sv-missing"
            rows={3}
            value={form.missing_product}
            onChange={(e) => update("missing_product", e.target.value)}
            maxLength={400}
            placeholder="Underdosed ingredients, fillers, taste, price…"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sv-switch" className="text-sm font-medium">What would make you switch brands?</label>
          <textarea
            id="sv-switch"
            rows={3}
            value={form.switch_reason}
            onChange={(e) => update("switch_reason", e.target.value)}
            maxLength={400}
            placeholder="Clinical doses, 3rd-party testing, better flavour, subscription perks…"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full uppercase tracking-wider font-bold">
          {loading ? "Sending…" : "Unlock 10% off"}
        </Button>
        <p className="text-xs text-muted-foreground">
          One submission per email. Code revealed on the next screen and emailed to you.
        </p>
      </form>
    </div>
  );
};

const SelectChips = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-medium">{label}</span>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-3 py-2 text-sm rounded-full border transition-colors ${
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-input hover:border-primary"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

export default SupplementSurveyForm;
