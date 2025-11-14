import { motion } from "framer-motion";
import { Lightbulb, Music4, Rocket, Waves } from "lucide-react";
import type { AutomationPlan } from "@/lib/agent";
import { Chip } from "@/components/ui/chip";

interface InsightPanelProps {
  plan: AutomationPlan;
}

const icons = {
  hook: Lightbulb,
  soundtrack: Music4,
  cta: Rocket,
  flow: Waves
};

export function InsightPanel({ plan }: InsightPanelProps) {
  const HookIcon = icons.hook;
  const SoundtrackIcon = icons.soundtrack;
  const CtaIcon = icons.cta;
  const FlowIcon = icons.flow;

  return (
    <div className="flex flex-col gap-4">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
      >
        <header className="flex items-center gap-3 text-slate-100">
          <HookIcon className="h-5 w-5 text-brand-300" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            Opening Hook
          </h2>
        </header>
        <p className="mt-3 text-sm text-slate-300">{plan.hook}</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
      >
        <header className="mb-3 flex items-center gap-3 text-slate-100">
          <FlowIcon className="h-5 w-5 text-brand-300" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            Key Beats
          </h2>
        </header>
        <ul className="space-y-2">
          {plan.keyPoints.map((point) => (
            <li key={point} className="text-sm text-slate-300">
              {point}
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
      >
        <header className="mb-3 flex items-center gap-3 text-slate-100">
          <SoundtrackIcon className="h-5 w-5 text-brand-300" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            Audio Direction
          </h2>
        </header>
        <p className="text-sm text-slate-300">{plan.soundtrack}</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
      >
        <header className="mb-3 flex items-center gap-3 text-slate-100">
          <CtaIcon className="h-5 w-5 text-brand-300" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            CTA Block
          </h2>
        </header>
        <p className="text-sm text-slate-300">{plan.ctaBlock}</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-100">
          Asset Suggestions
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {plan.assetSuggestions.map((asset) => (
            <li key={asset}>{asset}</li>
          ))}
        </ul>
      </motion.section>

      {plan.transitions.length ? (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            Featured Transitions
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {plan.transitions.map((transition) => (
              <Chip key={transition}>{transition}</Chip>
            ))}
          </div>
        </motion.section>
      ) : null}
    </div>
  );
}
