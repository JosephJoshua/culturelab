"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import type { Mesh } from "three";
import type { Event } from "@/types";

function Glow() {
  return (
    <mesh>
      <sphereGeometry args={[0.2, 36, 36]} />
      <meshStandardMaterial
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
  return (
    <mesh>
      <sphereGeometry args={[0.42, 24, 24]} />
      <meshStandardMaterial
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
  return (
    <group position={[0, -0.1, 0]}>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.03, 0.01, 0.18, 12]} />
        <meshStandardMaterial
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
  const agenda = useMemo(() => {
    if (badgeText) return badgeText;
    if (!featuredEvent) return "CultureLab Salon";
    return featuredEvent.title;
  }, [badgeText, featuredEvent]);

  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32">
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 3], fov: 38 }}
        dpr={[1, 2]}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[2, 2, 3]}
            intensity={1.1}
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
