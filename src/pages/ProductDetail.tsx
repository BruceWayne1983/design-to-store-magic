import { useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHero from "@/components/product/ProductHero";
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
      <ProductHero product={product} buyButtonRef={buyButtonRef} />
      <WhyDifferent product={product} />
      <HowItWorks product={product} />
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
      <StickyAddToCart product={product} buyButtonRef={buyButtonRef} />
    </div>
  );
};

export default ProductDetail;
