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
    const controlsRef = useRef(null)
    const { navigateWithGlitch } = useTransition()

    const handlePointClick = (point) => {
        const routes = {
            'about': '/about',
            'works': '/projects',
            'contact': '/contact',
            'offer': '/offer'
        }

        if (routes[point.id]) {
            navigateWithGlitch(routes[point.id])
        } else {
            setActivePoint(point)
        }
    }

    const handleClose = () => {
        setActivePoint(null)
    }

    const routes = { 'about': '/about', 'works': '/projects', 'contact': '/contact', 'offer': '/offer' }
    const isContactOpen = activePoint?.id === 'contact'
    const isInfoOpen = activePoint && !routes[activePoint.id]

    // Distance configuration
    const CAMERA_DIST = 6;

    return (
        <div style={{ width: '100vw', height: '100dvh', position: 'relative' }}>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, CAMERA_DIST], fov: 75 }} gl={{ antialias: false }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                <OrbitControls
                    ref={controlsRef}
                    makeDefault
                    enabled={isSystemReady}
                    enableZoom={false}
                    enablePan={false}
                    enableDamping={true}
                    dampingFactor={0.05}
                    minDistance={CAMERA_DIST}
                    maxDistance={CAMERA_DIST}
                    autoRotate={isSystemReady && !activePoint}
                    autoRotateSpeed={0.5}
                />

                <Starfield isWarping={isWarping} />
                <ParticleSphere onPointClick={handlePointClick} isWarping={isWarping} />

                <CompassUpdater />

                <CameraController
                    isWarping={isWarping}
                />

                {window.location.search.includes('debug=true') && <Perf position="top-left" />}
            </Canvas>

            {isInfoOpen && <Overlay activePoint={activePoint} onClose={handleClose} />}
            <ContactModal isOpen={isContactOpen} onClose={handleClose} />
        </div>
    )
}
