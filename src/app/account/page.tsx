"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

type Step = "idle" | "code-sent" | "verified";

export default function AccountPage() {
  const [countryCode] = useState("+86");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const queryClient = useQueryClient();

  const phone = useMemo(() => `${countryCode}${phoneLocal}`, [countryCode, phoneLocal]);

  useEffect(() => {
    if (!cooldown) return;
    const t = setInterval(() => setCooldown((c) => Math.max(c - 1, 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 401) return null;
      const data = await res.json();
      return data.user ?? null;
    },
    staleTime: 60_000,
  });

  useEffect(() => {
    if (meQuery.data) setStep("verified");
  }, [meQuery.data]);

  const sendCodeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "发送失败");
      return data;
    },
    onSuccess: () => {
      setStep("code-sent");
      setCooldown(60);
      setMessage("验证码已发送，请查看短信。");
    },
    onError: (err) => setMessage((err as Error).message),
  });

  const verifyCodeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "校验失败");
      return data;
    },
    onSuccess: async () => {
      setStep("verified");
      setMessage("登录成功，已生成会话。");
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err) => setMessage((err as Error).message),
  });

  const loading = sendCodeMutation.isPending || verifyCodeMutation.isPending;
  const handleSendCode = () => {
    setMessage(null);
    sendCodeMutation.mutate();
  };
  const handleVerify = () => {
    setMessage(null);
    verifyCodeMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Account · 账户"
        title="My Account"
        subtitle="我的账户"
      />
      <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0d1423]/80 p-6 text-sand/80">
        <p className="text-lg font-semibold text-sand">手机验证码登录</p>
        <p className="text-sm text-sand/70">
          主要使用短信验证码登录，后续可绑定微信。验证码有效期约 8 分钟。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="text-sm text-sand/70">
            手机号
            <div className="mt-1 flex gap-2">
              <input
                value={countryCode}
                readOnly
                className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sand outline-none"
              />
              <input
                value={phoneLocal}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D+/g, "");
                  setPhoneLocal(val);
                }}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sand outline-none ring-amber-300/40 focus:ring-2"
                placeholder="13800138000"
                inputMode="numeric"
              />
            </div>
          </div>
          <label className="text-sm text-sand/70">
            验证码
            <div className="mt-1 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sand outline-none ring-amber-300/40 focus:ring-2"
                placeholder="6 位数字"
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={loading || cooldown > 0 || !phoneLocal}
                className="whitespace-nowrap rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200/60 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cooldown > 0 ? `重发(${cooldown}s)` : "获取验证码"}
              </button>
            </div>
          </label>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleVerify}
            disabled={loading || !code || !phoneLocal}
            className="rounded-full bg-amber-400/90 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 disabled:opacity-60"
          >
            登录
          </button>
          <button
            type="button"
            onClick={() => {
              setPhoneLocal("");
              setCode("");
              setStep("idle");
              setMessage(null);
            }}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-sand/80 transition hover:border-amber-200/50 hover:text-amber-100"
          >
            重置
          </button>
          {meQuery.data ? (
            <span className="inline-flex items-center rounded-full border border-emerald-200/30 bg-emerald-200/10 px-3 py-1 text-xs text-emerald-100">
              当前登录：{meQuery.data.phone}
            </span>
          ) : null}
        </div>
        {message ? (
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-sand/80">
            {message}
          </div>
        ) : null}
        {step === "verified" ? (
          <div className="rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">
            已登录。下次访问将自动识别会话。
          </div>
        ) : null}
      </div>
    </div>
  );
}
