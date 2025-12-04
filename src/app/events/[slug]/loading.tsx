export default function EventLoading() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-3/4 rounded bg-white/10" />
        <div className="h-4 w-1/2 rounded bg-white/10" />
        <div className="h-32 rounded-2xl bg-white/5" />
        <div className="h-24 rounded-2xl bg-white/5" />
      </div>
      <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
    </div>
  );
}
