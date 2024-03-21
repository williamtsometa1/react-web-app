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
      <mesh ref={mesh}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }

  return (
    <div className='w-full' style={{ height: '800px' }}>
      <Canvas className='w-full' camera={{ position: [0, 10, 10] }}>
        {/* <Environment preset='modelviewer' background /> */}
        <OrbitControls />
        <ambientLight intensity={0.5} color='#EDEAE4' />
        {/* Increased intensity */}
        <pointLight
          color='#EDEAE4'
          position={[-1.5, 0.7, 2.9]}
          intensity={
            state.light['light1'].status ? state.light['light1'].intensity : 0
          }
        />
        <BaseModel />
        <Light id='light1' />
      </Canvas>
    </div>
  );
}
