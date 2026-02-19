import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TransitionLink from './TransitionLink';

const Navbar = () => {
    const location = useLocation();

    // Media query hook or simple check
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isOpen, setIsOpen] = useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) setIsOpen(false); // Reset on desktop
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navStyles = {
        position: 'fixed',
        top: '20px',
        left: '20px',
        right: '20px',
        height: isMobile ? (isOpen ? 'auto' : '60px') : '60px',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '12px',
        padding: isMobile ? '0 1rem' : '0 2rem',
        zIndex: 2000,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'flex-start' : 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
        gap: isMobile ? '1rem' : '0',
        transition: 'height 0.3s ease',
        overflow: 'hidden'
    };

    const headerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px', // Fixed height for header part
        width: isMobile ? '100%' : 'auto'
    };

    const brandStyles = {
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: '700',
        fontSize: '1.5rem',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 2px 2px 0px rgba(255, 0, 255, 0.4)',
        cursor: 'pointer',
        userSelect: 'none'
    };

    const linkContainerStyles = {
        display: isMobile && !isOpen ? 'none' : 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '1.5rem' : '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: isMobile ? '1rem' : '0',
        opacity: isMobile && !isOpen ? 0 : 1,
        transition: 'opacity 0.3s ease'
    };

    const getLinkStyles = (path) => {
        const isActive = location.pathname === path;
        return {
            color: isActive ? '#00ffff' : '#aaa',
            textDecoration: 'none',
            fontFamily: "'Courier New', Courier, monospace",
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: isMobile ? '1rem' : '0.9rem',
            transition: 'color 0.3s ease, text-shadow 0.3s ease',
            textShadow: isActive ? '0 0 8px rgba(0, 255, 255, 0.6)' : 'none',
            cursor: 'pointer'
        };
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav style={navStyles}>
            <div style={headerStyles}>
                <div style={brandStyles} onClick={() => setIsOpen(false)}>
                    Mateusz Parol
                </div>

                {/* HAMBURGER BUTTON */}
                {isMobile && (
                    <button
                        onClick={toggleMenu}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#00ffff',
                            cursor: 'pointer',
                            padding: '10px'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {isOpen ? (
                                <g>
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </g>
                            ) : (
                                <g>
                                    <path d="M3 6h18M7 12h14M3 18h18" />
                                </g>
                            )}
                        </svg>
                    </button>
                )}
            </div>

            <div style={linkContainerStyles}>
                <TransitionLink to="/" style={getLinkStyles('/')} className="nav-link" onClick={() => setIsOpen(false)}>Map</TransitionLink>
                <TransitionLink to="/about" style={getLinkStyles('/about')} className="nav-link" onClick={() => setIsOpen(false)}>About</TransitionLink>
                <TransitionLink to="/offer" style={getLinkStyles('/offer')} className="nav-link" onClick={() => setIsOpen(false)}>Offer</TransitionLink>
                <TransitionLink to="/projects" style={getLinkStyles('/projects')} className="nav-link" onClick={() => setIsOpen(false)}>Projects</TransitionLink>
                <TransitionLink to="/contact" style={getLinkStyles('/contact')} className="nav-link" onClick={() => setIsOpen(false)}>Contact</TransitionLink>
            </div>
        </nav>
    );
};

export default Navbar;
