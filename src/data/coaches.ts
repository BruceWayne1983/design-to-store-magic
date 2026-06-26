export interface Coach {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  initials: string;
  accent: string; // tailwind color class for avatar bg
}

export const coaches: Coach[] = [
  {
    slug: "head-of-performance",
    name: "{{COACH_NAME_1}}",
    role: "Head of Performance Science",
    credentials: "MSc Sports Science · CSCS",
    bio: "Programming and periodisation lead. Works with strength athletes, hybrid competitors, and field-sport pros.",
    initials: "HP",
    accent: "from-primary/30 to-primary/5",
  },
  {
    slug: "nutrient-timing-lead",
    name: "{{COACH_NAME_2}}",
    role: "Nutrient Timing & Fuelling",
    credentials: "PhD Sports Nutrition · SENr",
    bio: "Translates carbohydrate, protein, and hydration research into pre-, intra-, and post-training protocols.",
    initials: "NT",
    accent: "from-cyan-400/30 to-cyan-400/5",
  },
  {
    slug: "recovery-lead",
    name: "{{COACH_NAME_3}}",
    role: "Recovery & Conditioning",
    credentials: "MSc Strength & Conditioning",
    bio: "Builds deload weeks, conditioning blocks, and sleep/recovery frameworks for high-volume athletes.",
    initials: "RC",
    accent: "from-emerald-400/30 to-emerald-400/5",
  },
];
