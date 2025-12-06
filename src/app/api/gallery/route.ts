import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { title: "asc" },
  });
  return NextResponse.json({ gallery: items });
}
