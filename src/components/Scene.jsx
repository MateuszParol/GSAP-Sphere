import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Starfield from './Environment/Stars'
import ParticleSphere from './Sphere/ParticleSphere'
import Legend from './UI/Legend'
import Overlay from './UI/Overlay'
// import PostProcessing from './Effects/PostProcessing'

export default function Scene() {
    const [activePoint, setActivePoint] = useState(null)

    const handlePointClick = (point) => {
        setActivePoint(point)
    }

    const handleClose = () => {
        setActivePoint(null)
    }

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={!activePoint}
                    autoRotateSpeed={0.5}
                />
                <Starfield />
                <ParticleSphere onPointClick={handlePointClick} />
                {/* <PostProcessing /> */}
            </Canvas>

            <Legend />
            <Overlay activePoint={activePoint} onClose={handleClose} />
        </div>
    )
}
