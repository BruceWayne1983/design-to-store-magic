import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What makes your formulas different?", a: "Our formulas are backed by peer-reviewed research and use clinically effective dosages of every ingredient." },
  { q: "How should I use the protocols?", a: "Each protocol comes with a detailed guide. Follow the recommended timing and dosage for optimal results." },
  { q: "Do you offer international shipping?", a: "Yes, we ship to over 40 countries worldwide with tracked shipping options." },
  { q: "Can I customize my protocol?", a: "Absolutely. Take our assessment to get a personalized protocol recommendation based on your goals." },
  { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-3 md:gap-4">
          <h2 className="text-3xl md:text-5xl font-black leading-[1.1] text-foreground uppercase tracking-tight">FAQs</h2>
          <p className="text-base md:text-lg text-muted-foreground">Everything you need to know about our products and protocols.</p>
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
