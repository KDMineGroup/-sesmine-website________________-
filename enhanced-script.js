// ============================================
// SES_Mine - Enhanced JavaScript with EmailJS
// Complete integration with email services
// ============================================

// Global Variables
let currentUser = null;
let isInitialized = false;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    if (isInitialized) return;
    
    // Load configuration
    loadConfiguration();
    
    // Initialize EmailJS
    initializeEmailJS();
    
    // Check user session
    checkUserSession();
    
    // Initialize page-specific functionality
    initializePageFunctions();
    
    // Set up global event listeners
    setupGlobalEventListeners();
    
    isInitialized = true;
}

function initializeEmailJS() {
    if (window.EMAILJS_CONFIG) {
        EMAILJS_CONFIG.SERVICE.init();
    } else {
        console.warn('EMAILJS_CONFIG not found. Make sure to include the EmailJS configuration file.');
    }
}

function loadConfiguration() {
    // Create default users if not exists
    if (!localStorage.getItem('defaultUsersCreated')) {
        const defaultUsers = [
            {
                id: 'admin_001',
                username: 'admin@sesmine.com',
                email: 'admin@sesmine.com',
                password: 'admin123',
                name: 'System Administrator',
                role: 'admin',
                plan: 'enterprise',
                isActive: true,
                createdAt: new Date().toISOString(),
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
                createdAt: new Date().toISOString(),
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
                createdAt: new Date().toISOString(),
                lastLogin: null,
                company: 'Engineering Solutions Ltd',
                permissions: ['basic', 'advanced']
            }
        ];

        localStorage.setItem('sesmine_users', JSON.stringify(defaultUsers));
        localStorage.setItem('defaultUsersCreated', 'true');
    }
}

function checkUserSession() {
    const session = JSON.parse(localStorage.getItem('sesmine_session') || sessionStorage.getItem('sesmine_session') || '{}');
    
    if (session.username) {
        currentUser = session;
        updateUserActivity();
        handleUserRedirection();
    }
}

function handleUserRedirection() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Admin redirection
    if (currentUser.role === 'admin' && !currentPage.includes('admin')) {
        if (currentPage === 'login.html' || currentPage === 'signup.html') {
            window.location.href = 'admin-panel.html';
            return;
        }
    }
    
    // User redirection
    if (currentUser.role === 'user' && currentPage === 'login.html') {
        window.location.href = 'home.html';
        return;
    }
    
    // Protected pages check
    const protectedPages = ['home.html', 'admin-panel.html', 'setting.html'];
    if (protectedPages.includes(currentPage) && !currentUser.username) {
        window.location.href = 'login.html';
        return;
    }
}

function initializePageFunctions() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            initializeHomePage();
            break;
        case 'login.html':
            initializeLoginPage();
            break;
        case 'signup.html':
            initializeSignupPage();
            break;
        case 'home.html':
            initializeDashboard();
            break;
        case 'admin-panel.html':
            initializeAdminPanel();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        default:
            initializeGenericPage();
    }
}

