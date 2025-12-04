import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HeroVisual } from "@/components/HeroVisual";
import { NewsletterForm } from "@/components/Newsletter";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialGrid } from "@/components/TestimonialGrid";
import {
  blogPosts,
  focusList,
  getUpcomingEvents,
  homepageStory,
  membershipTiers,
  partners,
} from "@/data/site-data";

export default function Home() {
  const upcoming = getUpcomingEvents().slice(0, 3);
  const latestPosts = blogPosts.slice(0, 3);
  const featuredTier = membershipTiers.find((tier) => tier.highlight);
  const featuredEvent = upcoming[0];

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_1.1fr]">
        <div className="space-y-8">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-200">
            Reading · Culture · Community
          </p>
          <h1 className="text-balance font-display text-4xl leading-[1.05] text-sand sm:text-5xl lg:text-6xl">
            Curated salons on literature · culture · philosophy.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-sand/82">
            每期邀请嘉宾围绕一个具体话题，用提纲共创、小范围深聊和开放问答的形式展开。你能现场提问，活动录音与笔记也会公开，让对话继续发酵。
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-sand/75">
            <span className="rounded-full border border-white/12 px-3 py-2">
              特邀嘉宾 · 主题深聊 · 12-20 人
            </span>
            <span className="rounded-full border border-white/12 px-3 py-2">
              提纲共创 · 现场问答
            </span>
            <span className="rounded-full border border-white/12 px-3 py-2">
              录音/笔记公开 · 线上/线下
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/events"
              className="rounded-full bg-amber-400/90 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
            >
              查看近期活动
            </Link>
            <Link
              href="/members"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-sand transition hover:border-amber-200/60 hover:text-amber-100"
            >
              了解会员计划
            </Link>
          </div>
        </div>
        <div className="w-full">
          <HeroVisual featuredEvent={featuredEvent} />
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Upcoming · 即将举办"
          title="Upcoming Events · 即将举办"
          description="每一场活动都设计了清晰的节奏、提纲与后续跟进方式。"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 rounded-2xl border border-white/10 bg-[#0d1526]/80 p-6 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)]">
          <SectionHeading title="Why CultureLab exists · 我们在做什么" />
          <div className="space-y-4 text-lg leading-8 text-sand/82">
            {homepageStory.map((paragraph) => (
              <p key={paragraph.slice(0, 12)} className="text-balance">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0e1627]/80 p-6 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)]">
          <h3 className="font-display text-2xl text-sand">我们的方法</h3>
          <ul className="space-y-3 text-sand/80">
            {focusList.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-1 h-2 w-2 rounded-full bg-amber-300"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Latest · 最新文章"
          title="Latest Posts · 最新文章"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f182b]/80 via-[#0f182b]/80 to-[#0c1322]/80 p-6 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.7)]">
          <SectionHeading
            eyebrow="Membership · 会员计划"
            title="For those who want to go deeper."
            description="支持社区，获得稳定的席位与更深的讨论。"
          />
          {featuredTier ? (
            <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 p-4 text-sand shadow-[0_16px_60px_-34px_rgba(242,166,90,0.6)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-amber-200">
                    推荐
                  </p>
                  <h3 className="text-2xl font-semibold">
                    {featuredTier.nameEn} · {featuredTier.nameZh}
                  </h3>
                </div>
                <p className="text-xl font-semibold text-amber-200">
                  ¥{featuredTier.pricePerMonthCNY}/月
                </p>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-sand/80">
                {featuredTier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/members"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-amber-400/90 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                查看会员权益
              </Link>
            </div>
          ) : null}
        </div>
        <div>
          <NewsletterForm />
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Voices · 社群的声音"
          title="Voices from the community · 社群的声音"
        />
        <TestimonialGrid />
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Moments · 活动瞬间"
          title="Moments · 活动瞬间"
        />
        <GalleryGrid />
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0d1526]/80 p-6 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)]">
        <SectionHeading
          eyebrow="Partners · 合作伙伴"
          title="Partners & Collaborators · 合作伙伴"
          description="与我们一起策划阅读实验与跨文化对话。"
        />
        <div className="flex flex-wrap gap-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-sand/80 backdrop-blur transition hover:border-amber-300/60 hover:text-amber-100"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
