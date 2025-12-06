import Link from "next/link";
import type { BlogPost } from "@/types";

interface Props {
  post: BlogPost;
}

export function PostCard({ post }: Props) {
  return (
    <article className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1728]/70 via-[#0d1525]/70 to-[#0a1020]/70 p-5 backdrop-blur shimmer-card">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.25em] text-sand/60">
          {post.date}
        </p>
        <h3 className="text-lg font-semibold text-sand">{post.title}</h3>
        <p className="text-sm text-sand/70">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 text-xs text-sand/70">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-semibold text-cyan-200 transition group-hover:text-amber-200"
        >
          阅读全文 →
        </Link>
      </div>
    </article>
  );
}
