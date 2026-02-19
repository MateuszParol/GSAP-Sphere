import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

const CameraController = ({ isWarping }) => {
    const { camera } = useThree(); // [FIX] Restore camera access
    // Parallax and Position logic REMOVED to avoid conflict with OrbitControls
    // and to respect the new starting position (z=15).

    // Only handling Warp FOV effects here.

    // Config
    const WARP_FOV = 120;           // FOV during warp
    const BASE_FOV = 75;            // Default FOV

    // Handle Warp Effect via GSAP (FOV change)
    useEffect(() => {
        if (isWarping) {
            gsap.to(camera, {
                fov: WARP_FOV,
                duration: 2,
                ease: "power2.in",
                onUpdate: () => camera.updateProjectionMatrix()
            });
        } else {
            gsap.to(camera, {
                fov: BASE_FOV,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => camera.updateProjectionMatrix()
            });
        }
    }, [isWarping, camera]);

    return null;
};

export default CameraController;
