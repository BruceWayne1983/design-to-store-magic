import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export type DeckSlide = {
  title: string;
  path: string;
  description: string;
  commentary: string[];
};

export const deckSlides: DeckSlide[] = [
  {
    title: "Homepage",
    path: "/",
    description: "Main landing page with hero, trust bar, product showcase, and full brand experience",
    commentary: [],
  },
];

const normalizePdfText = (value: string) => value.replace(/[—–]/g, "-");
const CAPTURE_WIDTH = 1440;
const FULL_PAGE_MAX_HEIGHT = 12000;
const PDF_PAGE_WIDTH_MM = 297; // A4 landscape width
const PDF_MARGIN = 10;
const HEADER_HEIGHT = 20; // mm reserved for title header (no commentary)

const waitForImages = async (doc: Document) => {
  const imageElements = Array.from(doc.images);
  await Promise.all(
    imageElements.map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );
};

const waitForRouteReady = async (iframe: HTMLIFrameElement) => {
  await new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      iframe.removeEventListener("load", handleLoad);
      iframe.removeEventListener("error", handleError);
    };
    const handleLoad = () => { cleanup(); resolve(); };
    const handleError = () => { cleanup(); reject(new Error(`Failed to load ${iframe.src}`)); };
    iframe.addEventListener("load", handleLoad, { once: true });
    iframe.addEventListener("error", handleError, { once: true });
  });

  const doc = iframe.contentDocument;
  if (!doc) throw new Error("Could not access route document for PDF capture.");
  if (doc.fonts?.ready) await doc.fonts.ready;
  await waitForImages(doc);
  await new Promise((resolve) => window.setTimeout(resolve, 500));
};

const captureFullPage = async (slide: DeckSlide) => {
  const iframe = document.createElement("iframe");
  const captureUrl = new URL(slide.path, window.location.origin);
  captureUrl.searchParams.set("deckCapture", "true");

  iframe.src = captureUrl.toString();
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = `position:fixed;left:-10000px;top:0;width:${CAPTURE_WIDTH}px;height:${FULL_PAGE_MAX_HEIGHT}px;opacity:0;pointer-events:none;border:0;background:transparent;z-index:-1`;

  document.body.appendChild(iframe);

  try {
    await waitForRouteReady(iframe);

    const doc = iframe.contentDocument;
    const body = doc?.body;
    if (!doc || !body) throw new Error(`Unable to capture ${slide.path}`);

    // Get true scrollable height
    const fullHeight = Math.max(
      body.scrollHeight,
      doc.documentElement.scrollHeight,
    );

    const canvas = await html2canvas(body, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      width: CAPTURE_WIDTH,
      height: fullHeight,
      windowWidth: CAPTURE_WIDTH,
      windowHeight: fullHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
    });

    return {
      dataUrl: canvas.toDataURL("image/jpeg", 0.92),
      width: canvas.width,
      height: canvas.height,
    };
  } finally {
    iframe.remove();
  }
};

