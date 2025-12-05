// ============================================
// SES_Mine - Complete JavaScript
// Smart Engineering Solutions for Mining
// ============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initThemeToggle();
    initMobileMenu();
    initCounters();
    initCharts();
    initCalculators();
    initTabs();
});

// ============================================
// Navigation Functions
// ============================================
function initNavigation() {
    const nav = document.querySelector('.floating-nav');
    const navLinks = document.querySelectorAll('.nav-item');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offset = 100;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Highlight active section
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.querySelector('.nav-menu-wrapper');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu on link click
        const navLinks = menu.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// ============================================
// Theme Toggle
// ============================================
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
            
            const icon = toggleBtn.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }
}

// ============================================
// Scroll Effects & Animations
// ============================================
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elements = document.querySelectorAll('.platform-card-creative, .service-card, .feature-card, .kpi-card-modern');
    elements.forEach(el => observer.observe(el));
}

function initAnimations() {
    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
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
    `;
    document.head.appendChild(style);
}

// ============================================
// Counter Animation
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// Charts Initialization
// ============================================
function initCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') return;

    // Mini Charts
    initMiniCharts();
    
    // Sparklines
    initSparklines();
}

function initMiniCharts() {
    const chartIds = ['miniChart1', 'miniChart2', 'miniChart3', 'miniChart4'];
    
    chartIds.forEach((id, index) => {
        const ctx = document.getElementById(id);
        if (!ctx) return;
        
        const types = ['line', 'bar', 'doughnut', 'line'];
        const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                data: generateRandomData(7),
                backgroundColor: 'rgba(0, 242, 255, 0.2)',
                borderColor: '#00f2ff',
                borderWidth: 2,
                tension: 0.4
            }]
        };
        
        new Chart(ctx, {
            type: types[index],
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: types[index] !== 'doughnut' ? {
                    y: { display: false },
                    x: { display: false }
                } : {}
            }
        });
    });
}

function initSparklines() {
    const sparklineIds = ['sparkline1', 'sparkline2', 'sparkline3', 'sparkline4'];
    
    sparklineIds.forEach(id => {
        const ctx = document.getElementById(id);
        if (!ctx) return;
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(20).fill(''),
                datasets: [{
                    data: generateRandomData(20),
                    borderColor: '#00f2ff',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'rgba(0, 242, 255, 0.1)',
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { display: false },
                    x: { display: false }
                }
            }
        });
    });
}

function generateRandomData(count) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 50);
}

// ============================================
// Calculator Functions
// ============================================
function initCalculators() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.calc-tab-btn');
    const panels = document.querySelectorAll('.calculator-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const calcType = btn.getAttribute('data-calc');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const panel = document.getElementById(`${calcType}-calculator`);
            if (panel) panel.classList.add('active');
        });
    });
}

// NPV Calculator
function calculateNPV() {
    const investment = parseFloat(document.getElementById('npv-investment').value);
    const cashflow = parseFloat(document.getElementById('npv-cashflow').value);
    const life = parseFloat(document.getElementById('npv-life').value);
    const rate = parseFloat(document.getElementById('npv-rate').value) / 100;
    
    let pv = 0;
    for (let i = 1; i <= life; i++) {
        pv += cashflow / Math.pow(1 + rate, i);
    }
    const npv = pv - investment;
    
    const resultEl = document.getElementById('npv-result');
    const statusEl = document.getElementById('npv-status');
    const explanationEl = document.getElementById('npv-explanation');
    
    if (resultEl) {
        resultEl.textContent = '$' + npv.toFixed(1) + 'M';
    }
    
    if (statusEl) {
        if (npv > 0) {
            statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Economically Viable';
            statusEl.className = 'result-status positive';
        } else {
            statusEl.innerHTML = '<i class="fas fa-times-circle"></i> Not Viable';
            statusEl.className = 'result-status negative';
        }
    }
    
    if (explanationEl) {
        explanationEl.textContent = `The project generates a ${npv > 0 ? 'positive' : 'negative'} NPV of $${Math.abs(npv).toFixed(1)}M at a ${(rate * 100).toFixed(1)}% discount rate, indicating it ${npv > 0 ? 'will create value for investors and should be considered for investment' : 'will destroy value and should not be pursued'}.`;
    }
}

// IRR Calculator
function calculateIRR() {
    const investment = parseFloat(document.getElementById('irr-investment').value);
    const cashflow = parseFloat(document.getElementById('irr-cashflow').value);
    const life = parseFloat(document.getElementById('irr-life').value);
    const required = parseFloat(document.getElementById('irr-required').value);
    
    // Simplified IRR calculation
    const totalCashflow = cashflow * life;
    const irr = ((totalCashflow / investment - 1) / life) * 100;
    
    const resultEl = document.getElementById('irr-result');
    const statusEl = document.getElementById('irr-status');
    const explanationEl = document.getElementById('irr-explanation');
    
    if (resultEl) {
        resultEl.textContent = irr.toFixed(1) + '%';
    }
    
    if (statusEl) {
        if (irr > required) {
            statusEl.innerHTML = '<i class="fas fa-arrow-up"></i> Exceeds Required Return';
            statusEl.className = 'result-status positive';
        } else {
            statusEl.innerHTML = '<i class="fas fa-arrow-down"></i> Below Required Return';
            statusEl.className = 'result-status negative';
        }
    }
    
    if (explanationEl) {
        explanationEl.textContent = `The project IRR of ${irr.toFixed(1)}% ${irr > required ? 'significantly exceeds' : 'falls below'} the required return of ${required}%, indicating ${irr > required ? 'strong investment potential with substantial margin above the hurdle rate' : 'insufficient returns for the risk profile'}.`;
    }
}

// Payback Calculator
function calculatePayback() {
    const investment = parseFloat(document.getElementById('pb-investment').value);
    const cashflow = parseFloat(document.getElementById('pb-cashflow').value);
    const payback = investment / cashflow;
    
    const resultEl = document.getElementById('pb-result');
    const explanationEl = document.getElementById('pb-explanation');
    
    if (resultEl) {
        resultEl.textContent = payback.toFixed(1) + ' years';
    }
    
    if (explanationEl) {
        explanationEl.textContent = `The initial investment will be fully recovered in ${payback.toFixed(1)} years through the project's annual cash flows. This represents a ${payback < 5 ? 'relatively short' : 'longer'} payback period.`;
    }
}

