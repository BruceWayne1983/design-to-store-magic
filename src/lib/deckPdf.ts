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

export const createDeckPdf = (slides: DeckSlide[]) => {
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const width = 297;
  const height = 210;

  slides.forEach((slide, index) => {
    if (index > 0) pdf.addPage();

    const title = normalizePdfText(slide.title);
    const description = normalizePdfText(slide.description);
    const routeLabel = normalizePdfText(slide.path === "/" ? "Route: homepage" : `Route: ${slide.path}`);

    pdf.setFillColor(10, 22, 40);
    pdf.rect(0, 0, width, height, "F");

    pdf.setFillColor(37, 145, 251);
    pdf.rect(0, 0, 4, height, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(48);
    pdf.setTextColor(37, 145, 251);
    pdf.text(String(index + 1).padStart(2, "0"), 20, 50);

    pdf.setFontSize(28);
    pdf.setTextColor(255, 255, 255);
    pdf.text(title, 20, 70);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);
    pdf.setTextColor(180, 190, 210);
    const descriptionLines = pdf.splitTextToSize(description, width - 40);
    pdf.text(descriptionLines, 20, 85);

    pdf.setFontSize(11);
    pdf.setTextColor(37, 145, 251);
    pdf.text(routeLabel, 20, 105);

    pdf.setFontSize(9);
    pdf.setTextColor(100, 115, 140);
    pdf.text("BASELINE - Site Deck", 20, height - 12);
    pdf.text(`${index + 1} / ${slides.length}`, width - 20, height - 12, { align: "right" });
  });

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
