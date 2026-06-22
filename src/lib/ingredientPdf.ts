import jsPDF from "jspdf";
import { products } from "@/data/products";

// Brand colors (RGB)
const NAVY: [number, number, number] = [10, 22, 40];
const BLUE: [number, number, number] = [37, 145, 251];
const INK: [number, number, number] = [24, 31, 38];
const GREY: [number, number, number] = [105, 113, 122];
const LINE: [number, number, number] = [218, 224, 230];

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 15;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM_LIMIT = PAGE_H - 22;

// Column layout for the ingredient table
const COL_ING_X = MARGIN;
const COL_ING_W = 72;
const COL_DOSE_X = MARGIN + 74;
const COL_DOSE_W = 30;
const COL_PURPOSE_X = MARGIN + 106;
const COL_PURPOSE_W = CONTENT_W - 106;

// jsPDF standard fonts are WinAnsi — normalise glyphs that won't render cleanly.
const norm = (v: string) =>
  (v || "")
    .replace(/™/g, "(TM)")
    .replace(/[–—]/g, "-")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"');

export function createIngredientPdf(): jsPDF {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const dateStr = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

  // ---- Cover page ----
  pdf.setFillColor(...NAVY);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");
  pdf.setFillColor(...BLUE);
  pdf.rect(0, 0, PAGE_W, 3, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.setTextColor(...BLUE);
  pdf.text("BASELINE NUTRITION", MARGIN, 40);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(34);
  pdf.setTextColor(255, 255, 255);
  pdf.text("Ingredient", MARGIN, 120);
  pdf.text("Insights", MARGIN, 134);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(190, 200, 215);
  const intro = pdf.splitTextToSize(
    "A full breakdown of every active in the Baseline range — ingredient, clinical dose, and purpose. Clinically dosed. Fully transparent. No proprietary blends.",
    CONTENT_W,
  );
  pdf.text(intro, MARGIN, 150);

  pdf.setFontSize(9);
  pdf.setTextColor(120, 135, 160);
  pdf.text(`Generated ${dateStr}`, MARGIN, PAGE_H - 20);

  // ---- Content pages ----
  pdf.addPage();
  let y = MARGIN + 4;

  const ensureSpace = (needed: number) => {
    if (y + needed > BOTTOM_LIMIT) {
      pdf.addPage();
      y = MARGIN + 4;
    }
  };

  const drawTableHeader = () => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(...GREY);
    pdf.text("INGREDIENT", COL_ING_X, y);
    pdf.text("DOSE", COL_DOSE_X, y);
    pdf.text("PURPOSE", COL_PURPOSE_X, y);
    y += 2;
    pdf.setDrawColor(...LINE);
    pdf.setLineWidth(0.2);
    pdf.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 4;
  };

  Object.values(products).forEach((product) => {
    const rows = product.supplementRows || [];
    if (rows.length === 0) return;

    // Section heading
    ensureSpace(20);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...NAVY);
    pdf.text(norm(product.name), MARGIN, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(...GREY);
    pdf.text(norm(product.format || product.tagline), MARGIN, y);
    y += 6;

    drawTableHeader();

    rows.forEach((row) => {
      const ingredientText = norm(row.spec ? `${row.ingredient} ${row.spec}` : row.ingredient);
      const ingLines = pdf.splitTextToSize(ingredientText, COL_ING_W);
      const purposeLines = pdf.splitTextToSize(norm(row.purpose), COL_PURPOSE_W);
      const doseLines = pdf.splitTextToSize(norm(row.dose || "-"), COL_DOSE_W);
      const rowH = Math.max(ingLines.length, purposeLines.length, doseLines.length) * 4 + 3;

      ensureSpace(rowH + 2);

      pdf.setFontSize(8.5);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(...INK);
      pdf.text(ingLines, COL_ING_X, y);

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(...BLUE);
      pdf.text(doseLines, COL_DOSE_X, y);

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(...GREY);
      pdf.text(purposeLines, COL_PURPOSE_X, y);

      y += rowH;
      pdf.setDrawColor(...LINE);
      pdf.setLineWidth(0.1);
      pdf.line(MARGIN, y - 2, PAGE_W - MARGIN, y - 2);
    });

    y += 8;
  });

  // ---- Disclaimer / footers on every content page ----
  const pageCount = pdf.getNumberOfPages();
  for (let i = 2; i <= pageCount; i += 1) {
    pdf.setPage(i);
    pdf.setDrawColor(...LINE);
    pdf.setLineWidth(0.2);
    pdf.line(MARGIN, PAGE_H - 16, PAGE_W - MARGIN, PAGE_H - 16);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.setTextColor(...GREY);
    pdf.text(
      "Food supplements are not a substitute for a varied, balanced diet. Not intended to diagnose, treat, cure, or prevent any disease.",
      MARGIN,
      PAGE_H - 11,
    );
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...NAVY);
    pdf.text(`baselinenutrition.co.uk   ·   ${i - 1}`, PAGE_W - MARGIN, PAGE_H - 11, { align: "right" });
  }

  return pdf;
}
