import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

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

  return (
    <nav className="w-full border-b border-foreground bg-background">
      {/* Header bar */}
      <div className="flex items-center justify-between px-16 h-[72px]">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold tracking-tight text-foreground">Baseline</span>
          <div className="flex items-center gap-8">
            <a href="#" className="text-base text-foreground hover:opacity-70">Shop</a>
            <a href="#" className="text-base text-foreground hover:opacity-70">Protocols</a>
            <a href="#" className="text-base text-foreground hover:opacity-70">Science</a>
            <button
              className="flex items-center gap-1 text-base text-foreground hover:opacity-70"
              onClick={() => setMegaOpen(!megaOpen)}
            >
              More <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 border border-foreground text-foreground text-base hover:bg-foreground hover:text-background transition-colors">
            Log in
          </button>
          <button className="px-5 py-2 bg-foreground text-background border border-foreground text-base hover:opacity-90 transition-opacity">
            Sign up
          </button>
        </div>
      </div>

      {/* Mega menu */}
      {megaOpen && (
        <div className="flex border-t border-foreground">
          <div className="flex flex-1 gap-8 px-16 py-8">
            {menuGroups.map((group) => (
              <div key={group.title} className="flex-1 flex flex-col gap-4">
                <span className="text-sm font-semibold text-foreground">{group.title}</span>
                <div className="flex flex-col gap-4">
                  {group.items.map((item) => (
                    <a key={item.name} href="#" className="flex gap-3 py-2 group">
                      <div className="w-6 h-6 bg-foreground/10 rounded flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-base font-semibold text-foreground group-hover:underline">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-[416px] border-l border-foreground/10 p-8 flex flex-col gap-4">
            <span className="text-sm font-semibold text-foreground">Featured from Blog</span>
            <div className="flex flex-col gap-4 py-2">
              <div className="w-40 h-[107px] bg-muted" />
              <div>
                <div className="text-base font-semibold text-foreground">Article Title</div>
                <div className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
              </div>
              <a href="#" className="text-sm underline text-foreground">Read more</a>
            </div>
            <a href="#" className="flex items-center gap-2 text-base text-foreground hover:opacity-70">
              See all <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
