import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ui/scroll-animations";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  reviewer_name: string;
  verified: boolean;
  created_at: string;
}

interface Props {
  productSlug: string;
  productName: string;
}

const PAGE_SIZE = 5;

const StarRow = ({ value, size = "w-4 h-4", onPick }: { value: number; size?: string; onPick?: (v: number) => void }) => (
  <div className="flex gap-0.5" role={onPick ? "radiogroup" : "img"} aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <button
        key={i}
        type="button"
        disabled={!onPick}
        onClick={() => onPick?.(i)}
        className={onPick ? "cursor-pointer" : "cursor-default"}
        aria-label={`${i} star${i > 1 ? "s" : ""}`}
      >
        <Star className={`${size} ${i <= value ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
      </button>
    ))}
  </div>
);

const ProductReviews = ({ productSlug, productName }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // form state
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("product_reviews")
      .select("id,rating,title,body,reviewer_name,verified,created_at")
      .eq("product_slug", productSlug)
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) console.error("Failed to load reviews", error);
        setReviews((data as Review[]) ?? []);
        setLoading(false);
      });
    return () => { active = false; };
  }, [productSlug]);

  const { avg, total, distribution } = useMemo(() => {
    const total = reviews.length;
    if (!total) return { avg: 0, total: 0, distribution: [0, 0, 0, 0, 0] };
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    const dist = [5, 4, 3, 2, 1].map((n) => reviews.filter((r) => r.rating === n).length);
    return { avg: sum / total, total, distribution: dist };
  }, [reviews]);

  const visible = reviews.slice(0, page * PAGE_SIZE);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || body.trim().length < 10) {
      toast.error("Please complete all required fields (review must be at least 10 characters).");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("product_reviews").insert({
      product_slug: productSlug,
      rating,
      title: title.trim() || null,
      body: body.trim(),
      reviewer_name: name.trim(),
      reviewer_email: email.trim(),
      approved: false,
      verified: false,
    });
    setSubmitting(false);
    if (error) {
      console.error(error);
      toast.error("We couldn't submit your review. Please try again.");
      return;
    }
    toast.success("Thanks — your review is pending moderation.");
    setOpen(false);
    setRating(5); setName(""); setEmail(""); setTitle(""); setBody("");
  };

  return (
    <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <ScrollReveal className="max-w-[1280px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">Customer Reviews</h2>
            <div className="flex items-center gap-3">
              <StarRow value={Math.round(avg)} />
              <span className="text-sm text-muted-foreground">
                {total > 0 ? `${avg.toFixed(1)} out of 5 · ${total} review${total === 1 ? "" : "s"}` : "No reviews yet"}
              </span>
            </div>
            {total > 0 && (
              <div className="flex flex-col gap-1 max-w-xs">
                {[5, 4, 3, 2, 1].map((star, i) => {
                  const count = distribution[i];
                  const pct = total ? (count / total) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-6 tabular-nums">{star}★</span>
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-6 text-right tabular-nums">{count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="uppercase tracking-[0.15em] font-bold text-xs">Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="uppercase tracking-tight">Review {productName}</DialogTitle>
              </DialogHeader>
              <form onSubmit={submit} className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground">Your rating</label>
                  <StarRow value={rating} size="w-6 h-6" onPick={setRating} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input type="email" placeholder="Email (not shown) *" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <Input placeholder="Review title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
                <Textarea
                  placeholder="Tell others what you thought (min 10 characters)..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={5}
                  required
                  minLength={10}
                  maxLength={4000}
                />
                <p className="text-[11px] text-muted-foreground">Reviews are moderated before they appear publicly. We never publish your email.</p>
                <Button type="submit" disabled={submitting} className="uppercase tracking-[0.15em] font-bold text-xs">
                  {submitting ? "Submitting..." : "Submit review"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading reviews...</p>
        ) : total === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10 border border-dashed border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Be the first to review {productName}.</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border">
            {visible.map((r) => (
              <article key={r.id} className="py-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <StarRow value={r.rating} />
                  {r.title && <h3 className="text-sm font-bold text-foreground">{r.title}</h3>}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="font-semibold text-foreground">{r.reviewer_name}</span>
                  {r.verified && <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Verified buyer</span>}
                  <span>· {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{r.body}</p>
              </article>
            ))}
            {visible.length < total && (
              <div className="pt-6 flex justify-center">
                <Button variant="outline" onClick={() => setPage(page + 1)} className="uppercase tracking-wider text-xs font-bold">
                  Show more reviews
                </Button>
              </div>
            )}
          </div>
        )}
      </ScrollReveal>
    </section>
  );
};

export default ProductReviews;
