import React, { Suspense } from 'react';
import { useTransition } from '../utils/TransitionContext';

// Lazy load the heavy 3D scene
const Scene = React.lazy(() => import('../components/Scene'));

const Home = () => {
    const { isWarping } = useTransition();

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000' }}>
            <Suspense fallback={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: '#00ffff',
                    fontFamily: 'monospace',
                    flexDirection: 'column'
                }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>INITIALIZING SYSTEM...</div>
                    <div style={{ width: '200px', height: '2px', background: 'rgba(0,255,255,0.2)' }}>
                        <div style={{ width: '50%', height: '100%', background: '#00ffff', animation: 'loading 1s infinite' }}></div>
                    </div>
                    <style>{`
                        @keyframes loading {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(200%); }
                        }
                    `}</style>
                </div>
            }>
                <Scene isWarping={isWarping} />
            </Suspense>
        </div>
    );
};

export default Home;
