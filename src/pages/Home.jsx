import React, { Suspense } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTransition } from '../utils/TransitionContext';

const Scene = React.lazy(() => import('../components/Scene'));

const Home = () => {
    // isWarping removed as feature is disabled
    const { isSystemReady } = useOutletContext() || {};

    return (
        <div style={{ width: '100vw', height: '100dvh', position: 'relative', background: '#000' }}>
            <Suspense fallback={null}>
                <Scene isWarping={false} isSystemReady={isSystemReady} />
            </Suspense>
        </div>
    );
};

export default Home;
