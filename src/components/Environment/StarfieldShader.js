export const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  
  attribute float aSize;
  
  varying float vAlpha;
  varying float vSpeed; // Pass speed to fragment

  void main() {
    vSpeed = uSpeed;
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
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Distance Fade
    float dist = length(mvPosition.xyz);
    
    // Fade at edges of the box to prevent popping
    vAlpha = 1.0 - smoothstep(70.0, 100.0, dist);
    
    // Size Attenuation
    // Increase size with speed to simulate 'blur'
    float speedScale = 1.0 + (uSpeed * 0.1); 
    gl_PointSize = aSize * (30.0 / -mvPosition.z) * speedScale;
    
    // Clamp limits
    gl_PointSize = clamp(gl_PointSize, 2.0, 80.0);
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fragmentShader = `
  varying float vAlpha;
  varying float vSpeed;
  
  void main() {
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    
    if(ll > 0.5) discard;
    
    // Hard circle with slight soften
    float alpha = (0.5 - ll) * 2.0;
    
    // Color Shift: White normally, Cyan/Blue at high speed
    vec3 color = vec3(1.0, 1.0, 1.0);
    
    // If speed > 10 (arbitrary threshold for warp), mix in blue
    float warpFactor = clamp((vSpeed - 1.0) / 20.0, 0.0, 1.0);
    vec3 warpColor = vec3(0.4, 0.8, 1.0); // Cyan/Blue
    
    color = mix(color, warpColor, warpFactor);
    
    gl_FragColor = vec4(color, alpha * vAlpha);
  }
`;
