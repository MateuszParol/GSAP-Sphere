import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HUD.module.css';
import { useHUDStore } from '../../utils/hudStore';

const HUDDecoration = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    const containerRef = useRef(null);
    const leftGridRef = useRef(null);
    const rightGridRef = useRef(null);
    const topBarRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Entry Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Top Bar sliding down
            gsap.to(topBarRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5
            });

            // Animate Grids fading in
            gsap.to(`.${styles.leftGrid}`, {
                x: 0, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.8
            });
            gsap.to(`.${styles.rightGrid}`, {
                x: 0, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.8
            });

            // Animate Background Lines
            gsap.to(`.${styles.bgLines}`, {
                scale: 1, opacity: 1, duration: 2, ease: 'power2.out'
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Subscribe to Pitch updates
    useEffect(() => {
        const unsub = useHUDStore.subscribe(
            (state) => {
                const pitch = state.pitch || 0;

                // Let's say 1 degree = 8 pixels.
                const y = pitch * 8;

                if (leftGridRef.current) {
                    leftGridRef.current.style.transform = `translateY(${y}px)`;
                }
                if (rightGridRef.current) {
                    rightGridRef.current.style.transform = `translateY(${y}px)`;
                }
            }
        );
        return unsub;
    }, []);

    return (
        <div ref={containerRef} className={styles.decorationContainer} style={{ overflow: 'hidden' }}>
            {/* TOP STATUS BAR - Initial State Hidden */}
            <div ref={topBarRef} className={styles.topBar} style={{ opacity: 0, transform: 'translateY(-50px)' }}>
                <div className={styles.topBarSegment}>SYS: ONLINE</div>
                <div className={styles.topBarSegment}>LINK: SECURITY_OK</div>
                <div className={styles.topBarTime}>{time}</div>
                <div className={styles.topBarSegment}>BAT: 98%</div>
            </div>

            {/* SIDE VERTICAL GRIDS (Rulers) - Extended Range */}
            <div className={styles.leftGrid} style={{ height: '300px', overflow: 'hidden', opacity: 0, transform: 'translateX(-50px)' }}>
                {/* Moving Container - Centered */}
                <div ref={leftGridRef} style={{ position: 'absolute', top: '50%', left: 0, width: '100%', marginTop: '-1200px', willChange: 'transform' }}>
                    {/* Render a tall ladder: -50 to +50 ticks (approx -125 to +125 degrees) */}
                    <svg width="20" height="2400" viewBox="0 0 20 2400">
                        {Array.from({ length: 101 }, (_, i) => i - 50).map(i => (
                            <g key={i} transform={`translate(0, ${i * 20 + 1200})`}>
                                <rect x="0" y="0" width={i === 0 ? 20 : (i % 5 === 0 ? 15 : 5)} height="1" fill={i === 0 ? "#ff00ff" : "#00ffff"} opacity={i === 0 ? 1 : 0.6} />
                            </g>
                        ))}
                    </svg>
                </div>
                {/* Static Center Marker */}
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '20px', height: '1px', background: 'red', zIndex: 10 }}></div>
            </div>

            <div className={styles.rightGrid} style={{ height: '300px', overflow: 'hidden', opacity: 0, transform: 'translateX(50px)' }}>
                <div ref={rightGridRef} style={{ position: 'absolute', top: '50%', right: 0, width: '100%', marginTop: '-1200px', willChange: 'transform' }}>
                    <svg width="20" height="2400" viewBox="0 0 20 2400">
                        {Array.from({ length: 101 }, (_, i) => i - 50).map(i => (
                            <g key={i} transform={`translate(0, ${i * 20 + 1200})`}>
                                <rect x={i === 0 ? 0 : (i % 5 === 0 ? 5 : 15)} y="0" width={i === 0 ? 20 : (i % 5 === 0 ? 15 : 5)} height="1" fill={i === 0 ? "#ff00ff" : "#00ffff"} opacity={i === 0 ? 1 : 0.6} />
                            </g>
                        ))}
                    </svg>
                </div>
                <div style={{ position: 'absolute', top: '50%', right: 0, width: '20px', height: '1px', background: 'red', zIndex: 10 }}></div>
            </div>

            {/* DECORATIVE LINES */}
            <svg className={styles.bgLines} width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, opacity: 0, transform: 'scale(1.1)' }}>
                <line x1="10%" y1="10%" x2="90%" y2="10%" stroke="#00ffff" strokeWidth="1" opacity="0.1" strokeDasharray="5, 5" />
                <line x1="10%" y1="90%" x2="90%" y2="90%" stroke="#00ffff" strokeWidth="1" opacity="0.1" strokeDasharray="5, 5" />
            </svg>
        </div>
    );
};

export default HUDDecoration;
