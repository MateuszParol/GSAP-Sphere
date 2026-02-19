# Phase 1: Optimization & Core Setup (v2.0)

**Goal**: Migrate CPU-heavy animations to GPU (Shaders) and implement performance monitoring.

## 1. Analysis & Bottlenecks
- **ParticleSphere**: Currently animates ~5000 particles in a JavaScript loop (`useFrame`). This burns CPU cycles.
    - **Fix**: Convert to `ShaderMaterial`. Pass `uTime` and `uWarpMode`. Calculate positions in Vertex Shader.
- **Starfield**: Updates React state (`setSpeed`) every frame during warp. This acts as a re-render loop.
    - **Fix**: Use a `useRef` to update a Uniform or instance property directly, bypassing React render cycle.
- **Memory**: Basic usage seems fine, but we will add `r3f-perf` to monitor Draw Calls and GPU memory.

## 2. Implementation Plan

### Step 1: Performance Monitoring
- Install `r3f-perf`.
- Add `<Perf />` component (toggled via URL param `?debug=true` or similar).

### Step 2: GPU Particle System (The Big Win)
- Create `ParticleSphereShader.js` (Vertex/Fragment).
- Refactor `ParticleSphere.jsx`:
    - Create `BufferGeometry` once.
    - Use `ShaderMaterial`.
    - `useFrame` only updates `uniforms.uTime` and `uniforms.uWarpStrength`.
    - **Challenge**: The "Cluster" logic (particles attracting to points) needs to be encoded in attributes (e.g., `aTargetPosition`, `aClusterId`) so the shader knows where to move them.

### Step 3: Optimized Starfield
- Replace `drei/Stars` with a custom `Points` system using a shader.
- Implement "Warp Streak" effect in the shader (stretch stars based on `uSpeed`).

### Step 4: Asset Optimization (Project-wide)
- Check `public/` folder for large images.
- Convert any heavy assets to WebP/AVIF. (If applicable).

## 3. Verification
- Measure FPS on Main Thread (should stay > 55fps during Warp).
- CPU usage should drop significantly.
