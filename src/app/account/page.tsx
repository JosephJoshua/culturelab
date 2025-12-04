import { SectionHeading } from "@/components/SectionHeading";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Account · 账户" title="My Account · 我的账户" />
      <div className="rounded-2xl border border-white/10 bg-[#0d1423]/80 p-6 text-sand/80">
        <p className="text-lg font-semibold text-sand">
          登录与个人中心功能将在后续版本上线。
        </p>
        <p className="mt-2 text-sm text-sand/70">
          如需确认报名或会员信息，请通过微信或邮件联系主办方。
        </p>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-sand/70">
          <p>访客 / Visitor</p>
          <p>Membership: 未登录 / Guest</p>
          <button
            type="button"
            className="mt-3 rounded-full border border-white/15 px-4 py-2 text-xs text-sand/70"
            disabled
          >
            即将上线 · Coming soon
          </button>
        </div>
      </div>
    </div>
  );
}
