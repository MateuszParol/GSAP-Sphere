# ROADMAP.md

> **Current Milestone**: v1.0-SEO-Portfolio
> **Goal**: Transform the 3D demo into a professional, SEO-optimized portfolio with content management.

## Must-Haves
- [ ] Multi-page routing (Home, About, Offer, Case Studies).
- [ ] Headless CMS Integration (Sanity.io) for managing projects.
- [ ] SEO Meta Tags (Title, Description) per page.
- [ ] Performance Optimization (Lazy loaded 3D).

## Phases

### Phase 1: Foundation & Architecture
**Status**: ✅ Completed
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
**Status**: ⬜ Not Started
**Objective**: Make the site visible to Google.
- Install `react-helmet-async`.
- Add canonical tags, dynamic titles/descriptions.
- Implement Lazy Loading for the 3D Sphere (don't load until necessary or defer).
- Generate `sitemap.xml` and `robots.txt`.

### Phase 5: Polish & Interactions
**Status**: ⬜ Not Started
**Objective**: High-end animations and transitions.
- Page transition animations (GSAP).
- Mobile responsiveness adjustments.
- Verification of Contact Form.
