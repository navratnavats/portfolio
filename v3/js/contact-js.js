/**
 * Contact Page JavaScript
 * Handles form submission and validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact form handling
    const contactForm = document.getElementById('contactForm');
    
    // Use the handler from main.js (via portfolioUtils global object)
    if (window.portfolioUtils && contactForm) {
        window.portfolioUtils.handleContactForm(contactForm);
    }
});