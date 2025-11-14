import { motion } from "framer-motion";
import type { TimelineMarker } from "@/lib/agent";

interface TimelineCanvasProps {
  markers: TimelineMarker[];
  duration: number;
}

const palette: Record<TimelineMarker["type"], string> = {
  scene: "bg-brand-500/60 border-brand-400/70",
  transition: "bg-purple-500/40 border-purple-300/70",
  subtitle: "bg-emerald-500/30 border-emerald-300/60",
  broll: "bg-orange-500/30 border-orange-300/60",
  cta: "bg-rose-500/40 border-rose-300/70"
};

const labelPalette: Record<TimelineMarker["type"], string> = {
  scene: "text-brand-50",
  transition: "text-purple-50",
  subtitle: "text-emerald-100",
  broll: "text-orange-100",
  cta: "text-rose-100"
};

export function TimelineCanvas({ markers, duration }: TimelineCanvasProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="flex items-baseline justify-between">
        <p className="text-lg font-semibold text-slate-100">Adaptive Timeline</p>
        <span className="text-xs uppercase tracking-widest text-slate-400">
          total {Math.round(duration)}s
        </span>
      </div>
      <div className="relative h-20 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
        {markers.map((marker) => {
          const width = Math.max((marker.end - marker.start) / duration, 0.02);
          const left = marker.start / duration;
          return (
            <motion.div
              key={marker.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute top-2 h-[calc(100%-1rem)] rounded-lg border px-3 py-2 text-xs font-medium shadow-lg shadow-brand-500/10 ${palette[marker.type]}`}
              style={{
                width: `${width * 100}%`,
                left: `${left * 100}%`
              }}
            >
              <span className={`block truncate ${labelPalette[marker.type]}`}>
                {marker.label}
              </span>
              <span className="mt-1 block text-[10px] uppercase text-white/50">
                {marker.start.toFixed(1)}s – {marker.end.toFixed(1)}s
              </span>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-500">
        <span>0s</span>
        <span>{Math.round(duration / 3)}s</span>
        <span>{Math.round((duration / 3) * 2)}s</span>
        <span>{Math.round(duration)}s</span>
      </div>
    </div>
  );
}
