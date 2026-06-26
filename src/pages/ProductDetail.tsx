import { useRef, useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHero from "@/components/product/ProductHero";
import ProductHeroV2 from "@/components/product/ProductHeroV2";
import TrustStrip from "@/components/product/TrustStrip";
import ExpectationsTimeline from "@/components/product/ExpectationsTimeline";
import ProductJsonLd from "@/components/product/ProductJsonLd";
import WhyDifferent from "@/components/product/WhyDifferent";
import HowItWorks from "@/components/product/HowItWorks";
import IngredientBreakdown from "@/components/product/IngredientBreakdown";
import IngredientMechanisms from "@/components/product/IngredientMechanisms";
import SupplementFacts from "@/components/product/SupplementFacts";
import MechanismSection from "@/components/product/MechanismSection";
import ProductTestimonials from "@/components/product/ProductTestimonials";
import RelatedStacks from "@/components/product/RelatedStacks";
import ProductReviews from "@/components/product/ProductReviews";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import ProductFAQ from "@/components/product/ProductFAQ";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { getProduct } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug || "");
  const buyButtonRef = useRef<HTMLButtonElement>(null);
  const showToggle = slug === "electro-flow";
  const [useV2, setUseV2] = useState(true);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.name ?? "");
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavours?.[0]?.name ?? "");

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0]?.name ?? "");
      setSelectedFlavor(product.flavours?.[0]?.name ?? "");
    }
  }, [product?.slug]);

  useEffect(() => {
    if (!showToggle) return;
    const stored = localStorage.getItem("pdp-layout");
    if (stored === "legacy") setUseV2(false);
  }, [showToggle]);

  const toggleLayout = () => {
    const next = !useV2;
    setUseV2(next);
    localStorage.setItem("pdp-layout", next ? "v2" : "legacy");
  };

  if (!product) return <Navigate to="/shop" replace />;

  const Hero = showToggle && useV2 ? ProductHeroV2 : ProductHero;


  return (
    <div className="flex flex-col items-start w-full">
      <Helmet>
        <title>{product.name} | Baseline Nutrition</title>
        <meta name="description" content={product.tagline} />
      </Helmet>
      <ProductJsonLd product={product} />
      <AnnouncementBar />
      <Navbar />

      {showToggle && (
        <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground bg-background/90 px-2 py-0.5 rounded">
            PDP Preview
          </span>
          <button
            onClick={toggleLayout}
            className="bg-foreground text-background px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-[0.15em] shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className={useV2 ? "opacity-50" : ""}>Before</span>
            <span className="w-px h-3 bg-background/30" />
            <span className={!useV2 ? "opacity-50" : ""}>After</span>
          </button>
        </div>
      )}

      <Hero
        product={product}
        buyButtonRef={buyButtonRef}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        selectedFlavor={selectedFlavor}
        onFlavorChange={setSelectedFlavor}
      />

      {showToggle && useV2 && <TrustStrip product={product} />}

      <WhyDifferent product={product} />
      <HowItWorks product={product} />

      {showToggle && useV2 && <ExpectationsTimeline product={product} />}

      <IngredientBreakdown product={product} />
      <IngredientMechanisms product={product} />
      <SupplementFacts product={product} />
      <MechanismSection product={product} />
      <ProductTestimonials product={product} />
      <RelatedStacks product={product} />
      <ProductReviews />
      <RecentlyViewed currentSlug={product.slug} />
      <ProductFAQ product={product} />
      <section className="w-full bg-background px-4 md:px-8 lg:px-16 pb-12">
        <div className="max-w-[1280px] mx-auto border-t border-border pt-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Food supplements should not be used as a substitute for a varied, balanced diet and a healthy lifestyle.
            This product is not intended to diagnose, treat, cure, or prevent any disease. Do not exceed the recommended
            daily dose. Consult your doctor before use if you are pregnant, breastfeeding, taking medication, or have a
            medical condition. Keep out of reach of children.
          </p>
        </div>
      </section>
      <Footer />
      <StickyAddToCart
        product={product}
        buyButtonRef={buyButtonRef}
        selectedSize={selectedSize}
        selectedFlavor={selectedFlavor}
      />

    </div>
  );
};

export default ProductDetail;
