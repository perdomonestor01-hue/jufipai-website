/**
 * JufipAI Website JavaScript
 * Improved with error handling and performance optimization
 */

'use strict';

// URL Routing System for Contact Form
function handleContactRouting() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    // Handle /contact path - redirect to /#contact
    if (currentPath === '/contact') {
        console.log('🔗 Detected /contact route, redirecting to /#contact');
        window.history.replaceState({}, '', '/#contact');
        scrollToContact();
        return;
    }

    // Handle #contact hash on page load
    if (currentHash === '#contact') {
        console.log('🔗 Detected #contact hash, scrolling to contact');
        setTimeout(scrollToContact, 500); // Wait for page to load
        return;
    }

    // Handle any contact-related query parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('contact') === 'true' || urlParams.get('section') === 'contact') {
        console.log('🔗 Detected contact query parameters, redirecting to /#contact');
        window.history.replaceState({}, '', '/#contact');
        setTimeout(scrollToContact, 500);
        return;
    }
}

// Scroll to contact section with proper offset
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = contactSection.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Focus on first form input after scrolling
        setTimeout(() => {
            const firstInput = contactSection.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 800);
    }
}

// Handle browser back/forward navigation
window.addEventListener('popstate', handleContactRouting);

// Handle initial page load routing
document.addEventListener('DOMContentLoaded', handleContactRouting);

// Error handling wrapper
function safeExecute(fn, context = 'Unknown') {
    try {
        return fn();
    } catch (error) {
        console.error(`Error in ${context}:`, error);
        return null;
    }
}

// Loading Animation
window.addEventListener('load', function() {
    // SPECTACULAR WELCOME MESSAGE SYSTEM
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    let welcomeTimeout;
    
    // Add welcome-active class to body for complete coverage
    document.body.classList.add('welcome-active');
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100vh';
    
    // Generate spectacular floating particles
    function createWelcomeParticles() {
        return safeExecute(() => {
            const particlesContainer = document.getElementById('welcomeParticles');
            if (!particlesContainer) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('welcome-particle');
            
            // Random positioning and animation delay
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            // Random blue metallic colors for variety
            const colors = [
                'rgba(59, 130, 246, 0.8)',   // Bright blue
                'rgba(14, 165, 233, 0.7)',   // Sky blue
                'rgba(147, 197, 253, 0.6)',  // Light blue
                'rgba(30, 64, 175, 0.9)',    // Deep blue
                'rgba(99, 102, 241, 0.7)'    // Indigo blue
            ];
            const shadowColors = [
                'rgba(59, 130, 246, 0.9)',
                'rgba(14, 165, 233, 0.8)',
                'rgba(147, 197, 253, 0.6)',
                'rgba(30, 64, 175, 0.7)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 ${8 + Math.random() * 12}px ${shadowColors[Math.floor(Math.random() * shadowColors.length)]}, 0 0 ${15 + Math.random() * 10}px ${colors[Math.floor(Math.random() * colors.length)]}`;
            
            particlesContainer.appendChild(particle);
        }
        }, 'createWelcomeParticles');
    }
    
    // Initialize spectacular particles
    createWelcomeParticles();
    
    function hideWelcomeMessage() {
        if (welcomeOverlay && !welcomeOverlay.classList.contains('fade-out')) {
            // Play futuristic spaceship launch sound
            initAudio();
            // Small delay to ensure audio context is ready
            setTimeout(() => {
                if (audioEnabled && audioContext && audioContext.playSpaceshipLaunch) {
                    try {
                        audioContext.playSpaceshipLaunch();
                    } catch (e) {
                        console.log('Spaceship launch audio failed:', e);
                    }
                }
            }, 50);
            
            // Immediately restore scrolling
            document.body.classList.remove('welcome-active');
            document.documentElement.style.overflow = '';
            document.documentElement.style.height = '';
            document.body.style.overflow = '';
            document.body.style.height = '';
            
            welcomeOverlay.classList.add('fade-out');
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 1500);
            clearTimeout(welcomeTimeout);
        }
    }
    
    // Auto-hide after 5 seconds
    welcomeTimeout = setTimeout(hideWelcomeMessage, 5000);
    
    // Hide on click anywhere with spectacular effect
    if (welcomeOverlay) {
        welcomeOverlay.addEventListener('click', hideWelcomeMessage);
    }
    
    // Handle loading screen after welcome message
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});

// Customer Welcome Overlay Functions
function showCustomerWelcome() {
    const customerWelcomeOverlay = document.getElementById('customerWelcomeOverlay');
    let customerWelcomeTimeout;
    
    if (customerWelcomeOverlay) {
        // Add welcome-active class to body for complete coverage
        document.body.classList.add('welcome-active');
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100vh';
        
        // Show overlay
        customerWelcomeOverlay.style.display = 'flex';
        customerWelcomeOverlay.classList.remove('fade-out');
        
        function hideCustomerWelcome() {
            if (customerWelcomeOverlay && !customerWelcomeOverlay.classList.contains('fade-out')) {
                // Play success sound
                initAudio();
                if (audioEnabled && audioContext && audioContext.playSuccessSound) {
                    audioContext.playSuccessSound();
                }
                
                // Immediately restore scrolling
                document.body.classList.remove('welcome-active');
                document.documentElement.style.overflow = '';
                document.documentElement.style.height = '';
                document.body.style.overflow = '';
                document.body.style.height = '';
                
                customerWelcomeOverlay.classList.add('fade-out');
                setTimeout(() => {
                    customerWelcomeOverlay.style.display = 'none';
                }, 1500);
                clearTimeout(customerWelcomeTimeout);
            }
        }
        
        // Auto-hide after 6 seconds (slightly longer than main welcome)
        customerWelcomeTimeout = setTimeout(hideCustomerWelcome, 6000);
        
        // Hide on click anywhere with spectacular effect
        customerWelcomeOverlay.addEventListener('click', hideCustomerWelcome);
    }
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}


// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            // Calculate offset for fixed header with better positioning
            const headerHeight = document.querySelector('.header').offsetHeight;
            let targetPosition;
            
            // Special positioning for features section to center it perfectly
            if (href === '#features') {
                // Calculate viewport height and center the features section title
                const viewportHeight = window.innerHeight;
                const featuresHeaderHeight = target.querySelector('.features-header').offsetHeight;
                const perfectCenter = viewportHeight / 2 - featuresHeaderHeight / 2 - headerHeight;
                targetPosition = target.offsetTop - perfectCenter;
            } else {
                targetPosition = target.offsetTop - headerHeight - 20; // Standard offset for other sections
            }
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Service card hover interactions only (click handled by modal system)
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        initAudio();
        if (audioEnabled) audioContext.playHoverSound();
    });
});

// Process step interactions
document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        initAudio();
        if (audioEnabled) audioContext.playHoverSound();
    });

    step.addEventListener('click', function() {
        initAudio();
        if (audioEnabled) audioContext.playClickSound();
        
        // Add a subtle scale effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Value prop interactions
document.querySelectorAll('.value-prop').forEach(prop => {
    prop.addEventListener('mouseenter', function() {
        initAudio();
        if (audioEnabled) audioContext.playHoverSound();
    });

    prop.addEventListener('click', function() {
        initAudio();
        if (audioEnabled) audioContext.playClickSound();
    });
});

// Navigation link interactions
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        initAudio();
        if (audioEnabled) audioContext.playHoverSound();
    });
});

// CTA button effects
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        initAudio();
        if (audioEnabled) audioContext.playHoverSound();
    });

    button.addEventListener('click', function(e) {
        initAudio();
        if (audioEnabled) audioContext.playClickSound();
    });
});

// Form input focus sounds
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        initAudio();
        if (audioEnabled) audioContext.playHoverSound();
    });
});

// Initialize particles when page loads
createParticles();

// Web Audio API for interactive sounds (NOT background music)
let audioContext = null;
let audioEnabled = false;

