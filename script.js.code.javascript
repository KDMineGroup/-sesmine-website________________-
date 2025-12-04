// KIMIA Mining Solutions - Main JavaScript File

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeSmoothScroll();
    initializeFormHandlers();
    initializeCourseFilters();
});

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Dropdown menus
    navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');

        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });

        // Desktop hover
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', function() {
                menu.style.display = 'block';
                setTimeout(() => menu.classList.add('show'), 10);
            });

            dropdown.addEventListener('mouseleave', function() {
                menu.classList.remove('show');
                setTimeout(() => menu.style.display = 'none', 300);
            });
        }
    });

    // Sticky navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.platform-card, .service-card, .feature-card, .course-card, .team-card, .project-card'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styling
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Counter animation for stats
    animateCounters();
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
    const suffix = text.replace(/[0-9.]/g, '');
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, duration / steps);
}

// Smooth Scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
}

// Form Handlers
function initializeFormHandlers() {
    // Button click handlers
    document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const text = this.textContent.trim().toLowerCase();
            
            if (text.includes('demo') || text.includes('consultation')) {
                showModal('Schedule a Demo', 'demo-form');
            } else if (text.includes('quote') || text.includes('rfq')) {
                showModal('Request a Quote', 'quote-form');
            } else if (text.includes('enroll') || text.includes('course')) {
                showModal('Enroll in Course', 'enroll-form');
            }
        });
    });
}

// Modal System
function showModal(title, formType) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('kimia-modal');
    if (!modal) {
        modal = createModal();
    }

    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');

    modalTitle.textContent = title;
    modalBody.innerHTML = getFormHTML(formType);

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Form submission
    const form = modal.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(formType, new FormData(form));
        });
    }
}

function createModal() {
    const modal = document.createElement('div');
    modal.id = 'kimia-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title"></h3>
                <button type="button" class="modal-close">&times;</button>
            </div>
            <div class="modal-body"></div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close handlers
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .modal-header {
            padding: 24px;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-title {
            margin: 0;
            font-size: 1.5rem;
            color: #1f2937;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #6b7280;
            line-height: 1;
            padding: 0;
            width: 32px;
            height: 32px;
        }
        .modal-close:hover {
            color: #1f2937;
        }
        .modal-body {
            padding: 24px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #374151;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            font-family: inherit;
        }
        .form-group textarea {
            resize: vertical;
            min-height: 100px;
        }
        .form-submit {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .form-submit:hover {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);

    return modal;
}

function closeModal() {
    const modal = document.getElementById('kimia-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function getFormHTML(formType) {
    const forms = {
        'demo-form': `
            <form>
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" name="company">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone">
                </div>
                <div class="form-group">
                    <label>Preferred Date</label>
                    <input type="date" name="date">
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea name="message"></textarea>
                </div>
                <button type="submit" class="form-submit">Schedule Demo</button>
            </form>
        `,
        'quote-form': `
            <form>
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Company *</label>
                    <input type="text" name="company" required>
                </div>
                <div class="form-group">
                    <label>Service Required *</label>
                    <select name="service" required>
                        <option value="">Select Service</option>
                        <option>Innovation & Technology</option>
                        <option>Procurement</option>
                        <option>Analytics</option>
                        <option>Consulting</option>
                        <option>Training</option>
                        <option>Engineering</option>
                        <option>Economics</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Project Details</label>
                    <textarea name="details" required></textarea>
                </div>
                <button type="submit" class="form-submit">Request Quote</button>
            </form>
        `,
        'enroll-form': `
            <form>
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone">
                </div>
                <div class="form-group">
                    <label>Course Interest</label>
                    <select name="course">
                        <option>Open Pit Mine Design</option>
                        <option>Process Plant Optimization</option>
                        <option>Mining Safety Management</option>
                        <option>Mining Automation & AI</option>
                        <option>Other</option>
                    </select>
                </div>
                <button type="submit" class="form-submit">Enroll Now</button>
            </form>
        `
    };

    return forms[formType] || forms['demo-form'];
}

function handleFormSubmit(formType, formData) {
    // Show success message
    const modal = document.getElementById('kimia-modal');
    const modalBody = modal.querySelector('.modal-body');

    modalBody.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 4rem; color: #10b981; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="margin-bottom: 12px; color: #1f2937;">Thank You!</h3>
            <p style="color: #6b7280; margin-bottom: 24px;">
                We've received your request and will get back to you within 24 hours.
            </p>
            <button type="button" onclick="closeModal()" class="form-submit">Close</button>
        </div>
    `;

    // In production, send data to server
    console.log('Form submitted:', formType, Object.fromEntries(formData));
}

// Course Filter System
function initializeCourseFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const courseCards = document.querySelectorAll('.course-card');

    if (categoryButtons.length === 0) return;

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter courses
            courseCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Expose closeModal globally for inline onclick
window.closeModal = closeModal;

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});