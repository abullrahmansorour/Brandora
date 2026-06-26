import type { Metadata } from "next";
import { posts } from "@/content/posts";
import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog — Growth tactics & marketing insights",
  description:
    "Tactics, frameworks, and contrarian takes on SEO, paid media, brand, and conversion from the Brandora team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Brandora Blog"
        title="Ideas worth stealing"
        description="The same thinking we bring to client growth — on SEO, paid media, brand, and conversion. No fluff, no recycled listicles."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {posts.map((post) => (
              <RevealItem key={post.slug} className="h-full">
                <PostCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-16 flex flex-col items-center gap-5 rounded-3xl border border-hairline bg-tint px-6 py-12 text-center">
            <h2 className="display text-2xl text-ink md:text-3xl">
              Want this thinking applied to your growth?
            </h2>
            <p className="max-w-md text-muted">
              Skip the reading and put a senior team to work on your numbers.
            </p>
            <Button href="/#contact" size="lg" withArrow>
              Get a free growth audit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
