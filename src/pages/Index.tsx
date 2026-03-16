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
import Footer from "@/components/Footer";

const Index = () => (
  <div className="flex flex-col items-start w-full">
    <Navbar />
    <HeroSection />
    <TrustBar />
    <FindWhatYouNeed />
    <TrustedFormulas />
    <ScienceSection />
    <CompleteProtocols />
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
