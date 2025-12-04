export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 animate-pulse">
      <div className="h-8 w-3/4 rounded bg-white/10" />
      <div className="h-4 w-1/2 rounded bg-white/10" />
      <div className="h-48 rounded-2xl bg-white/5" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-5/6 rounded bg-white/10" />
        <div className="h-3 w-4/6 rounded bg-white/10" />
      </div>
    </div>
  );
}
