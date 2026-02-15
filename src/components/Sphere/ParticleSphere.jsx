import React, { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleSphere() {
    const pointsRef = useRef()
    const meshRef = useRef() // Ref for the hidden interaction sphere
    const hoverPoint = useRef(null) // Stores the interaction point in LOCAL space

    // Generate points on a sphere
    const count = 64 // Segments
    const radius = 1.8
    const { positions, originalPositions } = useMemo(() => {
        const geometry = new THREE.SphereGeometry(radius, count, count)
        const positions = geometry.attributes.position.array
        // Clone positions to keep track of original state for "spring back" effect
        const originalPositions = new Float32Array(positions)
        return { positions, originalPositions }
    }, [])

    // Dummy vectors for calculations
    const tempVec = new THREE.Vector3()
    // const localPoint = new THREE.Vector3()

    useFrame((state, delta) => {
        if (!pointsRef.current) return

        const positionsArray = pointsRef.current.geometry.attributes.position.array

        // Config
        const threshold = 2.5 // Interaction radius
        const strength = 15.0 // Attraction strength (force multiplier)
        const returnSpeed = 3.0 // How fast particles return to origin

        for (let i = 0; i < positionsArray.length; i += 3) {
            // 1. Get Current Position
            tempVec.set(positionsArray[i], positionsArray[i + 1], positionsArray[i + 2])

            // 2. Get Target Position (Origin)
            const ox = originalPositions[i]
            const oy = originalPositions[i + 1]
            const oz = originalPositions[i + 2]

            let targetX = ox
            let targetY = oy
            let targetZ = oz

            // 3. Apply Interaction (if hovering)
            // 3. Apply Interaction (if hovering)
            if (hoverPoint.current) {
                const dist = tempVec.distanceTo(hoverPoint.current)

                if (dist < threshold) {
                    const force = (threshold - dist) / threshold

                    // Vector from Origin to Hover Point (Direction of attraction)
                    const dx = hoverPoint.current.x - ox
                    const dy = hoverPoint.current.y - oy
                    const dz = hoverPoint.current.z - oz

                    // Calculate proposed displacement
                    // Using a lower strength multiplier for subtle effect
                    const moveX = dx * force * 0.5
                    const moveY = dy * force * 0.5
                    const moveZ = dz * force * 0.5

                    // CLAMPING: Limit the maximum distance a particle can travel from its origin
                    const maxDisplacement = 0.3 // Maximum units a particle can shift
                    const currentDisp = Math.sqrt(moveX * moveX + moveY * moveY + moveZ * moveZ)

                    if (currentDisp > maxDisplacement) {
                        const scale = maxDisplacement / currentDisp
                        targetX += moveX * scale
                        targetY += moveY * scale
                        targetZ += moveZ * scale
                    } else {
                        targetX += moveX
                        targetY += moveY
                        targetZ += moveZ
                    }
                }
            }

            // 4. Physics Step: Move Current towards Target (Lerp for smooth return/movement)
            // This ensures that when hover is gone, target becomes origin, and it smoothly returns.
            tempVec.x += (targetX - tempVec.x) * returnSpeed * delta
            tempVec.y += (targetY - tempVec.y) * returnSpeed * delta
            tempVec.z += (targetZ - tempVec.z) * returnSpeed * delta

            // Write back
            positionsArray[i] = tempVec.x
            positionsArray[i + 1] = tempVec.y
            positionsArray[i + 2] = tempVec.z
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true
    })

    const handlePointerMove = (e) => {
        // e.point is in World Space
        // Convert to Local Space of the Points object
        if (pointsRef.current) {
            // Clone the point to avoid mutation issues
            const local = pointsRef.current.worldToLocal(e.point.clone())
            hoverPoint.current = local
        }
    }

    const handlePointerOut = () => {
        hoverPoint.current = null
    }

    return (
        <group>
            {/* The Visible Particles */}
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
                    size={0.035} // Slightly bigger
                    color="#a5f3fc"
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.8}
                />
            </points>

            {/* The Interaction Mesh (Hidden Hitbox) */}
            {/* Must be slightly larger or same size to catch events */}
            <mesh
                ref={meshRef}
                visible={false}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerOut}
            >
                <sphereGeometry args={[radius, 32, 32]} />
                <meshBasicMaterial transparent opacity={0.0} />
            </mesh>
        </group>
    )
}
