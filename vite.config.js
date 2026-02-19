import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import { VitePWA } from 'vite-plugin-pwa'
import PluginObfuscator from 'vite-plugin-javascript-obfuscator'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        PluginObfuscator({
            include: [/\.jsx?$/, /\.tsx?$/, /\.js?$/],
            exclude: [/node_modules/, /\.css$/],
            apply: 'build',
            options: {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                disableConsoleOutput: true,
                numbersToExpressions: true,
                stringArray: true,
                stringArrayThreshold: 0.75,
                splitStrings: true,
                splitStringsChunkLength: 10,
            }
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: 'Mateusz Parol - 3D Portfolio',
                short_name: 'MParol 3D',
                description: 'Immersive 3D Portfolio featuring React Three Fiber and GSAP animations.',
                theme_color: '#000000',
                background_color: '#000000',
                display: 'standalone',
                orientation: 'portrait',
                icons: [
                    {
                        src: 'pwa-icon.svg',
                        sizes: '192x192',
                        type: 'image/svg+xml'
                    },
                    {
                        src: 'pwa-icon.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml'
                    },
                    {
                        src: 'pwa-icon.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,glb,gltf}'],
                runtimeCaching: [
                    {
                        urlPattern: ({ url }) => url.origin === 'https://cdn.sanity.io',
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'sanity-images',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
                            }
                        }
                    }
                ]
            }
        }),
        Sitemap({
            hostname: 'https://cosmotibia-sphere.netlify.app',
            dynamicRoutes: ['/about', '/offer', '/projects', '/contact']
        })
    ],
    server: {
        host: true
    }
})
