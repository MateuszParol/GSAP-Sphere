import React, { useRef } from 'react';
import { urlFor } from '../../sanityClient';
import gsap from 'gsap';

const ProjectCard = ({ project }) => {
    const cardRef = useRef(null);
    const borderRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(borderRef.current, {
            opacity: 1,
            boxShadow: '0 0 20px #00ffff',
            duration: 0.3
        });
        gsap.to(cardRef.current, {
            scale: 1.02,
            duration: 0.3
        });
    };

    const handleMouseLeave = () => {
        gsap.to(borderRef.current, {
            opacity: 0.3,
            boxShadow: 'none',
            duration: 0.3
        });
        gsap.to(cardRef.current, {
            scale: 1,
            duration: 0.3
        });
    };

    return (
        <a
            href={project.liveUrl || project.repoUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
        >
            <div
                ref={cardRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    position: 'relative',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(0, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '20px',
                    margin: '15px',
                    maxWidth: '350px',
                    cursor: 'pointer',
                    // overflow: 'hidden', // Disabled to allow text to flow
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Glowing Border Element */}
                <div
                    ref={borderRef}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        border: '1px solid #00ffff',
                        opacity: 0.3,
                        borderRadius: '8px',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                />

                {/* Image */}
                {project.mainImage && (
                    <div style={{
                        width: '100%',
                        height: '200px',
                        marginBottom: '15px',
                        overflow: 'hidden',
                        borderRadius: '4px'
                    }}>
                        <img
                            src={urlFor(project.mainImage).width(400).url()}
                            alt={project.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                )}

                {/* Content */}
                <h3 style={{ color: '#00ffff', fontFamily: 'monospace', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                    {project.title}
                </h3>

                <p style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                    {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {project.technologies?.map((tech, index) => (
                        <span key={index} style={{
                            background: 'rgba(0, 255, 255, 0.1)',
                            color: '#00ffff',
                            fontSize: '0.7rem',
                            padding: '3px 8px',
                            borderRadius: '10px',
                            fontFamily: 'monospace'
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
};

export default ProjectCard;
