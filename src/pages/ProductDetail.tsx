import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHero from "@/components/product/ProductHero";
import WhyDifferent from "@/components/product/WhyDifferent";
import HowItWorks from "@/components/product/HowItWorks";
import IngredientBreakdown from "@/components/product/IngredientBreakdown";
import IngredientMechanisms from "@/components/product/IngredientMechanisms";
import SupplementFacts from "@/components/product/SupplementFacts";
import MechanismSection from "@/components/product/MechanismSection";
import ProductTestimonials from "@/components/product/ProductTestimonials";
import RelatedStacks from "@/components/product/RelatedStacks";
import ProductFAQ from "@/components/product/ProductFAQ";
import { getProduct } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug || "");

  if (!product) return <Navigate to="/shop" replace />;

  return (
    <div className="flex flex-col items-start w-full">
      <Navbar />
      <ProductHero product={product} />
      <WhyDifferent product={product} />
      <HowItWorks product={product} />
      <IngredientBreakdown product={product} />
      <IngredientMechanisms product={product} />
      <SupplementFacts product={product} />
      <MechanismSection product={product} />
      <ProductTestimonials product={product} />
      <RelatedStacks product={product} />
      <ProductFAQ product={product} />
      <Footer />
    </div>
  );
};

export default ProductDetail;
