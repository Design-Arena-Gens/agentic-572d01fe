import type { AutomationPlan } from "@/lib/agent";

interface NarrationPanelProps {
  plan: AutomationPlan;
}

export function NarrationPanel({ plan }: NarrationPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 shadow-lg shadow-slate-900/60">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            Narration Blueprint
          </h2>
          <p className="text-xs text-slate-400">
            Align delivery with timeline and subtitle cues.
          </p>
        </div>
        <span className="rounded-full border border-slate-800 px-3 py-1 text-[11px] uppercase tracking-widest text-slate-400">
          {plan.subtitles.length} subtitle cues
        </span>
      </header>
      <div className="mt-4 grid gap-3">
        {plan.narration.map((line) => (
          <div
            key={line}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200"
          >
            {line}
          </div>
        ))}
      </div>
      {plan.subtitles.length ? (
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Subtitle timeline
          </h3>
          <ul className="mt-3 space-y-2 text-xs text-slate-300">
            {plan.subtitles.map((subtitle) => (
              <li key={subtitle.id} className="flex justify-between gap-4">
                <span className="truncate">{subtitle.text}</span>
                <span className="text-slate-500">
                  {subtitle.start.toFixed(1)}s - {subtitle.end.toFixed(1)}s
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
