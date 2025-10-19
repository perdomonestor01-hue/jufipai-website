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
