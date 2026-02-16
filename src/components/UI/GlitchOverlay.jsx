import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GlitchOverlay = ({ active }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const text = textRef.current;

        if (active && container) {
            // 1. Flash Entrance (Instant)
            gsap.set(container, { opacity: 1 });

            const ctx = gsap.context(() => {
                // STROBE EFFECT (White / Black / Noise)
                // Extremely fast flickering to simulate power failure/data corruption
                const tl = gsap.timeline({ repeat: -1 });
                tl
                    .set(container, { backgroundColor: '#ffffff' }) // Pure White Flash
                    .to(container, { duration: 0.03, backgroundColor: '#000000' })
                    .to(container, { duration: 0.03, backgroundColor: '#ffffff' })
                    .to(container, { duration: 0.03, backgroundColor: 'rgba(0,0,0,0.95)' })
                    .to(container, { duration: 0.1, backgroundColor: 'rgba(50,50,50,0.9)' }); // Grey noise

                // AGGRESSIVE TEARING (Clip Path)
                // Larger slices, faster cuts
                const sliceTl = gsap.timeline({ repeat: -1 });
                sliceTl
                    .set(container, { clipPath: 'inset(20% 0 50% 0)' })
                    .to(container, { duration: 0.05, clipPath: 'inset(10% 0 80% 0)' })
                    .to(container, { duration: 0.05, clipPath: 'inset(80% 0 5% 0)' })
                    .to(container, { duration: 0.05, clipPath: 'inset(0% 0 0% 0)' })
                    .to(container, { duration: 0.05, clipPath: 'inset(40% 0 40% 0)' });

                // RGB SHIFT (Text)
                if (text) {
                    gsap.to(text, {
                        textShadow: '10px 0 red, -10px 0 blue',
                        x: 20, // Violent shake
                        skewX: 20,
                        duration: 0.04,
                        repeat: -1,
                        yoyo: true,
                        ease: 'steps(3)'
                    });
                }

            }, containerRef);

            return () => ctx.revert();
        }
    }, [active]);

    if (!active) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.95)',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    };

    return (
        <div ref={containerRef} style={overlayStyle}>
            {/* White Noise Texture Layer */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
                opacity: 0.3,
                mixBlendMode: 'overlay',
            }} />

            <h1 ref={textRef} style={{
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '5rem',
                letterSpacing: '0.5rem',
                textTransform: 'uppercase',
                position: 'relative',
                zIndex: 2
            }}>
                SYSTEM_RESET
            </h1>
        </div>
    );
};

export default GlitchOverlay;