// Enhanced signup function with EmailJS
async function handleSignup(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        id: generateId('req_'),
        firstName: formData.get('firstName').trim(),
        lastName: formData.get('lastName').trim(),
        name: `${formData.get('firstName').trim()} ${formData.get('lastName').trim()}`,
        email: formData.get('email').trim().toLowerCase(),
        company: formData.get('company').trim(),
        jobTitle: formData.get('jobTitle').trim(),
        phone: formData.get('phone').trim(),
        plan: formData.get('plan'),
        newsletter: formData.get('newsletter') === 'on',
        timestamp: new Date().toISOString(),
        status: 'pending',
        source: 'website'
    };
    
    // Show loading state
    setSignupLoadingState(true);
    
    try {
        // Check if email already exists
        const existingRequests = JSON.parse(localStorage.getItem('sesmine_pending_requests') || '[]');
        const existingUsers = JSON.parse(localStorage.getItem('sesmine_users') || '[]');
        
        if (existingRequests.find(req => req.email === userData.email) || 
            existingUsers.find(user => user.email === userData.email)) {
            throw new Error('Email already registered');
        }
        
        // Store registration request
        existingRequests.push(userData);
        localStorage.setItem('sesmine_pending_requests', JSON.stringify(existingRequests));
        
        // Send emails in parallel
        const emailPromises = [];
        
        // Send admin notification
        if (window.EMAILJS_CONFIG) {
            emailPromises.push(EMAILJS_CONFIG.SERVICE.sendRegistrationNotification(userData));
            emailPromises.push(EMAILJS_CONFIG.SERVICE.sendWelcomeEmail(userData));
        }
        
        // Wait for emails to send (but don't fail if they don't)
        const emailResults = await Promise.allSettled(emailPromises);
        
        // Log email results
        emailResults.forEach((result, index) => {
            const emailType = index === 0 ? 'admin notification' : 'welcome email';
            if (result.status === 'fulfilled' && result.value.success) {
                console.log(`✅ ${emailType} sent successfully`);
            } else {
                console.warn(`⚠️ ${emailType} failed:`, result.reason || result.value?.error);
            }
        });
        
        // Show success message
        showMessage('success', 'Registration request submitted successfully! You will receive an email once your account is approved.');
        
        // Reset form
        event.target.reset();
        if (window.selectPlan) selectPlan('starter');
        
    } catch (error) {
        console.error('Signup error:', error);
        if (error.message === 'Email already registered') {
            showMessage('error', 'This email is already registered. Please use a different email or try logging in.');
        } else {
            showMessage('error', 'An error occurred while processing your request. Please try again.');
        }
    } finally {
        setSignupLoadingState(false);
    }
}

// Enhanced contact form handler with EmailJS
async function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        id: generateId('contact_'),
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    setContactLoadingState(true);
    
    try {
        // Store contact message locally
        const contacts = JSON.parse(localStorage.getItem('sesmine_contacts') || '[]');
        contacts.push(contactData);
        localStorage.setItem('sesmine_contacts', JSON.stringify(contacts));
        
        // Send email notification
        let emailSent = false;
        if (window.EMAILJS_CONFIG) {
            const result = await EMAILJS_CONFIG.SERVICE.sendContactForm(contactData);
            emailSent = result.success;
            
            if (!emailSent) {
                console.warn('Contact form email failed:', result.error);
            }
        }
        
        // Show success message
        const message = emailSent 
            ? 'Message sent successfully! We will get back to you soon.'
            : 'Message received! We will get back to you soon.';
        
        showMessage('success', message);
        
        // Reset form
        event.target.reset();
        
    } catch (error) {
        console.error('Contact form error:', error);
        showMessage('error', 'Failed to send message. Please try again or contact us directly.');
    } finally {
        setContactLoadingState(false);
    }
}

// Enhanced admin approval function with EmailJS
async function approveUserRequest(requestId) {
    if (!confirm('Are you sure you want to approve this request?')) return;
    
    try {
        const allRequests = JSON.parse(localStorage.getItem('sesmine_pending_requests') || '[]');
        const requestIndex = allRequests.findIndex(r => r.id === requestId);
        
        if (requestIndex === -1) {
            throw new Error('Request not found');
        }
        
        const request = allRequests[requestIndex];
        
        // Generate temporary password
        const tempPassword = generateTempPassword();
        
        // Create user account
        const newUser = {
            id: generateId('user_'),
            username: request.email,
            email: request.email,
            password: tempPassword,
            name: request.name,
            company: request.company,
            jobTitle: request.jobTitle,
            phone: request.phone,
            role: 'user',
            plan: request.plan,
            isActive: true,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            permissions: request.plan === 'starter' ? ['basic'] : ['basic', 'advanced']
        };
        
        // Add to active users
        const activeUsers = JSON.parse(localStorage.getItem('sesmine_users') || '[]');
        activeUsers.push(newUser);
        localStorage.setItem('sesmine_users', JSON.stringify(activeUsers));
        
        // Update request status
        request.status = 'approved';
        request.approvedAt = new Date().toISOString();
        localStorage.setItem('sesmine_pending_requests', JSON.stringify(allRequests));
        
        // Send approval email
        let emailSent = false;
        if (window.EMAILJS_CONFIG) {
            const result = await EMAILJS_CONFIG.SERVICE.sendUserApproval(request, {
                password: tempPassword
            });
            emailSent = result.success;
        }
        
        // Show success message
        const message = emailSent 
            ? 'User approved successfully! Approval email sent.'
            : 'User approved successfully! Please manually send login credentials.';
        
        showMessage('success', message);
        
        // Refresh admin data if function exists
        if (window.loadAdminData) {
            loadAdminData();
        }
        
    } catch (error) {
        console.error('Error approving request:', error);
        showMessage('error', 'Failed to approve request. Please try again.');
    }
}

