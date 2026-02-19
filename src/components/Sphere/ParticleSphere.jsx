import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { points } from '../../data/points'
import { vertexShader, fragmentShader } from './ParticleSphereShader'
import FeaturePoint from './FeaturePoint'

export default function ParticleSphere({ onPointClick, isWarping }) {
    const meshRef = useRef()
    const shaderRef = useRef()
    const { viewport } = useThree()

    // Filter Navigation Points vs Decorative
    const navPoints = useMemo(() => points.filter(p => p.type !== 'decorative'), []);
    // For cloud, we might want to use ALL points or just decorative. 
    // Let's use ALL to keep the dense feel, but maybe reduce intensity for nav points in the cloud so they don't clash?
    // Actually, let's just use all points for the cloud to keep the "network" feel.

    // Config
    const radius = 1.8

    // Generate Attributes
    const { positions, colors, clusterCenters, clusterIndices } = useMemo(() => {
        // 1. BASE SPHERE (Low Resolution / Sparse)
        const baseGeometry = new THREE.SphereGeometry(radius, 64, 64)
        const basePosArray = baseGeometry.attributes.position.array
        const baseCount = basePosArray.length / 3

        // 2. CLUSTER INJECTION (REMOVED - User Request)
        // We only want the base sphere particles.

        const totalCount = baseCount // + 0 extras

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
        uHoverStrength: { value: 0 },
        uMousePos: { value: new THREE.Vector3(999, 999, 999) } // Default far away
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

            // Hover Animation (Opacity/Brighness pulse for active link)
            const targetHover = activeClusterRef.current !== -1 ? 1.0 : 0.0
            shaderRef.current.uniforms.uHoverStrength.value = THREE.MathUtils.lerp(
                shaderRef.current.uniforms.uHoverStrength.value,
                targetHover,
                0.1
            )

            shaderRef.current.uniforms.uActiveClusterIndex.value = activeClusterRef.current
        }

        // Force reset cursor
        if (document.body.style.cursor === 'pointer') {
            document.body.style.cursor = 'auto';
        }
    })

    const handleClick = () => {
        if (activeClusterRef.current !== -1) {
            const point = points[activeClusterRef.current]
            onPointClick(point)
        }
    }

    return (
        <group>
            {/* Interactive Feature Points (Overlay) */}
            {navPoints.map((p) => (
                <FeaturePoint
                    key={p.id}
                    {...p}
                    onClick={() => onPointClick(p)}
                />
            ))}

            {/* Background Particle Cloud */}
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
                {/* Active Shader Material */}
                <shaderMaterial
                    ref={shaderRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    transparent={true}
                    depthWrite={false}
                    depthTest={false}
                    vertexColors={true}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    )
}
