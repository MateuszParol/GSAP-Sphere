import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import styles from './Modal.module.css'

export default function Overlay({ activePoint, onClose }) {
    const modalRef = useRef(null)
    const overlayRef = useRef(null)

    useEffect(() => {
        if (activePoint) {
            // Animate In
            gsap.set(overlayRef.current, { opacity: 0, backdropFilter: 'blur(0px)' })
            gsap.set(modalRef.current, { y: 50, opacity: 0, scale: 0.95 })

            const tl = gsap.timeline()
            tl.to(overlayRef.current, {
                opacity: 1,
                backdropFilter: 'blur(8px)',
                duration: 0.4,
                ease: 'power2.out'
            })
            tl.to(modalRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.2)'
            }, '-=0.2')
        }
    }, [activePoint])

    const handleClose = () => {
        const tl = gsap.timeline({ onComplete: onClose })
        tl.to(modalRef.current, {
            y: 20,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in'
        })
        tl.to(overlayRef.current, {
            opacity: 0,
            backdropFilter: 'blur(0px)',
            duration: 0.3
        }, '-=0.1')
    }

    if (!activePoint) return null

    return (
        <div className={styles.overlay} ref={overlayRef}>
            <div className={styles.modal} ref={modalRef} style={{ borderColor: activePoint.color, boxShadow: `0 0 30px ${activePoint.color}40` }}>
                <div className={styles.header} style={{ borderBottomColor: `${activePoint.color}40` }}>
                    <h2 className={styles.title} style={{ color: activePoint.color, textShadow: `0 0 10px ${activePoint.color}80` }}>
                        {activePoint.label}
                    </h2>
                    <button className={styles.closeBtn} onClick={handleClose}>
                        [CLOSE]
                    </button>
                </div>

                <div className={styles.content} style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                        {activePoint.description}
                    </p>

                    {activePoint.type === 'link' && (
                        <a
                            href="#"
                            className={styles.submitBtn}
                            style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                                backgroundColor: activePoint.color,
                                color: '#000',
                                width: 'auto',
                                padding: '0.8rem 2rem'
                            }}
                        >
                            OTWÓRZ
                        </a>
                    )}
                </div>

                <div className={styles.decorLeft} style={{ borderTopColor: activePoint.color, borderLeftColor: activePoint.color }}></div>
                <div className={styles.decorRight} style={{ borderBottomColor: activePoint.color, borderRightColor: activePoint.color }}></div>
            </div>
        </div>
    )
}
