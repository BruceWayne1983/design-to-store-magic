import { motion } from "framer-motion";

const experts = [
  { initials: "DR", title: "Sports Doctor", color: "#3B82F6" },
  { initials: "PT", title: "S&C Coach", color: "#F59E0B" },
  { initials: "RD", title: "Performance Dietitian", color: "#10B981" },
  { initials: "MD", title: "Endurance Physician", color: "#8B5CF6" },
  { initials: "PT", title: "Elite Trainer", color: "#EF4444" },
];

const TrustedByExperts = () => (
  <section className="w-full bg-[hsl(var(--hero-dark))] text-white py-10 md:py-14 px-4 md:px-8 lg:px-16 border-b border-white/10">
    <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
      <div className="flex -space-x-3">
        {experts.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[11px] font-bold uppercase tracking-wider border-2 border-[hsl(var(--hero-dark))] ring-1 ring-white/10"
            style={{ background: `linear-gradient(135deg, ${e.color}, ${e.color}99)` }}
            aria-label={e.title}
          >
            {e.initials}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Trusted by Clinicians & Coaches
        </p>
        <p className="text-sm md:text-base text-white/70 max-w-[520px]">
          Used and recommended by sports physicians, S&C coaches and performance dietitians across the UK.
        </p>
      </div>
    </div>
  </section>
);

export default TrustedByExperts;
