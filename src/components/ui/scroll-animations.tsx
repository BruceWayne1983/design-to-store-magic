import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const shouldDisableScrollReveal = () => {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  if (params.get("deckCapture") === "true") return true;

  try {
    return window.self !== window.top;
  } catch {
    return false;
  }
};

interface ScrollRevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export const ScrollReveal = ({ children, variants = fadeUp, className, delay = 0 }: ScrollRevealProps) => (
  <motion.div
    initial={shouldDisableScrollReveal() ? "visible" : "hidden"}
    whileInView={shouldDisableScrollReveal() ? undefined : "visible"}
    animate={shouldDisableScrollReveal() ? "visible" : undefined}
    viewport={{ once: true, margin: "-80px" }}
    variants={variants}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial={shouldDisableScrollReveal() ? "visible" : "hidden"}
    whileInView={shouldDisableScrollReveal() ? undefined : "visible"}
    animate={shouldDisableScrollReveal() ? "visible" : undefined}
    viewport={{ once: true, margin: "-60px" }}
    variants={stagger}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={fadeUp}
    initial={shouldDisableScrollReveal() ? "visible" : undefined}
    animate={shouldDisableScrollReveal() ? "visible" : undefined}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export { fadeUp, stagger, scaleIn, slideLeft, slideRight };