function initAudio() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume audio context if suspended (browser autoplay policy)
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    console.log('Audio context resumed successfully');
                });
            }
            
            audioEnabled = true;
            
            // Create audio methods
            audioContext.playHoverSound = function() {
                if (!audioEnabled) return;
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            };
            
            audioContext.playClickSound = function() {
                if (!audioEnabled) return;
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.15);
            };
            
            audioContext.playSuccessSound = function() {
                if (!audioEnabled) return;
                // Play a pleasant success chord
                const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
                frequencies.forEach((freq, index) => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
                    
                    oscillator.start(audioContext.currentTime + index * 0.1);
                    oscillator.stop(audioContext.currentTime + 0.8 + index * 0.1);
                });
            };
            
            // Special professional service card click sound
            audioContext.playServiceCardSound = function() {
                if (!audioEnabled) return;
                
                // Professional, solemn, short sound - like a refined bell or chime
                const oscillator1 = audioContext.createOscillator();
                const oscillator2 = audioContext.createOscillator();
                const gainNode1 = audioContext.createGain();
                const gainNode2 = audioContext.createGain();
                const masterGain = audioContext.createGain();
                
                // Connect oscillators through individual gain nodes to master gain
                oscillator1.connect(gainNode1);
                oscillator2.connect(gainNode2);
                gainNode1.connect(masterGain);
                gainNode2.connect(masterGain);
                masterGain.connect(audioContext.destination);
                
                // Professional frequencies: perfect fifth interval (440Hz + 659.25Hz)
                oscillator1.frequency.setValueAtTime(440, audioContext.currentTime); // A4
                oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
                
                // Solemn, refined envelope - short but with dignity
                const duration = 0.3;
                const attack = 0.02;
                const decay = 0.28;
                
                // Master volume control
                masterGain.gain.setValueAtTime(0, audioContext.currentTime);
                masterGain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + attack);
                masterGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
                
                // Individual oscillator balancing
                gainNode1.gain.setValueAtTime(0.7, audioContext.currentTime);
                gainNode2.gain.setValueAtTime(0.5, audioContext.currentTime);
                
                // Start and stop with precise timing
                oscillator1.start(audioContext.currentTime);
                oscillator2.start(audioContext.currentTime);
                oscillator1.stop(audioContext.currentTime + duration);
                oscillator2.stop(audioContext.currentTime + duration);
            };
            
            // Simple, clean launch sound
            audioContext.playSpaceshipLaunch = function() {
                if (!audioEnabled) return;
                
                // Simple ascending sweep with clean fade
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 1.0);
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 1.2);
            };
            
        } catch (e) {
            console.log('Web Audio API not supported or blocked');
            audioEnabled = false;
        }
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add subtle mouse movement parallax effect
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const agents = document.querySelectorAll('.ai-agent');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });

    // Subtle parallax for AI agents
    agents.forEach((agent, index) => {
        const speed = (index % 2 + 1) * 0.3;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        const currentTransform = agent.style.transform || '';
        agent.style.transform = currentTransform + ` translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Contact form handling with Google Spreadsheet integration
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    initAudio();
    if (audioEnabled) audioContext.playClickSound();

    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData);
    
    const submitBtn = this.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #6b7280, #9ca3af)';
    
    try {
        // Send to Google Spreadsheet
        // You need to create a Google Apps Script Web App with your spreadsheet ID
        const response = await fetch('https://script.google.com/macros/s/AKfycbx6pu8s3tWi_vyVS76X_fqeJTgyS5399MCcX2j3se7zB4IVE0LUCNHkh3IY-u_fjwu-/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'Full Name': formObject.name,
                'Email Address': formObject.email,
                'Company Name': formObject.company || '',
                'Project Description': formObject.description
            })
        });
        
        // Play success sound
        if (audioEnabled) audioContext.playSuccessSound();
        
        // Show spectacular customer welcome overlay instead of simple popup
        setTimeout(() => {
            showCustomerWelcome();
        }, 1000); // Short delay to let success sound play
        
        // Reset form
        this.reset();
        
        // Update button to success state
        submitBtn.textContent = '✓ Submitted Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Fallback to mailto if Google Sheets fails
        const subject = encodeURIComponent('JufipAI Automation Inquiry from ' + formObject.name);
        const body = encodeURIComponent(`Hello JufipAI Team,

Name: ${formObject.name}
Email: ${formObject.email}
Company: ${formObject.company || 'Not specified'}

Project Description:
${formObject.description}

Best regards,
${formObject.name}`);
        
        const mailtoLink = `mailto:contact@jufipai.com?subject=${subject}&body=${body}`;
        window.open(mailtoLink);
        
        submitBtn.textContent = 'Opening email client...';
        submitBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    }
    
    // Reset button after delay
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.transform = '';
        submitBtn.disabled = false;
    }, 4000);
});

// Music controls removed

// Music toggle removed - functionality disabled

// Music toggle hover removed - functionality disabled

// Features CTA Corner functionality
const featuresCTA = document.getElementById('featuresCTA');

featuresCTA.addEventListener('click', function() {
    initAudio();
    if (audioEnabled) audioContext.playClickSound();
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Focus on the first form field after scrolling
        setTimeout(() => {
            const firstInput = contactSection.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 800);
    }
});

featuresCTA.addEventListener('mouseenter', function() {
    initAudio();
    if (audioEnabled) audioContext.playHoverSound();
});

// Service data for popup content

// English service data with detailed descriptions
const serviceDetails = {
    'AI + Automation Integration': {
        icon: 'fas fa-robot',
        title: 'AI + Automation Integration',
        content: `
            <p>Beyond basic AI deployment - we create <span class="highlight">intelligent automation that connects ChatGPT, Claude, Groq, and DeepSeek</span> with your existing systems, eliminating human intervention entirely.</p>
            
            <p><span class="highlight">How AI + Automation is the perfect solution for every business across industries:</span> Our multi-AI orchestration approach ensures you're never locked into a single provider. When ChatGPT is down, Claude takes over. When you need speed, Groq processes your requests. This redundancy and specialization means <span class="highlight">99.9% uptime and optimal performance</span> for every task.</p>
            
            <p>Whether you're in <span class="highlight">real estate</span> - instead of responding to boring and repetitive emails, the automations could do it for you and you just focus on showings and applications. Or if you're a <span class="highlight">healthcare professional</span> automating patient records, retail optimizing inventory, or finance processing transactions - our AI agents work 24/7 across <span class="highlight">every industry</span> because they adapt to your specific business logic, not the other way around.</p>
        `
    },
    'Google Workspace Automation': {
        icon: 'fab fa-google',
        title: 'Google Workspace Automation',
        content: `
            <p>Transform Google Workspace from a tool into an <span class="highlight">intelligent ecosystem</span>. Automated workflows, smart document processing, and zero-touch data management.</p>
            
            <p><span class="highlight">Workspace is free and don't require high cost licensing</span> - that's exactly why it's the perfect foundation for automation. While competitors charge thousands for enterprise software, we turn your existing free Google tools into a powerful AI-driven business platform.</p>
            
            <p>Imagine Gmail automatically sorting and responding to customer inquiries, Google Sheets updating themselves with real-time data from multiple sources, and Google Docs generating reports that write themselves. All using tools you <span class="highlight">already have and pay nothing extra for</span>.</p>
        `
    },
    'QR Code Training & Automation': {
        icon: 'fas fa-qrcode',
        title: 'QR Code Training & Automation',
        content: `
            <p>Smart QR systems that don't just provide information - they <span class="highlight">trigger automated training workflows, track progress, and adapt content</span> based on user behavior.</p>
            
            <p><span class="highlight">This is the best way when training 100+ associate or conference and you want to quiz them or collect emails in your conference.</span> Instead of manual sign-ins and paper forms, one QR code scan instantly:</p>
            
            <p>• Registers the participant<br>
            • Delivers personalized training content<br>
            • Tracks completion rates<br>
            • Collects feedback automatically<br>
            • Generates completion certificates<br>
            • Builds your email database</p>
            
            <p>Perfect for <span class="highlight">conferences, employee onboarding, compliance training, and customer education</span> - all automated from a simple QR scan.</p>
        `
    },
    'Self-Generating Reports': {
        icon: 'fas fa-chart-bar',
        title: 'Self-Generating Reports',
        content: `
            <p>Reports that create themselves. Our AI agents <span class="highlight">continuously monitor your data, generate insights, and deliver comprehensive reports</span> without any manual input.</p>
            
            <p><span class="highlight">Instead of waiting for somebody to send you the report at certain date and time, we can automate sending those without waiting for somebody to perform the task.</span> Your reports arrive in your inbox before you even think to ask for them.</p>
            
            <p>Sales reports that analyze trends and predict next month's performance. Financial reports that highlight anomalies and suggest cost-saving opportunities. Marketing reports that identify your best-performing channels and recommend budget allocation.</p>
            
            <p>All generated automatically, delivered on schedule, and <span class="highlight">more insightful than manual reports</span> because AI never gets tired or misses patterns humans overlook.</p>
        `
    },
    'Complete Task Elimination': {
        icon: 'fas fa-magic-wand-sparkles',
        title: 'Complete Task Elimination',
        content: `
            <p>We don't just automate tasks - we <span class="highlight">eliminate them entirely</span>. Our intelligent agents handle entire workflows from start to finish, learning and improving continuously.</p>
            
            <p><span class="highlight">Why to put your most valuable assets to do tire and boring repetitive tasks</span> we can show you how to collect or extract information automatically.</p>
            
            <p>Customer service inquiries answered instantly. Data entry completed before you finish your coffee. Invoices processed and payments reconciled while you sleep. Inventory reordered automatically when stock runs low.</p>
            
            <p>This isn't about making tasks faster - it's about <span class="highlight">making them disappear completely</span> so your team can focus on what humans do best: thinking, creating, and building relationships.</p>
        `
    },
    'AI Transformation Strategy': {
        icon: 'fas fa-brain',
        title: 'AI Transformation Strategy',
        content: `
            <p>We identify <span class="highlight">every manual process in your business</span> and create autonomous AI agents to handle them, delivering unprecedented cost savings and efficiency.</p>
            
            <p><span class="highlight">Transform your business if you are willing to flip your mindset</span> making your company more profitable, let's work together.</p>
            
            <p>We audit your entire operation, map every manual touchpoint, and design AI agents that don't just replace human tasks - they <span class="highlight">improve them beyond human capability</span>. Faster processing, 24/7 availability, zero errors, and continuous learning.</p>
            
            <p>The companies thriving in 2025 aren't the ones with the most employees - they're the ones with the <span class="highlight">smartest automation</span>. Please implement with a crew of agents.</p>
        `
    },
    'Free Diagnosis': {
        icon: 'fas fa-stethoscope',
        title: 'Free Diagnosis',
        content: `
            <p>We provide a <span class="highlight">comprehensive analysis of your current workflows</span> at absolutely no cost. Our team examines every aspect of your business operations to identify automation opportunities.</p>
            
            <p><span class="highlight">Why do we do this for free?</span> Because we're confident that once you see the potential savings and efficiency gains, you'll want to move forward. We analyze your processes, identify bottlenecks, and calculate the exact cost and time savings automation will deliver.</p>
            
            <p>During our free diagnosis, we map out your current manual tasks, estimate the hours spent on repetitive work, and identify which processes can be completely automated with AI. You'll receive a detailed report showing:</p>
            
            <p>• Current time spent on manual tasks<br>
            • Potential cost savings<br>
            • Automation opportunities ranked by impact<br>
            • ROI projections<br>
            • Implementation timeline</p>
            
            <p><span class="highlight">No obligation, no pressure</span> - just valuable insights into how AI can transform your business operations.</p>
        `
    },
    'Free Solution Draft': {
        icon: 'fas fa-blueprint',
        title: 'Free Solution Draft',
        content: `
            <p>After our diagnosis, we create a <span class="highlight">complete automation blueprint</span> specifically tailored to your business - still completely free.</p>
            
            <p><span class="highlight">This isn't a generic template</span> - it's a detailed, custom plan that shows exactly how AI will integrate with your existing systems, which tools we'll use, and how the automated workflows will operate.</p>
            
            <p>Your free solution draft includes:</p>
            
            <p>• Detailed technical architecture<br>
            • Integration plan with your current systems<br>
            • Step-by-step implementation roadmap<br>
            • Accurate cost projections<br>
            • Timeline with milestones<br>
            • Expected ROI calculations<br>
            • Risk assessment and mitigation strategies</p>
            
            <p>We invest time in creating this comprehensive plan because we believe in our solution. When you see the detailed roadmap and projected results, you'll understand exactly what you're getting before making any commitment.</p>
            
            <p><span class="highlight">Your blueprint is yours to keep</span> - whether you choose to work with us or not.</p>
        `
    },
    'Entry-Level Implementation': {
        icon: 'fas fa-rocket-launch',
        title: 'Entry-Level Implementation',
        content: `
            <p>If you love our plan, we implement it at <span class="highlight">affordable entry-level pricing</span> designed to make AI automation accessible to businesses of all sizes.</p>
            
            <p><span class="highlight">Only pay if you approve our solution draft</span> and want to move forward. No upfront costs, no hidden fees - just transparent, fair pricing for implementing the exact plan we designed for you.</p>
            
            <p>Our entry-level implementation includes:</p>
            
            <p>• Complete system setup and configuration<br>
            • AI agent deployment and training<br>
            • Integration with your existing tools<br>
            • Team training and documentation<br>
            • 30-day support and optimization<br>
            • Performance monitoring and adjustments</p>
            
            <p><span class="highlight">Why entry-level pricing?</span> Because we'd rather work with 100 satisfied clients at reasonable rates than 10 clients at premium prices. Our model is built on volume and long-term relationships, not maximum extraction.</p>
            
            <p>Once you see the results, you'll understand why automation isn't an expense - it's an investment that <span class="highlight">pays for itself within the first month</span>.</p>
        `
    }
};

// Spanish service data with detailed descriptions
const serviceDetailsES = {
    'Integración AI + Automatización': {
        icon: 'fas fa-robot',
        title: 'Integración AI + Automatización',
        content: `
            <p>Más allá del despliegue básico de AI - creamos <span class="highlight">automatización inteligente que conecta ChatGPT, Claude, Groq, y DeepSeek</span> con tus sistemas existentes, eliminando completamente la intervención humana.</p>
            
            <p><span class="highlight">Cómo AI + Automatización es la solución perfecta para cada negocio en todas las industrias:</span> Nuestro enfoque de orquestación multi-AI asegura que nunca quedes atrapado con un solo proveedor. Cuando ChatGPT falla, Claude toma el control. Cuando necesitas velocidad, Groq procesa tus solicitudes. Esta redundancia y especialización significa <span class="highlight">99.9% de tiempo activo y rendimiento óptimo</span> para cada tarea.</p>
            
            <p>Ya sea que estés en <span class="highlight">bienes raíces</span> - en lugar de responder correos aburridos y repetitivos, las automatizaciones pueden hacerlo por ti y tú solo te enfocas en presentaciones y aplicaciones. O si eres un <span class="highlight">profesional de la salud</span> automatizando registros de pacientes, comercio optimizando inventario, o finanzas procesando transacciones - nuestros agentes AI trabajan 24/7 en <span class="highlight">todas las industrias</span> porque se adaptan a tu lógica de negocio específica, no al revés.</p>
        `
    },
    'Automatización Google Workspace': {
        icon: 'fab fa-google',
        title: 'Automatización Google Workspace',
        content: `
            <p>Transformamos Google Workspace de una herramienta a un <span class="highlight">ecosistema inteligente</span>. Flujos de trabajo automatizados, procesamiento inteligente de documentos, y gestión de datos sin intervención.</p>
            
            <p><span class="highlight">Workspace es gratuito y no requiere licencias de alto costo</span> - exactamente por eso es la base perfecta para automatización. Mientras competidores cobran miles por software empresarial, convertimos tus herramientas gratuitas de Google existentes en una plataforma empresarial potenciada por AI.</p>
            
            <p>Imagina Gmail ordenando y respondiendo automáticamente consultas de clientes, Google Sheets actualizándose con datos en tiempo real de múltiples fuentes, y Google Docs generando reportes que se escriben solos. Todo usando herramientas que <span class="highlight">ya tienes y no pagas nada extra</span>.</p>
        `
    },
    'Códigos QR y Automatización de Entrenamiento': {
        icon: 'fas fa-qrcode',
        title: 'Códigos QR y Automatización de Entrenamiento',
        content: `
            <p>Sistemas QR inteligentes que no solo proporcionan información - <span class="highlight">activan flujos de trabajo de entrenamiento automatizados, rastrean progreso, y adaptan contenido</span> basado en comportamiento del usuario.</p>
            
            <p><span class="highlight">Esta es la mejor manera cuando entrenas 100+ asociados o en conferencias y quieres evaluarlos o recolectar correos en tu conferencia.</span> En lugar de registros manuales y formularios de papel, un escaneo de código QR instantáneamente:</p>
            
            <p>• Registra al participante<br>
            • Entrega contenido de entrenamiento personalizado<br>
            • Rastrea tasas de finalización<br>
            • Recolecta retroalimentación automáticamente<br>
            • Genera certificados de finalización<br>
            • Construye tu base de datos de correos</p>
        `
    },
    'Reportes Auto-Generados': {
        icon: 'fas fa-chart-bar',
        title: 'Reportes Auto-Generados',
        content: `
            <p>Reportes que se crean a sí mismos. Nuestros agentes AI <span class="highlight">monitorean continuamente tus datos, generan insights, y entregan reportes comprensivos</span> sin ninguna entrada manual.</p>
            
            <p><span class="highlight">Por qué poner tus activos más valiosos a hacer tareas aburridas y repetitivas</span> - podemos mostrarte cómo recolectar o extraer información automáticamente.</p>
            
            <p>Consultas de servicio al cliente respondidas instantáneamente. Entrada de datos completada antes de que termines tu café. Facturas procesadas y pagos reconciliados mientras duermes. Inventario reordenado automáticamente cuando el stock baja.</p>
            
            <p>Esto no se trata de hacer tareas más rápidas - se trata de <span class="highlight">hacerlas desaparecer completamente</span> para que tu equipo pueda enfocarse en lo que los humanos hacen mejor: pensar, crear, y construir relaciones.</p>
        `
    },
    'Eliminación Completa de Tareas': {
        icon: 'fas fa-magic-wand-sparkles',
        title: 'Eliminación Completa de Tareas',
        content: `
            <p>No solo automatizamos tareas - las eliminamos. Nuestros <span class="highlight">agentes inteligentes manejan flujos de trabajo completos</span> de principio a fin, aprendiendo y mejorando continuamente.</p>
            
            <p><span class="highlight">Por qué poner tus activos más valiosos a hacer tareas aburridas y repetitivas</span> - podemos mostrarte cómo recolectar o extraer información automáticamente.</p>
            
            <p>Consultas de servicio al cliente respondidas instantáneamente. Entrada de datos completada antes de que termines tu café. Facturas procesadas y pagos reconciliados mientras duermes. Inventario reordenado automáticamente cuando el stock baja.</p>
            
            <p>Esto no se trata de hacer tareas más rápidas - se trata de <span class="highlight">hacerlas desaparecer completamente</span> para que tu equipo pueda enfocarse en lo que los humanos hacen mejor: pensar, crear, y construir relaciones.</p>
        `
    },
    'Estrategia de Transformación AI': {
        icon: 'fas fa-brain',
        title: 'Estrategia de Transformación AI',
        content: `
            <p>Identificamos <span class="highlight">cada proceso manual en tu negocio</span> y creamos agentes AI autónomos para manejarlos, entregando ahorros de costos y eficiencia sin precedentes.</p>
            
            <p><span class="highlight">Transforma tu negocio si estás dispuesto a cambiar tu mentalidad</span> haciendo tu empresa más rentable, trabajemos juntos.</p>
            
            <p>Auditamos toda tu operación, mapeamos cada punto de contacto manual, y diseñamos agentes AI que no solo reemplazan tareas humanas - las <span class="highlight">mejoran más allá de la capacidad humana</span>. Procesamiento más rápido, disponibilidad 24/7, cero errores, y aprendizaje continuo.</p>
            
            <p>Las empresas que prosperan en 2025 no son las que tienen más empleados - son las que tienen la <span class="highlight">automatización más inteligente</span>. Por favor implementa con un equipo de agentes.</p>
        `
    }
};

// Function to get current service details based on language
function getCurrentServiceDetails() {
    return currentLang === 'es' ? serviceDetailsES : serviceDetails;
}

// Default popup message translations
const defaultPopupMessages = {
    en: 'Service details are being updated. Please contact us for more information.',
    es: 'Los detalles del servicio se están actualizando. Por favor contáctanos para más información.'
};

// Tooltip-Style Popup System
function showServicePopup(title, content, icon = 'fas fa-robot', clickedCard) {
    const popup = document.getElementById('servicePopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');
    const popupIcon = document.getElementById('popupIcon');
    
    if (popup && popupTitle && popupContent && popupIcon && clickedCard) {
        popupTitle.textContent = title;
        popupContent.innerHTML = content;
        popupIcon.className = icon + ' popup-service-icon';
        
        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile: Position popup to follow user's current view
            const cardRect = clickedCard.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            
            // Check if the clicked card is currently visible in viewport
            const cardInView = cardRect.top >= 0 && cardRect.top < viewportHeight;
            
            let popupTop;
            if (cardInView) {
                // Card is visible: position popup just below the card
                popupTop = scrollTop + cardRect.bottom + 20;
            } else {
                // Card is not visible: position popup in center of current viewport
                popupTop = scrollTop + (viewportHeight * 0.3);
            }
            
            popup.style.cssText = `display: block; position: absolute; left: 50%; top: ${popupTop}px; transform: translateX(-50%); z-index: 1000; width: 95vw; max-width: 400px;`;
            
            // Smooth scroll to popup if it's positioned below viewport
            setTimeout(() => {
                const popupRect = popup.getBoundingClientRect();
                if (popupRect.top > viewportHeight || popupRect.bottom < 0) {
                    popup.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        } else {
            // Desktop: Position relative to clicked card
            const cardRect = clickedCard.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            // Position popup to the right of the card with some spacing
            const popupLeft = cardRect.right + scrollLeft + 20;
            const popupTop = cardRect.top + scrollTop;
            
            // Ensure popup stays within viewport
            const popupWidth = 500; // Updated to match new CSS width
            const viewportWidth = window.innerWidth;
            const finalLeft = Math.min(popupLeft, viewportWidth - popupWidth - 20);
            
            // Show popup with calculated position
            popup.style.cssText = `display: block; position: absolute; left: ${finalLeft}px; top: ${popupTop}px; z-index: 1000;`;
        }
        
        // Add click outside to close
        setTimeout(() => {
            document.addEventListener('click', hidePopupOnClickOutside, true);
        }, 100);
    }
}

let hidePopupOnClickOutside = function(e) {
    const popup = document.getElementById('servicePopup');
    const popupContent = popup?.querySelector('.premium-popup-content');
    
    if (popup && popupContent && !popupContent.contains(e.target)) {
        hideServicePopup();
    }
};

function hideServicePopup() {
    const popup = document.getElementById('servicePopup');
    if (popup) {
        popup.style.display = 'none';
        document.removeEventListener('click', hidePopupOnClickOutside, true);
    }
}

// Simple Success Popup Function (similar to service cards)
function showSuccessPopup() {
    // Create popup element if it doesn't exist
    let successPopup = document.getElementById('successPopup');
    if (!successPopup) {
        successPopup = document.createElement('div');
        successPopup.id = 'successPopup';
        successPopup.innerHTML = `
            <div class="premium-popup-content">
                <div class="popup-header">
                    <div class="popup-icon-container">
                        <i class="fas fa-check-circle popup-service-icon" style="color: #10b981;"></i>
                    </div>
                    <h2 class="popup-title">You Got Lucky!</h2>
                    <button class="popup-close-btn" onclick="hideSuccessPopup()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="popup-content-wrapper">
                    <div class="popup-content-text">
                        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">Our best specialist will contact you shortly.</p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #3b82f6;"><strong>Stay tuned to flip how you work!</strong></p>
                    </div>
                </div>
                
                <div class="popup-cta-section">
                    <div class="popup-value-prop">
                        <i class="fas fa-rocket"></i>
                        <span>We'll be in touch within 24 hours</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(successPopup);
    }

    // Position popup in center of screen
    successPopup.style.cssText = `
        display: block; 
        position: fixed; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
        z-index: 10000;
    `;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideSuccessPopup();
    }, 5000);

    // Add click outside to close
    setTimeout(() => {
        document.addEventListener('click', hideSuccessPopupOnClickOutside, true);
    }, 100);
}

function hideSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.style.display = 'none';
        document.removeEventListener('click', hideSuccessPopupOnClickOutside, true);
    }
}

let hideSuccessPopupOnClickOutside = function(e) {
    const popup = document.getElementById('successPopup');
    const popupContent = popup?.querySelector('.premium-popup-content');
    
    if (popup && popupContent && !popupContent.contains(e.target)) {
        hideSuccessPopup();
    }
};

// Simple click handlers for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Play special professional service card sound
            initAudio();
            if (audioEnabled) audioContext.playServiceCardSound();
            
            // Get service title (current displayed text in current language)
            const title = this.querySelector('h3').textContent.trim();
            
            // Use language-aware service details
            const currentServiceDetails = getCurrentServiceDetails();
            const serviceData = currentServiceDetails[title];
            
            if (serviceData) {
                showServicePopup(serviceData.title, serviceData.content, serviceData.icon, this);
            } else {
                // Use translated default message
                const defaultMessage = defaultPopupMessages[currentLang] || defaultPopupMessages.en;
                showServicePopup(title, `<p>${defaultMessage}</p>`, 'fas fa-cog', this);
            }
        });
        
        card.style.cursor = 'pointer';
    });
    
    // Setup popup close handlers
    const popupClose = document.getElementById('popupClose');
    const servicePopup = document.getElementById('servicePopup');
    
    if (popupClose) {
        popupClose.addEventListener('click', hideServicePopup);
    }
    
    if (servicePopup) {
        servicePopup.addEventListener('click', function(e) {
            if (e.target === this) {
                hideServicePopup();
            }
        });
    }
    
    // ESC key to close popups
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideServicePopup();
            hideSuccessPopup();
        }
    });
    
    console.log('✅ Service card handlers setup complete');
});

