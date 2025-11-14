import { motion } from "framer-motion";
import type { ScenePlan } from "@/lib/agent";

interface SceneListProps {
  scenes: ScenePlan[];
}

export function SceneList({ scenes }: SceneListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {scenes.map((scene, index) => (
        <motion.article
          key={scene.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
          className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-5 shadow-lg shadow-slate-900/60"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-100">
              {scene.title}
            </h3>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-[11px] uppercase tracking-widest text-slate-400">
              {scene.duration}s
            </span>
          </div>
          <p className="text-sm text-slate-300">{scene.narrative}</p>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-200">
            <span className="text-xs uppercase text-slate-500">Visuals</span>
            <p>{scene.visuals}</p>
          </div>
          <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/30 p-3">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Shot breakdown
            </p>
            {scene.shots.map((shot) => (
              <div
                key={shot.id}
                className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3 text-xs text-slate-300"
              >
                <p className="font-semibold text-slate-100">{shot.title}</p>
                <p>{shot.description}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-slate-500">
                  <span>Camera: {shot.camera}</span>
                  <span>Lighting: {shot.lighting}</span>
                  <span>Motion: {shot.motion}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
