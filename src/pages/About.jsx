import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/SharedStyles.module.css';

const About = () => {
    const containerRef = useRef(null);
    const skills = [
        { name: "React / R3F", level: 90 },
        { name: "Three.js", level: 85 },
        { name: "GSAP Animation", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "Sanity CMS", level: 70 },
        { name: "UI/UX Design", level: 65 }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo("h1",
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );

            gsap.fromTo(".card-anim",
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: "power2.out", delay: 0.5 }
            );

            gsap.fromTo(".skill-bar",
                { width: 0 },
                { width: (i, target) => target.dataset.width, duration: 1.5, ease: "power4.out", delay: 1 }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.pageContainer} ref={containerRef}>
            <h1 className={styles.sectionTitle}>// DANE_PERSONELU: <span style={{ color: '#fff' }}>O MNIE</span></h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

                {/* BIO SECTION */}
                <div className={`${styles.holographicCard} card-anim`} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                        {/* PHOTO - Moved above text */}
                        <div className={styles.photoFrame} style={{ maxWidth: '300px', width: '100%', aspectRatio: '1/1' }}>
                            <img
                                src="/photo.jpeg?v=2"
                                alt="Mateusz Parol"
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                                style={{
                                    maxWidth: '100%',
                                    height: '100%',
                                    borderRadius: '10px',
                                    objectFit: 'cover' // Ensure aspect ratio
                                }}
                            />
                            <div style={{
                                display: 'none', // Hidden by default, shown on error
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: '#00ffff',
                                fontFamily: 'VT323, monospace',
                                textAlign: 'center',
                                padding: '1rem'
                            }}>
                                <span style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>[?]</span>
                                <div>WGRAJ ZDJĘCIE</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>(/public/photo.jpeg)</div>
                            </div>
                        </div>

                        {/* TEXT */}
                        <div>
                            <h3 className={styles.neonText} style={{ marginBottom: '1rem' }}>LOG_BIO</h3>
                            <p style={{ lineHeight: '1.6', color: '#ccc', marginBottom: '1rem' }}>
                                Kreatywny programista specjalizujący się w tworzeniu immersyjnych doświadczeń webowych 3D.
                                Łączę czysty kod z wysokiej jakości wizualizacjami, tworząc niezapomniane interakcje cyfrowe.
                            </p>
                            <p style={{ lineHeight: '1.6', color: '#ccc' }}>
                                Obecnie skupiam się na ekosystemie React Three Fiber, shaderach GLSL i optymalizacji wydajności dla WebGL.
                                Działam na cyfrowym pograniczu, dostępny do misji zdalnych na całym świecie.
                            </p>
                            {/* CV Button removed as requested */}
                        </div>
                    </div>

                    {/* Media Query for Mobile Stack - Inline or handled via CSS Modules? 
                        Ideally CSS Modules, but for speed, we'll check width or use a CSS class helper if available.
                        Wait, gridTemplateColumns: '1fr 1fr' acts as columns. 
                        We need responsive behavior. best to inject a style tag or rely on `minmax` logic.
                        Actually, let's just use flex-wrap or a media query in SharedStyles.
                        But I am editing jsx here.
                        I'll change the inline grid to be responsive using the same strategy as the page grid, 
                        or I'll add a class to SharedStyles. 
                        Let's use a media query capable class in SharedStyles ideally, 
                        or inline style with window matchMedia (dirty).
                        
                        Better: Add a class `.bioGrid` to SharedStyles in previous step? 
                        Too late, I already sent the tool call for styles.
                        I will just modify the inline grid to use minmax to auto-stack.
                    */}
                </div>

                {/* SKILLS SECTION */}
                <div className={`${styles.holographicCard} card-anim`}>
                    <h3 className={styles.neonText} style={{ marginBottom: '1rem' }}>MODUŁY_SYSTEMU (UMIEJĘTNOŚCI)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {skills.map((skill, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem', fontFamily: 'VT323, monospace' }}>
                                    <span>{skill.name}</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '6px',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '3px',
                                    overflow: 'hidden'
                                }}>
                                    <div className="skill-bar" data-width={`${skill.level}%`} style={{
                                        width: 0, /* Start at 0 for animation */
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #00ffff, #d946ef)',
                                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
