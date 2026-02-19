# Phase 4: Advanced Animations (WOW Factor)

## Objective
Transform the static interface into a living, breathing sci-fi system using GSAP animations. Focus on "Entry" (initial load) and "Interaction" (hover/click).

## Strategy
Use GSAP for high-performance timeline-based animations.

## Steps

### 4.1. HUD Entry Animation
- **Goal**: The HUD should "boot up" when the scene loads.
- **Tasks**:
    - [ ] Animate SVG strokes (draw-in effect) for `ClusterBrackets` and `FrameCorners`.
    - [ ] Stagger fade-in for `DataStream` text.
    - [ ] Animate `Compass` strip sliding into view.

### 4.2. Camera Interaction
- **Goal**: The scene should feel reactive to the mouse.
- **Tasks**:
    - [ ] Implement smooth parallax (camera moves slightly opposite to mouse).
    - [ ] Implement "LookAt" bias (camera rotates slightly towards hovered point).

### 4.3. Transition Refinement (Warp)
- **Goal**: Transitions should be punchy and energetic.
- **Tasks**:
    - [ ] Tune `Starfield` warp speed curve (faster accel/decel).
    - [ ] Add slight chromatic aberration kick during warp?

## Verification
- **Manual**: Refresh page -> Watch Intro. Hover points -> Feel weight.
