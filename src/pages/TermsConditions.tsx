import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => (
  <div className="flex flex-col items-start w-full">
    <Helmet>
      <title>Terms & Conditions | Baseline Nutrition</title>
      <meta name="description" content="Baseline Nutrition Ltd terms of sale — UK consumer rights, 14-day cooling-off, returns, subscriptions, delivery, liability, and governing law." />
    </Helmet>
    <AnnouncementBar />
    <Navbar />
    <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight mb-2">Terms & Conditions</h1>
        <p className="text-sm text-muted-foreground mb-2">Last updated: 26 June 2026</p>
        <p className="text-sm text-muted-foreground mb-8">
          These Terms set out the contract between you and Baseline Nutrition Ltd. They do not affect your statutory rights as a consumer under UK law, including the Consumer Rights Act 2015 and the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.
        </p>

        {/* 1. Definitions */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">1. Who We Are</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          "We", "us", "our" and "Baseline Nutrition" mean <strong className="text-foreground">Baseline Nutrition Ltd</strong>, a company registered in England and Wales.
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li>Registered office: <strong className="text-foreground">{"{{REGISTERED_ADDRESS}}"}</strong></li>
          <li>Company number: <strong className="text-foreground">{"{{COMPANY_NUMBER}}"}</strong></li>
          <li>VAT number: <strong className="text-foreground">{"{{VAT_NUMBER}}"}</strong></li>
          <li>Contact: <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a></li>
        </ul>

        {/* 2. Acceptance */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">2. Acceptance of These Terms</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By browsing baselinenutrition.co.uk or placing an order, you confirm that you accept these Terms and our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. If you do not agree, please do not use the site.
        </p>

        {/* 3. Eligibility */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">3. Eligibility</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>You must be at least 18 years old to place an order.</li>
          <li>Our products are food supplements intended for healthy adults. They are not medicines and are not intended to diagnose, treat, cure, or prevent any disease.</li>
          <li>If you are pregnant, breastfeeding, taking prescription medication, or have a medical condition, consult a qualified healthcare professional before use.</li>
        </ul>

        {/* 4. Products & Pricing */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">4. Products, Descriptions & Pricing</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>All prices are in GBP (£) and include UK VAT where applicable. Delivery charges are shown separately at checkout.</li>
          <li>We take reasonable care to ensure product descriptions, ingredient lists, and images are accurate at the time of publication. Packaging may vary slightly from images shown.</li>
          <li>If we discover a pricing or description error after your order, we will contact you to confirm, amend, or cancel before dispatch. You will not be charged the incorrect price.</li>
          <li>Promotional pricing is valid only for the period and quantities stated.</li>
        </ul>

        {/* 5. Orders & Contract */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">5. Orders & Contract Formation</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Placing an order is an offer by you to buy the products in your basket at the prices shown.</li>
          <li>An order acknowledgement email confirms we have received your order; it does not form a contract.</li>
          <li>A binding contract is formed only when we send you a dispatch confirmation. Until then we may decline your order without giving a reason.</li>
          <li>We may refuse or cancel an order where stock is unavailable, payment fails, a pricing error is identified, or fraud is suspected.</li>
        </ul>

        {/* 6. Payment */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">6. Payment & Security</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>We accept major credit and debit cards, Apple Pay, Google Pay, Klarna and other methods displayed at checkout.</li>
          <li>Payment is taken at the time of order. Payments are processed by PCI-DSS compliant providers; we do not store full card details on our systems.</li>
          <li>You confirm that the payment method used is yours or that you have express authority to use it.</li>
        </ul>

        {/* 7. Delivery */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">7. Delivery</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li><strong className="text-foreground">UK Standard:</strong> 2–4 working days. Free on orders over £75; otherwise £3.99.</li>
          <li><strong className="text-foreground">UK Express:</strong> 1–2 working days. £5.99.</li>
          <li><strong className="text-foreground">International:</strong> 5–10 working days. Rates and any import duties are calculated at checkout or charged on receipt by the carrier.</li>
          <li>Delivery times are estimates. We are not liable for delays outside our reasonable control (e.g. carrier strikes, customs holds, severe weather).</li>
          <li>Risk in the goods passes to you when they are delivered to the address you provided. Title passes once we have received payment in full.</li>
          <li>If your order does not arrive within 14 days of dispatch, contact us and we will investigate, replace, or refund as appropriate.</li>
        </ul>

        {/* 8. Right to Cancel */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">8. Your Right to Cancel (14-Day Cooling-Off)</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, you have the right to cancel your order within <strong className="text-foreground">14 calendar days</strong> of receiving the goods, without giving a reason.
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li>To exercise this right, email <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a> with your order number and a clear cancellation statement before the 14 days expire.</li>
          <li>Return the goods to us within 14 days of notifying us. Return postage is your responsibility unless the goods are faulty or incorrect.</li>
          <li>We will refund the price of the goods and standard outbound delivery within 14 days of receiving them back, to your original payment method.</li>
          <li><strong className="text-foreground">Hygiene exemption:</strong> the right to cancel does not apply to sealed food, drink or supplement products that have been unsealed after delivery (regulation 28(3)(d)–(e)). Opened tubs cannot be returned for change of mind, only if faulty.</li>
        </ul>

        {/* 9. Faulty / Consumer Rights */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">9. Faulty, Damaged or Incorrect Goods</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Under the Consumer Rights Act 2015 the goods we supply must be of satisfactory quality, fit for purpose, and as described. If they are not, you are entitled to:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li>Reject the goods and receive a full refund within 30 days of delivery; or</li>
          <li>Request a free replacement or repair within a reasonable time; or</li>
          <li>After one failed replacement, claim a price reduction or final refund.</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          Please contact <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a> with your order number and photos of the issue. We will cover return postage for faulty or incorrect items.
        </p>

        {/* 10. Subscriptions */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">10. Subscriptions</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Subscription orders are dispatched and charged on a recurring schedule (e.g. every 30 days) at the discounted subscription price.</li>
          <li>You may skip, pause, change frequency, or cancel at any time via your account or by emailing <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a>.</li>
          <li>Changes or cancellations must be made at least 48 hours before your next billing date to apply to that cycle. Orders already processed will be dispatched.</li>
          <li>We will give at least 14 days' notice before any subscription price change. You can cancel before the new price takes effect.</li>
          <li>The 14-day cooling-off period in section 8 applies to your first subscription order. Subsequent recurring orders are not "distance contracts" in the same sense, but our hygiene rule (section 8) still applies to opened goods.</li>
        </ul>

        {/* 11. Promotions & discount codes */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">11. Promotional Codes & Discounts</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Codes apply only within their stated validity period, on qualifying products, and (unless stated otherwise) cannot be combined with other offers or used on subscriptions.</li>
          <li>We may refuse, alter, or withdraw a promotion at any time for technical errors, misuse, or suspected fraud.</li>
          <li>If a refund is issued on a discounted order, the refund value is the actual amount paid.</li>
        </ul>

        {/* 12. Health disclaimer */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">12. Health Disclaimer & Intended Use</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Our products are food supplements, not medicines. They are not intended to diagnose, treat, cure, or prevent any disease.</li>
          <li>Do not exceed the stated recommended daily dose. Supplements are not a substitute for a varied, balanced diet and healthy lifestyle.</li>
          <li>Consult a qualified healthcare professional before use if you are pregnant, breastfeeding, taking medication, or have a medical condition.</li>
          <li>Keep out of reach of children. Store in a cool, dry place away from direct sunlight.</li>
          <li>Information on the site, in our articles, and in our newsletters is for general educational purposes and is not personalised medical or nutritional advice.</li>
        </ul>

        {/* 13. IP */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">13. Intellectual Property</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All content on this site — including text, images, branding, trademarks (such as GLYCO8™, VASCUL8™, GLYCOSHIFT™, Fusion Lite+, Pürest Creatine™, Electro Flow™), logos, layout, and code — is owned by or licensed to Baseline Nutrition Ltd and protected by UK and international intellectual property law. You may not copy, reproduce, distribute, scrape, or commercially exploit any of it without our prior written permission. Trademarked ingredient names referenced on our labels (e.g. EnXtra®, HydroPrime®, AstraGin®, GlucoVantage®) belong to their respective owners and are used under licence or fair attribution.
        </p>

        {/* 14. Acceptable use */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">14. Accounts & Acceptable Use</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>You are responsible for keeping your account credentials secure and for activity carried out under your account.</li>
          <li>You must not use the site fraudulently, attempt to interfere with its operation, scrape content at scale, or upload anything unlawful, abusive, or infringing.</li>
          <li>We may suspend or close accounts and cancel orders that breach these Terms.</li>
        </ul>

        {/* 15. Liability */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">15. Our Liability to You</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>If we fail to comply with these Terms, we are responsible for loss or damage you suffer that is a foreseeable result of our breach, but not for any that is not foreseeable.</li>
          <li>To the maximum extent permitted by law, our total liability to you for any order is limited to the price you paid for that order.</li>
          <li>We do not exclude or limit liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, breach of your statutory consumer rights, or any other liability that cannot be excluded by law.</li>
          <li>We are not liable for losses that are not caused by our breach, or for business losses (the site is supplied to consumers for personal use only).</li>
        </ul>

        {/* 16. Privacy */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">16. Privacy & Data</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your personal data is handled in accordance with our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and our use of cookies is set out in our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
        </p>

        {/* 17. Force majeure */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">17. Events Outside Our Control</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We will not be liable for any failure or delay in performing our obligations caused by events outside our reasonable control, including supply-chain disruption, carrier failure, civil unrest, pandemic, fire, flood, or government action. Where such an event affects your order we will contact you with options.
        </p>

        {/* 18. Governing law */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">18. Governing Law & Jurisdiction</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These Terms and any contract between us are governed by the laws of England and Wales. Disputes are subject to the non-exclusive jurisdiction of the courts of England and Wales. If you live in Scotland or Northern Ireland, you may also bring proceedings in your local courts.
        </p>

        {/* 19. Complaints & ADR */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">19. Complaints & Alternative Dispute Resolution</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We aim to resolve every complaint quickly. Please email <a href="mailto:support@baselinenutrition.co.uk" className="text-primary hover:underline">support@baselinenutrition.co.uk</a> with the subject "Complaint" and your order number, and we will respond within 5 working days.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          If we cannot resolve the matter, you may refer the dispute to an approved Alternative Dispute Resolution (ADR) body: <strong className="text-foreground">{"{{ADR_PROVIDER}}"}</strong>. EU customers can also use the European Commission's Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ec.europa.eu/consumers/odr</a>.
        </p>

        {/* 20. Changes */}
        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">20. Changes to These Terms</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We may update these Terms from time to time. The version that applies to your order is the one in force at the time you place that order. The current version is always available on this page with the "Last updated" date above.
        </p>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            See also: <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> · <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link> · <Link to="/shipping-returns" className="text-primary hover:underline">Shipping & Returns</Link>
          </p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default TermsConditions;
