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
      <Footer />
      <StickyAddToCart product={product} buyButtonRef={buyButtonRef} />
    </div>
  );
};

export default ProductDetail;
