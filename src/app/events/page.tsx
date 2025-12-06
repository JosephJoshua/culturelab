"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getPastEvents, getUpcomingEvents } from "@/data/site-data";

const filters = [
  { label: "全部", key: "all" },
  { label: "线上", key: "online" },
  { label: "线下", key: "offline" },
];

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredUpcoming = useMemo(() => {
    const upcoming = getUpcomingEvents();
    if (filter === "online") return upcoming.filter((event) => event.isOnline);
    if (filter === "offline")
      return upcoming.filter((event) => !event.isOnline);
    return upcoming;
  }, [filter]);

  const filteredPast = useMemo(() => {
    const past = getPastEvents();
    if (filter === "online") return past.filter((event) => event.isOnline);
    if (filter === "offline") return past.filter((event) => !event.isOnline);
    return past;
  }, [filter]);

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Events · 活动"
        title="Browse our events."
        subtitle="活动"
        description="查看即将举办与往期活动。点击卡片进入报名或阅读详情。"
      />

      <div className="flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              filter === item.key
                ? "border-amber-300/70 bg-amber-300/10 text-amber-100"
                : "border-white/10 text-sand/80 hover:border-amber-200/40 hover:text-amber-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-sand">
            Upcoming · 即将举办
          </h3>
          <Link
            href="/events"
            className="text-sm text-cyan-200 hover:text-amber-200"
          >
            共 {filteredUpcoming.length} 场
          </Link>
        </div>
        {filteredUpcoming.length ? (
          <div className="grid gap-4 overflow-x-auto sm:grid-cols-[repeat(auto-fit,minmax(480px,1fr))]">
            {filteredUpcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-sand/70">
            暂无符合筛选条件的即将举办活动。
          </p>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-sand">Past · 往期活动</h3>
        {filteredPast.length ? (
          <div className="grid gap-4 overflow-x-auto sm:grid-cols-[repeat(auto-fit,minmax(480px,1fr))]">
            {filteredPast.map((event) => (
              <EventCard key={event.id} event={event} muted />
            ))}
          </div>
        ) : (
          <p className="text-sm text-sand/70">暂无符合筛选条件的往期活动。</p>
        )}
      </div>
    </div>
  );
}
