// Translation system with enhanced error handling
const translations = {
    'en': {
        // Navigation
        'nav-services': 'Services',
        'nav-contact': 'Contact',
        
        // Hero Section
        'hero-title': 'Free AI Automation Diagnosis',
        'hero-cta': 'Get FREE Diagnosis & Draft',
        
        // Services Section
        'services-title': 'Our AI-Powered Services',
        'service1-title': 'Workflow Analysis',
        'service1-description': 'Deep dive into your current processes to identify automation opportunities and efficiency gaps.',
        'service2-title': 'AI Implementation',
        'service2-description': 'Custom AI solutions designed specifically for your business needs and existing infrastructure.',
        'service3-title': 'Process Optimization', 
        'service3-description': 'Streamline operations through intelligent automation and data-driven decision making.',
        'service4-title': 'Training & Support',
        'service4-description': 'Comprehensive training programs to ensure your team maximizes AI automation benefits.',
        
        // Contact Section
        'contact-title': 'Ready to Automate Everything?',
        'form-name': 'Full Name',
        'form-email': 'Email Address',
        'form-company': 'Company Name',
        'form-role': 'Your Role',
        'form-industry': 'Industry',
        'form-industry-select': 'Select Industry',
        'industry-technology': 'Technology',
        'industry-healthcare': 'Healthcare', 
        'industry-finance': 'Finance',
        'industry-retail': 'Retail',
        'industry-manufacturing': 'Manufacturing',
        'industry-education': 'Education',
        'industry-other': 'Other',
        'form-workflow': 'Current Workflow Challenge',
        'form-goals': 'Automation Goals',
        'form-submit': 'Get FREE Diagnosis & Draft',
        
        // Customer Welcome Overlay
        'customer-welcome-title': 'Thanks for contacting JufipAI',
        'customer-welcome-subtitle': "We'll get back to you soon",
        'customer-welcome-details': 'Your AI automation diagnosis will be delivered within 24-48 hours directly to your inbox.'
    },
    'es': {
        // Navigation
        'nav-services': 'Servicios',
        'nav-contact': 'Contacto',
        
        // Hero Section
        'hero-title': 'Diagnóstico Gratuito de Automatización IA',
        'hero-cta': 'Obtener Diagnóstico GRATUITO',
        
        // Services Section
        'services-title': 'Nuestros Servicios con IA',
        'service1-title': 'Análisis de Flujos de Trabajo',
        'service1-description': 'Análisis profundo de sus procesos actuales para identificar oportunidades de automatización y brechas de eficiencia.',
        'service2-title': 'Implementación de IA',
        'service2-description': 'Soluciones de IA personalizadas diseñadas específicamente para sus necesidades comerciales e infraestructura existente.',
        'service3-title': 'Optimización de Procesos',
        'service3-description': 'Agilice las operaciones a través de automatización inteligente y toma de decisiones basada en datos.',
        'service4-title': 'Entrenamiento y Soporte',
        'service4-description': 'Programas de entrenamiento integrales para asegurar que su equipo maximice los beneficios de automatización IA.',
        
        // Contact Section
        'contact-title': '¿Listo para Automatizar Todo?',
        'form-name': 'Nombre Completo',
        'form-email': 'Dirección de Email',
        'form-company': 'Nombre de la Empresa',
        'form-role': 'Su Rol',
        'form-industry': 'Industria',
        'form-industry-select': 'Seleccionar Industria',
        'industry-technology': 'Tecnología',
        'industry-healthcare': 'Salud',
        'industry-finance': 'Finanzas',
        'industry-retail': 'Retail',
        'industry-manufacturing': 'Manufactura',
        'industry-education': 'Educación',
        'industry-other': 'Otro',
        'form-workflow': 'Desafío de Flujo de Trabajo Actual',
        'form-goals': 'Objetivos de Automatización',
        'form-submit': 'Obtener Diagnóstico GRATUITO',
        
        // Customer Welcome Overlay
        'customer-welcome-title': 'Gracias por contactar JufipAI',
        'customer-welcome-subtitle': 'Te responderemos pronto',
        'customer-welcome-details': 'Tu diagnóstico de automatización IA será entregado dentro de 24-48 horas directamente a tu bandeja de entrada.'
    }
};

let currentLanguage = 'en';