console.log('✅ Simple popup system ready');


console.log('💡 Click any service card to test the popup system');

// Language Translation System
const translations = {
    en: {
        // Navigation
        'services': 'Services',
        'features': 'Features', 
        'contact': 'Contact',
        
        // Hero Section
        'hero-title': 'Free AI Automation Diagnosis',
        'hero-subtitle': 'We analyze your workflow and deliver a complete automation blueprint—at zero cost. No consultations, no meetings. Pure value.',
        'hero-cta': 'Get FREE Diagnosis & Draft',
        
        // Welcome Messages
        'welcome-title': 'Welcome to JufipAI',
        'welcome-subtitle': 'Where AI + automation makes working a good place to be!',
        'customer-welcome-title': 'Thanks for contacting JufipAI',
        'customer-welcome-subtitle': 'Your automation journey begins now',
        'customer-welcome-details': 'One of our specialized team members is already contacting you shortly.<br><strong>Get ready to flip how you work forever!</strong>',
        
        // Contact Form
        'contact-title': 'Ready to Automate Everything?',
        'form-name': 'Full Name',
        'form-email': 'Email Address',
        'form-company': 'Company Name',
        'form-description': 'Project Description',
        'form-submit': 'Get FREE Diagnosis & Draft',
        
        // Footer
        'copyright': 'Copyright © 2014-2025, JufipAI.com or its affiliates. All rights reserved.',
        
        // Section Headers
        'services-title': 'Our AI-Powered Services',
        'process-title': 'Our Risk-Free Process',
        'features-title': 'Why JufipAI Delivers Real ROI',
        'features-cta': 'Start Now',
        
        // Service Cards
        'service1-title': 'AI + Automation Integration',
        'service1-desc': 'Beyond basic AI deployment - we create intelligent automation that connects ChatGPT, Claude, Groq, and DeepSeek with your existing systems, eliminating human intervention entirely.',
        'service2-title': 'Google Workspace Automation',
        'service2-desc': 'Transform Google Workspace from a tool into an intelligent ecosystem. Automated workflows, smart document processing, and zero-touch data management.',
        'service3-title': 'QR Code Training & Automation',
        'service3-desc': 'Smart QR systems that don\'t just provide information - they trigger automated training workflows, track progress, and adapt content based on user behavior.',
        'service4-title': 'Self-Generating Reports',
        'service4-desc': 'Reports that create themselves. Our AI agents continuously monitor your data, generate insights, and deliver comprehensive reports without any manual input.',
        'service5-title': 'Complete Task Elimination',
        'service5-desc': 'We don\'t just automate tasks - we eliminate them. Our intelligent agents handle entire workflows from start to finish, learning and improving continuously.',
        'service6-title': 'AI Transformation Strategy',
        'service6-desc': 'We identify every manual process in your business and create autonomous AI agents to handle them, delivering unprecedented cost savings and efficiency.',
        
        // Process Steps
        'process1-title': 'Free Diagnosis',
        'process1-desc': 'We analyze your current workflows and identify automation opportunities',
        'process2-title': 'Free Solution Draft',
        'process2-desc': 'Complete automation blueprint with AI integration plan and cost projections',
        'process3-title': 'Entry-Level Implementation',
        'process3-desc': 'If you love our plan, we implement it at affordable entry-level pricing',
        'badge-free': '100% FREE',
        'badge-approve': 'ONLY IF YOU APPROVE',
        
        // Features List
        'feature1': 'Reduce operational costs by 90%',
        'feature2': 'Floating AI agents work 24/7',
        'feature3': 'Zero manual data entry required',
        'feature4': 'Exponentially scalable automation',
        'feature5': 'Implementation in days, not months',
        'feature6': 'Enterprise-grade security included',
        'feature7': 'Multi-AI model orchestration (GPT, Claude, Groq)',
        'feature8': 'QR code training systems for instant learning',
        'feature9': 'Automated report generation and distribution',
        'feature10': 'Deep Google Workspace integration',
        'feature11': 'Real-time data synchronization across platforms',
        'feature12': 'Smart workflow automation that learns and adapts'
    },
    es: {
        // Navigation  
        'services': 'Servicios',
        'features': 'Características',
        'contact': 'Contacto',
        
        // Hero Section
        'hero-title': 'Diagnóstico Gratuito de Automatización AI',
        'hero-subtitle': 'Analizamos tu flujo de trabajo y entregamos un plan completo de automatización—sin costo. Sin consultas, sin reuniones. Valor puro.',
        'hero-cta': 'Obtener Diagnóstico GRATIS',
        
        // Welcome Messages
        'welcome-title': 'Bienvenido a JufipAI',
        'welcome-subtitle': '¡Donde AI + automatización hace que trabajar sea un buen lugar para estar!',
        'customer-welcome-title': 'Gracias por contactar JufipAI',
        'customer-welcome-subtitle': 'Tu viaje de automatización comienza ahora',
        'customer-welcome-details': 'Uno de nuestros miembros especializados ya te está contactando pronto.<br><strong>¡Prepárate para cambiar tu forma de trabajar para siempre!</strong>',
        
        // Contact Form
        'contact-title': '¿Listo para Automatizar Todo?',
        'form-name': 'Nombre Completo',
        'form-email': 'Dirección de Email',
        'form-company': 'Nombre de la Empresa',
        'form-description': 'Descripción del Proyecto',
        'form-submit': 'Obtener Diagnóstico GRATIS',
        
        // Footer
        'copyright': 'Copyright © 2014-2025, JufipAI.com o sus afiliados. Todos los derechos reservados.',
        
        // Section Headers
        'services-title': 'Nuestros Servicios Potenciados por AI',
        'process-title': 'Nuestro Proceso Sin Riesgo',
        'features-title': 'Por qué JufipAI Entrega ROI Real',
        'features-cta': 'Comenzar Ahora',
        
        // Service Cards
        'service1-title': 'Integración AI + Automatización',
        'service1-desc': 'Más allá del despliegue básico de AI - creamos automatización inteligente que conecta ChatGPT, Claude, Groq, y DeepSeek con tus sistemas existentes, eliminando completamente la intervención humana.',
        'service2-title': 'Automatización Google Workspace',
        'service2-desc': 'Transformamos Google Workspace de una herramienta a un ecosistema inteligente. Flujos de trabajo automatizados, procesamiento inteligente de documentos, y gestión de datos sin intervención.',
        'service3-title': 'Códigos QR y Automatización de Entrenamiento',
        'service3-desc': 'Sistemas QR inteligentes que no solo proporcionan información - activan flujos de trabajo de entrenamiento automatizados, rastrean progreso, y adaptan contenido basado en comportamiento del usuario.',
        'service4-title': 'Reportes Auto-Generados',
        'service4-desc': 'Reportes que se crean a sí mismos. Nuestros agentes AI monitorean continuamente tus datos, generan insights, y entregan reportes comprensivos sin ninguna entrada manual.',
        'service5-title': 'Eliminación Completa de Tareas',
        'service5-desc': 'No solo automatizamos tareas - las eliminamos. Nuestros agentes inteligentes manejan flujos de trabajo completos de principio a fin, aprendiendo y mejorando continuamente.',
        'service6-title': 'Estrategia de Transformación AI',
        'service6-desc': 'Identificamos cada proceso manual en tu negocio y creamos agentes AI autónomos para manejarlos, entregando ahorros de costos y eficiencia sin precedentes.',
        
        // Process Steps
        'process1-title': 'Diagnóstico Gratuito',
        'process1-desc': 'Analizamos tus flujos de trabajo actuales e identificamos oportunidades de automatización',
        'process2-title': 'Borrador de Solución Gratuito',
        'process2-desc': 'Plan completo de automatización con plan de integración AI y proyecciones de costos',
        'process3-title': 'Implementación Nivel de Entrada',
        'process3-desc': 'Si te encanta nuestro plan, lo implementamos con precios accesibles de nivel de entrada',
        'badge-free': '100% GRATIS',
        'badge-approve': 'SOLO SI APRUEBAS',
        
        // Features List
        'feature1': 'Reduce costos operacionales en un 90%',
        'feature2': 'Agentes AI flotantes trabajan 24/7',
        'feature3': 'Cero entrada de datos manual requerida',
        'feature4': 'Automatización exponencialmente escalable',
        'feature5': 'Implementación en días, no meses',
        'feature6': 'Seguridad de nivel empresarial incluida',
        'feature7': 'Orquestación multi-modelo AI (GPT, Claude, Groq)',
        'feature8': 'Sistemas de entrenamiento con códigos QR para aprendizaje instantáneo',
        'feature9': 'Generación y distribución automatizada de reportes',
        'feature10': 'Integración profunda con Google Workspace',
        'feature11': 'Sincronización de datos en tiempo real entre plataformas',
        'feature12': 'Automatización de flujos de trabajo inteligente que aprende y se adapta'
    }
};

