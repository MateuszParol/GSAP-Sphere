import React from 'react';
import { useLocation } from 'react-router-dom';
import TransitionLink from './TransitionLink';

const Navbar = () => {
    const location = useLocation();

    const navStyles = {
        position: 'fixed',
        top: '20px',
        left: '20px',
        right: '20px',
        height: '60px',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '12px',
        padding: '0 2rem',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
        flexWrap: 'wrap', // Allow wrapping on small screens
    };

    const brandStyles = {
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: '700',
        fontSize: '1.5rem',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 2px 2px 0px rgba(255, 0, 255, 0.4)',
        cursor: 'default',
        userSelect: 'none'
    };

    const linkContainerStyles = {
        display: 'flex',
        gap: '2rem'
    };

    const getLinkStyles = (path) => {
        const isActive = location.pathname === path;
        return {
            color: isActive ? '#00ffff' : '#aaa',
            textDecoration: 'none',
            fontFamily: "'Courier New', Courier, monospace",
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '0.9rem',
            transition: 'color 0.3s ease, text-shadow 0.3s ease',
            textShadow: isActive ? '0 0 8px rgba(0, 255, 255, 0.6)' : 'none',
            cursor: 'pointer'
        };
    };

    return (
        <nav style={navStyles}>
            <div style={brandStyles}>
                Mateusz Parol
            </div>
            <div style={linkContainerStyles}>
                <TransitionLink to="/" style={getLinkStyles('/')}>Map</TransitionLink>
                <TransitionLink to="/about" style={getLinkStyles('/about')}>About</TransitionLink>
                <TransitionLink to="/offer" style={getLinkStyles('/offer')}>Offer</TransitionLink>
                <TransitionLink to="/projects" style={getLinkStyles('/projects')}>Projects</TransitionLink>
                <TransitionLink to="/contact" style={getLinkStyles('/contact')}>Contact</TransitionLink>
            </div>
        </nav>
    );
};

export default Navbar;
