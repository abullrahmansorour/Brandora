export type ProcessStep = {
  no: string;
  title: string;
  duration: string;
  description: string;
  outputs: string[];
};

export const process: ProcessStep[] = [
  {
    no: "01",
    title: "Discover",
    duration: "Week 1–2",
    description:
      "We dig into your numbers, your customers, and your market until we understand what's actually driving — and capping — your growth.",
    outputs: ["Growth audit", "Customer & data research", "Opportunity map"],
  },
  {
    no: "02",
    title: "Strategy",
    duration: "Week 2–3",
    description:
      "We turn findings into a prioritized plan with clear channels, targets, and a forecast you can hold us to.",
    outputs: ["Channel strategy", "12-month roadmap", "Growth forecast"],
  },
  {
    no: "03",
    title: "Build",
    duration: "Week 3–6",
    description:
      "Creative, campaigns, pages, and tracking — built fast, built to test, and instrumented so nothing ships blind.",
    outputs: ["Creative & assets", "Campaign setup", "Analytics & tracking"],
  },
  {
    no: "04",
    title: "Launch",
    duration: "Week 6+",
    description:
      "We go live in controlled waves, watch the data daily, and kill what doesn't work before it costs you.",
    outputs: ["Phased rollout", "Daily monitoring", "Rapid iteration"],
  },
  {
    no: "05",
    title: "Scale",
    duration: "Ongoing",
    description:
      "Once we find what works, we pour fuel on it — expanding winning channels and compounding results month over month.",
    outputs: ["Budget scaling", "New channels", "Quarterly business reviews"],
  },
];
