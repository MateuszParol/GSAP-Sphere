import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './HUD.module.css';

const FrameCorners = () => {
    const containerRef = useRef(null);
    const centerLineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate corners sliding in from their respective directions
            gsap.to(`.${styles.cornerTL}`, {
                x: 0, y: 0, opacity: 1, duration: 2.5, ease: 'power3.out'
            });
            gsap.to(`.${styles.cornerTR}`, {
                x: 0, y: 0, opacity: 1, duration: 2.5, ease: 'power3.out', delay: 0.2
            });
            gsap.to(`.${styles.cornerBL}`, {
                x: 0, y: 0, opacity: 1, duration: 2.5, ease: 'power3.out', delay: 0.4
            });
            gsap.to(`.${styles.cornerBR}`, {
                x: 0, y: 0, opacity: 1, duration: 2.5, ease: 'power3.out', delay: 0.6
            });

            // Animate center decoration scaling out
            gsap.to(centerLineRef.current, {
                scaleX: 1, opacity: 0.5, duration: 3, ease: 'expo.out', delay: 1
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.frameContainer} ref={containerRef}>
            {/* Top Left Cockpit Curve - Initial: offset -50 */}
            <svg className={styles.cornerTL} width="300" height="300" viewBox="0 0 300 300" style={{ opacity: 0, transform: 'translate(-50px, -50px)' }}>
                <path d="M0 0 L150 0 C 100 0, 0 100, 0 150 Z" fill="#00ffff" opacity="0.05" />
                <path d="M0 150 L0 50 C 0 20, 20 0, 50 0 L200 0" stroke="#00ffff" strokeWidth="2" fill="none" opacity="0.7" />
                <rect x="0" y="160" width="4" height="40" fill="#00ffff" opacity="0.5" />
            </svg>

            {/* Top Right Cockpit Curve */}
            <svg className={styles.cornerTR} width="300" height="300" viewBox="0 0 300 300" style={{ opacity: 0, transform: 'translate(50px, -50px)' }}>
                <path d="M300 0 L150 0 C 200 0, 300 100, 300 150 Z" fill="#00ffff" opacity="0.05" />
                <path d="M300 150 L300 50 C 300 20, 280 0, 250 0 L100 0" stroke="#00ffff" strokeWidth="2" fill="none" opacity="0.7" />
                <rect x="296" y="160" width="4" height="40" fill="#00ffff" opacity="0.5" />
            </svg>

            {/* Bottom Left Cockpit Curve */}
            <svg className={styles.cornerBL} width="300" height="300" viewBox="0 0 300 300" style={{ opacity: 0, transform: 'translate(-50px, 50px)' }}>
                <path d="M0 300 L150 300 C 100 300, 0 200, 0 150 Z" fill="#00ffff" opacity="0.05" />
                <path d="M0 150 L0 250 C 0 280, 20 300, 50 300 L200 300" stroke="#00ffff" strokeWidth="2" fill="none" opacity="0.7" />
            </svg>

            {/* Bottom Right Cockpit Curve */}
            <svg className={styles.cornerBR} width="300" height="300" viewBox="0 0 300 300" style={{ opacity: 0, transform: 'translate(50px, 50px)' }}>
                <path d="M300 300 L150 300 C 200 300, 300 200, 300 150 Z" fill="#00ffff" opacity="0.05" />
                <path d="M300 150 L300 250 C 300 280, 280 300, 250 300 L100 300" stroke="#00ffff" strokeWidth="2" fill="none" opacity="0.7" />
            </svg>

            {/* Center Bottom Decoration - Initial scaleX: 0 */}
            <div ref={centerLineRef} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%) scaleX(0)', width: '300px', height: '2px', background: 'linear-gradient(90deg, transparent, #00ffff, transparent)', opacity: 0 }}></div>
        </div>
    );
};

export default FrameCorners;
