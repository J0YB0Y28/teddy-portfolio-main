import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

function Geometries() {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = Math.cos(t / 2) / 2;
        group.current.rotation.y = Math.sin(t / 2) / 2;
        group.current.position.y = Math.sin(t / 1.5) / 2;
    });

    return (
        <group ref={group}>
            {/* Central Icosahedron */}
            <mesh position={[0, 0, 0]} scale={1.5}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    roughness={0.1}
                    metalness={0.8}
                    wireframe
                />
            </mesh>

            {/* Inner Solid Core */}
            <mesh position={[0, 0, 0]} scale={0.8}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    roughness={0.2}
                    metalness={1}
                />
            </mesh>

            {/* Floating Rings */}
            <mesh position={[1.5, -1, -1]} scale={0.5}>
                <torusGeometry args={[1, 0.2, 16, 32]} />
                <meshStandardMaterial color="#facc15" metalness={1} roughness={0} />
            </mesh>

            <mesh position={[-1.5, 1, 1]} scale={0.5}>
                <torusGeometry args={[1, 0.2, 16, 32]} />
                <meshStandardMaterial color="#ef4444" metalness={1} roughness={0} />
            </mesh>

        </group>
    );
}

export default function Interactive3D() {
    return (
        <div className="w-full h-[500px] cursor-pointer">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <Geometries />
                </Float>

                <Environment preset="city" />
                <ContactShadows position={[0, -2.2, 0]} opacity={0.8} scale={15} blur={1.5} far={10} color="#000000" />
            </Canvas>
        </div>
    );
}
