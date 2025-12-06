"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Color, type Mesh, type MeshStandardMaterial } from "three";
import type { Event } from "@/types";
import { WebGLContextManager } from "./WebGLContextManager";

function Glow() {
  const mat = useRef<MeshStandardMaterial>(null);
  const amber = useMemo(() => new Color("#f2a65a"), []);
  const teal = useMemo(() => new Color("#58c0c9"), []);
  useFrame(({ clock }) => {
    const t = (Math.sin(clock.getElapsedTime() * 0.25) + 1) / 2;
    if (mat.current) {
      const mixed = amber.clone().lerp(teal, t * 0.32);
      mat.current.emissive.copy(mixed);
      mat.current.color.copy(mixed.clone().offsetHSL(0, -0.1, 0.08));
    }
  });
  return (
    <mesh>
      <sphereGeometry args={[0.2, 36, 36]} />
      <meshStandardMaterial
        ref={mat}
        emissive="#f2a65a"
        emissiveIntensity={2.6}
        color="#f7c17c"
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

function Aura() {
  const mat = useRef<MeshStandardMaterial>(null);
  const amber = useMemo(() => new Color("#f2a65a"), []);
  const teal = useMemo(() => new Color("#58c0c9"), []);
  useFrame(({ clock }) => {
    const t = (Math.sin(clock.getElapsedTime() * 0.22 + 0.6) + 1) / 2;
    if (mat.current) {
      const mixed = amber.clone().lerp(teal, t * 0.4);
      mat.current.emissive.copy(mixed.multiplyScalar(0.6));
      mat.current.color.copy(mixed.clone().offsetHSL(0, -0.08, 0.04));
    }
  });
  return (
    <mesh>
      <sphereGeometry args={[0.42, 24, 24]} />
      <meshStandardMaterial
        ref={mat}
        emissive="#58c0c9"
        emissiveIntensity={0.9}
        color="#58c0c9"
        transparent
        opacity={0.28}
      />
    </mesh>
  );
}

function Wings() {
  const left = useRef<Mesh>(null);
  const right = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flap = Math.sin(t * 8) * 0.35;
    if (left.current) {
      left.current.rotation.z = -0.3 + flap;
      left.current.renderOrder = 2;
    }
    if (right.current) {
      right.current.rotation.z = 0.3 - flap;
      right.current.renderOrder = 2;
    }
  });
  return (
    <group position={[0, 0.1, 0]}>
      <mesh
        ref={left}
        position={[-0.22, 0.02, 0]}
        rotation={[-0.2, 0, -0.32]}
        scale={[1.25, 0.8, 1]}
        renderOrder={2}
      >
        <circleGeometry args={[0.26, 32]} />
        <meshStandardMaterial
          color="#9ad4d9"
          transparent
          opacity={0.42}
          emissive="#9ad4d9"
          emissiveIntensity={0.55}
          roughness={0.08}
          metalness={0.05}
          depthWrite={false}
          side={2}
        />
      </mesh>
      <mesh
        ref={right}
        position={[0.22, 0.02, 0]}
        rotation={[-0.2, 0, 0.32]}
        scale={[1.25, 0.8, 1]}
        renderOrder={2}
      >
        <circleGeometry args={[0.26, 32]} />
        <meshStandardMaterial
          color="#f6d29a"
          transparent
          opacity={0.4}
          emissive="#f6d29a"
          emissiveIntensity={0.48}
          roughness={0.08}
          metalness={0.05}
          depthWrite={false}
          side={2}
        />
      </mesh>
    </group>
  );
}

function Tail() {
  const mat = useRef<MeshStandardMaterial>(null);
  const amber = useMemo(() => new Color("#f2a65a"), []);
  const teal = useMemo(() => new Color("#58c0c9"), []);
  useFrame(({ clock }) => {
    const t = (Math.sin(clock.getElapsedTime() * 0.3 + 1.2) + 1) / 2;
    if (mat.current) {
      const mixed = amber.clone().lerp(teal, t * 0.35);
      mat.current.emissive.copy(mixed);
      mat.current.color.copy(mixed.clone().offsetHSL(0, -0.06, 0.05));
    }
  });
  return (
    <group position={[0, -0.1, 0]}>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.03, 0.01, 0.18, 12]} />
        <meshStandardMaterial
          ref={mat}
          color="#f2a65a"
          emissive="#f2a65a"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      <Sparkles
        color="#f6d29a"
        count={12}
        speed={0.8}
        size={2}
        opacity={0.7}
        scale={[0.8, 0.8, 0.8]}
      />
    </group>
  );
}

export default function FireflyCanvas({
  featuredEvent,
  badgeText,
}: {
  featuredEvent?: Event;
  badgeText?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const agenda = useMemo(() => {
    if (badgeText) return badgeText;
    if (!featuredEvent) return "CultureLab Salon";
    return featuredEvent.title;
  }, [badgeText, featuredEvent]);

  useEffect(() => {
    setMounted(true);
    const forceRender = () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("resize"));
      }
    };
    forceRender();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setTimeout(forceRender, 100);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        window.dispatchEvent(new Event("scroll"));
      }
    }, 2000);
    // Force a couple of early re-mounts to avoid WebGL timing quirks
    setCanvasKey((k) => k + 1);
    const bump = setTimeout(() => setCanvasKey((k) => k + 1), 180);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
      clearTimeout(bump);
    };
  }, []);

  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32" style={{ willChange: "transform" }}>
      {mounted && (
        <Canvas
          key={canvasKey}
          className="absolute inset-0"
          camera={{ position: [0, 0, 3], fov: 38, near: 0.1, far: 50 }}
          dpr={[1, 1.4]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ pointerEvents: "none" }}
        >
          <Suspense
            fallback={
              <mesh>
                <sphereGeometry args={[0.24, 12, 12]} />
                <meshStandardMaterial color="#f2a65a" emissive="#f2a65a" emissiveIntensity={1.2} />
              </mesh>
            }
          >
            <WebGLContextManager />
            <ambientLight intensity={0.9} />
            <directionalLight
              position={[2, 2, 3]}
              intensity={1.2}
              color="#f4c27e"
            />
            <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
              <Glow />
              <Aura />
              <Tail />
              <Wings />
            </Float>
          </Suspense>
        </Canvas>
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
