import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CountdownBannerProps {
  headline?: string;
  cta?: string;
  link?: string;
  endDate?: Date;
}

function getTimeLeft(end: Date) {
  const diff = Math.max(0, end.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const CountdownBanner = ({
  headline = "Launch Offer — Free Shipping on All Orders",
  cta = "Shop Now",
  link = "/site/shop",
  endDate = new Date(Date.now() + 3 * 86400000),
}: CountdownBannerProps) => {
  const [time, setTime] = useState(getTimeLeft(endDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(endDate)), 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hrs", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  return (
    <section className="w-full bg-primary py-6 md:py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <h3 className="text-sm md:text-base font-bold text-primary-foreground uppercase tracking-wider text-center">
          {headline}
        </h3>
        <div className="flex gap-3">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-black text-primary-foreground leading-none">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-primary-foreground/70 uppercase">{u.label}</span>
            </div>
          ))}
        </div>
        <Link
          to={link}
          className="px-5 py-2 bg-primary-foreground text-primary text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity rounded"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
};

export default CountdownBanner;
