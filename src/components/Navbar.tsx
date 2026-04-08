import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";
import logoDark from "@/assets/logo-dark.jpg";

const shopItems = [
  { name: "Performance Supplements", desc: "Pre-workout, pump and endurance formulas", link: "/category/performance" },
  { name: "Metabolic Support", desc: "Glucose disposal and metabolic optimisers", link: "/shop" },
  { name: "Recovery & Sleep", desc: "Inflammation, sleep and muscle repair", link: "/shop" },
  { name: "Health Optimisation", desc: "Immune, gut health and longevity", link: "/shop" },
];

const stackItems = [
  { name: "Performance Stack", desc: "Fusion Black + Vascul8 for training intensity" },
  { name: "Metabolic Stack", desc: "Glyco8 + GlycoShift for body composition" },
  { name: "Recovery Stack", desc: "Vascul8 + Glyco8 for post-training recovery" },
];

const scienceItems = [
  { name: "AMPK Activation", desc: "Cellular energy and glucose metabolism" },
  { name: "Nitric Oxide Signalling", desc: "Vasodilation and nutrient delivery" },
  { name: "Metabolic Partitioning", desc: "Glucose disposal and nutrient uptake" },
];

const Navbar = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="w-full border-b border-border bg-background sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 h-[60px] md:h-[72px]">
          {/* Left */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="flex items-center"><img src={logoDark} alt="Baseline Nutrition" className="h-6 md:h-8 w-auto" /></Link>
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
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <a href="#" className="hidden md:flex p-2.5 hover:bg-secondary rounded-lg transition-colors" aria-label="Account">
              <User className="w-5 h-5 text-foreground" />
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                2
              </span>
            </button>
            <button
              className="md:hidden p-2.5 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background flex flex-col">
            <div className="flex flex-col px-4 py-4 gap-4">
              <Link to="/shop" className="text-sm font-semibold text-foreground" onClick={() => setMobileOpen(false)}>Shop All</Link>
              <Link to="/category/performance" className="text-sm font-semibold text-foreground" onClick={() => setMobileOpen(false)}>Performance</Link>
              <a href="#" className="text-sm font-semibold text-foreground">Stacks</a>
              <a href="#" className="text-sm font-semibold text-foreground">Science</a>
            </div>
            <div className="flex gap-3 px-4 pb-4">
              <button className="flex-1 py-2 border border-border text-foreground text-sm hover:border-primary transition-colors rounded">
                Log in
              </button>
              <button className="flex-1 py-2 bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity rounded">
                Sign up
              </button>
            </div>
          </div>
        )}

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

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
