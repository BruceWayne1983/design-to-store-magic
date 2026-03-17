import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import glyco8 from "@/assets/glyco8.png";
import fusionBlack from "@/assets/fusion-black.png";
import vascul8 from "@/assets/vascul8.png";
import glycoshift from "@/assets/glycoshift.png";

const products = [
  { name: "GLYCO8", slug: "glyco8", desc: "Advanced Glucose Disposal Agent", price: "£39.99", image: glyco8 },
  { name: "FUSION BLACK", slug: "fusion-black", desc: "Premium Performance PreWorkout", price: "£36.99", image: fusionBlack },
  { name: "VASCUL8", slug: "vascul8", desc: "Nitric Oxide & Muscle Pump Catalyst", price: "£36.99", image: vascul8 },
  { name: "GLYCOSHIFT", slug: "glycoshift", desc: "Rapid Carb++ Hydration Fuel", price: "£29.99", image: glycoshift },
];

const categories = [
  {
    tagline: "Performance",
    title: "Performance supplements",
    desc: "Clinically formulated pre-workout, intra-workout and performance enhancers designed to push your limits in every session.",
    image: fusionBlack,
  },
  {
    tagline: "Metabolic",
    title: "Metabolic support",
    desc: "Glucose disposal agents, carb management tools, and metabolic optimisers built on real clinical mechanisms.",
    image: glyco8,
  },
  {
    tagline: "Recovery",
    title: "Recovery and sleep",
    desc: "Advanced recovery formulas targeting inflammation, sleep quality and muscle repair for faster turnaround between sessions.",
    image: vascul8,
  },
  {
    tagline: "Health",
    title: "Health optimisation",
    desc: "Daily foundational supplements covering cardiovascular health, organ support and longevity-focused micronutrients.",
    image: glycoshift,
  },
];

const coreFormulas = [
  {
    tagline: "Starter",
    price: "£19",
    period: "/mo",
    features: ["1 core supplement", "Basic protocol guide", "Email support", "Free UK shipping"],
    cta: "Get started",
    featured: false,
  },
  {
    tagline: "Performance",
    price: "£29",
    period: "/mo",
    features: ["3 stacked supplements", "Full protocol access", "Priority support", "Free worldwide shipping"],
    cta: "Most popular",
    featured: true,
  },
  {
    tagline: "Premium stack",
    price: "£49",
    period: "/mo",
    features: ["Full product access", "Custom protocol design", "1-on-1 coaching call", "VIP early access"],
    cta: "Go premium",
    featured: false,
  },
];

const testimonials = [
  { name: "Sarah K.", role: "Marathon Runner", quote: "Baseline protocols transformed my recovery time. I PR'd my last marathon by 12 minutes." },
  { name: "James R.", role: "CrossFit Athlete", quote: "Finally, a supplement brand that uses real science. The pre-workout stack is incredible." },
];

