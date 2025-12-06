import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyCodeSchema } from "@/lib/validators";

const MAX_ATTEMPTS = 5;
const ACCESS_EXPIRES_MS = 15 * 60 * 1000;
const REFRESH_EXPIRES_MS = 14 * 24 * 60 * 60 * 1000;

function createToken(payload: object, expiresInMs: number) {
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  ).toString("base64url");
  const exp = Date.now() + expiresInMs;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString(
    "base64url",
  );
  const secret = process.env.AUTH_SECRET || "dev-secret";
  const sig = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${sig}`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = verifyCodeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { phone, code } = parsed.data;
  const codeHash = crypto.createHash("sha256").update(code).digest("hex");
  const now = new Date();

  const record = await prisma.phoneCode.findFirst({
    where: { phone, used: false },
    orderBy: { createdAt: "desc" },
  });
  if (!record) {
    return NextResponse.json({ error: "Code not found" }, { status: 400 });
  }
  if (record.expiresAt < now) {
    return NextResponse.json({ error: "Code expired" }, { status: 400 });
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }
  if (record.codeHash !== codeHash) {
    await prisma.phoneCode.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 } },
    });
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  await prisma.phoneCode.update({
    where: { id: record.id },
    data: { used: true },
  });

  const user =
    (await prisma.user.findUnique({ where: { phone } })) ??
    (await prisma.user.create({ data: { phone } }));

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: now },
  });

  const accessToken = createToken({ sub: user.id, phone }, ACCESS_EXPIRES_MS);
  const refreshToken = crypto.randomBytes(32).toString("hex");
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  await prisma.session.create({
    data: {
      userId: user.id,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + REFRESH_EXPIRES_MS),
    },
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ACCESS_EXPIRES_MS / 1000,
    path: "/",
  });
  response.cookies.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: REFRESH_EXPIRES_MS / 1000,
    path: "/",
  });
  return response;
}
