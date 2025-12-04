import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-amber-200">
        404
      </div>
      <h1 className="font-display text-4xl text-sand">
        走神了，这页不在书里。
      </h1>
      <p className="max-w-xl text-sm text-sand/70">
        CultureLab
        还在慢慢建设，可能这页还没被写入。可以回到首页或浏览近期活动。
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-amber-400/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          回到首页
        </Link>
        <Link
          href="/events"
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-sand transition hover:border-amber-200/60 hover:text-amber-100"
        >
          查看活动
        </Link>
      </div>
    </div>
  );
}
