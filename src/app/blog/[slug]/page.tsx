import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { posts, getPost, type Block } from "@/content/posts";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
      publishedTime: post.date,
    },
  };
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="my-6 flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink/80">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cobalt" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-4 border-cobalt bg-tint/60 py-5 pl-6 pr-4 font-display text-xl font-medium leading-snug text-ink text-balance">
          “{block.text}”
        </blockquote>
      );
    default:
      return (
        <p className="my-5 text-lg leading-relaxed text-ink/75">{block.text}</p>
      );
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="pt-32 pb-20 md:pt-40">
      <div className="container-x">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          All articles
        </Link>

        <header className="mx-auto mt-8 max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-cobalt">
            <span className="font-medium">{post.category}</span>
            <span className="text-muted-light" aria-hidden>
              ·
            </span>
            <span className="text-muted">{post.readingTime}</span>
          </div>
          <h1 className="mt-4 display text-[clamp(2rem,4.6vw,3.25rem)] text-ink text-balance">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <Image
              src={post.author.avatar}
              alt={`Portrait of ${post.author.name}`}
              width={44}
              height={44}
              className="size-11 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-semibold text-ink">
                {post.author.name}
              </div>
              <div className="text-xs text-muted">
                {post.author.role} · {formatDate(post.date)}
              </div>
            </div>
          </div>
        </header>

        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl border border-hairline">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {post.body.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>

        {/* author + CTA */}
        <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-ink p-8 text-white md:p-10">
          <h2 className="display text-2xl text-white md:text-3xl">
            Put these ideas to work
          </h2>
          <p className="mt-3 max-w-lg text-white/60">
            We turn frameworks like this into measurable growth for brands every
            day. See what that could look like for yours.
          </p>
          <Button href="/#contact" variant="lime" size="lg" withArrow className="mt-6">
            Get a free growth audit
          </Button>
        </div>
      </div>

      {/* more posts */}
      <div className="container-x mt-20">
        <h2 className="mb-8 font-display text-2xl font-bold text-ink">
          Keep reading
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex items-center gap-5 rounded-2xl border border-hairline bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={p.cover}
                  alt={p.coverAlt}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-xs font-medium text-cobalt">
                  {p.category}
                </span>
                <h3 className="mt-1 font-display font-bold leading-snug text-ink transition-colors group-hover:text-cobalt">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
