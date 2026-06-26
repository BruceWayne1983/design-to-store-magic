import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { ProductData } from "@/data/products";

const ExpectationsTimeline = ({ product }: { product: ProductData }) => {
  if (!product.expectations || product.expectations.length === 0) return null;
  return (
    <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-3">What To Expect</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground">
            From day one to long-term carry-over
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {product.expectations.map((exp, i) => (
            <motion.div
              key={exp.window}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative bg-secondary border border-border rounded-lg p-6 md:p-8 flex flex-col gap-4"
            >
              {i < (product.expectations!.length - 1) && (
                <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary z-10" />
              )}
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">{exp.window}</p>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground">{exp.headline}</h3>
              <ul className="flex flex-col gap-2 mt-1">
                {exp.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic border-t border-border pt-4 mt-auto">{exp.summary}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpectationsTimeline;
