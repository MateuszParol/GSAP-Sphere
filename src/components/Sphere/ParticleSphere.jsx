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
    const count = 64
    const radius = 1.8
    const threshold = 2.5
    const clusterBaseRadius = 0.5

    // Touch Handling State
    const touchStart = useRef({ x: 0, y: 0, time: 0 })

    // Generate Geometry & Colors
    const { positions, originalPositions, colors, particleClusterMap } = useMemo(() => {
        const geometry = new THREE.SphereGeometry(radius, count, count)
        const posArray = geometry.attributes.position.array
        const countPoints = posArray.length / 3

        const originalPositions = new Float32Array(posArray)
        const colors = new Float32Array(countPoints * 3)
        const particleClusterMap = new Int16Array(countPoints).fill(-1)

        const baseColor = new THREE.Color('#a5f3fc')

        for (let i = 0; i < countPoints; i++) {
            // ORGANIC LOOK RE-INTRODUCED
            // Jitter for noise/organic feel, but kept sharp by PointsMaterial
            const jitter = 0.06
            posArray[i * 3] += (Math.random() - 0.5) * jitter
            posArray[i * 3 + 1] += (Math.random() - 0.5) * jitter
            posArray[i * 3 + 2] += (Math.random() - 0.5) * jitter

            originalPositions[i * 3] = posArray[i * 3]
            originalPositions[i * 3 + 1] = posArray[i * 3 + 1]
            originalPositions[i * 3 + 2] = posArray[i * 3 + 2]

            colors[i * 3] = baseColor.r * 0.5
            colors[i * 3 + 1] = baseColor.g * 0.5
            colors[i * 3 + 2] = baseColor.b * 0.5
        }

        points.forEach((point, pIndex) => {
            const pointColor = new THREE.Color(point.color)
            const intensity = 2.5 // High contrast

            for (let i = 0; i < countPoints; i++) {
                if (particleClusterMap[i] !== -1) continue

                const px = posArray[i * 3]
                const py = posArray[i * 3 + 1]
                const pz = posArray[i * 3 + 2]

                const dist = Math.sqrt(
                    Math.pow(px - point.position.x, 2) +
                    Math.pow(py - point.position.y, 2) +
                    Math.pow(pz - point.position.z, 2)
                )

                if (dist < clusterBaseRadius) {
                    // Re-introduce slight probability noise at edges for organic cluster shape
                    const probability = 1.0 - (dist / clusterBaseRadius) * 0.5
                    if (Math.random() < probability) {
                        particleClusterMap[i] = pIndex
                        colors[i * 3] = pointColor.r * intensity
                        colors[i * 3 + 1] = pointColor.g * intensity
                        colors[i * 3 + 2] = pointColor.b * intensity
                    }
                }
            }
        })

        return { positions: posArray, originalPositions, colors, particleClusterMap }
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

    // --- CUSTOM TAP LOGIC UPDATED ---
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

        // Criteria for a TAP (Mobile Friendly):
        // 1. Movement < 40 pixels (Increased from 10px for High DPI screens)
        // 2. Duration < 500ms (Slightly longer press allowed)
        const isTap = deltaX < 40 && deltaY < 40 && deltaTime < 500

        if (isTap && hoverPoint.current) {
            for (const p of points) {
                const dist = hoverPoint.current.distanceTo(p.position)
                // Generous click tolerance
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
                {/* Sharp Square Pixels */}
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
