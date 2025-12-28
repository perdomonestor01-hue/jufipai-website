/**
 * JufipAI Website JavaScript
 * Improved with error handling and performance optimization
 */

'use strict';

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
        // Send to Google Spreadsheet via contact@jufipai.com Apps Script
        const response = await fetch('https://script.google.com/macros/s/AKfycbxUJ6mzP1jubnhHK31Y_74FY6EIG61MdJW8VlrBX56r6hK2-Ing3EW_9o7uHs--9_3t/exec', {
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

// Tooltip-Style Popup System with Enhanced Accessibility
let popupPreviousFocus = null;
let popupFocusTrapHandler = null;
let popupKeyboardHandler = null;

function showServicePopup(title, content, icon = 'fas fa-robot', clickedCard) {
    const popup = document.getElementById('servicePopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');
    const popupIcon = document.getElementById('popupIcon');
    const backdrop = document.getElementById('popupBackdrop');

    if (popup && popupTitle && popupContent && popupIcon) {
        // Store previous focus for restoration
        popupPreviousFocus = document.activeElement;

        // Set content
        popupTitle.textContent = title;
        popupContent.innerHTML = content;
        popupIcon.className = icon + ' popup-service-icon';

        // Show popup as centered modal
        popup.style.display = 'flex';
        popup.classList.remove('closing');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Set ARIA attributes for accessibility
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-modal', 'true');
        popup.setAttribute('aria-labelledby', 'popupTitle');

        // Setup focus trap
        setupPopupFocusTrap(popup);

        // Setup keyboard handler (ESC to close)
        popupKeyboardHandler = function(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                hideServicePopup();
            }
        };
        document.addEventListener('keydown', popupKeyboardHandler);

        // Focus close button after animation
        setTimeout(() => {
            const closeBtn = document.getElementById('popupClose');
            closeBtn?.focus();
        }, 200);

        // Backdrop click to close
        if (backdrop) {
            backdrop.onclick = function(e) {
                if (e.target === backdrop) {
                    hideServicePopup();
                }
            };
        }
    }
}

function setupPopupFocusTrap(popup) {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = popup.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    popupFocusTrapHandler = function(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement?.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement?.focus();
            }
        }
    };

    popup.addEventListener('keydown', popupFocusTrapHandler);
}

function hideServicePopup() {
    const popup = document.getElementById('servicePopup');

    if (popup && popup.style.display !== 'none') {
        // Add closing class for animation
        popup.classList.add('closing');

        // Wait for animation to complete
        setTimeout(() => {
            finishHidePopup();
        }, 300);
    }

    function finishHidePopup() {
        popup.style.display = 'none';
        popup.classList.remove('closing');

        // Restore body scroll
        document.body.style.overflow = '';

        // Remove event listeners
        if (popupKeyboardHandler) {
            document.removeEventListener('keydown', popupKeyboardHandler);
            popupKeyboardHandler = null;
        }
        if (popupFocusTrapHandler) {
            popup.removeEventListener('keydown', popupFocusTrapHandler);
            popupFocusTrapHandler = null;
        }

        // Restore previous focus
        if (popupPreviousFocus && typeof popupPreviousFocus.focus === 'function') {
            popupPreviousFocus.focus();
            popupPreviousFocus = null;
        }

        // Remove ARIA attributes
        popup.removeAttribute('role');
        popup.removeAttribute('aria-modal');
        popup.removeAttribute('aria-labelledby');
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
        'feature12': 'Smart workflow automation that learns and adapts',

        // Testimonials Section
        'testimonials-title': 'Trusted By Industry Leaders',

        // Testimonial 1 - Real Estate
        'testimonial1-industry': 'Real Estate Agency',
        'testimonial1-desc': '"JufipAI automated our entire lead management system. Client inquiries are instantly categorized, property showings schedule automatically, and follow-ups happen without manual work. We closed 40% more deals in just 3 months."',

        // Testimonial 2 - Remodeling
        'testimonial2-industry': 'Remodeling Company',
        'testimonial2-desc': '"Project management became effortless. Material orders, contractor scheduling, and client updates all happen automatically. We eliminated 20 hours of weekly admin work and can now handle 3x more projects simultaneously."',

        // Testimonial 3 - Staffing
        'testimonial3-industry': 'Staffing Agency',
        'testimonial3-desc': '"Resume screening, candidate matching, and interview scheduling run on autopilot. Our AI agents process hundreds of applications daily with 95% accuracy. Placement time dropped from 3 weeks to 5 days."',

        // Testimonial 4 - Food Production
        'testimonial4-industry': 'Food Production',
        'testimonial4-desc': '"Inventory tracking, quality control reports, and supplier ordering are completely automated. The system predicts demand and reorders automatically. We cut waste by 35% and reduced staffing costs significantly."'
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
        'feature12': 'Automatización de flujos de trabajo inteligente que aprende y se adapta',

        // Sección de Testimonios
        'testimonials-title': 'Confiado por Líderes de la Industria',

        // Testimonio 1 - Bienes Raíces
        'testimonial1-industry': 'Agencia de Bienes Raíces',
        'testimonial1-desc': '"JufipAI automatizó todo nuestro sistema de gestión de prospectos. Las consultas de clientes se categorizan instantáneamente, las visitas a propiedades se programan automáticamente, y los seguimientos ocurren sin trabajo manual. Cerramos 40% más negocios en solo 3 meses."',

        // Testimonio 2 - Remodelación
        'testimonial2-industry': 'Empresa de Remodelación',
        'testimonial2-desc': '"La gestión de proyectos se volvió sencilla. Los pedidos de materiales, programación de contratistas, y actualizaciones de clientes suceden automáticamente. Eliminamos 20 horas de trabajo administrativo semanal y ahora manejamos 3 veces más proyectos simultáneamente."',

        // Testimonio 3 - Agencias de Personal
        'testimonial3-industry': 'Agencia de Personal',
        'testimonial3-desc': '"La evaluación de currículums, coincidencia de candidatos, y programación de entrevistas funcionan en piloto automático. Nuestros agentes AI procesan cientos de aplicaciones diariamente con 95% de precisión. El tiempo de colocación bajó de 3 semanas a 5 días."',

        // Testimonio 4 - Producción de Alimentos
        'testimonial4-industry': 'Producción de Alimentos',
        'testimonial4-desc': '"El seguimiento de inventario, reportes de control de calidad, y pedidos a proveedores están completamente automatizados. El sistema predice la demanda y reordena automáticamente. Redujimos el desperdicio en 35% y disminuimos significativamente los costos de personal."'
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
});

