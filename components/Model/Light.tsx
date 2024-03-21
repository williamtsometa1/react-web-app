'use client';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import useLight from '@/Hooks/useLight';

function Light({ id }: { id: string }) {
  const { switchLight } = useLight();

  const texture = useLoader(TextureLoader, '/imgs/point_air_purifier.png'); // Load the PNG texture

  return (
    <mesh
      position={[-1.5, 0.7, 2.9]}
      onClick={() => {
        switchLight(id);
      }}
    >
      <planeGeometry args={[3, 3]} /> {/* Adjust size as needed */}
      <meshBasicMaterial map={texture} transparent />{' '}
      {/* Apply the texture to a plane */}
    </mesh>
  );
}

export default Light;
