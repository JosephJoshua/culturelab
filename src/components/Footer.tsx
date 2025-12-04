import Link from "next/link";

const socials = [
  { label: "微信公众号", href: "https://example.com" },
  { label: "小红书", href: "https://example.com" },
  { label: "Bilibili", href: "https://example.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b111f] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-sand/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-sand">© 2025 CultureLab</p>
          <p className="text-sand/70">Reading · Culture · Community</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {socials.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-white/10 px-3 py-1 text-sand/80 transition hover:border-amber-300/60 hover:text-amber-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