// Utility functions
function generateId(prefix = '') {
    return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function generateTempPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function setSignupLoadingState(loading) {
    const btn = document.getElementById('signupBtn');
    const btnText = document.getElementById('signupBtnText');
    const spinner = document.getElementById('loadingSpinner');
    
    if (btn && btnText && spinner) {
        if (loading) {
            btn.disabled = true;
            btnText.textContent = 'Creating Account...';
            spinner.style.display = 'block';
        } else {
            btn.disabled = false;
            btnText.textContent = 'Create Account';
            spinner.style.display = 'none';
        }
    }
}

function setContactLoadingState(loading) {
    const btn = document.querySelector('#contactForm button[type="submit"]');
    if (btn) {
        if (loading) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        } else {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    }
}

function showMessage(type, text, duration = 5000) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message-toast');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast message-${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${text}</span>
        </div>
        <button class="message-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 500px;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation: slideInRight 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    // Type-specific styling
    if (type === 'success') {
        messageDiv.style.background = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        messageDiv.style.background = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    } else {
        messageDiv.style.background = '#d1ecf1';
        messageDiv.style.color = '#0c5460';
        messageDiv.style.border = '1px solid #bee5eb';
    }
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after duration
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, duration);
}

function updateUserActivity() {
    if (!currentUser) return;
    
    const activities = JSON.parse(localStorage.getItem('sesmine_user_activities') || '[]');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Add current activity
    activities.unshift({
        page: currentPage,
        timestamp: new Date().toISOString(),
        user: currentUser.username
    });
    
    // Keep only last 50 activities
    if (activities.length > 50) {
        activities.splice(50);
    }
    
    localStorage.setItem('sesmine_user_activities', JSON.stringify(activities));
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('sesmine_session');
        sessionStorage.removeItem('sesmine_session');
        currentUser = null;
        window.location.href = 'index.html';
    }
}

function setupGlobalEventListeners() {
    // Handle navigation
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-navigate]')) {
            e.preventDefault();
            const target = e.target.getAttribute('data-navigate');
            window.location.href = target;
        }
    });
    
    // Handle logout buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-logout]')) {
            e.preventDefault();
            logout();
        }
    });
    
    // Handle mobile menu toggle
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-mobile-menu]')) {
            e.preventDefault();
            toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('[data-mobile-menu]');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

// Initialize page functions (stubs - implement as needed)
function initializeHomePage() {
    console.log('Home page initialized');
}

function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function initializeSignupPage() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function initializeDashboard() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    console.log('Dashboard initialized for user:', currentUser.username);
}

function initializeAdminPanel() {
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    console.log('Admin panel initialized');
}

function initializeContactPage() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function initializeGenericPage() {
    console.log('Generic page initialized');
}

// Enhanced login function
function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const rememberMe = formData.get('remember');
    
    // Validate credentials
    const users = JSON.parse(localStorage.getItem('sesmine_users') || '[]');
    const user = users.find(u => 
        (u.username === username || u.email === username) && 
        u.password === password && 
        u.isActive
    );
    
    if (user) {
        // Create session
        const session = {
            username: user.username,
            email: user.email || user.username,
            name: user.name,
            role: user.role,
            plan: user.plan,
            loginTime: new Date().toISOString()
        };
        
        // Store session
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('sesmine_session', JSON.stringify(session));
        
        // Update user last login
        user.lastLogin = new Date().toISOString();
        localStorage.setItem('sesmine_users', JSON.stringify(users));
        
        // Redirect based on role
        if (user.role === 'admin') {
            window.location.href = 'admin-panel.html';
        } else {
            window.location.href = 'home.html';
        }
        
        showMessage('success', 'Login successful!');
    } else {
        showMessage('error', 'Invalid username or password');
    }
}

// Export functions for global use
window.SESMine = {
    showMessage,
    logout,
    generateId,
    currentUser: () => currentUser,
    handleSignup,
    handleContactForm,
    approveUserRequest
};

// Add required CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .message-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        border-radius: 3px;
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    
    .message-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(animationStyles);