import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const [isWarping, setIsWarping] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // SAFETY RESET: Ensure state is cleared on every route change
    // This prevents "unfinished animation" locks reported by user
    useEffect(() => {
        // We defer the reset slightly to ensure the "exit" animation of the previous page
        // doesn't snap, but 'isWarping'/locks shouldn't block interaction.
        // Actually, we should probably clear 'isWarping' immediately if we arrived.

        // If we arrived, we are no longer warping to a destination.
        setIsWarping(false);

        // Glitch might be desired during entry, handled by the timeout in navigateWithGlitch.
        // But if it got stuck, we ensure it eventually clears.
        const safetyTimer = setTimeout(() => {
            if (isGlitching) setIsGlitching(false);
        }, 1000);

        return () => clearTimeout(safetyTimer);
    }, [location.pathname]);

    const navigateWithWarp = (to) => {
        // Visual only - no blocking
        setIsWarping(true);
        navigate(to);
        setTimeout(() => setIsWarping(false), 1000);
    };

    const navigateWithGlitch = (to) => {
        setIsGlitching(true);
        navigate(to);
        setTimeout(() => setIsGlitching(false), 500);
    };

    const triggerGlitch = () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
    };

    return (
        <TransitionContext.Provider value={{ isWarping, isGlitching, navigateWithWarp, navigateWithGlitch }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => useContext(TransitionContext);
