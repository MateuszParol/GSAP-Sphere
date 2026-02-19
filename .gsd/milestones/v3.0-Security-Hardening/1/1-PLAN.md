---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Implement Network Security Headers

## Objective
Secure the application by forcing browser security features via HTTP headers (Netlify `_headers` file).

## Context
- .gsd/phases/v3/1/RESEARCH.md
- [Netlify Headers Docs](https://docs.netlify.com/routing/headers/)

## Tasks

<task type="auto">
  <name>Create _headers file</name>
  <files>public/_headers</files>
  <action>
    Create a `public/_headers` file (no extension).
    Add the following security headers for all paths (`/*`):
    - `X-Frame-Options: DENY` (Prevent clickjacking)
    - `X-Content-Type-Options: nosniff` (Prevent MIME sniffing)
    - `Referrer-Policy: strict-origin-when-cross-origin`
    - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
    - `Permissions-Policy: geolocation=(), microphone=(), camera=()`
    - `Content-Security-Policy`: (See Research for specific string)
      - allow `blob:` for workers.
      - allow `cdn.sanity.io` for images.
      - allow `api.sanity.io` for connect.
  </action>
  <verify>
    Test-Path public/_headers
  </verify>
  <done>
    File exists and contains CSP definitions.
  </done>
</task>

## Success Criteria
- [ ] `public/_headers` exists.
- [ ] CSP allows Sanity and R3F (Draco/Workers).
- [ ] HSTS enabled.