// Dark Mode Toggle System with localStorage persistence
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('themeSwitch');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);

    // Theme toggle function
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Update theme
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Play sound effect
        initAudio();
        if (audioEnabled) audioContext.playClickSound();

        // Log theme change
        console.log(`🎨 Theme changed to: ${newTheme === 'light' ? '☀️ Light' : '🌙 Dark'} Mode`);
    }

    // Click event
    if (themeSwitch) {
        themeSwitch.addEventListener('click', toggleTheme);

        // Keyboard accessibility
        themeSwitch.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });

        // Hover sound
        themeSwitch.addEventListener('mouseenter', function() {
            initAudio();
            if (audioEnabled) audioContext.playHoverSound();
        });
    }

    console.log('✅ Dark Mode Toggle initialized');
});

// Lazy Loading System using Intersection Observer
(function initLazyLoading() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Load image source
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                // Load background image
                if (img.dataset.bg) {
                    img.style.backgroundImage = `url(${img.dataset.bg})`;
                    img.removeAttribute('data-bg');
                }

                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px', // Start loading 50px before element is visible
        threshold: 0.01
    });

    // Observe all lazy images
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyBackgrounds.forEach(el => imageObserver.observe(el));

    // Lazy load sections for better performance
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    sections.forEach(section => sectionObserver.observe(section));

    // Prefetch links on hover for faster navigation
    const links = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            if (href && !href.includes('#') && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        }, { once: true });
    });

    console.log(`✅ Lazy Loading initialized: ${lazyImages.length} images, ${sections.length} sections`);
})();

// ========================================
// TESTIMONIALS TOGGLE SYSTEM
// ========================================
(function initTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    if (testimonialCards.length === 0) {
        console.log('ℹ️ No testimonial cards found');
        return;
    }

    testimonialCards.forEach(card => {
        const toggleButton = card.querySelector('.testimonial-toggle');
        const toggleText = toggleButton?.querySelector('span:not(.testimonial-toggle-icon)');

        if (!toggleButton) return;

        // Store original button text
        const expandText = toggleText?.getAttribute('data-translate') || 'Read More';
        const collapseText = 'Read Less';

        toggleButton.addEventListener('click', function(e) {
            e.stopPropagation();

            // Toggle expanded state
            const isExpanded = card.classList.toggle('expanded');

            // Update button text based on state
            if (toggleText) {
                if (isExpanded) {
                    toggleText.textContent = collapseText;
                    toggleText.setAttribute('data-translate', 'testimonials-read-less');
                } else {
                    toggleText.textContent = expandText === 'Read More' ? 'Read More' : expandText;
                    toggleText.setAttribute('data-translate', 'testimonials-read-more');
                }
            }

            // Play sound effect if available
            try {
                if (typeof playClickSound === 'function') {
                    playClickSound();
                }
            } catch (err) {
                // Silent fail if sound function doesn't exist
            }

            // Smooth scroll to card if expanding and partially off-screen
            if (isExpanded) {
                setTimeout(() => {
                    const cardRect = card.getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    // If card bottom is below viewport, scroll into view
                    if (cardRect.bottom > windowHeight) {
                        card.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }
                }, 300); // Wait for expansion animation
            }
        });

        // Also make the entire card clickable (except links and buttons)
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link or button
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }

            // Don't trigger if clicking inside the toggle button
            if (toggleButton.contains(e.target)) {
                return;
            }

            // Trigger the toggle button click
            toggleButton.click();
        });

        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');

        card.addEventListener('keydown', function(e) {
            // Trigger on Enter or Space key
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleButton.click();

                // Update aria-expanded attribute
                const isExpanded = card.classList.contains('expanded');
                card.setAttribute('aria-expanded', isExpanded.toString());
            }
        });
    });

    console.log(`✅ Testimonials initialized: ${testimonialCards.length} cards with toggle functionality`);
})();

// ============================================
// ENHANCED VISUAL FEATURES
// ============================================

// 1. SCROLL-TRIGGERED ANIMATIONS
(function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger children if they exist
                const children = entry.target.querySelectorAll('.service-card, .testimonial-card, .features-list li');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all major sections
    document.querySelectorAll('.services, .testimonials, .features, .contact').forEach(section => {
        observer.observe(section);
    });

    console.log('✅ Scroll animations initialized');
})();

// 2. MAGNETIC BUTTON INTERACTIONS
(function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .form-submit, .popup-cta-button');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.15;
            const moveY = y * 0.15;

            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });

        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    console.log('✅ Magnetic buttons initialized:', buttons.length);
})();

