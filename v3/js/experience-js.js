/**
 * Experience Page JavaScript
 * Handles timeline animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize timeline animations
    initTimelineAnimations();
});

/**
 * Initialize animations for timeline items
 */
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // If using Intersection Observer for animations
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideIn 0.8s forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px' 
        });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 300 * (index + 1));
        });
    }
}