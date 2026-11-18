const authors = {
  maya: {
    name: "Maya Okonkwo",
    role: "Head of Growth Strategy",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
  },
  daniel: {
    name: "Daniel Park",
    role: "Director of Paid Media",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  ria: {
    name: "Ria Castellano",
    role: "Creative Director",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
};

export const posts = [
  {
    slug: "marketing-that-compounds",
    title: "Marketing that compounds: why owned channels beat rented ones",
    excerpt:
      "Paid media buys attention you stop receiving the moment you stop paying. Here's how to build growth that keeps working after the invoice clears.",
    category: "Strategy",
    date: "2026-05-28",
    readingTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Marketing analytics charts displayed on a laptop screen",
    author: authors.maya,
    body: [
      {
        type: "p",
        text: "Every marketing channel falls into one of two buckets: ones you rent, and ones you own. The difference between them is the difference between a treadmill and a flywheel.",
      },
      {
        type: "p",
        text: "Rented channels — paid search, paid social, programmatic — are fast, measurable, and addictive. But the moment you stop paying, the traffic stops. You're renting attention, and the rent never goes down.",
      },
      { type: "h2", text: "The compounding alternative" },
      {
        type: "p",
        text: "Owned channels behave differently. A piece of content that ranks keeps earning traffic for years. An email list grows more valuable with every send. A brand people trust lowers the cost of every other channel you run.",
      },
      {
        type: "ul",
        items: [
          "SEO and content: traffic that compounds as your authority grows",
          "Email and community: an audience you can reach for free, on demand",
          "Brand: lower CAC across every paid channel you touch",
        ],
      },
      {
        type: "quote",
        text: "The best time to invest in owned channels was three years ago. The second best time is this quarter's budget.",
      },
      { type: "h2", text: "How to balance the two" },
      {
        type: "p",
        text: "This isn't an argument against paid media — it's an argument for using paid to fund owned. Use rented channels to find what resonates fast, then pour that learning into assets you keep. Over time, your owned channels carry more of the load, your blended CAC drops, and growth stops feeling like a treadmill.",
      },
    ],
  },
  {
    slug: "creative-testing-framework",
    title: "The creative testing framework that broke our clients' ad fatigue",
    excerpt:
      "Creative is now the biggest lever in paid media. Here's the exact system we use to ship dozens of tested concepts a month — and scale the winners.",
    category: "Paid Media",
    date: "2026-05-12",
    readingTime: "8 min read",
    cover:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Creative team reviewing video and design work on a monitor",
    author: authors.daniel,
    body: [
      {
        type: "p",
        text: "On modern ad platforms, the algorithm does most of the targeting. That means your creative is no longer just the message — it's the targeting, the bid strategy, and the single biggest driver of performance.",
      },
      {
        type: "p",
        text: "Which is exactly why creative fatigue is so dangerous. When your best ad burns out and you don't have a tested replacement ready, performance falls off a cliff. The fix isn't more budget — it's a system.",
      },
      { type: "h2", text: "Separate concepts from variations" },
      {
        type: "p",
        text: "Most teams confuse testing colors and headlines with testing ideas. We split the two. Concepts are big swings — a new angle, hook, or format. Variations are small tweaks to a proven concept. You explore with concepts and exploit with variations.",
      },
      { type: "h2", text: "The monthly cadence" },
      {
        type: "ul",
        items: [
          "Ship 4–6 new concepts every month at low spend to find signal",
          "Promote winners into structured variation tests",
          "Scale only what clears your efficiency bar — kill the rest fast",
          "Repurpose top performers into organic to compound reach",
        ],
      },
      {
        type: "quote",
        text: "You don't beat ad fatigue by spending more. You beat it by never running out of tested ideas.",
      },
      {
        type: "p",
        text: "Run this loop consistently and scaling stops being scary. Instead of every budget increase hurting performance, you always have a bench of proven creative ready to absorb more spend profitably.",
      },
    ],
  },
  {
    slug: "seo-in-the-age-of-ai-search",
    title: "SEO in the age of AI search: what actually changed",
    excerpt:
      "AI answers are reshaping search, but the fundamentals are more important than ever. Here's where to focus as the results page evolves.",
    category: "SEO",
    date: "2026-04-22",
    readingTime: "7 min read",
    cover:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Person typing a search query on a laptop",
    author: authors.maya,
    body: [
      {
        type: "p",
        text: "Every few years someone declares SEO dead. AI-generated answers are the latest headline. But look closely and the picture is more interesting: the mechanics are shifting, the fundamentals are not.",
      },
      { type: "h2", text: "What changed" },
      {
        type: "p",
        text: "AI answer engines summarize the web, which means more searches end without a click. The winners are the sources those engines cite — and they cite the same things they always rewarded: clear, trustworthy, well-structured content from credible brands.",
      },
      { type: "h2", text: "Where to focus now" },
      {
        type: "ul",
        items: [
          "Build genuine topical authority, not scattered keyword pages",
          "Earn citations and mentions — they're the new backlinks",
          "Structure content so machines can quote it cleanly",
          "Invest in brand: people and engines trust names they recognize",
        ],
      },
      {
        type: "quote",
        text: "AI didn't kill SEO. It raised the bar for who deserves to be the answer.",
      },
      {
        type: "p",
        text: "The brands that win the next era of search are the ones building real authority today. That work compounds — and it's far harder for a competitor to copy than a clever keyword tactic.",
      },
    ],
  },
  {
    slug: "brand-is-a-growth-lever",
    title: "Brand isn't fluffy — it's your cheapest growth lever",
    excerpt:
      "Performance marketers love to dismiss brand as unmeasurable. The data says it quietly determines the cost of everything else you do.",
    category: "Brand",
    date: "2026-04-03",
    readingTime: "5 min read",
    cover:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Team collaborating on brand strategy around a table",
    author: authors.ria,
    body: [
      {
        type: "p",
        text: "In performance-driven teams, brand is often the first budget cut and the last one restored. It feels unmeasurable next to a tidy ROAS number. That instinct is costing those teams more than they realize.",
      },
      { type: "h2", text: "Brand shows up in the math" },
      {
        type: "p",
        text: "A strong brand raises click-through rates, improves conversion, and lifts the quality scores that decide what you pay per click. People buy from names they trust — and they decide faster. That all flows straight into your CAC.",
      },
      {
        type: "quote",
        text: "Brand is the multiplier on every performance dollar you spend. Ignore it and you're paying a tax on every channel.",
      },
      { type: "h2", text: "Make it measurable" },
      {
        type: "ul",
        items: [
          "Track branded search volume over time",
          "Watch direct traffic and return-visitor conversion",
          "Run brand-lift studies on major campaigns",
          "Compare CAC before and after brand investment",
        ],
      },
      {
        type: "p",
        text: "You don't have to choose between brand and performance. The smartest growth teams treat brand as the foundation that makes performance cheaper — and they measure it accordingly.",
      },
    ],
  },
  {
    slug: "landing-pages-that-convert",
    title: "Anatomy of a landing page that converts at 2x the average",
    excerpt:
      "Most landing pages leak revenue in predictable places. Here's the structure we use to turn paid traffic into customers, not bounces.",
    category: "Conversion",
    date: "2026-03-18",
    readingTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Designer working on a website layout at a desk",
    author: authors.ria,
    body: [
      {
        type: "p",
        text: "You can have the best ads in your category and still lose, because the page they point to does the convincing. A landing page is where attention either becomes revenue or evaporates.",
      },
      { type: "h2", text: "Lead with the outcome" },
      {
        type: "p",
        text: "Visitors decide in seconds whether you're worth their time. Your headline should name the outcome they want, not the feature you built. Specific beats clever every time.",
      },
      { type: "h2", text: "The structure we reach for" },
      {
        type: "ul",
        items: [
          "A headline about the visitor's outcome, not your product",
          "Proof early — logos, numbers, and real results",
          "One primary action, repeated as the page earns it",
          "Objection handling exactly where doubt creeps in",
        ],
      },
      {
        type: "quote",
        text: "Every extra choice on a landing page is a chance for the visitor to choose nothing.",
      },
      {
        type: "p",
        text: "Strip away anything that doesn't move someone toward the one action you want. Then test relentlessly. Small, disciplined improvements to the page often beat any amount of extra ad spend.",
      },
    ],
  },
];
