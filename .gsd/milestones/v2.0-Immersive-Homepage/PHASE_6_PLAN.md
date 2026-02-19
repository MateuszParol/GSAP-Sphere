# Phase 6: PWA & Final Optimization - Implementation Plan

## Goal
Make the application installable (PWA), look like a native app, and achieve high Lighthouse scores.

## User Review Required
- [ ] Review the generated "Pixel Art Saturn" icon.
- [ ] Verify "Add to Home Screen" functionality on device.

## Proposed Changes

### PWA Implementation
#### [NEW] `vite-plugin-pwa`
- Install dependency.
- Configure `vite.config.js`.
- Define `manifest.json` options (Name, Short Name, Colors, Icons).

#### [NEW] `public/pwa-icons/`
- Generate and save `icon-192x192.png`, `icon-512x512.png`.
- Favicon.

### Optimization
#### [MODIFY] `vite.config.js`
- Enable logic for splitting chunks if needed.
- Ensure compression (handled by Netlify/Vercel usually, but we can add build plugins if serving static).

#### [MODIFY] `index.html`
- Ensure `<meta name="theme-color">` matches manifest.
- Ensure viewport is correct for PWA (no zoom?).

## Verification Plan

### Automated Tests
- Run `npm run build` to verify PWA generation.
- Run Lighthouse Audit (Chrome DevTools).

### Manual Verification
- Deploy/Serve locally (`npm run preview`).
- Open in Chrome Mobile Simulator -> Check "Manifest" tab.
- Verify "Install App" triggers.
