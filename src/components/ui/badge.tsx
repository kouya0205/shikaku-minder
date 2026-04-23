import { cn } from "@/lib/cn";

type Tone = "brand" | "neutral" | "warning" | "success" | "muted";

const toneClasses: Record<Tone, string> = {
  brand: "bg-indigo-600 text-white",
  neutral: "bg-zinc-100 text-zinc-700 ring-1 ring-inset ring-zinc-200",
  warning: "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
  success: "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200",
  muted: "bg-zinc-50 text-zinc-500 ring-1 ring-inset ring-zinc-200",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
