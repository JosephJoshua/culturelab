"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Event } from "@/types";

export default function FireflyCanvas({
  featuredEvent,
  badgeText,
}: {
  featuredEvent?: Event;
  badgeText?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const agenda = useMemo(() => {
    if (badgeText) return badgeText;
    if (!featuredEvent) return "CultureLab Salon";
    return featuredEvent.title;
  }, [badgeText, featuredEvent]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32" style={{ willChange: "transform" }}>
      {mounted && (
        <div className="pointer-events-none relative h-full w-full">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/35 via-transparent to-cyan-300/25 blur-2xl"
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: [0, 3, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative h-20 w-14 sm:h-24 sm:w-16">
              <motion.div
                className="absolute inset-4 rounded-full bg-amber-200/80 blur-md"
                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-300 to-cyan-300 shadow-[0_0_24px_rgba(242,166,90,0.6)]"
                animate={{ scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* wings */}
              <motion.div
                className="absolute left-[2%] top-1/2 h-8 w-12 -translate-y-1/2 rounded-[999px] bg-gradient-to-br from-cyan-200/60 via-cyan-200/20 to-transparent blur-sm"
                style={{ transformOrigin: "100% 50%" }}
                animate={{ rotate: [-10, 14, -12, 0], scaleY: [1, 1.08, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-[2%] top-1/2 h-8 w-12 -translate-y-1/2 rounded-[999px] bg-gradient-to-bl from-amber-200/60 via-amber-200/20 to-transparent blur-sm"
                style={{ transformOrigin: "0% 50%" }}
                animate={{ rotate: [12, -14, 10, 0], scaleY: [1, 1.08, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* tail spark */}
              <motion.div
                className="absolute bottom-[10%] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(242,166,90,0.9)]"
                animate={{ y: [0, -2, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* floating particles */}
              {[...Array(10)].map((_, i) => {
                const delay = i * 0.2;
                const size = i % 3 === 0 ? 3 : 2;
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-amber-200/80 shadow-[0_0_8px_rgba(242,166,90,0.6)]"
                    style={{
                      width: size,
                      height: size,
                      left: `${30 + (i % 5) * 12}%`,
                      top: `${30 + (i % 4) * 14}%`,
                    }}
                    animate={{
                      x: [0, (i % 2 === 0 ? -1 : 1) * 6, 0],
                      y: [0, (i % 2 === 0 ? 1 : -1) * 6, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/30 via-transparent to-cyan-300/20 blur-2xl" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[10px] leading-snug text-sand shadow-md shadow-black/50 backdrop-blur-sm text-center whitespace-normal break-words sm:top-3 sm:px-4"
        animate={{ opacity: [0.85, 1, 0.85], scale: [0.96, 1, 0.96] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ wordBreak: "keep-all" }}
      >
        {agenda}
      </motion.div>
    </div>
  );
}
