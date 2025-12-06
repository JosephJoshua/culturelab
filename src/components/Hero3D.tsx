"use client";

import { Float, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import type { Event } from "@/types";

function formatAgenda(event?: Event) {
  if (!event) return { title: "CultureLab Salon", meta: "小范围深聊" };
  const date = new Date(event.dateTime);
  const meta = `${date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" })} · ${event.location}`;
  return { title: event.title.slice(0, 22), meta };
}

function SalonVignette({ featuredEvent }: { featuredEvent?: Event }) {
  const agenda = formatAgenda(featuredEvent);
  return (
    <group>
      <Float speed={0.2} rotationIntensity={0.25} floatIntensity={0.1}>
        <group position={[0, -0.8, 0]}>
          {/* backdrop & skyline */}
          <mesh position={[0, 1.4, -0.9]}>
            <boxGeometry args={[5, 3, 0.1]} />
            <meshStandardMaterial
              color="#0f1a2a"
              roughness={0.6}
              metalness={0.05}
            />
          </mesh>
          <mesh position={[0, 0.35, -0.82]}>
            <boxGeometry args={[5, 0.7, 0.08]} />
            <meshStandardMaterial
              color="#121b2d"
              roughness={0.7}
              metalness={0.04}
            />
          </mesh>
          {[-2, -1, 0, 1, 2].map((i) => (
            <mesh
              key={`sky-${i}`}
              position={[i * 0.8, 0.8 + (i % 2) * 0.2, -0.78]}
            >
              <boxGeometry args={[0.35, 0.9 + (i % 2) * 0.4, 0.06]} />
              <meshStandardMaterial
                color="#182133"
                roughness={0.6}
                metalness={0.05}
              />
            </mesh>
          ))}

          {/* lamp */}
          <mesh position={[0, 2.4, 0]}>
            <sphereGeometry args={[0.28, 32, 32]} />
            <meshStandardMaterial
              emissive="#f2a65a"
              emissiveIntensity={1.5}
              color="#f2a65a"
            />
          </mesh>
          <pointLight
            position={[0, 2.4, 0]}
            intensity={2.4}
            color="#f2a65a"
            distance={9}
          />

          {/* rug & table */}
          <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[2.6, 48]} />
            <meshStandardMaterial
              color="#0c1425"
              roughness={0.82}
              metalness={0.04}
            />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[1.45, 1.45, 0.14, 64]} />
            <meshStandardMaterial
              color="#1c2638"
              roughness={0.35}
              metalness={0.15}
            />
          </mesh>
          <mesh position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.22, 0.35, 1.1, 32]} />
            <meshStandardMaterial
              color="#0f1829"
              roughness={0.6}
              metalness={0.08}
            />
          </mesh>
          <mesh position={[0, -0.95, 0]}>
            <cylinderGeometry args={[0.6, 0.7, 0.08, 48]} />
            <meshStandardMaterial
              color="#0a101f"
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>

          {/* chairs */}
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * Math.PI) / 2 + Math.PI / 6;
            const x = Math.cos(angle) * 1.9;
            const z = Math.sin(angle) * 1.9;
            return (
              <group
                key={`chair-${i}`}
                position={[x, -0.9, z]}
                rotation={[0, -angle + Math.PI, 0]}
              >
                <mesh position={[0, 0.4, 0]}>
                  <boxGeometry args={[0.9, 0.12, 0.9]} />
                  <meshStandardMaterial
                    color="#1a2234"
                    roughness={0.5}
                    metalness={0.1}
                  />
                </mesh>
                <mesh position={[0, 0.9, -0.36]}>
                  <boxGeometry args={[0.92, 1, 0.08]} />
                  <meshStandardMaterial
                    color="#131c2b"
                    roughness={0.55}
                    metalness={0.08}
                  />
                </mesh>
                {[
                  [-0.38, 0.2, 0.38],
                  [0.38, 0.2, 0.38],
                  [-0.38, 0.2, -0.38],
                  [0.38, 0.2, -0.38],
                ].map(([lx, ly, lz]) => (
                  <mesh key={`leg-${lx}-${lz}`} position={[lx, ly, lz]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.4, 10]} />
                    <meshStandardMaterial
                      color="#0f1829"
                      roughness={0.6}
                      metalness={0.05}
                    />
                  </mesh>
                ))}
              </group>
            );
          })}

          {/* tea set + notebooks + book */}
          <mesh position={[0.3, 0, 0.2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
            <meshStandardMaterial
              color="#f2a65a"
              roughness={0.35}
              metalness={0.2}
            />
          </mesh>
          <mesh position={[0.32, 0.05, 0.22]}>
            <sphereGeometry args={[0.06, 24, 24]} />
            <meshStandardMaterial
              color="#f7efe4"
              roughness={0.25}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[-0.5, 0.01, -0.1]} rotation={[0, 0.08, 0]}>
            <boxGeometry args={[0.24, 0.02, 0.32]} />
            <meshStandardMaterial color="#f7efe4" roughness={0.6} />
          </mesh>
          <mesh position={[0.6, 0.01, -0.2]} rotation={[0, -0.4, 0]}>
            <boxGeometry args={[0.18, 0.02, 0.24]} />
            <meshStandardMaterial color="#f2a65a" roughness={0.5} />
          </mesh>
          <mesh position={[-0.2, 0.015, 0.4]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.16, 0.02, 0.22]} />
            <meshStandardMaterial color="#58c0c9" roughness={0.5} />
          </mesh>
          <mesh position={[0.1, 0.03, -0.35]} rotation={[0.05, 0.1, 0]}>
            <boxGeometry args={[0.22, 0.02, 0.32]} />
            <meshStandardMaterial
              color="#1f2b3d"
              roughness={0.45}
              metalness={0.12}
            />
          </mesh>
          {/* coasters */}
          {[
            [-0.1, -0.05],
            [0.5, -0.15],
          ].map(([cx, cz]) => (
            <mesh key={`coaster-${cx}-${cz}`} position={[cx, 0.002, cz]}>
              <cylinderGeometry args={[0.12, 0.12, 0.01, 20]} />
              <meshStandardMaterial color="#2a3445" roughness={0.7} />
            </mesh>
          ))}

          {/* mic / recorder */}
          <mesh position={[0.05, 0.02, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
            <meshStandardMaterial
              color="#1f2b3d"
              roughness={0.5}
              metalness={0.18}
            />
          </mesh>
          <mesh position={[0.05, 0.14, 0.35]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial
              color="#f7efe4"
              roughness={0.35}
              metalness={0.1}
            />
          </mesh>

          {/* agenda card */}
          <mesh position={[-0.7, 0.02, 0.45]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6, 0.9]} />
            <meshStandardMaterial color="#111a2c" roughness={0.6} />
          </mesh>
          <Html
            position={[-0.7, 0.04, 0.45]}
            rotation={[-Math.PI / 2, 0, 0]}
            transform
            distanceFactor={4.2}
            style={{ pointerEvents: "none" }}
          >
            <div className="rounded-lg bg-[#111a2c]/90 p-2 text-xs leading-tight text-sand shadow-md shadow-black/50">
              <div className="font-semibold text-sand">{agenda.title}</div>
              <div className="text-[11px] text-muted">{agenda.meta}</div>
            </div>
          </Html>
        </group>
      </Float>

      {/* ground & pedestal */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[3.8, 3.8, 0.4, 64]} />
        <meshStandardMaterial
          color="#0b1220"
          roughness={0.82}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[3.4, 3.4, 0.6, 64]} />
        <meshStandardMaterial
          color="#0f1829"
          roughness={0.65}
          metalness={0.08}
        />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[3.1, 3.1, 0.12, 64]} />
        <meshStandardMaterial
          color="#1b2436"
          roughness={0.55}
          metalness={0.12}
        />
      </mesh>
    </group>
  );
}

