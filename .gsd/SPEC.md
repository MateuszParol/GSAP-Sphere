# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
A visually stunning, immersive web experience featuring an interactive 3D particle sphere on a animated starry background. The design embraces a "Cyber / Sci-Fi / Low Poly / PSX" aesthetic with a dark, moody palette highlighted by neon accents. It serves as a portfolio/landing page with interactive points of interest leading to external content and a contact form for creative collaboration.

## Goals
1.  **Immersive 3D Visuals:** A particle sphere that reacts to cursor movement (desktop) and touch (mobile), set against a dynamic starry background.
2.  **Interactive Navigation:** 4 distinct, clickable points on the sphere that link to external content.
3.  **Functional Contact:** A fully working contact form (Name, Email, Phone, Idea) integrating with an external email service.
4.  **Premium Aesthetics:** High-quality "Sci-Fi / Low Poly" look with smooth GSAP animations and responsive design.

## Non-Goals (Out of Scope)
-   Backend development (Serverless/EmailJS will be used).
-   Complex CMS (Content will be hardcoded but easily editable).
-   User authentication or accounts.

## Users
-   **Visitors:** Potential clients or collaborators interested in the creator's work "Idea/Project".
-   **Creator (User):** Needs to easily update links and receive project inquiries via email.

## Aesthetics & Design System
-   **Theme:** Sci-Fi, Low Poly, PSX Graphics, Cyber.
-   **Colors:**
    -   Background: Deep Grey/Black Mix (Low-poly black).
    -   Accents: White, Pale Light Blue, Magenta, Pink, Blue.
    -   Style: Pastel, Cold tones for the interactive points.
-   **Typography:** Retro-futuristic / Terminal style (e.g., VT323, Press Start 2P, or clean geometric sans like Rajdhani).

## Technical Stack
-   **Framework:** React (Vite).
-   **Animation/3D:** GSAP (for UI/Transitions) + @react-three/fiber (Three.js for 3D Sphere).
-   **Styling:** CSS Modules or Tailwind.
-   **Form Handling:** External Service (e.g., EmailJS).

## Success Criteria
-   [ ] Sphere renders with particles and responds to mouse/touch.
-   [ ] Background is animated (starfield).
-   [ ] 4 Points of Interest are visible, clickable, and rotate with the sphere.
-   [ ] Contact form validates inputs and successfully sends an email.
-   [ ] "Non-invasive" pastel colors used for markers.
-   [ ] Mobile responsiveness verification (touch rotation).
