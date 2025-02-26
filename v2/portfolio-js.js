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

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

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
        const phrases = [' Backend Development', ' Microservices Architecture', ' Cloud Solutions', ' System Designing', ' Frontend Development'];
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

    // Fetch GitHub repositories
    const fetchGithubRepos = async () => {
        try {
            const username = 'navratnavats';
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
            if (!response.ok) throw new Error('Failed to fetch repositories');
            return await response.json();
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            return [];
        }
    };

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';

            try {
                const response = await fetch('https://navratnavats-portfolio.onrender.com/send-email', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message })
                });


                const result = await response.json();
                showFormMessage(response.ok ? 'Your message has been sent successfully!' : result.error || 'Failed to send message.', response.ok ? 'success' : 'error');

                if (response.ok) contactForm.reset();
            } catch (error) {
                showFormMessage('An error occurred. Please try again.', 'error');
                console.error('Error sending email:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }
        });
    }

    // Show form messages
    function showFormMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        existingMessage?.remove();

        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;

        contactForm?.after(messageElement);
        setTimeout(() => messageElement.remove(), 5000);
    }

    // Initialize all functions
    const init = () => {
        fetchGithubRepos();
    };

    init();
});
