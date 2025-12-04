"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo } from "react";
import { Hero3D } from "@/components/Hero3D";
import type { Event } from "@/types";

const cards = [
  { title: "午夜沙龙", meta: "线下 · 北京", accent: "amber" },
  { title: "跨文化对谈", meta: "线上 · Zoom", accent: "cyan" },
  { title: "共读 · 城市", meta: "线上 · 腾讯会议", accent: "amber" },
  { title: "小范围深聊", meta: "12-18人", accent: "cyan" },
];

export function HeroVisual({ featuredEvent }: { featuredEvent?: Event }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);
  const smoothX = useSpring(rotateX, { stiffness: 50, damping: 10 });
  const smoothY = useSpring(rotateY, { stiffness: 50, damping: 10 });

  const layers = useMemo(
    () =>
      cards.map((card, index) => ({
        ...card,
        delay: 0.15 * index,
        float: index % 2 === 0 ? 10 : -10,
      })),
    [],
  );

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_1.05fr]">
      <motion.div
        className="relative h-full min-h-[440px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#10182b] via-[#0b1324] to-[#0f1b2f] shadow-[0_30px_120px_-40px_rgba(0,0,0,0.7)]"
        style={{ rotateX: smoothX, rotateY: smoothY }}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          mouseX.set((event.clientX - rect.left) / rect.width);
          mouseY.set((event.clientY - rect.top) / rect.height);
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,166,90,0.16),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(88,192,201,0.16),transparent_40%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.05),transparent_45%)]" />
        <motion.div
          className="absolute inset-6 rounded-2xl border border-white/5"
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative h-full w-full">
          {layers.map((card, index) => (
            <motion.div
              key={card.title}
              className={`absolute left-8 right-8 mx-auto flex max-w-sm flex-col gap-3 rounded-2xl border border-white/10 px-5 py-5 text-sand/90 backdrop-blur-md ${
                card.accent === "amber"
                  ? "bg-[#1b2435]/80 shadow-[0_18px_70px_-24px_rgba(242,166,90,0.6)]"
                  : "bg-[#11182a]/80 shadow-[0_18px_70px_-24px_rgba(88,192,201,0.6)]"
              }`}
              style={{ y: card.float, top: 30 + index * 66 }}
              initial={{ opacity: 0, y: card.float - 8 }}
              animate={{ opacity: 1, y: card.float }}
              transition={{
                delay: card.delay,
                type: "spring",
                stiffness: 60,
                damping: 14,
              }}
              whileHover={{ scale: 1.02, translateY: -4 }}
            >
              <p className="text-[12px] uppercase tracking-[0.24em] text-sand/70">
                {card.meta}
              </p>
              <p className="text-xl font-semibold text-sand">{card.title}</p>
              <div className="flex items-center gap-2 text-xs text-sand/70">
                <span className="h-[1px] flex-1 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
                <span>
                  {card.accent === "amber" ? "阅读 · 对话" : "跨语 · 连接"}
                </span>
              </div>
            </motion.div>
          ))}
          <motion.div
            className="absolute left-8 top-10 rounded-full bg-amber-400/80 px-3 py-1 text-xs font-semibold text-slate-950"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Reading · Culture · Community
          </motion.div>
        </div>
      </motion.div>
      <Hero3D featuredEvent={featuredEvent} />
    </div>
  );
}
