// Captures full-page screenshots of every route in desktop + mobile.
//
// Usage (local machine, one-time browser install):
//   npx playwright install chromium
//   npm run screenshots
//
// Output: ./screenshots/desktop/*.png and ./screenshots/mobile/*.png
//
// It builds the app, serves it with `vite preview`, bypasses the password
// gate, scrolls each page to trigger reveal animations, then screenshots.

import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium, devices } from "@playwright/test";

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

// slug => route. Slug becomes the PNG filename.
const ROUTES = {
  "01-prelaunch": "/",
  "02-home": "/home",
  "03-shop": "/shop",
  "04-bundles": "/bundles",
  "05-ingredient-insights": "/ingredient-insights",
  "06-category-performance": "/category/performance",
  "07-knowledge-base": "/knowledge-base",
  "08-blog": "/blog",
  "09-blog-article": "/blog/understanding-glucose-disposal-agents",
  "10-product-fusion-lite-plus": "/product/fusion-lite-plus",
  "11-product-vascul8": "/product/vascul8",
  "12-product-glyco8": "/product/glyco8",
  "13-product-glycoshift": "/product/glycoshift",
  "14-product-electro-flow": "/product/electro-flow",
  "15-product-purest-creatine": "/product/purest-creatine",
  "16-product-h2o-go": "/product/h2o-go",
  "17-about": "/about",
  "18-contact": "/contact",
  "19-shipping-returns": "/shipping-returns",
  "20-app": "/app",
  "21-privacy": "/privacy",
  "22-terms": "/terms",
  "23-cookies": "/cookies",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(500);
  }
  throw new Error(`Server did not start at ${url} within ${timeoutMs}ms`);
}

// Scroll the full page in steps to trigger IntersectionObserver / whileInView
// reveal animations, then return to the top.
async function triggerReveals(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    const max = document.body.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
  });
}

async function capture(context, label, dir) {
  const page = await context.newPage();
  // Bypass the soft password gate before any app script runs.
  await page.addInitScript(() => {
    try { sessionStorage.setItem("site_unlocked", "true"); } catch {}
  });

  for (const [slug, route] of Object.entries(ROUTES)) {
    try {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(600);
      await triggerReveals(page);
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${dir}/${slug}.png`, fullPage: true });
      console.log(`  ✓ [${label}] ${route}`);
    } catch (err) {
      console.warn(`  ✗ [${label}] ${route} — ${err.message}`);
    }
  }
  await page.close();
}

async function main() {
  await mkdir("screenshots/desktop", { recursive: true });
  await mkdir("screenshots/mobile", { recursive: true });

  console.log("→ Starting preview server…");
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "ignore",
    shell: process.platform === "win32",
  });

  try {
    await waitForServer(BASE);
    console.log(`→ Server ready at ${BASE}`);

    const browser = await chromium.launch();

    console.log("→ Capturing desktop (1440×900)…");
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    await capture(desktop, "desktop", "screenshots/desktop");
    await desktop.close();

    console.log("→ Capturing mobile (iPhone 13)…");
    const mobile = await browser.newContext({ ...devices["iPhone 13"] });
    await capture(mobile, "mobile", "screenshots/mobile");
    await mobile.close();

    await browser.close();
    console.log("\n✅ Done. See ./screenshots/desktop and ./screenshots/mobile");
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
