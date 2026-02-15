import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { points } from '../../data/points'

export default function ParticleSphere({ onPointClick }) {
    const pointsRef = useRef()
    const meshRef = useRef()
    const hoverPoint = useRef(null)

    // Config
    const count = 64 // Segments
    const radius = 1.8
    const threshold = 2.5
    const interactionRadius = 0.3 // Radius to consider a particle part of a "cluster"

    // Generate Geometry & Colors
    const { positions, originalPositions, colors, clusterIndices } = useMemo(() => {
        const geometry = new THREE.SphereGeometry(radius, count, count)
        const posArray = geometry.attributes.position.array
        const countPoints = posArray.length / 3

        const originalPositions = new Float32Array(posArray)
        const colors = new Float32Array(countPoints * 3)
        const clusterIndices = {} // Map pointID -> array of particle indices

        const baseColor = new THREE.Color('#a5f3fc')

        // 1. Initialize all to base color
        for (let i = 0; i < countPoints; i++) {
            colors[i * 3] = baseColor.r
            colors[i * 3 + 1] = baseColor.g
            colors[i * 3 + 2] = baseColor.b
        }

        // 2. Identify clusters for each defined Point
        points.forEach(point => {
            clusterIndices[point.id] = []
            const pointColor = new THREE.Color(point.color)

            for (let i = 0; i < countPoints; i++) {
                const px = posArray[i * 3]
                const py = posArray[i * 3 + 1]
                const pz = posArray[i * 3 + 2]

                const dist = Math.sqrt(
                    Math.pow(px - point.position.x, 2) +
                    Math.pow(py - point.position.y, 2) +
                    Math.pow(pz - point.position.z, 2)
                )

                if (dist < interactionRadius) {
                    // Mark as part of cluster
                    clusterIndices[point.id].push(i * 3)

                    // Set color
                    colors[i * 3] = pointColor.r
                    colors[i * 3 + 1] = pointColor.g
                    colors[i * 3 + 2] = pointColor.b
                }
            }
        })

        return { positions: posArray, originalPositions, colors, clusterIndices }
    }, [])

    // Dummy vars
    const tempVec = new THREE.Vector3()
    const colorHelper = new THREE.Color()

    useFrame((state, delta) => {
        if (!pointsRef.current) return

        const positionsArray = pointsRef.current.geometry.attributes.position.array
        // const colorsArray = pointsRef.current.geometry.attributes.color.array // If we want dynamic color updates

        // Check active cluster based on hoverPoint
        let activeClusterId = null
        if (hoverPoint.current) {
            for (const p of points) {
                const dist = hoverPoint.current.distanceTo(p.position)
                if (dist < 0.5) { // Hover tolerance for the cluster center
                    activeClusterId = p.id
                    document.body.style.cursor = 'pointer'
                    break
                }
            }
        }
        if (!activeClusterId) document.body.style.cursor = 'auto'


        for (let i = 0; i < positionsArray.length; i += 3) {
            // ... (Existing Physics Logic) ...

            tempVec.set(positionsArray[i], positionsArray[i + 1], positionsArray[i + 2])

            const ox = originalPositions[i]
            const oy = originalPositions[i + 1]
            const oz = originalPositions[i + 2]

            let targetX = ox
            let targetY = oy
            let targetZ = oz

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

            // Apply "Glow/Pop" effect if part of active cluster
            // (Here we could scale position slightly outward for pop effect)
            if (activeClusterId) {
                // Check if this particle belongs to the active cluster
                // For performance, we could check ranges, but here we can just check distance to target point
                // OR use the clusterIndices map if we structured the loop differently.
                // Simpler: Check distance to active Point position
                const activePointPos = points.find(p => p.id === activeClusterId).position
                const distToCluster = Math.sqrt(
                    Math.pow(ox - activePointPos.x, 2) +
                    Math.pow(oy - activePointPos.y, 2) +
                    Math.pow(oz - activePointPos.z, 2)
                )

                if (distToCluster < interactionRadius) {
                    // Push slightly outward (Pop effect)
                    const popScale = 1.1 + Math.sin(state.clock.elapsedTime * 10) * 0.05
                    targetX *= popScale
                    targetY *= popScale
                    targetZ *= popScale
                }
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

    const handleClick = (e) => {
        if (hoverPoint.current) {
            for (const p of points) {
                const dist = hoverPoint.current.distanceTo(p.position)
                if (dist < 0.5) {
                    // Clicked a point!
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
                    size={0.035}
                    vertexColors={true} // ENABLE VERTEX COLORS
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.8}
                />
            </points>

            <mesh
                ref={meshRef}
                visible={false}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerOut}
                onClick={handleClick}
            >
                <sphereGeometry args={[radius, 32, 32]} />
                <meshBasicMaterial transparent opacity={0.0} />
            </mesh>
        </group>
    )
}
