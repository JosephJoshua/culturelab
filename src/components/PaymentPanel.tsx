"use client";

import Image from "next/image";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { downloadIcs } from "@/lib/calendar";
import { formatPrice } from "@/lib/formatters";
import type { Event, PaymentMethod } from "@/types";

interface Props {
  event: Event;
  initialMethod: PaymentMethod;
}

export function PaymentPanel({ event, initialMethod }: Props) {
  const [confirmed, setConfirmed] = useState(false);
  const qr =
    initialMethod === "alipay"
      ? (event.paymentQRs?.alipay ?? event.wechatGroupQR)
      : (event.paymentQRs?.wechat ?? event.wechatGroupQR);

  if (confirmed) {
    return (
      <div className="space-y-4 rounded-2xl border border-amber-200/40 bg-amber-200/10 p-6 text-sand">
        <p className="text-lg font-semibold text-amber-100">
          感谢支付 / Thanks for completing payment
        </p>
        <p className="text-sand/80">
          我们会通过微信或邮箱与你确认报名，请耐心等待。
        </p>
        {event.wechatGroupQR ? (
          <div className="space-y-2">
            <p className="text-sm text-sand/70">
              扫码加入活动微信群，详细信息将在群内发布。
            </p>
            <Image
              src={event.wechatGroupQR}
              alt="WeChat group QR"
              width={176}
              height={176}
              className="h-44 w-44 rounded-xl border border-white/10 bg-white/5 p-3"
              unoptimized
            />
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => downloadIcs(event)}
          className="rounded-full bg-cyan-300/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200"
        >
          添加到日历 · Add to calendar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-[#0f1829]/80 p-6 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between text-sand">
        <div>
          <p className="text-sm text-sand/70">支付方式</p>
          <p className="text-xl font-semibold">
            {initialMethod === "wechat" ? "微信支付" : "支付宝"}
          </p>
        </div>
        <span className="rounded-full bg-amber-300/20 px-3 py-1 text-sm text-amber-100">
          {formatPrice(event.priceCNY)}
        </span>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#0d1423]/80 p-4 text-sand/80">
        <p>
          请使用 {initialMethod === "wechat" ? "微信支付" : "支付宝"}{" "}
          扫描下方二维码完成支付。支付成功后，请截图保存凭证。若 24
          小时内未收到确认，请通过微信联系主办方。
        </p>
      </div>
      {qr ? (
        <Image
          src={qr}
          alt="支付二维码"
          width={208}
          height={208}
          className="mx-auto h-52 w-52 rounded-2xl border border-white/10 bg-white/5 p-4"
          unoptimized
        />
      ) : (
        <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-white/15 text-sand/60">
          支付二维码稍后提供
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setConfirmed(true);
          trackEvent({
            name: "complete_payment",
            payload: { slug: event.slug, method: initialMethod },
          });
        }}
        className="w-full rounded-full bg-amber-400/90 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
      >
        我已完成支付
      </button>
    </div>
  );
}
