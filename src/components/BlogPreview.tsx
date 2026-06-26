import { posts } from "@/content/posts";
import { SectionHeading } from "./ui/SectionHeading";
import { PostCard } from "./PostCard";
import { Button } from "./ui/Button";
import { RevealGroup, RevealItem } from "./ui/Reveal";

export function BlogPreview() {
  const latest = posts.slice(0, 3);
  return (
    <section id="blog" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Insights"
            title="Ideas worth stealing"
            description="Tactics, frameworks, and contrarian takes from the team — the same thinking we bring to client growth."
          />
          <Button href="/blog" variant="outline" withArrow className="shrink-0">
            Read the blog
          </Button>
        </div>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {latest.map((post) => (
            <RevealItem key={post.slug} className="h-full">
              <PostCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
