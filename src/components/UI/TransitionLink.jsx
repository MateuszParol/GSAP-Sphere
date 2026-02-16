import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../../utils/TransitionContext';

const TransitionLink = ({ to, children, className, style }) => {
    const { navigateWithWarp, navigateWithGlitch } = useTransition();
    const location = useLocation();

    const handleClick = (e) => {
        e.preventDefault();

        if (location.pathname === to) return;

        // Logic: Map (Home) -> Subpage = Warp
        // Subpage -> Map = Glitch (or Warp?)
        // Subpage -> Subpage = Glitch

        const isFromHome = location.pathname === '/';
        const isToHome = to === '/';

        if (isFromHome && !isToHome) {
            navigateWithWarp(to);
        } else {
            navigateWithGlitch(to);
        }
    };

    // Match NavLink active style logic if needed, but for simplicity we use basic styles passed in
    // or we could use useMatch from router

    return (
        <a href={to} onClick={handleClick} className={className} style={style}>
            {children}
        </a>
    );
};

export default TransitionLink;
