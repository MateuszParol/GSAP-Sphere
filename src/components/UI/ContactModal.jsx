import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import styles from './ContactModal.module.css'
import { sendContactForm } from '../../utils/email'

export default function ContactModal({ isOpen, onClose }) {
    const modalRef = useRef(null)
    const formRef = useRef(null)
    const overlayRef = useRef(null)
    const [status, setStatus] = useState('IDLE') // IDLE, SENDING, SUCCESS, ERROR

    useEffect(() => {
        if (isOpen) {
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

            document.body.style.cursor = 'default'
        } else {
            document.body.style.cursor = 'auto'
        }
    }, [isOpen])

    const handleClose = () => {
        // Animate Out
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('SENDING')

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value
        }

        try {
            await sendContactForm(formData)
            setStatus('SUCCESS')
            setTimeout(() => {
                handleClose()
                setStatus('IDLE')
            }, 2000)
        } catch (error) {
            console.error("Email failed:", error)
            setStatus('ERROR')
        }
    }

    if (!isOpen) return null

    return (
        <div className={styles.overlay} ref={overlayRef}>
            <div className={styles.modal} ref={modalRef}>
                <div className={styles.header}>
                    <h2 className={styles.title}>INITIATE_CONTACT</h2>
                    <button className={styles.closeBtn} onClick={handleClose}>
                        [ABORT]
                    </button>
                </div>

                {status === 'SUCCESS' ? (
                    <div className={styles.successMessage}>
                        <h3>TRANSMISSION COMPLETE</h3>
                        <p>Data packet sent successfully.</p>
                    </div>
                ) : (
                    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
                        <div className={styles.inputGroup}>
                            <label>IMIE I NAZWISKO</label>
                            <input type="text" name="name" required placeholder="Wpisz identyfikator..." />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>EMAIL</label>
                            <input type="email" name="email" required placeholder="Twój email..." />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>TEMAT</label>
                            <input type="text" name="subject" required placeholder="Temat zgłoszenia..." />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>TREŚĆ PROBLEMU</label>
                            <textarea name="message" required rows={4} placeholder="Opisz swój cel..." />
                        </div>

                        <div className={styles.actions}>
                            <button type="submit" className={styles.submitBtn} disabled={status === 'SENDING'}>
                                {status === 'SENDING' ? 'WYSYŁANIE...' : 'WYŚLIJ DANE'}
                            </button>
                            {status === 'ERROR' && <p className={styles.error}>BŁĄD WYSYŁANIA. SPRÓBUJ PONOWNIE.</p>}
                        </div>
                    </form>
                )}

                <div className={styles.decorLeft}></div>
                <div className={styles.decorRight}></div>
            </div>
        </div>
    )
}
