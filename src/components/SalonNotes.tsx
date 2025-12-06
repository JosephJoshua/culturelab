import { Quote, Sparkles } from "lucide-react";
import Link from "next/link";
import { salonNotes } from "@/data/site-data";

export function SalonNotes() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {salonNotes.map((note) => (
        <article
          key={note.id}
          className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0f182b]/75 p-5 shadow-[0_16px_48px_-30px_rgba(0,0,0,0.7)] transition hover:border-amber-200/40 hover:-translate-y-1"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-amber-200/80">
                Salon Notes
              </p>
              <h3 className="mt-1 font-display text-xl text-sand">
                {note.title}
              </h3>
            </div>
            <span className="rounded-full border border-amber-200/30 bg-amber-200/10 px-2.5 py-1 text-[11px] font-semibold text-amber-100">
              提炼
            </span>
          </div>

          <div className="mt-3 space-y-2 text-sm text-sand/75">
            <p className="font-semibold text-sand">Key questions</p>
            <ul className="space-y-1.5">
              {note.keyQuestions.map((q) => (
                <li key={q} className="flex items-start gap-2">
                  <Sparkles size={14} className="mt-0.5 text-amber-200" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 space-y-2 text-sm text-sand/75">
            <p className="font-semibold text-sand">Contrasts</p>
            <ul className="space-y-1.5">
              {note.viewpoints.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 space-y-1.5 text-sm text-sand/75">
            <p className="font-semibold text-sand">Quotes</p>
            {note.quotes.map((q) => (
              <blockquote
                key={q}
                className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/3 px-3 py-2 text-sand/85"
              >
                <Quote size={14} className="mt-0.5 text-amber-200" />
                <span className="leading-6">{q}</span>
              </blockquote>
            ))}
          </div>

          <div className="mt-3 space-y-1.5 text-sm text-rose-100/90">
            <p className="font-semibold text-rose-100">Open problems</p>
            {note.openProblems.map((p) => (
              <p
                key={p}
                className="rounded-xl border border-rose-200/20 bg-rose-200/10 px-3 py-2 leading-6 text-rose-50/90"
              >
                {p}
              </p>
            ))}
          </div>

          {note.eventSlug ? (
            <Link
              href={`/events/${note.eventSlug}`}
              className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-cyan-200 transition hover:text-amber-100"
            >
              查看对应活动 →
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}
