
// Simplified Pseudo-Random Noise (Deterministic)
// Much lighter than Simplex Noise
const commonGLSL = `
float random(vec3 scale, float seed) {
    return fract(sin(dot(gl_Position.xyz + seed, scale)) * 43758.5453 + seed);
}
`;

export const vertexShader = `
  attribute vec3 aClusterCenter;
  attribute float aClusterIndex; 

  uniform float uTime;
  uniform float uWarpStrength; 
  uniform float uActiveClusterIndex; 
  uniform float uHoverStrength;
  
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    vec3 pos = position; 
    
    // ABSOLUTE MINIMUM SHADER
    // No animation, no warp, no nothing.
    // Just project the points.
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    gl_PointSize = 30.0; // Huge red dots
  }
`;

export const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
     // DEBUG MODE: Solid Red Circle
     vec2 xy = gl_PointCoord.xy - vec2(0.5);
     float ll = length(xy);
     if(ll > 0.5) discard;
     
     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;
