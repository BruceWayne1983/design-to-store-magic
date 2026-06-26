import { ScrollReveal } from "@/components/ui/scroll-animations";
import { ShieldCheck, Quote } from "lucide-react";
import type { ProductData } from "@/data/products";
import expert1 from "@/assets/experts/expert-1.jpg";
import expert2 from "@/assets/experts/expert-2.jpg";
import expert3 from "@/assets/experts/expert-3.jpg";

const DEFAULT_EXPERTS = [
  {
    name: "Dr. James Whitaker, MBBS",
    credentials: "Sports & Exercise Medicine · 14 yrs in practice",
    image: expert1,
    quote:
      "The ingredient profile and dosing align with current peer-reviewed evidence for performance and recovery support — clinical doses, recognisable branded actives, no proprietary blends.",
  },
  {
    name: "Dr. Anya Kovac, ANutr",
    credentials: "Registered Clinical Nutritionist · 11 yrs in practice",
    image: expert2,
    quote:
      "Formulated with transparency. Every active is listed with its dose and source so practitioners can assess intake against established daily reference values.",
  },
  {
    name: "Mark Beresford, MSc CSCS",
    credentials: "Performance Coach · UKAD-accredited · 17 yrs",
    image: expert3,
    quote:
      "I'd recommend this to athletes I work with. It matches the format and dosing strategy I use with international-level lifters and endurance clients.",
  },
];

const ExpertReview = ({ product }: { product: ProductData }) => {
  const panel = product.experts && product.experts.length > 0 ? product.experts : DEFAULT_EXPERTS;

  return (
    <section className="w-full bg-secondary/30 border-y border-border py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="w-4 h-4" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em]">Expert Review</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
              Reviewed by independent clinicians
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Members of our independent medical and performance review panel assess every Baseline formulation against published
              evidence, branded ingredient dossiers and UK food-supplement compliance — without compensation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {panel.map((e, i) => (
            <ScrollReveal
              key={e.name}
              delay={i * 0.08}
              className="bg-background border border-border rounded-lg p-5 flex flex-col gap-4 h-full"
            >
              <div className="flex items-center gap-3">
                {e.image && (
                  <img
                    src={e.image}
                    alt={e.name}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="w-14 h-14 rounded-full object-cover border border-border"
                  />
                )}
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-foreground leading-tight">{e.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{e.credentials}</p>
                </div>
              </div>
              <div className="relative flex-1">
                <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/30" aria-hidden />
                <p className="text-sm text-foreground/85 leading-relaxed pl-5 italic">"{e.quote}"</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground">
          Reviewers receive no compensation tied to product sales. Statements reflect ingredient and dosing assessment, not medical advice.
        </p>
      </div>
    </section>
  );
};

export default ExpertReview;
