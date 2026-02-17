import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { client, urlFor } from '../sanityClient';

const ProjectDetails = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await client.fetch(
                    `*[_type == "project" && slug.current == $slug][0]`,
                    { slug }
                );
                setProject(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching project:", error);
                setLoading(false);
            }
        };

        fetchProject();
    }, [slug]);

    if (loading) {
        return (
            <div style={{ color: '#00ffff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
                INITIALIZING UPLINK...
            </div>
        );
    }

    if (!project) {
        return (
            <div style={{ color: '#f00', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
                ERROR: PROJECT_NOT_FOUND
            </div>
        );
    }

    return (
        <div className="page-container" style={{
            padding: '100px 20px',
            maxWidth: '1000px',
            margin: '0 auto',
            color: '#fff',
            fontFamily: "'Rajdhani', sans-serif"
        }}>
            <Link to="/projects" style={{
                color: '#00ffff',
                textDecoration: 'none',
                fontFamily: 'monospace',
                display: 'inline-block',
                marginBottom: '30px',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                padding: '8px 16px',
                borderRadius: '4px'
            }}>
                &lt; RETURN_TO_ARCHIVES
            </Link>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 style={{
                    fontSize: '4rem',
                    marginBottom: '20px',
                    textTransform: 'uppercase',
                    color: '#fff'
                }}>
                    {project.title}
                </h1>

                {project.technologies && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
                        {project.technologies.map((tech, i) => (
                            <span key={i} style={{
                                background: 'rgba(0, 255, 255, 0.1)',
                                color: '#00ffff',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                fontFamily: 'monospace'
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {project.mainImage && (
                    <img
                        src={urlFor(project.mainImage).width(1200).url()}
                        alt={project.title}
                        style={{
                            width: '100%',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            marginBottom: '40px'
                        }}
                    />
                )}

                <div style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    padding: '40px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    color: '#ccc'
                }}>
                    {project.description}
                </div>

                <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                            background: '#00ffff',
                            color: '#000',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }}>
                            Launch Project
                        </a>
                    )}
                    {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" style={{
                            background: 'transparent',
                            color: '#fff',
                            border: '1px solid #fff',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }}>
                            View Code
                        </a>
                    )}
                </div>

            </motion.div>
        </div>
    );
};

export default ProjectDetails;
