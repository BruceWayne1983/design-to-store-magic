# Website Comparison & SEO Plan — Baseline Peptide Arm

Site architecture, keyword strategy, on-page recipe and 90-day content plan for shipping the peptide collection in the lowest-friction, highest-SEO-yield way.

---

## A. Side-by-side comparison

| Dimension | Baseline (current) | Infinis (current) | Baseline (proposed peptide arm) |
|---|---|---|---|
| **URL structure** | `/product/<slug>` (flat) | `/collections/peptides/products/<slug>` (Shopify) | `/shop/peptides`, `/shop/peptides/<slug>`, plus existing `/product/<slug>` redirects in for back-compat |
| **Navigation** | Shop · Stacks · Science · About | Shop · Peptide info · Stacks | Add "Peptides" top-level item + "Science / Peptides 101" mega-menu column |
| **Category taxonomy** | Performance · Metabolic · Health & Hydration (3) | All peptides flat | Add 4th category "Peptides" with 6 sub-tags: Muscle, Joint, Skin, Vascular, Lean, Calm |
| **Product naming** | Clinical-trademark style (VASCUL8™, GLYCO8™) | "PEPTIDE [code]" pattern in 100% of names | `PEPTI-[ROLE] [CODE]` pattern — "peptide" in 100% of slugs/H1s |
| **On-page SEO** | Helmet title/desc per product; clean | Strong keyword density; weak schema | Helmet + schema + structured FAQ + Breadcrumb on every page |
| **Content depth** | High (rich mechanism, supplement-facts, FAQ) | Medium (marketing-led) | Match existing depth + add /science/peptides hub |
| **Schema markup** | Limited (no JSON-LD visible on Shop.tsx) | Limited | Product, CollectionPage, FAQPage, BreadcrumbList JSON-LD on every peptide route |
| **Internal linking** | RelatedSlugs per product (good) | Modest | Build "from category", "from blog", "from science hub" — minimum 4 internal entry points per peptide SKU |
| **Blog / educational** | Blog.tsx exists | Light | Launch /science/peptides hub + 8-post content cluster |
| **Social proof** | Testimonials per product | Some | Mirror existing pattern + UGC layer (Trustpilot integration) |

**Strategic read-out:** Baseline's pages are already deeper than Infinis on content and structure. What Infinis has — and Baseline lacks — is **keyword density** (the word "peptide" everywhere) and **category authority** (a dedicated /peptides collection page). The proposed arm closes both gaps without compromising the clinical voice.

---

## B. Keyword research

### B.1 Head terms (estimated — Google Keyword Planner / Ahrefs-style ranges)

| Keyword | Est. monthly search (UK) | Difficulty | Funnel stage | Notes |
|---|---|---|---|---|
| peptides | 12,000–18,000 | High (75+) | TOFU | Broad — risky, dominated by clinics and PED forums. Don't chase head-on. |
| peptide supplements | 1,500–3,000 | Medium (45) | MOFU | Core target. |
| collagen peptides | 14,000–22,000 | High (60) | MOFU | Volume gold; needs depth. |
| collagen peptides UK | 2,000–4,000 | Medium (38) | MOFU | UK qualifier shifts intent to commercial. |
| peptide protein | 1,500–3,000 | Medium (42) | MOFU | Direct Infinis competitor term. |
| best peptide supplement UK | 600–1,200 | Medium (35) | BOFU | High commercial intent. |
| peptide supplement for skin | 800–1,500 | Medium (35) | MOFU | PEPTI-GLO S30 target. |
| peptides for joints | 1,200–2,200 | Medium (38) | MOFU | PEPTI-RECON J22 target. |
| natural GLP-1 supplement | 2,500–5,000 | Medium (45) | MOFU | Surging — semaglutide media halo. PEPTI-LEAN E08 target. |
| peptides for muscle growth | 1,800–3,500 | High (55) | MOFU | PEPTI-BUILD M14 — competing with PED/research peptide content. Anchor around "food-grade" angle. |

### B.2 Long-tail terms (20+)

