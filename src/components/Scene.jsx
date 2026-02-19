import React, { useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

import CameraController from './CameraController';
import Starfield from './Environment/Stars'
import ParticleSphere from './Sphere/ParticleSphere'
import Overlay from './UI/Overlay.jsx'
import ContactModal from './UI/ContactModal.jsx'
import { useHUDStore } from '../utils/hudStore'
import { useTransition } from '../utils/TransitionContext'

// Component to sync Camera Rotation with HUD Store
function CompassUpdater() {
    const setHeading = useHUDStore((state) => state.setHeading)
    const setPitch = useHUDStore((state) => state.setPitch)
    const { camera } = useThree()

    useFrame(() => {
        if (!camera) return;

        const vector = new THREE.Vector3(0, 0, -1);
        vector.applyQuaternion(camera.quaternion);

        // Heading (Azimuth)
        const theta = Math.atan2(vector.x, vector.z);
        let deg = THREE.MathUtils.radToDeg(theta);
        if (deg < 0) deg += 360;
        setHeading(deg);

        // Pitch (Elevation)
        const y = Math.max(-1, Math.min(1, vector.y));
        const phi = Math.asin(y);
        const pitchDeg = THREE.MathUtils.radToDeg(phi);
        setPitch(pitchDeg);
    })
    return null
}

export default function Scene({ isWarping, isSystemReady }) {
    const [activePoint, setActivePoint] = useState(null)
    const controlsRef = useRef(null) // Ref for controls
    const { navigateWithWarp } = useTransition()

    const handlePointClick = (point) => {
        // Map points to routes
        // Centralized route definition
        const routes = {
            'about': '/about',
            'works': '/projects',
            'contact': '/contact',
            'offer': '/offer'
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
    const routes = { 'about': '/about', 'works': '/projects', 'contact': '/contact', 'offer': '/offer' }

    const isContactOpen = activePoint?.id === 'contact' // This likely won't be used if we navigate away, but keeping for safety
    const isInfoOpen = activePoint && !routes[activePoint.id] // Only show overlay if it's NOT a route

    // Distance configuration
    const CAMERA_DIST = 6;

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas camera={{ position: [0, 0, CAMERA_DIST], fov: 75 }} gl={{ antialias: false }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                <OrbitControls
                    ref={controlsRef}
                    makeDefault
                    enabled={isSystemReady} // Enable as soon as system is ready
                    enableZoom={false}      // Lock zoom
                    enablePan={false}       // Lock pan
                    enableDamping={true}    // Smooth rotation
                    dampingFactor={0.05}
                    minDistance={CAMERA_DIST}       // Closer fix
                    maxDistance={CAMERA_DIST}       // Closer fix
                    autoRotate={isSystemReady && !activePoint}
                    autoRotateSpeed={0.5}
                />

                {/* Standard Content without Parallax */}
                <Starfield isWarping={isWarping} />
                <ParticleSphere onPointClick={handlePointClick} isWarping={isWarping} />

                <CompassUpdater />

                <CameraController
                    isWarping={isWarping}
                />

                {/* Performance Monitor (toggle via ?debug=true) */}
                {window.location.search.includes('debug=true') && <Perf position="top-left" />}
            </Canvas>

            {/* <Legend /> Removed per user request */}
            {isInfoOpen && <Overlay activePoint={activePoint} onClose={handleClose} />}
            <ContactModal isOpen={isContactOpen} onClose={handleClose} />
        </div>
    )
}
