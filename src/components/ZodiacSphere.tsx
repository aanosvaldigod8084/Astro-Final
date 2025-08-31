import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Ring, Text3D, OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';

function RotatingSphere() {
  const meshRef = useRef<Mesh>(null!);
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += delta * 0.1;
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#C9A96E" 
        metalness={0.8} 
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

function ZodiacRing() {
  const ringRef = useRef<Mesh>(null!);
  
  useFrame((state, delta) => {
    ringRef.current.rotation.z += delta * 0.5;
  });

  return (
    <Ring ref={ringRef} args={[3, 3.2, 64]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color="#7C3AED" 
        metalness={0.6} 
        roughness={0.3}
        transparent
        opacity={0.6}
      />
    </Ring>
  );
}

function FloatingSymbols() {
  const symbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  
  return (
    <>
      {symbols.map((symbol, index) => {
        const angle = (index / symbols.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Text3D
            key={index}
            font="/fonts/gentilis_regular.typeface.json"
            size={0.3}
            height={0.1}
            position={[x, 0, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            {symbol}
            <meshStandardMaterial color="#C9A96E" />
          </Text3D>
        );
      })}
    </>
  );
}

export default function ZodiacSphere() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#C9A96E" />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#7C3AED" />
        
        <RotatingSphere />
        <ZodiacRing />
        <FloatingSymbols />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}