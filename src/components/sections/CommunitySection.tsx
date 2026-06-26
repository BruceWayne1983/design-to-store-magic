import { motion } from "framer-motion";
import { Send, MessageCircle, Sparkles, Megaphone, Tag, Users } from "lucide-react";

const TELEGRAM_URL = "#"; // TODO: replace with t.me/baselinenutrition at launch
const WHATSAPP_URL = "#"; // TODO: replace with WhatsApp Community invite link at launch

const CommunitySection = () => {
  return (
    <section className="w-full bg-[#020617] text-white py-24 md:py-32 px-6 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-blue-400 text-[10px] font-bold tracking-[0.4em] uppercase border border-blue-500/30 px-4 py-1.5 inline-block mb-6">
            Join the Baseline Community
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl uppercase tracking-tight leading-none mb-6">
            Train Smarter. <span className="text-blue-500">Together.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            Two channels. One mission. Get clinical-grade insights, exclusive drops and a
            community of athletes serious about evidence-based performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telegram — Broadcast + AI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-gradient-to-br from-[#0a1a2e] to-[#05070A] border border-white/10 hover:border-blue-500/50 transition-all p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-blue-600 px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
              Launching Soon
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <Send className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] mb-1">
                  Channel 01 // Telegram
                </p>
                <h3 className="font-bebas text-3xl uppercase tracking-wide">
                  The Baseline Broadcast
                </h3>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Curated, low-noise. Direct intel from our formulators — no group chat chaos.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                { Icon: Megaphone, label: "Restock alerts & priority drops" },
                { Icon: Tag, label: "Member-only discount codes" },
                { Icon: Sparkles, label: "AI Coach Q&A — ask any training or supplement question" },
                { Icon: Send, label: "Weekly research breakdowns & dosing protocols" },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex items-start gap-3 text-sm text-white/80">
                  <Icon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <a
              href={TELEGRAM_URL}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              className="block w-full text-center bg-blue-600/20 border border-blue-500/40 text-blue-300 py-4 text-xs font-bold uppercase tracking-[0.3em] cursor-not-allowed"
            >
              Join Telegram — Coming at Launch
            </a>
          </motion.div>

          {/* WhatsApp — Community Discussion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-gradient-to-br from-[#0a1f1a] to-[#05070A] border border-white/10 hover:border-emerald-500/50 transition-all p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-emerald-600 px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
              Launching Soon
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] mb-1">
                  Channel 02 // WhatsApp
                </p>
                <h3 className="font-bebas text-3xl uppercase tracking-wide">
                  The Athlete Circle
                </h3>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Two-way community. Talk training, nutrition and recovery with athletes who take it
              as seriously as you do.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                { Icon: Users, label: "Open discussion with the Baseline athlete network" },
                { Icon: MessageCircle, label: "Share PRs, protocols and progress" },
                { Icon: Sparkles, label: "Direct access to coaches & formulators" },
                { Icon: Megaphone, label: "First look at new product testing rounds" },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex items-start gap-3 text-sm text-white/80">
                  <Icon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <a
              href={WHATSAPP_URL}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              className="block w-full text-center bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 py-4 text-xs font-bold uppercase tracking-[0.3em] cursor-not-allowed"
            >
              Join WhatsApp — Coming at Launch
            </a>
          </motion.div>
        </div>

        <p className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mt-12">
          [ Both channels go live at official store launch ]
        </p>
      </div>
    </section>
  );
};

export default CommunitySection;
