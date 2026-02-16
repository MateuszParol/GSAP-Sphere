import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from '../styles/SharedStyles.module.css';

const Offer = () => {
    const containerRef = useRef(null);
    const services = [
        {
            title: "TWORZENIE_APLIKACJI_WEB",
            desc: "Budowanie skalowalnych, wydajnych aplikacji webowych przy użyciu React, Next.js i nowoczesnych wzorców architektury. Pełny cykl rozwoju od koncepcji po wdrożenie.",
            features: ["Architektura SPA / PWA", "Zarządzanie Stanem (Redux/Zustand)", "Integracja API"]
        },
        {
            title: "IMMERSYJNE_DOŚWIADCZENIA_3D",
            desc: "Tworzenie zachwycających wizualizacji 3D w przeglądarce przy użyciu Three.js i React Three Fiber. Interaktywne cząsteczki, shadery i symulacje fizyki.",
            features: ["WebGL / R3F", "Custom Shadery (GLSL)", "Optymalizacja Wydajności"]
        },
        {
            title: "SEO_&_OPTYMALIZACJA",
            desc: "Optymalizacja zasobów cyfrowych dla maksymalnej widoczności i prędkości. Zapewnienie wysokich pozycji w Google i błyskawicznego ładowania.",
            features: ["Core Web Vitals", "Techniczne SEO", "Dostępność (WCAG)"]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo("h1",
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
            );

            gsap.fromTo(".service-card",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "back.out(1.2)", delay: 0.3 }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.pageContainer} ref={containerRef}>
            <h1 className={styles.sectionTitle}>// KATALOG_USŁUG: <span style={{ color: '#fff' }}>OFERTA</span></h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {services.map((service, index) => (
                    <div key={index} className={`${styles.holographicCard} service-card`}>
                        <h3 className={styles.neonText} style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#00ffff' }}>
                            {service.title}
                        </h3>
                        <p style={{
                            lineHeight: '1.6',
                            color: '#ccc',
                            marginBottom: '1.5rem',
                            minHeight: '80px',
                            textAlign: index === 1 ? 'justify' : 'left'
                        }}>
                            {service.desc}
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {service.features.map((feature, i) => (
                                <li key={i} style={{
                                    paddingLeft: '20px',
                                    marginBottom: '0.5rem',
                                    position: 'relative',
                                    color: '#a5f3fc',
                                    fontFamily: 'VT323, monospace',
                                    fontSize: '1.1rem'
                                }}>
                                    <span style={{ position: 'absolute', left: 0, color: '#d946ef' }}>&gt;</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                                STATUS: DOSTĘPNY
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.7 }}>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <p className={`${styles.codeText} ${styles.neonText}`} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                        onMouseEnter={(e) => e.target.style.color = '#d946ef'}
                        onMouseLeave={(e) => e.target.style.color = '#00ffff'}
                    >
                        Potrzebujesz niestandardowego rozwiązania?
                    </p>
                </Link>
                <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, #00ffff)', margin: '1rem auto' }}></div>
            </div>
        </div>
    );
};

export default Offer;
