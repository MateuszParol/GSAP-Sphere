import emailjs from '@emailjs/browser'

// INITIALIZE WITH PLACEHOLDERS
// User instructions: Replace these constants with keys from your EmailJS dashboard
// https://dashboard.emailjs.com/admin
const SERVICE_ID = 'service_81ecy0l'
const TEMPLATE_ID = 'template_pv7cjhd'
const PUBLIC_KEY = '6uvsr6OQfioAXVUeW'

export const sendContactForm = (data) => {
    // If keys are missing, simulate success for dev/demo purposes
    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
        return new Promise((resolve) => {
            console.warn('[EmailJS] Keys not set. Simulating success.')
            console.log('[EmailJS] Data:', data)
            setTimeout(resolve, 1500)
        })
    }

    return emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)
}
