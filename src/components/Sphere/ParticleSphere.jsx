import React, { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { points } from '../../data/points'

export default function ParticleSphere({ onPointClick }) {
    const pointsRef = useRef()
    const meshRef = useRef()
    const hoverPoint = useRef(null)
    const { viewport } = useThree()

    // Config
    const radius = 1.8
    const threshold = 2.5

    // Touch Handling State
    const touchStart = useRef({ x: 0, y: 0, time: 0 })

    // Generate Geometry & Colors
    const { positions, originalPositions, colors, particleClusterMap } = useMemo(() => {
        // 1. BASE SPHERE (Low Resolution / Sparse)
        // Reduced from 64/92 to 48 for a cleaner, sparser background
        const baseGeometry = new THREE.SphereGeometry(radius, 64, 64)
        const basePosArray = baseGeometry.attributes.position.array
        const baseCount = basePosArray.length / 3

        // 2. CLUSTER INJECTION (High Density)
        // Add extra particles specifically around the interactive points
        const particlesPerCluster = 120
        const totalExtras = points.length * particlesPerCluster

        const totalCount = baseCount + totalExtras

        const combinedPositions = new Float32Array(totalCount * 3)
        const combinedOriginal = new Float32Array(totalCount * 3)
        const combinedColors = new Float32Array(totalCount * 3)
        // -1 means background, >=0 means cluster ID
        const combinedMap = new Int16Array(totalCount).fill(-1)

        const baseColor = new THREE.Color('#a5f3fc')

        // --- A. Process Base Sphere ---
        for (let i = 0; i < baseCount; i++) {
            // Apply organic jitter to base
            const jitter = 0.05
            const x = basePosArray[i * 3] + (Math.random() - 0.5) * jitter
            const y = basePosArray[i * 3 + 1] + (Math.random() - 0.5) * jitter
            const z = basePosArray[i * 3 + 2] + (Math.random() - 0.5) * jitter

            combinedPositions[i * 3] = x
            combinedPositions[i * 3 + 1] = y
            combinedPositions[i * 3 + 2] = z

            combinedOriginal[i * 3] = x
            combinedOriginal[i * 3 + 1] = y
            combinedOriginal[i * 3 + 2] = z

            combinedColors[i * 3] = baseColor.r * 0.4 // Dismiss background slightly
            combinedColors[i * 3 + 1] = baseColor.g * 0.4
            combinedColors[i * 3 + 2] = baseColor.b * 0.4

            // Base particles generally don't belong to clusters unless by pure chance,
            // but we leave them as background (-1) to ensure the Clusters are the "added" ones.
        }

        // --- B. Process Clusters ---
        let offset = baseCount

        points.forEach((point, pIndex) => {
            const pointColor = new THREE.Color(point.color)
            const targetPos = point.position // Vector3

            for (let j = 0; j < particlesPerCluster; j++) {
                const i = offset + j

                // Generate point ON SPHERE SURFACE near target
                // 1. Start with target vector
                const v = targetPos.clone()
                // 2. Add random spread (cluster radius)
                const spread = 0.35 // Tighter spread for dense buttons
                v.x += (Math.random() - 0.5) * spread
                v.y += (Math.random() - 0.5) * spread
                v.z += (Math.random() - 0.5) * spread

                // 3. Project back to sphere radius + jitter
                v.normalize().multiplyScalar(radius + (Math.random() - 0.5) * 0.05)

                combinedPositions[i * 3] = v.x
                combinedPositions[i * 3 + 1] = v.y
                combinedPositions[i * 3 + 2] = v.z

                combinedOriginal[i * 3] = v.x
                combinedOriginal[i * 3 + 1] = v.y
                combinedOriginal[i * 3 + 2] = v.z

                // Active Colors
                const intensity = 2.0
                combinedColors[i * 3] = pointColor.r * intensity
                combinedColors[i * 3 + 1] = pointColor.g * intensity
                combinedColors[i * 3 + 2] = pointColor.b * intensity

                // Mark membership
                combinedMap[i] = pIndex
            }
            offset += particlesPerCluster
        })

        return {
            positions: combinedPositions,
            originalPositions: combinedOriginal,
            colors: combinedColors,
            particleClusterMap: combinedMap
        }
    }, [])

    const tempVec = new THREE.Vector3()

    useFrame((state, delta) => {
        if (!pointsRef.current) return

        const positionsArray = pointsRef.current.geometry.attributes.position.array
        const time = state.clock.elapsedTime

        let activeClusterId = null
        if (hoverPoint.current) {
            for (const p of points) {
                const dist = hoverPoint.current.distanceTo(p.position)
                if (dist < 0.7) {
                    activeClusterId = p.id
                    document.body.style.cursor = 'pointer'
                    break
                }
            }
        }
        if (!activeClusterId) document.body.style.cursor = 'auto'

        for (let i = 0; i < positionsArray.length; i += 3) {
            const pIdx = i / 3

            tempVec.set(positionsArray[i], positionsArray[i + 1], positionsArray[i + 2])

            const ox = originalPositions[i]
            const oy = originalPositions[i + 1]
            const oz = originalPositions[i + 2]

            let targetX = ox
            let targetY = oy
            let targetZ = oz

            // Mouse Repulsion
            if (hoverPoint.current) {
                const dist = tempVec.distanceTo(hoverPoint.current)
                if (dist < threshold) {
                    const force = (threshold - dist) / threshold
                    const dx = hoverPoint.current.x - ox
                    const dy = hoverPoint.current.y - oy
                    const dz = hoverPoint.current.z - oz

                    const moveX = dx * force * 0.5
                    const moveY = dy * force * 0.5
                    const moveZ = dz * force * 0.5

                    const maxDisplacement = 0.3
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

            // Cluster Animation
            const clusterIndex = particleClusterMap[pIdx]
            if (clusterIndex !== -1) {
                const point = points[clusterIndex]
                const isActive = (activeClusterId === point.id)

                // Organic noise animation
                const breath = 1.05 + Math.sin(time * 2.0 + pIdx * 99.0) * 0.08
                const pop = isActive ? (0.1 + Math.sin(time * 12) * 0.05) : 0

                const scale = breath + pop
                targetX *= scale
                targetY *= scale
                targetZ *= scale
            }

            tempVec.x += (targetX - tempVec.x) * 3.0 * delta
            tempVec.y += (targetY - tempVec.y) * 3.0 * delta
            tempVec.z += (targetZ - tempVec.z) * 3.0 * delta

            positionsArray[i] = tempVec.x
            positionsArray[i + 1] = tempVec.y
            positionsArray[i + 2] = tempVec.z
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true
    })

    const handlePointerMove = (e) => {
        if (pointsRef.current) {
            const local = pointsRef.current.worldToLocal(e.point.clone())
            hoverPoint.current = local
        }
    }

    const handlePointerOut = () => {
        hoverPoint.current = null
        document.body.style.cursor = 'auto'
    }

    // --- CUSTOM TAP LOGIC ---
    const handlePointerDown = (e) => {
        touchStart.current = {
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        }
    }

    const handlePointerUp = (e) => {
        const deltaX = Math.abs(e.clientX - touchStart.current.x)
        const deltaY = Math.abs(e.clientY - touchStart.current.y)
        const deltaTime = Date.now() - touchStart.current.time

        // Criteria for a TAP (Mobile Friendly - Relaxed):
        // 1. Movement < 75 pixels (High DPI screens + shaky fingers)
        // 2. Duration < 600ms 
        const isTap = deltaX < 75 && deltaY < 75 && deltaTime < 600

        if (isTap && pointsRef.current) {
            // FIX: Use e.point directly instead of relying on hoverPoint (which requires Move)
            // This ensures "static taps" (without drag) work instantly
            const localPoint = pointsRef.current.worldToLocal(e.point.clone())

            for (const p of points) {
                const dist = localPoint.distanceTo(p.position)
                if (dist < 1.0) {
                    onPointClick(p)
                    return
                }
            }
        }
    }

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={colors.length / 3}
                        array={colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.045}
                    vertexColors={true}
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={1.0}
                    toneMapped={false}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Hitbox Mesh */}
            <mesh
                ref={meshRef}
                visible={true}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                <sphereGeometry args={[radius * 1.15, 32, 32]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.0}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}
