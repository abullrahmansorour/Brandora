import {
  Gem,
  Search,
  Target,
  MessagesSquare,
  MonitorSmartphone,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/content/services";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";

const icons: Record<string, LucideIcon> = {
  Gem,
  Search,
  Target,
  MessagesSquare,
  MonitorSmartphone,
  Clapperboard,
};

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Six disciplines. One number that matters."
            description="We plug in wherever growth is stuck — and run each channel against the metric that moves your business."
          />
        </div>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon] ?? Gem;
            return (
              <RevealItem key={service.slug}>
                <article className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_24px_48px_-24px_rgba(12,19,34,0.22)]">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-tint text-cobalt transition-colors duration-300 group-hover:bg-cobalt group-hover:text-white">
                      <Icon className="size-6" />
                    </span>
                    <div className="text-right">
                      <div className="figure text-xl font-semibold text-ink">
                        {service.metric.value}
                      </div>
                      <div className="text-[11px] leading-tight text-muted">
                        {service.metric.label}
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl text-ink">{service.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {service.summary}
                  </p>

                  <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-hairline pt-5">
                    {service.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-1.5 text-xs text-ink/70"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cobalt" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
