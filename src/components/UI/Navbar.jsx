import React from 'react';
import { useLocation } from 'react-router-dom';
import TransitionLink from './TransitionLink';

const Navbar = () => {
    const location = useLocation();

    const navStyles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '12px',
        padding: '1rem 2rem',
        zIndex: 1000,
        display: 'flex',
        gap: '2rem',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
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
            <TransitionLink to="/" style={getLinkStyles('/')}>Map</TransitionLink>
            <TransitionLink to="/about" style={getLinkStyles('/about')}>About</TransitionLink>
            <TransitionLink to="/offer" style={getLinkStyles('/offer')}>Offer</TransitionLink>
            <TransitionLink to="/projects" style={getLinkStyles('/projects')}>Projects</TransitionLink>
            <TransitionLink to="/contact" style={getLinkStyles('/contact')}>Contact</TransitionLink>
        </nav>
    );
};

export default Navbar;
