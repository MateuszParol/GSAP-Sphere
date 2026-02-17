export const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  
  attribute float aSize;
  
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    
    // Stars move towards camera (Z+)
    // Loop them within a box
    float speed = uSpeed * 2.0;
    
    // Move particles along Z
    pos.z += uTime * speed + pos.x * 20.0;
    
    // Wrap around a large volume centered at camera
    // Range [-100, 100]
    float boxSize = 200.0;
    pos.z = mod(pos.z, boxSize) - (boxSize * 0.5);
    
    // Warp Stretch (Vertex based)
    // If high speed, we stretch Z to create streaks
    // But standard points don't stretch.
    // We just rely on motion.
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Distance Fade
    float dist = length(mvPosition.xyz);
    
    // Fade at edges of the box to prevent popping
    vAlpha = 1.0 - smoothstep(70.0, 100.0, dist);
    
    // Size Attenuation
    // Robust calculation
    gl_PointSize = aSize * (30.0 / -mvPosition.z);
    
    // Clamp limits
    gl_PointSize = clamp(gl_PointSize, 2.0, 50.0);
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fragmentShader = `
  varying float vAlpha;
  
  void main() {
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    
    if(ll > 0.5) discard;
    
    // Hard circle with slight soften
    float alpha = (0.5 - ll) * 2.0;
    
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vAlpha);
  }
`;
