# Research: Content Security Policy (CSP) for R3F & Sanity

## Context
We are deploying a **React Three Fiber** application with **Sanity.io** backend to **Netlify**.
Security hardening requires strict HTTP headers, particularly CSP.

## Requirements

### 1. React Three Fiber / Drei
- **Workers**: GLTFLoader/DracoLoader often uses Web Workers via `blob:` URIs.
  - Directive: `worker-src 'self' blob:;`
- **Canvas**: Generally safe, but some post-processing might trigger specific needs.

### 2. Sanity.io
- **API Connection**: Needs access to project-specific API URL.
  - Directive: `connect-src 'self' https://*.sanity.io https://*.api.sanity.io;`
- **Images**: Images served from Sanity CDN.
  - Directive: `img-src 'self' data: https://cdn.sanity.io;`

### 3. Vite / React
- **Scripts**: Standard React bundles.
  - Directive: `script-src 'self' 'unsafe-inline';`
  - *Note*: `'unsafe-inline'` is often needed for hydration scripts or analytics. Ideally remove, but for v1 hardening it simplifies compatibility.
- **Styles**: CSS-in-JS or injected styles.
  - Directive: `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;`

### 4. Fonts
- **Google Fonts**:
  - Directive: `font-src 'self' https://fonts.gstatic.com;`

## Proposed CSP String
```text
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' data: https://fonts.gstatic.com;
img-src 'self' data: https://cdn.sanity.io blob:;
connect-src 'self' https://*.sanity.io https://*.api.sanity.io;
worker-src 'self' blob:;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
```

## Implementation Target
- File: `public/_headers` (Netlify specific).
- Format:
  ```
  /*
    Content-Security-Policy: ...
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  ```
