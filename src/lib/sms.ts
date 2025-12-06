"use server";

import crypto from "node:crypto";

type SendResult = { ok: true } | { ok: false; error: string };

// Standard Aliyun SMS send for code delivery.
export async function sendAliyunSmsCode(
  phone: string,
  code: string,
): Promise<SendResult> {
  const accessKeyId = process.env.ALIYUN_ACCESS_KEY_ID;
  const accessKeySecret = process.env.ALIYUN_ACCESS_KEY_SECRET;
  const signName = process.env.ALIYUN_SMS_SIGN_NAME;
  const templateCode = process.env.ALIYUN_SMS_TEMPLATE_CODE;

  if (!accessKeyId || !accessKeySecret || !signName || !templateCode) {
    return { ok: false, error: "Aliyun SMS not configured" };
  }

  // Dev mode: bypass external call
  if (process.env.NODE_ENV === "development") return { ok: true };

  const params: Record<string, string> = {
    Action: "SendSms",
    SignName: signName,
    TemplateCode: templateCode,
    PhoneNumbers: phone,
    TemplateParam: JSON.stringify({ code }),
    RegionId: "cn-hangzhou",
    Format: "JSON",
    Version: "2017-05-25",
    SignatureMethod: "HMAC-SHA1",
    SignatureVersion: "1.0",
    SignatureNonce: crypto.randomUUID(),
    Timestamp: new Date().toISOString(),
    AccessKeyId: accessKeyId,
  };

  const percentEncode = (str: string) =>
    encodeURIComponent(str)
      .replace(/\+/g, "%20")
      .replace(/\*/g, "%2A")
      .replace(/%7E/g, "~");

  const canonicalized = Object.keys(params)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join("&");

  const stringToSign = `GET&${percentEncode("/")}&${percentEncode(canonicalized)}`;
  const signature = crypto
    .createHmac("sha1", `${accessKeySecret}&`)
    .update(stringToSign)
    .digest("base64");

  const url = `https://dysmsapi.aliyuncs.com/?Signature=${percentEncode(
    signature,
  )}&${canonicalized}`;

  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    return { ok: false, error: `HTTP ${res.status}` };
  }
  const data = (await res.json().catch(() => ({}))) as {
    Code?: string;
    Message?: string;
  };
  if (data.Code && data.Code !== "OK") {
    return { ok: false, error: data.Message ?? data.Code };
  }
  return { ok: true };
}
