import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

export function Select({ options, className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
