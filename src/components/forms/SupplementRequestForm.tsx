import { useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  product: z.string().trim().min(2, "Tell us what you'd like to see").max(160),
  reason: z.string().trim().min(5, "A short reason helps us prioritise").max(1000),
  currently_using: z.string().trim().max(160).optional(),
});

const SupplementRequestForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [reason, setReason] = useState("");
  const [currentlyUsing, setCurrentlyUsing] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const parsed = schema.safeParse({ name, email, product, reason, currently_using: currentlyUsing });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("product_feedback").insert({
        kind: "request",
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        source: "supplement-request",
        payload: {
          product: parsed.data.product,
          reason: parsed.data.reason,
          currently_using: parsed.data.currently_using ?? null,
        },
      });
      if (error) throw error;
      // Mirror into newsletter capture for retargeting
      await supabase.from("email_signups").insert({
        email: parsed.data.email.toLowerCase(),
        source: "supplement-request",
      });
      setDone(true);
      toast.success("Request received — thank you.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-start gap-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Check className="w-5 h-5" /> Request received
        </div>
        <p className="text-sm text-muted-foreground">
          Thanks — every suggestion shapes our launch pipeline. We'll email you when something matching lands.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sr-name" className="text-sm font-medium">Your name</label>
            <Input id="sr-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sr-email" className="text-sm font-medium">Email</label>
            <Input id="sr-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} required />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sr-product" className="text-sm font-medium">What supplement would you like to see next?</label>
          <Input id="sr-product" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. Creatine HCL, Sleep stack, Vegan EAA" maxLength={160} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sr-reason" className="text-sm font-medium">Why? What problem does it solve for you?</label>
          <textarea
            id="sr-reason"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={1000}
            placeholder="Tell us the use-case, goal, or gap in the market…"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sr-using" className="text-sm font-medium">What are you using right now? <span className="text-muted-foreground font-normal">(optional)</span></label>
          <Input id="sr-using" value={currentlyUsing} onChange={(e) => setCurrentlyUsing(e.target.value)} placeholder="Brand and product name" maxLength={160} />
        </div>
        <Button type="submit" disabled={loading} className="w-full uppercase tracking-wider font-bold">
          {loading ? "Sending…" : "Submit request"}
        </Button>
        <p className="text-xs text-muted-foreground">
          We read every submission. Top-voted suggestions enter our R&D pipeline.
        </p>
      </form>
    </div>
  );
};

export default SupplementRequestForm;
