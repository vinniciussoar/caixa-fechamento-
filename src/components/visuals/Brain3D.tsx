"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

const RIDGE_COLOR = new THREE.Color("#0d1d3a");
const GROOVE_COLOR = new THREE.Color("#caa257");
const GLOW_COLOR = new THREE.Color("#ffe9b8");
const BLACK_COLOR = new THREE.Color("#000000");

function buildBrainGeometry() {
  const geometry = new THREE.IcosahedronGeometry(1, 4);
  const simplex = new SimplexNoise();
  const position = geometry.attributes.position;
  const count = position.count;

  const solidColors = new Float32Array(count * 3);
  const glowColors = new Float32Array(count * 3);

  const dir = new THREE.Vector3();
  const shaped = new THREE.Vector3();
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    dir.fromBufferAttribute(position, i).normalize();

    const folds =
      simplex.noise3d(dir.x * 2.6, dir.y * 2.6, dir.z * 2.6) * 0.085 +
      simplex.noise3d(dir.x * 6, dir.y * 6, dir.z * 6) * 0.04 +
      simplex.noise3d(dir.x * 13, dir.y * 13, dir.z * 13) * 0.018;

    const topness = Math.max(dir.y, 0);
    const fissure = Math.exp(-((dir.x * 6.5) ** 2)) * topness * 0.2;

    const temporalBulge =
      Math.max(0, -dir.y * 0.6) *
      Math.exp(-(((Math.abs(dir.x) - 0.55) * 5) ** 2)) *
      0.05;

    const displacement = folds - fissure + temporalBulge;

    shaped.set(dir.x * 1.02, dir.y * 0.82, dir.z * 1.2);
    const radius = 1.32 * (1 + displacement);
    shaped.multiplyScalar(radius);

    position.setXYZ(i, shaped.x, shaped.y, shaped.z);

    const depth = THREE.MathUtils.clamp((displacement + 0.16) / 0.32, 0, 1);

    color.copy(RIDGE_COLOR).lerp(GROOVE_COLOR, depth);
    solidColors[i * 3] = color.r;
    solidColors[i * 3 + 1] = color.g;
    solidColors[i * 3 + 2] = color.b;

    const glowAmount = depth ** 3.2;
    color.copy(BLACK_COLOR).lerp(GLOW_COLOR, glowAmount);
    glowColors[i * 3] = color.r;
    glowColors[i * 3 + 1] = color.g;
    glowColors[i * 3 + 2] = color.b;
  }

  position.needsUpdate = true;
  geometry.setAttribute("color", new THREE.BufferAttribute(solidColors, 3));
  geometry.computeVertexNormals();

  const glowGeometry = geometry.clone();
  glowGeometry.setAttribute("color", new THREE.BufferAttribute(glowColors, 3));

  return { geometry, glowGeometry };
}

const NODES: [number, number, number][] = [
  [0.78, 0.78, 0.85],
  [-0.82, 0.7, 0.78],
  [0, 1.08, 0.65],
  [0.92, -0.35, 0.92],
  [-0.92, -0.28, 0.92],
];

const EDGES: [number, number][] = [
  [0, 2],
  [2, 1],
  [0, 3],
  [1, 4],
  [3, 4],
  [0, 1],
];

function SynapseNetwork() {
  const dotsRef = useRef<(THREE.Mesh | null)[]>([]);
  const halosRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    EDGES.forEach(([a, b], i) => {
      const speed = 0.32 + (i % 3) * 0.07;
      const phase = i * 0.6;
      const raw = (t * speed + phase) % 2;
      const tt = raw > 1 ? 2 - raw : raw;

      const pa = NODES[a];
      const pb = NODES[b];
      const x = pa[0] + (pb[0] - pa[0]) * tt;
      const y = pa[1] + (pb[1] - pa[1]) * tt;
      const z = pa[2] + (pb[2] - pa[2]) * tt;

      dotsRef.current[i]?.position.set(x, y, z);
      halosRef.current[i]?.position.set(x, y, z);
    });
  });

  return (
    <group>
      {EDGES.map(([a, b], i) => (
        <Line
          key={`line-${i}`}
          points={[NODES[a], NODES[b]]}
          color="#f6d9a0"
          transparent
          opacity={0.22}
          lineWidth={1}
        />
      ))}

      {EDGES.map((_, i) => (
        <group key={`pulse-${i}`}>
          <mesh ref={(el) => { halosRef.current[i] = el; }}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshBasicMaterial
              color="#ffe9b8"
              transparent
              opacity={0.25}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          <mesh ref={(el) => { dotsRef.current[i] = el; }}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#fff3d6" toneMapped={false} />
          </mesh>
        </group>
      ))}

      {NODES.map((p, i) => (
        <mesh key={`node-${i}`} position={p}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#f6d9a0" transparent opacity={0.6} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function BrainCore({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const aura = useRef<THREE.Mesh>(null);
  const glowMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const { pointer } = useThree();

  const { geometry, glowGeometry } = useMemo(() => buildBrainGeometry(), []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      glowGeometry.dispose();
    };
  }, [geometry, glowGeometry]);

  useFrame((state, delta) => {
    const p = progress.get();
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y += delta * 0.1 + pointer.x * delta * 0.4;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.18 - p * 0.3 + 0.12,
        0.06
      );
      group.current.position.y = Math.sin(t * 0.5) * 0.08 - p * 0.65;
      group.current.scale.setScalar(1 + p * 0.14 + Math.sin(t * 0.6) * 0.008);
    }

    if (aura.current) {
      aura.current.rotation.y -= delta * 0.06;
      aura.current.rotation.z += delta * 0.015;
    }

    if (glowMaterial.current) {
      glowMaterial.current.opacity = 0.5 + Math.sin(t * 1.3) * 0.22;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <mesh geometry={geometry}>
          <meshPhysicalMaterial
            vertexColors
            roughness={0.42}
            metalness={0.28}
            clearcoat={0.45}
            clearcoatRoughness={0.3}
            sheen={0.5}
            sheenColor="#d6ad60"
            emissive="#0b2147"
            emissiveIntensity={0.18}
          />
        </mesh>

        <mesh geometry={glowGeometry} scale={1.006}>
          <meshBasicMaterial
            ref={glowMaterial}
            vertexColors
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </Float>

      <mesh ref={aura} scale={1.72}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#4fa3e3" wireframe transparent opacity={0.12} />
      </mesh>

      <SynapseNetwork />

      <Sparkles count={120} scale={4} size={2} speed={0.3} color="#f1ddae" />
      <Sparkles count={60} scale={3} size={1.3} speed={0.45} color="#a9d6f5" />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 2, 4]} intensity={28} color="#d6ad60" />
      <pointLight position={[-4, -2, -3]} intensity={22} color="#4fa3e3" />
      <directionalLight position={[0, 4, 3]} intensity={1.1} color="#f8f6f0" />
    </>
  );
}

export function Brain3D({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <Lights />
        <BrainCore progress={progress} />
      </Suspense>
    </Canvas>
  );
}
