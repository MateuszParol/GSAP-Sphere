# Architecture Decisions Log

## [ADR-001] Tech Stack Selection
**Status:** Accepted
**Context:** Need high-performance 3D graphics on the web with complex animations.
**Decision:** React + @react-three/fiber + GSAP.
**Consequences:** Requires setting up a 3D canvas context. GSAP will handle non-3D DOM animations.

## [ADR-002] Form Backend
**Status:** Proposed
**Context:** Need to send emails without a heavy backend.
**Decision:** Use EmailJS or similar client-side email service.

## [ADR-003] Phase 2 Refinements
**Status:** Accepted
**Context:** User feedback indicates sphere is not interactively rotatable and particle reaction is too subtle.
**Decision:**
1.  Add `OrbitControls` from `@react-three/drei` to enable drag rotation. Configure to disable zoom to keep sphere size constant.
2.  Increase particle sensitivity:
    -   Increase `force` multiplier in `lerp` from `0.2` to `0.5` (or higher).
    -   Potentially increase `threshold` slightly.

## [ADR-004] Robust Particle Interaction (Raycasting)
**Status:** Proposed
**Context:** Manual 2D->3D projection is failing for touch and rotated spheres. Particles snap back instead of smoothing.
**Decision:**
1.  Use `Raycaster` (via `useThree`) to find the exact intersection point on a hidden "Hit Sphere".
2.  Use the intersection point as the magnetic center.
3.  If no intersection (cursor off sphere), set magnetic center to null.
4.  Implement `lerp` for returning to origin (smooth restoration) instead of hard `set()`.
