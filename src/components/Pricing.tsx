import { Check, Sparkles } from "lucide-react";
import { pricing, pricingNote } from "@/content/pricing";
import { SectionHeading } from "./ui/SectionHeading";
import { Button } from "./ui/Button";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title="Plans that scale with your ambition"
          description="Transparent monthly partnerships — no long lock-ins, no surprise fees. Pick the engine that fits where you are now."
        />

        <RevealGroup
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
          stagger={0.08}
        >
          {pricing.map((tier) => (
            <RevealItem key={tier.name} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-8",
                  tier.featured
                    ? "border-transparent bg-ink text-white shadow-[0_30px_70px_-30px_rgba(27,77,255,0.6)] lg:-mt-4 lg:mb-4"
                    : "border-hairline bg-surface",
                )}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink">
                    <Sparkles className="size-3.5" />
                    Most popular
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <h3
                    className={cn(
                      "font-display text-lg font-bold",
                      tier.featured ? "text-white" : "text-ink",
                    )}
                  >
                    {tier.name}
                  </h3>
                </div>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    tier.featured ? "text-white/55" : "text-muted",
                  )}
                >
                  {tier.tagline}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span
                    className={cn(
                      "figure text-4xl font-semibold",
                      tier.featured ? "text-white" : "text-ink",
                    )}
                  >
                    {tier.price}
                  </span>
                  {tier.cadence && (
                    <span
                      className={cn(
                        "pb-1 text-sm",
                        tier.featured ? "text-white/50" : "text-muted",
                      )}
                    >
                      {tier.cadence}
                    </span>
                  )}
                </div>

                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed",
                    tier.featured ? "text-white/60" : "text-muted",
                  )}
                >
                  {tier.description}
                </p>

                <Button
                  href="/#contact"
                  variant={tier.featured ? "lime" : "dark"}
                  size="md"
                  withArrow
                  className="mt-6 w-full"
                >
                  {tier.cta}
                </Button>

                <ul
                  className={cn(
                    "mt-8 flex flex-1 flex-col gap-3 border-t pt-6 text-sm",
                    tier.featured ? "border-white/10" : "border-hairline",
                  )}
                >
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                          tier.featured
                            ? "bg-lime/20 text-lime"
                            : "bg-tint text-cobalt",
                        )}
                      >
                        <Check className="size-3" />
                      </span>
                      <span className={tier.featured ? "text-white/80" : "text-ink/80"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
          {pricingNote}
        </p>
      </div>
    </section>
  );
}
