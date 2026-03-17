import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Maximize, Grid, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const slides = [
  { title: "Homepage", path: "/", description: "Main landing page with hero, trust bar, product showcase, and full brand experience" },
  { title: "Shop All", path: "/shop", description: "Complete product catalogue with filtering and quick-add functionality" },
  { title: "Product Detail — Glyco8", path: "/product/glyco8", description: "Full PDP with subscribe & save, ingredient breakdown, mechanisms, and FAQs" },
  { title: "Product Detail — Fusion Black", path: "/product/fusion-black", description: "Performance pre-workout PDP showcasing clinical dosing and stack options" },
  { title: "Performance Category", path: "/category/performance", description: "Category landing page for the performance supplement range" },
  { title: "Pre-Launch", path: "/launch", description: "VIP early-access holding page with email signup and 20% launch discount" },
];

const Deck = () => {
  const [current, setCurrent] = useState(0);
  const [isGrid, setIsGrid] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadSlide = useCallback(async () => {
    if (!slideRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(slideRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a1628",
      });
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`baseline-${slides[current].title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    } catch (e) {
      console.error("Download failed:", e);
    }
    setIsDownloading(false);
  }, [current, isDownloading]);

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, slides.length - 1)), []);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "Escape" && isFullscreen) {
        document.exitFullscreen?.();
        setIsFullscreen(false);
      }
      if (e.key === "g") setIsGrid((g) => !g);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, isFullscreen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (isGrid) {
    return (
      <div className="min-h-screen bg-[hsl(215,50%,5%)] p-6 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-black text-white uppercase tracking-wider">Baseline — Site Deck</h1>
          <button onClick={() => setIsGrid(false)} className="text-white/60 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setIsGrid(false); }}
              className={`group text-left rounded-lg overflow-hidden border-2 transition-all ${
                current === i ? "border-primary" : "border-white/10 hover:border-white/30"
              }`}
            >
              <div className="relative w-full aspect-video bg-[hsl(215,50%,8%)] overflow-hidden">
                <iframe
                  src={slide.path}
                  className="w-[1920px] h-[1080px] origin-top-left pointer-events-none"
                  style={{ transform: "scale(0.225)", transformOrigin: "top left" }}
                  title={slide.title}
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-[hsl(215,50%,8%)]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-bold text-white">{slide.title}</span>
                </div>
                <p className="text-xs text-white/50 mt-1 line-clamp-2">{slide.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const slide = slides[current];

  return (
    <div className="h-screen w-screen bg-[hsl(215,50%,5%)] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[hsl(215,50%,4%)] border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-sm font-black text-white uppercase tracking-wider">Baseline</span>
          <span className="text-xs text-white/30">Site Deck</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 mr-4">
            {current + 1} / {slides.length}
          </span>
          <button onClick={() => window.print()} className="p-2 text-white/50 hover:text-white transition-colors" title="Download as PDF">
            <Download className="w-4 h-4" />
          </button>
          <button onClick={() => setIsGrid(true)} className="p-2 text-white/50 hover:text-white transition-colors" title="Grid view (G)">
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={toggleFullscreen} className="p-2 text-white/50 hover:text-white transition-colors" title="Fullscreen">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide area */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute left-2 md:left-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full max-w-[1400px] flex flex-col gap-4"
          >
            <div className="deck-print-area flex-1 relative rounded-lg overflow-hidden border border-white/10 bg-[hsl(215,50%,8%)]">
              <iframe
                src={slide.path}
                className="w-full h-full border-0"
                title={slide.title}
              />
            </div>
            <div className="flex items-center gap-4 px-2">
              <span className="text-2xl font-black text-primary">{String(current + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wide">{slide.title}</h2>
                <p className="text-xs text-white/50">{slide.description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="absolute right-2 md:right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide dots */}
      <div className="flex items-center justify-center gap-2 pb-4 flex-shrink-0">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              current === i ? "w-8 bg-primary" : "w-3 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
