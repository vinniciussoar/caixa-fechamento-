"use client";

/* eslint-disable react-hooks/refs --
   React Three Fiber is imperative by design: geometries/materials held in
   refs are mutated every frame inside useFrame and read when building the
   scene graph. This React Compiler rule doesn't model that WebGL pattern. */

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

const GOLD = new THREE.Color("#e6c069");
const GOLD_LIGHT = new THREE.Color("#f6e3b0");
const SERENITY = new THREE.Color("#a9d6f5");

const NODE_COUNT = 220;
const NEIGHBORS = 2;
const PULSE_COUNT = 14;
const SHAPE = new THREE.Vector3(1.18, 0.98, 1.18);
const BASE_RADIUS = 1.62;

type Route = { a: number; b: number; phase: number; speed: number };

function makeDiscTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,240,210,0.85)");
  gradient.addColorStop(1, "rgba(255,240,210,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function buildNetwork() {
  const nodes: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    const jitter = 0.9 + Math.random() * 0.18;
    const v = new THREE.Vector3(
      Math.cos(theta) * ring,
      y,
      Math.sin(theta) * ring
    )
      .multiply(SHAPE)
      .multiplyScalar(BASE_RADIUS * jitter);
    nodes.push(v);
  }

  // Node positions + colors
  const nodePositions = new Float32Array(NODE_COUNT * 3);
  const nodeColors = new Float32Array(NODE_COUNT * 3);
  const color = new THREE.Color();
  nodes.forEach((v, i) => {
    nodePositions[i * 3] = v.x;
    nodePositions[i * 3 + 1] = v.y;
    nodePositions[i * 3 + 2] = v.z;
    const t = (v.y / (BASE_RADIUS * SHAPE.y) + 1) / 2;
    color.copy(SERENITY).lerp(GOLD, THREE.MathUtils.clamp(t * 0.85 + 0.15, 0, 1));
    if (Math.random() > 0.78) color.lerp(GOLD_LIGHT, 0.6);
    nodeColors[i * 3] = color.r;
    nodeColors[i * 3 + 1] = color.g;
    nodeColors[i * 3 + 2] = color.b;
  });

  // Edges: connect nearest neighbors
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < NODE_COUNT; j++) {
      if (i === j) continue;
      dists.push([j, nodes[i].distanceToSquared(nodes[j])]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    for (let n = 0; n < NEIGHBORS; n++) {
      const j = dists[n][0];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      edges.push([i, j]);
    }
  }

  const linePositions = new Float32Array(edges.length * 2 * 3);
  edges.forEach(([a, b], i) => {
    const va = nodes[a];
    const vb = nodes[b];
    linePositions[i * 6] = va.x;
    linePositions[i * 6 + 1] = va.y;
    linePositions[i * 6 + 2] = va.z;
    linePositions[i * 6 + 3] = vb.x;
    linePositions[i * 6 + 4] = vb.y;
    linePositions[i * 6 + 5] = vb.z;
  });

  // Pulses traveling along a subset of edges
  const routes: Route[] = [];
  for (let i = 0; i < PULSE_COUNT; i++) {
    const edge = edges[Math.floor(Math.random() * edges.length)];
    routes.push({
      a: edge[0],
      b: edge[1],
      phase: Math.random() * 2,
      speed: 0.25 + Math.random() * 0.35,
    });
  }
  const pulsePositions = new Float32Array(PULSE_COUNT * 3);

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
  nodeGeometry.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

  const pulseGeometry = new THREE.BufferGeometry();
  pulseGeometry.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));

  return { nodes, nodeGeometry, lineGeometry, pulseGeometry, pulsePositions, routes };
}

function NeuralNetwork({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Sprite>(null);
  const coreMatRef = useRef<THREE.SpriteMaterial>(null);
  const { pointer } = useThree();

  // Refs are the sanctioned mutable containers — required because the
  // network buffers and materials are mutated every frame in useFrame.
  const discRef = useRef<THREE.CanvasTexture | null>(null);
  if (discRef.current === null) discRef.current = makeDiscTexture();
  const disc = discRef.current;

  const networkRef = useRef<ReturnType<typeof buildNetwork> | null>(null);
  if (networkRef.current === null) networkRef.current = buildNetwork();
  const network = networkRef.current;

  useEffect(() => {
    return () => {
      disc.dispose();
      network.nodeGeometry.dispose();
      network.lineGeometry.dispose();
      network.pulseGeometry.dispose();
    };
  }, [disc, network]);

  useFrame((state, delta) => {
    const p = progress.get();
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y += delta * 0.075 + pointer.x * delta * 0.3;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.16 - p * 0.3 + 0.05,
        0.05
      );
      group.current.position.y = Math.sin(t * 0.4) * 0.06 - p * 0.6;
      group.current.scale.setScalar(1 + p * 0.14 + Math.sin(t * 0.5) * 0.012);
    }

    for (let i = 0; i < network.routes.length; i++) {
      const r = network.routes[i];
      const raw = (t * r.speed + r.phase) % 2;
      const tt = raw > 1 ? 2 - raw : raw;
      const a = network.nodes[r.a];
      const b = network.nodes[r.b];
      network.pulsePositions[i * 3] = a.x + (b.x - a.x) * tt;
      network.pulsePositions[i * 3 + 1] = a.y + (b.y - a.y) * tt;
      network.pulsePositions[i * 3 + 2] = a.z + (b.z - a.z) * tt;
    }
    network.pulseGeometry.attributes.position.needsUpdate = true;

    if (coreRef.current && coreMatRef.current) {
      coreRef.current.scale.setScalar(2.4 + Math.sin(t * 1.1) * 0.2);
      coreMatRef.current.opacity = 0.42 + Math.sin(t * 1.1) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <sprite ref={coreRef} scale={2.4}>
        <spriteMaterial
          ref={coreMatRef}
          map={disc}
          color="#e8c27a"
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <lineSegments geometry={network.lineGeometry}>
        <lineBasicMaterial
          color="#d6ad60"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points geometry={network.nodeGeometry}>
        <pointsMaterial
          map={disc}
          size={0.085}
          vertexColors
          transparent
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points geometry={network.pulseGeometry}>
        <pointsMaterial
          map={disc}
          size={0.2}
          color="#fff1d2"
          transparent
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <Sparkles count={90} scale={4.4} size={2} speed={0.25} color="#f1ddae" />
      <Sparkles count={50} scale={3.4} size={1.3} speed={0.4} color="#a9d6f5" />
    </group>
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
        <ambientLight intensity={0.6} />
        <NeuralNetwork progress={progress} />
      </Suspense>
    </Canvas>
  );
}
