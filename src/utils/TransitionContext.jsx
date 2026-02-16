import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const [isWarping, setIsWarping] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);
    const navigate = useNavigate();

    const navigateWithWarp = (to) => {
        setIsWarping(true);
        // Warp duration: 1.5s
        setTimeout(() => {
            navigate(to);
            setIsWarping(false);
            // Optional: Trigger glitch on arrival
            triggerGlitch();
        }, 1500);
    };

    const navigateWithGlitch = (to) => {
        setIsGlitching(true);
        // Glitch duration: 0.2s (aggressive)
        setTimeout(() => {
            navigate(to);
            setIsGlitching(false);
        }, 200);
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
