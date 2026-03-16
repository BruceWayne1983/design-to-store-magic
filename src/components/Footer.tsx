const footerLinks = [
  { title: "Products", links: ["Pre-workout", "Recovery", "Daily", "Stacks"] },
  { title: "Science", links: ["Research", "Articles", "Ingredients", "Testing"] },
  { title: "Company", links: ["About", "Team", "Careers", "Press"] },
  { title: "Support", links: ["FAQ", "Shipping", "Returns", "Contact"] },
];

const Footer = () => (
  <footer className="w-full bg-[hsl(215,50%,8%)] text-white py-12 md:py-16 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        <span className="text-xl font-black uppercase tracking-tight">Baseline</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-16">
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <span className="text-sm font-semibold">{group.title}</span>
              {group.links.map((link) => (
                <a key={link} href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-white/40">
        <span>© 2026 Baseline. All rights reserved.</span>
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Cookie Settings</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
