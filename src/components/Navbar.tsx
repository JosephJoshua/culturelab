"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/events", label: "Events 活动" },
  { href: "/blog", label: "Blog 文章" },
  { href: "/members", label: "Membership 会员" },
  { href: "/about", label: "About 关于" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-b-3xl border px-4 py-3 transition-all sm:px-6 ${
          scrolled
            ? "border-white/12 bg-gradient-to-br from-[#0e1525]/90 via-[#0b1220]/90 to-[#0f182b]/90 shadow-lg shadow-black/30 shadow-[0_1px_0_rgba(255,255,255,0.08)]"
            : "border-white/10 bg-gradient-to-br from-[#0e1525]/70 via-[#0b1220]/70 to-[#0f182b]/70"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-wide text-amber-200"
        >
          Culture<span className="text-cyan-200">Lab</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-sand/80 transition hover:text-amber-100 hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/events"
            className="rounded-full border border-amber-200/40 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200/80 hover:text-amber-50"
          >
            近期活动
          </Link>
          <Link
            href="/account"
            className="rounded-full bg-amber-400/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            账户 Account
          </Link>
        </nav>
        <button
          type="button"
          aria-label="打开菜单"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-sand/80 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="text-base leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="bg-[#0c1220]/95 px-4 pb-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-sand/85 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-amber-400/90 px-3 py-2 text-sm font-semibold text-slate-950"
            >
              账户 Account
            </Link>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
