---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Implement Code Obfuscation

## Objective
Protect source code from easy reverse-engineering by integrating `javascript-obfuscator` into the Vite build pipeline.

## Context
- .gsd/phases/v3/2/RESEARCH.md
- vite.config.js

## Tasks

<task type="auto">
  <name>Install Obfuscator Plugin</name>
  <files>package.json</files>
  <action>
    Install `javascript-obfuscator` and `vite-plugin-javascript-obfuscator` as dev dependencies.
  </action>
  <verify>
    npm list vite-plugin-javascript-obfuscator
  </verify>
  <done>
    Packages installed.
  </done>
</task>

<task type="auto">
  <name>Configure Vite</name>
  <files>vite.config.js</files>
  <action>
    Import `vite-plugin-javascript-obfuscator`.
    Add verify logic: `const isProduction = mode === 'production'`.
    Add plugin to `plugins` array:
    ```javascript
    PluginObfuscator({
        include: [/\.jsx?$/, /\.tsx?$/, /\.js?$/],
        exclude: [/node_modules/, /\.css$/],
        options: {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            disableConsoleOutput: true,
            numbersToExpressions: true,
            stringArray: true,
            stringArrayThreshold: 0.75,
            splitStrings: true,
            splitStringsChunkLength: 10,
        }
    })
    ```
    Ensure it acts primarily on `apply: 'build'`.
  </action>
  <verify>
    Check vite.config.js content.
  </verify>
  <done>
    Vite config updated with obfuscation settings.
  </done>
</task>

## Success Criteria
- [ ] `npm run build` succeeds.
- [ ] Output JS files in `dist/assets` are unreadable (hexadecimal variable names, etc.).
- [ ] App still loads and runs correctly (no runtime crashes).
