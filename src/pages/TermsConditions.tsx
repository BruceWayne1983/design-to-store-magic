import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => (
  <div className="flex flex-col items-start w-full">
    <AnnouncementBar />
    <Navbar />
    <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto prose prose-sm prose-invert">
        <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight mb-2">Terms & Conditions</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: 15 April 2026</p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">1. About These Terms</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These terms and conditions ("Terms") govern your use of the Baseline Nutrition website (baselinenutrition.co.uk) and any purchases you make from us. By using our site or placing an order, you agree to be bound by these Terms. Please read them carefully.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          Baseline Nutrition Ltd is a company registered in England and Wales. Registered address: Unit 16-18 Tresham Road, Peterborough, PE2 6SG, United Kingdom.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">2. Products & Pricing</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>All prices are displayed in GBP (£) and include VAT where applicable.</li>
          <li>We make every effort to ensure product descriptions, images, and prices are accurate. If we discover an error, we will notify you before processing your order.</li>
          <li>We reserve the right to change prices at any time. Orders already confirmed will not be affected.</li>
          <li>Product images are for illustration purposes. Actual packaging may vary slightly.</li>
          <li>Our supplements are food supplements and are not intended to diagnose, treat, cure, or prevent any disease.</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">3. Ordering & Payment</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>By placing an order, you are making an offer to purchase. We will confirm acceptance by sending an order confirmation email.</li>
          <li>We accept payment via major credit/debit cards, Klarna, and other methods displayed at checkout.</li>
          <li>Payment is taken at the time of order. All payments are processed securely through our payment provider.</li>
          <li>You must be at least 18 years old to place an order.</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">4. Subscriptions</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Subscription orders are automatically charged and dispatched on a recurring schedule (e.g., every 30 days).</li>
          <li>You can pause, skip, or cancel your subscription at any time via your account dashboard or by contacting us.</li>
          <li>Cancellations must be made at least 48 hours before your next billing date to avoid being charged.</li>
          <li>Subscription prices may change with 14 days' written notice.</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">5. Delivery</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li><strong className="text-foreground">UK Standard Delivery:</strong> 2–4 working days. Free on orders over £75; otherwise £3.99.</li>
          <li><strong className="text-foreground">UK Express Delivery:</strong> 1–2 working days. £5.99.</li>
          <li><strong className="text-foreground">International Delivery:</strong> 5–10 working days. Rates calculated at checkout.</li>
          <li>Delivery times are estimates and not guaranteed. We are not liable for delays caused by third-party carriers.</li>
          <li>Risk of loss passes to you upon delivery. If your order is lost or damaged in transit, contact us within 48 hours.</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">6. Returns & Refunds</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">Under the Consumer Contracts Regulations 2013, you have a 14-day right to cancel from the date you receive your order.</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li>Products must be returned unopened, unused, and in their original packaging.</li>
          <li>Opened supplements cannot be returned for hygiene and food safety reasons, unless faulty.</li>
          <li>To initiate a return, email <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a> with your order number.</li>
          <li>Return shipping costs are your responsibility unless the item is faulty or incorrect.</li>
          <li>Refunds will be processed within 14 days of receiving the returned item, to your original payment method.</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">7. Faulty or Incorrect Products</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you receive a faulty, damaged, or incorrect product, please contact us within 48 hours at{" "}
          <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a> with photos. We will arrange a free replacement or full refund.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">8. Intellectual Property</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All content on this website — including text, images, logos, trademarks (such as GLYCO8™, VASCUL8™, GLYCOSHIFT™, Fusion Lite+, Pürest Creatine™), and design — is the property of Baseline Nutrition Ltd and is protected by UK and international intellectual property laws. You may not reproduce, distribute, or use any content without our written permission.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">9. Health & Safety Disclaimer</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Our products are food supplements and should not be used as a substitute for a varied, balanced diet and healthy lifestyle.</li>
          <li>Do not exceed the recommended daily dose.</li>
          <li>If you are pregnant, breastfeeding, taking medication, or have a medical condition, consult your doctor before use.</li>
          <li>Keep out of reach of children.</li>
          <li>Store in a cool, dry place away from direct sunlight.</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">10. Limitation of Liability</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          To the maximum extent permitted by law, Baseline Nutrition Ltd shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Nothing in these Terms excludes liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">11. Governing Law</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">12. Contact</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For any questions about these Terms, contact us at <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a>.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            See also: <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> · <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
          </p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default TermsConditions;
