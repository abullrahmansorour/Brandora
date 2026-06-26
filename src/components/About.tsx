import Image from "next/image";
import { Check } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { StatCounter } from "./ui/StatCounter";
import { Reveal } from "./ui/Reveal";

const values = [
  "Revenue over vanity metrics",
  "Forecasts we're willing to be held to",
  "Senior team, no junior handoffs",
  "Radical transparency on what's working",
];

const stats = [
  { value: 210, suffix: "+", label: "Brands scaled" },
  { value: 240, prefix: "$", suffix: "M+", label: "Revenue driven" },
  { value: 94, suffix: "%", label: "Client retention" },
  { value: 38, suffix: "", label: "In-house specialists" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-tint py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="The growth team founders call when results have to be real"
            description="Brandora started in 2017 with a simple frustration: too many agencies sold activity, not outcomes. We built the opposite — a senior team obsessed with the numbers that actually grow a business."
          />

          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cobalt text-white">
                    <Check className="size-3" />
                  </span>
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/60 shadow-[0_30px_60px_-30px_rgba(12,19,34,0.3)]">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="The Brandora team collaborating during a strategy session"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-surface p-4 text-center">
                  <div className="figure text-2xl font-semibold text-ink">
                    <StatCounter
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </div>
                  <div className="mt-1 text-[11px] leading-tight text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