| Long-tail | Funnel | Lands on |
|---|---|---|
| what are peptides supplements | TOFU | /science/peptides hub |
| are peptides legal in the uk | TOFU | /science/peptides hub |
| peptides vs protein difference | TOFU | Blog Post 1 |
| bioactive collagen peptides explained | TOFU | Blog Post 2 |
| how long does it take collagen peptides to work | TOFU/MOFU | Blog Post 3 |
| best time to take collagen peptides | MOFU | Blog Post 3 |
| collagen peptides for tendons | MOFU | PEPTI-RECON J22 |
| verisol collagen UK | MOFU | PEPTI-GLO S30 |
| peptide pre-workout UK | MOFU | PEPTI-RECON J22 / PEPTI-BUILD M14 |
| whey hydrolysate vs whey isolate | MOFU | Blog Post 4 |
| leucine peptide supplement | MOFU | PEPTI-BUILD M14 |
| natural glp-1 booster | MOFU | PEPTI-LEAN E08 |
| eriomin lemon extract UK | MOFU | PEPTI-LEAN E08 |
| lactotripeptides blood pressure | MOFU | PEPTI-FLOW V07 |
| amealpeptide supplement UK | BOFU | PEPTI-FLOW V07 |
| alpha-casozepine sleep | MOFU | PEPTI-CALM N03 |
| lactium uk supplement | BOFU | PEPTI-CALM N03 |
| peptide stack for recovery | MOFU | Blog Post 6 |
| how to stack collagen and creatine | MOFU | Blog Post 7 |
| peptides without injections | TOFU | /science/peptides hub |
| food-grade peptides definition | TOFU | /science/peptides hub |
| baseline peptides review | BOFU | Collection page |
| infinis alternative uk | BOFU | Collection page + comparison block |

### B.3 Funnel grouping

| Stage | Intent | Page focus | Example queries |
|---|---|---|---|
| **TOFU** | Education | /science/peptides hub + blog | "what are peptides", "peptides vs protein", "are peptides legal uk" |
| **MOFU** | Evaluation | Category page + comparison blog posts | "best collagen peptides UK", "collagen peptides for tendons", "natural GLP-1 booster" |
| **BOFU** | Purchase | Product detail pages | "verisol UK", "amealpeptide UK", "Infinis alternative" |

---

## C. On-page SEO recipe for `/shop/peptides`

### C.1 Title tag and meta description

```html
<title>Peptide Supplements UK — Bioactive Collagen, Whey & GLP-1 | Baseline</title>
<meta name="description" content="Clinically dosed peptide supplements made in the UK. Bioactive collagen for joints & skin, whey hydrolysate for muscle, lactotripeptides for blood pressure, natural GLP-1 modulators. Trademarked actives at full clinical doses." />
```

Title is 67 characters · meta is 211 characters (Google truncates around 158; the first 158 carry the value: "Clinically dosed peptide supplements made in the UK. Bioactive collagen for joints & skin, whey hydrolysate for muscle, lactotripeptides...")

### C.2 H1 / H2 outline

```
H1: Peptide Supplements — Bioactive, Food-Grade, Fully Disclosed

H2: What "peptide" means at Baseline
H2: The Baseline peptide range
  H3 (per SKU x6): PEPTI-BUILD M14 / PEPTI-RECON J22 / PEPTI-GLO S30 / PEPTI-FLOW V07 / PEPTI-LEAN E08 / PEPTI-CALM N03
H2: How to choose your peptide
H2: How peptides differ from prescription / research peptides
H2: Frequently asked questions
H2: The science — go deeper
```

### C.3 300-word collection-page intro copy

> Peptides are short chains of amino acids — between two and fifty — that act differently from intact proteins. When a whole protein is hydrolysed by food-grade enzymes, it releases di-peptide and tri-peptide fragments small enough to cross the gut barrier intact, fast enough to spike plasma amino acids within thirty minutes, and specific enough to bind receptors and modulate enzymes whole proteins cannot reach.
>
> The Baseline peptide range is built on six clinically validated, food-grade peptide actives — Verisol®, Fortigel®, Tendoforte®, Lacprodan® BLG-100, PepForm® Leucine Peptides, AMEALPEPTIDE® and Lactium® — each dosed at or above the trial-validated clinical level. No proprietary blends, no peptide-fairy-dust labels, no prescription overlap. Everything in this range is legal to buy and use in the United Kingdom as a food supplement.
>
> We've split the range across six roles. **PEPTI-BUILD M14** is the post-training muscle-protein-synthesis driver — whey hydrolysate plus BLG-100 plus a peptide-bonded leucine carrier, delivering more than five grams of leucine per serving. **PEPTI-RECON J22** combines Fortigel® and Tendoforte® bioactive collagen peptides at full clinical doses for joint and tendon adaptation under load. **PEPTI-GLO S30** is the bioactive skin stack — Verisol® at twice the trial dose, supported by marine collagen, hyaluronic acid and AstaReal® astaxanthin. **PEPTI-FLOW V07** is the cardiovascular maintenance capsule — AMEALPEPTIDE® lactotripeptides plus sardine peptide Val-Tyr plus ubiquinol Kaneka™. **PEPTI-LEAN E08** is the natural GLP-1 satiety stack — Eriomin® lemon flavonoid, Yerba Mate and Caralluma fimbriata, with the explicit guardrail that this is not semaglutide and contains no prescription drug. **PEPTI-CALM N03** is Lactium® alpha-casozepine for stress and sleep, dosed at the 150mg clinical-trial level.
>
> Read the science before you buy. Choose by goal, not by marketing.

