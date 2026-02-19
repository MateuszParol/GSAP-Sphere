
## Phase 2 Decisions (Bug Fix: Invisible HUD Grids)

**Date:** 2026-02-19

### Scope
- Fix invisible side grids (left/right ladders) in HUD.
- Ensure they are visible on all screen sizes.

### Approach
- **CSS Fix**: Add explicit `width` (e.g., `40px`) to `.leftGrid` and `.rightGrid` in `HUD.module.css`.
- **Reason**: The containers were collapsing to 0 width because all children were absolute positioned, and `overflow: hidden` was clipping them.

### Constraints
- Must remain compatible with existing `transform` logic for pitch.
