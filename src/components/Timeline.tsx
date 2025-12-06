import Image from "next/image";
import Link from "next/link";
import { timelineItems } from "@/data/site-data";
import { formatDate } from "@/lib/formatters";

export function Timeline() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-white/10" />
      <div className="grid auto-cols-[minmax(280px,420px)] grid-flow-col gap-6 overflow-x-auto pb-3 pr-10 sm:auto-cols-[minmax(320px,460px)] snap-x snap-mandatory">
        {timelineItems.map((item, idx) => (
          <div
            key={item.id}
            className="relative snap-start rounded-2xl border border-white/10 bg-[#0f182b]/80 shadow-[0_16px_48px_-32px_rgba(0,0,0,0.75)]"
          >
            <div className="relative h-36 overflow-hidden rounded-t-2xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="420px"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1324]/80 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-sand/90">
                {formatDate(item.date)}
              </div>
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-xl text-sand">{item.title}</h3>
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-amber-300 to-cyan-300" />
              </div>
              <p className="text-sm text-sand/70">{item.theme}</p>
              <div className="flex items-center justify-between text-xs text-sand/60">
                <span>第 {idx + 1} 期</span>
                {item.recapHref ? (
                  <Link
                    href={item.recapHref}
                    className="inline-flex items-center gap-1 text-amber-200 transition hover:text-amber-100"
                  >
                    查看回顾 →
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
