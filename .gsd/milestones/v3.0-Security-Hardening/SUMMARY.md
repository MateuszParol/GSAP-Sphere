# Milestone: v3.0-Security-Hardening

## Completed: 2026-02-19

## Deliverables
- ✅ **Content Security Policy**: Implemented strict CSP in `_headers`.
- ✅ **Code Obfuscation**: Production builds are obfuscated via `vite-plugin-javascript-obfuscator`.
- ✅ **UI Protection**: "Anti-theft" measures (No Right-Click, Console Warning) implemented.
- ✅ **UI Polish**: Fixed regressions in Navbar, Offer Page, HUD, and Scrollbar.

## Phases Completed
1. **Phase 0: UI Regressions** — Fixed post-mobile update issues.
2. **Phase 1: Network & Headers Security** — Hardened HTTP headers.
3. **Phase 2: Code Obfuscation** — Protected source code.
4. **Phase 3: UI Protection** — Added deterrents for code inspection.

## Metrics
- **Security Score**: Significantly improved (A+ expected on Mozilla Observatory).
- **Source Protection**: Medium (Obfuscated + UI Locks).
- **Performance**: Maintained (Obfuscation excluded from hot loops).

## Lessons Learned
- **CSP & R3F**: Web Workers in R3F (Draco) require `blob:` in `worker-src`.
- **Obfuscation**: Must be carefully configured to avoid breaking 3D loops or increasing bundle size too much.
- **Scrollbars**: `100vw` is dangerous on Windows; use `100%` or `overflow-x: hidden`.
