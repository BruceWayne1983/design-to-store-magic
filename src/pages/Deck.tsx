import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Maximize, Grid, X, Download, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createDeckPdf, deckSlides, downloadPdfFile, isSafariBrowser, openPdfPreview } from "@/lib/deckPdf";

type ExportMode = "download" | "preview";

const getDeckSlideSrc = (path: string) => {
  const captureUrl = new URL(path, window.location.origin);
  captureUrl.searchParams.set("deckCapture", "true");
  return captureUrl.toString();
};

const Deck = () => {
  const slides = deckSlides;
  const [current, setCurrent] = useState(0);
  const [isGrid, setIsGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [exportProgress, setExportProgress] = useState("");
  const [showSafariPrompt, setShowSafariPrompt] = useState(false);

  const exportDeck = useCallback(async (mode: ExportMode = "download", preferPopup = true, triggeredByQuery = false) => {
    if (isDownloading) return;

    const fileName = "baseline-site-deck.pdf";
    const safariBrowser = isSafariBrowser();

    setIsDownloading(true);

    try {
      const pdf = await createDeckPdf(slides, (current, total, title) => {
        setExportProgress(`Capturing ${current}/${total}: ${title}`);
      });

      if (mode === "preview") {
        openPdfPreview(pdf, preferPopup);
        setShowSafariPrompt(false);
        return;
      }

      const didDownload = await downloadPdfFile(pdf, fileName);

      if (!didDownload) {
        openPdfPreview(pdf, preferPopup);
      }

      if (triggeredByQuery && safariBrowser) {
        setShowSafariPrompt(true);
      } else {
        setShowSafariPrompt(false);
      }
    } catch (e) {
      console.error("Export failed:", e);
      toast.error("Deck export failed. Please try again.");
    } finally {
      setIsDownloading(false);
      setExportProgress("");
    }
  }, [isDownloading, slides]);

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, slides.length - 1)), [slides.length]);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("download") === "true") {
      const safariBrowser = isSafariBrowser();

      if (safariBrowser) {
        setShowSafariPrompt(true);
      }

      const timer = setTimeout(() => exportDeck("download", false, true), safariBrowser ? 50 : 300);
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
          <h1 className="text-lg md:text-xl font-black tracking-tight text-foreground uppercase">Baseline <span className="text-xs font-normal text-muted-foreground ml-2">Deck</span></h1>
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
                  src={getDeckSlideSrc(slide.path)}
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
          <Link to="/" className="text-lg md:text-xl font-black tracking-tight text-foreground uppercase">Baseline</Link>
          <span className="text-xs text-muted-foreground">Deck</span>
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
                src={getDeckSlideSrc(slide.path)}
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

      {isDownloading && exportProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-8 shadow-lg">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm font-semibold text-foreground">{exportProgress}</p>
            <p className="text-xs text-muted-foreground">Full-page captures may take a moment...</p>
          </div>
        </div>
      )}

      {showSafariPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">PDF ready</p>
            <h2 className="mt-3 text-2xl font-black uppercase tracking-wide text-foreground">Safari needs one click</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Safari can block automatic file saves, so this deck now gives you a clean one-click fallback without exposing any preview branding.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => exportDeck("download", false)}
                disabled={isDownloading}
                className="rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Download PDF
              </button>
              <button
                onClick={() => exportDeck("preview", false)}
                disabled={isDownloading}
                className="rounded-md bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-40"
              >
                Open PDF
              </button>
            </div>
            <button
              onClick={() => setShowSafariPrompt(false)}
              className="mt-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Continue without downloading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deck;
