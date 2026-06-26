import { Helmet } from "react-helmet-async";
import { Beaker, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupplementRequestForm from "@/components/forms/SupplementRequestForm";
import SupplementSurveyForm from "@/components/forms/SupplementSurveyForm";

const SupplementFeedback = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Shape Our Next Launch | Baseline Nutrition</title>
        <meta
          name="description"
          content="Tell us which supplement you want next and answer a short survey to unlock 10% off your first order."
        />
        <link rel="canonical" href="https://baselinenutrition.co.uk/supplement-feedback" />
      </Helmet>
      <Navbar />

      <header className="bg-[hsl(var(--hero-dark))] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1100px] mx-auto text-center flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Customer R&D</span>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight">Shape what we launch next</h1>
          <p className="text-white/70 max-w-[680px] leading-relaxed">
            Baseline is built around clinically-dosed, fully-transparent formulas. Help us decide what comes next —
            request a product, or answer a short survey for 10% off your order.
          </p>
        </div>
      </header>

      <main className="flex-1 py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14">
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Beaker className="w-5 h-5" />
              </span>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight">Request a supplement</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              What would you like to see in our lineup next, and why? Every suggestion is reviewed by our formulation
              team and feeds directly into the R&D pipeline.
            </p>
            <SupplementRequestForm />
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </span>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight">
                Answer 6 questions, get 10% off
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A short market survey to help us decide which formulas to launch first. As a thank-you, you'll get an
              instant 10% discount code applied at checkout.
            </p>
            <SupplementSurveyForm />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupplementFeedback;
