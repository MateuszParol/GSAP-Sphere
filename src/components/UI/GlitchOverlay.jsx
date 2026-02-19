import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const GlitchOverlay = ({ active }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    // GSAP Noise Effect (Runs when active)
    useEffect(() => {
        if (!active || !containerRef.current) return;

        const container = containerRef.current;
        const text = textRef.current;

        const ctx = gsap.context(() => {
            // STROBE / NOISE ONLY (No solid black loop)
            const tl = gsap.timeline({ repeat: -1 });
            tl.set(container, { backgroundColor: 'transparent' })
                .to(container, { duration: 0.1, backgroundColor: 'rgba(50,50,50,0.1)' })
                .to(container, { duration: 0.05, backgroundColor: 'rgba(255,255,255,0.1)' })
                .to(container, { duration: 0.1, backgroundColor: 'transparent' });

            // SLICE / TEARING
            const sliceTl = gsap.timeline({ repeat: -1 });
            sliceTl.set(container, { clipPath: 'inset(0% 0 0% 0)' })
                .to(container, { duration: 0.2, clipPath: 'inset(10% 0 80% 0)' })
                .to(container, { duration: 0.1, clipPath: 'inset(80% 0 5% 0)' })
                .to(container, { duration: 0.1, clipPath: 'inset(0% 0 0% 0)' })
                .to(container, { duration: 3, clipPath: 'inset(0% 0 0% 0)' }); // Pause between tears

            // RGB SHIFT
            if (text) {
                gsap.to(text, {
                    textShadow: '5px 0 red, -5px 0 blue',
                    x: 10,
                    skewX: 10,
                    duration: 0.05,
                    repeat: -1,
                    yoyo: true,
                    ease: 'steps(2)'
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [active]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }} // Initial fade in
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100dvh',
                        zIndex: 99999,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        background: 'transparent'
                    }}
                >
                    {/* NOISE TEXTURE */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
                        opacity: 0.3,
                        mixBlendMode: 'overlay',
                        zIndex: 3
                    }} />

                    {/* TEXT */}
                    <h1 ref={textRef} style={{
                        color: '#fff',
                        fontFamily: 'monospace',
                        fontSize: 'clamp(2rem, 8vw, 5rem)',
                        letterSpacing: 'clamp(0.2rem, 1vw, 0.5rem)',
                        textTransform: 'uppercase',
                        position: 'relative',
                        zIndex: 4,
                        textAlign: 'center',
                        padding: '0 20px',
                        wordBreak: 'break-word'
                    }}>
                        SYSTEM_RESET
                    </h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlitchOverlay;
