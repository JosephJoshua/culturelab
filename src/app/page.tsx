import { BookOpen, Lightbulb, Mic } from "lucide-react";
import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HeroVisual } from "@/components/HeroVisual";
import { NewsletterForm } from "@/components/Newsletter";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialGrid } from "@/components/TestimonialGrid";
import { SalonNotes } from "@/components/SalonNotes";
import { Timeline } from "@/components/Timeline";
import {
  blogPosts,
  events,
  focusList,
  getUpcomingEvents,
  homepageStory,
  membershipTiers,
  partners,
  timelineItems,
} from "@/data/site-data";

import { ClientFirefly } from "@/components/ClientFirefly";

export default function Home() {
  const upcomingSource = getUpcomingEvents();
  const upcoming = (upcomingSource.length ? upcomingSource : events).slice(
    0,
    3,
  );
  const latestPosts = blogPosts.slice(0, 3);
  const featuredEvent = upcoming[0];
  const tierTaglines: Record<string, string> = {
    "tier-explorer": "想先体验、偶尔来线下的伙伴",
    "tier-creator": "想频繁参与、共创工作坊的主力",
    "tier-patron": "支持与共建社区的核心朋友",
  };
  const anchorIds = [
    "hero",
    "events",
    "story",
    "notes",
    "blog",
    "members",
    "timeline",
    "voices",
    "footer",
  ];

  return (
    <div className="space-y-24 sm:space-y-28">
      <ClientFirefly anchorIds={anchorIds} featuredEvent={featuredEvent} />
      <section
        id="hero"
        className="grid items-center gap-12 lg:grid-cols-[1.1fr_1.1fr]"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/2 via-white/1 to-transparent p-6">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-amber-300/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-6 top-6 h-32 w-32 rounded-full bg-cyan-300/12 blur-3xl" />
          <p className="text-xs uppercase tracking-[0.32em] text-amber-200">
            Reading · Culture · Community
          </p>
          <h1 className="firefly-parallax-strong text-balance font-display text-4xl leading-[1.05] text-sand sm:text-5xl lg:text-6xl mt-6">
            Curated salons on literature · culture · philosophy.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-sand/82 mt-8">
            每期邀请嘉宾围绕一个具体话题，用提纲共创、小范围深聊和开放问答的形式展开。你能现场提问，活动录音与笔记也会公开，让对话继续发酵。
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
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
          {featuredEvent ? (
            <Link
              href={`/events/${featuredEvent.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200/70 hover:bg-amber-300/20 mt-4"
            >
              下一场：{featuredEvent.title}
              <span aria-hidden>→</span>
            </Link>
          ) : null}
        </div>
        <div className="w-full">
          <HeroVisual featuredEvent={featuredEvent} />
        </div>
      </section>

      <section id="events" className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Upcoming · 即将举办"
            title="Explore upcoming events."
            subtitle="即将举办"
            description="每一场活动都设计了清晰的节奏、提纲与后续跟进方式。"
          />
          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm font-semibold text-amber-200 hover:text-amber-100"
          >
            查看全部活动 →
          </Link>
        </div>
        <div className="relative">
          <div className="grid auto-cols-[minmax(320px,90vw)] grid-flow-col gap-4 overflow-x-auto pb-2 pr-12 snap-x snap-mandatory sm:auto-cols-[minmax(480px,1fr)] sm:grid-flow-row sm:grid-cols-[repeat(auto-fit,minmax(480px,1fr))] sm:overflow-x-auto sm:pr-0">
            {upcoming.map((event) => (
              <div key={event.id} className="snap-start sm:snap-none">
                <EventCard event={event} />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0d1322] via-[#0d1322]/85 to-transparent sm:hidden" />
        </div>
      </section>

      <section
        id="story"
        className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start"
      >
        <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e1729]/85 via-[#0c1424]/88 to-[#0a1020]/85 p-8 shadow-[0_22px_70px_-34px_rgba(0,0,0,0.65)]">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-300/60 via-cyan-300/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_20%_20%,rgba(242,166,90,0.1),transparent_38%),radial-gradient(circle_at_82%_24%,rgba(88,192,201,0.14),transparent_42%)]" />
          <div className="relative space-y-5">
            <SectionHeading
              title="Why CultureLab exists."
              subtitle="我们在做什么"
            />
            <div className="space-y-4 text-lg leading-9 text-sand/84">
              {homepageStory.map((paragraph, idx) => {
                const icons = [
                  <Lightbulb key="light" size={18} />,
                  <BookOpen key="book" size={18} />,
                  <Mic key="mic" size={18} />,
                ];
                return (
                  <p
                    key={paragraph.slice(0, 12)}
                    className="text-balance border-l border-amber-300/30 pl-4"
                  >
                    <span className="mr-2 inline-flex items-center text-base text-amber-200">
                      {icons[idx % icons.length]}
                    </span>
                    {paragraph}
                  </p>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {["慢读书会", "跨文化对谈", "小范围深聊"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/12 bg-white/3 px-3 py-2 text-sm text-sand/85 backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col space-y-4 rounded-3xl border border-white/10 bg-[#0e1627]/85 p-7 shadow-[0_22px_70px_-34px_rgba(0,0,0,0.65)]">
          <div className="flex items-start justify-between">
            <h3 className="font-display text-2xl text-sand">我们的方法</h3>
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100">
              Craft
            </span>
          </div>
          <ul className="space-y-3 text-sand/80">
            {focusList.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-amber-300 to-cyan-300"
                  aria-hidden
                />
                <span className="leading-7">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid grid-cols-2 gap-3 text-sm text-sand/70">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-200">
                录音/笔记公开
              </p>
              <p className="mt-1 leading-6">
                每场活动都会整理公开材料，便于延伸讨论。
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/3 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-200">
                主题提纲
              </p>
              <p className="mt-1 leading-6">
                现场共创提纲，嘉宾与参与者一起构建问题框架。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="notes" className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Salon Notes · 活动摘要"
            title="Read distilled salon summaries."
            subtitle="笔记与提炼"
            description="每场沙龙的提问、对立观点与开放问题都会整理成可分享的“Salon Notes”。"
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-amber-200 hover:text-amber-100"
          >
            查看更多回顾 →
          </Link>
        </div>
        <SalonNotes />
      </section>

      <section id="blog" className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Latest · 最新文章"
            title="Read the latest posts."
            subtitle="最新文章"
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-amber-200 hover:text-amber-100"
          >
            浏览全部文章 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section id="members" className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Membership · 会员计划"
            title="Go deeper with membership."
            subtitle="会员计划"
            description="支持社区，获得稳定的席位与更深的讨论。"
          />
          <Link
            href="/members"
            className="inline-flex items-center gap-1 text-sm font-semibold text-amber-200 hover:text-amber-100"
          >
            查看全部会员权益 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {membershipTiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex h-full flex-col rounded-2xl border ${
                tier.highlight
                  ? "border-amber-300/50 bg-amber-300/10 shadow-[0_18px_60px_-30px_rgba(242,166,90,0.55)]"
                  : "border-white/10 bg-[#0f182b]/70 shadow-[0_18px_60px_-34px_rgba(0,0,0,0.65)]"
              } p-5`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-amber-200">
                    {tier.highlight ? "推荐" : "会员"}
                  </p>
                  <h3 className="text-xl font-semibold text-sand">
                    {tier.nameEn} · {tier.nameZh}
                  </h3>
                  <p className="text-xs text-sand/65">
                    {tierTaglines[tier.id] ?? "加入共建慢读社群"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-lg font-semibold text-amber-200">
                    ¥{tier.pricePerMonthCNY}/月
                  </p>
                  {tier.highlight ? (
                    <span className="rounded-full border border-amber-200/50 bg-amber-200/15 px-2 py-0.5 text-[11px] text-amber-50">
                      试用 7 天
                    </span>
                  ) : null}
                </div>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-sand/80">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <Link
                  href="/members"
                  className="inline-flex w-full items-center justify-center rounded-full bg-amber-400/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  成为会员
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f182b]/80 via-[#0f182b]/80 to-[#0c1322]/80 p-7 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.28em] text-amber-200">
              Stay in the loop · 保持联系
            </p>
            <h3 className="font-display text-2xl text-sand">
              订阅，优先收到活动与长文
            </h3>
            <p className="text-sm text-sand/70">
              留下邮箱或微信号，我们会在有新活动、开放报名或发布长文时第一时间通知你。
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-2 text-sm text-sand/70">
            <span>无垃圾邮件，可随时退订</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sand/80">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              最近发送：本周
            </span>
          </div>
        </div>
        <NewsletterForm />
      </section>

      <section id="voices" className="space-y-6">
        <SectionHeading
          eyebrow="Voices · 社群的声音"
          title="Hear from the community."
          subtitle="社群的声音"
        />
        <TestimonialGrid />
      </section>

      <section id="timeline" className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Timeline · 历程"
            title="Follow our salons over time."
            subtitle="活动时间轴"
            description="全部场次、照片与回顾链接横向展开，更直观地感受活跃度。"
          />
          <span className="text-sm text-sand/70">
            {timelineItems.length} 场已发布 · 不断更新
          </span>
        </div>
        <Timeline />
      </section>

      <section id="footer" className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Moments · 活动瞬间"
            title="Moments from our salons."
            subtitle="活动瞬间"
          />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1 text-sm font-semibold text-amber-200 hover:text-amber-100"
          >
            查看全部瞬间 →
          </Link>
        </div>
        <GalleryGrid />
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-[#0d1526]/80 p-6 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)]">
        <SectionHeading
          eyebrow="Partners · 合作伙伴"
          title="Partners and collaborators."
          subtitle="合作伙伴"
          description="与我们一起策划阅读实验与跨文化对话。"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {partners.map((partner) => (
            <Link
              key={partner.id}
              href={partner.url}
              className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-sand/80 transition hover:border-amber-300/60 hover:bg-white/8 hover:text-amber-100"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-sand group-hover:text-amber-100">
                  {partner.name}
                </span>
                <span className="text-xs text-amber-200">了解更多 →</span>
              </div>
              {partner.blurb ? (
                <p className="text-sand/70">{partner.blurb}</p>
              ) : null}
            </Link>
          ))}
        </div>
        <div className="rounded-2xl border border-cyan-200/30 bg-cyan-200/10 p-4 text-sm text-sand">
          <p className="text-base font-semibold text-sand">
            提案合作 / Propose a collaboration
          </p>
          <p className="mt-1 text-sand/80">
            写信至{" "}
            <a className="text-amber-200" href="mailto:hello@culturelab.cn">
              hello@culturelab.cn
            </a>{" "}
            或添加微信：culturelab。一起策划下一场沙龙、对谈或共读。
          </p>
        </div>
      </section>
    </div>
  );
}
