import React, { useRef, useEffect } from 'react';
import styles from './HUD.module.css';
import { useHUDStore } from '../../utils/hudStore';

const Compass = () => {
    // Subscribe to transient updates to avoid re-renders
    const stripRef = useRef(null);
    const labelRef = useRef(null);

    useEffect(() => {
        // Direct subscription to store (transient update pattern)
        const unsub = useHUDStore.subscribe(
            (state) => {
                const heading = state.heading || 0;

                // --- STRIP MOVEMENT LOGIC ---
                // We want 360 degrees. Let's say 1 deg = 2px.
                // Center of strip (180 deg) is at center of container.
                // Current Heading needs to be centered.
                // x = -heading * 2

                // To wrap seamlessly:
                // We render a LONG strip: [-360...0...360...720]
                // And we jump back when passing boundaries.
                // Let's keep it simple: Just standard transform for now.
                // 100 is center offset of container (width 200/2)

                if (stripRef.current) {
                    // Modulo 360 to keep number range sane
                    // But raw rotation can accumulate.
                    // Scene gives us Radians or Degrees? Typically Radians in Three.js.
                    // We will convert in Scene.jsx. Assuming heading is DEGREES [0-360].

                    const deg = heading % 360;
                    const x = -deg * 2;
                    // We need to shift the strip so 'deg' is in the center (100px).
                    // But SVG space starts at 0.
                    // Transform logic: translate(100 - deg*2, 0)

                    stripRef.current.setAttribute('transform', `translate(${100 + x}, 0)`);
                }

                if (labelRef.current) {
                    labelRef.current.innerText = `HDG ${Math.round(heading % 360).toString().padStart(3, '0')}`;
                }
            }
        );
        return unsub;
    }, []);

    return (
        <div className={styles.compassContainer}>
            <svg width="200" height="40" viewBox="0 0 200 40" className={styles.svgCompass} style={{ overflow: 'hidden' }}>
                {/* Fixed Middle Marker */}
                <path d="M100 0 L95 8 L105 8 Z" fill="#00ffff" />
                <line x1="100" y1="8" x2="100" y2="40" stroke="#00ffff" strokeWidth="1" opacity="0.5" />

                {/* Sliding Strip Group */}
                <g ref={stripRef}>
                    {/* 
                      We need a wide enough strip to cover the view.
                      View width = 200px (100 degs).
                      We need to render a seamless loop. 
                      Simplest way: Render -360 to +360.
                      And in JS, if degrees > 360, reset to 0 (handled by % 360).
                    */}
                    {/* Render Range: -180 to 540 to be safe */}
                    {Array.from({ length: 72 }, (_, i) => (i - 18) * 10).map(deg => (
                        <g key={deg} transform={`translate(${deg * 2}, 0)`}>
                            <line x1="0" y1="15" x2="0" y2="25" stroke="#00ffff" strokeWidth="1" />
                            {deg % 45 === 0 && (
                                <text x="0" y="38" fill="#00ffff" fontSize="10" textAnchor="middle" fontFamily="monospace">
                                    {(deg < 0 ? 360 + (deg % 360) : deg % 360)}
                                </text>
                            )}
                        </g>
                    ))}
                </g>
            </svg>
            <div ref={labelRef} className={styles.compassLabel}>HDG 000</div>
        </div>
    );
};

export default Compass;
