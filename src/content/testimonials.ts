export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Brandora is the first agency that talked about revenue before they talked about themselves. Nine months in, organic is our biggest growth channel and our CAC is down 40%.",
    author: "Dr. Priya Anand",
    role: "Co-founder & CEO",
    company: "Lumen Health",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Every budget increase used to hurt our performance. Now scaling actually makes us more efficient. Their creative system completely changed the math of our paid social.",
    author: "Marcus Lee",
    role: "VP Growth",
    company: "Northbeam Outdoors",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The rebrand and new site paid for themselves in a quarter. Prospects show up to sales calls already understanding — and wanting — what we do.",
    author: "Elena Vasquez",
    role: "Chief Marketing Officer",
    company: "Cadence",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "We went from a local secret to a brand people travel for. Brandora found the story we'd been telling badly and told it brilliantly, everywhere.",
    author: "Tom Brennan",
    role: "Founder",
    company: "Fernwood Coffee",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "What sets them apart is the rigor. Every recommendation comes with a forecast and a reason. It feels less like hiring an agency and more like adding a growth team.",
    author: "Sofia Reyes",
    role: "Head of Marketing",
    company: "Arc Robotics",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
];
