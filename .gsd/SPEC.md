# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
A visually stunning, immersive web experience featuring an interactive 3D particle sphere on a animated starry background. The design embraces a "Cyber / Sci-Fi / Low Poly / PSX" aesthetic with a dark, moody palette highlighted by neon accents. It serves as a portfolio/landing page with interactive points of interest leading to external content and a contact form for creative collaboration.

## Goals
1.  **Immersive 3D Visuals:** A particle sphere "Hero" section responding to interaction, serving as the "WOW" factor.
2.  **Hybrid Navigation:** The Sphere acts as the primary "Map", but a subtle, sci-fi themed **Navbar** is always available for users preferring traditional navigation. Both must be seamless and immersive.
3.  **SEO-Driven Structure:** Multi-page architecture (Home, About, Offer, Case Studies) with semantic HTML and dynamic meta tags for Google indexing.
4.  **Content Management:** Integration of a Headless CMS (e.g., Sanity.io) allowing the user to manage Case Studies and Content via an admin panel.
5.  **Performance Optimization:** "Lazy loading" of heavy 3D elements to ensure fast First Contentful Paint (FCP) for SEO, without sacrificing the visual quality.
6.  **Professional Contact:** Functional contact form integrating with EmailJS.

## Non-Goals (Out of Scope)
-   **Custom Backend:** We will use a Headless CMS instead of building a custom API/Database from scratch.
-   **User Accounts:** No public user registration; only Admin access for the content creator.

## Users
-   **Clients:** Searching for "website building" or "programmer services", landing on specific Offer/Case Study pages.
-   **Administrator (You):** Needs a simple dashboard to add new Case Studies without touching code.
-   **Explorers:** Users enjoying the "spaceship" experience, navigating via the Sphere.
-   **Pragmatists:** Users who want quick access to information via the Navbar.

## Aesthetics & Design System
-   **Theme:** Sci-Fi, Low Poly, Glassmorphism.
-   **Layout:**
    -   **Home:** Full-screen 3D Sphere (The "WOW").
    -   **Subpages:** Clean, readable text with 3D accents/backgrounds, optimized for reading.
-   **Typography:** Readable sans-serif for content (Inter/Rajdhani), Retro for headers.

## Technical Stack
-   **Framework:** React (Vite) + `react-router-dom` for routing.
-   **SEO:** `react-helmet-async` for meta tags, `vite-plugin-sitemap`.
-   **CMS:** Sanity.io (Headless CMS) for managing Case Studies.
-   **Animation:** GSAP (UI) + @react-three/fiber (3D).
-   **Styling:** CSS Modules / Styled Components.

## Success Criteria
-   [ ] **Routing**: Functional navigation between Home, About, Offer, Case Studies.
-   [ ] **SEO**: Distinct Title/Description tags for every page. Sitemap generated.
-   [ ] **CMS**: Admin panel (Sanity Studio) allows creating/editing Case Studies.
-   [ ] **Performance**: 3D Sphere loads *after* critical content or is optimized to not block main thread.
-   [ ] **Mobile**: Responsive layout where text is legible and 3D doesn't crash the browser.
-   [ ] **Content**: "Offer" and "About" sections implemented with proper heading hierarchy (H1-H6).
