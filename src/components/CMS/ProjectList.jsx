import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../../sanityClient';
import gsap from 'gsap';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch projects sorted by creation date (newest first)
        const query = `*[_type == "project"] | order(_createdAt desc) {
            title,
            slug,
            description,
            mainImage,
            technologies,
            liveUrl,
            repoUrl
        }`;

        client.fetch(query)
            .then((data) => {
                setProjects(data);
                if (data.length > 0) {
                    setSelectedProject(data[0]); // Auto-select newest
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Sanity Fetch Error:', err);
                setError('Failed to load mission data.');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div style={{ color: '#00ffff', fontFamily: 'monospace', textAlign: 'center' }}>LOADING...</div>;
    if (error) return <div style={{ color: '#ff0000', fontFamily: 'monospace', textAlign: 'center' }}>{error}</div>;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row', // Default: Side-by-side
            height: 'calc(100vh - 200px)', // Adjust based on navbar/padding
            gap: '20px',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 20px',
            boxSizing: 'border-box'
        }}>
            {/* SIDEBAR (Project List) */}
            <div style={{
                width: '300px',
                minWidth: '250px',
                borderRight: '1px solid rgba(0, 255, 255, 0.2)',
                paddingRight: '20px',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <h3 style={{ color: '#00ffff', borderBottom: '1px solid #00ffff', paddingBottom: '10px', marginBottom: '10px' }}>
                    DATA LOGS
                </h3>
                {projects.map((project) => (
                    <div
                        key={project.slug?.current}
                        onClick={() => setSelectedProject(project)}
                        style={{
                            padding: '15px',
                            background: selectedProject === project ? 'rgba(0, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.4)',
                            border: selectedProject === project ? '1px solid #00ffff' : '1px solid rgba(0, 255, 255, 0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontFamily: 'monospace',
                            color: selectedProject === project ? '#fff' : '#aaaaaa'
                        }}
                    >
                        {project.title}
                    </div>
                ))}
            </div>

            {/* MAIN DETAIL VIEW */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(0, 255, 255, 0.1)',
                borderRadius: '8px',
                scrollbarWidth: 'none'
            }}>
                {selectedProject && (
                    <div className="project-detail-content">
                        <h2 style={{ color: '#00ffff', fontSize: '2.5rem', marginBottom: '10px', fontFamily: 'monospace' }}>
                            {selectedProject.title}
                        </h2>

                        {/* Tech Stack */}
                        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {selectedProject.technologies?.map((tech, i) => (
                                <span key={i} style={{
                                    color: '#00ffff',
                                    border: '1px solid #00ffff',
                                    padding: '2px 8px',
                                    fontSize: '0.8rem',
                                    borderRadius: '4px'
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {selectedProject.mainImage && (
                            <img
                                src={urlFor(selectedProject.mainImage).width(800).url()}
                                alt={selectedProject.title}
                                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '4px', marginBottom: '20px' }}
                            />
                        )}

                        <p style={{
                            color: '#cccccc',
                            lineHeight: '1.6',
                            fontSize: '1.1rem',
                            whiteSpace: 'pre-wrap',
                            marginBottom: '30px'
                        }}>
                            {selectedProject.description}
                        </p>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            {selectedProject.liveUrl && (
                                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" style={btnStyle}>
                                    LIVE DEMO
                                </a>
                            )}
                            {selectedProject.repoUrl && (
                                <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" style={btnStyle}>
                                    SOURCE CODE
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* CSS for Mobile Logic (Media Queries should be in CSS file, but checking window width inline for simplicity first or use css module) */}
            <style>{`
                @media (max-width: 768px) {
                    div[style*="flex-direction: row"] {
                        flex-direction: column !important;
                        height: auto !important;
                    }
                    div[style*="width: 300px"] {
                        width: 100% !important;
                        max-height: 200px;
                        overflow-y: auto;
                        border-right: none !important;
                        border-bottom: 1px solid rgba(0, 255, 255, 0.2);
                    }
                }
            `}</style>
        </div>
    );
};

const btnStyle = {
    background: 'rgba(0, 255, 255, 0.1)',
    border: '1px solid #00ffff',
    color: '#00ffff',
    padding: '10px 20px',
    textDecoration: 'none',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
};

export default ProjectList;
