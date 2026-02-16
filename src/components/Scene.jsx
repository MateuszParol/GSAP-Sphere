import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import * as THREE from 'three'
import Starfield from './Environment/Stars'
import ParticleSphere from './Sphere/ParticleSphere'
import Legend from './UI/Legend'
import Overlay from './UI/Overlay.jsx'
import ContactModal from './UI/ContactModal.jsx'
import { useTransition } from '../utils/TransitionContext'

// Custom component to animate post-processing effects


export default function Scene({ isWarping }) {
    const [activePoint, setActivePoint] = useState(null)
    const { navigateWithWarp } = useTransition()

    const handlePointClick = (point) => {
        // Map points to routes
        const routes = {
            'about': '/about',
            'works': '/projects',
            'contact': '/contact'
        }

        if (routes[point.id]) {
            // Navigate with Warp effect
            navigateWithWarp(routes[point.id])
        } else {
            // Default behavior for other points (e.g. socials or info)
            setActivePoint(point)
        }
    }

    const handleClose = () => {
        setActivePoint(null)
    }

    // Helper to check if point is a route to prevent overlay flashing before nav
    const routes = { 'about': '/about', 'works': '/projects', 'contact': '/contact' }

    const isContactOpen = activePoint?.id === 'contact' // This likely won't be used if we navigate away, but keeping for safety
    const isInfoOpen = activePoint && !routes[activePoint.id] // Only show overlay if it's NOT a route

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: false }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={!activePoint}
                    autoRotateSpeed={0.5}
                />
                <Starfield isWarping={isWarping} />
                <ParticleSphere onPointClick={handlePointClick} isWarping={isWarping} />


            </Canvas>

            <Legend />
            {isInfoOpen && <Overlay activePoint={activePoint} onClose={handleClose} />}
            <ContactModal isOpen={isContactOpen} onClose={handleClose} />
        </div>
    )
}
