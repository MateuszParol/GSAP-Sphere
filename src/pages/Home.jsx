import React from 'react';
import Scene from '../components/Scene';
import { useTransition } from '../utils/TransitionContext';

const Home = () => {
    const { isWarping } = useTransition();

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Scene isWarping={isWarping} />
        </div>
    );
};

export default Home;
