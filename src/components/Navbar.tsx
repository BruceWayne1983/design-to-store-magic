import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";
import { useCartStore } from "@/stores/cartStore";
import logoDark from "@/assets/logo-dark.png";

const megaColumns = [
  {
    heading: "Performance",
    links: [
      { name: "Fusion Lite+", link: "/product/fusion-lite-plus" },
      { name: "VASCUL8™", link: "/product/vascul8" },
      { name: "Pürest Creatine™", link: "/product/purest-creatine" },
    ],
  },
  {
    heading: "Health",
    links: [
      { name: "ELECTRO FLOW", link: "/product/electro-flow" },
      { name: "H2O GO", link: "/product/h2o-go" },
    ],
  },
  {
    heading: "Metabolic",
    links: [
      { name: "GLYCO8™", link: "/product/glyco8" },
      { name: "GLYCOSHIFT™", link: "/product/glycoshift" },
    ],
  },
  {
    heading: "Peptides",
    links: [
      { name: "Shop Peptides", link: "/shop/peptides" },
    ],
  },
];

const mobileNavSections = [
  {
    title: "Performance",
    items: [
      { name: "Fusion Lite+", link: "/product/fusion-lite-plus" },
      { name: "VASCUL8™", link: "/product/vascul8" },
      { name: "Pürest Creatine™", link: "/product/purest-creatine" },
    ],
  },
  {
    title: "Health",
    items: [
      { name: "ELECTRO FLOW", link: "/product/electro-flow" },
      { name: "H2O GO", link: "/product/h2o-go" },
    ],
  },
  {
    title: "Metabolic",
    items: [
      { name: "GLYCO8™", link: "/product/glyco8" },
      { name: "GLYCOSHIFT™", link: "/product/glycoshift" },
    ],
  },
  {
    title: "Peptides",
    items: [
      { name: "Shop Peptides", link: "/shop/peptides" },
    ],
  },
];

const Navbar = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [scienceOpen, setScienceOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const { setCartOpen, totalItems } = useCartStore();
  const cartCount = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`w-full border-b border-border bg-background sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
        <div className={`flex items-center justify-between px-4 md:px-8 lg:px-16 transition-all duration-300 ${scrolled ? "h-[52px] md:h-[56px]" : "h-[60px] md:h-[72px]"}`}>
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/home" className="flex items-center">
              <img src={logoDark} alt="Baseline Nutrition" className={`w-auto transition-all duration-300 ${scrolled ? "h-8 md:h-8" : "h-10 md:h-12"}`} />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <button
                className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors font-medium"
                onMouseEnter={() => setMegaOpen(true)}
                onClick={() => setMegaOpen(!megaOpen)}
              >
                Shop <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors font-medium"
                  onMouseEnter={() => setScienceOpen(true)}
                  onClick={() => setScienceOpen(!scienceOpen)}
                >
                  Science <ChevronDown className={`w-3.5 h-3.5 transition-transform ${scienceOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {scienceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50"
                      onMouseLeave={() => setScienceOpen(false)}
                    >
                      <Link to="/blog?category=ingredient-science" onClick={() => setScienceOpen(false)} className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">Ingredient Science</Link>
                      <Link to="/blog?category=protocol-guides" onClick={() => setScienceOpen(false)} className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">Protocol Guides</Link>
                      <Link to="/blog?category=mechanisms" onClick={() => setScienceOpen(false)} className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">Mechanisms</Link>
                      <Link to="/blog?category=comparisons" onClick={() => setScienceOpen(false)} className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">Comparisons</Link>
                      <div className="border-t border-border mt-1 pt-1">
                        <Link to="/blog" onClick={() => setScienceOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">View All Articles</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/shop/peptides" className="text-sm text-foreground hover:text-primary transition-colors font-medium">Peptides</Link>
              <Link to="/blog" className="text-sm text-foreground hover:text-primary transition-colors font-medium">Blog</Link>
              <Link to="/about" className="text-sm text-foreground hover:text-primary transition-colors font-medium">About</Link>
              <Link to="/contact" className="text-sm text-foreground hover:text-primary transition-colors font-medium">Contact</Link>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setSearchOpen(true)} className="p-2.5 hover:bg-secondary rounded-lg transition-colors" aria-label="Search">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <Link to="/about" className="hidden md:flex p-2.5 hover:bg-secondary rounded-lg transition-colors" aria-label="Account">
              <User className="w-5 h-5 text-foreground" />
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative p-2.5 hover:bg-secondary rounded-lg transition-colors" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2.5 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block absolute left-0 right-0 top-full border-t border-border bg-background shadow-lg z-50"
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="max-w-[1280px] mx-auto flex gap-16 px-8 lg:px-16 py-10">
                {megaColumns.map((col) => (
                  <div key={col.heading} className="flex flex-col gap-4 min-w-[180px]">
                    <span className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">{col.heading}</span>
                    <div className="flex flex-col gap-2.5">
                      {col.links.map((item) => (
                        <Link key={item.name} to={item.link} onClick={() => setMegaOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col gap-4 min-w-[180px] ml-auto">
                  <span className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">Quick Links</span>
                  <div className="flex flex-col gap-2.5">
                    <Link to="/shop" onClick={() => setMegaOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shop All</Link>
                    <Link to="/shop" onClick={() => setMegaOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Best Sellers</Link>
                    <Link to="/shop" onClick={() => setMegaOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                <Link to="/home" onClick={() => setMobileOpen(false)}>
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
                              <Link key={item.name} to={item.link} onClick={() => setMobileOpen(false)} className="py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors">
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="border-b border-border">
                  <button
                    className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold text-foreground uppercase tracking-wider"
                    onClick={() => setMobileAccordion(mobileAccordion === "Science" ? null : "Science")}
                  >
                    Science
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${mobileAccordion === "Science" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "Science" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 px-4 pb-4">
                          <Link to="/blog?category=ingredient-science" onClick={() => setMobileOpen(false)} className="py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors">Ingredient Science</Link>
                          <Link to="/blog?category=protocol-guides" onClick={() => setMobileOpen(false)} className="py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors">Protocol Guides</Link>
                          <Link to="/blog?category=mechanisms" onClick={() => setMobileOpen(false)} className="py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors">Mechanisms</Link>
                          <Link to="/blog?category=comparisons" onClick={() => setMobileOpen(false)} className="py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors">Comparisons</Link>
                          <Link to="/blog" onClick={() => setMobileOpen(false)} className="py-2 pl-4 text-sm font-medium text-foreground hover:text-primary transition-colors">View All Articles</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="border-b border-border">
                  <Link to="/blog" onClick={() => setMobileOpen(false)} className="block px-4 py-4 text-sm font-bold text-foreground uppercase tracking-wider">Blog</Link>
                </div>
                <div className="border-b border-border">
                  <Link to="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-4 text-sm font-bold text-foreground uppercase tracking-wider">About</Link>
                </div>
                <div className="border-b border-border">
                  <Link to="/contact" onClick={() => setMobileOpen(false)} className="block px-4 py-4 text-sm font-bold text-foreground uppercase tracking-wider">Contact</Link>
                </div>
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

      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
