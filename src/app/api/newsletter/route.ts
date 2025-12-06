import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { email, wechat, consent } = parsed.data;
  if (!email && !wechat) {
    return NextResponse.json(
      { error: "Email or WeChat required" },
      { status: 400 },
    );
  }
  await prisma.newsletter.create({
    data: {
      email,
      wechat,
      consent,
    },
  });
  return NextResponse.json({ success: true });
}