// 🚨 ULTIMATE ENGLISH FAILSAFE - Set before anything else
let currentLang = 'en';

// Clear any problematic localStorage immediately
if (typeof Storage !== 'undefined') {
    localStorage.removeItem('preferred-language');
    localStorage.setItem('preferred-language', 'en');
    console.log('🇺🇸 EMERGENCY: Forced English preference in localStorage');
}

// 🔧 EMERGENCY RESET FUNCTION - For testing and debugging
function resetToEnglish() {
    console.log('🚨 EMERGENCY RESET: Forcing English');
    localStorage.removeItem('preferred-language');
    localStorage.setItem('preferred-language', 'en');
    location.reload();
}

// Make reset function globally accessible for console debugging
window.resetToEnglish = resetToEnglish;

function translatePage(lang) {
    currentLang = lang;
    console.log(`🌍 Translating to: ${lang}`);
    
    let translatedCount = 0;
    let failedCount = 0;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        
        if (translations[lang] && translations[lang][key]) {
            const translationText = translations[lang][key];
            
            // Enhanced translation application
            if (element.innerHTML.includes('<strong>') || element.innerHTML.includes('<br>')) {
                element.innerHTML = translationText;
            } else {
                element.textContent = translationText;
            }
            
            translatedCount++;
            console.log(`✅ Translated ${key}: "${translationText}"`);
        } else {
            failedCount++;
            console.warn(`❌ Missing translation for key: "${key}" in language: "${lang}"`);
        }
    });
    
    console.log(`📊 Translation Summary: ${translatedCount} successful, ${failedCount} failed`);
    
    // Deploy certified translation agents (failsafe)
    if (lang === 'es') {
        forceServiceCardTranslation();
    } else if (lang === 'en') {
        forceEnglishTranslation();
    }

    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Update navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        const enText = link.getAttribute('data-en');
        const esText = link.getAttribute('data-es');
        if (lang === 'es' && esText) {
            link.textContent = esText;
        } else if (lang === 'en' && enText) {
            link.textContent = enText;
        }
    });

    // Save preference
    localStorage.setItem('preferred-language', lang);
}

// 🚀 CERTIFIED ESP TRANSLATION AGENT - Failsafe Service Cards
function forceServiceCardTranslation() {
    console.log('🔧 Deploying certified ESP agents for service cards...');
    
    const serviceTranslations = {
        'service1-title': 'Integración AI + Automatización',
        'service1-desc': 'Más allá del despliegue básico de AI - creamos automatización inteligente que conecta ChatGPT, Claude, Groq, y DeepSeek con tus sistemas existentes, eliminando completamente la intervención humana.',
        'service2-title': 'Automatización Google Workspace',
        'service2-desc': 'Transformamos Google Workspace de una herramienta a un ecosistema inteligente. Flujos de trabajo automatizados, procesamiento inteligente de documentos, y gestión de datos sin intervención.',
        'service3-title': 'Códigos QR y Automatización de Entrenamiento',
        'service3-desc': 'Sistemas QR inteligentes que no solo proporcionan información - activan flujos de trabajo de entrenamiento automatizados, rastrean progreso, y adaptan contenido basado en comportamiento del usuario.',
        'service4-title': 'Reportes Auto-Generados',
        'service4-desc': 'Reportes que se crean a sí mismos. Nuestros agentes AI monitorean continuamente tus datos, generan insights, y entregan reportes comprensivos sin ninguna entrada manual.',
        'service5-title': 'Eliminación Completa de Tareas',
        'service5-desc': 'No solo automatizamos tareas - las eliminamos. Nuestros agentes inteligentes manejan flujos de trabajo completos de principio a fin, aprendiendo y mejorando continuamente.',
        'service6-title': 'Estrategia de Transformación AI',
        'service6-desc': 'Identificamos cada proceso manual en tu negocio y creamos agentes AI autónomos para manejarlos, entregando ahorros de costos y eficiencia sin precedentes.'
    };
    
    // Force translate all service cards with direct DOM manipulation
    document.querySelectorAll('.service-card').forEach((card, index) => {
        const titleKey = `service${index + 1}-title`;
        const descKey = `service${index + 1}-desc`;
        
        const titleElement = card.querySelector('h3');
        const descElement = card.querySelector('p');
        
        if (titleElement && serviceTranslations[titleKey]) {
            titleElement.textContent = serviceTranslations[titleKey];
            console.log(`🎯 ESP Agent deployed: ${titleKey}`);
        }
        
        if (descElement && serviceTranslations[descKey]) {
            descElement.textContent = serviceTranslations[descKey];
            console.log(`🎯 ESP Agent deployed: ${descKey}`);
        }
    });
    
    console.log('✅ All ESP translation agents deployed successfully!');
}

