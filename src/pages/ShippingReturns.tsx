import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ShippingReturns = () => (
  <div className="flex flex-col items-start w-full">
    <Helmet>
      <title>Shipping & Returns | Baseline Nutrition</title>
      <meta name="description" content="UK shipping options, delivery times, and our 14-day returns policy. Free UK delivery on orders over £75." />
    </Helmet>
    <AnnouncementBar />
    <Navbar />
    <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[800px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Support</span>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
            Shipping & Returns
          </h1>
        </div>

        <div className="flex flex-col gap-8 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Shipping</h2>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span><strong className="text-foreground">Free UK Shipping</strong> on all orders over £75.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span><strong className="text-foreground">Standard UK Delivery:</strong> 2-4 business days — £3.99</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span><strong className="text-foreground">Express UK Delivery:</strong> 1-2 business days — £5.99</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>All orders are dispatched from our warehouse in Peterborough, UK.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>You will receive a tracking number via email once your order has been dispatched.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Returns Policy</h2>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>We offer a <strong className="text-foreground">14-day return policy</strong> from the date of delivery, in accordance with the Consumer Contracts Regulations 2013.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>Products must be <strong className="text-foreground">unopened, unused, and in their original packaging</strong> to be eligible for a return.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>Opened supplements cannot be returned for hygiene and safety reasons, unless the product is faulty.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>To initiate a return, email <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a> with your order number.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>Refunds are processed within 5-7 business days of receiving the returned item.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Damaged or Faulty Products</h2>
            <p>
              If your product arrives damaged or faulty, please contact us within 48 hours of delivery at{" "}
              <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a>{" "}
              with photos of the damage. We will arrange a replacement or full refund at no extra cost.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default ShippingReturns;
