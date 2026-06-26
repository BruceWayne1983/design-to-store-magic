import { useRef, useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHeroV2 from "@/components/product/ProductHeroV2";
import TrustStrip from "@/components/product/TrustStrip";
import ExpectationsTimeline from "@/components/product/ExpectationsTimeline";
import ProductJsonLd from "@/components/product/ProductJsonLd";
import WhyDifferent from "@/components/product/WhyDifferent";
import IngredientBreakdown from "@/components/product/IngredientBreakdown";
import SupplementFacts from "@/components/product/SupplementFacts";
import ExpertReview from "@/components/product/ExpertReview";
import RelatedStacks from "@/components/product/RelatedStacks";
import ProductReviews from "@/components/product/ProductReviews";
import ProductFAQ from "@/components/product/ProductFAQ";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { getProduct } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug || "");
  const buyButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.name ?? "");
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavours?.[0]?.name ?? "");

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0]?.name ?? "");
      setSelectedFlavor(product.flavours?.[0]?.name ?? "");
    }
  }, [product?.slug]);

  if (!product) return <Navigate to="/shop" replace />;

  return (
    <div className="flex flex-col items-start w-full">
      <Helmet>
        <title>{product.name} | Baseline Nutrition</title>
        <meta name="description" content={product.tagline} />
      </Helmet>
      <ProductJsonLd product={product} />
      <AnnouncementBar />
      <Navbar />

      <ProductHeroV2
        product={product}
        buyButtonRef={buyButtonRef}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        selectedFlavor={selectedFlavor}
        onFlavorChange={setSelectedFlavor}
      />

      <TrustStrip product={product} />
      <WhyDifferent product={product} />
      <IngredientBreakdown product={product} />
      <ExpertReview product={product} />
      <SupplementFacts product={product} />
      <ExpectationsTimeline product={product} />
      <ProductReviews productSlug={product.slug} productName={product.name} />
      <ProductFAQ product={product} />
      <RelatedStacks product={product} />

      <section className="w-full bg-background px-4 md:px-8 lg:px-16 pb-12 pt-8">
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
