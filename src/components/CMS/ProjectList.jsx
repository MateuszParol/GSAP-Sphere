import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../../sanityClient';
import styles from './ProjectList.module.css';
import sharedStyles from '../../styles/SharedStyles.module.css';

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

    if (isLoading) return <div style={{ color: '#00ffff', fontFamily: 'monospace', textAlign: 'center', marginTop: '50px' }}>ŁADOWANIE DANYCH MISJI...</div>;
    if (error) return <div style={{ color: '#ff0000', fontFamily: 'monospace', textAlign: 'center', marginTop: '50px' }}>{error}</div>;

    return (
        <div className={styles.container}>
            {/* SIDEBAR (Project List) */}
            <div className={styles.sidebar}>
                <h3 className={`${styles.sidebarHeader} ${sharedStyles.neonText}`}>
                    LOGI_DANYCH // PROJEKTY
                </h3>
                {projects.map((project) => (
                    <div
                        key={project.slug?.current}
                        onClick={() => setSelectedProject(project)}
                        className={selectedProject === project ? styles.projectItemActive : styles.projectItem}
                    >
                        &gt; {project.title}
                    </div>
                ))}
            </div>

            {/* MAIN DETAIL VIEW */}
            <div className={`${styles.detailView} ${sharedStyles.holographicCard}`}>
                {selectedProject ? (
                    <div className="project-detail-content">
                        <h2 className={styles.detailTitle}>
                            {selectedProject.title}
                        </h2>

                        {/* Tech Stack */}
                        <div className={styles.techStack}>
                            {selectedProject.technologies?.map((tech, i) => (
                                <span key={i} className={styles.techBadge}>
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {selectedProject.mainImage && (
                            <img
                                src={urlFor(selectedProject.mainImage).width(800).url()}
                                alt={selectedProject.title}
                                className={styles.mainImage}
                            />
                        )}

                        <p className={styles.description}>
                            {selectedProject.description}
                        </p>

                        <div className={styles.actions}>
                            {selectedProject.liveUrl && (
                                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                                    LIVE_DEMO
                                </a>
                            )}
                            {selectedProject.repoUrl && (
                                <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                                    KOD_ŹRÓDŁOWY
                                </a>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{ color: '#666', textAlign: 'center', marginTop: '100px', fontFamily: 'monospace' }}>
                        WYBIERZ PROJEKT Z LISTY ABY ZOBACZYĆ SZCZEGÓŁY
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectList;
