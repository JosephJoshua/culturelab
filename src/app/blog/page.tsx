"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";
import { blogPosts } from "@/data/site-data";

export default function BlogPage() {
  const [tag, setTag] = useState<string>("全部");
  const tags = useMemo(
    () => ["全部", ...new Set(blogPosts.flatMap((post) => post.tags))],
    [],
  );

  const filtered = useMemo(() => {
    if (tag === "全部") return blogPosts;
    return blogPosts.filter((post) => post.tags.includes(tag));
  }, [tag]);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Blog · 阅读札记"
        title="Explore the blog."
        subtitle="阅读札记"
        description="公开发布的活动回顾、笔记与播客摘要，方便分享给还没来现场的朋友。"
      />
      <div className="flex flex-wrap gap-3">
        {tags.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTag(item)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              tag === item
                ? "border-amber-300/70 bg-amber-300/10 text-amber-100"
                : "border-white/10 text-sand/80 hover:border-amber-200/40 hover:text-amber-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#0d1423]/80 p-5 text-sm text-sand/70">
        <p>想投稿或合作？请发送邮件或微信给主办方，我们会尽快回复。</p>
        <Link
          href="/events"
          className="mt-2 inline-block text-cyan-200 hover:text-amber-200"
        >
          查看近期活动 →
        </Link>
      </div>
    </div>
  );
}
