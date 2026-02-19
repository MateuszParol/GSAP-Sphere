import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/UI/Navbar';
import GlitchOverlay from '../components/UI/GlitchOverlay';
import LoadingScreen from '../components/UI/LoadingScreen'; // Import LoadingScreen
import TransitionLink from '../components/UI/TransitionLink';
import HUDOverlay from '../components/HUD/HUDOverlay';
import { useTransition } from '../utils/TransitionContext';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout = () => {
    const location = useLocation();
    const { isGlitching } = useTransition();
    const isHome = location.pathname === '/';

    // System Boot State
    const [isSystemReady, setIsSystemReady] = useState(false);

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
            {/* 1. Loading Screen (Only on first load, check session storage? For now, every refresh) */}
            {!isSystemReady && <LoadingScreen onComplete={() => setIsSystemReady(true)} />}

            {/* 2. UI Overlays - Only show HUD when system is ready to trigger entry animation */}
            <GlitchOverlay active={isGlitching} />
            <HUDOverlay active={isHome && isSystemReady} />

            {/* 3. Navbar - Fade in after load? */}
            <div style={{ position: 'relative', zIndex: 2000, pointerEvents: 'auto', opacity: isSystemReady ? 1 : 0, transition: 'opacity 1s ease' }}>
                <Navbar />
            </div>

            <AnimatePresence>
                <motion.main
                    key={location.pathname}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{
                        opacity: 1,
                        filter: 'blur(0px)',
                        transition: {
                            delay: 0.3,
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
                    {/* Pass system state to children (Home/Scene) */}
                    <Outlet context={{ isSystemReady }} />
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
