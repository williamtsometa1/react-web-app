'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh } from 'three';
import { useState } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { useAppExampleContext } from '@/Contexts/AppExampleContext';
import cloneDeep from 'lodash/cloneDeep';
import useLight from '@/Hooks/useLight';
import Light from './Light';

export default function RoomModel() {
  const { state, dispatch } = useAppExampleContext();

  function BaseModel() {
    const fileUrl = '/models/scene.gltf';
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);

    useFrame(() => {
      // mesh.current.rotation.y += 0.01;
    });

    return (
      <mesh ref={mesh} position={[0, 10, 0]}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }

  return (
    <div className='w-full' style={{ height: '100vh' }}>
      <Canvas className='w-full' camera={{ position: [0, 20, 18] }}>
        <OrbitControls />
        <directionalLight color='white' position={[200, 400, 5]} />
        <ambientLight intensity={0.8} color='#EDEAE4' />
        <BaseModel />
        <Light id='light1' position={[5, 12, 6]} />
      </Canvas>
    </div>
  );
}
