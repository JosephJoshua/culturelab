import { MapPin, Tag } from "lucide-react";
import Link from "next/link";
import { formatDateTime, formatPrice } from "@/lib/formatters";
import type { Event } from "@/types";

interface Props {
  event: Event;
  muted?: boolean;
}

export function EventCard({ event, muted }: Props) {
  const available =
    event.capacity === undefined || event.registeredCount === undefined
      ? true
      : event.registeredCount < event.capacity;

  const seatsLeft =
    event.capacity && event.registeredCount !== undefined
      ? Math.max(event.capacity - event.registeredCount, 0)
      : null;
  const materialsPublic =
    // @ts-expect-error optional field on Event
    event.materialsPublic === true || event.priceCNY === 0;

  return (
    <div
      className={`group relative flex h-full min-w-[480px] flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#101827]/70 via-[#0e1728]/70 to-[#0b1220]/70 p-5 backdrop-blur shimmer-card ${
        muted ? "opacity-70" : ""
      }`}
    >
      <div className="absolute inset-px rounded-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(242,166,90,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(88,192,201,0.12),transparent_30%)]" />
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-sand/70 pr-4">
          <span
            className={`rounded-full px-3 py-1 ${
              event.isOnline
                ? "border border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                : "border border-amber-300/40 bg-amber-300/10 text-amber-100"
            }`}
          >
            {event.isOnline ? "线上" : "线下"}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-200">
              {formatDateTime(event.dateTime)}
            </span>
            {!available ? (
              <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[11px] text-amber-100">
                候补中
              </span>
            ) : null}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-sand">{event.title}</h3>
        <p className="text-sm text-sand/70">{event.shortDescription}</p>
        {event.guests ? (
          <div className="flex w-full flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-sand/75">
            <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-amber-200">
              嘉宾
            </span>
            <span>{event.guests.join("，")}</span>
          </div>
        ) : null}
        <div className="flex flex-col gap-2 text-xs text-sand/70">
          <div className="inline-flex min-h-[36px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
            <MapPin size={12} />
            <span className="text-sand/80">{event.location}</span>
          </div>
          <div className="inline-flex min-h-[36px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
            <Tag size={12} />
            <span className="line-clamp-1 text-sand/80">
              {[event.format, event.tags.join(" · ")]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </div>
        </div>
      </div>
      <div className="relative mt-4 flex flex-col gap-2 text-sm text-sand/80 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-300/20 px-3 py-1 text-amber-200">
            {formatPrice(event.priceCNY)}
          </span>
          {seatsLeft !== null ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-sand/70">
              {seatsLeft <= 4 ? "名额紧张" : "名额充足"}
            </span>
          ) : null}
          {materialsPublic ? (
            <span className="rounded-full border border-emerald-200/30 bg-emerald-200/10 px-2 py-1 text-[11px] text-emerald-100">
              材料公开
            </span>
          ) : null}
          {event.capacity ? (
            <span className="text-xs text-sand/60">
              {event.registeredCount ?? 0}/{event.capacity} 已报名
            </span>
          ) : null}
        </div>
        <Link
          href={`/events/${event.slug}`}
          className="text-sm font-semibold text-cyan-200 transition group-hover:text-amber-200"
        >
          详情与报名 →
        </Link>
      </div>
      {!available ? null : null}
    </div>
  );
}
