import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export type DeckSlide = {
  title: string;
  path: string;
  description: string;
};

export const deckSlides: DeckSlide[] = [
  { title: "Homepage", path: "/", description: "Main landing page with hero, trust bar, product showcase, and full brand experience" },
  { title: "Shop All", path: "/shop", description: "Complete product catalogue with filtering and quick-add functionality" },
  { title: "Product Detail — Glyco8", path: "/product/glyco8", description: "Full PDP with subscribe & save, ingredient breakdown, mechanisms, and FAQs" },
  { title: "Product Detail — Fusion Black", path: "/product/fusion-black", description: "Performance pre-workout PDP showcasing clinical dosing and stack options" },
  { title: "Performance Category", path: "/category/performance", description: "Category landing page for the performance supplement range" },
  { title: "Pre-Launch", path: "/launch", description: "VIP early-access holding page with email signup and 20% launch discount" },
];

const normalizePdfText = (value: string) => value.replace(/[—–]/g, "-");
const CAPTURE_WIDTH = 1440;
const CAPTURE_HEIGHT = 900;
const PDF_WIDTH = 297;
const PDF_HEIGHT = 210;
const PDF_MARGIN = 10;
const META_HEIGHT = 24;

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

    const handleLoad = () => {
      cleanup();
      resolve();
    };

    const handleError = () => {
      cleanup();
      reject(new Error(`Failed to load ${iframe.src}`));
    };

    iframe.addEventListener("load", handleLoad, { once: true });
    iframe.addEventListener("error", handleError, { once: true });
  });

  const doc = iframe.contentDocument;
  if (!doc) {
    throw new Error("Could not access route document for PDF capture.");
  }

  if (doc.fonts?.ready) {
    await doc.fonts.ready;
  }

  await waitForImages(doc);
  await new Promise((resolve) => window.setTimeout(resolve, 350));
};

const captureSlideImage = async (slide: DeckSlide) => {
  const iframe = document.createElement("iframe");
  const captureUrl = new URL(slide.path, window.location.origin);
  captureUrl.searchParams.set("deckCapture", "true");

  iframe.src = captureUrl.toString();
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.left = "-10000px";
  iframe.style.top = "0";
  iframe.style.width = `${CAPTURE_WIDTH}px`;
  iframe.style.height = `${CAPTURE_HEIGHT}px`;
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  iframe.style.border = "0";
  iframe.style.background = "transparent";
  iframe.style.zIndex = "-1";

  document.body.appendChild(iframe);

  try {
    await waitForRouteReady(iframe);

    const doc = iframe.contentDocument;
    const body = doc?.body;
    if (!doc || !body) {
      throw new Error(`Unable to capture ${slide.path}`);
    }

    const canvas = await html2canvas(body, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      width: CAPTURE_WIDTH,
      height: CAPTURE_HEIGHT,
      windowWidth: CAPTURE_WIDTH,
      windowHeight: CAPTURE_HEIGHT,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
    });

    return canvas.toDataURL("image/jpeg", 0.92);
  } finally {
    iframe.remove();
  }
};

export const createDeckPdf = async (slides: DeckSlide[]) => {
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  for (const [index, slide] of slides.entries()) {
    if (index > 0) pdf.addPage();

    const title = normalizePdfText(slide.title);
    const routeLabel = normalizePdfText(slide.path === "/" ? "Route: homepage" : `Route: ${slide.path}`);
    const imageData = await captureSlideImage(slide);

    pdf.setFillColor(10, 22, 40);
    pdf.rect(0, 0, PDF_WIDTH, PDF_HEIGHT, "F");

    pdf.setFillColor(37, 145, 251);
    pdf.rect(0, 0, 4, PDF_HEIGHT, "F");

    const imageWidth = PDF_WIDTH - PDF_MARGIN * 2;
    const imageHeight = PDF_HEIGHT - PDF_MARGIN * 2 - META_HEIGHT;
    pdf.addImage(imageData, "JPEG", PDF_MARGIN, PDF_MARGIN, imageWidth, imageHeight, undefined, "FAST");

    const metaY = PDF_HEIGHT - PDF_MARGIN - 9;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(255, 255, 255);
    pdf.text(title, PDF_MARGIN, metaY - 4);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(37, 145, 251);
    pdf.text(routeLabel, PDF_MARGIN, metaY + 2);

    pdf.setTextColor(100, 115, 140);
    pdf.text(`${String(index + 1).padStart(2, "0")} / ${slides.length}`, PDF_WIDTH - PDF_MARGIN, metaY + 2, { align: "right" });
  }

  return pdf;
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

    if (isSafariBrowser()) {
      link.target = "_self";
    }

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
