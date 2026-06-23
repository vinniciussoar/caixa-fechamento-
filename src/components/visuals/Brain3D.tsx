"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

function BrainCore({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const synapses = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const p = progress.get();

    if (group.current) {
      group.current.rotation.y += delta * 0.12 + pointer.x * delta * 0.5;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.22 - p * 0.35,
        0.06
      );
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.08 - p * 0.65;
      group.current.scale.setScalar(1 + p * 0.16);
    }

    if (shell.current) {
      shell.current.rotation.y -= delta * 0.08;
      shell.current.rotation.z += delta * 0.02;
    }

    if (synapses.current) {
      synapses.current.rotation.y += delta * 0.05;
      synapses.current.rotation.x -= delta * 0.03;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh scale={[1, 0.86, 1.12]}>
          <icosahedronGeometry args={[1.4, 4]} />
          <MeshDistortMaterial
            color="#123163"
            emissive="#d6ad60"
            emissiveIntensity={0.16}
            distort={0.38}
            speed={1.7}
            roughness={0.22}
            metalness={0.45}
            clearcoat={0.6}
          />
        </mesh>
      </Float>

      <mesh ref={shell} scale={1.58}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#4fa3e3" wireframe transparent opacity={0.18} />
      </mesh>

      <mesh ref={synapses} scale={1.9} rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#f1ddae" wireframe transparent opacity={0.08} />
      </mesh>

      <Sparkles count={140} scale={4.2} size={2.2} speed={0.3} color="#f1ddae" />
      <Sparkles count={70} scale={3.2} size={1.4} speed={0.5} color="#a9d6f5" />
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
