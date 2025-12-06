import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const upcoming = searchParams.get("upcoming") === "true";
  const now = new Date();

  const events = await prisma.event.findMany({
    where: upcoming ? { dateTime: { gte: now } } : undefined,
    orderBy: { dateTime: "asc" },
  });

  return NextResponse.json({ events });
}
