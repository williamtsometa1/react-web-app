"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";

function MeshComponent() {
  const fileUrl = "/models/testModel.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    // mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function RoomModel() {
  return (
    <div className='w-full' style={{height:'800px'}}>
      <Canvas className='w-full'>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[100, 100, 100]} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}