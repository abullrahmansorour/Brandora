import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/content/caseStudies";
import { SectionHeading } from "./ui/SectionHeading";
import { Sparkline } from "./ui/Sparkline";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { Button } from "./ui/Button";

export function CaseStudies() {
  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Results, not vanity metrics"
            description="A look at how we've helped brands turn marketing spend into measurable, compounding growth."
          />
          <Button href="/#contact" variant="outline" withArrow className="shrink-0">
            Start your story
          </Button>
        </div>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2" stagger={0.1}>
          {caseStudies.map((cs) => (
            <RevealItem key={cs.slug} className="h-full">
              <Link
                href={`/work/${cs.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(12,19,34,0.28)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {cs.industry}
                    </span>
                    <span className="rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {cs.year}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <p className="text-sm text-white/70">{cs.client}</p>
                      <p className="font-display text-xl font-bold leading-snug text-balance">
                        {cs.tagline}
                      </p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {cs.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="figure text-2xl font-semibold text-ink">
                          {m.value}
                        </div>
                        <div className="mb-2 text-xs leading-tight text-muted">
                          {m.label}
                        </div>
                        <Sparkline
                          data={m.spark}
                          width={100}
                          height={28}
                          stroke={
                            cs.accent === "lime"
                              ? "var(--color-lime-strong)"
                              : "var(--color-cobalt)"
                          }
                          fill={
                            cs.accent === "lime"
                              ? "var(--color-lime-strong)"
                              : "var(--color-cobalt)"
                          }
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
                    {cs.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-canvas px-3 py-1 text-xs text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
