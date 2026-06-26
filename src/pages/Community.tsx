import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunitySection from "@/components/sections/CommunitySection";

const Community = () => (
  <div className="flex flex-col items-start w-full">
    <Helmet>
      <title>Join the Baseline Community | Telegram & WhatsApp</title>
      <meta name="description" content="Two channels. One mission. Join the Baseline Broadcast on Telegram for clinical-grade intel and the Athlete Circle on WhatsApp for community discussion." />
    </Helmet>
    <AnnouncementBar />
    <Navbar />
    <main className="w-full">
      <CommunitySection />
    </main>
    <Footer />
  </div>
);

export default Community;
