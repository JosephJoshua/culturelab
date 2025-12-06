import { MapPin, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCalendarButton } from "@/components/AddToCalendarButton";
import { RegistrationPanel } from "@/components/RegistrationPanel";
import { SectionHeading } from "@/components/SectionHeading";
import { events, getEventBySlug } from "@/data/site-data";
import { formatDateTime, formatPrice } from "@/lib/formatters";

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const tagsCombined = event.tags.join(" · ");
  const materialsPublic =
    // @ts-expect-error optional field on Event
    event.materialsPublic === true || event.priceCNY === 0;
  const seatsLeft =
    event.capacity && event.registeredCount !== undefined
      ? Math.max(event.capacity - event.registeredCount, 0)
      : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <SectionHeading
          title={event.title}
          description={event.shortDescription}
        />
        <div className="flex flex-wrap items-center gap-2 text-sm text-sand/75">
          <span className="rounded-full border border-white/10 px-3 py-1">
            {formatDateTime(event.dateTime)}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {formatPrice(event.priceCNY)}
          </span>
        </div>
        <div className="flex flex-col gap-3 text-xs text-sand/70 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="inline-flex min-h-[36px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
            <MapPin size={12} />
            <span className="text-sand/80">{event.location}</span>
          </span>
          <span className="inline-flex min-h-[36px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
            <Tag size={12} />
            <span className="text-sand/80">
              {[event.format, tagsCombined].filter(Boolean).join(" · ")}
            </span>
          </span>
          <span className="inline-flex min-h-[30px] items-center rounded-full border border-white/12 px-3 py-1 text-xs">
            {event.isOnline ? "线上" : "线下"}
          </span>
          {materialsPublic ? (
            <span className="inline-flex min-h-[30px] items-center rounded-full border border-emerald-200/30 bg-emerald-200/10 px-3 py-1 text-[11px] text-emerald-100">
              材料公开
            </span>
          ) : null}
          {seatsLeft !== null ? (
            <span className="inline-flex min-h-[30px] items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] text-sand/75">
              {seatsLeft <= 4 ? "名额紧张" : "名额充足"} ·{" "}
              {event.registeredCount ?? 0}/{event.capacity}
            </span>
          ) : null}
          <AddToCalendarButton
            event={event}
            label="添加到日历"
            className="min-h-[30px] text-[11px] px-3 py-1"
          />
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#0e1525]/70 p-5 text-sand/80">
          {event.longDescription.split("\\n\\n").map((paragraph) => (
            <p key={paragraph.slice(0, 18)} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#0f1829]/80 p-4">
            <h3 className="text-lg font-semibold text-sand">嘉宾 · 形式</h3>
            <ul className="mt-3 space-y-2 text-sm text-sand/75">
              {event.guests ? (
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                  <span>嘉宾：{event.guests.join("，")}</span>
                </li>
              ) : null}
              {event.format ? (
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <span>形式：{event.format}</span>
                </li>
              ) : null}
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                <span>
                  公开材料：
                  {event.materialsPublic ? "录音/笔记将公开" : "报名者可获取"}
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0f182a]/80 p-4">
            <h3 className="text-lg font-semibold text-sand">
              收获 / Takeaways
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-sand/75">
              {(
                event.takeaways ?? [
                  "讨论提纲与共读笔记",
                  "活动微信群，后续信息同步",
                  "延伸书单与资料",
                ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#0d1423]/80 p-4">
            <h3 className="text-lg font-semibold text-sand">
              适合谁 / Who this is for
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-sand/75">
              {(
                event.audience ?? [
                  "想练习慢阅读的人",
                  "热爱跨文化对话的同学",
                  "寻找小范围深度交流的朋友",
                ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0f182a]/80 p-4">
            <h3 className="text-lg font-semibold text-sand">标签 Tags</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-sand/70">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link
          href="/events"
          className="text-sm text-cyan-200 transition hover:text-amber-200"
        >
          ← 返回活动列表
        </Link>
      </div>
      <div>
        <RegistrationPanel event={event} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}
