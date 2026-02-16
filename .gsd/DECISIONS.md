## Phase 2 Decisions (Refinement)

**Date:** 2026-02-16

### Scope
-   **Redesign Case Studies**: Switch from Grid Layout to **Master-Detail Layout**.
-   **Sidebar**: Left column list of project titles.
-   **Detail View**: Center/Right column displaying the full selected project.
-   **Auto-Select**: Select the first (newest) item on load.

### Approach
-   **Layout**: CSS Grid `250px 1fr`.
-   **Mobile**: Stacked layout (List on top, or collapsible).
-   **Sorting**: Sort by `_createdAt` desc (newest first).

### Constraints
-   Maintain "Sci-Fi" aesthetic (e.g., active item in sidebar glows).
