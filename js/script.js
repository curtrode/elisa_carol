// Contemporary Professional Website JavaScript
// Smooth scrolling, mobile navigation, and interactive elements

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        initializeSmoothScroll();
        initializeScrollEffects();
        initializeFormHandling();
        initializeAnimations();
    });

    // Navigation functionality
    function initializeNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navbar = document.querySelector('.navbar');
        
        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }

        // Navbar scroll effect
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide navbar on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });

        // Active navigation link highlighting
        updateActiveNavLink();
        window.addEventListener('scroll', updateActiveNavLink);
    }

    // Smooth scrolling for anchor links
    function initializeSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll-triggered animations and effects
    function initializeScrollEffects() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .stat, .timeline-item, .award');
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero');
            
            if (heroSection) {
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Form handling
    function initializeFormHandling() {
        const contactForm = document.querySelector('.contact-form form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmission(this);
            });

            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    clearFieldError(this);
                });
            });
        }
    }

    // Handle form submission
    function handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Validate all fields
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        }, 2000);
    }

    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name;
        
        clearFieldError(field);
        
        // Required field check
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required.');
            return false;
        }
        
        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address.');
                return false;
            }
        }
        
        // Name validation
        if (fieldName === 'name' && value && value.length < 2) {
            showFieldError(field, 'Name must be at least 2 characters long.');
            return false;
        }
        
        // Message validation
        if (fieldName === 'message' && value && value.length < 10) {
            showFieldError(field, 'Message must be at least 10 characters long.');
            return false;
        }
        
        return true;
    }

    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    // Clear field error
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
    }

    // Initialize animations
    function initializeAnimations() {
        // Counter animation for stats
        const statNumbers = document.querySelectorAll('.stat h3');
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Counter animation
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }

    // Utility function to debounce events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add CSS for additional effects
    const additionalStyles = `
        .navbar {
            transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-link.active {
            color: var(--sage-primary) !important;
            background-color: var(--sage-lighter);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #e53e3e;
            box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
        }
        
        .error-message {
            color: #e53e3e;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 1100;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-success {
            border-left: 4px solid var(--sage-primary);
        }
        
        .notification-error {
            border-left: 4px solid #e53e3e;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 2rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                z-index: 999;
            }
            
            .nav-menu.active {
                transform: translateY(0);
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    
    // Inject additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

})();
