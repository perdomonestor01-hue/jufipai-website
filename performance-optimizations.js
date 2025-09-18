/**
 * JufipAI Performance Optimization Implementation
 * Critical performance improvements for the articles section
 */

'use strict';

// ============================================
// 1. PARTICLE SYSTEM OPTIMIZATION
// ============================================

class OptimizedParticleSystem {
    constructor(containerId, maxParticles = 30) {
        this.container = document.getElementById(containerId);
        this.maxParticles = maxParticles;
        this.particlePool = [];
        this.activeParticles = [];
        this.isAnimating = false;
        this.intersectionObserver = null;

        this.init();
    }

    init() {
        // Create particle pool for better memory management
        for (let i = 0; i < this.maxParticles; i++) {
            this.particlePool.push(this.createParticle());
        }

        // Setup intersection observer for performance
        this.setupIntersectionObserver();

        // Listen for visibility changes
        this.setupVisibilityObserver();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'optimized-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            pointer-events: none;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
            opacity: 0;
        `;
        return particle;
    }

    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    this.startAnimation();
                } else if (!entry.isIntersecting && this.isAnimating) {
                    this.stopAnimation();
                }
            });
        }, { threshold: 0.1 });

        if (this.container) {
            this.intersectionObserver.observe(this.container);
        }
    }

    setupVisibilityObserver() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isAnimating) {
                this.pauseAnimation();
            } else if (!document.hidden && this.container) {
                this.resumeAnimation();
            }
        });
    }

    startAnimation() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        const particleCount = Math.min(this.maxParticles,
            window.innerWidth < 768 ? 15 : 30); // Reduce on mobile

        for (let i = 0; i < particleCount; i++) {
            this.activateParticle(i * 200); // Stagger activation
        }
    }

    activateParticle(delay = 0) {
        if (this.particlePool.length === 0) return;

        const particle = this.particlePool.pop();
        this.activeParticles.push(particle);
        this.container.appendChild(particle);

        // Random positioning and animation
        const x = Math.random() * 100;
        const duration = 6 + Math.random() * 4;
        const animationDelay = Math.random() * 2;

        particle.style.cssText += `
            left: ${x}%;
            top: 100%;
            background: rgba(59, 130, 246, ${0.4 + Math.random() * 0.4});
            box-shadow: 0 0 ${6 + Math.random() * 8}px rgba(59, 130, 246, 0.6);
            animation: optimizedParticleFloat ${duration}s ease-in-out ${delay + animationDelay}ms infinite;
            opacity: 1;
        `;

        // Auto-cleanup after animation cycle
        setTimeout(() => {
            this.deactivateParticle(particle);
        }, (duration + animationDelay / 1000) * 1000);
    }

    deactivateParticle(particle) {
        const index = this.activeParticles.indexOf(particle);
        if (index > -1) {
            this.activeParticles.splice(index, 1);
            this.particlePool.push(particle);

            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }

            particle.style.animation = '';
            particle.style.opacity = '0';
        }
    }

    pauseAnimation() {
        this.activeParticles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    }

    resumeAnimation() {
        this.activeParticles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }

    stopAnimation() {
        this.isAnimating = false;
        this.activeParticles.forEach(particle => {
            this.deactivateParticle(particle);
        });
    }

    destroy() {
        this.stopAnimation();
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }
}

// ============================================
// 2. ANIMATION PERFORMANCE MANAGER
// ============================================

class AnimationPerformanceManager {
    constructor() {
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.deviceCapability = this.assessDeviceCapability();
        this.activeAnimations = new Set();
        this.performanceMode = this.determinePerformanceMode();

        this.init();
    }

    init() {
        this.setupReducedMotionListener();
        this.optimizeExistingAnimations();
        this.setupPerformanceMonitoring();
    }

    assessDeviceCapability() {
        const capability = {
            memory: navigator.deviceMemory || 4,
            cores: navigator.hardwareConcurrency || 4,
            connection: navigator.connection?.effectiveType || '4g',
            isMobile: window.innerWidth <= 768
        };

        // Calculate performance score
        let score = 0;
        if (capability.memory >= 8) score += 3;
        else if (capability.memory >= 4) score += 2;
        else score += 1;

        if (capability.cores >= 8) score += 3;
        else if (capability.cores >= 4) score += 2;
        else score += 1;

        if (['4g', 'slow-2g'].includes(capability.connection)) score += 1;
        else score += 2;

        if (!capability.isMobile) score += 1;

        return { ...capability, score };
    }

    determinePerformanceMode() {
        if (this.reducedMotion) return 'minimal';
        if (this.deviceCapability.score <= 4) return 'reduced';
        if (this.deviceCapability.score <= 7) return 'standard';
        return 'enhanced';
    }

    setupReducedMotionListener() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', (e) => {
            this.reducedMotion = e.matches;
            this.updateAnimationMode();
        });
    }

    optimizeExistingAnimations() {
        // Optimize article cards
        const articleCards = document.querySelectorAll('.article-card');
        articleCards.forEach(card => {
            this.optimizeCardAnimation(card);
        });

        // Optimize floating elements
        const floatingElements = document.querySelectorAll('.ai-agent, .floating-chip');
        floatingElements.forEach(element => {
            this.optimizeFloatingAnimation(element);
        });

        // Handle welcome overlay
        this.optimizeWelcomeOverlay();
    }

    optimizeCardAnimation(card) {
        if (this.performanceMode === 'minimal') {
            card.style.transition = 'none';
            card.style.transform = 'none';
            return;
        }

        // Use efficient transforms
        card.style.cssText += `
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
            transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        `;

        // Optimize hover effects
        card.addEventListener('mouseenter', () => {
            if (this.performanceMode !== 'minimal') {
                requestAnimationFrame(() => {
                    card.style.transform = 'translate3d(0, -8px, 0) scale(1.02)';
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (this.performanceMode !== 'minimal') {
                requestAnimationFrame(() => {
                    card.style.transform = 'translate3d(0, 0, 0) scale(1)';
                });
            }
        });
    }

    optimizeFloatingAnimation(element) {
        if (this.performanceMode === 'minimal' || this.performanceMode === 'reduced') {
            element.style.animation = 'none';
            element.style.position = 'static';
            element.style.display = 'none';
            return;
        }

        // Use more efficient animation
        element.style.cssText += `
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
        `;
    }

    optimizeWelcomeOverlay() {
        const welcomeOverlay = document.getElementById('welcomeOverlay');
        if (!welcomeOverlay) return;

        if (this.performanceMode === 'minimal') {
            // Skip animation, show content immediately
            welcomeOverlay.style.animation = 'none';
            welcomeOverlay.style.opacity = '1';
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 1000);
        }
    }

    setupPerformanceMonitoring() {
        if (!('PerformanceObserver' in window)) return;

        // Monitor animation frame drops
        let frameCount = 0;
        let lastTime = performance.now();

        const checkFrameRate = () => {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

                if (fps < 30 && this.performanceMode === 'enhanced') {
                    console.warn('Low FPS detected, reducing animation complexity');
                    this.performanceMode = 'standard';
                    this.updateAnimationMode();
                }

                frameCount = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(checkFrameRate);
        };

        requestAnimationFrame(checkFrameRate);
    }

    updateAnimationMode() {
        // Re-evaluate all animations based on current performance mode
        this.optimizeExistingAnimations();
    }
}

// ============================================
// 3. LAZY LOADING MANAGER
// ============================================

class LazyLoadManager {
    constructor() {
        this.imageObserver = null;
        this.contentObserver = null;
        this.loadedImages = new Set();

        this.init();
    }

    init() {
        this.setupImageLazyLoading();
        this.setupContentLazyLoading();
    }

    setupImageLazyLoading() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            this.loadAllImages();
            return;
        }

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    setupContentLazyLoading() {
        this.contentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadContent(entry.target);
                    this.contentObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });

        // Observe article cards for content loading
        document.querySelectorAll('.article-card[data-lazy]').forEach(card => {
            this.contentObserver.observe(card);
        });
    }

    loadImage(img) {
        if (this.loadedImages.has(img)) return;

        const src = img.getAttribute('data-src');
        if (!src) return;

        // Create new image to preload
        const newImg = new Image();
        newImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            this.loadedImages.add(img);
        };

        newImg.onerror = () => {
            img.classList.add('error');
        };

        newImg.src = src;
    }

    loadContent(element) {
        // Load any heavy content for the element
        const particles = element.querySelector('.card-particles');
        if (particles) {
            // Initialize particle animation only when needed
            particles.classList.add('active');
        }
    }

    loadAllImages() {
        // Fallback: load all images immediately
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    }
}

// ============================================
// 4. MEMORY MANAGEMENT
// ============================================

class MemoryManager {
    constructor() {
        this.cleanupInterval = null;
        this.memoryThreshold = 50 * 1024 * 1024; // 50MB
        this.cleanupTasks = [];

        this.init();
    }

    init() {
        this.setupMemoryMonitoring();
        this.setupCleanupTasks();
        this.scheduleCleanup();
    }

    setupMemoryMonitoring() {
        if (!performance.memory) return;

        // Check memory usage every 30 seconds
        setInterval(() => {
            const memoryUsage = performance.memory.usedJSHeapSize;

            if (memoryUsage > this.memoryThreshold) {
                console.warn('High memory usage detected:', memoryUsage / 1024 / 1024, 'MB');
                this.performCleanup();
            }
        }, 30000);
    }

    setupCleanupTasks() {
        // Clean up unused event listeners
        this.cleanupTasks.push(() => {
            // Remove old particle elements
            const oldParticles = document.querySelectorAll('.particle:not(.active)');
            oldParticles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
        });

        // Clean up animation references
        this.cleanupTasks.push(() => {
            // Force garbage collection of completed animations
            if (window.gc && typeof window.gc === 'function') {
                window.gc();
            }
        });
    }

    scheduleCleanup() {
        // Run cleanup every 5 minutes
        this.cleanupInterval = setInterval(() => {
            this.performCleanup();
        }, 5 * 60 * 1000);
    }

    performCleanup() {
        this.cleanupTasks.forEach(task => {
            try {
                task();
            } catch (error) {
                console.warn('Cleanup task failed:', error);
            }
        });
    }

    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
}

// ============================================
// 5. TOUCH OPTIMIZATION
// ============================================

class TouchOptimizer {
    constructor() {
        this.touchStartTime = 0;
        this.touchThreshold = 10; // pixels
        this.tapTimeout = 300; // ms

        this.init();
    }

    init() {
        this.optimizeTouchTargets();
        this.setupFastClick();
        this.setupTouchFeedback();
    }

    optimizeTouchTargets() {
        // Ensure minimum touch target size
        const touchTargets = document.querySelectorAll('a, button, .article-card, .service-card');

        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();

            if (rect.width < 44 || rect.height < 44) {
                target.style.cssText += `
                    min-width: 44px;
                    min-height: 44px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                `;
            }
        });
    }

    setupFastClick() {
        // Custom fast click implementation
        document.addEventListener('touchstart', (e) => {
            this.touchStartTime = Date.now();
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - this.touchStartTime;

            if (touchDuration < this.tapTimeout) {
                const touch = e.changedTouches[0];
                const deltaX = Math.abs(touch.clientX - this.touchStartX);
                const deltaY = Math.abs(touch.clientY - this.touchStartY);

                if (deltaX < this.touchThreshold && deltaY < this.touchThreshold) {
                    // Fast click detected
                    const target = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (target && (target.tagName === 'A' || target.tagName === 'BUTTON')) {
                        e.preventDefault();
                        target.click();
                    }
                }
            }
        }, { passive: false });
    }

    setupTouchFeedback() {
        // Optimized touch feedback
        const interactiveElements = document.querySelectorAll('.article-card, .service-card, button, a');

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            }, { passive: true });

            element.addEventListener('touchend', () => {
                element.style.transform = '';
            }, { passive: true });
        });
    }
}

// ============================================
// 6. INITIALIZATION
// ============================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeOptimizations);
} else {
    initializeOptimizations();
}

function initializeOptimizations() {
    // Initialize all optimization modules
    const particleSystem = new OptimizedParticleSystem('welcomeParticles');
    const animationManager = new AnimationPerformanceManager();
    const lazyLoader = new LazyLoadManager();
    const memoryManager = new MemoryManager();
    const touchOptimizer = new TouchOptimizer();

    // Add optimized CSS keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes optimizedParticleFloat {
            0% {
                transform: translate3d(0, 0, 0) scale(0.8);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate3d(var(--random-x, 50px), -100vh, 0) scale(1.2);
                opacity: 0;
            }
        }

        .optimized-particle {
            contain: layout style paint;
        }

        .article-card.optimized {
            contain: layout style paint;
            will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
            .optimized-particle,
            .ai-agent,
            .floating-chip {
                animation: none !important;
                transform: none !important;
            }
        }

        @media (max-width: 768px) {
            .optimized-particle {
                display: none;
            }

            .article-card {
                transition: transform 0.2s ease;
            }
        }
    `;
    document.head.appendChild(style);

    // Performance monitoring
    if (window.performance && window.performance.mark) {
        window.performance.mark('optimizations-loaded');
    }

    console.log('🚀 JufipAI Performance Optimizations Loaded');
    console.log('📊 Device Capability Score:', animationManager.deviceCapability.score);
    console.log('🎯 Performance Mode:', animationManager.performanceMode);
}

// Export for testing and debugging
window.JufipAIOptimizations = {
    OptimizedParticleSystem,
    AnimationPerformanceManager,
    LazyLoadManager,
    MemoryManager,
    TouchOptimizer
};