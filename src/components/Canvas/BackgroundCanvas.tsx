'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function AnimatedBlob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, -5]} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#4285F4"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      <mesh position={[-3, 1, -4]} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#EA4335"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>

      <mesh position={[1, -2, -6]} scale={2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#FBBC05"
          attach="material"
          distort={0.3}
          speed={2.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh position={[-1.5, 2.5, -7]} scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#34A853"
          attach="material"
          distort={0.45}
          speed={1.8}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} color="#34A853" intensity={0.5} />
          
          <AnimatedBlob />
          
          <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.3} color="#ffffff" />
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