(317 words — adjust to 300 by trimming the last paragraph's intro if desired.)

### C.4 Schema.org JSON-LD snippets

**CollectionPage**

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Peptide Supplements",
  "url": "https://baselinenutrition.co.uk/shop/peptides",
  "description": "Clinically dosed, food-grade peptide supplements — bioactive collagen, whey hydrolysate, lactotripeptides, natural GLP-1 modulators. Made in the UK.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Baseline Nutrition",
    "url": "https://baselinenutrition.co.uk"
  },
  "hasPart": [
    { "@type": "Product", "name": "PEPTI-BUILD M14", "url": "https://baselinenutrition.co.uk/shop/peptides/pepti-build-m14" },
    { "@type": "Product", "name": "PEPTI-RECON J22", "url": "https://baselinenutrition.co.uk/shop/peptides/pepti-recon-j22" },
    { "@type": "Product", "name": "PEPTI-GLO S30", "url": "https://baselinenutrition.co.uk/shop/peptides/pepti-glo-s30" },
    { "@type": "Product", "name": "PEPTI-FLOW V07", "url": "https://baselinenutrition.co.uk/shop/peptides/pepti-flow-v07" },
    { "@type": "Product", "name": "PEPTI-LEAN E08", "url": "https://baselinenutrition.co.uk/shop/peptides/pepti-lean-e08" },
    { "@type": "Product", "name": "PEPTI-CALM N03", "url": "https://baselinenutrition.co.uk/shop/peptides/pepti-calm-n03" }
  ]
}
</script>
```

**FAQPage**

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are peptide supplements legal in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — food-grade bioactive peptides such as hydrolysed collagen, whey hydrolysate, milk-derived lactotripeptides and casein peptides are legal in the United Kingdom as food supplements. Prescription and research peptides such as BPC-157, semaglutide and tesamorelin are not sold as supplements and are out of scope."
      }
    },
    {
      "@type": "Question",
      "name": "How are peptides different from protein powder?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Peptides are short chains of 2 to 50 amino acids released from whole proteins by enzymatic hydrolysis. They are absorbed faster and more completely than intact protein, and many peptide sequences are biologically active — for example IPP and VPP inhibit angiotensin-converting enzyme, and Pro-Hyp accumulates in cartilage and skin."
      }
    },
    {
      "@type": "Question",
      "name": "How long until I see results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Whey and leucine peptides produce measurable training-day recovery effects within 1–2 weeks. Bioactive collagen peptide endpoints in published RCTs hit at 8 weeks (skin) to 12–24 weeks (joint and tendon). Lactotripeptide blood pressure effects need 8–12 weeks of daily use."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to cycle peptide supplements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Food-grade peptides do not require cycling. Continuous daily use is the protocol for connective-tissue, cardiovascular, sleep and metabolic targets. Botanical satiety stacks containing stimulants may be cycled 8 weeks on / 2 weeks off."
      }
    },
    {
      "@type": "Question",
      "name": "Can I stack collagen peptides with creatine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — and the combination is recommended for lifters concerned about connective tissue. Creatine drives the training load that signals adaptation; collagen peptides supply the substrate and trigger fibroblast collagen synthesis. Pürest Creatine and PEPTI-RECON J22 are designed to be stacked."
      }
    }
  ]
}
</script>
```

