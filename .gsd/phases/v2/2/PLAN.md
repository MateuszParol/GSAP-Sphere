# Phase 2: User Interface (HUD)

**Goal**: Build a high-performance, responsive 2D "Spaceship" overlay (HUD) to frame the 3D experience.

## 1. Analysis & Requirements
- **Aesthetic**: Sci-Fi, Cyberpunk, Holographic.
- **Technology**: SVG + HTML/CSS (avoid heavy 3D UI libraries for crispness).
- **Positioning**: Fixed overlay on top of Canvas (`z-index: 100`).
- **Responsiveness**: Must adapt to mobile (hide complex elements) vs desktop (full cockpit view).

## 2. Implementation Plan

### Step 1: Component Structure (`src/components/HUD/`)
- Create `HUDOverlay.jsx` (Container).
- Create sub-components:
    - `Compass.jsx` (Top/Bottom orientation).
    - `Reticle.jsx` (Center focus).
    - `DataStream.jsx` (Decorative text blocks).
    - `FrameCorners.jsx` (Screen borders).

### Step 2: Design & Styling
- Use `SharedStyles.module.css` for neon glows/colors.
- Implement keyframes for "System Boot" animation (fade-in lines).
- Use SVG for crisp lines and circles (e.g., rotating rings).

### Step 3: Integration
- Add `<HUDOverlay />` to `MainLayout.jsx` or `Home.jsx` (likely `Home.jsx` since it's specific to the 3D view, or `MainLayout` if persistent).
    - **Decision**: `MainLayout` makes sense for a "persistent cockpit" feel, but `Home` might be safer if we only want it on the map. Let's put it in `MainLayout` but conditionally render based on route (or make it minimal on subpages).

### Step 4: Interactivity (Basic)
- Mouse movement parallax (slight shift of HUD elements opposite to mouse).
- "Active Mode" when hovering interactive elements.

## 3. Verification
- HUD renders on top of 3D scene.
- Does not block clicks (ensure `pointer-events: none` on large containers, `auto` on buttons).
- Looks good on Mobile (media queries).
