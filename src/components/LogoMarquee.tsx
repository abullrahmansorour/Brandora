const clients = [
  "Lumen Health",
  "Northbeam",
  "Cadence",
  "Fernwood",
  "Arc Robotics",
  "Vela",
  "Meridian",
  "Bloomwell",
  "Quantic",
  "Atlas Foods",
];

export function LogoMarquee() {
  return (
    <section aria-label="Brands we work with" className="border-y border-hairline bg-surface py-10">
      <div className="container-x">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted">
          Trusted by 210+ teams scaling online
        </p>
      </div>
      <div className="marquee-group relative mt-7 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            aria-hidden={dup === 1}
            className="animate-marquee flex shrink-0 items-center gap-12 pr-12"
          >
            {clients.map((name) => (
              <li
                key={name}
                className="font-display text-xl font-bold whitespace-nowrap text-muted/55 transition-colors hover:text-ink md:text-2xl"
              >
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
