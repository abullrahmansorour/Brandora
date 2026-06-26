import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { cn } from "@/lib/utils";

function Stars({ light = false }: { light?: boolean }) {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("size-4", light ? "fill-lime text-lime" : "fill-cobalt text-cobalt")}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-y border-hairline bg-surface py-24 md:py-32"
    >
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Client love"
          title="Founders and marketers, in their words"
          description="The relationships behind the numbers. Here's what it's like to grow with Brandora."
        />

        <RevealGroup
          className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5"
          stagger={0.06}
        >
          {testimonials.map((t, i) => {
            const featured = i === 0;
            return (
              <RevealItem key={t.author} className="break-inside-avoid">
                <figure
                  className={cn(
                    "flex flex-col rounded-2xl border p-6",
                    featured
                      ? "border-transparent bg-ink text-white"
                      : "border-hairline bg-canvas",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Stars light={featured} />
                    <Quote
                      className={cn(
                        "size-7",
                        featured ? "text-lime/60" : "text-cobalt/25",
                      )}
                    />
                  </div>
                  <blockquote
                    className={cn(
                      "mt-4 text-pretty leading-relaxed",
                      featured ? "text-lg text-white/90" : "text-ink/80",
                    )}
                  >
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={`Portrait of ${t.author}`}
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover"
                    />
                    <div>
                      <div
                        className={cn(
                          "text-sm font-semibold",
                          featured ? "text-white" : "text-ink",
                        )}
                      >
                        {t.author}
                      </div>
                      <div
                        className={cn(
                          "text-xs",
                          featured ? "text-white/55" : "text-muted",
                        )}
                      >
                        {t.role}, {t.company}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