const faqs = [
  { q: "What makes your formulas different?", a: "Our formulas are backed by peer-reviewed research and use clinically effective dosages of every ingredient." },
  { q: "How do subscriptions work?", a: "Subscribe and save up to 20%. Delivered automatically on your schedule. Pause or cancel anytime." },
  { q: "Do you offer international shipping?", a: "Yes, we ship to over 40 countries worldwide with tracked shipping options." },
  { q: "Can I customize my protocol?", a: "Absolutely. Take our assessment to get a personalized protocol recommendation based on your goals." },
  { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund." },
];

const Shop = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-start w-full">
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-[hsl(215,50%,8%)] py-20 px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Performance Nutrition</span>
          <h1 className="text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
            Shop all baseline
          </h1>
          <p className="text-lg text-white/60 max-w-[600px]">
            Clinically formulated supplements designed for measurable results. Every dose backed by science.
          </p>
          <div className="flex gap-4 mt-2">
            <button className="px-6 py-3 bg-primary text-primary-foreground text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
              Shop all
            </button>
            <button className="px-6 py-3 border border-white/30 text-white text-base font-medium uppercase tracking-wider hover:bg-white/10 transition-colors">
              View stacks
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full bg-background py-28 px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
          <SectionHeader tagline="Bestsellers" heading="Products" text="Our most popular science-backed formulas" />
          <div className="grid grid-cols-4 gap-8">
            {products.map((p) => (
              <Link to={`/product/${p.slug}`} key={p.slug} className="flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full aspect-square bg-secondary flex items-center justify-center p-8">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                </div>
                <div className="p-6 flex flex-col gap-1 text-center">
                  <h5 className="text-lg font-bold text-foreground tracking-wide">{p.name}</h5>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <span className="text-lg font-bold text-foreground mt-1">{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Find Your Category */}
      <section className="w-full bg-background py-28 px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
          <SectionHeader heading="Find your category" text="Explore our full range by goal" />
          <div className="flex flex-col gap-0">
            {categories.map((cat, i) => {
              const isReversed = i % 2 !== 0;
              return (
                <div
                  key={cat.title}
                  className={`flex items-stretch border-t border-border ${i === categories.length - 1 ? "border-b" : ""}`}
                >
                  {isReversed ? (
                    <>
                      <div className="w-1/2 flex flex-col justify-center py-16 pr-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-widest">{cat.tagline}</span>
                        <h3 className="text-3xl font-black text-foreground mt-2">{cat.title}</h3>
                        <p className="text-base text-muted-foreground mt-4 max-w-[450px]">{cat.desc}</p>
                        <button className="mt-6 self-start px-5 py-2 border border-border text-foreground text-sm font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors">
                          Explore
                        </button>
                      </div>
                      <div className="w-1/2 bg-secondary flex items-center justify-center p-12 min-h-[350px]">
                        <img src={cat.image} alt={cat.title} className="w-full max-w-[280px] object-contain" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 bg-secondary flex items-center justify-center p-12 min-h-[350px]">
                        <img src={cat.image} alt={cat.title} className="w-full max-w-[280px] object-contain" />
                      </div>
                      <div className="w-1/2 flex flex-col justify-center py-16 pl-16">
                        <span className="text-sm font-semibold text-primary uppercase tracking-widest">{cat.tagline}</span>
                        <h3 className="text-3xl font-black text-foreground mt-2">{cat.title}</h3>
                        <p className="text-base text-muted-foreground mt-4 max-w-[450px]">{cat.desc}</p>
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

      {/* Core Formulas / Pricing */}
      <section className="w-full bg-secondary py-28 px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
          <SectionHeader tagline="Protocols" heading="Core formulas" text="Subscribe to a performance protocol and save" />
          <div className="grid grid-cols-3 gap-8">
            {coreFormulas.map((plan) => (
              <div
                key={plan.tagline}
                className={`flex flex-col border rounded-lg overflow-hidden ${
                  plan.featured ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                } bg-background`}
              >
                <div className="p-8 flex flex-col gap-4">
                  <span className="text-sm font-semibold text-primary uppercase tracking-widest">{plan.tagline}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-foreground">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="flex flex-col gap-3 mt-4">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0 mt-auto">
                  <button
                    className={`w-full py-3 text-sm font-medium uppercase tracking-wider transition-opacity ${
                      plan.featured
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-foreground text-background hover:opacity-90"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Results / Testimonials */}
      <section className="w-full bg-background py-28 px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
          <SectionHeader heading="Real results" text="Hear from athletes who trust Baseline" />
          <div className="grid grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col gap-6 border border-border rounded-lg p-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-base text-foreground leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-secondary py-28 px-16">
        <div className="max-w-[768px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-black text-foreground uppercase tracking-tight">Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about our products.</p>
          </div>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-base font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-base text-muted-foreground">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-lg font-bold text-foreground">Need more help?</h4>
            <p className="text-base text-muted-foreground mt-1">
              Contact our <a href="#" className="text-primary underline">support team</a>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-background py-28 px-16">
        <div className="max-w-[768px] mx-auto flex flex-col items-center text-center gap-8">
          <h2 className="text-5xl font-black text-foreground leading-[1.1]">
            Elevate your baseline
          </h2>
          <p className="text-lg text-muted-foreground max-w-[500px]">
            Start your journey to peak performance with science-backed nutrition protocols.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground text-base font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
              Shop now
            </button>
            <button className="px-6 py-3 border border-border text-foreground text-base font-medium uppercase tracking-wider hover:border-primary hover:text-primary transition-colors">
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
