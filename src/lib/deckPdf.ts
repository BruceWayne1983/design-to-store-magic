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
    commentary: [
      "Full-width cinematic hero with product family imagery and dual CTA",
      "Trust bar featuring four credibility pillars: Clinically Dosed, Trademarked Ingredients, UK Manufactured, Transparent Formulas",
      "Product showcase grid with Quick Add, pricing, and Best Seller tags",
      "Category navigation cards with hover-zoom effects",
      "Science education section and newsletter capture",
      "Complete footer with sitemap, social links, and legal",
    ],
  },
  {
    title: "Shop All",
    path: "/shop",
    description: "Complete product catalogue with filtering and quick-add functionality",
    commentary: [
      "Hero banner with brand messaging and dual navigation CTAs",
      "Sticky filter/sort bar for category browsing",
      "Product grid with consistent card layout and hover interactions",
      "Quick Add buttons for frictionless cart additions",
      "Status tags (Best Seller, New) for social proof",
      "Stack Systems section for bundled protocols",
    ],
  },
  {
    title: "Product Detail - Glyco8",
    path: "/product/glyco8",
    description: "Full PDP with subscribe & save, ingredient breakdown, mechanisms, and FAQs",
    commentary: [
      "Product hero with large imagery, pricing, and Subscribe & Save toggle",
      "Detailed supplement facts panel with full label transparency",
      "Ingredient breakdown with dosage and clinical references",
      "Mechanism of action infographics (AMPK, GLUT4, Glycogen pathways)",
      "Customer testimonials and social proof",
      "FAQ accordion and related stack recommendations",
    ],
  },
  {
    title: "Performance Category",
    path: "/category/performance",
    description: "Category landing page for the performance supplement range",
    commentary: [
      "Category-specific hero with targeted messaging",
      "Filtered product grid showing performance range only",
      "Educational content tailored to performance goals",
      "Cross-sell into related categories and stack protocols",
    ],
  },
  {
    title: "Pre-Launch",
    path: "/launch",
    description: "VIP early-access holding page with email signup and 20% launch discount",
    commentary: [
      "Full-screen cinematic product family hero with dramatic blue lighting",
      "Email capture form with clear value proposition",
      "20% launch discount incentive badge with pulse animation",
      "Three VIP perk cards: Launch Discount, Early Access, Free UK Shipping",
      "Social media links for pre-launch community building",
    ],
  },
];

const normalizePdfText = (value: string) => value.replace(/[—–]/g, "-");
const CAPTURE_WIDTH = 1440;
const FULL_PAGE_MAX_HEIGHT = 12000;
const PDF_WIDTH = 297;
const PDF_HEIGHT = 210;
const PDF_MARGIN = 10;

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
      scale: 1.5,
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

    return canvas.toDataURL("image/jpeg", 0.88);
  } finally {
    iframe.remove();
  }
};

// Draw a single PDF page with full-page screenshot on the left and commentary on the right
const drawSlidePage = (
  pdf: jsPDF,
  slide: DeckSlide,
  imageData: string,
  index: number,
  total: number,
) => {
  const title = normalizePdfText(slide.title);
  const routeLabel = normalizePdfText(slide.path === "/" ? "Route: /" : `Route: ${slide.path}`);

  // Background
  pdf.setFillColor(10, 22, 40);
  pdf.rect(0, 0, PDF_WIDTH, PDF_HEIGHT, "F");

  // Left accent bar
  pdf.setFillColor(37, 145, 251);
  pdf.rect(0, 0, 3, PDF_HEIGHT, "F");

  // --- Left panel: full-page screenshot ---
  const screenshotPanelWidth = 170;
  const imgX = PDF_MARGIN;
  const imgY = PDF_MARGIN;
  const imgMaxWidth = screenshotPanelWidth - PDF_MARGIN;
  const imgMaxHeight = PDF_HEIGHT - PDF_MARGIN * 2;

  // We need to figure out the image aspect ratio from the data
  // For now scale to fit the available area maintaining aspect ratio
  // Image is tall (full page), so height will be the constraining dimension
  pdf.addImage(imageData, "JPEG", imgX, imgY, imgMaxWidth, imgMaxHeight, undefined, "FAST");

  // Subtle border around screenshot
  pdf.setDrawColor(37, 145, 251);
  pdf.setLineWidth(0.3);
  pdf.rect(imgX, imgY, imgMaxWidth, imgMaxHeight);

  // --- Right panel: commentary ---
  const commentX = screenshotPanelWidth + 8;
  const commentWidth = PDF_WIDTH - commentX - PDF_MARGIN;
  let cursorY = PDF_MARGIN + 4;

  // Slide number
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(36);
  pdf.setTextColor(37, 145, 251);
  pdf.text(String(index + 1).padStart(2, "0"), commentX, cursorY + 10);
  cursorY += 18;

  // Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(255, 255, 255);
  const titleLines = pdf.splitTextToSize(title, commentWidth);
  pdf.text(titleLines, commentX, cursorY);
  cursorY += titleLines.length * 7 + 4;

  // Route
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(37, 145, 251);
  pdf.text(routeLabel, commentX, cursorY);
  cursorY += 8;

  // Divider
  pdf.setDrawColor(37, 145, 251);
  pdf.setLineWidth(0.4);
  pdf.line(commentX, cursorY, commentX + commentWidth, cursorY);
  cursorY += 8;

  // Description
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(9);
  pdf.setTextColor(160, 175, 200);
  const descLines = pdf.splitTextToSize(normalizePdfText(slide.description), commentWidth);
  pdf.text(descLines, commentX, cursorY);
  cursorY += descLines.length * 4.5 + 8;

  // Commentary heading
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(37, 145, 251);
  pdf.text("KEY FEATURES", commentX, cursorY);
  cursorY += 7;

  // Commentary bullets
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(200, 210, 225);

  for (const point of slide.commentary) {
    const bulletText = normalizePdfText(point);
    const lines = pdf.splitTextToSize(bulletText, commentWidth - 6);

    // Bullet dot
    pdf.setFillColor(37, 145, 251);
    pdf.circle(commentX + 1.5, cursorY - 1, 0.8, "F");

    pdf.text(lines, commentX + 5, cursorY);
    cursorY += lines.length * 4 + 3;

    if (cursorY > PDF_HEIGHT - PDF_MARGIN - 10) break;
  }

  // Page counter bottom right
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(80, 95, 120);
  pdf.text(`${String(index + 1).padStart(2, "0")} / ${total}`, PDF_WIDTH - PDF_MARGIN, PDF_HEIGHT - PDF_MARGIN, { align: "right" });

  // Brand bottom right
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(60, 75, 100);
  pdf.text("BASELINE", PDF_WIDTH - PDF_MARGIN, PDF_HEIGHT - PDF_MARGIN - 5, { align: "right" });
};

export type ProgressCallback = (current: number, total: number, slideTitle: string) => void;

export const createDeckPdf = async (slides: DeckSlide[], onProgress?: ProgressCallback) => {
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  for (const [index, slide] of slides.entries()) {
    if (index > 0) pdf.addPage();
    onProgress?.(index + 1, slides.length, slide.title);

    const imageData = await captureFullPage(slide);
    drawSlidePage(pdf, slide, imageData, index, slides.length);
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
