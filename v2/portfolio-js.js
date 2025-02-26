/**
 * Modern Portfolio Website JavaScript
 * Enhanced for better user experience and visual effects
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const contactForm = document.getElementById('contactForm');
    const navItems = document.querySelectorAll('.nav-links li a');
    const backToTopBtn = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section');
    
    // Initialize variables
    let lastScrollTop = 0;
    let isTypingActive = false;
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            // Update active nav link
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Header scroll effects
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header transform on scroll
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
        lastScrollTop = scrollTop;
        
        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollTop > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
        
        // Active nav item based on section
        highlightNavOnScroll();
    });
    
    // Highlight nav item based on current section
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if href is just "#"
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height to adjust scroll position
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button functionality
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Typing effect for hero section
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
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
            
            if (isTypingActive) {
                setTimeout(typeEffect, typingDelay);
            }
        }
        
        // Start typing effect when hero section is visible
        isTypingActive = true;
        setTimeout(typeEffect, 1000); // Delay before starting
    }
    
    // Fetch GitHub repositories
    const fetchGithubRepos = async () => {
        try {
            // This function is just a placeholder
            console.log('GitHub repo data would be fetched here');
            
            // Example API call (uncomment and modify with actual username when implemented)
            /*
            const username = 'navratnavats';
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const repos = await response.json();
            
            // Handle empty repos array
            if (repos.length === 0) {
                console.log('No repositories found');
                return;
            }
            
            // Process and display repo data
            updateProjectCards(repos);
            */
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
        }
    };
    
    // Function to update project cards with GitHub data
    const updateProjectCards = (repos) => {
        // This is a placeholder - implement when GitHub integration is ready
        console.log('Would update project cards with:', repos);
    };
    
    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
            const submitBtn = contactForm.querySelector('button[type="submit"]');
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
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Display form messages
    function showFormMessage(message, type) {
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
        if (contactForm) {
            contactForm.after(messageElement);
        }
        
        // Add entrance animation
        messageElement.style.animation = 'fadeIn 0.3s forwards';
        
        // Remove message after delay
        setTimeout(() => {
            messageElement.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .service-card, .project-card, .timeline-item, .contact-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' 
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize animations for hero elements
    const initHeroAnimations = () => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        
        heroElements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.classList.add(`delay-${index % 3 + 1}`);
        });
    };
    
    // Parallax effect for hero section
    const initParallax = () => {
        const hero = document.querySelector('.hero');
        const shapes = document.querySelectorAll('.floating-shape');
        
        if (hero && shapes.length > 0) {
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
    };
    
    // Add ripple effect to buttons
    const addButtonRippleEffect = () => {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const x = e.clientX - this.getBoundingClientRect().left;
                const y = e.clientY - this.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    };
    
    // Update the copyright year
    const updateCopyrightYear = () => {
        const yearElement = document.querySelector('.current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear().toString();
        }
    };
    
    // Add animation CSS
    function addAnimationStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Appear animation for scrolled elements */
            .skill-category, .service-card, .project-card, .timeline-item, .contact-item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .skill-category.appear, .service-card.appear, .project-card.appear, 
            .timeline-item.appear, .contact-item.appear {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Staggered animations for timeline items */
            .timeline-item:nth-child(odd) {
                transform: translateX(-50px);
            }
            
            .timeline-item:nth-child(even) {
                transform: translateX(50px);
            }
            
            .timeline-item.appear:nth-child(odd),
            .timeline-item.appear:nth-child(even) {
                transform: translateX(0);
            }
            
            /* Form message animations */
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-10px); }
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
    }
    
    // Initialize all functions
    const init = () => {
        // Add CSS for animations
        addAnimationStyles();
        
        // Initialize animations and effects
        initHeroAnimations();
        animateOnScroll();
        
        // Initialize reactive UI elements
        addButtonRippleEffect();
        initParallax();
        updateCopyrightYear();
        
        // GitHub data - commented out until implemented
        // fetchGithubRepos();
    };
    
    // Run initialization
    init();
});
