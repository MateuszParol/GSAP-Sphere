import React from 'react';
import ProjectList from '../components/CMS/ProjectList';

const CaseStudies = () => {
    return (
        <div style={{ paddingTop: '100px', paddingBottom: '150px', overflowY: 'auto', height: '100dvh', position: 'relative', scrollbarWidth: 'none', boxSizing: 'border-box' }}>
            <h1 style={{ textAlign: 'center', color: '#fff', fontFamily: 'monospace', fontSize: '2.5rem', marginBottom: '40px' }}>
                MISSION LOGS
            </h1>
            <ProjectList />
        </div>
    );
};

export default CaseStudies;
