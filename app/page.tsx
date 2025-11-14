/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Rocket, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Chip } from "@/components/ui/chip";
import { TimelineCanvas } from "@/components/plan/TimelineCanvas";
import { SceneList } from "@/components/plan/SceneList";
import { InsightPanel } from "@/components/plan/InsightPanel";
import { NarrationPanel } from "@/components/plan/NarrationPanel";
import type { AspectRatio, GenerationRequest } from "@/lib/agent";
import { useGenerationStore } from "@/store/useGenerationStore";

const toneOptions = [
  { label: "Inspirational", value: "Inspirational" },
  { label: "Educational", value: "Educational" },
  { label: "Entertaining", value: "Entertaining" },
  { label: "Product Launch", value: "Product" }
];

const aspectOptions: { label: string; value: AspectRatio }[] = [
  { label: "16:9 (Widescreen)", value: "16:9" },
  { label: "9:16 (Vertical)", value: "9:16" },
  { label: "1:1 (Square)", value: "1:1" },
  { label: "21:9 (Cinematic)", value: "21:9" }
];

const durationOptions = [
  { label: "30 seconds", value: 30 },
  { label: "45 seconds", value: 45 },
  { label: "60 seconds", value: 60 },
  { label: "90 seconds", value: 90 }
];

const initialRequest: GenerationRequest = {
  idea: "Introduce FlowPulse, an AI workflow orchestrator that automates cross-team handoffs.",
  audience: "growth-focused startup teams scaling their operations",
  tone: "Product",
  durationSeconds: 60,
  aspect: "16:9",
  callToAction: "Book a demo and unlock your automation blueprint",
  includeSubtitles: true,
  includeTransitions: true,
  includeAmbientBed: true
};

export default function Page() {
  const [form, setForm] = useState<GenerationRequest>(initialRequest);
  const { loading, error, plan, generate } = useGenerationStore();

  useEffect(() => {
    generate(initialRequest).catch(() => {});
  }, [generate]);

  const keywords = useMemo(() => {
    const merged = `${form.idea} ${form.audience}`;
    return merged
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((token) => token.length > 4)
      .slice(0, 6);
  }, [form.idea, form.audience]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    generate(form).catch(() => {});
  }

  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <img
          alt="Nebula background"
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80"
          className="h-full w-full object-cover mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/92 to-slate-950" />
      </div>

      <header className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-16 md:px-10">
        <div className="inline-flex max-w-max items-center gap-2 rounded-full border border-brand-400/40 bg-brand-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-100 shadow-lg shadow-brand-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          agentic studio fabric
        </div>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          Automation Video Creator Agent
        </h1>
        <p className="max-w-2xl text-slate-300 md:text-lg">
          Feed the agent a vision and it generates narrative arcs, cinematic shot
          lists, adaptive timelines, and delivery notes engineered for Vercel-ready deployments.
        </p>
      </header>

      <section className="mx-auto mt-12 grid max-w-6xl gap-8 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:px-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-xl shadow-slate-950/60 backdrop-blur-xl"
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Vision prompt
            </label>
            <Textarea
              value={form.idea}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, idea: event.target.value }))
              }
              placeholder="Describe the product, transformation, or storyline."
              className="mt-2"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Audience
            </label>
            <Input
              value={form.audience}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, audience: event.target.value }))
              }
              placeholder="Who are we speaking to?"
              className="mt-2"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Narrative tone
              </label>
              <Select
                className="mt-2"
                value={form.tone}
                options={toneOptions}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    tone: event.target.value as GenerationRequest["tone"]
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Aspect ratio
              </label>
              <Select
                className="mt-2"
                value={form.aspect}
                options={aspectOptions}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    aspect: event.target.value as AspectRatio
                  }))
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Target duration
              </label>
              <Select
                className="mt-2"
                value={String(form.durationSeconds)}
                options={durationOptions.map((option) => ({
                  label: option.label,
                  value: option.value.toString()
                }))}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    durationSeconds: Number(event.target.value)
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Call to action
              </label>
              <Input
                className="mt-2"
                value={form.callToAction}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    callToAction: event.target.value
                  }))
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Toggle
              active={form.includeSubtitles}
              onToggle={() =>
                setForm((prev) => ({
                  ...prev,
                  includeSubtitles: !prev.includeSubtitles
                }))
              }
              label="Adaptive subtitles"
              description="Generate per-scene subtitle cues for editing alignment."
            />
            <Toggle
              active={form.includeTransitions}
              onToggle={() =>
                setForm((prev) => ({
                  ...prev,
                  includeTransitions: !prev.includeTransitions
                }))
              }
              label="Cinematic transitions"
              description="Inject high-energy transitions between key beats."
            />
            <Toggle
              active={form.includeAmbientBed}
              onToggle={() =>
                setForm((prev) => ({
                  ...prev,
                  includeAmbientBed: !prev.includeAmbientBed
                }))
              }
              label="Ambient sound bed"
              description="Design soundtrack instructions around an ambient music bed."
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {keywords.map((keyword) => (
              <Chip key={keyword}>{keyword}</Chip>
            ))}
          </div>

          <Button
            type="submit"
            className="mt-4 h-12 gap-2 text-base"
            disabled={loading}
          >
            <Wand2 className="h-5 w-5" />
            {loading ? "Orchestrating..." : "Generate automation plan"}
          </Button>

          {error ? (
            <p className="text-sm text-rose-300">
              {error} Try refining the prompt.
            </p>
          ) : null}
        </form>

        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-brand-400/40 bg-brand-500/10 p-6 shadow-lg shadow-brand-500/20">
            <div className="flex items-center gap-3 text-brand-100">
              <Rocket className="h-5 w-5" />
              <h2 className="text-sm font-semibold uppercase tracking-widest">
                Automation Snapshot
              </h2>
            </div>
            <p className="mt-3 text-slate-200">
              {plan?.synopsis ??
                "The agent will assemble your video intelligence blueprint once you provide inputs."}
            </p>
          </div>

          {plan ? (
            <>
              <TimelineCanvas
                markers={plan.timeline}
                duration={plan.timeline.at(-1)?.end ?? form.durationSeconds}
              />
              <SceneList scenes={plan.scenes} />
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-12 text-center text-slate-400">
              <Wand2 className="h-8 w-8 animate-pulse text-brand-300" />
              <p className="max-w-sm text-sm">
                Your cinematic automation will manifest here. Feed the agent a prompt to generate the full production blueprint.
              </p>
            </div>
          )}
        </div>
      </section>

      {plan ? (
        <section className="mx-auto mt-10 grid max-w-6xl gap-6 px-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:px-10">
          <NarrationPanel plan={plan} />
          <InsightPanel plan={plan} />
        </section>
      ) : null}
    </main>
  );
}
