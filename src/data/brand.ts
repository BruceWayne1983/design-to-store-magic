// Brand metadata shared across the site. Populate URLs as channels go live;
// social links render conditionally so empty entries stay hidden.

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  { name: "Instagram", url: "", icon: Instagram },
  { name: "Facebook", url: "", icon: Facebook },
  { name: "YouTube", url: "", icon: Youtube },
  { name: "Twitter", url: "", icon: Twitter },
];

export const activeSocialLinks = (): SocialLink[] =>
  SOCIAL_LINKS.filter((s) => s.url.length > 0);
