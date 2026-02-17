import React, { useRef, useState } from 'react';
import styles from './ContactModal.module.css'; // Reusing styles for now, or we can split them
import { sendContactForm, isEmailConfigured } from '../../utils/email';

const ContactForm = ({ onSuccess, className }) => {
    const formRef = useRef(null);
    const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SENDING');

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            title: e.target.subject.value,
            message: e.target.message.value
        };

        try {
            await sendContactForm(formData);
            setStatus('SUCCESS');
            if (onSuccess) onSuccess();

            // Reset after delay if reusable
            setTimeout(() => {
                setStatus('IDLE');
                if (formRef.current) formRef.current.reset();
            }, 3000);

        } catch (error) {
            console.error("FAILED...", error);
            if (error.text) console.error("EmailJS Error Text:", error.text);
            setStatus('ERROR');
        }
    };

    if (status === 'SUCCESS') {
        return (
            <div className={styles.successMessage}>
                <h3>TRANSMISSION COMPLETE</h3>
                <p>Data packet sent successfully.</p>
            </div>
        );
    }

    // Holographic Styles (matching SharedStyles)
    const inputStyle = {
        background: 'rgba(10, 20, 30, 0.6)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '0px', // Tech look
        padding: '1rem',
        color: '#fff',
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '1rem',
        outline: 'none',
        width: '100%',
        transition: 'all 0.3s',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
        boxSizing: 'border-box'
    };

    const labelStyle = {
        fontFamily: "'VT323', monospace",
        color: '#00ffff',
        fontSize: '1.1rem',
        letterSpacing: '1px',
        marginBottom: '0.5rem',
        display: 'block',
        textTransform: 'uppercase'
    };

    const focusStyle = (e) => {
        e.target.style.borderColor = '#00ffff';
        e.target.style.background = 'rgba(0, 255, 255, 0.05)';
        e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.2)';
    };

    const blurStyle = (e) => {
        e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)';
        e.target.style.background = 'rgba(10, 20, 30, 0.6)';
        e.target.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.5)';
    };

    return (
        <form className={`${styles.form} ${className || ''}`} onSubmit={handleSubmit} ref={formRef}>
            {!isEmailConfigured && (
                <div style={{
                    border: '1px solid #eab308',
                    background: 'rgba(234, 179, 8, 0.1)',
                    color: '#eab308',
                    padding: '0.5rem',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    fontFamily: 'monospace'
                }}>
                    [SIMULATION MODE] Email service not configured.
                </div>
            )}
            <div className={styles.inputGroup}>
                <label style={labelStyle}>Imie i Nazwisko</label>
                <input
                    type="text"
                    name="name"
                    required
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                />
            </div>

            <div className={styles.inputGroup}>
                <label style={labelStyle}>Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                />
            </div>

            <div className={styles.inputGroup}>
                <label style={labelStyle}>Temat</label>
                <input
                    type="text"
                    name="subject"
                    required
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                />
            </div>

            <div className={styles.inputGroup}>
                <label style={labelStyle}>Wiadomość</label>
                <textarea
                    name="message"
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                />
            </div>

            <div className={styles.actions}>
                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'SENDING'}
                    style={{
                        background: 'rgba(0, 255, 255, 0.05)',
                        border: '1px solid #00ffff',
                        color: '#00ffff',
                        padding: '10px 24px',
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                        width: 'auto',
                        marginTop: '1rem',
                        opacity: status === 'SENDING' ? 0.7 : 1
                    }}
                    onMouseOver={(e) => {
                        if (status !== 'SENDING') {
                            e.target.style.background = 'rgba(0, 255, 255, 0.2)';
                            e.target.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.4)';
                            e.target.style.textShadow = '0 0 5px #00ffff';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (status !== 'SENDING') {
                            e.target.style.background = 'rgba(0, 255, 255, 0.05)';
                            e.target.style.boxShadow = 'none';
                            e.target.style.textShadow = 'none';
                        }
                    }}
                >
                    {status === 'SENDING' ? 'Wysyłanie...' : 'Wyślij Wiadomość'}
                </button>
                {status === 'ERROR' && <p className={styles.error} style={{ color: '#f87171', marginTop: '1rem', textAlign: 'center' }}>Błąd wysyłania. Spróbuj ponownie.</p>}
            </div>
        </form>
    );
};

export default ContactForm;
