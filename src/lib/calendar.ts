import type { Event } from "@/types";

function toICSDateTime(date: Date) {
  return `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

export function buildIcs(event: Event) {
  const start = new Date(event.dateTime);
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CultureLab//Calendar//CN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@culturelab.local`,
    `DTSTAMP:${toICSDateTime(new Date())}`,
    `DTSTART:${toICSDateTime(start)}`,
    `DTEND:${toICSDateTime(end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.shortDescription.replace(/\\n/g, " ")}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\\r\\n");
}

export function downloadIcs(event: Event) {
  if (typeof window === "undefined") return;
  const ics = buildIcs(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.slug}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
