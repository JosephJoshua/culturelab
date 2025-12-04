import { testimonials } from "@/data/site-data";

export function TestimonialGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((item) => (
        <div
          key={item.name}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1525]/80 p-4 text-sand shadow-[0_16px_48px_-28px_rgba(0,0,0,0.7)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,166,90,0.08),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(88,192,201,0.12),transparent_30%)]" />
          <p className="relative text-sm text-sand/80">“{item.quote}”</p>
          <div className="relative mt-3 text-xs text-sand/60">
            {item.name} · {item.role}
          </div>
        </div>
      ))}
    </div>
  );
}
