"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Event } from "@/types";

const FireflyCanvas = dynamic(() => import("./FireflyCanvas"), { ssr: false });

type Point = { x: number; y: number };

function getWaypoints(ids: string[], docHeight: number, vh: number): Point[] {
  const points: Point[] = [];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const fraction =
      docHeight > 0
        ? (rect.top + window.scrollY + rect.height * 0.5) / docHeight
        : 0.5;
    const bandTop = vh * 0.18;
    const bandHeight = vh * 0.64;
    points.push({
      x: rect.left + rect.width * 0.35,
      y: bandTop + bandHeight * fraction,
    });
  });
  if (points.length) {
    points.push({
      x: Math.min(
        window.innerWidth * 0.8,
        points[points.length - 1].x + window.innerWidth * 0.15,
      ),
      y: window.innerHeight * 0.82,
    });
  }
  return points;
}

export function FireflyOverlay({
  anchorIds,
  featuredEvent,
}: {
  anchorIds: string[];
  featuredEvent?: Event;
}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    mass: 0.4,
  });
  const [waypoints, setWaypoints] = useState<Point[]>([]);
  const [anchorPoints, setAnchorPoints] = useState<Point[]>([]);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const introOrigin = useRef({ x: 80, y: 80 });
  const introProgress = useSpring(0, {
    stiffness: 90,
    damping: 18,
    mass: 0.45,
  });
  const introDone = useRef(false);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewport({ width: w, height: h });
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        h,
      );
      const pts = getWaypoints(anchorIds, docHeight, h);
      setWaypoints(pts.length ? pts : [{ x: w * 0.3, y: h * 0.3 }]);
      setAnchorPoints(pts);
      introOrigin.current = {
        x: Math.max(40, w * 0.08),
        y: Math.max(28, h * 0.08),
      };
      if (!introDone.current) {
        introProgress.set(0);
        requestAnimationFrame(() => {
          introProgress.set(1);
          introDone.current = true;
        });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("load", compute);
    window.addEventListener("scroll", compute, { passive: true });
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("load", compute);
      window.removeEventListener("scroll", compute);
    };
  }, [anchorIds, introProgress]);

  const fractions =
    waypoints.length > 1
      ? waypoints.map((_, i) => i / (waypoints.length - 1))
      : [0, 1];
  const isMobile = viewport.width > 0 && viewport.width < 768;
  const pathWidth = Math.min(viewport.width || 0, 1800);
  const xs =
    waypoints.length > 1
      ? waypoints.map((p, i) => {
          const wave =
            Math.sin(i * 1.3) * (pathWidth * (isMobile ? 0.12 : 0.07));
          const bias =
            pathWidth *
            (isMobile ? 0.1 : 0.07) *
            (waypoints.length > 1 ? i / (waypoints.length - 1) : 0);
          return Math.min(p.x + wave + bias, viewport.width * 0.95);
        })
      : [viewport.width * 0.18 || 0, viewport.width * 0.82 || 0];
  const ys =
    waypoints.length > 1
      ? waypoints.map((p, i) => p.y + (i % 2 === 0 ? -16 : isMobile ? 8 : 14))
      : [
          viewport.height * 0.28 || 0,
          viewport.height * (isMobile ? 0.56 : 0.62) || 0,
        ];

  const pacedFractions = useMemo(() => {
    if (waypoints.length < 2) return fractions;
    const dists: number[] = [];
    for (let i = 1; i < waypoints.length; i += 1) {
      const dx = waypoints[i].x - waypoints[i - 1].x;
      const dy = waypoints[i].y - waypoints[i - 1].y;
      dists.push(Math.hypot(dx, dy));
    }
    const weights = dists.map((d) => d ** 1.1);
    const total = weights.reduce((a, b) => a + b, 0);
    const fracs: number[] = [0];
    weights.reduce((acc, w) => {
      const next = acc + w / total;
      fracs.push(Math.min(1, next));
      return next;
    }, 0);
    return fracs;
  }, [fractions, waypoints]);

  const baseX = useTransform(progress, pacedFractions, xs);
  const baseY = useTransform(progress, pacedFractions, ys);
  const driftX = useTransform(
    progress,
    (v) => Math.sin(v * Math.PI * 6) * (viewport.width * 0.03),
  );
  const driftY = useTransform(
    progress,
    (v) => Math.cos(v * Math.PI * 5) * (isMobile ? 10 : 24),
  );
  const rotate = useTransform(progress, (v) => Math.sin(v * Math.PI * 4) * 8);
  const glow = useTransform(progress, (v) => 0.7 + Math.sin(v * 8) * 0.2);
  const [trail, setTrail] = useState<Point[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [centerRender, setCenterRender] = useState({ x: 0, y: 0 });
  const [parallaxPaused, setParallaxPaused] = useState(true);
  const [speed, setSpeed] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const decayTimer = useRef<NodeJS.Timeout | null>(null);
  const fireflyRef = useRef({ x: 0, y: 0 });
  const avoidXSpring = useSpring(0, {
    stiffness: 180,
    damping: 16,
    mass: 0.55,
  });
  const avoidYSpring = useSpring(0, {
    stiffness: 180,
    damping: 16,
    mass: 0.55,
  });
  const fireflySize = viewport.width > 0 && viewport.width < 640 ? 96 : 128;
  const bodyRadius = 40;
  const xTarget = useTransform([baseX, driftX], ([b, d]) => b + d);
  const yTarget = useTransform([baseY, driftY], ([b, d]) => b + d);
  const translateX = useTransform([xTarget, avoidXSpring], ([b, a]) => b + a);
  const translateY = useTransform([yTarget, avoidYSpring], ([b, a]) => b + a);
  const introX = useTransform([translateX, introProgress], ([tx, p]) => {
    return introOrigin.current.x * (1 - p) + tx * p;
  });
  const introBend = useTransform(introProgress, (p) => {
    const arc = Math.sin(p * Math.PI);
    const isMobile = viewport.width > 0 && viewport.width < 768;
    const maxArc = isMobile
      ? Math.min(160, (viewport.width || 600) * 0.18)
      : Math.min(340, (viewport.width || 1200) * 0.22);
    return arc * maxArc;
  });
  const introTranslateX = useTransform([introX, introBend], ([x, b]) => x + b);
  const introY = useTransform([translateY, introProgress], ([ty, p]) => {
    return introOrigin.current.y * (1 - p) + ty * p;
  });
  const [idle, setIdle] = useState(false);
  const badge = `下一场：${featuredEvent?.title ?? "CultureLab Salon"}`;

  useEffect(() => {
    setParallaxPaused(true);
    const unsub = introProgress.on("change", (v) => {
      if (v < 0.98) setParallaxPaused(true);
      else setParallaxPaused(false);
    });
    return () => unsub();
  }, [introProgress]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (parallaxPaused) {
      document.documentElement.dataset.parallaxPaused = "1";
    } else {
      delete document.documentElement.dataset.parallaxPaused;
    }
  }, [parallaxPaused]);

  const wakeNow = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (idle) setIdle(false);
  }, [idle]);

  const scheduleSleep = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 2400);
  }, []);

  const checkCollision = useCallback(() => {
    const baseX = xTarget.get() + fireflySize / 2;
    const baseY = yTarget.get() + fireflySize / 2;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const currentX = baseX + avoidXSpring.get();
    const currentY = baseY + avoidYSpring.get();
    const dxCurrent = currentX - mx;
    const dyCurrent = currentY - my;
    const distToCurrent = Math.hypot(dxCurrent, dyCurrent);
    const minPush = 120;
    const maxPush = Math.min(260, (viewport.width || 900) * 0.3);
    const safeRadius = bodyRadius + 16;

    if (distToCurrent < bodyRadius) {
      wakeNow();
      const push = Math.min(
        maxPush,
        Math.max(minPush, (bodyRadius - distToCurrent + 12) * 4),
      );
      avoidXSpring.set((dxCurrent / Math.max(distToCurrent, 1)) * push);
      avoidYSpring.set((dyCurrent / Math.max(distToCurrent, 1)) * push);
      if (decayTimer.current) clearTimeout(decayTimer.current);
      decayTimer.current = setTimeout(checkCollision, 100);
      return;
    }

    const dxBase = baseX - mx;
    const dyBase = baseY - my;
    const distToBase = Math.hypot(dxBase, dyBase);
    if (distToBase < safeRadius) {
      wakeNow();
      if (decayTimer.current) clearTimeout(decayTimer.current);
      decayTimer.current = setTimeout(checkCollision, 100);
      return;
    }

    avoidXSpring.set(0);
    avoidYSpring.set(0);
    scheduleSleep();
  }, [
    avoidXSpring,
    avoidYSpring,
    fireflySize,
    viewport.width,
    xTarget,
    wakeNow,
    scheduleSleep,
    yTarget,
  ]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      checkCollision();
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    const interval = window.setInterval(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const last = trail[trail.length - 1];
      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y);
        setSpeed((prev) => prev * 0.6 + dist * 0.4 * 16.6); // approximate px/sec
      }
      setCenterRender({ x, y });
      setTrail((prev) => [...prev, { x, y }].slice(-64));
    }, 50);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.clearInterval(interval);
      if (decayTimer.current) clearTimeout(decayTimer.current);
    };
  }, [checkCollision, trail]);

  useMotionValueEvent(xTarget, "change", () => {
    wakeNow();
    checkCollision();
  });
  useMotionValueEvent(yTarget, "change", () => {
    wakeNow();
    checkCollision();
  });

  const trailPoints =
    trail.length > 1 ? trail.map((p) => `${p.x},${p.y}`).join(" ") : undefined;
  const speedNorm = Math.min(1, Math.max(0, speed / 520));
  const trailWidth = 2.4 + speedNorm * 2.4;
  const trailOpacity = 0.6 + speedNorm * 0.4;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--firefly-x",
      `${centerRender.x}px`,
    );
    document.documentElement.style.setProperty(
      "--firefly-y",
      `${centerRender.y}px`,
    );
    fireflyRef.current = { x: centerRender.x, y: centerRender.y };
  }, [centerRender]);

  const activeIndex = (() => {
    if (!fractions.length) return 0;
    const current = progress.get();
    const idx = pacedFractions.findIndex(
      (f, i) => current <= f || i === fractions.length - 1,
    );
    return Math.max(0, idx === -1 ? pacedFractions.length - 1 : idx);
  })();

  return (
    <div className="pointer-events-none fixed inset-0 z-30" suppressHydrationWarning>
      {anchorPoints[activeIndex] ? (
        <div
          className="pointer-events-none absolute inset-x-0 z-10 h-24"
          style={{
            top: anchorPoints[activeIndex].y - 52,
            opacity: 0.3,
            background:
              "radial-gradient(120px 120px at var(--firefly-x) 50%, rgba(242,166,90,0.12), rgba(88,192,201,0))",
            filter: "blur(24px)",
          }}
          aria-hidden
        />
      ) : null}
      {trailPoints ? (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
          role="img"
        >
          <title>Firefly trail</title>
          <defs>
            <linearGradient id="trail" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(242,166,90,0.0)" />
              <stop offset="50%" stopColor="rgba(242,166,90,0.35)" />
              <stop offset="100%" stopColor="rgba(88,192,201,0.18)" />
            </linearGradient>
          </defs>
          <polyline
            points={trailPoints}
            fill="none"
            stroke="url(#trail)"
            strokeWidth={trailWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 10px rgba(242,166,90,0.55)) blur(0.2px)",
              opacity: trailOpacity,
            }}
          />
        </svg>
      ) : null}
      <motion.div
        ref={containerRef}
        style={{
          width: fireflySize,
          height: fireflySize,
          translateX: introTranslateX,
          translateY: introY,
          rotate,
          pointerEvents: "none",
        }}
        animate={{ opacity: idle ? 0.36 : 1, scale: idle ? 0.97 : 1 }}
        transition={{
          opacity: { duration: idle ? 2.2 : 0.35, ease: "easeInOut" },
          scale: { duration: idle ? 2.2 : 0.35, ease: "easeInOut" },
        }}
      >
        <motion.div
          className="absolute -inset-6 rounded-full bg-amber-300/14 blur-3xl"
          style={{ opacity: glow }}
          animate={{ scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-3 top-1/2 h-[2px] w-16 -translate-y-1/2 bg-gradient-to-r from-amber-300/0 via-amber-300/70 to-transparent blur-[2px]"
          style={{ scaleX: glow }}
        />
        <motion.div
          whileHover={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: "none" }}
        >
          <FireflyCanvas featuredEvent={featuredEvent} badgeText={badge} />
        </motion.div>
      </motion.div>
    </div>
  );
}
