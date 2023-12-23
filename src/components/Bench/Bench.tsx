import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {BenchModel} from "./BenchModel";

export default function App() {
  return (
    <Canvas
      camera={{ fov: 75, position: [-10, 10, -10]}}
      className="w-screen h-screen"
    >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <BenchModel />
      </Suspense>
      <OrbitControls autoRotate />
    </Canvas>
  );
}