// Brand metadata shared across the site. Populate URLs as channels go live;
// social links render conditionally so empty entries stay hidden.

import { Facebook, Instagram, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createElement, forwardRef } from "react";

const TikTokIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) =>
  createElement(
    "svg",
    { ref, viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", ...props },
    createElement("path", {
      d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.44a8.16 8.16 0 0 0 4.77 1.52V6.51a4.85 4.85 0 0 1-1.84-.18z",
    }),
  ),
) as unknown as LucideIcon;

export const BRAND_NAME = "Baseline Nutrition";
export const BRAND_TAGLINE = "Performance nutrition built on real science.";
export const BRAND_EMAIL = "support@baselinenutrition.co.uk";

export const BRAND_ADDRESS = {
  line1: "Unit 16-18 Tresham Road",
  line2: "Peterborough, PE2 6SS",
  country: "United Kingdom",
};

export const FREE_SHIPPING_THRESHOLD = 75;

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}


// Add URLs as social channels go live. Entries with an empty url are skipped.
export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Instagram", url: "https://www.instagram.com/baselinenutrition", icon: Instagram },
  { name: "Facebook", url: "https://www.facebook.com/baselinenutrition", icon: Facebook },
  { name: "YouTube", url: "https://www.youtube.com/@baselinenutrition", icon: Youtube },
  { name: "TikTok", url: "https://www.tiktok.com/@baselinenutrition", icon: TikTokIcon },
];

export const activeSocialLinks = (): SocialLink[] =>
  SOCIAL_LINKS.filter((s) => s.url.length > 0);
