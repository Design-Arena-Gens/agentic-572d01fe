import { cn } from "@/lib/utils";

interface ToggleProps {
  active: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
}

export function Toggle({ active, onToggle, label, description }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition",
        active
          ? "border-brand-400/40 bg-brand-500/10 text-slate-100"
          : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700"
      )}
    >
      <div>
        <p className="font-medium">{label}</p>
        {description ? (
          <p className="text-xs text-slate-400">{description}</p>
        ) : null}
      </div>
      <span
        className={cn(
          "inline-flex h-6 w-11 items-center rounded-full border transition",
          active
            ? "border-brand-400/60 bg-brand-500/70"
            : "border-slate-700 bg-slate-800"
        )}
      >
        <span
          className={cn(
            "h-5 w-5 rounded-full bg-white transition",
            active ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}
