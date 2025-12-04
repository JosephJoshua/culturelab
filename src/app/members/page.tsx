"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { membershipTiers } from "@/data/site-data";
import { trackEvent } from "@/lib/analytics";

export default function MembersPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Membership · 会员计划"
        title="Membership · 会员计划"
        description="支持社区运营，获得稳定席位、更深的讨论以及专属资源。"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {membershipTiers.map((tier) => (
          <div
            key={tier.id}
            className={`flex h-full flex-col justify-between rounded-2xl border p-5 shadow-[0_20px_60px_-34px_rgba(0,0,0,0.7)] ${
              tier.highlight
                ? "border-amber-300/60 bg-amber-300/10"
                : "border-white/10 bg-[#0d1423]/80"
            }`}
          >
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-200/80">
                {tier.nameEn}
              </p>
              <h3 className="text-2xl font-semibold text-sand">
                {tier.nameZh} · {tier.nameEn}
              </h3>
              <p className="text-xl font-semibold text-amber-200">
                ¥{tier.pricePerMonthCNY} / 月
              </p>
              <ul className="space-y-2 text-sm text-sand/75">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() =>
                trackEvent({
                  name: "membership_interest",
                  payload: { tier: tier.id },
                })
              }
              className={`mt-4 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tier.highlight
                  ? "bg-amber-400/90 text-slate-950 hover:bg-amber-300"
                  : "border border-white/10 text-sand hover:border-amber-200/60 hover:text-amber-100"
              }`}
            >
              成为会员
            </button>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#0d1526]/80 p-5 text-sm text-sand/75">
        <p>
          会员购买将于近期上线。如果你想提前加入或企业合作，请添加微信/发送邮件给主办方，我们会一对一沟通权益与需求。
        </p>
        <Link
          href="/about"
          className="mt-2 inline-block text-cyan-200 hover:text-amber-200"
        >
          了解 CultureLab 背后的故事 →
        </Link>
      </div>
    </div>
  );
}
