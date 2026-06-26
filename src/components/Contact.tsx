"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Check, Loader2, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const budgets = [
  "Under $5k / mo",
  "$5k – $10k / mo",
  "$10k – $25k / mo",
  "$25k+ / mo",
  "Not sure yet",
];

const services = [
  "Brand Strategy",
  "SEO",
  "Paid Media",
  "Social & Content",
  "Web & Dev",
  "Creative & Video",
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [picked, setPicked] = useState<string[]>([]);

  function toggleService(s: string) {
    setPicked((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.email || !data.message) {
      setError("Please fill in your name, email, and a short message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      setError("That email doesn't look right — mind double-checking?");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, services: picked }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setPicked([]);
    } catch {
      setStatus("error");
      setError("Something went wrong on our end. Please email us directly.");
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-white md:py-32"
    >
      <div className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,#000,transparent_80%)]" />
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cobalt/25 blur-[120px]" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow mb-4 flex items-center gap-2 text-lime">
            <span className="inline-block h-px w-6 bg-lime/50" aria-hidden />
            Let&apos;s talk
          </p>
          <h2 className="display text-[clamp(2.25rem,4.6vw,3.5rem)] text-white">
            Let&apos;s build your growth engine
          </h2>
          <p className="mt-5 max-w-md text-white/60">
            Tell us where you want to go. We&apos;ll send back an honest read on
            the opportunity — and a plan to get there. No pitch decks, no
            pressure.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <ContactRow icon={Mail} href={`mailto:${site.email}`} label={site.email} />
            <ContactRow
              icon={Phone}
              href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              label={site.phone}
            />
            <ContactRow icon={MapPin} label={site.address} />
          </div>

          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime text-ink">
              <Check className="size-4" />
            </span>
            <p className="text-sm text-white/70">
              We reply to every inquiry within one business day.
            </p>
          </div>
        </div>

        {/* form card */}
        <div className="rounded-3xl border border-white/10 bg-white p-6 text-ink md:p-8">
          {status === "success" ? (
            <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
              <span className="grid size-14 place-items-center rounded-full bg-cobalt text-white">
                <Check className="size-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">
                Thanks — message received.
              </h3>
              <p className="mt-2 max-w-sm text-muted">
                A strategist will be in touch within one business day. In the
                meantime, keep an eye on your inbox.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-cobalt hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Jordan Rivera" required />
                <Field
                  label="Work email"
                  name="email"
                  type="email"
                  placeholder="jordan@company.com"
                  required
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Company" name="company" placeholder="Company Inc." />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="budget" className="text-sm font-medium text-ink">
                    Monthly budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    defaultValue=""
                    className="h-11 rounded-xl border border-hairline bg-canvas px-3 text-sm text-ink outline-none transition-colors focus:border-cobalt"
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-medium text-ink">
                  What do you need help with?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => {
                    const active = picked.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleService(s)}
                        aria-pressed={active}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                          active
                            ? "border-cobalt bg-cobalt text-white"
                            : "border-hairline text-muted hover:border-ink/30 hover:text-ink",
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-ink">
                  What are you trying to achieve?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="We're a Series A SaaS doing $4M ARR and want to..."
                  className="resize-none rounded-xl border border-hairline bg-canvas px-3.5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-light focus:border-cobalt"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cobalt px-6 font-medium text-white transition-all hover:bg-cobalt-strong disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Get my free growth audit
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted">
                By submitting, you agree to be contacted about your inquiry. We
                never share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
}: {
  icon: typeof Mail;
  label: string;
  href?: string;
}) {
  const content = (
    <span className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-lime">
        <Icon className="size-4" />
      </span>
      <span className="text-sm text-white/80">{label}</span>
    </span>
  );
  return href ? (
    <a href={href} className="w-fit transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    <div className="w-fit">{content}</div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-cobalt"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 rounded-xl border border-hairline bg-canvas px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-light focus:border-cobalt"
      />
    </div>
  );
}
