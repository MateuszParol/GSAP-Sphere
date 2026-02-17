import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/UI/Navbar';
import GlitchOverlay from '../components/UI/GlitchOverlay';
import TransitionLink from '../components/UI/TransitionLink';
import { useTransition } from '../utils/TransitionContext';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout = () => {
    const location = useLocation();
    const { isGlitching } = useTransition();
    const isHome = location.pathname === '/';

    // "Return to Map" button styles
    const returnBtnStyles = {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid #00ffff',
        color: '#00ffff',
        padding: '10px 20px',
        fontFamily: 'monospace',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textDecoration: 'none',
        zIndex: 1000,
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    return (
        <div className="app-container">
            <GlitchOverlay active={isGlitching} />
            <Navbar />

            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{
                        opacity: 1,
                        filter: 'blur(0px)',
                        transition: {
                            delay: 0.3, // Wait for glitch (approx 300ms post-nav)
                            duration: 0.8,
                            ease: 'easeOut'
                        }
                    }}
                    exit={{
                        opacity: 0,
                        filter: 'blur(10px)',
                        transition: { duration: 0.1 }
                    }}
                >
                    <Outlet />
                </motion.main>
            </AnimatePresence>

            {/* Show "Return to Map" only on subpages */}
            {!isHome && (
                <TransitionLink to="/" style={returnBtnStyles} className="return-btn">
                    &lt; Return to Map
                </TransitionLink>
            )}
        </div>
    );
};

export default MainLayout;
