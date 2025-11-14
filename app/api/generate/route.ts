import { NextResponse } from "next/server";
import { generateAutomationPlan, type GenerationRequest } from "@/lib/agent";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<GenerationRequest>;

  if (!body.idea || !body.audience || !body.callToAction) {
    return NextResponse.json(
      { error: "Missing required fields: idea, audience, callToAction" },
      { status: 400 }
    );
  }

  const payload: GenerationRequest = {
    idea: body.idea,
    audience: body.audience,
    tone: body.tone ?? "Inspirational",
    durationSeconds: body.durationSeconds ?? 60,
    aspect: body.aspect ?? "16:9",
    callToAction: body.callToAction,
    includeSubtitles: body.includeSubtitles ?? true,
    includeTransitions: body.includeTransitions ?? true,
    includeAmbientBed: body.includeAmbientBed ?? true
  };

  const plan = generateAutomationPlan(payload);

  return NextResponse.json({ plan });
}
