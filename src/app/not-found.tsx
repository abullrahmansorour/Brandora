import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000,transparent_75%)]" />
      <div className="container-x relative text-center">
        <p className="figure text-cobalt">404</p>
        <h1 className="mt-3 display text-[clamp(2.25rem,6vw,4rem)] text-ink">
          This page didn&apos;t convert
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&apos;re looking for moved or never existed. Let&apos;s get
          you back to something that performs.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg" withArrow>
            Back to home
          </Button>
          <Button href="/#contact" size="lg" variant="outline">
            Talk to us
          </Button>
        </div>
      </div>
    </section>
  );
}