// 3. ENHANCED CARD HOVER EFFECTS
(function initCardEffects() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

            // Update gradient position
            const gradientX = (x / rect.width) * 100;
            const gradientY = (y / rect.height) * 100;
            card.style.background = `
                radial-gradient(circle at ${gradientX}% ${gradientY}%,
                    rgba(59, 130, 246, 0.15),
                    transparent 50%),
                var(--card-bg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.background = '';
        });
    });

    console.log('✅ Enhanced card effects initialized:', cards.length);
})();

// 4. PARALLAX BACKGROUND PARTICLES
(function initParallax() {
    const particles = document.getElementById('particles');
    const aiAgents = document.querySelectorAll('.ai-agent');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Move particles at different speeds
                if (particles) {
                    particles.style.transform = `translateY(${scrolled * 0.3}px)`;
                }

                // Move AI agents with subtle parallax
                aiAgents.forEach((agent, index) => {
                    const speed = 0.1 + (index * 0.05);
                    agent.style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });

            ticking = true;
        }
    });

    console.log('✅ Parallax effects initialized');
})();

// 5. GRADIENT BORDER ANIMATION ON HOVER
(function initGradientBorders() {
    const style = document.createElement('style');
    style.textContent = `
        .service-card::before,
        .testimonial-card::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            padding: 2px;
            background: linear-gradient(45deg,
                var(--primary-blue),
                var(--primary-gold),
                var(--primary-blue)
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
                          linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
        }

        .service-card:hover::before,
        .testimonial-card:hover::before {
            opacity: 1;
        }

        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(style);

    console.log('✅ Gradient border animations initialized');
})();

// 6. SMOOTH SCROLL PROGRESS INDICATOR
(function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-blue), var(--primary-gold));
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    console.log('✅ Scroll progress indicator initialized');
})();

// 7. PERFORMANCE OPTIMIZATION - REDUCE MOTION FOR MOBILE
(function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
        console.log('✅ Reduced motion enabled for performance');
    }
})();

console.log('🎨 All visual enhancements loaded successfully!');

