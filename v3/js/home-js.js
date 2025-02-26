/**
 * Home Page JavaScript
 * Controls specific functionality for the home page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize parallax effect for floating shapes
    initParallax();
});

/**
 * Initialize typing effect for hero section
 */
function initTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;
    
    const phrases = [
        'Backend Development',
        'Microservices Architecture',
        'Cloud Solutions',
        'System Optimization'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Removing characters
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50; // Faster when deleting
        } else {
            // Adding characters
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100; // Normal speed when typing
        }
        
        // Handle phrase completion or deletion
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Completed typing current phrase
            isDeleting = true;
            typingDelay = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            // Completed deleting current phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
            typingDelay = 500; // Pause before typing new phrase
        }
        
        setTimeout(typeEffect, typingDelay);
    }
    
    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
}

/**
 * Initialize animations for hero elements
 */
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    
    heroElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.classList.add(`delay-${index % 3 + 1}`);
    });
}

/**
 * Initialize parallax effect for floating shapes in hero section
 */
function initParallax() {
    const shapes = document.querySelectorAll('.floating-shape');
    if (shapes.length === 0) return;
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach(shape => {
            const speed = parseFloat(shape.getAttribute('data-speed') || '0.05');
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}