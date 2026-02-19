import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from './StarfieldShader'

export default function Starfield({ isWarping }) {
    const pointsRef = useRef()
    const shaderRef = useRef()

    const count = 3000

    const { positions, sizes } = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const sz = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            // Random Box
            pos[i * 3] = (Math.random() - 0.5) * 100
            pos[i * 3 + 1] = (Math.random() - 0.5) * 100
            pos[i * 3 + 2] = (Math.random() - 0.5) * 100

            sz[i] = Math.random() * 2.0 + 0.5
        }

        return { positions: pos, sizes: sz }
    }, [])

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uSpeed: { value: 0 }
    }), [])

    useFrame((state, delta) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
            // Constant calm speed
            shaderRef.current.uniforms.uSpeed.value = 0.5
        }
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
                <bufferAttribute
                    attach="attributes-aSize"
                    count={sizes.length}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={shaderRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}
