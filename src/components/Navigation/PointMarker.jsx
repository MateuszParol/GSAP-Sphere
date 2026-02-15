import React, { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function PointMarker({ point, onClick }) {
    const markerRef = useRef()

    const handlePointerEnter = () => {
        document.body.style.cursor = 'pointer'
        gsap.to(markerRef.current, { scale: 1.5, duration: 0.3, ease: 'back.out(1.7)' })
    }

    const handlePointerLeave = () => {
        document.body.style.cursor = 'auto'
        gsap.to(markerRef.current, { scale: 1, duration: 0.3 })
    }

    return (
        <group position={[point.position.x, point.position.y, point.position.z]}>
            <Html
                transform
                occlude
                distanceFactor={10}
                style={{
                    transition: 'all 0.2s',
                    opacity: 1,
                    transform: 'scale(1)',
                }}
            >
                <div
                    ref={markerRef}
                    onClick={() => onClick(point)}
                    onMouseEnter={handlePointerEnter}
                    onMouseLeave={handlePointerLeave}
                    style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: point.color,
                        borderRadius: '50%',
                        border: '2px solid white',
                        boxShadow: `0 0 10px ${point.color}, 0 0 20px ${point.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        color: point.color,
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textShadow: '1px 1px 2px black',
                        pointerEvents: 'none'
                    }}>
                        {point.label}
                    </div>
                </div>
            </Html>
        </group>
    )
}
