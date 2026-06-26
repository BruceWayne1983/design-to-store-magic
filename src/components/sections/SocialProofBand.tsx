import { Star } from "lucide-react";

const avatars = [
  { initials: "JM", color: "#3B82F6" },
  { initials: "LH", color: "#F59E0B" },
  { initials: "TW", color: "#8B5CF6" },
  { initials: "RC", color: "#10B981" },
  { initials: "ED", color: "#EF4444" },
];

const SocialProofBand = () => (
  <section className="w-full bg-background border-b border-border py-6 md:py-8 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-center sm:text-left">
      <div className="flex -space-x-3">
        {avatars.map((a) => (
          <div
            key={a.initials}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-background flex items-center justify-center text-[10px] md:text-xs font-bold text-white"
            style={{ backgroundColor: a.color }}
            aria-hidden="true"
          >
            {a.initials}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center sm:items-start gap-0.5">
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary text-primary" />
            ))}
          </div>
          <span className="text-xs md:text-sm font-bold text-foreground">Used by 2,400+ UK athletes and clinicians</span>
        </div>
        <p className="text-[11px] md:text-xs text-muted-foreground uppercase tracking-wider">
          S&C coaches · Physiotherapists · Competitive lifters
        </p>
      </div>
    </div>
  </section>
);

export default SocialProofBand;
