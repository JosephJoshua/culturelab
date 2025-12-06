import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

function parseCookie(request: Request, key: string) {
  return request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim().split("="))
    .find(([k]) => k === key)?.[1];
}

export async function POST(request: Request) {
  const refresh = parseCookie(request, "refresh_token");
  if (!refresh)
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  const refreshHash = crypto.createHash("sha256").update(refresh).digest("hex");

  const session = await prisma.session.findFirst({
    where: { refreshTokenHash: refreshHash },
  });
  if (!session || session.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user)
    return NextResponse.json({ error: "Invalid user" }, { status: 401 });

  // rotate refresh token
  const newRefresh = crypto.randomBytes(32).toString("hex");
  const newRefreshHash = crypto
    .createHash("sha256")
    .update(newRefresh)
    .digest("hex");
  await prisma.session.update({
    where: { id: session.id },
    data: {
      refreshTokenHash: newRefreshHash,
      expiresAt: new Date(Date.now() + REFRESH_EXPIRES_MS),
    },
  });

  const accessToken = createToken(
    { sub: user.id, phone: user.phone },
    ACCESS_EXPIRES_MS,
  );

  const response = NextResponse.json({ success: true });
  response.cookies.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ACCESS_EXPIRES_MS / 1000,
    path: "/",
  });
  response.cookies.set("refresh_token", newRefresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: REFRESH_EXPIRES_MS / 1000,
    path: "/",
  });
  return response;
}
