import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function verifyToken(token?: string) {
  if (!token) return null;
  const [header, body, sig] = token.split(".");
  if (!header || !body || !sig) return null;
  const secret = process.env.AUTH_SECRET || "dev-secret";
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");
  if (expected !== sig) return null;
  const payload = JSON.parse(Buffer.from(body, "base64url").toString());
  if (payload.exp && payload.exp < Date.now()) return null;
  return payload;
}

export async function GET(request: Request) {
  const access = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim().split("="))
    .find(([k]) => k === "access_token")?.[1];

  const payload = verifyToken(access);
  if (!payload?.sub) return NextResponse.json({ user: null }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: payload.sub as string },
    select: { id: true, phone: true, displayName: true, createdAt: true },
  });

  return NextResponse.json({ user });
}
