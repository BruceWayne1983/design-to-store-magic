import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FindWhatYouNeed from "@/components/sections/FindWhatYouNeed";
import TrustedFormulas from "@/components/sections/TrustedFormulas";
import CompleteProtocols from "@/components/sections/CompleteProtocols";
import HowItWorks from "@/components/sections/HowItWorks";
import ScienceSection from "@/components/sections/ScienceSection";
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
    <FindWhatYouNeed />
    <TrustedFormulas />
    <CompleteProtocols />
    <HowItWorks />
    <ScienceSection />
    <ReadyToPerform />
    <Newsletter />
    <FAQ />
    <Testimonials />
    <Team />
    <Footer />
  </div>
);

export default Index;
