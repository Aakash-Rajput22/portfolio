import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 900;

function buildPositions(count) {
  const array = new Float32Array(count * 3);
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    array[i3] = (rand() - 0.5) * 22;
    array[i3 + 1] = (rand() - 0.5) * 14;
    array[i3 + 2] = (rand() - 0.5) * 12;
  }
  return array;
}

function buildColors(count) {
  const array = new Float32Array(count * 3);
  const palette = [
    new THREE.Color("#8b5cf6"),
    new THREE.Color("#22d3ee"),
    new THREE.Color("#4f46e5"),
    new THREE.Color("#ffffff"),
  ];
  let seed = 4242;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    const color = palette[Math.floor(rand() * palette.length)];
    array[i3] = color.r;
    array[i3 + 1] = color.g;
    array[i3 + 2] = color.b;
  }
  return array;
}

const positions = buildPositions(PARTICLE_COUNT);
const colors = buildColors(PARTICLE_COUNT);

function Particles() {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    const pointer = state.pointer;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pointer.x * 0.8, 0.04);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, pointer.y * 0.5, 0.04);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowOrb() {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.5) * 0.4;
    ref.current.rotation.z = t * 0.1;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 2]} />
      <meshBasicMaterial color="#6d28d9" wireframe transparent opacity={0.16} />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <Particles />
        <GlowOrb />
      </Canvas>
    </div>
  );
}
