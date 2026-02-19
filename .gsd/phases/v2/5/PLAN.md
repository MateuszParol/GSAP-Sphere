# Phase 5: Verification & Mobile (v2.0)

## Objective
Ensure the application offers a premium experience on mobile devices, with optimized 3D performance and touch-friendly interactions.

## Features

### 5.1. Mobile HUD ("Mobile Minimal")
*   **Concept**: Desktop HUD is too cluttered for mobile. Simplify it.
*   **Changes**:
    *   Hide "corners" or scale them down.
    *   Move "Compass" to a compact top-right or bottom-center indicator.
    *   Ensure "Offer/Contact" buttons are easily thumb-accessible.
*   **Tech**: CSS Media Queries (`@media (max-width: 768px)`).

### 5.2. Sphere Touch Interaction
*   **Problem**: Mouse events don't perfectly map to touch; hitboxes are too small.
*   **Solution**:
    *   Use `@use-gesture` or standard R3F events with larger invisible hit-planes behind points.
    *   Increase `scale` of hidden hit-mesh for FeaturePoints.
    *   Ensure OrbitControls handles touch rotation smoothly (default usually works, but check damping).

### 5.3. Viewport & Layout
*   **Problem**: Mobile browser address bars resize the viewport.
*   **Solution**:
    *   Switch `height: 100vh` to `height: 100dvh` in `MainLayout` and `SharedStyles`.
    *   Ensure Background/Canvas covers the entire scrollable area if needed.

### 5.4. Performance Optimization
*   **Goal**: Stable frame rate.
*   **Actions**:
    *   Limit `pixelRatio` on mobile (max 1.5 or 1).
    *   Reduce particle count in `ParticleSphere` if mobile detected? (Optional, verify perf first).

## Execution Steps

1.  **CSS Audit & DVH**
    *   Update `MainLayout.jsx` and `SharedStyles.module.css` to use `dvh`.
    *   Fix Navbar overlapping content on small screens.

2.  **HUD Responsiveness**
    *   Add media queries to `HUD.module.css`.
    *   Hide non-essential decoration (e.g., side grids) on mobile.

3.  **Touch Tuning**
    *   Update `FeaturePoint.jsx`: Increase visual size or hit-area size on mobile.
    *   Test `navigateWithGlitch` on touch.

4.  **Final Polish**
    *   Check `SubpageBackground` on mobile (too bright?).
    *   Verify text readability in `Offer` / `About`.

## Verification plan
*   **Simulator**: Use Chrome DevTools Device Mode.
*   **Real Device**: If possible, check on physical phone (responsive behavior).
