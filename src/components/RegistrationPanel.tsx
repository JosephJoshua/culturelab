"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { downloadIcs } from "@/lib/calendar";
import { formatPrice } from "@/lib/formatters";
import type { Event, PaymentMethod } from "@/types";

interface Props {
  event: Event;
}

export function RegistrationPanel({ event }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [wechat, setWechat] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("wechat");
  const [subscribe, setSubscribe] = useState(true);
  const [status, setStatus] = useState<"idle" | "success" | "waitlist">("idle");

  const hasCapacity = useMemo(() => {
    if (!event.capacity || event.registeredCount === undefined) return true;
    return event.registeredCount < event.capacity;
  }, [event.capacity, event.registeredCount]);

  const handleSubmit = (formEvent: FormEvent) => {
    formEvent.preventDefault();
    if (!name || !wechat) return;

    if (!hasCapacity) {
      setStatus("waitlist");
      trackEvent({
        name: "start_registration",
        payload: { slug: event.slug, waitlist: true },
      });
      return;
    }

    if (event.priceCNY > 0) {
      trackEvent({
        name: "start_payment",
        payload: { slug: event.slug, method, name, subscribe },
      });
      router.push(`/events/${event.slug}/pay?method=${method}`);
    } else {
      trackEvent({
        name: "complete_registration",
        payload: { slug: event.slug, name, subscribe },
      });
      setStatus("success");
    }
  };

  const successCopy =
    status === "waitlist"
      ? "本次活动已满额，已为你加入候补名单，我们确认后会第一时间通知。"
      : "报名信息已收到，我们会尽快与你确认。";

  if (status !== "idle") {
    return (
      <div className="space-y-4 rounded-2xl border border-amber-200/30 bg-amber-200/10 p-5 text-sand">
        <p className="text-lg font-semibold">
          {status === "waitlist" ? "已加入候补" : "报名成功"}
        </p>
        <p className="text-sand/80">{successCopy}</p>
        {event.wechatGroupQR ? (
          <div className="space-y-2">
            <p className="text-sm text-sand/70">
              请扫码加入活动微信群，详细信息将在群内发布。
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-[#0f1829]/80 p-5 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-sand/70">
          费用 {formatPrice(event.priceCNY)}
        </p>
        {event.capacity ? (
          <p className="text-xs text-sand/60">
            {event.registeredCount ?? 0}/{event.capacity} 已报名
          </p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <label className="text-sm text-sand/70">
          姓名 *
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sand outline-none ring-amber-300/40 focus:ring-2"
            placeholder="你的名字"
          />
        </label>
        <label className="text-sm text-sand/70">
          微信号 *
          <input
            value={wechat}
            onChange={(e) => setWechat(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sand outline-none ring-amber-300/40 focus:ring-2"
            placeholder="wechat id"
          />
        </label>
        <label className="text-sm text-sand/70">
          邮箱（可选）
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sand outline-none ring-amber-300/40 focus:ring-2"
            placeholder="you@example.com"
            type="email"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-sand/70">
        <input
          type="checkbox"
          checked={subscribe}
          onChange={(e) => setSubscribe(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-white/10 text-amber-300 focus:ring-amber-300"
        />
        我想加入邮件通讯 / Newsletter
      </label>

      {event.priceCNY > 0 && hasCapacity ? (
        <div className="space-y-2 text-sm text-sand/70">
          <p>支付方式</p>
          <div className="grid grid-cols-2 gap-2">
            {(["wechat", "alipay"] as PaymentMethod[]).map((methodKey) => (
              <button
                key={methodKey}
                type="button"
                onClick={() => setMethod(methodKey)}
                className={`rounded-lg border px-3 py-2 ${
                  method === methodKey
                    ? "border-amber-300/60 bg-amber-300/10 text-amber-100"
                    : "border-white/10 bg-white/5 text-sand/80"
                }`}
              >
                {methodKey === "wechat" ? "微信支付" : "支付宝"}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-full bg-amber-400/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
      >
        {hasCapacity
          ? event.priceCNY > 0
            ? "去支付 · Pay"
            : "提交报名"
          : "加入候补名单"}
      </button>
      <button
        type="button"
        onClick={() => downloadIcs(event)}
        className="w-full rounded-full border border-white/15 px-4 py-2 text-sm text-sand/80 transition hover:border-amber-200/40 hover:text-amber-100"
      >
        添加到日历 Add to calendar
      </button>
    </form>
  );
}
