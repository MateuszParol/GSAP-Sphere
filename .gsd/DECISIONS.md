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
