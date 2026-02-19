---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Implement UI Protection (Anti-Theft)

## Objective
Discourage casual users from inspecting code or downloading assets by disabling standard browser inspection shortcuts and context menus.

## Context
- [Facebook Console Warning](https://en.wikipedia.org/wiki/Self-XSS) pattern.

## Tasks

<task type="auto">
  <name>Create useAntiTheft hook</name>
  <files>src/hooks/useAntiTheft.js</files>
  <action>
    Create `src/hooks/useAntiTheft.js`.
    Implement `useEffect` to:
    1. `document.addEventListener('contextmenu', (e) => e.preventDefault())`.
    2. `document.addEventListener('keydown', handleKey)`:
       - Block F12 (keyCode 123).
       - Block Ctrl+Shift+I (Inspector).
       - Block Ctrl+Shift+J (Console).
       - Block Ctrl+U (View Source).
       - Block Ctrl+S (Save).
    3. `console.log` warning:
       - "%cStop!", "color: red; font-size: 50px; font-weight: bold;"
       - "This is a browser feature intended for developers..."
  </action>
  <verify>
    Check file existence.
  </verify>
  <done>
    Hook created.
  </done>
</task>

<task type="auto">
  <name>Integrate into App</name>
  <files>src/App.jsx</files>
  <action>
    Import `useAntiTheft` in `App.jsx`.
    Call `useAntiTheft()` at the top level.
  </action>
  <verify>
    grep "useAntiTheft" src/App.jsx
  </verify>
  <done>
    Hook integrated.
  </done>
</task>

## Success Criteria
- [ ] Right-click does nothing.
- [ ] F12 / DevTools shortcuts are suppressed.
- [ ] Console shows warning message on load.
