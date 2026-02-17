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
        // 1. Wait for glitch to cover screen (100ms approx)
        setTimeout(() => {
            navigate(to);

            // 2. Keep glitch active during page load/fade (300ms hold)
            setTimeout(() => {
                setIsGlitching(false);
            }, 300);
        }, 100);
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
