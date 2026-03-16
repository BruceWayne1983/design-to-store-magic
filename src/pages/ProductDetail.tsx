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

const ProductDetail = () => (
  <div className="flex flex-col items-start w-full">
    <Navbar />
    <ProductHero />
    <WhyDifferent />
    <HowItWorks />
    <IngredientBreakdown />
    <IngredientMechanisms />
    <SupplementFacts />
    <MechanismSection />
    <ProductTestimonials />
    <RelatedStacks />
    <ProductFAQ />
    <Footer />
  </div>
);

export default ProductDetail;
