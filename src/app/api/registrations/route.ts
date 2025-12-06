import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { registrationSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const {
    eventSlug,
    name,
    wechat,
    email,
    subscribe = true,
    paymentMethod,
  } = parsed.data;

  const event = await prisma.event.findUnique({ where: { slug: eventSlug } });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const hasCapacity = !event.capacity || event.registeredCount < event.capacity;
  const status = hasCapacity ? "confirmed" : "waitlist";

  if (hasCapacity) {
    await prisma.$transaction([
      prisma.registration.create({
        data: {
          eventId: event.id,
          name,
          wechat,
          email,
          subscribe,
          status,
          paymentMethod,
        },
      }),
      prisma.event.update({
        where: { id: event.id },
        data: { registeredCount: { increment: 1 } },
      }),
    ]);
  } else {
    await prisma.registration.create({
      data: {
        eventId: event.id,
        name,
        wechat,
        email,
        subscribe,
        status,
        paymentMethod,
      },
    });
  }

  return NextResponse.json({ success: true, status });
}
