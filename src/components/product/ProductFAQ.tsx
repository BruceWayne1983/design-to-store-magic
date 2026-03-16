import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "When should I take GLYCO8?", a: "Take 2 capsules 15-30 minutes before your highest carbohydrate meal of the day. For enhanced results, split dosing across two high-carb meals." },
  { q: "Can I stack GLYCO8 with other supplements?", a: "Yes. GLYCO8 pairs exceptionally well with FUSION BLACK pre-workout and GLYCOSHIFT intra-workout for comprehensive carbohydrate management." },
  { q: "How quickly will I notice results?", a: "Most users report improved muscle fullness and reduced bloating within the first 3-5 days. Measurable glucose response changes typically appear within 2 weeks of consistent use." },
  { q: "Is GLYCO8 suitable for diabetics?", a: "GLYCO8 is designed for healthy individuals. If you have diabetes or any metabolic condition, consult your healthcare provider before use." },
  { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not happy with your results, contact us for a full refund." },
];

const ProductFAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full bg-secondary py-16 px-4 md:py-28 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-3 md:gap-4">
          <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">FAQ</h2>
          <p className="text-base md:text-lg text-muted-foreground">Common questions about GLYCO8™</p>
        </div>
        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button className="w-full flex items-center justify-between py-4 md:py-5 text-left gap-4" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-sm md:text-base font-semibold text-foreground">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="pb-4 md:pb-5 text-sm md:text-base text-muted-foreground">{faq.a}</p>}
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-base md:text-lg font-bold text-foreground">Still have questions?</h4>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Contact our <a href="#" className="text-primary underline">support team</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductFAQ;