export function Hero3D({ featuredEvent }: { featuredEvent?: Event }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative h-full min-h-[480px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1423] via-[#0b1020] to-[#0f182a] shadow-[0_40px_140px_-60px_rgba(0,0,0,0.8)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,166,90,0.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(88,192,201,0.18),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_45%)]" />
      {mounted ? (
        <Suspense
          fallback={
            <div
              className="absolute inset-0 animate-pulse rounded-3xl bg-white/5"
              aria-hidden="true"
            />
          }
        >
          <Canvas
            key="hero-3d"
            camera={{ position: [6.2, 3.6, 7], fov: 38 }}
            dpr={[1, 2]}
            resize={{ scroll: true, debounce: 0 }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[4.5, 4.5, 3]}
              intensity={1.15}
              color="#f2a65a"
            />
            <directionalLight
              position={[-3.5, 3.2, -2]}
              intensity={0.75}
              color="#58c0c9"
            />
            <SalonVignette featuredEvent={featuredEvent} />
            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={16}
              enableZoom
              autoRotate
              autoRotateSpeed={0.55}
            />
          </Canvas>
        </Suspense>
      ) : (
        <div
          className="absolute inset-0 animate-pulse rounded-3xl bg-white/5"
          aria-hidden="true"
        />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5" />
    </div>
  );
}
