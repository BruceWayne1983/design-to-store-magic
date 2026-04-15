import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="flex flex-col items-start w-full">
    <AnnouncementBar />
    <Navbar />
    <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto prose prose-sm prose-invert">
        <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: 15 April 2026</p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">1. Who We Are</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Baseline Nutrition Ltd ("we", "us", "our") is the data controller responsible for your personal data. We are registered in England and Wales. Our registered address is Unit 16-18 Tresham Road, Peterborough, PE2 6SG, United Kingdom.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          If you have questions about this policy or your data, contact us at <a href="mailto:privacy@baselinenutrition.co.uk" className="text-primary hover:underline">privacy@baselinenutrition.co.uk</a>.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">2. What Data We Collect</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">We may collect the following categories of personal data:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li><strong className="text-foreground">Identity data:</strong> name, username, date of birth</li>
          <li><strong className="text-foreground">Contact data:</strong> email address, billing/delivery address, phone number</li>
          <li><strong className="text-foreground">Financial data:</strong> payment card details (processed securely via our payment provider; we do not store card numbers)</li>
          <li><strong className="text-foreground">Transaction data:</strong> order details, purchase history, subscriptions</li>
          <li><strong className="text-foreground">Technical data:</strong> IP address, browser type, device information, cookies and usage data</li>
          <li><strong className="text-foreground">Marketing data:</strong> your preferences for receiving communications from us</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">3. How We Collect Your Data</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li><strong className="text-foreground">Directly from you</strong> — when you create an account, place an order, subscribe to our newsletter, or contact us</li>
          <li><strong className="text-foreground">Automatically</strong> — via cookies and similar technologies when you browse our site (see our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>)</li>
          <li><strong className="text-foreground">Third parties</strong> — payment processors, analytics providers, delivery partners</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">4. How We Use Your Data</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">We use your data on the following lawful bases under UK GDPR:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li><strong className="text-foreground">Contract performance:</strong> to process and deliver your orders, manage your account, and handle returns/refunds</li>
          <li><strong className="text-foreground">Legitimate interests:</strong> to improve our products and website, prevent fraud, and personalise your experience</li>
          <li><strong className="text-foreground">Consent:</strong> to send you marketing communications (you can withdraw consent at any time)</li>
          <li><strong className="text-foreground">Legal obligation:</strong> to comply with tax, accounting, and regulatory requirements</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">5. Data Sharing</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We share your data only where necessary with trusted third parties:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li>Payment processors (e.g., Shopify Payments, Klarna)</li>
          <li>Delivery and fulfilment partners (e.g., Royal Mail, DPD, DHL)</li>
          <li>Analytics services (e.g., Google Analytics — anonymised where possible)</li>
          <li>Email marketing platforms (e.g., Klaviyo)</li>
          <li>Professional advisers (accountants, lawyers) where required by law</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          We do not sell your personal data to any third party.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">6. International Transfers</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Some of our service providers may process data outside the UK. Where this occurs, we ensure appropriate safeguards are in place, such as UK International Data Transfer Agreements (IDTAs) or adequacy decisions.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">7. Data Retention</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We retain your data only as long as necessary for the purposes set out in this policy. Order data is retained for 6 years to meet tax and accounting requirements. Marketing data is retained until you unsubscribe. Account data is deleted within 30 days of account closure.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">8. Your Rights</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">Under UK GDPR, you have the right to:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li><strong className="text-foreground">Access</strong> your personal data</li>
          <li><strong className="text-foreground">Rectify</strong> inaccurate or incomplete data</li>
          <li><strong className="text-foreground">Erase</strong> your data ("right to be forgotten")</li>
          <li><strong className="text-foreground">Restrict</strong> processing</li>
          <li><strong className="text-foreground">Data portability</strong> — receive your data in a structured format</li>
          <li><strong className="text-foreground">Object</strong> to processing based on legitimate interests or direct marketing</li>
          <li><strong className="text-foreground">Withdraw consent</strong> at any time (without affecting prior processing)</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          To exercise any of these rights, email <a href="mailto:privacy@baselinenutrition.co.uk" className="text-primary hover:underline">privacy@baselinenutrition.co.uk</a>. We will respond within 30 days.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">9. Cookies</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We use cookies and similar technologies on our website. For full details, please see our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">10. Security</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We implement appropriate technical and organisational measures to protect your personal data, including encryption in transit (TLS/SSL), secure payment processing, and access controls. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">11. Complaints</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you are unhappy with how we handle your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a> or by calling 0303 123 1113.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">12. Changes to This Policy</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We may update this policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
        </p>
      </div>
    </section>
    <Footer />
  </div>
);

export default PrivacyPolicy;
