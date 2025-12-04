import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { getBlogPostBySlug, getEventBySlug } from "@/data/site-data";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();
  const relatedEvent = post.relatedEventSlug
    ? getEventBySlug(post.relatedEventSlug)
    : null;

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <SectionHeading title={post.title} description={post.excerpt} />
      <div className="flex flex-wrap items-center gap-3 text-sm text-sand/70">
        <span className="rounded-full border border-white/10 px-3 py-1">
          {post.date}
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      {relatedEvent ? (
        <div className="rounded-2xl border border-cyan-200/40 bg-cyan-200/10 p-4 text-sm text-sand">
          这篇文章是活动{" "}
          <Link
            href={`/events/${post.relatedEventSlug}`}
            className="underline decoration-amber-200"
          >
            “{relatedEvent.title}”
          </Link>{" "}
          的回顾
        </div>
      ) : null}
      <div className="prose-dark space-y-4">
        {post.content.split("\\n\\n").map((paragraph) => (
          <p key={paragraph.slice(0, 18)}>{paragraph}</p>
        ))}
      </div>
      <Link href="/blog" className="text-sm text-cyan-200 hover:text-amber-200">
        ← 返回文章列表
      </Link>
    </article>
  );
}
