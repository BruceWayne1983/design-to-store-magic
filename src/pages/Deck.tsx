import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize, Grid, X, Download, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";

const slides = [
  { title: "Homepage", path: "/", description: "Main landing page with hero, trust bar, product showcase, and full brand experience" },
  { title: "Shop All", path: "/shop", description: "Complete product catalogue with filtering and quick-add functionality" },
  { title: "Product Detail — Glyco8", path: "/product/glyco8", description: "Full PDP with subscribe & save, ingredient breakdown, mechanisms, and FAQs" },
  { title: "Product Detail — Fusion Black", path: "/product/fusion-black", description: "Performance pre-workout PDP showcasing clinical dosing and stack options" },
  { title: "Performance Category", path: "/category/performance", description: "Category landing page for the performance supplement range" },
  { title: "Pre-Launch", path: "/launch", description: "VIP early-access holding page with email signup and 20% launch discount" },
];

const normalizePdfText = (value: string) => value.replace(/[—–]/g, "-");
type ExportMode = "download" | "preview";

const Deck = () => {
  const [current, setCurrent] = useState(0);
  const [isGrid, setIsGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const createDeckPdf = useCallback(() => {
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const W = 297;
    const H = 210;

    slides.forEach((slide, i) => {
      if (i > 0) pdf.addPage();

      const title = normalizePdfText(slide.title);
      const description = normalizePdfText(slide.description);
      const routeLabel = normalizePdfText(slide.path === "/" ? "Route: homepage" : `Route: ${slide.path}`);

      pdf.setFillColor(10, 22, 40);
      pdf.rect(0, 0, W, H, "F");

      pdf.setFillColor(37, 145, 251);
      pdf.rect(0, 0, 4, H, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(48);
      pdf.setTextColor(37, 145, 251);
      pdf.text(String(i + 1).padStart(2, "0"), 20, 50);

      pdf.setFontSize(28);
      pdf.setTextColor(255, 255, 255);
      pdf.text(title, 20, 70);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(14);
      pdf.setTextColor(180, 190, 210);
      const descLines = pdf.splitTextToSize(description, W - 40);
      pdf.text(descLines, 20, 85);

      pdf.setFontSize(11);
      pdf.setTextColor(37, 145, 251);
      pdf.text(routeLabel, 20, 105);

      pdf.setFontSize(9);
      pdf.setTextColor(100, 115, 140);
      pdf.text("BASELINE - Site Deck", 20, H - 12);
      pdf.text(`${i + 1} / ${slides.length}`, W - 20, H - 12, { align: "right" });
    });

    return pdf;
  }, []);

  const exportDeck = useCallback((mode: ExportMode = "download", preferPopup = true) => {
    if (isDownloading) return;

    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const fileName = "baseline-site-deck.pdf";
    const shouldOpenPreview = mode === "preview" || isIos;
    const popup = shouldOpenPreview && preferPopup ? window.open("", "_blank", "noopener,noreferrer") : null;

    setIsDownloading(true);

    try {
      const pdf = createDeckPdf();
      const blob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(blob);

      if (shouldOpenPreview) {
        if (popup) {
          popup.location.href = blobUrl;
        } else {
          window.location.href = blobUrl;
        }
      } else {
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    } catch (e) {
      popup?.close();
      console.error("Export failed:", e);
    } finally {
      setIsDownloading(false);
    }
  }, [createDeckPdf, isDownloading]);

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, slides.length - 1)), []);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("download") === "true") {
      const timer = setTimeout(() => exportDeck("preview", false), 500);
      return () => clearTimeout(timer);
    }
  }, [exportDeck]);

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
      <div className="dark min-h-screen bg-background p-6 text-foreground md:p-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-black uppercase tracking-wider text-foreground">Baseline — Site Deck</h1>
          <button onClick={() => setIsGrid(false)} className="text-foreground/60 transition-colors hover:text-foreground">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setIsGrid(false); }}
              className={`group overflow-hidden rounded-lg border-2 text-left transition-all ${
                current === i ? "border-primary" : "border-border/60 hover:border-border"
              }`}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-card">
                <iframe
                  src={slide.path}
                  className="pointer-events-none h-[1080px] w-[1920px] origin-top-left"
                  style={{ transform: "scale(0.225)", transformOrigin: "top left" }}
                  title={slide.title}
                  loading="lazy"
                />
              </div>
              <div className="bg-card p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-bold text-foreground">{slide.title}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{slide.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const slide = slides[current];

  return (
    <div className="dark flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="flex flex-shrink-0 items-center justify-between border-b border-border/60 bg-background px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-black uppercase tracking-wider text-foreground">Baseline</span>
          <span className="text-xs text-muted-foreground">Site Deck</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <span className="mr-2 hidden text-xs text-muted-foreground sm:inline md:mr-4">
            {current + 1} / {slides.length}
          </span>
          <button onClick={() => exportDeck("preview")} disabled={isDownloading} className="p-2 text-foreground/60 transition-colors hover:text-foreground disabled:opacity-30" title="Open PDF preview">
            <ExternalLink className={`h-4 w-4 ${isDownloading ? "animate-pulse" : ""}`} />
          </button>
          <button onClick={() => exportDeck("download")} disabled={isDownloading} className="p-2 text-foreground/60 transition-colors hover:text-foreground disabled:opacity-30" title="Download as PDF">
            <Download className={`h-4 w-4 ${isDownloading ? "animate-pulse" : ""}`} />
          </button>
          <button onClick={() => setIsGrid(true)} className="p-2 text-foreground/60 transition-colors hover:text-foreground" title="Grid view (G)">
            <Grid className="h-4 w-4" />
          </button>
          <button onClick={toggleFullscreen} className="p-2 text-foreground/60 transition-colors hover:text-foreground" title="Fullscreen">
            <Maximize className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center p-4 md:p-8">
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute left-2 z-10 rounded-full bg-card/80 p-2 text-foreground transition-all hover:bg-card disabled:cursor-not-allowed disabled:opacity-20 md:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="flex h-full w-full max-w-[1400px] flex-col gap-4"
          >
            <div className="deck-print-area relative flex-1 overflow-hidden rounded-lg border border-border/60 bg-card">
              <iframe
                src={slide.path}
                className="h-full w-full border-0"
                title={slide.title}
              />
            </div>
            <div className="flex items-center gap-4 px-2">
              <span className="text-2xl font-black text-primary">{String(current + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">{slide.title}</h2>
                <p className="text-xs text-muted-foreground">{slide.description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="absolute right-2 z-10 rounded-full bg-card/80 p-2 text-foreground transition-all hover:bg-card disabled:cursor-not-allowed disabled:opacity-20 md:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-shrink-0 items-center justify-center gap-2 pb-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              current === i ? "w-8 bg-primary" : "w-3 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
