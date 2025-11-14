import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Chip({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-100",
        className
      )}
      {...props}
    />
  );
}
