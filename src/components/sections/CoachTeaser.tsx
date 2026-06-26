import { Sparkles } from "lucide-react";

export default function CoachTeaser() {
  return (
    <section className="w-full bg-gradient-to-br from-[#0a0f1f] via-[#0f1a36] to-[#0a0f1f] text-white py-12 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Coming to the Baseline App & Website
          </div>
          <h2 className="font-bebas text-4xl md:text-5xl tracking-wider mb-3 leading-none">
            BASELINE AI COACH
          </h2>
          <p className="text-white/70 text-base mb-5 max-w-md">
            Your private, evidence-based bodybuilding coach. Programme design, nutrition, supplementation,
            recovery and bloodwork interpretation — built into the Baseline app and website, on demand 24/7.
          </p>
          <ul className="space-y-1.5 text-sm text-white/80 mb-5">
            <li>• Personalised hypertrophy, strength, DC & PPL programming</li>
            <li>• Macros, meal timing & Baseline stack guidance</li>
            <li>• Form cues, substitutions & injury work-arounds</li>
            <li>• Recovery, sleep & basic bloodwork interpretation</li>
          </ul>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/60">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Launching soon — in the Baseline app & website
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[3/4] max-w-[280px] mx-auto rounded-3xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent border border-white/10 p-6 flex flex-col justify-end">
            <div className="bg-black/40 backdrop-blur rounded-2xl p-4 mb-3 max-w-[220px]">
              <p className="text-xs text-white/50 mb-1">You</p>
              <p className="text-sm">Build me a 4-day DC split for hypertrophy at 12% bodyfat.</p>
            </div>
            <div className="bg-primary/20 backdrop-blur rounded-2xl p-4 max-w-[240px] border border-primary/30">
              <p className="text-xs text-primary mb-1">Baseline AI Coach</p>
              <p className="text-sm text-white/90">
                Locked in. Day 1 chest/shoulders/tris/back-width — one all-out work set + two rest-pause
                drops per movement. RPE 9. Stack with VASCUL8 pre + GLYCO8 intra…
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

