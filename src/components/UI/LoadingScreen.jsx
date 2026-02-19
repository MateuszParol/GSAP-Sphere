import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Fade out container
                    gsap.to(containerRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            if (onComplete) onComplete();
                        }
                    });
                }
            });

            // Simulate loading
            const updateProgress = { val: 0 };
            tl.to(updateProgress, {
                val: 100,
                duration: 1.5,
                ease: 'power2.inOut',
                onUpdate: () => setProgress(Math.floor(updateProgress.val))
            });

            // Animate tech specs in corners
            gsap.from('.tech-spec', {
                opacity: 0,
                y: 10,
                stagger: 0.2,
                duration: 0.5,
                delay: 0.5
            });

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={containerRef} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#040404', // Very dark grey, almost black
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Orbitron', sans-serif",
            color: '#00ffff',
            overflow: 'hidden'
        }}>
            {/* Minimalist Center Content */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{
                    fontSize: '2rem',
                    letterSpacing: '8px',
                    fontWeight: '700',
                    margin: '0 0 10px 0',
                    textShadow: '0 0 20px rgba(0,255,255,0.5)'
                }}>
                    INITIALIZING
                </h1>
            </div>

            {/* Sleek Progress Bar */}
            <div style={{
                width: '300px',
                height: '2px',
                background: 'rgba(0, 255, 255, 0.1)',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${progress}%`,
                    background: '#00ffff',
                    boxShadow: '0 0 15px #00ffff',
                    transition: 'width 0.1s linear'
                }}></div>
            </div>

            <div style={{
                marginTop: '15px',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                opacity: 0.6
            }}>
                INITIALIZING... {progress}%
            </div>

            {/* Corner Tech Specs */}
            <div className="tech-spec" style={{ position: 'absolute', top: '30px', left: '40px', fontSize: '0.7rem', opacity: 0.5, fontFamily: 'monospace' }}>
                MEM: 64TB OK<br />
                NET: SECURE
            </div>
            <div className="tech-spec" style={{ position: 'absolute', top: '30px', right: '40px', fontSize: '0.7rem', opacity: 0.5, fontFamily: 'monospace', textAlign: 'right' }}>
                SYS: V2.4.1<br />
                LOC: UNKNOWN
            </div>
            <div className="tech-spec" style={{ position: 'absolute', bottom: '30px', left: '40px', fontSize: '0.7rem', opacity: 0.5, fontFamily: 'monospace' }}>
                GPU: OPTIMAL<br />
                FPS: UNLOCKED
            </div>
            <div className="tech-spec" style={{ position: 'absolute', bottom: '30px', right: '40px', fontSize: '0.7rem', opacity: 0.5, fontFamily: 'monospace', textAlign: 'right' }}>
                EST. 2024<br />
                [ALL SYSTEMS GO]
            </div>
        </div>
    );
};

export default LoadingScreen;
