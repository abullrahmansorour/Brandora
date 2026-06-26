import { process } from "@/content/process";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { Button } from "./ui/Button";

export function Process() {
  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-white md:py-32"
    >
      <div className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000,transparent_80%)]" />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            light
            eyebrow="How we work"
            title="A process built to de-risk growth"
            description="No black boxes. Five clear phases that turn ambition into a forecast — and a forecast into results you can see."
          />
          <Button href="/#contact" variant="lime" withArrow className="shrink-0">
            Book a discovery call
          </Button>
        </div>

        <RevealGroup
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-5"
          stagger={0.07}
        >
          {process.map((step, i) => (
            <RevealItem key={step.no} className="h-full">
              <div className="flex h-full flex-col bg-ink p-6 transition-colors duration-300 hover:bg-ink-soft">
                <div className="flex items-center justify-between">
                  <span className="figure text-sm font-medium text-lime">
                    {step.no}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-white/40">
                    {step.duration}
                  </span>
                </div>
                <div className="mt-4 h-px w-full bg-white/10">
                  <div
                    className="h-px bg-lime"
                    style={{ width: `${((i + 1) / process.length) * 100}%` }}
                  />
                </div>
                <h3 className="mt-5 text-xl text-white">{step.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/55">
                  {step.description}
                </p>
                <ul className="mt-5 flex flex-col gap-1.5">
                  {step.outputs.map((o) => (
                    <li
                      key={o}
                      className="flex items-center gap-2 text-xs text-white/70"
                    >
                      <span className="size-1 rounded-full bg-cobalt-soft" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
