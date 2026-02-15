import * as THREE from 'three'

export const points = [
    {
        id: 'about',
        position: new THREE.Vector3(1.2, 0.8, 1.0).normalize().multiplyScalar(1.85),
        label: 'Technologie',
        color: '#ff71ce', // Neon Pink
        description: 'React, Three.js, GSAP, Node.js',
        type: 'info'
    },
    {
        id: 'works',
        position: new THREE.Vector3(-1.2, 0.5, 1.2).normalize().multiplyScalar(1.85),
        label: 'Projekty',
        color: '#01cdfe', // Neon Blue
        description: 'Zobacz moje realizacje',
        type: 'info'
    },
    {
        id: 'socials',
        position: new THREE.Vector3(0, -1.5, 0.8).normalize().multiplyScalar(1.85),
        label: 'Socials',
        color: '#05ffa1', // Neon Green
        description: 'LinkedIn, GitHub, Instagram',
        type: 'link'
    },
    {
        id: 'contact',
        position: new THREE.Vector3(0.5, 0.2, -1.8).normalize().multiplyScalar(1.85),
        label: 'Kontakt',
        color: '#b967ff', // Neon Purple
        description: 'Napisz do mnie',
        type: 'modal'
    }
]
