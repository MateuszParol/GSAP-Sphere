import React, { useState, useRef } from 'react';
import { Html, Edges } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

const FeaturePoint = ({ position, label, onClick, color = '#00ffff' }) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();
    const outerRef = useRef();

    // Adjusted scale and intensity for a more refined look
    const { scale, emissiveIntensity } = useSpring({
        scale: hovered ? 1.2 : 1.0,
        emissiveIntensity: hovered ? 2.5 : 0.8,
        config: { tension: 300, friction: 15 }
    });

    useFrame((state, delta) => {
        if (outerRef.current) {
            outerRef.current.rotation.z -= delta * 0.2; // Slower rotation
            outerRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <group position={position} lookAt={[0, 0, 0]}>
            <animated.group
                scale={scale}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                {/* Core Sphere (Smaller) */}
                <mesh ref={meshRef}>
                    <sphereGeometry args={[0.06, 32, 32]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={emissiveIntensity}
                        toneMapped={false}
                    />
                </mesh>

                {/* Outer Rotating Cage with Thinner Lines */}
                <mesh ref={outerRef}>
                    <icosahedronGeometry args={[0.12, 0]} />
                    <meshBasicMaterial transparent opacity={0} />
                    <Edges
                        scale={1}
                        threshold={15}
                        color={color}
                        linewidth={1} // Thinner, crisp lines
                        transparent
                        opacity={0.6} // Slight transparency for elegance
                    />
                </mesh>

                {/* Subtle Glow */}
                <pointLight distance={0.8} intensity={1.5} color={color} />

                {/* HITBOX (Invisible) - Larger area for easier touch/hover */}
                <mesh visible={false}>
                    <sphereGeometry args={[0.3, 16, 16]} />
                    <meshBasicMaterial />
                </mesh>

            </animated.group>

            {hovered && (
                <Html distanceFactor={8} zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
                    <div style={{
                        background: 'rgba(5, 15, 25, 0.9)',
                        backdropFilter: 'blur(4px)',
                        border: `1px solid ${color}80`, // More subtle border
                        borderLeft: `3px solid ${color}`,
                        padding: '8px 16px',
                        borderRadius: '4px', // Less rounded
                        color: '#fff',
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: '0.85rem', // Slightly smaller text
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        transform: 'translate3d(25px, -50%, 0)',
                        boxShadow: `0 0 15px ${color}40`,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <div style={{
                            width: '6px',
                            height: '6px',
                            background: color,
                            borderRadius: '50%',
                            boxShadow: `0 0 6px ${color}`
                        }}></div>
                        {label}
                    </div>
                </Html>
            )}
        </group>
    );
};

export default FeaturePoint;
