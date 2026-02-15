# Phase 4 Plan: Contact Form & Polish

## Objective
Implement the actionable "Contact" feature using a modal form integrated with EmailJS, and apply final aesthetic touches to match the "Sci-Fi / Low Poly" vision.

## Strategy
1.  **UI First**: Build the `ContactModal` component with HTML/CSS and GSAP entry/exit animations.
2.  **Logic Second**: Hook up `EmailJS` service to send actual emails.
3.  **Polish Last**: Apply global font settings and fine-tune colors/glows.

## Implementation Steps

### 4.1 Contact Modal UI
-   [ ] Create `src/components/Overlay/ContactModal.jsx`.
-   [ ] Design layout:
    -   Header: "INITIATE_CONTACT" or similar sci-fi text.
    -   Fields: Name, Email, Phone, Message (Idea).
    -   Button: "TRANSMIT" (Send).
    -   Close Button: "X" or "ABORT".
-   [ ] Style using CSS Modules (`ContactModal.module.css`) with neon borders, glassmorphism background.
-   [ ] Integrate into `Scene.jsx` (trigger when `activePoint.id === 'contact'`).

### 4.2 EmailJS Integration
-   [ ] Install `@emailjs/browser`.
-   [ ] Create `src/utils/email.js` helper.
-   [ ] Connect form submission to EmailJS.
    -   **Note:** User will need to provide EmailJS Service ID, Template ID, and Public Key. I will use placeholders and instruct user where to put them.
-   [ ] Add Loading/Success/Error states to the form UI.

### 4.3 Global Polish & Aesthetics
-   [ ] **Fonts**: Import `Rajdhani` (Google Fonts) for main text and `VT323` for headers/code effects.
-   [ ] **Sphere Interaction**: Ensure sphere rotation is locked when Modal is open (already implemented in Phase 3, verify).
-   [ ] **Responsiveness**: Ensure Modal fits on mobile screens (scrollable if needed).

## Verification
-   **Manual**: Open Contact modal, fill form, click send, verify console logs (mock) or actual email if keys provided.
-   **Visual**: Check GSAP animations (fade in/slide up) and responsive layout.
