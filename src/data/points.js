import * as THREE from 'three'

const RADIUS = 1.8;

export const points = [
    // --- MAIN NAVIGATION ROUTES (Tetrahedral Distribution) ---

    // 1. ABOUT: Front-Right-Top
    // Visible from start
    {
        id: 'about',
        position: new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(RADIUS),
        label: 'ABOUT',
        route: '/about',
        color: '#ff00ff', // Magenta
        description: 'Skills & Bio'
    },

    // 2. WORKS: Front-Left-Bottom
    // Visible from start
    {
        id: 'works',
        position: new THREE.Vector3(-1, -0.5, 1).normalize().multiplyScalar(RADIUS),
        label: 'WORKS',
        route: '/projects',
        color: '#00ffff', // Cyan
        description: 'Portfolio'
    },

    // 3. OFFER: Back-Right-Bottom
    // Requires rotation to see
    {
        id: 'offer',
        position: new THREE.Vector3(1, -1, -1).normalize().multiplyScalar(RADIUS),
        label: 'OFFER',
        route: '/offer',
        color: '#ffff00', // Yellow
        description: 'Services'
    },

    // 4. CONTACT: Back-Left-Top
    // Requires rotation to see
    {
        id: 'contact',
        position: new THREE.Vector3(-1, 1, -1).normalize().multiplyScalar(RADIUS),
        label: 'CONTACT',
        route: '/contact',
        color: '#00ff00', // Green
        description: 'Get in touch'
    }
];
