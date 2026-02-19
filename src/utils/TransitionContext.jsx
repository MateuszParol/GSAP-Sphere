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

        // REMOVED: setIsWarping(false) to allow warp animation to finish via its own timeout
        // even after route change.

        // Glitch might be desired during entry, handled by the timeout in navigateWithGlitch.
        // But if it got stuck, we ensure it eventually clears.
        const safetyTimer = setTimeout(() => {
            if (isGlitching) setIsGlitching(false);
            // Safety cleanup for warp if it gets stuck for too long (longer than the 1s timeout)
            if (isWarping) setIsWarping(false);
        }, 1500); // 1.5s is enough for the 1s warp to finish + buffer

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
