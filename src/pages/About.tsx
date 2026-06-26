import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRAND_NAME, BRAND_EMAIL, BRAND_ADDRESS } from "@/data/brand";

const About = () => (
  <div className="flex flex-col items-start w-full">
    <Helmet>
      <title>About | Baseline Nutrition</title>
      <meta name="description" content="Baseline Nutrition builds clinically dosed, fully transparent supplements backed by peer-reviewed research. UK-made and trademark-ingredient based." />
    </Helmet>
    <AnnouncementBar />
    <Navbar />
    <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[800px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">About Us</span>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
            Performance Nutrition Built on Real Science
          </h1>
        </div>

        <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed">
          <p>
            Baseline Nutrition was founded with a single mission: to create supplements that actually work, 
            backed by peer-reviewed research and dosed at clinically effective levels.
          </p>
          <p>
            Every formula we produce targets a specific biological pathway — not a marketing trend. We use 
            trademarked, patented ingredients at their full clinical doses because under-dosing is the 
            supplement industry's biggest problem.
          </p>
          <p>
            We believe in full label transparency. No proprietary blends, no pixie-dusting, no hidden 
            fillers. Every ingredient and every dose is printed clearly on the label so you know exactly 
            what you're putting into your body.
          </p>
          <h2 className="text-xl font-bold text-foreground mt-4">Our Standards</h2>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
              <span><strong className="text-foreground">Clinical Doses Only</strong> — Every ingredient at its researched effective dose, not a fraction of it.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
              <span><strong className="text-foreground">Trademarked Ingredients</strong> — Patented compounds like EnXtra®, HydroPrime®, AstraGin® with proven bioavailability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
              <span><strong className="text-foreground">Full Transparency</strong> — Open-label formulas. No proprietary blends. Ever.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
              <span><strong className="text-foreground">UK Manufactured</strong> — Produced in GMP-certified facilities in the United Kingdom.</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-4">Contact Us</h2>
          <address className="text-sm not-italic">
            <p>{BRAND_NAME}</p>
            <p>{BRAND_ADDRESS.line1}</p>
            <p>{BRAND_ADDRESS.line2}</p>
            <p>{BRAND_ADDRESS.country}</p>
            <p className="mt-2">
              Email: <a href={`mailto:${BRAND_EMAIL}`} className="text-primary hover:underline">{BRAND_EMAIL}</a>
            </p>
          </address>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
