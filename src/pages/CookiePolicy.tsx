import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => (
  <div className="flex flex-col items-start w-full">
    <AnnouncementBar />
    <Navbar />
    <section className="w-full bg-background py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[768px] mx-auto prose prose-sm prose-invert">
        <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight mb-2">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: 15 April 2026</p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">1. What Are Cookies?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences, understand how you use the site, and improve your experience. Some cookies are essential for the site to function; others help us with analytics and marketing.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">2. Cookies We Use</h2>

        <h3 className="text-sm font-bold text-foreground mt-6 mb-2">Strictly Necessary Cookies</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These cookies are essential for the website to function. They enable core features like shopping cart functionality, secure checkout, and account authentication. You cannot opt out of these cookies.
        </p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm text-muted-foreground border border-border">
            <thead>
              <tr className="bg-secondary">
                <th className="text-left p-2 text-foreground text-xs font-bold">Cookie</th>
                <th className="text-left p-2 text-foreground text-xs font-bold">Purpose</th>
                <th className="text-left p-2 text-foreground text-xs font-bold">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border"><td className="p-2">cart_token</td><td className="p-2">Shopping cart session</td><td className="p-2">14 days</td></tr>
              <tr className="border-t border-border"><td className="p-2">session_id</td><td className="p-2">User session management</td><td className="p-2">Session</td></tr>
              <tr className="border-t border-border"><td className="p-2">cookie_consent</td><td className="p-2">Stores your cookie preferences</td><td className="p-2">365 days</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold text-foreground mt-6 mb-2">Analytics Cookies</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These cookies help us understand how visitors interact with our website by collecting anonymous information. This helps us improve the site.
        </p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm text-muted-foreground border border-border">
            <thead>
              <tr className="bg-secondary">
                <th className="text-left p-2 text-foreground text-xs font-bold">Cookie</th>
                <th className="text-left p-2 text-foreground text-xs font-bold">Purpose</th>
                <th className="text-left p-2 text-foreground text-xs font-bold">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border"><td className="p-2">_ga</td><td className="p-2">Google Analytics — distinguishes users</td><td className="p-2">2 years</td></tr>
              <tr className="border-t border-border"><td className="p-2">_ga_*</td><td className="p-2">Google Analytics — session state</td><td className="p-2">2 years</td></tr>
              <tr className="border-t border-border"><td className="p-2">_gid</td><td className="p-2">Google Analytics — distinguishes users</td><td className="p-2">24 hours</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold text-foreground mt-6 mb-2">Marketing Cookies</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These cookies are used to deliver relevant advertisements and track marketing campaign performance. They may be set by our advertising partners.
        </p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm text-muted-foreground border border-border">
            <thead>
              <tr className="bg-secondary">
                <th className="text-left p-2 text-foreground text-xs font-bold">Cookie</th>
                <th className="text-left p-2 text-foreground text-xs font-bold">Purpose</th>
                <th className="text-left p-2 text-foreground text-xs font-bold">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border"><td className="p-2">_fbp</td><td className="p-2">Meta/Facebook — ad delivery and measurement</td><td className="p-2">90 days</td></tr>
              <tr className="border-t border-border"><td className="p-2">_tt_*</td><td className="p-2">TikTok — ad performance tracking</td><td className="p-2">13 months</td></tr>
              <tr className="border-t border-border"><td className="p-2">_kla_id</td><td className="p-2">Klaviyo — email marketing attribution</td><td className="p-2">2 years</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">3. Managing Your Cookie Preferences</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When you first visit our site, a cookie banner will ask for your consent. You can change your preferences at any time by clicking "Cookie Settings" in the website footer.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          You can also manage cookies through your browser settings. Note that disabling certain cookies may affect site functionality.
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
        </ul>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">4. Third-Party Cookies</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Please refer to the respective third party's privacy policy for more information.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">5. Changes to This Policy</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We may update this Cookie Policy from time to time to reflect changes in technology or legislation. Any changes will be posted on this page.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-8 mb-3">6. Contact</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For questions about our use of cookies, email <a href="mailto:privacy@baselinenutrition.co.uk" className="text-primary hover:underline">privacy@baselinenutrition.co.uk</a>.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            See also: <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> · <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default CookiePolicy;
