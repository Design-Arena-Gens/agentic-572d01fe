import { create } from "zustand";
import { generateAutomationPlan, type AutomationPlan, type GenerationRequest } from "@/lib/agent";

interface GenerationState {
  loading: boolean;
  error?: string;
  plan?: AutomationPlan;
  lastRequest?: GenerationRequest;
  generate: (input: GenerationRequest) => Promise<void>;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  loading: false,
  error: undefined,
  plan: undefined,
  lastRequest: undefined,
  generate: async (input) => {
    try {
      set({ loading: true, error: undefined, lastRequest: input });

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(payload.error ?? "Failed to generate plan.");
      }

      const { plan } = (await response.json()) as { plan: AutomationPlan };

      set({ plan, loading: false });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error during generation."
      });
    }
  }
}));
