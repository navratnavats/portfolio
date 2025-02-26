/**
 * Main JavaScript File
 * Handles common functionality across all pages
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer components
    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');

    // Initialize common UI elements
    initNavigation();
    initScrollToTop();
    updateCopyrightYear();

    // Add animation CSS
    addAnimationStyles();
});

/**
 * Load HTML components
 * @param {string} targetId - ID of the element to inject the component into
 * @param {string} componentPath - Path to the component HTML file
 */

 function loadComponent(targetId, componentPath) {
     const targetElement = document.getElementById(targetId);
     if (!targetElement) return;

     // Use proper path to component files
     fetch(componentPath)
         .then(response => {
             if (!response.ok) {
                 throw new Error(`Failed to load ${componentPath}`);
             }
             return response.text();
         })
         .then(html => {
             targetElement.innerHTML = html;

             // Initialize navigation after loading header
             if (targetId === 'header') {
                 initNavigation();
                 highlightActiveNavItem();
             }
         })
         .catch(error => {
             console.error(`Error loading component: ${error}`);
             // Fallback content for header if loading fails
             if (targetId === 'header') {
                 targetElement.innerHTML = createBasicHeader();
             }
         });
 }


 function createBasicHeader() {
     return `
     <div class="container">
         <a href="home-html.html" class="logo">NV</a>
         <nav>
             <ul class="nav-links">
                 <li><a href="home-html.html">Home</a></li>
                 <li><a href="about-html.html">About</a></li>
                 <li><a href="skills-html.html">Skills</a></li>
                 <li><a href="services-html.html">Services</a></li>
                 <li><a href="projects-html.html">Projects</a></li>
                 <li><a href="experience-html.html">Experience</a></li>
                 <li><a href="contact-html.html">Contact</a></li>
             </ul>
         </nav>
     </div>`;
 }
//function loadComponent(targetId, componentPath) {
//    const targetElement = document.getElementById(targetId);
//    if (!targetElement) return;
//
//    fetch(componentPath)
//        .then(response => {
//            if (!response.ok) {
//                throw new Error(`Failed to load ${componentPath}`);
//            }
//            return response.text();
//        })
//        .then(html => {
//            targetElement.innerHTML = html;
//
//            // If it's the header, initialize navigation after loading
//            if (targetId === 'header') {
//                initNavigation();
//                highlightActiveNavItem();
//            }
//        })
//        .catch(error => {
//            console.error(`Error loading component: ${error}`);
//        });
//}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Header scroll effects
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Header transform on scroll
        if (header) {
            if (scrollTop > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Header hide/show on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                // Scrolling down & past threshold - hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up or at top - show header
                header.style.transform = 'translateY(0)';
            }
        }

        lastScrollTop = scrollTop;
    });
}

/**
 * Highlight the active navigation item based on current page
 */
function highlightActiveNavItem() {
    const navItems = document.querySelectorAll('.nav-links li a');
    if (!navItems.length) return;

    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';

    navItems.forEach(item => {
        const href = item.getAttribute('href');

        // Remove active class from all items
        item.classList.remove('active');

        // Add active class to current page link
        if (href === currentPage) {
            item.classList.add('active');
        }

        // Special case for home page
        if (currentPage === '' || currentPage === 'index.html') {
            if (href === 'home.html') {
                item.classList.add('active');
            }
        }
    });
}

/**
 * Initialize back-to-top button functionality
 */
function initScrollToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Update the copyright year in the footer
 */
function updateCopyrightYear() {
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear().toString();
    }
}

/**
 * Add animation CSS styles
 */
function addAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Appear animation for scrolled elements */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Button ripple effect */
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Add ripple effect to buttons
    addButtonRippleEffect();
    
    // Initialize scroll animations
    initScrollAnimations();
}

/**
 * Add ripple effect to buttons
 */
function addButtonRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.skill-category, .service-card, .project-card, .timeline-item, .contact-item');
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' 
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Handle contact form submission
 * @param {HTMLFormElement} form - The contact form element
 */
function handleContactForm(form) {
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Form validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission with loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            console.log('Form submitted:', { name, email, subject, message });
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Show success message
            showFormMessage('Your message has been sent successfully!', 'success');
            
            // Reset form
            form.reset();
        }, 1500);
    });
}

/**
 * Display form submission message
 * @param {string} message - The message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showFormMessage(message, type) {
    // Find the form element
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    
    // Add appropriate icon
    if (type === 'success') {
        messageElement.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    } else {
        messageElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    }
    
    // Insert after form
    form.after(messageElement);
    
    // Add animation
    messageElement.style.animation = 'fadeInUp 0.3s forwards';
    
    // Remove message after delay
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-10px)';
        messageElement.style.transition = 'opacity 0.3s, transform 0.3s';
        
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 5000);
}

// Export functions for use in other JavaScript files
window.portfolioUtils = {
    handleContactForm,
    showFormMessage
};