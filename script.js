// Language translations
const translations = {
    en: {
        'page-title': 'JufipAI - Free AI Automation Diagnosis',
        'nav-home': 'Home',
        'nav-services': 'Services', 
        'nav-contact': 'Contact',
        'hero-title': 'Free AI Automation Diagnosis',
        'hero-cta': 'Get FREE Diagnosis & Draft',
        'services-title': 'Our AI-Powered Services',
        'service1-title': 'Workflow Analysis',
        'service1-description': 'Deep dive into your current processes to identify automation opportunities and efficiency gaps.',
        'service2-title': 'AI Implementation',
        'service2-description': 'Custom AI solutions tailored to your specific business needs and workflow requirements.',
        'service3-title': 'Process Optimization',
        'service3-description': 'Streamline operations with intelligent automation that saves time and reduces errors.',
        'service4-title': 'Training & Support',
        'service4-description': 'Comprehensive training programs to ensure your team maximizes AI automation benefits.',
        'contact-title': 'Ready to Automate Everything?',
        'contact-info-title': 'Get Your Free Analysis',
        'contact-info-description': 'Fill out the form and receive a comprehensive automation blueprint within 24 hours. No meetings, no sales calls - just actionable insights.',
        'benefit1': 'Detailed workflow analysis',
        'benefit2': 'Custom automation roadmap',
        'benefit3': 'Implementation timeline',
        'benefit4': 'ROI projections',
        'form-name': 'Full Name',
        'form-email': 'Email Address',
        'form-company': 'Company',
        'form-workflow': 'Describe Your Current Workflow',
        'form-goals': 'Automation Goals',
        'form-submit': 'Get My Free Analysis',
        'footer-description': 'Transforming businesses through intelligent automation solutions.',
        'footer-services-title': 'Services',
        'footer-analysis': 'Workflow Analysis',
        'footer-implementation': 'AI Implementation',
        'footer-optimization': 'Process Optimization',
        'footer-training': 'Training & Support',
        'footer-contact-title': 'Contact',
        'footer-contact-info': 'Ready to automate? Get your free analysis today.',
        'footer-cta': 'Start Now',
        'footer-rights': 'All rights reserved.',
        'customer-welcome-title': 'Thank You!',
        'customer-welcome-message': 'Your request has been received. We\'ll send you a comprehensive automation analysis within 24 hours.',
        'customer-close': 'Continue'
    },
    es: {
        'page-title': 'JufipAI - Diagnóstico Gratuito de Automatización IA',
        'nav-home': 'Inicio',
        'nav-services': 'Servicios',
        'nav-contact': 'Contacto',
        'hero-title': 'Diagnóstico Gratuito de Automatización IA',
        'hero-cta': 'Obtener Diagnóstico GRATIS',
        'services-title': 'Nuestros Servicios Potenciados por IA',
        'service1-title': 'Análisis de Flujo de Trabajo',
        'service1-description': 'Análisis profundo de sus procesos actuales para identificar oportunidades de automatización y brechas de eficiencia.',
        'service2-title': 'Implementación de IA',
        'service2-description': 'Soluciones de IA personalizadas adaptadas a las necesidades específicas de su negocio y requisitos de flujo de trabajo.',
        'service3-title': 'Optimización de Procesos',
        'service3-description': 'Optimice las operaciones con automatización inteligente que ahorra tiempo y reduce errores.',
        'service4-title': 'Capacitación y Soporte',
        'service4-description': 'Programas de capacitación integral para asegurar que su equipo maximice los beneficios de la automatización IA.',
        'contact-title': '¿Listo para Automatizar Todo?',
        'contact-info-title': 'Obtenga Su Análisis Gratuito',
        'contact-info-description': 'Complete el formulario y reciba un plan integral de automatización en 24 horas. Sin reuniones, sin llamadas de ventas - solo información práctica.',
        'benefit1': 'Análisis detallado del flujo de trabajo',
        'benefit2': 'Hoja de ruta de automatización personalizada',
        'benefit3': 'Cronograma de implementación',
        'benefit4': 'Proyecciones de ROI',
        'form-name': 'Nombre Completo',
        'form-email': 'Dirección de Email',
        'form-company': 'Empresa',
        'form-workflow': 'Describa Su Flujo de Trabajo Actual',
        'form-goals': 'Objetivos de Automatización',
        'form-submit': 'Obtener Mi Análisis Gratuito',
        'footer-description': 'Transformando negocios a través de soluciones de automatización inteligente.',
        'footer-services-title': 'Servicios',
        'footer-analysis': 'Análisis de Flujo de Trabajo',
        'footer-implementation': 'Implementación de IA',
        'footer-optimization': 'Optimización de Procesos',
        'footer-training': 'Capacitación y Soporte',
        'footer-contact-title': 'Contacto',
        'footer-contact-info': '¿Listo para automatizar? Obtenga su análisis gratuito hoy.',
        'footer-cta': 'Comenzar Ahora',
        'footer-rights': 'Todos los derechos reservados.',
        'customer-welcome-title': '¡Gracias!',
        'customer-welcome-message': 'Su solicitud ha sido recibida. Le enviaremos un análisis integral de automatización en 24 horas.',
        'customer-close': 'Continuar'
    }
};

