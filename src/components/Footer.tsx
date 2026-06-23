import { Link } from "react-router-dom";
import { BRAND_NAME, BRAND_ADDRESS, BRAND_TAGLINE, activeSocialLinks } from "@/data/brand";
import logoLight from "@/assets/logo-light.png";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Stacks & Bundles", href: "/bundles" },
      { label: "Performance Range", href: "/category/performance" },
      { label: "Knowledge Base", href: "/knowledge-base" },
      { label: "The App", href: "/app" },
    ],
  },
  {
    title: "Science",
    links: [
      { label: "Articles", href: "/blog" },
      { label: "Ingredient Insights (PDF)", href: "/ingredient-insights" },
      { label: "Ingredient Science", href: "/blog?category=ingredient-science" },
      { label: "Protocol Guides", href: "/blog?category=protocol-guides" },
      { label: "Mechanisms", href: "/blog?category=mechanisms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const Footer = () => {
  const socials = activeSocialLinks();

  return (
    <footer className="w-full bg-[hsl(var(--hero-dark))] text-white py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-black uppercase tracking-tight">{BRAND_NAME}</span>
            <p className="text-sm text-white/50 max-w-[260px] leading-relaxed">
              {BRAND_TAGLINE} Clinically dosed, fully transparent.
            </p>
            <div className="text-xs text-white/30 leading-relaxed max-w-[260px]">
              <p>{BRAND_ADDRESS.line1}</p>
              <p>{BRAND_ADDRESS.line2}</p>
              <p>{BRAND_ADDRESS.country}</p>
            </div>
            {socials.length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/40 hover:text-primary transition-colors"
                      aria-label={s.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-16">
            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">{group.title}</span>
                {group.links.map((link) => (
                  <Link key={link.label} to={link.href} className="text-sm text-white/40 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="border-t border-white/10 pt-6 md:pt-8 text-xs text-white/30 leading-relaxed">
          Food supplements should not be used as a substitute for a varied, balanced diet and a healthy lifestyle.
          Our products are not intended to diagnose, treat, cure, or prevent any disease. Consult your doctor before use
          if you are pregnant, breastfeeding, taking medication, or have a medical condition. Keep out of reach of children.
        </p>

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/30">
          <span>© 2026 {BRAND_NAME}. All rights reserved.</span>
          <div className="flex gap-4 md:gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
