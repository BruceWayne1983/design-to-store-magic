

# Impulse Theme Alignment — Implementation Plan

## Overview
Implement the top 15 missing Impulse theme features to bring the Baseline Nutrition site to parity with the Shopify Impulse theme standard.

---

## Phase 1: Sticky Elements

### 1. Sticky Header with Shrink on Scroll
**File:** `src/components/Navbar.tsx`
- Already has `sticky top-0` — add scroll-aware shrink behavior
- Use a `useEffect` with `scroll` listener to detect when scrolled past ~60px
- When scrolled: reduce height from 72px to 56px, shrink logo from `h-12` to `h-8`, add subtle `shadow-md`
- Smooth transition via `transition-all duration-300`

### 2. Sticky Add-to-Cart Bar (PDP)
**New file:** `src/components/product/StickyAddToCart.tsx`
- Fixed bottom bar that appears when the main "Add to basket" button scrolls out of view
- Uses `IntersectionObserver` on the ProductHero buy button
- Shows: product name, price, "Add to basket" button
- Slides up with `translate-y` animation
- **File:** `src/pages/ProductDetail.tsx` — import and add the component

---

## Phase 2: Hero Slideshow

### 3. Auto-Rotating Hero Slideshow
**File:** `src/components/HeroSection.tsx` — full rewrite
- Array of 3 slides, each with: background image, tagline, headline, description, CTA buttons
- Auto-rotate every 6 seconds with `setInterval`
- Dot indicators at bottom, clickable
- Fade/crossfade transition between slides using `AnimatePresence` from framer-motion
- Pause auto-rotation on hover
- Slide data: Performance (current), Metabolic (glyco products), Hydration (electro/h2o)

---

## Phase 3: Shop Page Filters

### 4. Collection Sidebar Filters
**File:** `src/pages/Shop.tsx`
- Add a horizontal filter bar above the product grid (Impulse style)
- Filter chips: "All", "Performance", "Metabolic", "Health & Hydration"
- Sort dropdown: "Featured", "Price: Low-High", "Price: High-Low", "A-Z"
- Tag each product in the `products` array with a `category` field
- Filter state with `useState`, animate grid changes

---

## Phase 4: Cart Drawer Enhancements

### 5. Shipping Progress Bar in Cart
**File:** `src/components/CartDrawer.tsx`
- Already has a shipping progress bar and upsells section — these are present in the current code
- Verify they render correctly (the code already has `FREE_SHIPPING_THRESHOLD`, progress bar, and "You may also like" upsells)
- No changes needed here — already implemented

---

## Phase 5: Product Detail Enhancements

### 6. Variant Swatches (Flavour/Size Selector)
**File:** `src/components/product/ProductHero.tsx`
- Add variant selector UI for products that have variants (e.g., Pürest Creatine 300g/500g)
- Render as clickable pills/swatches below the product title
- Update `ProductData` interface in `src/data/products.ts` to include optional `variants` array
- Selected variant updates price display

### 7. Quick-Add Modal
**New file:** `src/components/QuickAddModal.tsx`
- Modal overlay triggered by hover "Quick Add" button on product cards
- Shows: product image, name, price, variant selector (if applicable), quantity, Add to Cart button
- Uses the existing `Dialog` component from shadcn
- **File:** `src/pages/Shop.tsx` — add hover overlay on product cards with "Quick Add" button
- **File:** `src/components/ProductCard.tsx` — update with hover state

### 8. Product Reviews Section
**New file:** `src/components/product/ProductReviews.tsx`
- Empty-state review section ready for Judge.me integration
- Shows: average rating summary, "Write a Review" button, "No reviews yet" placeholder
- Star rating display component
- **File:** `src/pages/ProductDetail.tsx` — add between Testimonials and FAQ

### 9. Recently Viewed Products
**New file:** `src/components/product/RecentlyViewed.tsx`
- Horizontal scrollable carousel of recently viewed products
- Store viewed product slugs in `localStorage`
- Hook: `useRecentlyViewed(currentSlug)` — adds current product on mount, returns other recent items
- **File:** `src/pages/ProductDetail.tsx` — add before Footer

---

## Phase 6: UI Polish

### 10. Countdown Timer / Promo Banner
**New file:** `src/components/sections/CountdownBanner.tsx`
- Full-width promotional banner with countdown timer
- Configurable end date, headline, CTA
- Timer shows days/hours/minutes/seconds, updates every second
- **File:** `src/pages/Index.tsx` — add below hero section

### 11. Mobile Hamburger Drawer
**File:** `src/components/Navbar.tsx`
- Current mobile menu is a simple dropdown — upgrade to full-screen slide-out drawer
- Accordion navigation for sub-categories (Shop → Performance, Metabolic, Health)
- Social links and account buttons at bottom
- Uses framer-motion for slide animation from left

### 12. Back-to-Top Button
**New file:** `src/components/BackToTop.tsx`
- Fixed button bottom-right, appears after scrolling 400px
- Smooth scroll to top on click
- Fade in/out animation
- **File:** `src/App.tsx` or layout — render globally

### 13. Social Media Links in Footer
**File:** `src/components/Footer.tsx`
- Social links already exist (Instagram, Facebook, YouTube) with `href="#"`
- Add TikTok icon
- Update hrefs to real Baseline Nutrition social URLs when available

### 14. Predictive Search with Thumbnails
**File:** `src/components/SearchOverlay.tsx`
- Enhance existing search overlay to show product thumbnails in results
- Match against product names from `products.ts`
- Show product image, name, price in dropdown results

### 15. Image Hotspots / Shoppable Images
**New file:** `src/components/sections/ShoppableImage.tsx`
- Lifestyle/lineup image with clickable hotspot dots
- Each dot shows a tooltip with product name + "Shop" link
- Use the lineup image as the base
- **File:** `src/pages/Index.tsx` — add as a section

---

## Files Changed (Summary)

| Action | File |
|--------|------|
| Edit | `src/components/Navbar.tsx` (sticky shrink + mobile drawer) |
| Edit | `src/components/HeroSection.tsx` (slideshow) |
| Edit | `src/pages/Shop.tsx` (filters + quick-add) |
| Edit | `src/pages/ProductDetail.tsx` (new sections) |
| Edit | `src/components/product/ProductHero.tsx` (variants) |
| Edit | `src/data/products.ts` (variant data) |
| Edit | `src/components/SearchOverlay.tsx` (predictive search) |
| Edit | `src/components/Footer.tsx` (TikTok) |
| Create | `src/components/product/StickyAddToCart.tsx` |
| Create | `src/components/QuickAddModal.tsx` |
| Create | `src/components/product/ProductReviews.tsx` |
| Create | `src/components/product/RecentlyViewed.tsx` |
| Create | `src/components/sections/CountdownBanner.tsx` |
| Create | `src/components/sections/ShoppableImage.tsx` |
| Create | `src/components/BackToTop.tsx` |
| Create | `src/hooks/useRecentlyViewed.ts` |

## Implementation Order
1. Sticky nav shrink + sticky add-to-cart bar
2. Hero slideshow
3. Shop page filters + sort
4. Variant swatches on PDP
5. Quick-add modal
6. Mobile hamburger drawer upgrade
7. Back-to-top button
8. Countdown/promo banner
9. Product reviews placeholder
10. Recently viewed carousel
11. Predictive search with thumbnails
12. Shoppable image hotspots
13. Footer social links update

