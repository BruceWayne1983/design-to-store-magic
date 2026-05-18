import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin } from "lucide-react";

const Contact = () => (
  <div className="flex flex-col items-start w-full">
    <Helmet>
      <title>Contact | Baseline Nutrition</title>
      <meta name="description" content="Get in touch with Baseline Nutrition for product, order, or partnership enquiries. We respond within 24 hours on business days." />
    </Helmet>
    <AnnouncementBar />
    <Navbar />
    <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[800px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Get In Touch</span>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
            Contact Us
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Have a question about our products, your order, or want to discuss a partnership? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 flex flex-col gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground">Email</h3>
            <p className="text-sm text-muted-foreground">For general enquiries and support:</p>
            <a href="mailto:support@baselinenutrition.co.uk" className="text-sm text-primary hover:underline">
              support@baselinenutrition.co.uk
            </a>
          </div>

          <div className="border border-border rounded-lg p-6 flex flex-col gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground">Address</h3>
            <div className="text-sm text-muted-foreground">
              <p>Baseline Nutrition</p>
              <p>Unit 16-18 Tresham Road</p>
              <p>Peterborough, PE2 6SS</p>
              <p>United Kingdom</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-foreground">Response Times</h2>
          <div className="text-sm text-muted-foreground leading-relaxed flex flex-col gap-2">
            <p>We aim to respond to all enquiries within <strong className="text-foreground">24 hours</strong> during business days (Monday–Friday, 9am–5pm GMT).</p>
            <p>For urgent order issues, please include your order number in the subject line.</p>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Contact;
