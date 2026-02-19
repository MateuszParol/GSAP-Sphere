# Research: Code Obfuscation for 3D Portfolio

## Objective
Make source code unreadable to prevent easy copying ("stealing") while maintaining high performance for 3D rendering.

## Tool Selection
**Plugin**: `vite-plugin-javascript-obfuscator`
**Core**: `javascript-obfuscator`

## Configuration Strategy

### 1. Performance Sensitive (The 3D Scene)
React Three Fiber relies on `useFrame` loops running 60/120fps.
Aggressive obfuscation (like `deadCodeInjection` or heavy `controlFlowFlattening`) inside the render loop can cause frame drops.

### 2. Recommended Settings (Balanced)
```javascript
{
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: false, // Performance risk
  debugProtection: false,   // Risk of crashing browser if devtools open
  debugProtectionInterval: 0,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true, // Converts 123 to 0x1a...
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: true,
  stringArray: true,
  stringArrayEncoding: ['base64', 'rc4'],
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
}
```

### 3. Implementation
- Install `javascript-obfuscator` and `vite-plugin-javascript-obfuscator`.
- Add to `vite.config.js` in `plugins` array.
- Apply ONLY in `build` mode (disable for development to allow debugging).

## Risks
- **Bundle Size**: Obfuscation increases file size (15-80%).
- **Performance**: CPU overhead for de-obfuscation at runtime.
- **Debugging**: Production bugs become impossible to trace without sourcemaps (which we should NOT upload if we want secrecy, or use hidden source maps).

## Decision
Enable obfuscation only for `mode === 'production'`.
Use "Medium" aggression level.
