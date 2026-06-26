export type Metric = {
  value: string;
  label: string;
  spark: number[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  year: string;
  tagline: string;
  summary: string;
  services: string[];
  image: string;
  imageAlt: string;
  accent: "cobalt" | "lime";
  metrics: Metric[];
  challenge: string;
  approach: string[];
  results: string;
  quote: { text: string; author: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "lumen-health",
    client: "Lumen Health",
    industry: "DTC Telehealth",
    year: "2025",
    tagline: "From burning cash on ads to owning organic search.",
    summary:
      "A telehealth startup was acquiring patients at an unsustainable cost. We rebuilt their growth engine around SEO and full-funnel paid media.",
    services: ["SEO & Organic Growth", "Paid Media", "Web Design & Development"],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Healthcare professional reviewing patient data on a tablet",
    accent: "cobalt",
    metrics: [
      { value: "+312%", label: "Organic traffic", spark: [20, 28, 26, 40, 52, 60, 78, 96] },
      { value: "4.2x", label: "Blended ROAS", spark: [12, 18, 22, 30, 38, 50, 62, 71] },
      { value: "−41%", label: "Cost per patient", spark: [80, 72, 66, 55, 48, 40, 33, 28] },
    ],
    challenge:
      "Lumen was scaling on paid search alone, with a cost per acquisition that climbed every month. They had no organic presence, no content moat, and a website that converted under 1.4% of visitors.",
    approach: [
      "Rebuilt site architecture and technical SEO from the ground up, fixing crawl, speed, and indexation issues.",
      "Launched a condition-led content engine targeting high-intent patient questions.",
      "Restructured paid accounts around profitable intent and a continuous creative testing system.",
      "Redesigned key landing pages with a conversion-first layout and clear medical trust signals.",
    ],
    results:
      "Within nine months, organic became Lumen's largest and cheapest acquisition channel. Paid spend was reallocated to its most profitable segments, and the new site more than doubled conversion rate — together cutting cost per patient by 41% while tripling new patient volume.",
    quote: {
      text: "Brandora didn't just lower our CAC — they gave us a channel we actually own. Organic now drives more patients than paid ever did, at a fraction of the cost.",
      author: "Dr. Priya Anand",
      role: "Co-founder & CEO, Lumen Health",
    },
  },
  {
    slug: "northbeam-outdoors",
    client: "Northbeam Outdoors",
    industry: "Ecommerce / Apparel",
    year: "2024",
    tagline: "Scaling an outdoor brand without scaling its ad costs.",
    summary:
      "A fast-growing apparel brand had hit a ceiling on paid social. We rebuilt their creative system and unlocked profitable scale.",
    services: ["Paid Media", "Creative & Video", "Social & Content"],
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Hiker standing on a mountain ridge at sunrise wearing outdoor apparel",
    accent: "lime",
    metrics: [
      { value: "−38%", label: "Cost per acquisition", spark: [70, 64, 58, 50, 44, 38, 33, 30] },
      { value: "+214%", label: "Revenue (12 mo)", spark: [22, 30, 35, 48, 58, 70, 84, 95] },
      { value: "3.9x", label: "Paid social ROAS", spark: [14, 20, 28, 34, 46, 55, 64, 72] },
    ],
    challenge:
      "Northbeam's ad performance plateaued as they scaled. Creative fatigue set in fast, costs crept up, and every budget increase made ROAS worse instead of better.",
    approach: [
      "Built a modular creative system producing 30+ ad variations per month from a single shoot.",
      "Introduced a structured testing framework to find winning hooks before scaling spend.",
      "Expanded into new placements and audiences mapped to the full purchase funnel.",
      "Repurposed top performers into organic social to compound reach for free.",
    ],
    results:
      "The new creative engine broke the fatigue cycle. With a steady stream of fresh, tested ads, Northbeam scaled budget profitably — growing revenue 214% over twelve months while dropping cost per acquisition by 38%.",
    quote: {
      text: "We used to dread scaling because performance always fell apart. Brandora's creative system flipped that — now spending more actually makes us more efficient.",
      author: "Marcus Lee",
      role: "VP Growth, Northbeam Outdoors",
    },
  },
  {
    slug: "cadence-fintech",
    client: "Cadence",
    industry: "B2B SaaS / Fintech",
    year: "2025",
    tagline: "A rebrand and site that turned traffic into pipeline.",
    summary:
      "A fintech platform looked like a startup and converted like one. We repositioned the brand and rebuilt the site around revenue.",
    services: ["Brand Strategy & Identity", "Web Design & Development", "Social & Content"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Financial analytics dashboard displayed on a laptop screen",
    accent: "cobalt",
    metrics: [
      { value: "+68%", label: "Demo conversion", spark: [24, 30, 34, 42, 50, 58, 64, 71] },
      { value: "3.1x", label: "Qualified pipeline", spark: [18, 24, 30, 40, 52, 63, 74, 88] },
      { value: "−29%", label: "Sales cycle length", spark: [78, 70, 64, 58, 50, 44, 38, 34] },
    ],
    challenge:
      "Cadence had a strong product but a brand that undersold it. Enterprise buyers bounced from a confusing site, and sales spent meetings explaining what the company even did.",
    approach: [
      "Repositioned the brand around a single, sharp value proposition for finance teams.",
      "Designed a confident new identity and messaging system from the ground up.",
      "Rebuilt the marketing site with a conversion-first structure and clear proof.",
      "Launched a thought-leadership content program to build category authority.",
    ],
    results:
      "The repositioning gave sales a story buyers understood instantly. The new site lifted demo conversion 68% and tripled qualified pipeline, while clearer messaging shortened the average sales cycle by nearly a third.",
    quote: {
      text: "For the first time, our brand matches the quality of our product. Prospects show up to calls already sold on the vision.",
      author: "Elena Vasquez",
      role: "CMO, Cadence",
    },
  },
  {
    slug: "fernwood-coffee",
    client: "Fernwood Coffee",
    industry: "CPG / Food & Beverage",
    year: "2024",
    tagline: "Taking a regional roaster national, one story at a time.",
    summary:
      "A beloved local coffee roaster wanted to grow DTC nationwide. We built the brand and content engine to make it happen.",
    services: ["Brand Strategy & Identity", "Social & Content", "Creative & Video"],
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Cup of freshly poured coffee on a wooden cafe table",
    accent: "lime",
    metrics: [
      { value: "+540%", label: "DTC revenue", spark: [10, 16, 24, 36, 50, 66, 82, 98] },
      { value: "18M+", label: "Monthly impressions", spark: [12, 22, 30, 44, 55, 68, 80, 92] },
      { value: "2.4x", label: "Repeat purchase rate", spark: [20, 28, 34, 44, 52, 60, 68, 74] },
    ],
    challenge:
      "Fernwood had a loyal local following but no national presence. Their packaging, website, and social all told a different story — and none of them traveled beyond the city.",
    approach: [
      "Unified the brand into one warm, distinctive identity across packaging and digital.",
      "Built an always-on short-form content engine around the people and craft behind the coffee.",
      "Produced a library of brand and product films for paid and organic use.",
      "Launched a subscription offer designed to turn first orders into habits.",
    ],
    results:
      "Storytelling did the heavy lifting. Consistent, character-rich content grew Fernwood to 18M monthly impressions and a national audience — driving a 540% increase in direct-to-consumer revenue and more than doubling repeat purchases.",
    quote: {
      text: "Brandora got what made us special and put it in front of the whole country. We went from a local secret to a brand people travel for.",
      author: "Tom Brennan",
      role: "Founder, Fernwood Coffee",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
