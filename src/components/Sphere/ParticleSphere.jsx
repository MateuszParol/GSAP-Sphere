import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleSphere() {
    const pointsRef = useRef()
    const { viewport } = useThree()

    // Generate points on a sphere
    const { positions, originalPositions } = useMemo(() => {
        const geometry = new THREE.SphereGeometry(1.8, 64, 64)
        const positions = geometry.attributes.position.array
        // Clone positions to keep track of original state for "spring back" effect
        const originalPositions = new Float32Array(positions)
        return { positions, originalPositions }
    }, [])

    // Dummy vector for calculations to avoid GC
    const tempVec = new THREE.Vector3()
    const mouseVec = new THREE.Vector3()

    useFrame((state, delta) => {
        if (!pointsRef.current) return

        // Pointer interaction
        // Project pointer to 3D space (approximate depth at sphere)
        mouseVec.set(state.pointer.x * viewport.width / 2, state.pointer.y * viewport.height / 2, 0)

        const positionsArray = pointsRef.current.geometry.attributes.position.array

        for (let i = 0; i < positionsArray.length; i += 3) {
            // Current particle position (local space, but we assume mesh is at 0,0,0)
            tempVec.set(originalPositions[i], originalPositions[i + 1], originalPositions[i + 2])

            // Apply rotation to match current mesh rotation to get world position relative to mouse
            mouseVec.set(state.pointer.x * viewport.width / 2, state.pointer.y * viewport.height / 2, 2) // Assume mouse is "in front"
            mouseVec.applyMatrix4(pointsRef.current.matrixWorld.clone().invert())

            const dist = tempVec.distanceTo(mouseVec)
            const threshold = 2.5 // INCREASED INTERACTION RADIUS (was 1.5)

            if (dist < threshold) {
                // Pull towards mouse
                const force = (threshold - dist) / threshold
                tempVec.lerp(mouseVec, force * 0.8) // INCREASED FORCE (was 0.2)
            } else {
                // Return to original
                tempVec.set(originalPositions[i], originalPositions[i + 1], originalPositions[i + 2])
            }

            // Read/Write buffer
            positionsArray[i] = tempVec.x
            positionsArray[i + 1] = tempVec.y
            positionsArray[i + 2] = tempVec.z
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                color="#a5f3fc"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.8}
            />
        </points>
    )
}
