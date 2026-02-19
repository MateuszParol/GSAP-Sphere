# Phase 4: Advanced Animations (WOW Factor) - REVISED

## Objective
Implement high-end "Sci-Fi" animations to create a premium feel. Focus on "Breathing" interactions for the HUD and immersive backgrounds for subpages.
**NOTE:** Warp Transition and Persistent Sphere on subpages were CANCELLED by user request.

## Features

### 4.1. [CANCELLED] Warp Transition
*   *User requested to revert this feature.*

### 4.2. HUD "Breathing" & Interactions
*   **Concept**: The interface should feel alive, not static.
*   **Implementation**:
    1.  **Idle Animation**:
        *   Use `gsap.to(..., { repeat: -1, yoyo: true })` on opacity/scale of brackets and compass ticks.
        *   Subtle pulse: 0.8 -> 1.0 opacity over 2-3 seconds.
    2.  **Point Hover**:
        *   When hovering a `FeaturePoint`:
            *   Animate the "Line" connecting point to label (grow width/glow).
            *   Change cursor to "Precision Select".

### 4.3. Subpage "Breathing" (Background)
*   **Concept**: Subpages shouldn't be static black voids. They need a subtle, alive background.
*   **Implementation**:
    *   Create `SubpageBackground` component.
    *   **Visuals**:
        *   Slow-moving "Digital Grid" floor or ceiling?
        *   Or faint, drifting "Data Particles" (different from the main Sphere).
        *   Subtle vignette pulse.
    *   **Tech**: R3F Canvas (separate or shared) or CSS Keyframes for performance.
    *   *Decision*: Use a lightweight R3F particle system or a CSS-based "Cyber Grid" that moves slowly.

## Execution Steps

1.  **Implement HUD Polish**
    *   Update `HUDDecoration.jsx` and `FrameCorners.jsx` with idle animations.
    *   Update `FeaturePoint.jsx` hover effects.

2.  **Implement Subpage Background**
    *   Create `components/UI/SubpageBackground.jsx`.
    *   Add to `MainLayout` (rendered when `!isHome`).

## Verification
*   Watch HUD -> Verify subtle pulsing.
*   Go to "Offer" -> Verify background is not static black (has subtle motion).