// Enhanced form validation
const formValidation = {
    name: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-ZÀ-ÿ\u0100-\u017F\s'-]+$/,
        message: {
            en: 'Please enter a valid full name (at least 2 characters)',
            es: 'Por favor ingrese un nombre completo válido (al menos 2 caracteres)'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: {
            en: 'Please enter a valid email address',
            es: 'Por favor ingrese una dirección de email válida'
        }
    },
    company: {
        required: false,
        minLength: 2,
        message: {
            en: 'Company name must be at least 2 characters',
            es: 'El nombre de la empresa debe tener al menos 2 caracteres'
        }
    },
    role: {
        required: false,
        minLength: 2,
        message: {
            en: 'Role must be at least 2 characters',
            es: 'El rol debe tener al menos 2 caracteres'
        }
    },
    workflow: {
        required: true,
        minLength: 10,
        message: {
            en: 'Please describe your workflow challenge in detail (at least 10 characters)',
            es: 'Por favor describa su desafío de flujo de trabajo en detalle (al menos 10 caracteres)'
        }
    },
    goals: {
        required: false,
        minLength: 5,
        message: {
            en: 'Goals should be at least 5 characters',
            es: 'Los objetivos deben tener al menos 5 caracteres'
        }
    }
};

// Form submission with enhanced analytics
function submitForm(formData) {
    // Enhanced form submission logic
    const submitData = {
        ...formData,
        language: currentLanguage,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        source: 'jufipai-website'
    };
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'engagement',
            'event_label': 'contact_form',
            'language': currentLanguage
        });
    }
    
    return fetch('https://formspree.io/f/xgveegjg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
    });
}

