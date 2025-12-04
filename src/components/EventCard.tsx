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

  return (
    <div
      className={`group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#101827]/70 via-[#0e1728]/70 to-[#0b1220]/70 p-5 backdrop-blur ${
        muted ? "opacity-70" : ""
      }`}
    >
      <div className="absolute inset-px rounded-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(242,166,90,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(88,192,201,0.12),transparent_30%)]" />
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-sand/70">
          <span className="rounded-full bg-white/5 px-3 py-1">
            {event.isOnline ? "线上" : "线下"}
          </span>
          <span className="font-semibold text-amber-200">
            {formatDateTime(event.dateTime)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-sand">{event.title}</h3>
        {event.guests ? (
          <p className="text-sm text-sand/70">
            嘉宾：{event.guests.join("，")}
          </p>
        ) : null}
        <p className="text-sm text-sand/70">{event.shortDescription}</p>
        <div className="flex flex-wrap gap-2 text-xs text-sand/70">
          <span className="rounded-full border border-white/10 px-2 py-1">
            {event.location}
          </span>
          {event.format ? (
            <span className="rounded-full border border-white/10 px-2 py-1">
              {event.format}
            </span>
          ) : null}
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-4 flex items-center justify-between text-sm text-sand/80">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-300/20 px-3 py-1 text-amber-200">
            {formatPrice(event.priceCNY)}
          </span>
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
      {!available ? (
        <div className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs text-amber-200">
          候补中
        </div>
      ) : null}
    </div>
  );
}
