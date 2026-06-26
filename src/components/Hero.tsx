"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { AreaChart } from "./ui/AreaChart";
import { StatCounter } from "./ui/StatCounter";
import { Button } from "./ui/Button";

const headline = ["Growth", "you can", "measure."];

const trust = [
  { value: 240, prefix: "$", suffix: "M+", label: "Revenue driven" },
  { value: 210, suffix: "+", label: "Brands scaled" },
  { value: 4.2, suffix: "x", decimals: 1, label: "Avg. blended ROAS" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_30%,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-cobalt/10 blur-[120px]" />
        <div className="absolute right-[8%] top-24 h-72 w-72 rounded-full bg-lime/15 blur-[100px]" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* left */}
        <div>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-sm shadow-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-strong opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime-strong" />
            </span>
            <span className="font-medium text-ink">Now booking Q3</span>
            <span className="text-muted">·</span>
            <span className="text-muted">2 partner spots left</span>
          </motion.div>

          <h1 className="mt-6 display text-[clamp(2.75rem,7vw,5rem)] text-ink">
            {headline.map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word === "measure." ? (
                    <span className="relative">
                      measure
                      <span className="text-cobalt">.</span>
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[0.18em] w-full origin-left rounded-full bg-lime"
                        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted text-pretty"
          >
            Brandora is the growth partner for brands that want results they can
            point to. Strategy, SEO, paid media, and creative — engineered around
            your revenue, not our retainer.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="/#contact" size="lg" withArrow>
              Get a free growth audit
            </Button>
            <Button href="/#work" size="lg" variant="outline">
              See the results
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-hairline pt-7"
          >
            {trust.map((t) => (
              <div key={t.label}>
                <div className="figure text-2xl font-semibold text-ink md:text-3xl">
                  <StatCounter
                    value={t.value}
                    prefix={t.prefix}
                    suffix={t.suffix}
                    decimals={t.decimals ?? 0}
                  />
                </div>
                <div className="mt-1 text-xs leading-tight text-muted">{t.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* right: signature chart card */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="rounded-3xl border border-hairline bg-surface p-5 shadow-[0_30px_60px_-30px_rgba(12,19,34,0.25)] md:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">Client performance</p>
                <p className="font-display text-lg font-bold text-ink">
                  Lumen Health · 12 months
                </p>
              </div>
              <span className="figure rounded-full bg-tint px-2.5 py-1 text-xs font-medium text-cobalt">
                Live
              </span>
            </div>
            <AreaChart />
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-hairline pt-5">
              {[
                { v: "+312%", l: "Organic" },
                { v: "4.2x", l: "ROAS" },
                { v: "−41%", l: "CAC" },
              ].map((m) => (
                <div key={m.l} className="text-center">
                  <div className="figure text-lg font-semibold text-ink">{m.v}</div>
                  <div className="text-xs text-muted">{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* floating review chip */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="absolute -bottom-5 -left-4 hidden items-center gap-2 rounded-2xl border border-hairline bg-ink px-4 py-3 text-white shadow-xl sm:flex"
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-lime text-lime" />
              ))}
            </div>
            <span className="text-sm font-medium">Rated 5.0 by 60+ founders</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
