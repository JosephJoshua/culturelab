"use client";

import { type FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [wechat, setWechat] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!agree) return;
    trackEvent({ name: "newsletter_signup", payload: { email, wechat } });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-amber-300/30 bg-[#122032]/70 p-6 text-sand shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
        <p className="text-lg font-semibold text-amber-200">感谢你的信任！</p>
        <p className="text-sand/70">我们会在有新活动或长文时第一时间通知你。</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1829]/80 to-[#10182b]/70 p-6 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)]"
    >
      <div className="flex flex-col gap-3">
        <label className="text-sm text-sand/70">
          邮箱 Email（可选）
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sand outline-none ring-amber-300/40 focus:ring-2"
            placeholder="you@example.com"
            type="email"
          />
        </label>
        <label className="text-sm text-sand/70">
          微信号 WeChat（可选）
          <input
            value={wechat}
            onChange={(e) => setWechat(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sand outline-none ring-amber-300/40 focus:ring-2"
            placeholder="wechat-id"
            type="text"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-sand/70">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-amber-300 focus:ring-amber-300"
          />
          我同意接收 CultureLab 的活动与内容更新
        </label>
        <button
          type="submit"
          disabled={!agree}
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-amber-400/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-white/20"
        >
          提交
        </button>
      </div>
    </form>
  );
}