// Draw a slide: header with commentary on top, then full-width screenshot below
// The PDF page height is calculated dynamically to fit the image at full width
const drawSlidePage = (
  pdf: jsPDF,
  slide: DeckSlide,
  capture: { dataUrl: string; width: number; height: number },
  index: number,
  total: number,
  pageHeight: number,
) => {
  const W = PDF_PAGE_WIDTH_MM;
  const H = pageHeight;
  const title = normalizePdfText(slide.title);
  const routeLabel = normalizePdfText(slide.path === "/" ? "Route: /" : `Route: ${slide.path}`);

  // Background
  pdf.setFillColor(10, 22, 40);
  pdf.rect(0, 0, W, H, "F");

  // Top accent bar
  pdf.setFillColor(37, 145, 251);
  pdf.rect(0, 0, W, 2, "F");

  // --- Header section ---
  let cursorY = PDF_MARGIN + 2;

  // Slide number + title on same line
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(28);
  pdf.setTextColor(37, 145, 251);
  pdf.text(String(index + 1).padStart(2, "0"), PDF_MARGIN, cursorY + 8);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(255, 255, 255);
  pdf.text(title, PDF_MARGIN + 22, cursorY + 7);

  // Route label
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(37, 145, 251);
  pdf.text(routeLabel, PDF_MARGIN + 22, cursorY + 13);

  // Page counter top right
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(80, 95, 120);
  pdf.text(`${String(index + 1).padStart(2, "0")} / ${total}`, W - PDF_MARGIN, cursorY + 7, { align: "right" });

  cursorY += 18;

  // Description
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(8);
  pdf.setTextColor(160, 175, 200);
  const descLines = pdf.splitTextToSize(normalizePdfText(slide.description), W - PDF_MARGIN * 2);
  pdf.text(descLines, PDF_MARGIN, cursorY);
  cursorY += descLines.length * 3.5 + 3;

  // Commentary bullets in a compact horizontal row
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(180, 190, 210);

  const bulletWidth = (W - PDF_MARGIN * 2) / 3;
  slide.commentary.slice(0, 6).forEach((point, bi) => {
    const col = bi % 3;
    const row = Math.floor(bi / 3);
    const bx = PDF_MARGIN + col * bulletWidth;
    const by = cursorY + row * 8;

    pdf.setFillColor(37, 145, 251);
    pdf.circle(bx + 1, by - 0.8, 0.6, "F");
    const lines = pdf.splitTextToSize(normalizePdfText(point), bulletWidth - 8);
    pdf.text(lines[0], bx + 4, by);
  });

  // --- Screenshot section ---
  const imgY = HEADER_HEIGHT;
  const imgW = W - PDF_MARGIN * 2;
  const imgH = H - HEADER_HEIGHT - PDF_MARGIN;

  pdf.addImage(capture.dataUrl, "JPEG", PDF_MARGIN, imgY, imgW, imgH, undefined, "FAST");

  // Border around screenshot
  pdf.setDrawColor(37, 145, 251);
  pdf.setLineWidth(0.3);
  pdf.rect(PDF_MARGIN, imgY, imgW, imgH);

  // Brand bottom right
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.setTextColor(40, 55, 80);
  pdf.text("BASELINE", W - PDF_MARGIN, H - 3, { align: "right" });
};

export type ProgressCallback = (current: number, total: number, slideTitle: string) => void;

export const createDeckPdf = async (slides: DeckSlide[], onProgress?: ProgressCallback) => {
  // We'll create the PDF after capturing the first slide so we know the page dimensions
  let pdf: jsPDF | null = null;

  for (const [index, slide] of slides.entries()) {
    onProgress?.(index + 1, slides.length, slide.title);

    const capture = await captureFullPage(slide);

    // Calculate page height: image fills full width minus margins, height scales proportionally
    const imgContentWidth = PDF_PAGE_WIDTH_MM - PDF_MARGIN * 2;
    const imgAspect = capture.width / capture.height;
    const imgContentHeight = imgContentWidth / imgAspect;
    const pageHeight = HEADER_HEIGHT + imgContentHeight + PDF_MARGIN;

    if (!pdf) {
      pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [PDF_PAGE_WIDTH_MM, pageHeight] });
    } else {
      pdf.addPage([PDF_PAGE_WIDTH_MM, pageHeight]);
    }

    drawSlidePage(pdf, slide, capture, index, slides.length, pageHeight);
  }

  return pdf!;
};

export const isSafariBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent;
  return /Safari/i.test(userAgent) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS|Android/i.test(userAgent);
};

export const openPdfPreview = (pdf: jsPDF, preferPopup = true) => {
  const blob = pdf.output("blob");
  const blobUrl = URL.createObjectURL(blob);
  const popup = preferPopup ? window.open("", "_blank", "noopener,noreferrer") : null;
  if (popup) {
    popup.location.href = blobUrl;
  } else {
    window.location.href = blobUrl;
  }
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
};

export const downloadPdfFile = async (pdf: jsPDF, fileName: string) => {
  try {
    const pdfBlob = pdf.output("blob");
    const downloadBlob = isSafariBrowser() ? new Blob([pdfBlob], { type: "application/octet-stream" }) : pdfBlob;
    const blobUrl = URL.createObjectURL(downloadBlob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.rel = "noopener noreferrer";
    if (isSafariBrowser()) link.target = "_self";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    return true;
  } catch (error) {
    console.error("Download failed:", error);
    return false;
  }
};
