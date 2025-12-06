import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { membershipInterestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = membershipInterestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { tier, contactEmail, contactWechat, subscribe } = parsed.data;
  await prisma.membershipInterest.create({
    data: { tier, contactEmail, contactWechat, subscribe },
  });
  return NextResponse.json({ success: true });
}
