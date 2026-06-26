import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Brandora home"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight",
        light ? "text-white" : "text-ink",
        className,
      )}
    >
      <span className="grid place-items-center rounded-lg bg-ink p-1.5 transition-colors group-hover:bg-cobalt">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="1" y="11" width="3.4" height="6" rx="1" fill="#fff" />
          <rect x="7.3" y="7" width="3.4" height="10" rx="1" fill="#fff" />
          <rect x="13.6" y="2" width="3.4" height="15" rx="1" fill="var(--color-lime)" />
        </svg>
      </span>
      Brandora
    </Link>
  );
}
