import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendAliyunSmsCode } from "@/lib/sms";
import { sendCodeSchema } from "@/lib/validators";

const CODE_TTL_MINUTES = 8;
const DAILY_LIMIT = 8;
const COOLDOWN_SECONDS = 60;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = sendCodeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { phone } = parsed.data;
  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const sentToday = await prisma.phoneCode.count({
    where: { phone, createdAt: { gte: since } },
  });
  if (sentToday >= DAILY_LIMIT) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const last = await prisma.phoneCode.findFirst({
    where: { phone },
    orderBy: { createdAt: "desc" },
  });
  if (last) {
    const diff = (now.getTime() - last.createdAt.getTime()) / 1000;
    if (diff < COOLDOWN_SECONDS) {
      return NextResponse.json(
        { error: "Please wait before retrying" },
        { status: 429 },
      );
    }
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const codeHash = crypto.createHash("sha256").update(code).digest("hex");
  const expiresAt = new Date(now.getTime() + CODE_TTL_MINUTES * 60 * 1000);

  await prisma.phoneCode.create({
    data: { phone, codeHash, expiresAt },
  });

  const smsResult = await sendAliyunSmsCode(phone, code);
  if (!smsResult.ok && process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }

  const payload =
    process.env.NODE_ENV === "development"
      ? { success: true, code }
      : { success: true };
  return NextResponse.json(payload);
}
