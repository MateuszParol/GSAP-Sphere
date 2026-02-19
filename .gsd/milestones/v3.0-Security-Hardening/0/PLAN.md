# Phase 0: UI Regressions - Execution Plan

## Goal
Fix UI regressions introduced in the Mobile update (v2.0) that affect Desktop users.

## Tasks

### 1. Fix Desktop Navbar Layout
**Issue**: Navbar "fell apart" on desktop (likely stuck in mobile/column mode or layout issues).
**File**: `src/components/UI/Navbar.jsx`
**Action**:
- Verify `isMobile` logic (breakpoint might be too high at 1024px?).
- Ensure `flexDirection` is strictly 'row' for desktop.
- check if `isOpen` state affects desktop layout unnecessarily.

### 2. Fix Offer Page Titles
**Issue**: Titles like "IMMERSYJNE_DOŚWIADCZENIA_3D" break unesthetically.
**File**: `src/pages/Offer.jsx`
**Action**:
- Use `word-break: normal` or `keep-all` for desktop?
- Or assume the user wants them to NOT break if possible, or break only at underscores?
- Solution: `word-break: break-word` was causing mid-word breaks?
- Try `overflow-wrap: break-word` instead, or replace underscores with spaces?
- *User Quote*: "tytuly lamia sie w nieestetyczny sposob".

## Verification
- Desktop Browser Check (Resize window > 1024px).
- Offer Page Visual Check.

### 3. Fix HUD Side Grids
**Issue**: Side grids shifted down.
**File**: `src/components/HUD/HUDDecoration.jsx`
**Action**: Check `top` positioning or parent container alignment.

### 4. Fix Scrollbar Overflow
**Issue**: Horizontal scrollbar visible / Scrollbar not flush.
**File**: `src/index.css` / `src/App.css`
**Action**: Ensure `overflow-x: hidden` on body/root. Check `100vw` usage.
