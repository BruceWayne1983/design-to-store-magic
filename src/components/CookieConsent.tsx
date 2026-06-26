import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Cookie } from "lucide-react";

const COOKIE_KEY = "bn_cookie_consent";
const MINIMIZED_KEY = "bn_cookie_minimized";

type ConsentState = "accepted" | "rejected" | "custom" | null;

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setMinimized(sessionStorage.getItem(MINIMIZED_KEY) === "1");
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (state: ConsentState) => {
    const value = JSON.stringify({ state, analytics, marketing, date: new Date().toISOString() });
    localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    saveConsent("accepted");
  };

  const handleRejectAll = () => {
    setAnalytics(false);
    setMarketing(false);
    saveConsent("rejected");
  };

  const handleSavePreferences = () => {
    saveConsent("custom");
  };

  const handleMinimize = () => {
    sessionStorage.setItem(MINIMIZED_KEY, "1");
    setMinimized(true);
  };

  if (!visible) return null;

  if (minimized) {
    return (
      <button
        onClick={() => { sessionStorage.removeItem(MINIMIZED_KEY); setMinimized(false); }}
        aria-label="Cookie preferences"
        className="fixed bottom-4 left-4 z-[100] bg-background border border-border rounded-full p-3 shadow-xl hover:border-primary transition-colors"
      >
        <Cookie className="w-4 h-4 text-primary" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-3 md:p-6 pointer-events-none">
      <div className="max-w-[640px] mx-auto bg-background border border-border rounded-lg shadow-2xl overflow-hidden pointer-events-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-4 pb-2">
          <div>
            <h3 className="text-sm font-bold text-foreground">🍪 We value your privacy</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-[480px]">
              We use cookies to improve your experience, analyse site traffic, and personalise content. You can accept all cookies, reject non-essential ones, or{" "}
              <button onClick={() => setShowDetails(!showDetails)} className="text-primary hover:underline">
                customise your preferences
              </button>.
            </p>
          </div>
          <button onClick={handleMinimize} aria-label="Minimize" className="p-1 hover:opacity-70 transition-opacity flex-shrink-0">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>


        {/* Details panel */}
        {showDetails && (
          <div className="px-4 py-3 border-t border-border bg-secondary/50">
            <div className="flex flex-col gap-3">
              {/* Essential — always on */}
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground">Essential</span>
                  <p className="text-[10px] text-muted-foreground">Required for the site to function</p>
                </div>
                <div className="w-10 h-5 bg-primary rounded-full relative cursor-not-allowed opacity-70">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </label>
              {/* Analytics */}
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-foreground">Analytics</span>
                  <p className="text-[10px] text-muted-foreground">Helps us understand site usage</p>
                </div>
                <button
                  onClick={() => setAnalytics(!analytics)}
                  role="switch"
                  aria-checked={analytics}
                  aria-label="Analytics cookies"
                  className={`w-10 h-5 rounded-full relative transition-colors ${analytics ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${analytics ? "right-0.5" : "left-0.5"}`} />
                </button>
              </label>
              {/* Marketing */}
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-foreground">Marketing</span>
                  <p className="text-[10px] text-muted-foreground">Used for personalised advertising</p>
                </div>
                <button
                  onClick={() => setMarketing(!marketing)}
                  role="switch"
                  aria-checked={marketing}
                  aria-label="Marketing cookies"
                  className={`w-10 h-5 rounded-full relative transition-colors ${marketing ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${marketing ? "right-0.5" : "left-0.5"}`} />
                </button>
              </label>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 p-4 pt-3">
          {showDetails ? (
            <button
              onClick={handleSavePreferences}
              className="flex-1 py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              Save Preferences
            </button>
          ) : (
            <>
              <button
                onClick={handleRejectAll}
                className="flex-1 py-2.5 border border-border text-foreground text-xs font-bold uppercase tracking-wider rounded hover:border-primary transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
              >
                Accept All
              </button>
            </>
          )}
        </div>

        {/* Policy link */}
        <div className="px-4 pb-3 text-center">
          <Link to="/cookies" className="text-[10px] text-muted-foreground hover:text-primary transition-colors">
            Read our full Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
