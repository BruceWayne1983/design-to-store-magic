import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Shop from "./pages/Shop.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import PerformanceCategory from "./pages/PerformanceCategory.tsx";
import PreLaunch from "./pages/PreLaunch.tsx";
import Deck from "./pages/Deck.tsx";
import PasswordGate from "./components/PasswordGate.tsx";

const queryClient = new QueryClient();

const App = () => {
  const isDeckCapture = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("deckCapture") === "true";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!isDeckCapture && <Toaster />}
        {!isDeckCapture && <Sonner />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PreLaunch />} />
            <Route path="/site" element={<PasswordGate />}>
              <Route index element={<Index />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:slug" element={<ProductDetail />} />
              <Route path="category/performance" element={<PerformanceCategory />} />
            </Route>
            <Route path="/deck" element={<Deck />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
