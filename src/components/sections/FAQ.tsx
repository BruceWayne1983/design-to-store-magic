import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What makes your formulas different from a mainstream brand?", a: "We dose every active at the level used in the human trial we reference on the product page. No proprietary blends, no fractional gesture doses, no fillers added to bulk out a label." },
  { q: "How do I use a stack?", a: "Each product page lists timing and dose. As a default: pre-workout 20 minutes before training, intra-workout sipped through the session, capsules taken with food." },
  { q: "Do you ship outside the UK?", a: "Yes. Tracked delivery to over 40 countries. Duties and taxes are calculated at checkout for non-UK destinations." },
  { q: "Is there guidance for my goals?", a: "The Stack Systems page groups products by training objective. For more individual advice, the Baseline AI Coach (launching with the app) handles programming and supplementation in one place." },
  { q: "What's the returns policy?", a: "30 days. Unopened tubs are refunded in full; opened tubs are refunded less the cost of the tub used. Contact us before returning." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-3 md:gap-4">
          <h2 className="text-3xl md:text-5xl font-black leading-[1.1] text-foreground uppercase tracking-tight">Common questions</h2>
          <p className="text-base md:text-lg text-muted-foreground">Formulation, dosing, delivery and returns.</p>
        </div>
        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                className="w-full flex items-center justify-between py-4 md:py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm md:text-base font-semibold text-foreground">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="pb-4 md:pb-5 text-sm md:text-base text-muted-foreground">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-base md:text-lg font-bold text-foreground">Need more help?</h4>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Contact our <Link to="/contact" className="text-primary underline">support team</Link> for personalised assistance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
