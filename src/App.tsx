import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import PreLaunch from "./pages/PreLaunch.tsx";
import PasswordGate from "./components/PasswordGate.tsx";
import BackToTop from "./components/BackToTop.tsx";
import CookieConsent from "./components/CookieConsent.tsx";

const Index = lazy(() => import("./pages/Index.tsx"));
const Shop = lazy(() => import("./pages/Shop.tsx"));
const Bundles = lazy(() => import("./pages/Bundles.tsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const PerformanceCategory = lazy(() => import("./pages/PerformanceCategory.tsx"));
const Deck = lazy(() => import("./pages/Deck.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsConditions = lazy(() => import("./pages/TermsConditions.tsx"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogArticle = lazy(() => import("./pages/BlogArticle.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const ShippingReturns = lazy(() => import("./pages/ShippingReturns.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase.tsx"));
const IngredientInsights = lazy(() => import("./pages/IngredientInsights.tsx"));
const AppLanding = lazy(() => import("./pages/AppLanding.tsx"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen w-full" aria-hidden="true" />
);

function AppContent() {
  useCartSync();
  const isDeckCapture = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("deckCapture") === "true";

  return (
    <>
      {!isDeckCapture && <Sonner />}
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<PreLaunch />} />
          <Route element={<PasswordGate />}>
            <Route path="/home" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/category/performance" element={<PerformanceCategory />} />
            <Route path="/deck" element={<Deck />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/ingredient-insights" element={<IngredientInsights />} />
            <Route path="/app" element={<AppLanding />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <BackToTop />
      <CookieConsent />
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
