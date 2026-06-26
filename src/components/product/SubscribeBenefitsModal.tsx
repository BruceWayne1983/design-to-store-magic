import { CalendarDays, BellRing, Settings2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface SubscribeBenefitsModalProps {
  open: boolean;
  onClose: () => void;
}

const benefits = [
  {
    icon: CalendarDays,
    title: "FLEXIBLE FREQUENCY",
    body: "Not sure how much of something you need, or how often? Adjust quantities and frequencies any time.",
  },
  {
    icon: BellRing,
    title: "ORDER REMINDERS",
    body: "We'll let you know before each shipment. Delay, reschedule or cancel if you need to — we'll only bill you when your order ships.",
  },
  {
    icon: Settings2,
    title: "YOU'RE IN CONTROL",
    body: "Add or remove subscriptions, cancel orders, and edit frequencies and quantities through our user-friendly customer portal.",
  },
];

const SubscribeBenefitsModal = ({ open, onClose }: SubscribeBenefitsModalProps) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-background w-full max-w-lg rounded-lg shadow-2xl p-8 md:p-10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-8">
              Great reasons to subscribe
            </h2>

            <div className="space-y-6">
              {benefits.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-md bg-secondary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscribeBenefitsModal;