// Breakeven Calculator
function calculateBreakeven() {
    const fixed = parseFloat(document.getElementById('be-fixed').value);
    const variable = parseFloat(document.getElementById('be-variable').value);
    const price = parseFloat(document.getElementById('be-price').value);
    const margin = price - variable;
    const breakeven = (fixed * 1000000) / margin;
    
    const resultEl = document.getElementById('be-result');
    const marginEl = document.getElementById('be-margin');
    const explanationEl = document.getElementById('be-explanation');
    
    if (resultEl) {
        resultEl.textContent = (breakeven / 1000000).toFixed(1) + 'M tons/year';
    }
    
    if (marginEl) {
        marginEl.textContent = '$' + margin.toFixed(0) + '/ton';
    }
    
    if (explanationEl) {
        explanationEl.textContent = `The operation needs to produce and sell ${(breakeven / 1000000).toFixed(1)}M tons per year to cover all fixed and variable costs and break even. Production above this level generates profit at a contribution margin of $${margin.toFixed(0)} per ton.`;
    }
}

// ============================================
// Tab System
// ============================================
function initTabs() {
    const tabButtons = document.querySelectorAll('[data-tab]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            const tabContent = document.getElementById(tabName);
            
            if (!tabContent) return;
            
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Remove active from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            tabContent.classList.add('active');
            button.classList.add('active');
        });
    });
}

// ============================================
// Particle Background Animation
// ============================================
function initParticles() {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 255, 0.5)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 242, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize particles if canvas exists
if (document.getElementById('particles-bg')) {
    initParticles();
}

// ============================================
// Utility Functions
// ============================================
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

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Export functions to global scope
window.calculateNPV = calculateNPV;
window.calculateIRR = calculateIRR;
window.calculatePayback = calculatePayback;
window.calculateBreakeven = calculateBreakeven;
window.scrollToTop = scrollToTop;

console.log('SES_Mine Platform Initialized Successfully! 🚀');
