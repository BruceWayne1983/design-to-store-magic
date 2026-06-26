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
  topic: z.string().trim().min(2, "Tell us the topic").max(120),
  question: z.string().trim().max(1000).optional(),
});

type RequestArticleFormProps = {
  source: string;
  topicLabel?: string;
  topicPlaceholder?: string;
  submitLabel?: string;
};

const RequestArticleForm = ({
  source,
  topicLabel = "Product or ingredient",
  topicPlaceholder = "e.g. 'Beta-Alanine' or 'XYZ Pre-Workout'",
  submitLabel = "Submit request",
}: RequestArticleFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const parsed = schema.safeParse({ name, email, topic, question });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setLoading(true);
    try {
      // Fire a custom event so a Klaviyo bridge (added later with API key + list ID) can pick this up.
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("klaviyo:article-request", { detail: { ...parsed.data, source } })
        );
      }
      // Backup capture into existing email list so no lead is lost while Klaviyo is wired up.
      const { error } = await supabase
        .from("email_signups")
        .insert({ email: parsed.data.email.toLowerCase(), source: `article-request:${source}` });
      if (error && error.code !== "23505") throw error;
      setDone(true);
      toast.success("Request received — we'll be in touch.");
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
          Thanks {parsedName(name)} — our team reviews every request and replies with an evidence-backed breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="req-name" className="text-sm font-medium text-foreground">Your name</label>
          <Input id="req-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex" maxLength={80} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="req-email" className="text-sm font-medium text-foreground">Email</label>
          <Input id="req-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" maxLength={255} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="req-topic" className="text-sm font-medium text-foreground">{topicLabel}</label>
          <Input id="req-topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={topicPlaceholder} maxLength={120} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="req-question" className="text-sm font-medium text-foreground">What do you want to know? <span className="text-muted-foreground font-normal">(optional)</span></label>
          <textarea
            id="req-question"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={1000}
            placeholder="Paste the label, list the ingredients, or ask a question..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full uppercase tracking-wider font-bold">
          {loading ? "Sending…" : submitLabel}
        </Button>
        <p className="text-xs text-muted-foreground">
          Our team reviews every request and responds with a clear, evidence-backed breakdown.
        </p>
      </form>
    </div>
  );
};

const parsedName = (n: string) => n.trim().split(" ")[0] || "athlete";

export default RequestArticleForm;
