import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function buildIcs(event: {
  title: string;
  description: string;
  dateTime: Date;
  location: string;
}) {
  const start = `${event.dateTime.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
  const endDate = new Date(event.dateTime.getTime() + 90 * 60 * 1000);
  const end = `${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CultureLab//EN
BEGIN:VEVENT
UID:${start}@culturelab
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const event = await prisma.event.findUnique({ where: { slug: params.slug } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const ics = buildIcs({
    title: event.title,
    description: event.shortDescription,
    dateTime: event.dateTime,
    location: event.location,
  });

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}.ics"`,
    },
  });
}
