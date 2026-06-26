import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CinematicBandProps {
  label: string;
  headline: string;
  desc?: string;
  cta: string;
  link: string;
  image: string;
  align?: "left" | "right";
  accent?: string;
}

const CinematicBand = ({ label, headline, desc, cta, link, image, align = "left", accent = "#3B82F6" }: CinematicBandProps) => {
  const isRight = align === "right";
  return (
    <section className="w-full relative overflow-hidden min-h-[420px] md:min-h-[520px] flex items-center">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div
        className={`absolute inset-0 ${
          isRight
            ? "bg-gradient-to-l from-[hsl(var(--hero-dark))] via-[hsl(var(--hero-dark)/0.85)] to-[hsl(var(--hero-dark)/0.3)]"
            : "bg-gradient-to-r from-[hsl(var(--hero-dark))] via-[hsl(var(--hero-dark)/0.85)] to-[hsl(var(--hero-dark)/0.3)]"
        }`}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className={`flex flex-col gap-5 md:gap-6 max-w-[540px] ${isRight ? "ml-auto items-end text-right" : ""}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px]" style={{ backgroundColor: accent }} />
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>{label}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.05]">{headline}</h2>
          {desc && <p className="text-base md:text-lg text-white/80 leading-relaxed">{desc}</p>}
          <Link
            to={link}
            className="self-start mt-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
            style={isRight ? { alignSelf: "flex-end" } : undefined}
          >
            {cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicBand;
