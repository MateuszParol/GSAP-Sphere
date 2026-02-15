import React from 'react'
import { Canvas } from '@react-three/fiber'
import Starfield from './Environment/Stars'
import MainSphere from './Sphere/MainSphere'

export default function Scene() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Starfield />
                <MainSphere />
            </Canvas>
        </div>
    )
}