// Language switching with enhanced UX
function switchLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language '${lang}' not available, falling back to English`);
        lang = 'en';
    }
    
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update language switch UI
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.classList.remove('active');
        option.setAttribute('aria-selected', 'false');
        option.setAttribute('tabindex', '-1');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
            option.setAttribute('aria-selected', 'true');
            option.setAttribute('tabindex', '0');
        }
    });
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Update slider position
    const slider = document.querySelector('.language-slider');
    const activeOption = document.querySelector('.language-option.active');
    if (slider && activeOption) {
        const optionRect = activeOption.getBoundingClientRect();
        const containerRect = activeOption.parentElement.getBoundingClientRect();
        slider.style.transform = `translateX(${optionRect.left - containerRect.left}px)`;
    }
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_change', {
            'event_category': 'engagement',
            'event_label': lang
        });
    }
}

// Enhanced form validation function
function validateField(fieldName, value) {
    const rules = formValidation[fieldName];
    if (!rules) return { valid: true };
    
    // Required field check
    if (rules.required && !value.trim()) {
        return {
            valid: false,
            message: rules.message[currentLanguage] || rules.message.en
        };
    }
    
    // Skip other validations if field is empty and not required
    if (!value.trim() && !rules.required) {
        return { valid: true };
    }
    
    // Minimum length check
    if (rules.minLength && value.trim().length < rules.minLength) {
        return {
            valid: false,
            message: rules.message[currentLanguage] || rules.message.en
        };
    }
    
    // Pattern check
    if (rules.pattern && !rules.pattern.test(value)) {
        return {
            valid: false,
            message: rules.message[currentLanguage] || rules.message.en
        };
    }
    
    return { valid: true };
}

// Show validation error
function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
        inputElement.setAttribute('aria-invalid', 'true');
    }
}

// Clear validation error
function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    if (inputElement) {
        inputElement.classList.remove('error');
        inputElement.setAttribute('aria-invalid', 'false');
    }
}

// Show form status message
function showFormStatus(message, type = 'success') {
    const statusElement = document.getElementById('formStatus');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `form-status ${type}`;
        statusElement.style.display = 'block';
        
        // Auto-hide after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }
}

// Handle redirect notifications
function handleRedirectNotification() {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        // Handle the redirect path
        if (redirectPath.toLowerCase() === '/contact' || redirectPath.toLowerCase() === '/contact/') {
            // Scroll to contact form after page loads
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }
    
    // Also handle direct hash navigation
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath === '/services' || currentPath === '/services/') {
        setTimeout(() => {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else if (currentPath === '/features' || currentPath === '/features/') {
        setTimeout(() => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Welcome overlay system completely removed to prevent purple screen issues
    
    
    // Handle loading screen after welcome message
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                document.body.classList.add('loaded');
            }, 1000);
        } else {
            document.body.classList.add('loaded');
        }
    }, 500);
    
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Navbar background opacity based on scroll
                if (currentScroll > 100) {
                    navbar.style.background = 'var(--surface-glass-hover)';
                    navbar.style.borderBottomColor = 'rgba(251, 191, 36, 0.2)';
                } else {
                    navbar.style.background = 'var(--surface-glass)';
                    navbar.style.borderBottomColor = 'rgba(251, 191, 36, 0.1)';
                }
                
                // Handle customer welcome overlay visibility on scroll
                const customerWelcomeOverlay = document.getElementById('customerWelcomeOverlay');
                const customerWelcomeTimeout = window.customerWelcomeTimeout;
                
                if (customerWelcomeOverlay && customerWelcomeOverlay.style.display !== 'none') {
                    if (currentScroll > 50) {
                        // User is scrolling, hide customer welcome overlay
                        document.body.style.overflow = '';
                        document.body.style.height = '';
                        document.documentElement.style.overflow = '';
                        document.documentElement.style.height = '';
                        
                        customerWelcomeOverlay.classList.add('fade-out');
                        setTimeout(() => {
                            customerWelcomeOverlay.style.display = 'none';
                        }, 1500);
                        clearTimeout(customerWelcomeTimeout);
                    }
                }
                
                lastScroll = currentScroll;
            });
            ticking = false;
        }
        ticking = true;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('JufipAI website loaded successfully');
    
    // Initialize redirect notifications
    handleRedirectNotification();
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLanguage);
    
    // Initialize navbar scroll effects
    initializeNavbarScroll();
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Language switching
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
        
        // Keyboard navigation for language options
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
            }
        });
    });
    
    // Form handling with enhanced validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Real-time validation on input
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                const fieldName = this.name || this.id;
                const value = this.value;
                const validation = validateField(fieldName, value);
                
                if (!validation.valid) {
                    showError(fieldName, validation.message);
                } else {
                    clearError(fieldName);
                }
            });
            
            field.addEventListener('input', function() {
                const fieldName = this.name || this.id;
                clearError(fieldName);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous status
            const statusElement = document.getElementById('formStatus');
            if (statusElement) {
                statusElement.style.display = 'none';
            }
            
            // Validate all fields
            let isFormValid = true;
            const formData = new FormData(this);
            const dataObject = {};
            
            for (let [key, value] of formData.entries()) {
                dataObject[key] = value;
                const validation = validateField(key, value);
                if (!validation.valid) {
                    showError(key, validation.message);
                    isFormValid = false;
                }
            }
            
            if (!isFormValid) {
                showFormStatus(
                    currentLanguage === 'es' 
                        ? 'Por favor corrija los errores en el formulario' 
                        : 'Please fix the errors in the form',
                    'error'
                );
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('.submit-btn');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${currentLanguage === 'es' ? 'Enviando...' : 'Sending...'}`;
            submitButton.disabled = true;
            
            // Submit form
            submitForm(dataObject)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Success!
                    showFormStatus(
                        currentLanguage === 'es'
                            ? '¡Gracias! Su diagnóstico será enviado dentro de 24-48 horas.'
                            : 'Thank you! Your diagnosis will be sent within 24-48 hours.',
                        'success'
                    );
                    
                    // Reset form
                    this.reset();
                    
                    // Show customer welcome overlay
                    const customerOverlay = document.getElementById('customerWelcomeOverlay');
                    if (customerOverlay) {
                        customerOverlay.style.display = 'flex';
                        
                        // Auto-hide after 8 seconds
                        window.customerWelcomeTimeout = setTimeout(() => {
                            customerOverlay.classList.add('fade-out');
                            setTimeout(() => {
                                customerOverlay.style.display = 'none';
                            }, 1500);
                        }, 8000);
                        
                        // Hide on click/touch
                        customerOverlay.addEventListener('click', function() {
                            this.classList.add('fade-out');
                            setTimeout(() => {
                                this.style.display = 'none';
                            }, 1500);
                            clearTimeout(window.customerWelcomeTimeout);
                        });
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    showFormStatus(
                        currentLanguage === 'es'
                            ? 'Error al enviar el formulario. Por favor intente nuevamente.'
                            : 'Error submitting form. Please try again.',
                        'error'
                    );
                })
                .finally(() => {
                    // Restore button state
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // CTA button smooth scroll
    const ctaButton = document.getElementById('ctaButton');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Analytics and performance tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'language': currentLanguage
        });
    }
    
    // Performance monitoring
    if ('performance' in window && 'navigation' in performance) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const navTiming = performance.getEntriesByType('navigation')[0];
                const loadTime = navTiming.loadEventEnd - navTiming.loadEventStart;
                
                if (typeof gtag !== 'undefined' && loadTime > 0) {
                    gtag('event', 'timing_complete', {
                        'name': 'page_load',
                        'value': Math.round(loadTime)
                    });
                }
            }, 0);
        });
    }
});

// Error handling and fallbacks
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Analytics error tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error ? e.error.toString() : 'Unknown error',
            'fatal': false
        });
    }
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}