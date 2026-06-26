import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { Sparkline } from "@/components/ui/Sparkline";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case study not found" };
  return {
    title: `${cs.client} — ${cs.tagline}`,
    description: cs.summary,
    openGraph: {
      type: "article",
      title: `${cs.client} — ${cs.tagline}`,
      description: cs.summary,
      images: [cs.image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const accent =
    cs.accent === "lime" ? "var(--color-lime-strong)" : "var(--color-cobalt)";

  return (
    <article>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-hairline pt-32 pb-12 md:pt-40">
        <div className="absolute -top-32 right-0 h-96 w-[40rem] rounded-full bg-cobalt/8 blur-[120px]" />
        <div className="container-x relative">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-tint px-3 py-1 text-xs font-medium text-cobalt">
              {cs.industry}
            </span>
            <span className="rounded-full bg-canvas px-3 py-1 text-xs text-muted">
              {cs.year}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl display text-[clamp(2.25rem,5vw,3.75rem)] text-ink text-balance">
            {cs.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted text-pretty">
            {cs.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {cs.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-hairline px-3 py-1 text-sm text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* image */}
      <div className="container-x -mt-px">
        <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-3xl border border-hairline">
          <Image
            src={cs.image}
            alt={cs.imageAlt}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* metrics */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline md:grid-cols-3">
            {cs.metrics.map((m) => (
              <div key={m.label} className="bg-surface p-7">
                <div className="figure text-4xl font-semibold text-ink">
                  {m.value}
                </div>
                <div className="mt-1 text-sm text-muted">{m.label}</div>
                <Sparkline
                  data={m.spark}
                  width={160}
                  height={40}
                  stroke={accent}
                  fill={accent}
                  className="mt-4 w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* narrative */}
      <section className="pb-16 md:pb-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-3">The challenge</p>
            <p className="text-lg leading-relaxed text-ink/80">{cs.challenge}</p>
          </div>

          <div>
            <p className="eyebrow mb-5">What we did</p>
            <ol className="flex flex-col gap-5">
              {cs.approach.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="figure grid size-9 shrink-0 place-items-center rounded-full bg-ink text-sm text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1.5 leading-relaxed text-ink/80">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 rounded-3xl bg-tint p-7">
              <p className="eyebrow mb-3">The outcome</p>
              <p className="text-lg leading-relaxed text-ink/85">{cs.results}</p>
            </div>
          </div>
        </div>
      </section>

      {/* quote */}
      <section className="pb-20">
        <div className="container-x">
          <figure className="rounded-3xl bg-ink p-8 text-white md:p-14">
            <Quote className="size-10 text-lime/60" />
            <blockquote className="mt-5 max-w-3xl font-display text-2xl font-medium leading-snug text-white text-balance md:text-3xl">
              “{cs.quote.text}”
            </blockquote>
            <figcaption className="mt-7 text-sm text-white/60">
              <span className="font-semibold text-white">{cs.quote.author}</span>
              {" — "}
              {cs.quote.role}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* next + CTA */}
      <section className="border-t border-hairline py-16">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-muted">Next case study</p>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-1 inline-flex items-center gap-2 font-display text-2xl font-bold text-ink transition-colors hover:text-cobalt md:text-3xl"
            >
              {next.client}
              <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Button href="/#contact" size="lg" withArrow>
            Start your growth story
          </Button>
        </div>
      </section>
    </article>
  );
}
