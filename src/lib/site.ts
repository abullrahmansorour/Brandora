export const site = {
  name: "Brandora",
  domain: "brandora.agency",
  url: "https://brandora.agency",
  tagline: "Growth you can measure.",
  description:
    "Brandora is a results-driven marketing agency that helps startups and established brands scale online through strategy, SEO, paid media, and creative that performs.",
  email: "hello@brandora.agency",
  phone: "+1 (415) 555-0142",
  address: "548 Market St, San Francisco, CA 94104",
  social: {
    linkedin: "https://www.linkedin.com/company/brandora",
    instagram: "https://www.instagram.com/brandora",
    x: "https://x.com/brandora",
    dribbble: "https://dribbble.com/brandora",
  },
} as const;

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
] as const;
