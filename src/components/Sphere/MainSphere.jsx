import React from 'react'

export default function MainSphere() {
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial wireframe color="cyan" />
        </mesh>
    )
}