**BreadcrumbList**

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://baselinenutrition.co.uk/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Shop",
      "item": "https://baselinenutrition.co.uk/shop"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Peptides",
      "item": "https://baselinenutrition.co.uk/shop/peptides"
    }
  ]
}
</script>
```

### C.5 Internal link recipe

**Inbound to `/shop/peptides`:**
- Top-nav primary link (every page on the site)
- Homepage hero or featured collection rail (high-priority slot)
- Each existing product page — add a "Pairs well with" rail linking the relevant peptide SKU (e.g. Pürest Creatine → PEPTI-BUILD M14; VASCUL8 → PEPTI-FLOW V07)
- Blog: every peptide-related post (8 posts in the cluster) links category page in intro + at least one product page in the conclusion
- Footer "Shop by category" column
- /science hub featured links

**Outbound from `/shop/peptides`:**
- 6 product detail pages (one each)
- /science/peptides hub (educational anchor)
- 3–4 in-line blog post links inside the category copy
- Featured "compare with creatine + collagen stack" cross-link to /stacks (future)

---

## D. Content cluster — 8 blog post titles + outlines

1. **What Are Peptides? A Plain-English Guide to Food-Grade Bioactives**
   TOFU pillar. Defines peptide vs amino acid vs protein. Distinguishes food-grade peptides (collagen, whey hydrolysate, lactotripeptides, casein peptides) from prescription/research peptides (semaglutide, BPC-157). Establishes Baseline's clinical voice as the authoritative UK source. Links to all six product pages.

2. **Bioactive Collagen Peptides Explained: Verisol®, Fortigel®, Tendoforte®, Peptan®**
   MOFU. Direct-comparison piece: what each trademarked BCP is, who makes it, what trial supports it, what dose, what to expect at 4/8/12 weeks. Anchors PEPTI-GLO S30 and PEPTI-RECON J22. Links to clinical sources (Proksch 2014, GELITA Fortigel Tufts study).

3. **How Long Does Collagen Take to Work? An Evidence-Based Timeline**
   MOFU. Week-by-week breakdown of measurable endpoints: 4 weeks (early skin moisture), 8 weeks (Verisol® RCT primary endpoint — 20% wrinkle reduction), 12 weeks (joint comfort markers), 24 weeks (Peptan® joint endpoint). Calls out the 12-week rule. Anchors PEPTI-GLO S30 and PEPTI-RECON J22.

4. **Whey Hydrolysate vs Whey Isolate vs Whey Concentrate — Which Drives MPS?**
   MOFU. Compares absorption kinetics, leucine kinetics, mTORC1 signalling (cite Hamarsland 2019). Explains why PEPTI-BUILD M14 uses BLG-100 + hydrolysate + PepForm® leucine peptides rather than basic isolate. Anchors PEPTI-BUILD M14.

5. **Natural GLP-1 Modulators: What Works, What's Hype, What's Not Semaglutide**
   MOFU. Reviews Eriomin® (RCT data), Yerba Mate (Kim 2015), Caralluma fimbriata (mixed meta-analysis), berberine — and clearly separates them from prescription GLP-1 agonists. ASA-safe; explicitly disclaims drug equivalence. Anchors PEPTI-LEAN E08.

6. **Building a Peptide Stack: Five Protocols by Goal**
   MOFU. Practical: muscle, recovery, female recomp, vascular health, stress/sleep. Each protocol names existing Baseline products + relevant peptide SKU. Designed for high CTR to multiple product pages. Anchors all six SKUs.

7. **Creatine + Collagen — The Stack Connective Tissue Has Been Waiting For**
   MOFU. Long lifters with joint niggles. Combines existing Pürest Creatine narrative with PEPTI-RECON J22. Cites Shaw 2017 collagen-pre-loading-training trial and creatine connective-tissue studies. Cross-sell content piece.

8. **Lactotripeptides for Blood Pressure: What 25 Years of Clinical Trials Actually Show**
   MOFU. Honest review of IPP/VPP evidence — admits the mixed meta-analyses, names AMEALPEPTIDE® and TensGuard®, lays out the 8–12 week protocol. Anchors PEPTI-FLOW V07. UK-compliant phrasing using "may support" and the K/Mg authorised claims.

---

## E. 30/60/90 day rollout plan

| Window | Channel | Action | Owner | Output |
|---|---|---|---|---|
| **Day 0–14** | Product / Eng | Ship `/shop/peptides` collection route; add Peptide category filter to Shop.tsx; add PEPTI-BUILD M14 and PEPTI-RECON J22 product data to `products.ts` | Eng | 2 live PDPs + 1 live collection page |
| **Day 0–14** | SEO | Implement Helmet titles/desc + 3 JSON-LD blocks per page; submit sitemap; index in GSC | SEO | Pages indexed in Google |
| **Day 0–30** | Content | Publish Blog Posts 1, 2, 4 (TOFU pillar + 2 MOFU); /science/peptides hub live | Content | 3 posts + 1 hub page |
| **Day 0–30** | Email | Existing list — "Peptides at Baseline: what we built and why" sequence (4 emails) | CRM | 4 emails sent |
| **Day 15–45** | Paid | Meta + Google Search campaigns on head + long-tail terms; landing = `/shop/peptides` | Growth | First conversions tracked |
| **Day 30–60** | Content | Blog Posts 3, 6, 7 published | Content | 3 more posts live |
| **Day 30–60** | PR / influencer | UK fitness press outreach (Strength Matters, Men's Health UK), 8–10 influencer seedings of M14 + J22 | PR | 4 placements / 8 seedings |
| **Day 60–90** | Product | Wave 2 SKUs ready: PEPTI-GLO S30 + PEPTI-LEAN E08 launched | Brand | 4 PDPs total live |
| **Day 60–90** | Content | Blog Post 5 (GLP-1) launched at the same time as PEPTI-LEAN E08 for keyword leverage | Content | Content + commercial co-launch |
| **Day 60–90** | SEO | Backlink campaign — supplement directories, comparison posts, "Infinis alternative UK" placements | SEO | 10+ DR40+ links |
| **Day 90+** | Wave 3 | Prep PEPTI-FLOW V07 and PEPTI-CALM N03 (Day 180 launch); Blog Post 8 ready | Brand | Stage set for Wave 3 |

---

## F. Risks and mitigations

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| **Regulatory (UKNHCC / ASA)** — making unauthorised peptide claims on-pack or in ads | High | Medium | Audit every claim against the GB Nutrition and Health Claims Register before publish. Use the authorised micronutrient claims (Vit C / Biotin / Zn / K / Mg) to carry messaging the peptide cannot. Pre-flight all paid creative through compliance. |
| **GLP-1 / semaglutide confusion** — PEPTI-LEAN E08 mistaken for the drug | High | Medium | Explicit disclaimer on PDP, label, and ad creative: "Natural GLP-1 modulators — not the drug. Contains no semaglutide or prescription compounds." |
| **Brand cannibalisation** — PEPTI-BUILD M14 eating into Pürest Creatine revenue | Low | Low | M14 contains 3g creatine but recommends pairing with Pürest at 5g/day. Cross-sell bundle pricing avoids zero-sum. |
| **COGS pressure** — trademarked ingredient licensing inflating COGS above 25% | Medium | Medium | Negotiate volume tiers with GELITA, Ingredia, Asahi pre-launch. Have generic backups specified for re-formulation (e.g. generic hydrolysed collagen in PEPTI-GLO S30 V2 if Verisol® licensing escalates). |
| **Inventory risk** — over-stocking Wave 2/3 SKUs before Wave 1 proves the model | Medium | High | Stage MOQs in waves of 1,000–2,500 units. Buy long-life ingredient stock; package on demand. |
| **Infinis copy-back** — they add Lactium / GLP-1 SKUs to compete | Medium | Medium | Beat them on clinical voice and UK compliance. Their US-style copy already faces ASA risk in UK ads. Out-compete on substance, not just SKU count. |
| **ASA challenge on athlete testimonials** — same risk profile as existing range | Low | Low | Continue current testimonial structure (named user, role, quote). Avoid medical-condition implications. |
| **SEO cannibalisation** — peptide category page outranks individual SKUs | Low | Medium | Strong internal linking down to SKUs; product schema on PDPs; differentiated H1s and meta per page. |
| **Stock-out cascades during launch** — under-stocking M14 and J22 | High | Medium | Inventory buffer = first 90 days of forecast × 1.5. Notify-me capture on PDP if out-of-stock to preserve demand signal. |

---

## Appendix — Implementation checklist (Eng / Product)

- [ ] Add `peptides` category to `Category` type in `src/pages/Shop.tsx`
- [ ] Add 6 SKUs to `src/data/products.ts` using the existing `ProductData` shape
- [ ] Create `/shop/peptides` route with collection-page Helmet block and 3 JSON-LD scripts
- [ ] Add "Pairs well with" peptide pairings to existing products' `relatedSlugs`
- [ ] Add Peptides item to top-nav (Navbar component)
- [ ] Create `/science/peptides` hub page (reuse existing KnowledgeBase scaffold)
- [ ] Publish Blog Posts 1, 2, 4 (BlogArticle.tsx pattern, slug each)
- [ ] Submit updated sitemap.xml to Google Search Console
- [ ] QA: Lighthouse SEO score ≥95 on `/shop/peptides`; structured data validates in Rich Results Test