// 🔄 ENGLISH RESTORATION AGENT - Failsafe English Reset
function forceEnglishTranslation() {
    console.log('🇺🇸 Deploying English restoration agents...');
    
    const englishTranslations = {
        'service1-title': 'AI + Automation Integration',
        'service1-desc': 'Beyond basic AI deployment - we create intelligent automation that connects ChatGPT, Claude, Groq, and DeepSeek with your existing systems, eliminating human intervention entirely.',
        'service2-title': 'Google Workspace Automation',
        'service2-desc': 'Transform Google Workspace from a tool into an intelligent ecosystem. Automated workflows, smart document processing, and zero-touch data management.',
        'service3-title': 'QR Code Training & Automation',
        'service3-desc': 'Smart QR systems that don\'t just provide information - they trigger automated training workflows, track progress, and adapt content based on user behavior.',
        'service4-title': 'Self-Generating Reports',
        'service4-desc': 'Reports that create themselves. Our AI agents continuously monitor your data, generate insights, and deliver comprehensive reports without any manual input.',
        'service5-title': 'Complete Task Elimination',
        'service5-desc': 'We don\'t just automate tasks - we eliminate them. Our intelligent agents handle entire workflows from start to finish, learning and improving continuously.',
        'service6-title': 'AI Transformation Strategy',
        'service6-desc': 'We identify every manual process in your business and create autonomous AI agents to handle them, delivering unprecedented cost savings and efficiency.'
    };
    
    // Force translate all service cards back to English
    document.querySelectorAll('.service-card').forEach((card, index) => {
        const titleKey = `service${index + 1}-title`;
        const descKey = `service${index + 1}-desc`;
        
        const titleElement = card.querySelector('h3');
        const descElement = card.querySelector('p');
        
        if (titleElement && englishTranslations[titleKey]) {
            titleElement.textContent = englishTranslations[titleKey];
            console.log(`🎯 ENG Agent deployed: ${titleKey}`);
        }
        
        if (descElement && englishTranslations[descKey]) {
            descElement.textContent = englishTranslations[descKey];
            console.log(`🎯 ENG Agent deployed: ${descKey}`);
        }
    });
    
    console.log('✅ All English restoration agents deployed successfully!');
}

// Initialize language toggle
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitch = document.getElementById('languageSwitch');
    const languageOptions = languageSwitch.querySelectorAll('.language-option');
    
    console.log('🌍 Initializing language system...');
    
    // 🚨 ALWAYS START IN ENGLISH - NO EXCEPTIONS
    console.log('🚨 FORCE ENGLISH INITIALIZATION - Clearing any Spanish preferences');
    
    // Clear any existing language preference and force English
    localStorage.removeItem('preferred-language');
    localStorage.setItem('preferred-language', 'en');
    
    // Force English visual state
    languageSwitch.classList.remove('spanish');
    languageOptions[1].classList.remove('active');  // Remove Spanish active
    languageOptions[0].classList.add('active');     // Set English active
    
    // Force translate to English immediately
    console.log('🇺🇸 FORCING English (always default)');
    translatePage('en');
    currentLang = 'en';  // Explicitly set current language
    
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update visual state
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (lang === 'es') {
                languageSwitch.classList.add('spanish');
            } else {
                languageSwitch.classList.remove('spanish');
            }
            
            // Translate page
            translatePage(lang);
            
            // Play sound
            initAudio();
            if (audioEnabled) audioContext.playClickSound();
        });
    });

    // Add translations for articles section
    translations.en = {
        ...translations.en,
        'articles-title': 'AI Innovation Hub',
        'articles-subtitle': 'Discover the latest insights, case studies, and breakthroughs in AI automation'
    };

    translations.es = {
        ...translations.es,
        'articles-title': 'Centro de Innovación AI',
        'articles-subtitle': 'Descubre las últimas perspectivas, casos de estudio y avances en automatización AI'
    };
});

/* ============================================
   ARTICLES SECTION - INTERACTIVE FUNCTIONALITY
   ============================================ */

// Article Data Store
const articlesData = {
    1: {
        title: "The Future of Multi-AI Orchestration: How JufipAI Transforms Enterprise Workflows",
        category: "AI Innovation",
        categoryClass: "ai",
        readingTime: "8 min read",
        viewCount: "12.5K views",
        author: {
            name: "Dr. Alex Chen",
            role: "AI Architecture Lead",
            avatar: "fas fa-user-tie"
        },
        image: "fas fa-brain",
        content: `
            <h2>The Dawn of Multi-AI Orchestration</h2>
            <p>In the rapidly evolving landscape of artificial intelligence, we're witnessing a paradigm shift from single-AI solutions to sophisticated multi-AI orchestration platforms. At JufipAI, we've pioneered this revolutionary approach by seamlessly integrating ChatGPT, Claude, Groq, and DeepSeek into a unified automation ecosystem.</p>

            <h3>Beyond Traditional AI Implementation</h3>
            <p>Traditional AI deployments often suffer from limitations: isolated functionality, inconsistent performance, and the inability to handle complex, multi-step business processes. Our multi-AI orchestration platform breaks these barriers by:</p>

            <ul>
                <li><strong>Dynamic Load Balancing:</strong> Automatically routing tasks to the most suitable AI model based on complexity and requirements</li>
                <li><strong>Contextual Intelligence:</strong> Maintaining conversation context across different AI models for seamless user experiences</li>
                <li><strong>Failover Protection:</strong> Ensuring 99.9% uptime with automatic switching between AI providers</li>
                <li><strong>Performance Optimization:</strong> Continuously learning and adapting to improve response times and accuracy</li>
            </ul>

            <h3>Real-World Impact</h3>
            <p>Our enterprise clients have reported unprecedented results. Manufacturing giant TechCorp eliminated 95% of manual data entry across their supply chain, while financial services leader FinanceFirst reduced report generation time from days to minutes.</p>

            <blockquote>
                "JufipAI's multi-AI platform didn't just automate our processes—it transformed our entire business model. We're now operating at levels of efficiency we never thought possible."
                <cite>— Sarah Johnson, CTO of TechCorp</cite>
            </blockquote>

            <p>The future of work isn't just about using AI—it's about orchestrating multiple AI systems to create autonomous business processes that continuously improve and adapt. That future is here, and it's powered by JufipAI.</p>
        `
    },
    2: {
        title: "Google Workspace Revolution: From Manual to Autonomous",
        category: "Process Automation",
        categoryClass: "automation",
        readingTime: "5 min",
        viewCount: "8.2K",
        author: {
            name: "Sarah Martinez",
            role: "Automation Specialist",
            avatar: "fas fa-user-cog"
        },
        image: "fas fa-cogs",
        content: `
            <h2>Transforming Google Workspace into an Intelligent Ecosystem</h2>
            <p>Google Workspace has evolved far beyond its origins as a simple productivity suite. Today, it represents the foundation of modern business operations. However, most organizations barely scratch the surface of its automation potential.</p>

            <h3>Our Revolutionary Approach</h3>
            <p>JufipAI's Google Workspace automation goes beyond simple scripts and macros. We create intelligent agents that monitor Gmail, generate comprehensive reports, create dynamic documents, and manage complete workflows autonomously.</p>

            <h3>Case Study: Marketing Agency Transformation</h3>
            <p>Creative Solutions Inc., a 150-person marketing agency, approached us with a challenge: their team was spending 40% of their time on administrative tasks instead of creative work.</p>

            <p><strong>Results:</strong> 85% reduction in administrative time, 200% increase in billable hours, and 95% improvement in client satisfaction scores.</p>

            <p>Ready to transform your Google Workspace from a tool into an intelligent business partner? Contact us for your free automation audit.</p>
        `
    },
    3: {
        title: "Fortune 500 Transformation: 90% Cost Reduction in 30 Days",
        category: "Case Study",
        categoryClass: "case-study",
        readingTime: "12 min",
        viewCount: "15.7K",
        author: {
            name: "Michael Johnson",
            role: "Enterprise Solutions Director",
            avatar: "fas fa-user-chart"
        },
        image: "fas fa-chart-line",
        content: `
            <h2>The Challenge: Legacy Systems Holding Back Innovation</h2>
            <p>GlobalTech Industries, a Fortune 500 manufacturing company with 50,000+ employees, faced a critical challenge. Their legacy systems and manual processes were becoming a significant barrier to growth and innovation.</p>

            <h3>The Spectacular Results</h3>
            <p>The transformation exceeded all expectations:</p>

            <div class="results-grid">
                <div class="result-item">
                    <h4>Cost Reduction</h4>
                    <p><strong>$47.8 million annually</strong><br>90% reduction in operational costs</p>
                </div>
                <div class="result-item">
                    <h4>Time Savings</h4>
                    <p><strong>3.9 million hours annually</strong><br>Equivalent to 1,950 full-time employees</p>
                </div>
                <div class="result-item">
                    <h4>Accuracy Improvement</h4>
                    <p><strong>99.7% accuracy rate</strong><br>From 73% with manual processes</p>
                </div>
                <div class="result-item">
                    <h4>Customer Satisfaction</h4>
                    <p><strong>Response time: 3 minutes</strong><br>From 48 hours previously</p>
                </div>
            </div>

            <blockquote>
                "The transformation wasn't just about technology—it was about unleashing our people to do what they do best: think strategically, innovate, and create value."
                <cite>— Dr. Patricia Chen, Chief Human Resources Officer</cite>
            </blockquote>

            <p>Ready to begin your transformation? Contact JufipAI for your complimentary operational efficiency audit and discover your automation potential.</p>
        `
    },
    4: {
        title: "Smart QR Training Systems: The Learning Revolution",
        category: "Innovation",
        categoryClass: "innovation",
        readingTime: "7 min",
        viewCount: "6.8K",
        author: {
            name: "Dr. Lisa Chen",
            role: "Learning Systems Architect",
            avatar: "fas fa-user-graduate"
        },
        image: "fas fa-qrcode",
        content: `
            <h2>Revolutionizing Corporate Training with Intelligent QR Systems</h2>
            <p>Traditional corporate training is broken. Static materials, one-size-fits-all approaches, and minimal tracking have resulted in poor engagement and knowledge retention rates of just 34%. Our Smart QR Training Systems are changing everything.</p>

            <h3>Enter Smart QR Training Systems</h3>
            <p>Our revolutionary approach transforms any physical or digital environment into an intelligent learning ecosystem. Each QR code becomes a gateway to personalized, adaptive learning experiences powered by AI.</p>

            <h3>Case Study: Manufacturing Safety Training</h3>
            <p>Precision Manufacturing Corp faced a critical challenge: safety incident rates were increasing despite mandatory training programs.</p>

            <div class="results-grid">
                <div class="result-item">
                    <h4>Safety Incidents</h4>
                    <p><strong>87% reduction</strong><br>From 23 to 3 incidents per quarter</p>
                </div>
                <div class="result-item">
                    <h4>Training Completion</h4>
                    <p><strong>98% completion rate</strong><br>Up from 67% with traditional methods</p>
                </div>
                <div class="result-item">
                    <h4>Knowledge Retention</h4>
                    <p><strong>89% retention after 6 months</strong><br>Compared to 31% previously</p>
                </div>
                <div class="result-item">
                    <h4>Training Time</h4>
                    <p><strong>60% time reduction</strong><br>From hours to minutes per topic</p>
                </div>
            </div>

            <p>Ready to revolutionize your training programs? Contact us to schedule a demonstration and discover how Smart QR Training Systems can transform your organization's learning culture.</p>
        `
    },
    5: {
        title: "Behind the Scenes: AI Agent Architecture",
        category: "Technical Deep Dive",
        categoryClass: "tech-deep-dive",
        readingTime: "15 min",
        viewCount: "9.4K",
        author: {
            name: "David Park",
            role: "Principal AI Engineer",
            avatar: "fas fa-user-astronaut"
        },
        image: "fas fa-microchip",
        content: `
            <h2>The Architecture of Autonomous Intelligence</h2>
            <p>Behind every successful AI automation lies a sophisticated architecture that enables multiple AI agents to work together seamlessly. Today, we'll pull back the curtain on the technical foundations that power JufipAI's revolutionary automation platform.</p>

            <h3>Our Multi-Layer Architecture</h3>
            <p>JufipAI's platform employs a sophisticated multi-layer architecture designed for maximum flexibility and reliability.</p>

            <h3>Agent Communication Protocol</h3>
            <p>One of our most innovative achievements is the development of a proprietary communication protocol that enables AI agents to collaborate on complex tasks.</p>

            <h3>Performance Optimization Strategies</h3>
            <p>Achieving sub-second response times with complex AI workflows requires sophisticated optimization through predictive pre-computation and parallel processing pipelines.</p>

            <h3>Security & Privacy</h3>
            <p>Enterprise AI systems require military-grade security with end-to-end encryption, zero-knowledge processing, and secure enclaves for critical operations.</p>

            <p>The future of business automation lies not in replacing humans with AI, but in creating intelligent systems that amplify human capabilities while handling routine tasks autonomously. Our architecture makes this future possible today.</p>
        `
    },
    6: {
        title: "2025: The Year Human Work Becomes Optional",
        category: "Future Vision",
        categoryClass: "future-vision",
        readingTime: "10 min",
        viewCount: "11.2K",
        author: {
            name: "Emma Rodriguez",
            role: "Strategic Futurist",
            avatar: "fas fa-user-clock"
        },
        image: "fas fa-rocket",
        content: `
            <h2>A Paradigm Shift in Human-AI Collaboration</h2>
            <p>We stand at the threshold of the most significant transformation in the history of work. By 2025, advances in AI automation will make human involvement in most business processes optional rather than necessary. This isn't about replacing humans—it's about unleashing human potential for higher-value activities.</p>

            <h3>The 2025 Vision: Complete Process Autonomy</h3>
            <p>By 2025, we predict that 89% of all business processes will be capable of running autonomously, with human oversight becoming optional for all but the most strategic decisions.</p>

            <h3>The Competitive Advantage</h3>
            <p>Organizations that embrace this transformation early will gain unprecedented advantages:</p>

            <ul>
                <li><strong>Cost Leadership:</strong> 70-90% reduction in operational costs</li>
                <li><strong>Speed Advantage:</strong> 10x faster execution of business processes</li>
                <li><strong>Quality Excellence:</strong> Near-zero error rates in routine operations</li>
                <li><strong>Innovation Capacity:</strong> Human resources focused entirely on growth and innovation</li>
                <li><strong>Scalability:</strong> Ability to expand operations without proportional cost increases</li>
            </ul>

            <p>The organizations that will thrive in 2025 are taking action today. They're not waiting for perfect technology or complete certainty—they're building the foundation for autonomous operations while their competitors debate the possibilities.</p>

            <p>Ready to begin your journey toward operational autonomy? Contact JufipAI today for your complimentary 2025 readiness assessment.</p>
        `
    }
};

