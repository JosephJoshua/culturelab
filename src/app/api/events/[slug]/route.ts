import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const event = await prisma.event.findUnique({ where: { slug: params.slug } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const hasCapacity = !event.capacity || event.registeredCount < event.capacity;

  return NextResponse.json({
    event,
    availability: hasCapacity ? "available" : "waitlist",
    seatsLeft: event.capacity
      ? Math.max(event.capacity - (event.registeredCount ?? 0), 0)
      : null,
  });
}
