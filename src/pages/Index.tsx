import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
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
import CountdownBanner from "@/components/sections/CountdownBanner";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="flex flex-col items-start w-full">
    <AnnouncementBar />
    <Navbar />
    <HeroSection />
    <CountdownBanner />
    <TrustBar />
    <FindWhatYouNeed />
    <TrustedFormulas />
    <PromoBanner
      label="Premium Performance"
      headline="The Most Loaded Pre-Workouts on the Market"
      cta="Shop Pre-Workouts"
      link="/category/performance"
      align="center"
    />
    <ScienceSection />
    <CompleteProtocols />
    <PromoBanner
      label="Clinical Health Line"
      headline="Supplements That Actually Deliver Results"
      cta="Shop Health Range"
      link="/shop"
    />
    <Education />
    <HowItWorks />
    <ReadyToPerform />
    <Newsletter />
    <FAQ />
    <Testimonials />
    <Team />
    <Footer />
  </div>
);

export default Index;
