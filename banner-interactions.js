// Enhanced Banner Interaction Script
// Adds smooth user interaction animations while maintaining static positioning

document.addEventListener('DOMContentLoaded', function() {
    const stickyBanner = document.getElementById('stickyCTA');
    const bannerButton = document.querySelector('.sticky-cta-button');
    
    if (!stickyBanner) return;

    // Counter for interaction tracking
    let interactionCount = 0;
    let lastInteractionTime = 0;

    // Enhanced hover effects with position stability
    function addHoverEnhancements() {
        stickyBanner.addEventListener('mouseenter', function() {
            // Add subtle glow effect without changing position
            this.style.filter = 'brightness(1.05) drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))';
            
            // Trigger attention animation if user hasn't interacted much
            if (interactionCount < 3) {
                this.classList.add('user-attention');
                setTimeout(() => {
                    this.classList.remove('user-attention');
                }, 600);
            }
        });

        stickyBanner.addEventListener('mouseleave', function() {
            // Remove glow effect
            this.style.filter = '';
            interactionCount++;
            lastInteractionTime = Date.now();
        });
    }

    // Enhanced click feedback
    function addClickFeedback() {
        bannerButton?.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Smooth scroll animation when banner is clicked
    function addSmoothScrolling() {
        bannerButton?.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Add pulse animation to banner
                    stickyBanner.classList.add('user-attention');
                    setTimeout(() => {
                        stickyBanner.classList.remove('user-attention');
                    }, 600);
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    // Periodic attention-grabbing animation (subtle)
    function addPeriodicAnimation() {
        let animationInterval;
        
        function startPeriodicAnimation() {
            animationInterval = setInterval(() => {
                // Only animate if user hasn't interacted recently
                if (Date.now() - lastInteractionTime > 30000 && interactionCount < 5) {
                    stickyBanner.classList.add('user-attention');
                    setTimeout(() => {
                        stickyBanner.classList.remove('user-attention');
                    }, 1000);
                }
            }, 45000); // Every 45 seconds
        }
        
        // Stop animation if user interacts frequently
        stickyBanner.addEventListener('mouseenter', () => {
            if (interactionCount >= 5) {
                clearInterval(animationInterval);
            }
        });
        
        startPeriodicAnimation();
    }

    // Intersection Observer for scroll-based interactions
    function addScrollInteractions() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target.id === 'contact' && entry.isIntersecting) {
                    // User reached contact section, add subtle celebration
                    stickyBanner.style.transform = 'translateX(-50%) scale(0.95)';
                    stickyBanner.style.opacity = '0.7';
                    setTimeout(() => {
                        stickyBanner.style.transform = '';
                        stickyBanner.style.opacity = '';
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            observer.observe(contactSection);
        }
    }

    // Add CSS animation keyframes dynamically
    function addDynamicAnimations() {
        if (!document.getElementById('banner-animations')) {
            const style = document.createElement('style');
            style.id = 'banner-animations';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                @keyframes bannerCelebration {
                    0%, 100% { transform: translateX(-50%) scale(1); }
                    25% { transform: translateX(-50%) scale(1.05) rotate(1deg); }
                    75% { transform: translateX(-50%) scale(1.05) rotate(-1deg); }
                }
                
                .sticky-cta.celebration {
                    animation: bannerCelebration 0.8s ease-in-out;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize all enhancements
    function initializeBannerInteractions() {
        addDynamicAnimations();
        addHoverEnhancements();
        addClickFeedback();
        addSmoothScrolling();
        addPeriodicAnimation();
        addScrollInteractions();
        
        console.log('✨ Banner interactions enhanced - static positioning maintained');
    }

    // Start the enhancements
    initializeBannerInteractions();
    
    // Expose function for potential manual triggering
    window.triggerBannerAttention = function() {
        stickyBanner.classList.add('user-attention');
        setTimeout(() => {
            stickyBanner.classList.remove('user-attention');
        }, 1000);
    };
});