/**
 * Modern Portfolio Website JavaScript
 * Enhanced for better user experience and visual effects
 */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const contactForm = document.getElementById('contactForm');
    const backToTopBtn = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section');
    const typedTextElement = document.querySelector('.typed-text');
    let lastScrollTop = 0;

    // Responsive Navigation Function
    function initResponsiveNavigation() {
        // Create mobile navigation header and close button
        const mobileNavClose = document.createElement('div');
        mobileNavClose.classList.add('mobile-nav-close');
        mobileNavClose.innerHTML = '&times;';
        mobileNavClose.style.display = 'none';

        const mobileNavHeader = document.createElement('div');
        mobileNavHeader.classList.add('mobile-nav-header');
        mobileNavHeader.innerHTML = `
            <div class="mobile-nav-logo">NV</div>
        `;
        mobileNavHeader.appendChild(mobileNavClose);

        // Create navigation overlay
        const navOverlay = document.createElement('div');
        navOverlay.classList.add('nav-overlay');
        document.body.appendChild(navOverlay);

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');

            // Add or remove mobile nav header when menu is opened/closed
            if (navLinks.classList.contains('active')) {
                // Insert mobile nav header at the beginning of nav links
                if (!navLinks.contains(mobileNavHeader)) {
                    navLinks.insertBefore(mobileNavHeader, navLinks.firstChild);
                }
                mobileNavHeader.style.display = 'flex';
                mobileNavClose.style.display = 'block';

                // Prevent body scrolling
                document.body.classList.add('menu-open');
            } else {
                // Restore body scroll
                document.body.classList.remove('menu-open');
            }
        }

        // Close mobile menu when a nav link is clicked
        function closeMenuOnLinkClick(e) {
            if (e.target.tagName === 'A') {
                // First close the menu
                if (window.innerWidth <= 768) {
                    toggleMobileMenu();
                }

                // Handle smooth scrolling separately
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Remove active state from all links
                    navLinks.querySelectorAll('a').forEach(link => {
                        link.classList.remove('active');
                    });

                    // Add active state to clicked link
                    e.target.classList.add('active');

                    // Scroll to the target section with offset for header
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                    // Small delay to ensure menu is closed before scrolling
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        }

        // Responsive Navigation Visibility
        function checkNavResponsiveness() {
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // Mobile setup
                hamburger.style.display = 'block';
                navLinks.style.display = 'flex';

                // Initial mobile state
                if (!navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navOverlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            } else {
                // Desktop setup
                hamburger.style.display = 'none';
                navLinks.style.display = 'flex';
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');

                // Restore body styles
                document.body.classList.remove('menu-open');

                // Remove mobile header from desktop view
                if (mobileNavHeader.parentNode) {
                    mobileNavHeader.parentNode.removeChild(mobileNavHeader);
                }
            }
        }

        // Event Listeners
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }

        if (navLinks) {
            navLinks.addEventListener('click', closeMenuOnLinkClick);
        }

        // Add click event to close button
        mobileNavClose.addEventListener('click', toggleMobileMenu);

        // Add click event to mobile nav header (blue part)
        mobileNavHeader.addEventListener('click', (e) => {
            if (e.target === mobileNavHeader) {
                toggleMobileMenu();
            }
        });

        // Close menu when clicking on overlay
        navOverlay.addEventListener('click', toggleMobileMenu);

        // Initial check and add resize listener
        checkNavResponsiveness();
        window.addEventListener('resize', checkNavResponsiveness);
    }

    // Initialize Responsive Navigation
    initResponsiveNavigation();

    // Header scroll effects
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        header.classList.toggle('scrolled', scrollTop > 80);

        if (scrollTop > lastScrollTop && scrollTop > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;

        backToTopBtn?.classList.toggle('active', scrollTop > 500);
        highlightNavOnScroll();
    });

    // Highlight active section in navbar
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(item => {
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
        anchor.addEventListener('click', function (e) {
            // Skip if it's a mobile menu item (handled separately)
            if (window.innerWidth <= 768 && navLinks.contains(this)) {
                return;
            }

            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Back to top button functionality
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Typing effect for hero section
    if (typedTextElement) {
        const phrases = [
            ' Backend Development',
            ' Microservices Architecture',
            ' Cloud Solutions',
            ' System Designing',
            ' Frontend Development'
        ];
        let phraseIndex = 0, charIndex = 0, isDeleting = false, typingDelay = 100;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + (isDeleting ? -1 : 1));
            charIndex += isDeleting ? -1 : 1;
            typingDelay = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingDelay = 1000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingDelay = 500;
            }

            setTimeout(typeEffect, typingDelay);
        }

        setTimeout(typeEffect, 1000);
    }

    // Show form messages
    function showFormMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;

        if (contactForm) {
            contactForm.after(messageElement);
            setTimeout(() => messageElement.remove(), 5000);
        }
    }

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Form validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            // Update button state to show loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';

            try {
                const response = await fetch('https://portfolio-c62z.onrender.com/send-email', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message })
                });

                // Handle response
                const result = await response.json();

                if (response.ok) {
                    showFormMessage('Your message has been sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    showFormMessage(result.error || 'Failed to send message.', 'error');
                }
            } catch (error) {
                showFormMessage('An error occurred. Please try again.', 'error');
                console.error('Error sending email:', error);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Update copyright year
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});