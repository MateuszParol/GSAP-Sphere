import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import styles from './ContactModal.module.css'
import ContactForm from './ContactForm'

export default function ContactModal({ isOpen, onClose }) {
    const modalRef = useRef(null)
    const overlayRef = useRef(null)

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

    const handleSuccess = () => {
        setTimeout(() => {
            handleClose()
        }, 2000)
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

                <ContactForm onSuccess={handleSuccess} />

                <div className={styles.decorLeft}></div>
                <div className={styles.decorRight}></div>
            </div>
        </div>
    )
}
