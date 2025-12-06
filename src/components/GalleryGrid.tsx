import Image from "next/image";
import Link from "next/link";
import { gallery } from "@/data/site-data";

export function GalleryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item) => (
        <Link key={item.id} href={item.href ?? "/gallery"} className="block">
          <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1524]/80 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.7)]">
            <div className="kenburns">
              <Image
                src={item.image}
                alt={item.title}
                width={480}
                height={320}
                className="h-48 w-full object-cover"
                unoptimized
                priority={false}
              />
            </div>
            <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0d1324]/92 via-[#0d1324]/40 to-transparent p-4 opacity-90 transition duration-300 group-hover:opacity-100">
              <div className="text-sm font-semibold text-sand">
                {item.title} · {item.description}
              </div>
              <p className="text-xs text-sand/70">城市夜读 · 12 人</p>
            </figcaption>
          </figure>
        </Link>
      ))}
    </div>
  );
}
