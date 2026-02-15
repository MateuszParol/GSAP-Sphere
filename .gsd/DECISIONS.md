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
**Status:** Accepted
**Context:** Manual 2D->3D projection is failing for touch and rotated spheres. Particles snap back instead of smoothing.
**Decision:**
1.  Use `Raycaster` (via `useThree`) to find the exact intersection point on a hidden "Hit Sphere".
2.  Use the intersection point as the magnetic center.
3.  If no intersection (cursor off sphere), set magnetic center to null.
4.  Implement `lerp` for returning to origin (smooth restoration) instead of hard `set()`.

## [ADR-005] Clamped Displacement Physics
**Status:** Accepted
**Context:** Particles "clump" too aggressively around the cursor, destroying the sphere shape and creating unsightly blobs.
**Decision:**
1.  Implement a **Maximum Displacement Clamp**. A particle cannot move further than `MAX_DIST` (e.g., 0.2 units) from its original position, regardless of attraction force.
2.  Reduce interaction radius (`threshold`) to affect fewer neighbors.
3.  The result should be a subtle "bulge" or "shift" rather than a collapse.

## [ADR-006] Phase 3 Redesign: Integrated Points & Legend
**Status:** Accepted
**Context:** User rejected floating HTML markers ("not aesthetic"). Wants points to be part of the particle sphere itself.
**Decision:**
1.  **Integrated Particles:** Use `vertexColors` in `ParticleSphere`. Specific particles will be colored differently to form "4-point squares" representing the hotspots.
2.  **Legend UI:** Remove on-sphere text. Display a "Cyber Legend" UI (Right side on Desktop, Bottom on Mobile) that explains the colors.
3.  **Interaction:** Hovering a "special" particle cluster makes it glow/scale up. Clicking triggers the existing Overlay logic.

## [ADR-007] Mobile Tap Tolerance & Organic Aesthetic
**Status:** Accepted
**Context:** Single finger tap on mobile (iPhone) often fails because it registers as a micro-drag. User also wants "Organic/Noisy" positioning back, combined with "Sharp Pixel" geometry.
**Decision:**
1.  **Visuals:** Re-introduce `random()` jitter to particle positions (`useMemo`). Keep `PointMaterial` (squares) and `vertexColors`.
2.  **Interaction:** Increase "Tap Tolerance" in `ParticleSphere` interaction logic.
    -   Increase max movement threshold from `10px` to `40px` (High DPI screens make 10px tiny).
    -   Use `pointerDown`/`pointerUp` to manually detect taps, ignoring small drags that occur naturally during touch.
