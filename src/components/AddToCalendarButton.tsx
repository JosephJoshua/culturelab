"use client";

import { downloadIcs } from "@/lib/calendar";
import type { Event } from "@/types";

interface Props {
  event: Event;
  label?: string;
  className?: string;
}

export function AddToCalendarButton({
  event,
  label = "添加到日历",
  className = "",
}: Props) {
  return (
    <button
      type="button"
      onClick={() => downloadIcs(event)}
      className={`inline-flex items-center gap-2 rounded-full border border-cyan-200/50 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-100/80 hover:text-amber-100 ${className}`}
    >
      {label}
    </button>
  );
}
