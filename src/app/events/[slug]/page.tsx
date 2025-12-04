import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <SectionHeading
          title={event.title}
          description={event.shortDescription}
        />
        <div className="flex flex-wrap items-center gap-3 text-sm text-sand/70">
          <span className="rounded-full border border-white/10 px-3 py-1">
            {formatDateTime(event.dateTime)}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {event.location}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {event.isOnline ? "线上" : "线下"}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {formatPrice(event.priceCNY)}
          </span>
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#0e1525]/70 p-5 text-sand/80">
          {event.longDescription.split("\\n\\n").map((paragraph) => (
            <p key={paragraph.slice(0, 18)}>{paragraph}</p>
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
              你会收获 / Takeaways
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
            <h3 className="text-lg font-semibold text-sand">
              你会收获 / Takeaways
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
        <div className="flex flex-wrap gap-2 text-xs text-sand/70">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2 py-1"
            >
              {tag}
            </span>
          ))}
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
