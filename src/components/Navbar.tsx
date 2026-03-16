import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const menuGroups = [
  {
    title: "Page group one",
    items: [
      { name: "Page One", desc: "Lorem ipsum dolor sit amet consectetur elit" },
      { name: "Page Two", desc: "Lorem ipsum dolor sit amet consectetur elit" },
      { name: "Page Three", desc: "Lorem ipsum dolor sit amet consectetur elit" },
      { name: "Page Four", desc: "Lorem ipsum dolor sit amet consectetur elit" },
    ],
  },
  {
    title: "Page group two",
    items: [
      { name: "Page Five", desc: "Lorem ipsum dolor sit amet consectetur elit" },
      { name: "Page Six", desc: "Lorem ipsum dolor sit amet consectetur elit" },
      { name: "Page Seven", desc: "Lorem ipsum dolor sit amet consectetur elit" },
      { name: "Page Eight", desc: "Lorem ipsum dolor sit amet consectetur elit" },
    ],
  },
  {
    title: "Page group three",
    items: [
      { name: "Page Nine", desc: "Lorem ipsum dolor sit amet consectetur elit" },
      { name: "Page Ten", desc: "Lorem ipsum dolor sit amet consectetur elit" },
      { name: "Page Eleven", desc: "Lorem ipsum dolor sit amet consectetur elit" },
      { name: "Page Twelve", desc: "Lorem ipsum dolor sit amet consectetur elit" },
    ],
  },
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
            <a href="#" className="text-base text-foreground hover:text-primary transition-colors">Protocols</a>
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
            <Link to="/shop" className="text-base font-semibold text-foreground" onClick={() => setMobileOpen(false)}>Shop</Link>
            <a href="#" className="text-base font-semibold text-foreground">Protocols</a>
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
        <div className="hidden md:flex border-t border-border">
          <div className="flex flex-1 gap-8 px-8 lg:px-16 py-8">
            {menuGroups.map((group) => (
              <div key={group.title} className="flex-1 flex flex-col gap-4">
                <span className="text-sm font-semibold text-foreground">{group.title}</span>
                <div className="flex flex-col gap-4">
                  {group.items.map((item) => (
                    <a key={item.name} href="#" className="flex gap-3 py-2 group">
                      <div className="w-6 h-6 bg-primary/10 rounded flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-[416px] border-l border-border p-8 flex flex-col gap-4">
            <span className="text-sm font-semibold text-foreground">Featured from Blog</span>
            <div className="flex flex-col gap-4 py-2">
              <div className="w-40 h-[107px] bg-muted rounded" />
              <div>
                <div className="text-base font-semibold text-foreground">Article Title</div>
                <div className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
              </div>
              <a href="#" className="text-sm underline text-primary">Read more</a>
            </div>
            <a href="#" className="flex items-center gap-2 text-base text-foreground hover:text-primary transition-colors">
              See all <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
