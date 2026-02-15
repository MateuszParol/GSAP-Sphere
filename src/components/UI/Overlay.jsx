import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Overlay({ activePoint, onClose }) {
    const overlayRef = useRef()

    useEffect(() => {
        if (activePoint) {
            gsap.fromTo(overlayRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            )
        }
    }, [activePoint])

    if (!activePoint) return null

    return (
        <div
            ref={overlayRef}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: '500px',
                background: 'rgba(0, 0, 0, 0.8)',
                border: `1px solid ${activePoint.color}`,
                backdropFilter: 'blur(10px)',
                padding: '40px',
                borderRadius: '16px',
                color: 'white',
                fontFamily: "'Courier New', Courier, monospace",
                zIndex: 100,
                boxShadow: `0 0 30px ${activePoint.color}40`,
                textAlign: 'center'
            }}
        >
            <h2 style={{
                color: activePoint.color,
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontSize: '2rem',
                textShadow: `0 0 10px ${activePoint.color}`
            }}>
                {activePoint.label}
            </h2>

            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px' }}>
                {activePoint.description}
            </p>

            {activePoint.type === 'link' && (
                <a
                    href="#"
                    style={{
                        display: 'inline-block',
                        padding: '10px 30px',
                        background: activePoint.color,
                        color: 'black',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        borderRadius: '30px',
                        marginTop: '10px'
                    }}
                >
                    OTWÓRZ
                </a>
            )}

            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                }}
            >
                ✕
            </button>
        </div>
    )
}
