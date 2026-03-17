import { Link } from "react-router-dom";

interface PromoBannerProps {
  label: string;
  headline: string;
  cta: string;
  link: string;
  align?: "left" | "center" | "right";
}

const PromoBanner = ({ label, headline, cta, link, align = "left" }: PromoBannerProps) => {
  const alignClass = align === "center" ? "items-center text-center" : align === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <section className="w-full bg-[hsl(var(--hero-dark))] relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />
      <div className={`max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24 flex flex-col gap-5 ${alignClass} relative z-10`}>
        <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">{label}</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
          {headline}
        </h2>
        <Link
          to={link}
          className="mt-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
};

export default PromoBanner;
