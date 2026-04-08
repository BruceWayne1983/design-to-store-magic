import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import fusionLitePlus from "@/assets/products/fusion-lite-plus.jpg";
import vascul8 from "@/assets/products/vascul8.jpg";
import glyco8 from "@/assets/products/glyco8.jpg";
import glycoshift from "@/assets/products/glycoshift.jpg";
import electroFlow from "@/assets/products/electro-flow.jpg";
import purestCreatine from "@/assets/products/purest-creatine-300g.jpg";
import h2oGo from "@/assets/products/h2o-go.jpg";

const products = [
  { name: "Fusion Lite+", slug: "fusion-lite-plus", desc: "Clinically Dosed Focus & Energy", price: "£31.99", image: fusionLitePlus },
  { name: "VASCUL8™", slug: "vascul8", desc: "Stimulant-Free Pump Formula", price: "£39.99", image: vascul8 },
  { name: "GLYCOSHIFT™", slug: "glycoshift", desc: "Intra-Workout Fuel & GDA", price: "£39.99", image: glycoshift },
  { name: "GLYCO8™", slug: "glyco8", desc: "Fast-Acting Nutrient Partitioning Support", price: "£39.99", image: glyco8 },
  { name: "Electro Flow", slug: "electro-flow", desc: "Advanced Electrolyte Support", price: "£27.99", image: electroFlow },
  { name: "Pürest Creatine™", slug: "purest-creatine", desc: "Pure NNB Creatine Monohydrate", price: "From £23.99", image: purestCreatine },
  { name: "H2O GO", slug: "h2o-go", desc: "Water Balance & Electrolyte Support", price: "TBC", image: h2oGo },
];

const categories = [
  {
    tagline: "Performance",
    title: "Performance supplements",
    desc: "Clinically formulated pre-workout, pump and performance enhancers designed to push your limits in every session.",
    image: fusionLitePlus,
  },
  {
    tagline: "Metabolic",
    title: "Metabolic support",
    desc: "Glucose disposal agents, carb management tools, and metabolic optimisers built on real clinical mechanisms.",
    image: glyco8,
  },
  {
    tagline: "Health",
    title: "Health & Hydration",
    desc: "Advanced electrolyte formulas and hydration support for daily performance and recovery.",
    image: electroFlow,
  },
];

const testimonials = [
  { name: "Sarah K.", role: "Marathon Runner", quote: "Baseline protocols transformed my recovery time. I PR'd my last marathon by 12 minutes." },
  { name: "James R.", role: "CrossFit Athlete", quote: "Finally, a supplement brand that uses real science. The pre-workout stack is incredible." },
];

const faqs = [
  { q: "What makes your formulas different?", a: "Our formulas are backed by peer-reviewed research and use clinically effective dosages of every ingredient." },
  { q: "How do subscriptions work?", a: "Subscribe and save on every order. Delivered automatically on your schedule. Pause or cancel anytime." },
  { q: "Do you offer international shipping?", a: "Yes, we ship to over 40 countries worldwide with tracked shipping options." },
  { q: "Can I customize my protocol?", a: "Absolutely. Take our assessment to get a personalized protocol recommendation based on your goals." },
  { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund." },
];

const Shop = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-start w-full">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-[hsl(215,50%,8%)] py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Performance Nutrition</span>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
            Shop all baseline
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-[600px]">
            Clinically formulated supplements designed for measurable results. Every dose backed by science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
              Shop all
            </button>
            <button className="px-6 py-3 border border-white/30 text-white text-sm md:text-base font-medium uppercase tracking-wider hover:bg-white/10 transition-colors">
              View stacks
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
          <SectionHeader tagline="Full Range" heading="Products" text="Our complete range of science-backed formulas" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((p) => (
              <Link to={`/product/${p.slug}`} key={p.slug} className="flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full aspect-square bg-secondary flex items-center justify-center p-4 md:p-8">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                </div>
                <div className="p-4 md:p-6 flex flex-col gap-1 text-center">
                  <h5 className="text-sm md:text-lg font-bold text-foreground tracking-wide">{p.name}</h5>
                  <p className="text-xs md:text-sm text-muted-foreground">{p.desc}</p>
                  <span className="text-sm md:text-lg font-bold text-foreground mt-1">{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Find Your Category */}
      <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-20">
          <SectionHeader heading="Find your category" text="Explore our full range by goal" />
          <div className="flex flex-col gap-0">
            {categories.map((cat, i) => {
              const isReversed = i % 2 !== 0;
              return (
                <div
                  key={cat.title}
                  className={`flex flex-col md:flex-row items-stretch border-t border-border ${i === categories.length - 1 ? "border-b" : ""}`}
                >
                  {isReversed ? (
                    <>
                      <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:py-16 md:pr-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-widest">{cat.tagline}</span>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mt-2">{cat.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-[450px]">{cat.desc}</p>
                        <button className="mt-6 self-start px-5 py-2 border border-border text-foreground text-sm font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors">
                          Explore
                        </button>
                      </div>
                      <div className="w-full md:w-1/2 bg-secondary flex items-center justify-center p-8 md:p-12 min-h-[250px] md:min-h-[350px]">
                        <img src={cat.image} alt={cat.title} className="w-full max-w-[280px] object-contain" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full md:w-1/2 bg-secondary flex items-center justify-center p-8 md:p-12 min-h-[250px] md:min-h-[350px]">
                        <img src={cat.image} alt={cat.title} className="w-full max-w-[280px] object-contain" />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:py-16 md:pl-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-widest">{cat.tagline}</span>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mt-2">{cat.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-[450px]">{cat.desc}</p>
                        <button className="mt-6 self-start px-5 py-2 border border-border text-foreground text-sm font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors">
                          Explore
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Results / Testimonials */}
      <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
          <SectionHeader heading="Real results" text="Hear from athletes who trust Baseline" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col gap-6 border border-border rounded-lg p-6 md:p-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-sm md:text-base text-foreground leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <div className="max-w-[768px] mx-auto flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">Questions</h2>
            <p className="text-base md:text-lg text-muted-foreground">Everything you need to know about our products.</p>
          </div>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm md:text-base font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-sm md:text-base text-muted-foreground">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-base md:text-lg font-bold text-foreground">Need more help?</h4>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Contact our <a href="#" className="text-primary underline">support team</a>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
        <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
          <h2 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1]">
            Elevate your baseline
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-[500px]">
            Start your journey to peak performance with science-backed nutrition protocols.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
              Shop now
            </button>
            <button className="px-6 py-3 border border-border text-foreground text-sm md:text-base font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
