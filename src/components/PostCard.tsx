import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/content/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(12,19,34,0.22)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-canvas/90 px-3 py-1 text-xs font-medium text-cobalt backdrop-blur-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-cobalt text-balance">
          {post.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-2.5 border-t border-hairline pt-4">
          <Image
            src={post.author.avatar}
            alt={`Portrait of ${post.author.name}`}
            width={28}
            height={28}
            className="size-7 rounded-full object-cover"
          />
          <span className="text-xs text-ink/70">{post.author.name}</span>
        </div>
      </div>
    </Link>
  );
}
