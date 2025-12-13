// ============================================
// SESMine Configuration File
// Smart Engineering Solutions for Mining
// ============================================

const CONFIG = {
    // Site Information
    SITE_NAME: 'SES_MINE',
    SITE_TAGLINE: 'Smart Engineering Solutions',
    SITE_URL: 'https://sesmine.com',
    VERSION: '1.0.0',
    
    // EmailJS Configuration
    EMAILJS: {
        PUBLIC_KEY: 'YvIsuy4VXOAFCLwx2c', // 🔧 REPLACE WITH YOUR EMAILJS PUBLIC KEY
        SERVICE_ID: 'service_v1tzk6t',         // 🔧 REPLACE WITH YOUR EMAILJS SERVICE ID
        TEMPLATE_IDS: {
            REGISTRATION: 'template_registration',    // Admin notification template
            APPROVAL: 'template_approval',           // User approval template
            CONTACT: 'template_contact',             // Contact form template
            NEWSLETTER: 'template_newsletter',       // Newsletter template
            WELCOME: 'template_welcome'              // Welcome email template
        }
    },
    
    // User Plans Configuration
    PLANS: {
        STARTER: {
            id: 'starter',
            name: 'Starter',
            price: 0,
            currency: 'USD',
            billing: 'free',
            description: 'Perfect for individuals and small teams getting started',
            features: [
                'Basic Engineering Tools',
                'Cost Calculators (CAPEX/OPEX)',
                'Basic Training Courses',
                'Email Support',
                'Community Access'
            ],
            limits: {
                projects: 5,
                reports: 10,
                storage: '1GB',
                apiCalls: 100,
                teamMembers: 1
            },
            restrictions: [
                'No advanced analytics',
                'No risk analysis tools',
                'No premium training',
                'No priority support'
            ]
        },
        PROFESSIONAL: {
            id: 'professional',
            name: 'Professional',
            price: 99,
            currency: 'USD',
            billing: 'monthly',
            description: 'Advanced tools for professional engineers and consultants',
            features: [
                'All Starter Features',
                'Advanced Analytics & Charts',
                'Risk Analysis Tools',
                'Premium Training Courses',
                'Priority Email Support',
                'Export to Excel/PDF',
                'Advanced Calculators'
            ],
            limits: {
                projects: 25,
                reports: 100,
                storage: '10GB',
                apiCalls: 1000,
                teamMembers: 5
            },
            restrictions: [
                'No AI-powered analysis',
                'No custom solutions',
                'No dedicated support'
            ]
        },
        ENTERPRISE: {
            id: 'enterprise',
            name: 'Enterprise',
            price: 299,
            currency: 'USD',
            billing: 'monthly',
            description: 'Complete solution for large organizations and enterprises',
            features: [
                'All Professional Features',
                'AI-Powered Analysis',
                'Custom Solutions & Integrations',
                'Dedicated Account Manager',
                'Phone & Video Support',
                'API Access',
                'Custom Training Programs',
                'White-label Options'
            ],
            limits: {
                projects: -1, // Unlimited
                reports: -1,  // Unlimited
                storage: '100GB',
                apiCalls: 10000,
                teamMembers: -1 // Unlimited
            },
            restrictions: []
        }
    },
    
    // Default User Accounts for Testing
    DEFAULT_USERS: [
        {
            id: 'admin_001',
            username: 'admin@sesmine.com',
            email: 'admin@sesmine.com',
            password: 'admin123',
            name: 'System Administrator',
            role: 'admin',
            plan: 'enterprise',
            isActive: true,
            createdAt: '2024-01-01T00:00:00.000Z',
            lastLogin: null,
            permissions: ['all']
        },
        {
            id: 'demo_001',
            username: 'demo@sesmine.com',
            email: 'demo@sesmine.com',
            password: 'demo123',
            name: 'Demo User',
            role: 'user',
            plan: 'starter',
            isActive: true,
            createdAt: '2024-01-01T00:00:00.000Z',
            lastLogin: null,
            company: 'Demo Company',
            permissions: ['basic']
        },
        {
            id: 'eng_001',
            username: 'engineer@sesmine.com',
            email: 'engineer@sesmine.com',
            password: 'eng123',
            name: 'Professional Engineer',
            role: 'user',
            plan: 'professional',
            isActive: true,
            createdAt: '2024-01-01T00:00:00.000Z',
            lastLogin: null,
            company: 'Engineering Solutions Ltd',
            permissions: ['basic', 'advanced']
        }
    ],
    
    // API Configuration (for future backend integration)
    API: {
        BASE_URL: 'https://api.sesmine.com/v1',
        TIMEOUT: 10000,
        ENDPOINTS: {
            AUTH: '/auth',
            USERS: '/users',
            PROJECTS: '/projects',
            REPORTS: '/reports',
            ANALYTICS: '/analytics',
            BILLING: '/billing'
        },
        HEADERS: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    },
    
    // Feature Flags
    FEATURES: {
        ENABLE_REGISTRATION: true,
        ENABLE_EMAIL_VERIFICATION: true,
        ENABLE_PAYMENT: false,        // Set to true when payment is implemented
        ENABLE_API: false,           // Set to true when backend API is ready
        ENABLE_ANALYTICS: true,
        ENABLE_EXPORT: true,
        ENABLE_NOTIFICATIONS: true,
        MAINTENANCE_MODE: false,
        DEBUG_MODE: true             // Set to false in production
    },
    
    // UI Configuration
    UI: {
        THEME: 'light',
        ANIMATIONS: true,
        SIDEBAR_COLLAPSED: false,
        ITEMS_PER_PAGE: 10,
        AUTO_SAVE_INTERVAL: 30000,   // 30 seconds
        SESSION_TIMEOUT: 3600000,    // 1 hour
        TOAST_DURATION: 5000         // 5 seconds
    },
    
    // Validation Rules
    VALIDATION: {
        PASSWORD: {
            MIN_LENGTH: 6,
            REQUIRE_UPPERCASE: false,
            REQUIRE_LOWERCASE: false,
            REQUIRE_NUMBERS: false,
            REQUIRE_SPECIAL: false
        },
        EMAIL: {
            PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        COMPANY: {
            MIN_LENGTH: 2,
            MAX_LENGTH: 100
        }
    },
    
    // Storage Keys
    STORAGE_KEYS: {
        SESSION: 'sesmine_session',
        USERS: 'sesmine_users',
        PENDING_REQUESTS: 'sesmine_pending_requests',
        ACTIVE_USERS: 'sesmine_active_users',
        USER_ACTIVITIES: 'sesmine_user_activities',
        CONTACTS: 'sesmine_contacts',
        SETTINGS: 'sesmine_settings',
        PROJECTS: 'sesmine_projects',
        REPORTS: 'sesmine_reports'
    },
    
    // Default Settings
    DEFAULT_SETTINGS: {
        emailNotifications: true,
        browserNotifications: false,
        autoSave: true,
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD'
    },
    
    // Error Messages
    ERROR_MESSAGES: {
        INVALID_CREDENTIALS: 'Invalid username or password',
        USER_NOT_FOUND: 'User not found',
        EMAIL_EXISTS: 'Email already registered',
        WEAK_PASSWORD: 'Password is too weak',
        NETWORK_ERROR: 'Network connection error',
        SERVER_ERROR: 'Server error occurred',
        UNAUTHORIZED: 'Unauthorized access',
        FORBIDDEN: 'Access forbidden',
        NOT_FOUND: 'Resource not found',
        VALIDATION_ERROR: 'Validation error'
    },
    
    // Success Messages
    SUCCESS_MESSAGES: {
        LOGIN_SUCCESS: 'Login successful!',
        REGISTRATION_SUCCESS: 'Registration request submitted successfully!',
        PROFILE_UPDATED: 'Profile updated successfully!',
        PASSWORD_CHANGED: 'Password changed successfully!',
        EMAIL_SENT: 'Email sent successfully!',
        DATA_SAVED: 'Data saved successfully!',
        USER_APPROVED: 'User approved successfully!',
        SETTINGS_SAVED: 'Settings saved successfully!'
    },
    
    // Navigation Menu Structure
    NAVIGATION: {
        MAIN: [
            { name: 'Home', url: 'index.html', icon: 'fas fa-home' },
            { name: 'About', url: 'about.html', icon: 'fas fa-info-circle' },
            { name: 'Features', url: 'features.html', icon: 'fas fa-star' },
            { name: 'Contact', url: 'contact.html', icon: 'fas fa-envelope' }
        ],
        USER: [
            { name: 'Dashboard', url: 'home.html', icon: 'fas fa-tachometer-alt' },
            { name: 'Engineering Hub', url: 'engineering-hub.html', icon: 'fas fa-cogs' },
            { name: 'Economics Hub', url: 'economics-hub.html', icon: 'fas fa-chart-line' },
            { name: 'Training Hub', url: 'training-education-hub.html', icon: 'fas fa-graduation-cap' },
            { name: 'Analytics', url: 'analytics-platform.html', icon: 'fas fa-chart-bar' },
            { name: 'Consulting', url: 'consulting-hub.html', icon: 'fas fa-users' },
            { name: 'Innovation', url: 'innovation-technology-hub.html', icon: 'fas fa-lightbulb' },
            { name: 'Procurement', url: 'procurement-hub.html', icon: 'fas fa-shopping-cart' },
            { name: 'Settings', url: 'setting.html', icon: 'fas fa-cog' }
        ],
        ADMIN: [
            { name: 'Dashboard', url: 'admin-panel.html', icon: 'fas fa-tachometer-alt' },
            { name: 'Users', url: 'admin-panel.html#users', icon: 'fas fa-users' },
            { name: 'Requests', url: 'admin-panel.html#requests', icon: 'fas fa-user-clock' },
            { name: 'Analytics', url: 'admin-panel.html#analytics', icon: 'fas fa-chart-bar' },
            { name: 'Settings', url: 'admin-panel.html#settings', icon: 'fas fa-cog' }
        ]
    },
    
    // Hub Access Control
    HUB_ACCESS: {
        'engineering-hub.html': ['starter', 'professional', 'enterprise'],
        'economics-hub.html': ['starter', 'professional', 'enterprise'],
        'training-education-hub.html': ['starter', 'professional', 'enterprise'],
        'analytics-platform.html': ['professional', 'enterprise'],
        'consulting-hub.html': ['starter', 'professional', 'enterprise'],
        'innovation-technology-hub.html': ['enterprise'],
        'procurement-hub.html': ['professional', 'enterprise']
    },
    
    // Sample Data for Development
    SAMPLE_DATA: {
        PROJECTS: [
            {
                id: 'proj_001',
                name: 'Copper Mine Expansion',
                type: 'Mine Planning',
                status: 'active',
                progress: 65,
                createdAt: '2024-01-15T00:00:00.000Z',
                updatedAt: '2024-02-10T00:00:00.000Z'
            },
            {
                id: 'proj_002',
                name: 'Gold Processing Plant',
                type: 'Process Design',
                status: 'completed',
                progress: 100,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-30T00:00:00.000Z'
            }
        ],
        ACTIVITIES: [
            {
                id: 'act_001',
                type: 'login',
                title: 'User Login',
                description: 'demo@sesmine.com logged in',
                timestamp: new Date().toISOString(),
                icon: 'fas fa-sign-in-alt'
            },
            {
                id: 'act_002',
                type: 'project',
                title: 'Project Created',
                description: 'New project "Copper Mine Expansion" created',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                icon: 'fas fa-plus-circle'
            }
        ]
    }
};

// Utility Functions
CONFIG.UTILS = {
    // Generate unique ID
    generateId: function(prefix = '') {
        return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Format currency
    formatCurrency: function(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Format date
    formatDate: function(date, format = 'MM/DD/YYYY') {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        
        switch(format) {
            case 'MM/DD/YYYY':
                return `${month}/${day}/${year}`;
            case 'DD/MM/YYYY':
                return `${day}/${month}/${year}`;
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            default:
                return d.toLocaleDateString();
        }
    },
    
    // Validate email
    isValidEmail: function(email) {
        return CONFIG.VALIDATION.EMAIL.PATTERN.test(email);
    },
    
    // Validate password
    isValidPassword: function(password) {
        const rules = CONFIG.VALIDATION.PASSWORD;
        if (password.length < rules.MIN_LENGTH) return false;
        if (rules.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) return false;
        if (rules.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) return false;
        if (rules.REQUIRE_NUMBERS && !/\d/.test(password)) return false;
        if (rules.REQUIRE_SPECIAL && !/[!@#$%^&*]/.test(password)) return false;
        return true;
    },
    
    // Get user plan details
    getPlanDetails: function(planId) {
        return CONFIG.PLANS[planId.toUpperCase()] || CONFIG.PLANS.STARTER;
    },
    
    // Check feature access
    hasFeatureAccess: function(feature, userPlan) {
        const plan = this.getPlanDetails(userPlan);
        // Add specific feature access logic here
        return true; // Simplified for now
    },
    
    // Get storage with fallback
    getStorage: function(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(CONFIG.STORAGE_KEYS[key] || key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    },
    
    // Set storage with error handling
    setStorage: function(key, value) {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEYS[key] || key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    }
};

// Initialize configuration
CONFIG.init = function() {
    // Set up default users if not exists
    if (!CONFIG.UTILS.getStorage('USERS')) {
        CONFIG.UTILS.setStorage('USERS', CONFIG.DEFAULT_USERS);
    }
    
    // Set up default settings
    if (!CONFIG.UTILS.getStorage('SETTINGS')) {
        CONFIG.UTILS.setStorage('SETTINGS', CONFIG.DEFAULT_SETTINGS);
    }
    
    // Initialize EmailJS if available and configured
    if (window.emailjs && CONFIG.EMAILJS.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
        emailjs.init(CONFIG.EMAILJS.PUBLIC_KEY);
    }
    
    // Log initialization in debug mode
    if (CONFIG.FEATURES.DEBUG_MODE) {
        console.log('SESMine Configuration Initialized', CONFIG);
    }
};

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof define === 'function' && define.amd) {
    define([], function() { return CONFIG; });
} else {
    window.CONFIG = CONFIG;
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', CONFIG.init);
    } else {
        CONFIG.init();
    }
}