// ========================================
// ARTICLE/BLOG MANAGEMENT SYSTEM
// ========================================
const ArticleManager = {
    articles: [],
    currentPage: 1,
    articlesPerPage: 6,
    activeCategory: 'all',
    searchQuery: '',
    apiEndpoint: 'https://jposter-production.up.railway.app', // Production API
    isLoading: false,

    async init() {
        console.log('[ArticleManager] Initializing...');
        this.renderSkeletons(); // Show loading state
        await this.fetchArticles();
        this.removeSkeletons(); // Hide loading state
        this.renderFeaturedArticle();
        this.renderArchiveGrid();
        this.setupFilters();
        this.setupSearch();
        this.setupLoadMore();
        this.startPolling();
        console.log('[ArticleManager] ✅ Initialized with', this.articles.length, 'articles');
    },

    renderSkeletons() {
        // Add loading class to featured article
        const featuredArticle = document.getElementById('featuredArticle');
        if (featuredArticle) {
            featuredArticle.classList.add('is-loading');
        }

        // Render archive skeletons
        const grid = document.getElementById('articlesGrid');
        if (grid) {
            grid.innerHTML = Array(3).fill('').map(() => `
                <div class="skeleton-article-card">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton skeleton-category"></div>
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title-2"></div>
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text-short"></div>
                        <div class="skeleton-footer">
                            <div class="skeleton skeleton-date"></div>
                            <div class="skeleton skeleton-time"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    },

    removeSkeletons() {
        const featuredArticle = document.getElementById('featuredArticle');
        if (featuredArticle) {
            featuredArticle.classList.remove('is-loading');
        }
    },

    async fetchArticles() {
        if (this.isLoading) return;
        this.isLoading = true;

        try {
            // Try static data first (embedded at build time by GitHub Actions)
            let response = await fetch('/data/articles.json');

            if (response.ok) {
                const staticArticles = await response.json();
                if (staticArticles.length > 0) {
                    this.articles = staticArticles;
                    console.log('[ArticleManager] ✓ Loaded from static data:', staticArticles.length, 'articles');
                } else {
                    // Static file empty, try live API
                    console.log('[ArticleManager] Static data empty, trying live API...');
                    response = await fetch(`${this.apiEndpoint}/articles`);
                    if (response.ok) {
                        this.articles = await response.json();
                        console.log('[ArticleManager] ✓ Loaded from live API');
                    } else {
                        this.articles = this.getDefaultArticles();
                    }
                }
            } else {
                // No static file, fallback to live API
                console.log('[ArticleManager] No static data, trying live API...');
                response = await fetch(`${this.apiEndpoint}/articles`);
                if (response.ok) {
                    this.articles = await response.json();
                    console.log('[ArticleManager] ✓ Loaded from live API');
                } else {
                    console.log('[ArticleManager] API not available, using defaults');
                    this.articles = this.getDefaultArticles();
                }
            }
        } catch (error) {
            console.log('[ArticleManager] Fetch error, using defaults:', error.message);
            this.articles = this.getDefaultArticles();
        }

        this.isLoading = false;
    },

    getDefaultArticles() {
        // Default articles shown when API is not available
        // These are substantial 3-minute reads with real content
        return [
            {
                id: 'default-1',
                title: 'How We Automated 40 Hours of Weekly Work for a Real Estate Agency',
                teaser: 'Client inquiries, property scheduling, and follow-ups - all on autopilot using Google Workspace and AI agents. Here\'s the exact system we built.',
                content: `Friday afternoon. Got a call from a real estate agency owner who was spending 40+ hours a week on admin work.

The problem wasn't complicated. Every new lead meant:
• Manual entry into their CRM
• Scheduling showings via back-and-forth emails
• Follow-up reminders in three different apps
• Property info lookup from multiple sources
• Commission calculations in a spreadsheet nightmare

We built something different.

THE SOLUTION

First, we connected their contact form directly to Google Sheets. Not revolutionary, but here's the twist - we added an AI layer that reads each inquiry and automatically:

1. Categorizes the lead (buyer, seller, renter)
2. Matches them with available properties based on their criteria
3. Sends a personalized response with relevant listings
4. Creates calendar slots for showings

The scheduling part was the game-changer. Instead of 15 emails to book one showing, prospects get a Calendly-style link that syncs with agent availability, property access times, AND travel time between showings.

THE RESULTS

Week one: 12 hours saved on scheduling alone.
Month one: Lead response time dropped from 4 hours to 4 minutes.
Month three: 40% increase in showing-to-offer conversion.

The owner told me something that stuck: "I became a real estate agent to help people find homes, not to fight with spreadsheets."

That's what automation should do. Not replace the human parts - amplify them.

Want to see if this works for your business? The diagnosis is free.`,
                category: 'automation',
                createdAt: new Date().toISOString(),
                readTime: 3,
                linkedinUrl: 'https://www.linkedin.com/company/jufipai',
                hasMedia: true,
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
            },
            {
                id: 'default-2',
                title: 'The Time Clock That Stopped Lying: GPS-Verified Attendance',
                teaser: 'A staffing company was losing $3,000/month to buddy punching. GPS verification fixed it overnight - but not in the way you\'d expect.',
                content: `Tuesday morning. The staffing company owner shows me his time records.

"See this? John clocked in at 6:58 AM. Perfect, right?"

I waited.

"John's car was in the shop. His friend Mike clocked him in. John actually showed up at 8:30."

This was happening 15-20 times per week across 200 employees. Quick math: $3,000+ per month in paid-but-not-worked hours.

THE OBVIOUS SOLUTION (THAT DIDN'T WORK)

Their first instinct was surveillance. Biometric scanners, photo verification, manager approval for every punch.

The employees hated it. Turnover spiked. The ones who stayed resented the Big Brother treatment.

THE ACTUAL SOLUTION

We built a simple mobile clock-in that uses GPS - but with a twist. Instead of tracking employees constantly (creepy), it only verifies location at the moment of clock-in.

Here's what made it work:

1. TRUST BY DEFAULT - Employees clock in normally via app
2. GEOFENCE CHECK - Quick location ping at punch time (within 500ft of job site)
3. EXCEPTIONS ONLY - Only flags punches that fail the check
4. HUMAN REVIEW - Flagged punches go to a supervisor, not auto-denied

The psychology matters. We're not assuming everyone's a thief. We're catching the actual problems.

THE UNEXPECTED RESULT

Buddy punching dropped to near zero within two weeks. But here's what surprised everyone:

Employee satisfaction went UP.

Why? The honest employees were tired of watching others game the system. Fair enforcement meant fair treatment.

The $3,000/month leak? Plugged. The trust problem? Solved differently than expected.

Sometimes the best automation isn't about removing humans - it's about removing the temptation to be less than honest.`,
                category: 'productivity',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                readTime: 3,
                linkedinUrl: 'https://www.linkedin.com/company/jufipai',
                hasMedia: true,
                image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80'
            },
            {
                id: 'default-3',
                title: 'Why Most AI Agents Fail in Production (And How to Build Ones That Don\'t)',
                teaser: 'After 50+ deployments, here\'s the pattern: AI agents fail not because of the model, but because of missing guardrails.',
                content: `Let me tell you about the AI agent that almost cost a client $50,000.

It was a content generation agent. Simple job: write social media posts based on company news. We used Claude, gave it good prompts, tested it thoroughly.

First week in production, it invented a product launch that didn't exist. Posted it to LinkedIn. Customer service got flooded with questions about a product they'd never heard of.

THE REAL PROBLEM

The AI didn't malfunction. It did exactly what we asked - be creative and engaging. We just didn't tell it what NOT to do.

After 50+ agent deployments, here's what I've learned:

GUARDRAIL #1: VALIDATION LAYERS

Every AI output needs validation before it reaches the real world:
• Schema validation (is the format correct?)
• Content validation (are all claims verifiable?)
• Safety validation (does it contain anything problematic?)

We now run 3 separate checks on every AI response. Paranoid? Maybe. But we haven't had an incident since.

GUARDRAIL #2: HUMAN-IN-THE-LOOP (FOR NOW)

Full automation is the goal, but earned trust takes time.

Start with: AI suggests → Human approves → Action taken
Move to: AI acts → Human reviews → Feedback loop
End with: AI acts → Spot checks → Continuous monitoring

Skipping stages is how you get invented product launches.

GUARDRAIL #3: FAIL GRACEFULLY

What happens when the AI doesn't know? Most agents either:
• Hallucinate confidently (bad)
• Crash entirely (also bad)

Good agents say "I'm not sure about this - flagging for human review."

We build explicit uncertainty detection into every agent. If confidence drops below 80%, it asks for help instead of guessing.

THE PATTERN THAT WORKS

1. Define success criteria BEFORE building
2. Add validation at every output point
3. Start with human oversight, reduce gradually
4. Build in graceful failure modes
5. Monitor constantly, improve continuously

AI agents that work in production aren't smarter. They're more honest about their limitations.

The best agent is one that knows when to ask for help.`,
                category: 'ai',
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                readTime: 4,
                linkedinUrl: 'https://www.linkedin.com/company/jufipai',
                hasMedia: true,
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
            },
            {
                id: 'default-4',
                title: 'The 47-Tab Spreadsheet Monster We Killed with One Dashboard',
                teaser: 'A construction company had 47 interconnected spreadsheet tabs. We replaced them all with a single real-time dashboard.',
                content: `"Don't touch anything. If you break a formula, we're dead."

That's how the office manager introduced me to their spreadsheet system. 47 tabs. 12,000+ formulas. Three people whose only job was keeping it updated.

This is not an exaggeration. This is Tuesday in most small businesses.

THE ARCHAEOLOGY

We spent two days just mapping what the spreadsheet actually did:
• Tab 1-15: Project tracking
• Tab 16-23: Employee hours
• Tab 24-31: Material costs
• Tab 32-40: Client invoicing
• Tab 41-47: "Don't ask, just don't touch"

The last section? Legacy formulas from 2018 that nobody understood anymore but everyone was afraid to delete.

THE MIGRATION

We didn't try to replicate the spreadsheet. We asked: "What decisions does this data support?"

Turns out, despite 47 tabs, they really needed to answer 5 questions:
1. Which projects are profitable?
2. Which are over budget?
3. Who's working where?
4. What materials do we need?
5. Who owes us money?

We built a dashboard that answers those 5 questions. In real-time. With data that updates automatically from their existing tools.

THE RESULT

The 47-tab monster? Archived. Not deleted (they weren't ready for that), but no longer the source of truth.

Time spent on data entry: Down 80%
Time to answer "how's project X doing?": From 20 minutes to 20 seconds
Formula anxiety: Gone

The office manager sent me a message three weeks later: "I slept through the night for the first time in two years."

Sometimes the best technology project isn't adding something new. It's removing something old that's been quietly torturing everyone.`,
                category: 'automation',
                createdAt: new Date(Date.now() - 259200000).toISOString(),
                readTime: 3,
                linkedinUrl: 'https://www.linkedin.com/company/jufipai',
                hasMedia: true,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
            }
        ];
    },

    renderFeaturedArticle() {
        const featured = this.articles[0];
        if (!featured) return;

        const titleEl = document.getElementById('featuredTitle');
        const teaserEl = document.getElementById('featuredTeaser');
        const categoryEl = document.getElementById('featuredCategory');
        const dateEl = document.getElementById('featuredDate');
        const linkedInLink = document.getElementById('featuredLinkedIn');
        const newBadge = document.getElementById('newBadge');
        const readMoreBtn = document.getElementById('featuredReadMore');
        const featuredImage = document.getElementById('featuredImage');

        if (titleEl) titleEl.textContent = featured.title;
        if (teaserEl) teaserEl.textContent = featured.teaser || featured.content?.substring(0, 200) + '...';
        if (categoryEl) categoryEl.textContent = this.formatCategory(featured.category);
        if (dateEl) dateEl.textContent = this.formatDate(featured.createdAt);

        // Show featured image if available
        if (featuredImage && featured.image) {
            featuredImage.src = featured.image;
            featuredImage.alt = featured.title;
            featuredImage.style.display = 'block';
        }

        // Show LinkedIn link if available
        if (linkedInLink && featured.linkedinUrl) {
            linkedInLink.href = featured.linkedinUrl;
            linkedInLink.style.display = 'inline-flex';
            // Ensure click works by preventing default and manually navigating
            linkedInLink.onclick = function(e) {
                e.stopPropagation(); // Prevent any parent handlers
                window.open(featured.linkedinUrl, '_blank', 'noopener,noreferrer');
                return false;
            };
        }

        // Show NEW badge if article is from last 24 hours
        const isNew = (Date.now() - new Date(featured.createdAt).getTime()) < 86400000;
        if (newBadge) {
            newBadge.style.display = isNew ? 'block' : 'none';
        }

        // Read more button opens popup with full content
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', () => {
                this.showArticlePopup(featured);
            });
        }

        // Setup social sharing for featured article
        this.setupSocialSharing(featured);
    },

    setupSocialSharing(article) {
        const shareContainer = document.getElementById('featuredShare');
        if (!shareContainer) return;

        const shareBtns = shareContainer.querySelectorAll('.share-btn');
        const pageUrl = encodeURIComponent(window.location.href + '#blog');
        const shareText = encodeURIComponent(article.title + ' - JufipAI');

        shareBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const platform = btn.dataset.platform;

                let shareUrl;
                switch (platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                        break;
                    case 'copy':
                        navigator.clipboard.writeText(window.location.href + '#blog').then(() => {
                            btn.classList.add('copied');
                            const icon = btn.querySelector('i');
                            const originalClass = icon.className;
                            icon.className = 'fas fa-check';
                            setTimeout(() => {
                                btn.classList.remove('copied');
                                icon.className = originalClass;
                            }, 2000);
                        });
                        return;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
                }
            });
        });
    },

    renderArchiveGrid() {
        const grid = document.getElementById('articlesGrid');
        if (!grid) return;

        // Get articles excluding the featured one
        let archiveArticles = this.articles.slice(1);

        // Apply category filter
        if (this.activeCategory !== 'all') {
            archiveArticles = archiveArticles.filter(a => a.category === this.activeCategory);
        }

        // Apply search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            archiveArticles = archiveArticles.filter(a =>
                a.title.toLowerCase().includes(query) ||
                (a.teaser && a.teaser.toLowerCase().includes(query)) ||
                (a.content && a.content.toLowerCase().includes(query))
            );
        }

        // Get articles for current page
        const toShow = archiveArticles.slice(0, this.currentPage * this.articlesPerPage);

        if (toShow.length === 0) {
            grid.innerHTML = `
                <div class="no-articles" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8;">
                    <i class="fas fa-newspaper" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>No articles found in this category yet.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = toShow.map(article => `
            <article class="article-card ${article.image ? 'has-image' : ''}" data-id="${article.id}" tabindex="0" role="listitem">
                <div class="article-card-image">
                    ${article.image ? `<img src="${article.image}" alt="${article.title}" loading="lazy">` : ''}
                </div>
                <div class="article-card-content">
                    <div class="article-category">${this.formatCategory(article.category)}</div>
                    <h4>${article.title}</h4>
                    <p>${article.teaser || article.content?.substring(0, 100) + '...'}</p>
                    <div class="article-card-footer">
                        <span>${this.formatDate(article.createdAt)}</span>
                        <span><i class="fas fa-clock"></i> ${article.readTime || 3} min</span>
                    </div>
                </div>
            </article>
        `).join('');

        // Add click handlers
        grid.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const article = this.articles.find(a => a.id === id);
                if (article) this.showArticlePopup(article);
            });

            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreArticles');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = toShow.length < archiveArticles.length ? 'flex' : 'none';
        }
    },

    showArticlePopup(article) {
        // Use the existing popup system with article content
        const pageUrl = encodeURIComponent(window.location.href + '#blog');
        const shareText = encodeURIComponent(article.title + ' - JufipAI');

        const formattedContent = `
            <div class="article-popup-content">
                <div class="reading-progress-container">
                    <div class="reading-progress-bar" id="readingProgressBar"></div>
                </div>
                <div class="article-popup-meta">
                    <span class="article-category">${this.formatCategory(article.category)}</span>
                    <span class="article-date">${this.formatDate(article.createdAt)}</span>
                    <span class="article-readtime"><i class="fas fa-clock"></i> ${article.readTime || 3} min read</span>
                </div>
                <div class="article-popup-body">
                    ${article.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
                </div>
                ${article.linkedinUrl ? `
                    <a href="${article.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="linkedin-link" style="margin-top: 1.5rem;" onclick="event.stopPropagation(); window.open('${article.linkedinUrl}', '_blank', 'noopener,noreferrer'); return false;">
                        <i class="fab fa-linkedin"></i> View on LinkedIn
                    </a>
                ` : ''}
                <div class="social-share" style="margin-top: 1.5rem;">
                    <span class="share-label">Share:</span>
                    <button class="share-btn" onclick="event.stopPropagation(); window.open('https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}', '_blank', 'width=600,height=400');" aria-label="Share on X/Twitter">
                        <i class="fab fa-x-twitter"></i>
                    </button>
                    <button class="share-btn" onclick="event.stopPropagation(); window.open('https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}', '_blank', 'width=600,height=400');" aria-label="Share on LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </button>
                    <button class="share-btn" onclick="event.stopPropagation(); window.open('https://www.facebook.com/sharer/sharer.php?u=${pageUrl}', '_blank', 'width=600,height=400');" aria-label="Share on Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                    <button class="share-btn" onclick="event.stopPropagation(); navigator.clipboard.writeText(decodeURIComponent('${pageUrl}')); this.classList.add('copied'); this.querySelector('i').className='fas fa-check'; setTimeout(() => { this.classList.remove('copied'); this.querySelector('i').className='fas fa-link'; }, 2000);" aria-label="Copy link">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
                ${this.getRelatedArticlesHTML(article)}
            </div>
        `;

        // Create a temporary card element for positioning
        const blogSection = document.getElementById('blog');
        showServicePopup(article.title, formattedContent, 'fas fa-newspaper', blogSection);

        // Setup reading progress tracking and related articles after popup renders
        setTimeout(() => {
            this.setupReadingProgress();
            this.setupRelatedArticleClicks();
        }, 100);
    },

    setupRelatedArticleClicks() {
        const relatedCards = document.querySelectorAll('.related-card');
        relatedCards.forEach(card => {
            const clickHandler = (e) => {
                e.stopPropagation();
                const articleId = card.dataset.articleId;
                const article = this.articles.find(a => a.id === articleId);
                if (article) {
                    // Close current popup and open new one
                    hideServicePopup();
                    setTimeout(() => {
                        this.showArticlePopup(article);
                    }, 300);
                }
            };

            card.addEventListener('click', clickHandler);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clickHandler(e);
                }
            });
        });
    },

    setupReadingProgress() {
        const popupContent = document.querySelector('.popup-content-wrapper');
        const progressBar = document.getElementById('readingProgressBar');

        if (!popupContent || !progressBar) return;

        const updateProgress = () => {
            const scrollTop = popupContent.scrollTop;
            const scrollHeight = popupContent.scrollHeight - popupContent.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

            progressBar.style.width = `${Math.min(progress, 100)}%`;

            if (progress >= 95) {
                progressBar.classList.add('complete');
            } else {
                progressBar.classList.remove('complete');
            }
        };

        popupContent.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial check
    },

    getRelatedArticlesHTML(currentArticle) {
        // Get articles in the same category, excluding current
        let related = this.articles.filter(a =>
            a.id !== currentArticle.id &&
            a.category === currentArticle.category
        ).slice(0, 2);

        // If not enough in same category, add from other categories
        if (related.length < 2) {
            const others = this.articles.filter(a =>
                a.id !== currentArticle.id &&
                !related.find(r => r.id === a.id)
            ).slice(0, 2 - related.length);
            related = [...related, ...others];
        }

        if (related.length === 0) return '';

        return `
            <div class="related-articles">
                <h4 class="related-title">
                    <i class="fas fa-book-open"></i>
                    Keep Reading
                </h4>
                <div class="related-grid">
                    ${related.map(article => `
                        <div class="related-card" data-article-id="${article.id}" tabindex="0">
                            <span class="related-category">${this.formatCategory(article.category)}</span>
                            <h5>${article.title}</h5>
                            <span class="related-time"><i class="fas fa-clock"></i> ${article.readTime || 3} min</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // Filter articles
                this.activeCategory = btn.dataset.category;
                this.currentPage = 1;
                this.renderArchiveGrid();
            });
        });
    },

    setupSearch() {
        const searchInput = document.getElementById('articleSearchInput');
        const searchClear = document.getElementById('searchClear');

        if (!searchInput) return;

        // Debounce search input
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const value = e.target.value.trim();

            // Show/hide clear button
            if (searchClear) {
                searchClear.style.display = value ? 'flex' : 'none';
            }

            searchTimeout = setTimeout(() => {
                this.searchQuery = value;
                this.currentPage = 1;
                this.renderArchiveGrid();
            }, 300); // 300ms debounce
        });

        // Clear search
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.style.display = 'none';
                this.searchQuery = '';
                this.currentPage = 1;
                this.renderArchiveGrid();
                searchInput.focus();
            });
        }

        // Search on Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                this.searchQuery = '';
                this.currentPage = 1;
                this.renderArchiveGrid();
                searchInput.blur();
            }
        });
    },

    setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreArticles');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.renderArchiveGrid();
            });
        }
    },

    startPolling() {
        // Check for new articles every 5 minutes
        setInterval(async () => {
            const oldCount = this.articles.length;
            const oldLatestId = this.articles[0]?.id;

            await this.fetchArticles();

            // Check if there's a new article
            if (this.articles.length > oldCount || this.articles[0]?.id !== oldLatestId) {
                console.log('[ArticleManager] New article detected!');
                this.renderFeaturedArticle();
                this.renderArchiveGrid();

                // Trigger notification if NotificationManager is available
                if (typeof NotificationManager !== 'undefined') {
                    NotificationManager.showNewArticleNotification(this.articles[0]);
                }
            }
        }, 300000); // 5 minutes
    },

    formatDate(dateStr) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    },

    formatCategory(category) {
        const categoryMap = {
            'automation': 'Automation',
            'ai': 'AI Tools',
            'productivity': 'Productivity'
        };
        return categoryMap[category] || category || 'Insights';
    }
};

// ========================================
// NOTIFICATION SYSTEM
// ========================================
const NotificationManager = {
    hasPermission: false,
    permissionPromptShown: false,

    init() {
        console.log('[NotificationManager] Initializing...');

        // Check if notifications are supported
        if (!('Notification' in window)) {
            console.log('[NotificationManager] Notifications not supported');
            return;
        }

        // Check existing permission
        this.hasPermission = Notification.permission === 'granted';

        // Show permission prompt after delay (if not already granted/denied)
        if (Notification.permission === 'default') {
            setTimeout(() => {
                this.showPermissionPrompt();
            }, 30000); // 30 seconds
        }

        console.log('[NotificationManager] ✅ Initialized');
    },

    showPermissionPrompt() {
        if (this.permissionPromptShown) return;
        this.permissionPromptShown = true;

        const prompt = document.createElement('div');
        prompt.className = 'notification-permission-prompt';
        prompt.innerHTML = `
            <div class="permission-content">
                <div class="permission-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <div class="permission-text">
                    <h4>Stay Updated!</h4>
                    <p>Get notified when we publish new AI automation insights</p>
                </div>
                <div class="permission-actions">
                    <button class="permission-allow">Allow</button>
                    <button class="permission-later">Maybe Later</button>
                </div>
            </div>
        `;

        document.body.appendChild(prompt);

        // Animate in
        setTimeout(() => prompt.classList.add('visible'), 100);

        prompt.querySelector('.permission-allow').addEventListener('click', async () => {
            const permission = await Notification.requestPermission();
            this.hasPermission = permission === 'granted';
            prompt.classList.remove('visible');
            setTimeout(() => prompt.remove(), 300);

            if (this.hasPermission) {
                this.showToast('Notifications enabled! You\'ll know when new content drops.', 'success');
            }
        });

        prompt.querySelector('.permission-later').addEventListener('click', () => {
            prompt.classList.remove('visible');
            setTimeout(() => prompt.remove(), 300);
        });
    },

    showNewArticleNotification(article) {
        // Show in-app toast
        this.showToast(`New Article: ${article.title}`, 'new-article', () => {
            document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
        });

        // Show browser notification if permitted
        if (this.hasPermission && Notification.permission === 'granted') {
            try {
                new Notification('New JufipAI Article!', {
                    body: article.title,
                    icon: '/favicon.svg',
                    tag: 'new-article',
                    requireInteraction: false
                });
            } catch (err) {
                console.log('[NotificationManager] Browser notification failed:', err);
            }
        }

        // Show badge on nav link
        this.showNavBadge();
    },

    showToast(message, type = 'info', onClick = null) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconMap = {
            'success': 'check-circle',
            'new-article': 'newspaper',
            'info': 'info-circle',
            'error': 'exclamation-circle'
        };

        toast.innerHTML = `
            <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            <span>${message}</span>
            <button class="toast-close" aria-label="Close"><i class="fas fa-times"></i></button>
        `;

        if (onClick) {
            toast.style.cursor = 'pointer';
            toast.addEventListener('click', (e) => {
                if (!e.target.closest('.toast-close')) {
                    onClick();
                    toast.classList.remove('visible');
                    setTimeout(() => toast.remove(), 300);
                }
            });
        }

        toast.querySelector('.toast-close').addEventListener('click', (e) => {
            e.stopPropagation();
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 300);
        });

        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('visible'), 100);

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('visible');
                setTimeout(() => toast.remove(), 300);
            }
        }, 8000);
    },

    showNavBadge() {
        let badge = document.querySelector('.nav-article-badge');
        const blogLink = document.querySelector('a[href="#blog"]');

        if (!badge && blogLink) {
            badge = document.createElement('span');
            badge.className = 'nav-article-badge';
            badge.textContent = 'NEW';
            blogLink.style.position = 'relative';
            blogLink.appendChild(badge);
        }

        if (badge) {
            badge.classList.add('visible');

            // Remove badge when user visits blog section
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    badge.classList.remove('visible');
                    observer.disconnect();
                }
            }, { threshold: 0.5 });

            const blogSection = document.getElementById('blog');
            if (blogSection) observer.observe(blogSection);
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Article Manager
    ArticleManager.init();

    // Initialize Notification Manager
    NotificationManager.init();
});

console.log('📰 Article and Notification systems loaded!');

// ========================================
// GOOGLE SIGN-IN AUTHENTICATION
// ========================================
const AuthManager = {
    user: null,
    googleClientId: '908543213432-7t6krf6iksi8tfoh4pu4mgulfs5lk34r.apps.googleusercontent.com',
    googleSheetsEndpoint: 'https://script.google.com/macros/s/AKfycbxUJ6mzP1jubnhHK31Y_74FY6EIG61MdJW8VlrBX56r6hK2-Ing3EW_9o7uHs--9_3t/exec',

    init() {
        console.log('[AuthManager] Initializing...');

        // Check for existing session
        const storedUser = localStorage.getItem('jufipai_user');
        if (storedUser) {
            try {
                this.user = JSON.parse(storedUser);
                this.showUserProfile();
                console.log('[AuthManager] Restored session for:', this.user.name);
            } catch (e) {
                localStorage.removeItem('jufipai_user');
            }
        }

        // Wait for Google library to load
        this.waitForGoogleLibrary();

        // Sign out handler
        document.getElementById('signOutBtn')?.addEventListener('click', () => {
            this.signOut();
        });

        console.log('[AuthManager] ✅ Initialized');
    },

    waitForGoogleLibrary() {
        if (typeof google !== 'undefined' && google.accounts) {
            this.initializeGoogleSignIn();
        } else {
            // Retry after a short delay
            setTimeout(() => this.waitForGoogleLibrary(), 100);
        }
    },

    initializeGoogleSignIn() {
        try {
            google.accounts.id.initialize({
                client_id: this.googleClientId,
                callback: this.handleCredentialResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true
            });

            // Render the sign-in button if user is not signed in
            if (!this.user) {
                google.accounts.id.renderButton(
                    document.getElementById('googleSignInBtn'),
                    {
                        theme: 'filled_blue',
                        size: 'medium',
                        text: 'signin_with',
                        shape: 'pill',
                        width: 200
                    }
                );
            }

            console.log('[AuthManager] Google Sign-In button rendered');
        } catch (err) {
            console.error('[AuthManager] Failed to initialize Google Sign-In:', err);
        }
    },

    handleCredentialResponse(response) {
        console.log('[AuthManager] Credential response received');

        try {
            // Decode JWT token
            const payload = this.decodeJWT(response.credential);

            this.user = {
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                sub: payload.sub,
                signedInAt: new Date().toISOString()
            };

            // Store locally
            localStorage.setItem('jufipai_user', JSON.stringify(this.user));

            // Send to backend (Google Sheets)
            this.storeUserToSheets();

            // Update UI
            this.showUserProfile();

            // Show welcome message
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.showToast(`Welcome, ${this.user.name.split(' ')[0]}!`, 'success');
            }

            console.log('[AuthManager] User signed in:', this.user.name);
        } catch (err) {
            console.error('[AuthManager] Failed to process credential:', err);
        }
    },

    decodeJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
        );
        return JSON.parse(jsonPayload);
    },

    showUserProfile() {
        const signInBtn = document.getElementById('googleSignInBtn');
        const profile = document.getElementById('userProfile');
        const avatar = document.getElementById('userAvatar');
        const name = document.getElementById('userName');

        if (signInBtn) signInBtn.style.display = 'none';
        if (profile) profile.style.display = 'flex';
        if (avatar) avatar.src = this.user.picture || '';
        if (name) name.textContent = this.user.name?.split(' ')[0] || 'User';
    },

    signOut() {
        console.log('[AuthManager] Signing out...');

        // Disable auto-select for next time
        if (typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.disableAutoSelect();
        }

        // Clear local storage
        localStorage.removeItem('jufipai_user');
        this.user = null;

        // Update UI
        const signInBtn = document.getElementById('googleSignInBtn');
        const profile = document.getElementById('userProfile');

        if (profile) profile.style.display = 'none';
        if (signInBtn) {
            signInBtn.style.display = 'block';
            // Re-render the button
            this.initializeGoogleSignIn();
        }

        // Show message
        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.showToast('Signed out successfully', 'info');
        }

        console.log('[AuthManager] User signed out');
    },

    async storeUserToSheets() {
        try {
            await fetch(this.googleSheetsEndpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'action': 'sign_in',
                    'email': this.user.email,
                    'name': this.user.name,
                    'signedInAt': this.user.signedInAt,
                    'source': 'google_signin'
                })
            });
            console.log('[AuthManager] User data sent to Google Sheets');
        } catch (error) {
            console.error('[AuthManager] Failed to store user to Sheets:', error);
        }
    },

    isSignedIn() {
        return this.user !== null;
    },

    getUser() {
        return this.user;
    }
};

// Initialize AuthManager on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    AuthManager.init();
});

console.log('🔐 Authentication system loaded!');
