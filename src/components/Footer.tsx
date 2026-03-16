const footerLinks = [
  { title: "Products", links: ["Pre-workout", "Recovery", "Daily", "Stacks"] },
  { title: "Science", links: ["Research", "Articles", "Ingredients", "Testing"] },
  { title: "Company", links: ["About", "Team", "Careers", "Press"] },
  { title: "Support", links: ["FAQ", "Shipping", "Returns", "Contact"] },
];

const Footer = () => (
  <footer className="w-full bg-foreground text-background py-16 px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
      <div className="flex justify-between">
        <span className="text-xl font-bold">Baseline</span>
        <div className="grid grid-cols-4 gap-16">
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <span className="text-sm font-semibold">{group.title}</span>
              {group.links.map((link) => (
                <a key={link} href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-background/20 pt-8 flex justify-between text-sm opacity-70">
        <span>© 2026 Baseline. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:opacity-100">Privacy Policy</a>
          <a href="#" className="hover:opacity-100">Terms of Service</a>
          <a href="#" className="hover:opacity-100">Cookie Settings</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
