import React, { useEffect, useRef } from 'react';
import ContactForm from '../components/UI/ContactForm';
import { gsap } from 'gsap';
import styles from '../styles/SharedStyles.module.css';

const Contact = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo("h1",
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
            );

            gsap.fromTo(".contact-content",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.pageContainer} ref={containerRef}>
            <h1 className={styles.sectionTitle}>// PROTOKÓŁ_TRANSMISJI: <span style={{ color: '#fff' }}>KONTAKT</span></h1>

            <div className={`contact-content ${styles.holographicCard}`} style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'start' }}>

                    {/* LEFT COLUMN: Info */}
                    <div style={{ flex: '1 1 300px', minWidth: '0' }}>
                        <h3 className={styles.neonText} style={{ marginBottom: '1.5rem', color: '#00ffff' }}>
                            KANAŁY_KOMUNIKACJI
                        </h3>

                        <p style={{ lineHeight: '1.6', color: '#ccc', marginBottom: '2rem' }}>
                            Zainicjuj bezpieczne połączenie. Wypełnij parametry transmisji, aby nawiązać kontakt z operatorem systemu.
                        </p>

                        <div style={{ fontFamily: 'VT323, monospace', fontSize: '1.2rem', color: '#00ffff', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#d946ef' }}>&gt;</span> STATUS: <span style={{ color: '#4ade80' }}>OCZEKIWANIE_NA_DANE</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#d946ef' }}>&gt;</span> SZYFROWANIE: <span style={{ color: '#4ade80' }}>AKTYWNE (256-bit)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#d946ef' }}>&gt;</span> LOKALIZACJA: <span style={{ color: '#fff' }}>WARSZAWA, PL</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Form */}
                    <div style={{ flex: '1 1 300px', minWidth: '0' }}>
                        <ContactForm />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
