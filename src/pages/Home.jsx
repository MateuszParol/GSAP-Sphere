import React, { Suspense } from 'react';
import { useOutletContext } from 'react-router-dom'; // Import context hook
import { useTransition } from '../utils/TransitionContext';

// Lazy load the heavy 3D scene
const Scene = React.lazy(() => import('../components/Scene'));

const Home = () => {
    const { isWarping } = useTransition();
    const { isSystemReady } = useOutletContext() || {}; // Get boot state

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000' }}>
            <Suspense fallback={null}> {/* MainLayout LoadingScreen handles visual fallback now */}
                <Scene isWarping={isWarping} isSystemReady={isSystemReady} />
            </Suspense>
        </div>
    );
};

export default Home;
