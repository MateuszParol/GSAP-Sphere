# ROADMAP.md

> **Completed Milestone**: v3.0-Security-Hardening (2026-02-19)
> **Previous Milestone**: v2.0-Immersive-Homepage (2026-02-19)
> **Current Milestone**: v4.0-Experience-Polish
> **Goal**: Final polish, easter eggs, and advanced gamification (TBD).

## Must-Haves
- [ ] TBD

## Phases

### Phase 1: Planning
**Status**: ⬜ Not Started
**Objective**: Define scope for v4.0.
**Plan**: [PLAN.md](phases/1/PLAN.md)
**Objective**: Set up Router, layouts, and project structure for multiple pages.
- Install `react-router-dom`.
- Create `MainLayout` (Navbar, Footer, "Return to Map" persistent button).
- **Implement Sci-Fi Navbar**: Subtle, glassmorphism style, hidden/compact by default or minimalist (e.g., top-right holographic menu).
- **Immersive Transitions**: Implement "Warp Speed" (Map -> Page) and "Cyber Glitch" (Page -> Map).
- Move existing 3D Scene to `HomePage` component (The Map).
- Implement navigation logic: Sphere Point Click -> Navigate to Subpage.
- Create placeholders for `About`, `Offer`, `CaseStudies`.

### Phase 2: CMS Integration
**Status**: ✅ Completed
**Objective**: Connect Sanity.io for dynamic content management.
- Initialize Sanity project.
- Define schemas for `CaseStudy` (Title, Slug, Image, Description, Content).
- Create `cms-client` utility to fetch data.
- Build "Admin" dashboard (hosted by Sanity).

### Phase 3: Content Pages Implementation
**Status**: ✅ Completed
**Objective**: Build the UI for new text-heavy pages.
- **Offer Page**: Services list with pricing/details.
- **About Page**: Bio and skills section.
- **Case Studies**: List view and Detail view (using data from CMS).
- Ensure "Sci-Fi" aesthetic carries over to text pages (fonts, backgrounds).

### Phase 4: SEO & Optimization
**Status**: ✅ Completed
**Objective**: Make the site visible to Google.
- Install `react-helmet-async`.
- Add canonical tags, dynamic titles/descriptions.
- Implement Lazy Loading for the 3D Sphere (don't load until necessary or defer).
- Generate `sitemap.xml` and `robots.txt`.

### Phase 5: Polish & Interactions
**Status**: ✅ Completed
**Objective**: High-end animations and transitions.
- Page transition animations (GSAP).
- Mobile responsiveness adjustments.
- Verification of Contact Form.

## Milestone v2.0-Immersive-Homepage
> **Goal**: Transform the homepage into a high-performance, interactive 3D command center with spaceship aesthetics and advanced GSAP animations.

### Phase 1: Optimization & Core Setup
**Status**: ✅ Completed
**Considerations**: optimization of `Scene.jsx` and `HUD` logic.
- Audit current 3D performance (draw calls, poly count).
- Implement Dracos/Meshopt compression.
- Optimize textures (WebP, lower res where possible).
- [x] Implement proper `Dispose` logic for React Three Fiber (Verified in `Scene.jsx`).

### Phase 2: User Interface (HUD)
**Status**: ✅ Completed
**Objective**: Build the 2D "Spaceship" overlay.
- [x] Create `HUDOverlay` component (SVG/HTML).
- [x] Design sci-fi frames/brackets (FrameCorners, HUDDecoration).
- [x] Add interactive HUD elements (Compass, DataStreams).
- [x] Fix visibility and pitch reactivity issues.

### Phase 3: Interactive Sphere 2.0
**Status**: ✅ Completed
**Objective**: Revamp the 3D navigation points.
- [x] Map specific 3D coordinates to routes (Tetrahedral distribution).
- [x] Create `FeaturePoint` component with `Html` annotations (drei).
- [x] Implement "Floating Bubble" design for tooltips (Sci-Fi Glassmorphism).
- [x] Ensure color contrast and visibility (Neon Colors, 2px thickness).

### Phase 4: Advanced Animations (WOW Factor)
**Status**: ✅ Completed
**Objective**: Polish interactions with GSAP.
- Animate HUD entry (drawing lines, fading in).
- Animate "Bubbles" on hover (expand, reveal text).
- Refine Glitch/Warp transitions (shorter, impactful).
- Add camera movement animations on interaction.

### Phase 5: Verification & Mobile (v2.0)
**Status**: ✅ Completed
  - [x] **Goal:** Ensure smooth experience on devices.
  - [x] **Tasks:**
    - [x] Responsive CSS audit (`dvh` units)
    - [x] Mobile HUD with media queries
    - [x] Touch optimization for Sphere (larger hitboxes)
    - [x] Lighthouse audit & performance tuning on low-end devices.

### Phase 6: PWA & Final Optimization
**Status**: ✅ Completed
**Goal**: Installability and 100/100 Lighthouse score.
- [x] Add `manifest.json` and service workers (PWA).
- [x] Asset optimization (compression, caching).
- [x] Systematic Lighthouse Audit (SEO, Accessibility, Best Practices).
