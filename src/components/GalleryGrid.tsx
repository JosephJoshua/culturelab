import Image from "next/image";
import { gallery } from "@/data/site-data";

export function GalleryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item) => (
        <figure
          key={item.id}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1524]/80 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.7)]"
        >
          <Image
            src={item.image}
            alt={item.title}
            width={480}
            height={320}
            className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
            unoptimized
            priority={false}
          />
          <figcaption className="p-3 text-sm text-sand">
            <div className="font-semibold">{item.title}</div>
            <p className="text-sand/65">{item.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
