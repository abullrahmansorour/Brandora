"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/content/faq";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-hairline bg-surface py-24 md:py-32"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-cobalt/50" aria-hidden />
            Questions
          </p>
          <h2 className="display text-[clamp(2rem,4.4vw,3.25rem)] text-ink">
            Answers before
            <br />
            you ask
          </h2>
          <p className="mt-5 max-w-sm text-muted">
            Still weighing whether we&apos;re the right fit? Here&apos;s what most
            founders want to know — and a quick way to ask the rest.
          </p>
          <Button href="/#contact" variant="primary" withArrow className="mt-7">
            Talk to a strategist
          </Button>
        </div>

        <ul className="divide-y divide-hairline border-y border-hairline">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    className={cn(
                      "font-display text-lg font-medium transition-colors md:text-xl",
                      isOpen ? "text-cobalt" : "text-ink",
                    )}
                  >
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-cobalt bg-cobalt text-white"
                        : "border-hairline text-ink",
                    )}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 pr-10 leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
