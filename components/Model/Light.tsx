'use client';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import useLight from '@/Hooks/useLight';
import { useAppExampleContext } from '@/Contexts/AppExampleContext';

function Light({ id, position }: { id: string; position?: any }) {
  const { switchLight } = useLight();

  const texture = useLoader(TextureLoader, '/imgs/lightings_device@3x.png'); // Load the PNG texture

  const { state, dispatch } = useAppExampleContext();

  return (
    <>
      <pointLight
        color='#EDEAE4'
        position={position}
        intensity={
          state.light['light1'].status ? state.light['light1'].intensity : 0
        }
      />

      <mesh
        position={position}
        onClick={() => {
          switchLight(id);
        }}
      >
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

export default Light;