// Current language state
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

// Utility functions
function updateLanguageDisplay() {
    const langDisplay = document.getElementById('currentLang');
    if (langDisplay) {
        langDisplay.textContent = currentLanguage.toUpperCase();
    }
}

function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[currentLanguage][key];
            } else if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                // Handle placeholder text for inputs
                if (key === 'form-workflow') {
                    element.placeholder = currentLanguage === 'en' ? 
                        'Tell us about your current processes, pain points, and what you\'d like to automate...' :
                        'Cuéntanos sobre tus procesos actuales, puntos de dolor y qué te gustaría automatizar...';
                } else if (key === 'form-goals') {
                    element.placeholder = currentLanguage === 'en' ?
                        'What specific outcomes are you hoping to achieve?' :
                        '¿Qué resultados específicos esperas lograr?';
                }
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
    
    // Update page title
    document.title = translations[currentLanguage]['page-title'];
}

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!form || !formStatus) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous status
        formStatus.className = 'form-status';
        formStatus.textContent = '';
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = currentLanguage === 'en' ? 'Sending...' : 'Enviando...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                formStatus.className = 'form-status success';
                formStatus.textContent = currentLanguage === 'en' ? 
                    'Thank you! We\'ll send your automation analysis within 24 hours.' :
                    '¡Gracias! Te enviaremos tu análisis de automatización en 24 horas.';
                
                // Show customer welcome overlay
                showCustomerWelcome();
                
                // Reset form
                form.reset();
                clearErrors();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.className = 'form-status error';
            formStatus.textContent = currentLanguage === 'en' ? 
                'Sorry, there was an error sending your message. Please try again.' :
                'Lo siento, hubo un error al enviar tu mensaje. Por favor intenta de nuevo.';
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const workflow = form.querySelector('#workflow');
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showError('name', currentLanguage === 'en' ? 'Name is required' : 'El nombre es requerido');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError('email', currentLanguage === 'en' ? 'Email is required' : 'El email es requerido');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('email', currentLanguage === 'en' ? 'Please enter a valid email' : 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    // Validate workflow description
    if (!workflow.value.trim()) {
        showError('workflow', currentLanguage === 'en' ? 'Workflow description is required' : 'La descripción del flujo de trabajo es requerida');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + '-error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    inputElements.forEach(element => {
        element.classList.remove('error');
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Customer welcome overlay
function showCustomerWelcome() {
    const overlay = document.getElementById('customerWelcomeOverlay');
    const closeBtn = document.getElementById('customerCloseBtn');
    
    if (!overlay) return;
    
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Close button handler
    if (closeBtn) {
        closeBtn.onclick = hideCustomerWelcome;
    }
    
    // Close on overlay click (outside content)
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            hideCustomerWelcome();
        }
    };
    
    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            hideCustomerWelcome();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function hideCustomerWelcome() {
    const overlay = document.getElementById('customerWelcomeOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Language toggle functionality
function initializeLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
            localStorage.setItem('preferredLanguage', currentLanguage);
            updateLanguageDisplay();
            translatePage();
        });
    }
}

// Handle redirect notifications
function handleRedirectNotification() {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        // Could show a notification here if needed
        console.log(`Redirected from: ${redirectPath}`);
    }
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up', 'scroll-down');
        } else if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle any redirects first
    handleRedirectNotification();
    
    // Initialize language
    updateLanguageDisplay();
    translatePage();
    
    // Initialize all functionality
    initializeNavigation();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeScrollAnimations();
    initializeLanguageToggle();
    initializeNavbarScroll();
    
    // Add loading complete class
    document.body.classList.add('loaded');
    
    console.log('JufipAI website initialized successfully');
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance optimization: Preload critical resources
function preloadCriticalResources() {
    // Preload hero image if exists
    const heroImage = document.querySelector('.hero img');
    if (heroImage && heroImage.dataset.src) {
        const img = new Image();
        img.src = heroImage.dataset.src;
    }
}

// Call preload function
preloadCriticalResources();