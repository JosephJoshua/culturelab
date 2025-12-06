"use client";

import { useEffect, useRef } from "react";
import { testimonials } from "@/data/site-data";

export function TestimonialGrid() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf: number;
    let offset = 0;
    let isHovering = false;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    const speed = 0.35;

    const loop = () => {
      if (!isHovering && !isDragging) {
        offset += speed;
        if (offset >= el.scrollWidth / 2) offset = 0;
        el.scrollLeft = offset;
      }
      raf = requestAnimationFrame(loop);
    };

    // Duplicate content for seamless loop
    if (el.childElementCount === testimonials.length) {
      testimonials.forEach(() => {
        el.appendChild(el.children[0].cloneNode(true));
      });
    }

    const onMouseEnter = () => {
      isHovering = true;
    };
    const onMouseLeave = () => {
      isHovering = false;
    };
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      scrollStart = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const delta = startX - e.clientX;
      el.scrollLeft = scrollStart + delta;
      offset = el.scrollLeft;
    };
    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0d1322] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0d1322] to-transparent" />
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-hidden py-2 [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="relative w-72 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0e1525]/80 p-4 text-sand shadow-[0_16px_48px_-28px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,166,90,0.08),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(88,192,201,0.12),transparent_30%)]" />
            <p className="relative text-sm text-sand/80">“{item.quote}”</p>
            <div className="relative mt-3 text-xs text-sand/60">
              {item.name} · {item.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
