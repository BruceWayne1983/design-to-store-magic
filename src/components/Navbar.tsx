import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

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

  return (
    <nav className="w-full border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 h-[60px] md:h-[72px]">
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="text-lg md:text-xl font-black tracking-tight text-foreground uppercase">Baseline</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-base text-foreground hover:text-primary transition-colors">Shop</Link>
            <Link to="/category/performance" className="text-base text-foreground hover:text-primary transition-colors">Performance</Link>
            <a href="#" className="text-base text-foreground hover:text-primary transition-colors">Science</a>
            <button
              className="flex items-center gap-1 text-base text-foreground hover:text-primary transition-colors"
              onClick={() => setMegaOpen(!megaOpen)}
            >
              More <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2 border border-border text-foreground text-base hover:border-primary hover:text-primary transition-colors">
            Log in
          </button>
          <button className="px-5 py-2 bg-primary text-primary-foreground border border-primary text-base hover:opacity-90 transition-opacity">
            Sign up
          </button>
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background flex flex-col">
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link to="/shop" className="text-base font-semibold text-foreground" onClick={() => setMobileOpen(false)}>Shop All</Link>
            <Link to="/category/performance" className="text-base font-semibold text-foreground" onClick={() => setMobileOpen(false)}>Performance</Link>
            <a href="#" className="text-base font-semibold text-foreground">Stacks</a>
            <a href="#" className="text-base font-semibold text-foreground">Science</a>
          </div>
          <div className="flex gap-3 px-4 pb-4">
            <button className="flex-1 py-2 border border-border text-foreground text-sm hover:border-primary transition-colors">
              Log in
            </button>
            <button className="flex-1 py-2 bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity">
              Sign up
            </button>
          </div>
        </div>
      )}

      {/* Desktop mega menu */}
      {megaOpen && (
        <div className="hidden md:flex border-t border-border bg-background">
          <div className="flex flex-1 gap-8 px-8 lg:px-16 py-8">
            {/* Shop by Category */}
            <div className="flex-1 flex flex-col gap-4">
              <span className="text-sm font-semibold text-foreground">Shop by Category</span>
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

            {/* Stack Systems */}
            <div className="flex-1 flex flex-col gap-4">
              <span className="text-sm font-semibold text-foreground">Stack Systems</span>
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

            {/* Science */}
            <div className="flex-1 flex flex-col gap-4">
              <span className="text-sm font-semibold text-foreground">The Science</span>
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
          <div className="w-[300px] border-l border-border p-8 flex flex-col gap-4">
            <span className="text-sm font-semibold text-foreground">Featured Article</span>
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
  );
};

export default Navbar;