// ========================================
// ADVANCED ARTICLES SYSTEM - JUFIPAI
// ========================================

// Articles Modal Functionality & Enhanced Features
let currentArticleModal = null;
let articleSearchResults = [];
let bookmarkedArticles = JSON.parse(localStorage.getItem('jufipai_bookmarks') || '[]');
let totalArticleViews = parseInt(localStorage.getItem('jufipai_total_views') || '0');

// Article Performance Metrics
const articleMetrics = {
    modalOpenTime: 0,
    scrollDepth: 0,
    readingTime: 0,
    socialShares: parseInt(localStorage.getItem('jufipai_social_shares') || '0')
};

// Initialize Articles Section with Enhanced Features
document.addEventListener('DOMContentLoaded', function() {
    initializeArticlesSection();
    initializeArticleSearch();
    initializeBookmarkSystem();
    updateViewCounters();
});

function initializeArticlesSection() {
    console.log('🚀 Initializing Advanced Articles System...');

    // Add click handlers to all article cards and featured article
    const articleElements = document.querySelectorAll('[data-article]');

    articleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            openArticleModal(articleId);

            // Track article click analytics
            trackArticleInteraction('open', articleId);
        });

        // Add spectacular hover effects for particles and 3D animations
        addAdvancedArticleEffects(element);

        // Add touch optimization for mobile
        addTouchOptimizations(element);
    });

    // Initialize modal functionality with advanced features
    initializeAdvancedArticleModal();

    // Initialize load more functionality with pagination
    initializeAdvancedLoadMore();

    // Initialize floating elements with mouse parallax
    initializeAdvancedFloatingElements();

    // Add advanced scroll animations using Intersection Observer
    initializeAdvancedScrollAnimations();

    // Initialize search and filter functionality
    initializeArticleSearchAndFilter();

    // Initialize social sharing system
    initializeSocialShareSystem();

    // Initialize performance monitoring
    initializePerformanceMonitoring();

    console.log('✨ Advanced Articles System initialized successfully!');
}

// ========================================
// ADVANCED VISUAL EFFECTS & ANIMATIONS
// ========================================

function addAdvancedArticleEffects(element) {
    const cardParticles = element.querySelector('.card-particles, .featured-particles');

    // Enhanced 3D hover effects with smooth transitions
    element.addEventListener('mouseenter', function(e) {
        if (cardParticles) {
            createSpectacularParticles(cardParticles);
        }
        addCard3DEffect(element, e);
        initAudio();
        if (audioEnabled) audioContext.playHoverSound();
    });

    element.addEventListener('mouseleave', function() {
        if (cardParticles) {
            removeSpectacularParticles(cardParticles);
        }
        removeCard3DEffect(element);
    });

    element.addEventListener('mousemove', function(e) {
        updateCard3DEffect(element, e);
    });

    // Add card flip animation on click preparation
    element.addEventListener('mousedown', function() {
        element.style.transform = 'scale(0.98) rotateY(2deg)';
    });

    element.addEventListener('mouseup', function() {
        element.style.transform = '';
    });
}

function addCard3DEffect(element, e) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    element.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
    element.style.transformOrigin = 'center center';
    element.style.boxShadow = `
        0 20px 40px -20px rgba(59, 130, 246, 0.3),
        0 0 0 1px rgba(59, 130, 246, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `;
}

