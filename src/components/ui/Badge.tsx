import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "lime" | "cobalt" | "dark";
}) {
  const tones = {
    default: "bg-tint text-cobalt border-cobalt/10",
    lime: "bg-lime/15 text-ink border-lime/40",
    cobalt: "bg-cobalt text-white border-transparent",
    dark: "bg-ink text-white border-transparent",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
