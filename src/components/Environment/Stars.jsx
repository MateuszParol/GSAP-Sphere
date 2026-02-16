import React from 'react'
import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Starfield({ isWarping }) {
    // const { isWarping } = useTransition() || {}; // REMOVED: Passed via props now


    const targetSpeed = isWarping ? 50 : 1;
    const [speed, setSpeed] = React.useState(1);

    useFrame((state, delta) => {
        // Smoothly interpolate speed
        setSpeed(prev => THREE.MathUtils.lerp(prev, targetSpeed, delta * 2));
    });

    return (
        <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={speed}
        />
    )
}
