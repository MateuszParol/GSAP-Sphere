import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { points } from '../../data/points'
import { vertexShader, fragmentShader } from './ParticleSphereShader'

export default function ParticleSphere({ onPointClick, isWarping }) {
    const meshRef = useRef()
    const shaderRef = useRef()
    const { viewport } = useThree()

    // Config
    const radius = 1.8

    // Generate Attributes
    const { positions, colors, clusterCenters, clusterIndices } = useMemo(() => {
        // 1. BASE SPHERE (Low Resolution / Sparse)
        const baseGeometry = new THREE.SphereGeometry(radius, 64, 64)
        const basePosArray = baseGeometry.attributes.position.array
        const baseCount = basePosArray.length / 3

        // 2. CLUSTER INJECTION (High Density)
        const particlesPerCluster = 150
        const totalExtras = points.length * particlesPerCluster
        const totalCount = baseCount + totalExtras

        const posArray = new Float32Array(totalCount * 3)
        const colArray = new Float32Array(totalCount * 3)
        const centerArray = new Float32Array(totalCount * 3) // Cluster Centers
        const indexArray = new Float32Array(totalCount)      // Cluster IDs

        const baseColor = new THREE.Color('#a5f3fc')

        // A. Process Base Background
        for (let i = 0; i < baseCount; i++) {
            // Organic Jitter
            const x = basePosArray[i * 3] + (Math.random() - 0.5) * 0.1
            const y = basePosArray[i * 3 + 1] + (Math.random() - 0.5) * 0.1
            const z = basePosArray[i * 3 + 2] + (Math.random() - 0.5) * 0.1

            posArray[i * 3] = x
            posArray[i * 3 + 1] = y
            posArray[i * 3 + 2] = z

            // Dim Background Colors
            colArray[i * 3] = baseColor.r * 0.3
            colArray[i * 3 + 1] = baseColor.g * 0.3
            colArray[i * 3 + 2] = baseColor.b * 0.3

            // Not part of a cluster
            centerArray[i * 3] = 0
            centerArray[i * 3 + 1] = 0
            centerArray[i * 3 + 2] = 0
            indexArray[i] = -1.0
        }

        // B. Process Clusters
        let offset = baseCount
        points.forEach((point, pIndex) => {
            const pointColor = new THREE.Color(point.color)
            const targetPos = point.position // Vector3
            const pId = pIndex // 0, 1, 2...

            for (let j = 0; j < particlesPerCluster; j++) {
                const i = offset + j

                // Random position around target (Spherical Volume)
                const v = targetPos.clone()
                const spread = 0.35
                v.x += (Math.random() - 0.5) * spread
                v.y += (Math.random() - 0.5) * spread
                v.z += (Math.random() - 0.5) * spread
                v.normalize().multiplyScalar(radius + (Math.random() - 0.5) * 0.05)

                posArray[i * 3] = v.x
                posArray[i * 3 + 1] = v.y
                posArray[i * 3 + 2] = v.z

                // Store Cluster Center for Shader Animation (Scaling around center)
                centerArray[i * 3] = targetPos.x
                centerArray[i * 3 + 1] = targetPos.y
                centerArray[i * 3 + 2] = targetPos.z

                // Color Logic
                colArray[i * 3] = pointColor.r * 1.5
                colArray[i * 3 + 1] = pointColor.g * 1.5
                colArray[i * 3 + 2] = pointColor.b * 1.5

                indexArray[i] = parseFloat(pIndex)
            }
            offset += particlesPerCluster
        })

        return {
            positions: posArray,
            colors: colArray,
            clusterCenters: centerArray,
            clusterIndices: indexArray
        }
    }, [])

    // Uniforms
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uWarpStrength: { value: 0 },
        uActiveClusterIndex: { value: -1.0 },
        uHoverStrength: { value: 0 }
    }), [])

    // Optimization: Stable references
    const raycaster = useMemo(() => new THREE.Raycaster(), [])
    const activeClusterRef = useRef(-1)

    // UseThree gives us camera/pointer access safely
    const { camera, pointer } = useThree()

    useFrame((state) => {
        // --- 1. GPU UNIFORM UPDATES ---
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime

            // Warp Animation
            const targetWarp = isWarping ? 1.0 : 0.0
            shaderRef.current.uniforms.uWarpStrength.value = THREE.MathUtils.lerp(
                shaderRef.current.uniforms.uWarpStrength.value,
                targetWarp,
                0.1 // Smooth warp entry
            )

            // Hover Animation
            const targetHover = activeClusterRef.current !== -1 ? 1.0 : 0.0
            shaderRef.current.uniforms.uHoverStrength.value = THREE.MathUtils.lerp(
                shaderRef.current.uniforms.uHoverStrength.value,
                targetHover,
                0.1
            )

            shaderRef.current.uniforms.uActiveClusterIndex.value = activeClusterRef.current
        }

        // --- 2. CPU INTERACTION CHECK (Raycasting) ---
        // Only run if not warping to save resources
        // --- 2. CPU INTERACTION CHECK (Raycasting) ---
        // Only run if not warping to save resources
        if (!isWarping) {
            // Note: state.camera and state.pointer are always up to date
            raycaster.setFromCamera(state.pointer, state.camera)

            let draggingIndex = -1

            // Iterate over known points
            for (let i = 0; i < points.length; i++) {
                const p = points[i]

                // Check distance from Ray to Point
                // We create a sphere at the point position and check intersection
                const sphere = new THREE.Sphere(p.position, 0.4) // 0.4 Hitbox radius
                if (raycaster.ray.intersectsSphere(sphere)) {
                    draggingIndex = i
                    break // Found one
                }
            }

            if (draggingIndex !== -1) {
                activeClusterRef.current = draggingIndex
                document.body.style.cursor = 'pointer'
            } else {
                activeClusterRef.current = -1
                document.body.style.cursor = 'auto'
            }
        }
    })

    const handleClick = () => {
        if (activeClusterRef.current !== -1) {
            const point = points[activeClusterRef.current]
            onPointClick(point)
        }
    }

    return (
        <points ref={meshRef} onClick={handleClick} frustumCulled={false}>
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
                <bufferAttribute
                    attach="attributes-aClusterCenter"
                    count={clusterCenters.length / 3}
                    array={clusterCenters}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aClusterIndex"
                    count={clusterIndices.length}
                    array={clusterIndices}
                    itemSize={1}
                />
            </bufferGeometry>
            {/* DEBUG: Standard Material Fallback (ACTIVE FOR HANDOFF) */}
            <pointsMaterial size={0.1} color="red" sizeAttenuation={true} depthTest={false} />

            {/* DEBUG: Shader Material (BROKEN - SEE DEBUG_HANDOFF.md)
            <shaderMaterial
                ref={shaderRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                depthTest={false} 
                blending={THREE.NormalBlending} 
            />
            */}
        </points>
    )
}
