"use client";

import Link from "next/link";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionHeading } from "@/components/SectionHeading";

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Moments · 活动瞬间"
        title="Explore our moments."
        subtitle="活动瞬间"
        description="现场氛围、共读笔记、小组讨论的片段集合。"
      />
      <GalleryGrid />
      <div className="rounded-2xl border border-white/10 bg-[#0d1423]/80 p-5 text-sm text-sand/75">
        <p>想查看更多回顾与笔记？前往博客或活动回顾文章。</p>
        <div className="mt-2 flex gap-3">
          <Link
            href="/blog"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-amber-100 transition hover:border-amber-200/50"
          >
            浏览文章
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-amber-100 transition hover:border-amber-200/50"
          >
            查看活动
          </Link>
        </div>
      </div>
    </div>
  );
}
