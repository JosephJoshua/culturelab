import { notFound } from "next/navigation";
import { PaymentPanel } from "@/components/PaymentPanel";
import { SectionHeading } from "@/components/SectionHeading";
import { getEventBySlug } from "@/data/site-data";
import type { PaymentMethod } from "@/types";

export default function PayPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { method?: PaymentMethod };
}) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();
  const method = searchParams.method === "alipay" ? "alipay" : "wechat";

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Payment · 支付"
        title="Complete your payment."
        subtitle="完成支付"
      />
      <PaymentPanel event={event} initialMethod={method} />
    </div>
  );
}
