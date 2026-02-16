---
phase: 1
name: Foundation & Architecture
---

# Phase 1: Foundation & Architecture

## Objective
Establish the core routing architecture, implement the "Hybrid Navigation" system, and add immersive "Warp/Glitch" transitions.

## Strategy
1.  **Layout System**: Create a `MainLayout` that persists the Navbar across pages.
2.  **Immersive Transitions**: 
    -   **Warp**: Modify `Stars.jsx` to accept a `warp` prop that stretches stars and increases speed.
    -   **Glitch**: Create `GlitchOverlay.jsx` using CSS/Canvas for digital noise.
    -   **Orchestration**: Create `TransitionManager` hook context to trigger effects before route changes.
3.  **Refactoring**: Move the current `Scene` into a `Home` page component.

## Execution Plan

<task type="manual">
  <name>Create Glitch Component</name>
  <description>Reusable full-screen glitch effect.</description>
  <files>src/components/UI/GlitchOverlay.jsx</files>
  <step>Create CSS keyframes for scanlines/noise.</step>
  <step>Implement component that renders only when `active` prop is true.</step>
  <verify>Overlay appears and distorts screen.</verify>
  <done>Glitch effect ready.</done>
</task>

<task type="manual">
  <name>Implement Warp Logic</name>
  <description>Modify Starfield to support hyperdrive effect.</description>
  <files>src/components/Environment/Stars.jsx</files>
  <step>Add `useFrame` loop to animate star speed.</step>
  <step>Expose `setWarp(boolean)` via global state (Zustand or Context).</step>
  <verify>Stars stretch and speed up when warp is active.</verify>
  <done>Warp effect ready.</done>
</task>

<task type="manual">
  <name>Implement Transition Manager</name>
  <description>Coordinate Router with Effects.</description>
  <files>src/utils/TransitionContext.jsx</files>
  <step>Create Context provider.</step>
  <step>Intercept navigation/clicks.</step>
  <step>If going from Home -> Page: Trigger Warp (1.5s) then navigate.</step>
  <step>If going from Page -> Home/Page: Trigger Glitch (0.5s) then navigate.</step>
  <verify>Navigation has delays with visual effects.</verify>
  <done>Transitions orchestrated.</done>
</task>

<task type="manual">
  <name>Create Layout Components</name>
  <description>Implement the shared layout with Navbar.</description>
  <files>
    - src/layouts/MainLayout.jsx
    - src/components/UI/Navbar.jsx
  </files>
  <step>Create `Navbar` component with links to Home, About, Offer, Contact.</step>
  <step>Style Navbar to be "Subtle, Glassmorphism, Sci-Fi".</step>
  <step>Create `MainLayout` using `<Outlet />` from react-router.</step>
  <verify>Navbar renders with correct links.</verify>
  <done>Layout system is ready.</done>
</task>

<task type="manual">
  <name>Refactor App.jsx</name>
  <description>Set up the Router.</description>
  <files>src/App.jsx</files>
  <step>Wrap app in `BrowserRouter`.</step>
  <step>Define Routes for `/`, `/about`, `/offer`, `/projects`, `/contact`.</step>
  <step>Move the 3D Sphere logic from `App.jsx` to `src/pages/Home.jsx`.</step>
  <verify>App navigates between pages without errors.</verify>
  <done>Routing is functional.</done>
</task>

<task type="manual">
  <name>Implement "Return to Map"</name>
  <description>Add the persistent Return button for subpages.</description>
  <files>src/components/UI/ReturnButton.jsx</files>
  <step>Create a styled button component.</step>
  <step>Add it to `MainLayout` or specific subpages (conditionally rendered if not on Home).</step>
  <verify>Button appears on subpages and links to `/`.</verify>
  <done>Navigation loop is closed.</done>
</task>
