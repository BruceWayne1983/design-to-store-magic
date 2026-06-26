import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import SocialProofBand from "@/components/sections/SocialProofBand";
import TrendingBestsellers from "@/components/sections/TrendingBestsellers";
import CinematicBand from "@/components/sections/CinematicBand";
import FindWhatYouNeed from "@/components/sections/FindWhatYouNeed";
import TrustedFormulas from "@/components/sections/TrustedFormulas";
import ScienceSection from "@/components/sections/ScienceSection";
import CompleteProtocols from "@/components/sections/CompleteProtocols";
import HowItWorks from "@/components/sections/HowItWorks";
import ReadyToPerform from "@/components/sections/ReadyToPerform";
import Newsletter from "@/components/sections/Newsletter";
import FAQ from "@/components/sections/FAQ";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import Education from "@/components/sections/Education";
import PromoBanner from "@/components/sections/PromoBanner";
import CoachTeaser from "@/components/sections/CoachTeaser";
import CommunitySection from "@/components/sections/CommunitySection";
import Footer from "@/components/Footer";
import categoryPerformance from "@/assets/category-performance.jpg";
import categoryMetabolic from "@/assets/category-metabolic.jpg";
import categoryHealth from "@/assets/category-health.jpg";

const Index = () => (
  <div className="flex flex-col items-start w-full">
    <Helmet>
      <title>Baseline Nutrition | Performance Nutrition Built on Science</title>
      <meta name="description" content="Clinically dosed, fully transparent performance nutrition. Supplements built on real science for athletes and health optimisers." />
    </Helmet>
    <AnnouncementBar />
    <Navbar />
    <HeroSection />
    <SocialProofBand />
    <TrustBar />
    <TrendingBestsellers />
    <CinematicBand
      label="Performance Line"
      headline="Engineered for Maximum Output"
      desc="Clinically dosed pre-workouts, pumps and intra-workout fuel built on patented actives."
      cta="Shop Performance"
      link="/category/performance"
      image={categoryPerformance}
      accent="#3B82F6"
    />
    <FindWhatYouNeed />
    <TrustedFormulas />
    <CinematicBand
      label="Metabolic Line"
      headline="Master Your Glucose Response"
      desc="GlucoVantage®-driven nutrient partitioning. Real mechanisms, real doses, real results."
      cta="Shop Metabolic"
      link="/shop"
      image={categoryMetabolic}
      align="right"
      accent="#F59E0B"
    />
    <PromoBanner
      label="Premium Performance"
      headline="The Most Loaded Pre-Workouts on the Market"
      cta="Shop Pre-Workouts"
      link="/category/performance"
      align="center"
    />
    <ScienceSection />
    <CompleteProtocols />
    <CoachTeaser />
    <CinematicBand
      label="Hydration Line"
      headline="Performance-Grade Electrolytes"
      desc="Full-spectrum mineral matrix at real clinical doses. Built for hard training in any climate."
      cta="Shop Hydration"
      link="/shop"
      image={categoryHealth}
      accent="#10B981"
    />
    <Education />
    <HowItWorks />
    <ReadyToPerform />
    <Newsletter />
    <FAQ />
    <CommunitySection />
    <Testimonials />
    <Team />
    <Footer />
  </div>
);

export default Index;
