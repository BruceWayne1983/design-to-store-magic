import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-animations";
import type { ProductData } from "@/data/products";

const ProductFAQ = ({ product }: { product: ProductData }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full bg-secondary py-16 px-4 md:py-28 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto flex flex-col gap-8 md:gap-12">
        <ScrollReveal>
          <div className="flex flex-col gap-3 md:gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">FAQ</h2>
            <p className="text-base md:text-lg text-muted-foreground">Common questions about {product.name}</p>
          </div>
        </ScrollReveal>
        <div className="flex flex-col">
          {product.faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="border-b border-border">
                <button className="w-full flex items-center justify-between py-4 md:py-5 text-left gap-4" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="text-sm md:text-base font-semibold text-foreground">{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}><ChevronDown className="w-5 h-5 text-primary flex-shrink-0" /></motion.div>
                </button>
                {open === i && <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="pb-4 md:pb-5 text-sm md:text-base text-muted-foreground">{faq.a}</motion.p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div>
            <h4 className="text-base md:text-lg font-bold text-foreground">Still have questions?</h4>
            <p className="text-sm md:text-base text-muted-foreground mt-1">Contact our <Link to="/contact" className="text-primary underline">support team</Link>.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProductFAQ;