function updateCard3DEffect(element, e) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = (e.clientY - centerY) / rect.height * -10;
    const rotateY = (e.clientX - centerX) / rect.width * 10;

    element.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
        translateZ(20px)
    `;
}

function removeCard3DEffect(element) {
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
    element.style.boxShadow = '';

    setTimeout(() => {
        element.style.transition = '';
        element.style.transform = '';
        element.style.transformOrigin = '';
    }, 300);
}

function createSpectacularParticles(container) {
    // Create burst effect with multiple particle types
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.classList.add('spectacular-particle');

        const size = Math.random() * 6 + 2;
        const delay = i * 0.05;
        const duration = 2 + Math.random() * 2;
        const distance = 50 + Math.random() * 30;
        const angle = (i / 12) * 360;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg,
                rgba(59, 130, 246, 0.9),
                rgba(147, 197, 253, 0.7),
                rgba(14, 165, 233, 0.8)
            );
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            box-shadow:
                0 0 ${size * 2}px rgba(59, 130, 246, 0.6),
                0 0 ${size * 4}px rgba(59, 130, 246, 0.3);
            animation: spectacularParticleFloat ${duration}s ease-out forwards;
            animation-delay: ${delay}s;
            --angle: ${angle}deg;
            --distance: ${distance}px;
        `;

        container.appendChild(particle);
    }

    // Add central burst effect
    const burstEffect = document.createElement('div');
    burstEffect.classList.add('particle-burst');
    burstEffect.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: radial-gradient(circle,
            rgba(59, 130, 246, 1) 0%,
            rgba(59, 130, 246, 0) 70%
        );
        animation: burstExpand 1.5s ease-out forwards;
        pointer-events: none;
    `;

    container.appendChild(burstEffect);
}

function removeSpectacularParticles(container) {
    const particles = container.querySelectorAll('.spectacular-particle, .particle-burst');
    particles.forEach(particle => {
        particle.style.animation = 'spectacularParticleFloat 0.3s ease-out reverse forwards';
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 300);
    });
}

function addTouchOptimizations(element) {
    let touchStartTime = 0;
    let touchMoved = false;

    element.addEventListener('touchstart', function(e) {
        touchStartTime = Date.now();
        touchMoved = false;
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease-out';
    }, { passive: true });

    element.addEventListener('touchmove', function() {
        touchMoved = true;
        element.style.transform = '';
    }, { passive: true });

    element.addEventListener('touchend', function(e) {
        element.style.transform = '';

        if (!touchMoved && Date.now() - touchStartTime < 300) {
            // Fast tap - trigger click
            const articleId = this.getAttribute('data-article');
            if (articleId) {
                e.preventDefault();
                openArticleModal(articleId);
                trackArticleInteraction('open', articleId);
            }
        }
    }, { passive: false });
}

function createHoverParticles(container) {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hover-particle');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--article-accent-blue);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: hoverParticleFloat 2s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        container.appendChild(particle);
    }
}

function removeHoverParticles(container) {
    const hoverParticles = container.querySelectorAll('.hover-particle');
    hoverParticles.forEach(particle => {
        particle.style.animation = 'hoverParticleFloat 0.5s ease-out reverse forwards';
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 500);
    });
}

function initializeArticleModal() {
    const modal = document.getElementById('articleModal');
    const closeBtn = document.getElementById('modalClose');
    const backdrop = modal.querySelector('.modal-backdrop');

    // Close modal handlers
    closeBtn.addEventListener('click', closeArticleModal);
    backdrop.addEventListener('click', closeArticleModal);

    // ESC key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentArticleModal) {
            closeArticleModal();
        }
    });

    // Initialize share buttons
    initializeShareButtons();

    // Initialize reading progress
    initializeReadingProgress();
}

function openArticleModal(articleId) {
    const articleData = articlesData[articleId];
    if (!articleData) return;

    const modal = document.getElementById('articleModal');
    currentArticleModal = articleId;

    // Populate modal content
    populateModalContent(articleData);

    // Show modal with animation
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Generate related articles
    generateRelatedArticles(articleId);

    // Reset reading progress
    resetReadingProgress();

    // Add particles to hero image
    addModalParticles();
}

function closeArticleModal() {
    const modal = document.getElementById('articleModal');

    modal.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
        modal.style.display = 'none';
        currentArticleModal = null;
    }, 300);
}

function populateModalContent(articleData) {
    // Update hero image
    const heroImage = document.getElementById('modalHeroImage');
    heroImage.innerHTML = `<i class="${articleData.image}"></i>`;

    // Update meta information
    const modalMeta = document.getElementById('modalMeta');
    modalMeta.innerHTML = `
        <span class="article-category ${articleData.categoryClass}">${articleData.category}</span>
        <div class="article-stats">
            <span class="reading-time"><i class="fas fa-clock"></i> ${articleData.readingTime}</span>
            <span class="view-count"><i class="fas fa-eye"></i> ${articleData.viewCount}</span>
        </div>
    `;

    // Update title
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = articleData.title;

    // Update author
    const modalAuthor = document.getElementById('modalAuthor');
    modalAuthor.innerHTML = `
        <div class="author-avatar">
            <i class="${articleData.author.avatar}"></i>
        </div>
        <div class="author-info">
            <span class="author-name">${articleData.author.name}</span>
            <span class="author-role">${articleData.author.role}</span>
        </div>
    `;

    // Update article content
    const modalContent = document.getElementById('modalArticleContent');
    modalContent.innerHTML = articleData.content;

    // Add CSS animation classes
    setTimeout(() => {
        addContentAnimations();
    }, 300);
}

function addContentAnimations() {
    const contentElements = document.querySelectorAll('#modalArticleContent h2, #modalArticleContent h3, #modalArticleContent p, #modalArticleContent ul, #modalArticleContent blockquote');

    contentElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
}

function addModalParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;

    // Clear existing particles
    heroParticles.innerHTML = '';

    // Create animated particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            background: var(--article-accent-blue);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.3 + Math.random() * 0.7};
            animation: modalParticleFloat ${4 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        heroParticles.appendChild(particle);
    }
}

function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('twitter') ? 'twitter' :
                           this.classList.contains('linkedin') ? 'linkedin' :
                           this.classList.contains('facebook') ? 'facebook' : 'copy';

            shareArticle(platform);
        });
    });
}

function shareArticle(platform) {
    if (!currentArticleModal) return;

    const articleData = articlesData[currentArticleModal];
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(articleData.title);
    const text = encodeURIComponent(`Check out this article: ${articleData.title}`);

    let shareUrl;

    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'copy':
            copyToClipboard(window.location.href);
            showCopySuccess();
            return;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Article URL copied to clipboard');
    });
}

function showCopySuccess() {
    const copyBtn = document.querySelector('.share-btn.copy-link');
    const originalIcon = copyBtn.innerHTML;

    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyBtn.style.background = 'var(--article-accent-emerald)';

    setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
        copyBtn.style.background = 'var(--article-accent-blue)';
    }, 2000);
}

function initializeReadingProgress() {
    const modalContent = document.querySelector('.modal-content');
    const progressBar = document.getElementById('progressBar');

    if (!modalContent || !progressBar) return;

    modalContent.addEventListener('scroll', function() {
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight - this.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = Math.min(progress, 100) + '%';
    });
}

function resetReadingProgress() {
    const progressBar = document.getElementById('progressBar');
    const modalContent = document.querySelector('.modal-content');

    if (progressBar) progressBar.style.width = '0%';
    if (modalContent) modalContent.scrollTop = 0;
}

function generateRelatedArticles(currentArticleId) {
    const relatedGrid = document.getElementById('relatedArticles');
    if (!relatedGrid) return;

    // Get 3 random related articles (excluding current)
    const allArticleIds = Object.keys(articlesData).filter(id => id !== currentArticleId);
    const relatedIds = allArticleIds.sort(() => 0.5 - Math.random()).slice(0, 3);

    relatedGrid.innerHTML = relatedIds.map(id => {
        const article = articlesData[id];
        return `
            <div class="related-article-card" data-article="${id}">
                <div class="related-image">
                    <i class="${article.image}"></i>
                </div>
                <div class="related-content">
                    <span class="article-category ${article.categoryClass}">${article.category}</span>
                    <h4>${article.title}</h4>
                    <div class="related-author">
                        <span>${article.author.name}</span>
                        <span>${article.readingTime}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers to related articles
    relatedGrid.querySelectorAll('.related-article-card').forEach(card => {
        card.addEventListener('click', function() {
            const articleId = this.getAttribute('data-article');
            openArticleModal(articleId);
        });
    });
}

function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more articles
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        setTimeout(() => {
            this.innerHTML = '<span>Discover More Insights</span><i class="fas fa-plus"></i>';
            showLoadMoreMessage();
        }, 1500);
    });
}

function showLoadMoreMessage() {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--article-bg-primary);
        color: var(--text-primary);
        padding: 1rem 2rem;
        border-radius: 12px;
        border: 1px solid var(--article-accent-blue);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;
    notification.textContent = "More articles coming soon! Subscribe for updates.";

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initializeFloatingElements() {
    // Create intersection observer for floating elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    // Observe floating chips
    document.querySelectorAll('.floating-chip').forEach(chip => {
        observer.observe(chip);
    });
}

function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });

    // Observe article cards
    document.querySelectorAll('.article-card, .featured-article').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Add CSS animations dynamically
const articlesAnimationStyles = document.createElement('style');
articlesAnimationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    @keyframes hoverParticleFloat {
        0% { opacity: 0; transform: translateY(0) scale(0); }
        50% { opacity: 1; transform: translateY(-20px) scale(1); }
        100% { opacity: 0; transform: translateY(-40px) scale(0); }
    }

    @keyframes modalParticleFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
    }

    .related-article-card {
        background: var(--article-bg-secondary);
        border-radius: 16px;
        padding: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid rgba(59, 130, 246, 0.1);
    }

    .related-article-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        border-color: var(--article-accent-blue);
    }

    .related-image {
        width: 100%;
        height: 80px;
        background: linear-gradient(135deg, var(--article-accent-blue), var(--article-accent-purple));
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
        margin-bottom: 1rem;
    }

    .related-content h4 {
        color: var(--text-primary);
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0.5rem 0;
        line-height: 1.3;
    }

    .related-author {
        display: flex;
        justify-content: space-between;
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-top: 1rem;
    }

    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
    }

    .result-item {
        background: var(--article-bg-secondary);
        padding: 2rem;
        border-radius: 16px;
        text-align: center;
        border: 1px solid var(--article-accent-blue);
    }

    .result-item h4 {
        color: var(--article-accent-blue);
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }

    .result-item p {
        color: var(--text-primary);
        font-weight: 600;
    }

    blockquote {
        background: var(--article-bg-secondary);
        border-left: 4px solid var(--article-accent-blue);
        padding: 2rem;
        margin: 2rem 0;
        border-radius: 0 16px 16px 0;
        font-style: italic;
        color: var(--text-secondary);
    }

    blockquote cite {
        display: block;
        margin-top: 1rem;
        font-weight: 600;
        color: var(--article-accent-blue);
        font-style: normal;
    }

    #modalArticleContent ul, #modalArticleContent ol {
        margin: 1rem 0;
        padding-left: 2rem;
    }

    #modalArticleContent li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }

    #modalArticleContent li strong {
        color: var(--article-accent-blue);
    }
`;

document.head.appendChild(articlesAnimationStyles);
