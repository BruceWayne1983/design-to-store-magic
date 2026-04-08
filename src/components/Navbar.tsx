import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";
import logoDark from "@/assets/logo-dark.png";

const shopItems = [
  { name: "Performance Supplements", desc: "Pre-workout, pump and endurance formulas", link: "/site/category/performance" },
  { name: "Metabolic Support", desc: "Glucose disposal and metabolic optimisers", link: "/site/shop" },
  { name: "Health & Hydration", desc: "Electrolyte and hydration support", link: "/site/shop" },
];

const stackItems = [
  { name: "Performance Stack", desc: "Fusion Lite+ + VASCUL8 for training intensity" },
  { name: "Metabolic Stack", desc: "GLYCO8 + GLYCOSHIFT for body composition" },
  { name: "Hydration Stack", desc: "Electro Flow + H2O GO for full hydration" },
];

const scienceItems = [
  { name: "AMPK Activation", desc: "Cellular energy and glucose metabolism" },
  { name: "Nitric Oxide Signalling", desc: "Vasodilation and nutrient delivery" },
  { name: "Metabolic Partitioning", desc: "Glucose disposal and nutrient uptake" },
];

const mobileNavSections = [
  {
    title: "Shop",
    items: [
      { name: "Shop All", link: "/shop" },
      { name: "Performance", link: "/category/performance" },
      { name: "Metabolic", link: "/shop" },
      { name: "Health & Hydration", link: "/shop" },
    ],
  },
  {
    title: "Stacks",
    items: [
      { name: "Performance Stack", link: "#" },
      { name: "Metabolic Stack", link: "#" },
      { name: "Hydration Stack", link: "#" },
    ],
  },
  {
    title: "Science",
    items: [
      { name: "AMPK Activation", link: "#" },
      { name: "Nitric Oxide", link: "#" },
      { name: "Metabolic Partitioning", link: "#" },
    ],
  },
];

const Navbar = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`w-full border-b border-border bg-background sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
        <div className={`flex items-center justify-between px-4 md:px-8 lg:px-16 transition-all duration-300 ${scrolled ? "h-[52px] md:h-[56px]" : "h-[60px] md:h-[72px]"}`}>
          {/* Left */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="flex items-center">
              <img src={logoDark} alt="Baseline Nutrition" className={`w-auto transition-all duration-300 ${scrolled ? "h-8 md:h-8" : "h-10 md:h-12"}`} />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/shop" className="text-sm text-foreground hover:text-primary transition-colors font-medium">Shop</Link>
              <Link to="/category/performance" className="text-sm text-foreground hover:text-primary transition-colors font-medium">Performance</Link>
              <a href="#" className="text-sm text-foreground hover:text-primary transition-colors font-medium">Stacks</a>
              <a href="#" className="text-sm text-foreground hover:text-primary transition-colors font-medium">Science</a>
              <button
                className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMegaOpen(!megaOpen)}
              >
                More <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setSearchOpen(true)} className="p-2.5 hover:bg-secondary rounded-lg transition-colors" aria-label="Search">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <a href="#" className="hidden md:flex p-2.5 hover:bg-secondary rounded-lg transition-colors" aria-label="Account">
              <User className="w-5 h-5 text-foreground" />
            </a>
            <button onClick={() => setCartOpen(true)} className="relative p-2.5 hover:bg-secondary rounded-lg transition-colors" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center leading-none">2</span>
            </button>
            <button className="md:hidden p-2.5 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop mega menu */}
        {megaOpen && (
          <div className="hidden md:flex border-t border-border bg-background">
            <div className="flex flex-1 gap-8 px-8 lg:px-16 py-8">
              <div className="flex-1 flex flex-col gap-4">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Shop by Category</span>
                <div className="flex flex-col gap-3">
                  {shopItems.map((item) => (
                    <Link key={item.name} to={item.link} className="flex gap-3 py-1.5 group" onClick={() => setMegaOpen(false)}>
                      <div className="w-6 h-6 bg-primary/10 rounded flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Stack Systems</span>
                <div className="flex flex-col gap-3">
                  {stackItems.map((item) => (
                    <a key={item.name} href="#" className="flex gap-3 py-1.5 group">
                      <div className="w-6 h-6 bg-primary/10 rounded flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">The Science</span>
                <div className="flex flex-col gap-3">
                  {scienceItems.map((item) => (
                    <a key={item.name} href="#" className="flex gap-3 py-1.5 group">
                      <div className="w-6 h-6 bg-primary/10 rounded flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[280px] border-l border-border p-8 flex flex-col gap-4">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Featured Article</span>
              <div className="flex flex-col gap-3 py-2">
                <div className="w-full h-[100px] bg-[hsl(var(--hero-dark))] rounded" />
                <div>
                  <div className="text-sm font-semibold text-foreground">Understanding Glucose Disposal Agents</div>
                  <div className="text-xs text-muted-foreground mt-1">How GDAs redirect carbohydrates toward muscle glycogen.</div>
                </div>
                <a href="#" className="text-xs underline text-primary">Read more</a>
              </div>
              <a href="#" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                See all articles <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[360px] z-[70] bg-background flex flex-col md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img src={logoDark} alt="Baseline Nutrition" className="h-8 w-auto" />
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col flex-1 py-4">
                {mobileNavSections.map((section) => (
                  <div key={section.title} className="border-b border-border">
                    <button
                      className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold text-foreground uppercase tracking-wider"
                      onClick={() => setMobileAccordion(mobileAccordion === section.title ? null : section.title)}
                    >
                      {section.title}
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${mobileAccordion === section.title ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === section.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 px-4 pb-4">
                            {section.items.map((item) => (
                              <Link
                                key={item.name}
                                to={item.link}
                                onClick={() => setMobileOpen(false)}
                                className="py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border flex flex-col gap-3">
                <button className="w-full py-2.5 border border-border text-foreground text-sm hover:border-primary transition-colors rounded">
                  Log in
                </button>
                <button className="w-full py-2.5 bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity rounded">
                  Sign up
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
