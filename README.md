# 🏔️ SESMine - Smart Engineering Solutions for Mining Industry

## 📋 **Project Overview**

SESMine is a comprehensive web-based platform designed for the mining industry, providing intelligent access control, hub-based services, and advanced user management capabilities.

### 🎯 **Key Features**

- **Multi-level Access Control**: 4 distinct user levels (Guest, Basic, Professional, Premium)
- **Hub-based Architecture**: 7 specialized industry hubs
- **Advanced User Management**: Complete admin dashboard with approval workflows
- **Email Integration**: Automated notifications via EmailJS
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Real-time Updates**: Dynamic content updates and status tracking

---

## 🏗️ **System Architecture**

### **Access Levels**
```
Level 0 (Free Plan)     - Guest Access
Level 1 (Basic Plan)    - Basic User
Level 2 (Professional) - Professional Access
Level 3 (Premium)       - VIP Access
Level 4 (Admin)         - Complete System Control
```

### **Industry Hubs**
1. **Engineering Hub** - Mine design, 3D modeling, simulation
2. **Economics Hub** - Financial analysis, cost estimation
3. **Procurement Hub** - Equipment sourcing, vendor management
4. **Training Hub** - Professional development, certifications
5. **Consulting Hub** - Expert advisory, feasibility studies
6. **Analytics Hub** - Data analysis, predictive modeling
7. **Innovation Hub** - AI solutions, digital transformation

---

## 📁 **File Structure**

```
SESMine-Project/
├── index.html              # Main landing page with integrated system
├── login.html              # User login interface
├── signup.html             # User registration interface
├── user-dashboard.html     # User dashboard and hub access
├── admin-dashboard.html    # Admin management interface
├── settings.html           # User account settings
└── README.md              # Project documentation
```

---

## 🚀 **Quick Start Guide**

### **Step 1: Setup EmailJS**

1. Create account at [EmailJS.com](https://www.emailjs.com)
2. Add Gmail service
3. Create email templates:
 - `admin_notification` - For admin notifications
 - `welcome_user` - For user welcome emails
 - `hub_request` - For hub access requests

### **Step 2: Configure System**

Update these variables in each HTML file:

```javascript
// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ADMIN = 'your_admin_template_id';
const EMAILJS_TEMPLATE_WELCOME = 'your_welcome_template_id';
const ADMIN_EMAIL = 'your_admin_email@domain.com';

// Initialize EmailJS
emailjs.init("your_public_key");
```

### **Step 3: Default Admin Account**

```
Email: admin@sesmine.com
Password: admin123
```

---

## 🔧 **Technical Specifications**

### **Frontend Technologies**
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Grid and Flexbox
- **JavaScript (ES6+)** - Dynamic functionality and API integration
- **Font Awesome 6.4.0** - Icon library
- **Google Fonts (Inter)** - Typography

### **External Services**
- **EmailJS** - Email automation and notifications
- **LocalStorage** - Client-side data persistence

### **Browser Support**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

## 📊 **User Workflow**

### **For New Users**
1. **Registration** → Fill signup form with plan selection
2. **Email Verification** → Automated welcome email sent
3. **Admin Approval** → Account pending admin review
4. **Account Activation** → Admin approves/rejects account
5. **Hub Access Requests** → Request specific hub access
6. **Hub Approval** → Admin reviews and grants access
7. **Platform Usage** → Access granted hubs and features

### **For Admins**
1. **Login** → Access admin dashboard
2. **User Management** → Review and approve new users
3. **Hub Requests** → Manage hub access requests
4. **System Monitoring** → Track platform usage and statistics
5. **Content Management** → Oversee all platform activities

---

## 🔐 **Security Features**

### **Authentication**
- Email-based user identification
- Password-protected accounts
- Session management via LocalStorage
- Role-based access control

### **Authorization**
- Multi-level permission system
- Hub-specific access control
- Admin approval workflows
- Request-based access granting

### **Data Protection**
- Client-side data encryption
- Secure email communications
- Privacy-compliant data handling
- User data export capabilities

---

## 📧 **Email Templates**

### **Admin Notification Template**
```html
Subject: New Registration Request - SESMine

Dear Admin,

New user registration:
- Name: {{user_name}}
- Email: {{user_email}}
- Company: {{user_company}}
- Plan: {{user_plan}}
- Date: {{signup_date}}

Please review and approve.

Best regards,
SESMine System
```

### **Welcome Email Template**
```html
Subject: Welcome to SESMine!

Dear {{user_name}},

Welcome to SESMine Platform!

Your registration details:
- Email: {{user_email}}
- Company: {{user_company}}
- Plan: {{user_plan}}

Your account is pending admin approval.

Best regards,
SESMine Team
```

---

## 🎨 **UI/UX Features**

### **Design Principles**
- **Mobile-First**: Responsive design for all devices
- **Accessibility**: WCAG 2.1 compliant interface
- **Modern Aesthetics**: Clean, professional appearance
- **Intuitive Navigation**: User-friendly interface design

### **Visual Elements**
- **Color Scheme**: Professional blue gradient theme
- **Typography**: Inter font family for readability
- **Icons**: Font Awesome for consistent iconography
- **Animations**: Smooth transitions and hover effects

---

## 📈 **Analytics & Reporting**

### **User Metrics**
- Total registered users
- Active user sessions
- Hub access statistics
- Plan distribution analysis

### **System Metrics**
- Registration conversion rates
- Hub request approval rates
- Platform usage patterns
- Performance monitoring

---

## 🛠️ **Customization Options**

### **Branding**
- Logo and company name updates
- Color scheme modifications
- Custom styling and themes
- Personalized email templates

### **Functionality**
- Additional hub creation
- Custom user roles
- Extended permission systems
- Integration with external APIs

---

## 🚨 **Troubleshooting**

### **Common Issues**

**Email not sending:**
- Verify EmailJS configuration
- Check service and template IDs
- Ensure Gmail service is connected
- Validate public key

**User not found:**
- Clear browser LocalStorage
- Check user registration status
- Verify email address format
- Refresh user data

**Hub access denied:**
- Confirm user account is verified
- Check admin approval status
- Verify hub request submission
- Contact system administrator

---

## 📞 **Support & Contact**

### **Technical Support**
- **Email**: support@sesmine.com
- **Documentation**: Available in each HTML file
- **Issue Tracking**: GitHub repository (if applicable)

### **Business Inquiries**
- **Email**: info@sesmine.com
- **Website**: www.sesmine.com
- **Phone**: +1 (555) 123-4567

---

## 📄 **License & Terms**

### **Usage Rights**
- Free for educational and personal use
- Commercial licensing available upon request
- Attribution required for public deployments

### **Data Privacy**
- GDPR compliant data handling
- User consent for data processing
- Right to data portability and deletion
- Transparent privacy policies

---

## 🔄 **Version History**

### **v1.0.0** (Current)
- Initial release with core functionality
- Complete user management system
- Hub-based access control
- Email integration and notifications
- Responsive design implementation

### **Planned Updates**
- **v1.1.0**: Enhanced analytics dashboard
- **v1.2.0**: API integration capabilities
- **v1.3.0**: Mobile application support
- **v2.0.0**: Enterprise features and scaling

---

## 🤝 **Contributing**

### **Development Guidelines**
- Follow existing code structure
- Maintain responsive design principles
- Test across multiple browsers
- Document new features thoroughly

### **Contribution Process**
1. Fork the repository
2. Create feature branch
3. Implement changes
4. Test functionality
5. Submit pull request
6. Code review process

---

**© 2024 SESMine - Smart Engineering Solutions. All rights reserved.**
