/* 🚀 JUFIPAI PERFORMANCE BOOST SCRIPT
   Lightweight JavaScript optimizations for dramatic speed improvements
   
   FEATURES:
   - Device capability detection
   - Smart animation management
   - Memory leak prevention
   - Progressive loading
   - Battery optimization
   - Real-time performance monitoring
*/

(function() {
    'use strict';
    
    // Performance configuration
    const PERF_CONFIG = {
        maxParticles: {
            low: 0,
            medium: 10,
            high: 20
        },
        animationQuality: {
            low: 'reduced',
            medium: 'standard', 
            high: 'enhanced'
        },
        enableAnalytics: true,
        debugMode: false
    };
    
    // Device capability assessment
    class DeviceCapability {
        constructor() {
            this.memory = navigator.deviceMemory || 4;
            this.cores = navigator.hardwareConcurrency || 4;
            this.connection = navigator.connection?.effectiveType || '4g';
            this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            this.isLowEnd = this.memory < 2 || this.cores < 4 || this.connection === 'slow-2g';
            
            this.mode = this.calculatePerformanceMode();
            this.applyPerformanceMode();
        }
        
        calculatePerformanceMode() {
            if (this.isMobile || this.isLowEnd) {
                return 'low';
            } else if (this.memory < 4 || this.cores < 8) {
                return 'medium';
            }
            return 'high';
        }
        
        applyPerformanceMode() {
            document.documentElement.classList.add(`${this.mode}-performance`);
            
            if (PERF_CONFIG.debugMode) {
                console.log('🚀 Performance Mode:', this.mode, {
                    memory: this.memory,
                    cores: this.cores,
                    connection: this.connection,
                    mobile: this.isMobile
                });
            }
        }
    }
    
    // Animation Manager - Controls animation complexity based on device
    class AnimationManager {
        constructor(deviceCapability) {
            this.device = deviceCapability;
            this.activeAnimations = new Set();
            this.animationBudget = this.device.mode === 'low' ? 5 : 
                                  this.device.mode === 'medium' ? 15 : 30;
            this.init();
        }
        
        init() {
            // Disable heavy animations on low-end devices
            if (this.device.mode === 'low') {
                this.disableHeavyAnimations();
            }
            
            // Monitor animation performance
            this.setupAnimationMonitoring();
            
            // Handle visibility changes for battery optimization
            this.setupVisibilityHandler();
        }
        
        disableHeavyAnimations() {
            const heavyElements = [
                '.particles',
                '.welcome-particles', 
                '.floating-chip',
                '.card-particles',
                '.ai-agent'
            ];
            
            heavyElements.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.display = 'none';
                    el.setAttribute('aria-hidden', 'true');
                });
            });
        }
        
        setupAnimationMonitoring() {
            // Monitor frame rate and pause animations if performance drops
            let frameCount = 0;
            let lastTime = performance.now();
            
            const checkPerformance = () => {
                frameCount++;
                const currentTime = performance.now();
                
                if (currentTime - lastTime >= 1000) {
                    const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                    
                    if (fps < 30 && this.device.mode !== 'low') {
                        this.degradeAnimations();
                    }
                    
                    frameCount = 0;
                    lastTime = currentTime;
                }
                
                requestAnimationFrame(checkPerformance);
            };
            
            requestAnimationFrame(checkPerformance);
        }
        
        degradeAnimations() {
            // Reduce animation complexity if performance drops
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                if (index % 2 === 0) {
                    particle.style.display = 'none';
                }
            });
            
            if (PERF_CONFIG.debugMode) {
                console.log('🚀 Degrading animations due to low FPS');
            }
        }
        
        setupVisibilityHandler() {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.pauseAllAnimations();
                } else {
                    this.resumeAllAnimations();
                }
            });
        }
        
        pauseAllAnimations() {
            const animatedElements = document.querySelectorAll('*[style*="animation"]');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
            document.body.classList.add('page-hidden');
        }
        
        resumeAllAnimations() {
            const animatedElements = document.querySelectorAll('*[style*="animation"]');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
            document.body.classList.remove('page-hidden');
        }
    }
    
    // Memory Manager - Prevents memory leaks and optimizes usage
    class MemoryManager {
        constructor() {
            this.observers = new Set();
            this.timers = new Set();
            this.eventListeners = new Map();
            this.init();
        }
        
        init() {
            // Clean up when page unloads
            window.addEventListener('beforeunload', () => {
                this.cleanup();
            });
            
            // Monitor memory usage
            this.monitorMemory();
        }
        
        addObserver(observer) {
            this.observers.add(observer);
        }
        
        addTimer(timerId) {
            this.timers.add(timerId);
        }
        
        addEventListener(element, event, handler) {
            const key = `${element.tagName}-${event}`;
            this.eventListeners.set(key, { element, event, handler });
            element.addEventListener(event, handler);
        }
        
        cleanup() {
            // Clean up observers
            this.observers.forEach(observer => {
                if (observer.disconnect) observer.disconnect();
            });
            
            // Clean up timers
            this.timers.forEach(timerId => {
                clearInterval(timerId);
                clearTimeout(timerId);
            });
            
            // Clean up event listeners
            this.eventListeners.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });
            
            if (PERF_CONFIG.debugMode) {
                console.log('🚀 Memory cleanup completed');
            }
        }
        
        monitorMemory() {
            if ('memory' in performance) {
                const checkMemory = () => {
                    const memory = performance.memory;
                    const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
                    const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
                    
                    if (usedMB > limitMB * 0.8) {
                        this.forceGarbageCollection();
                    }
                };
                
                setInterval(checkMemory, 30000); // Check every 30 seconds
            }
        }
        
        forceGarbageCollection() {
            // Remove unused elements
            const unusedElements = document.querySelectorAll('.removed, .hidden');
            unusedElements.forEach(el => {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
            
            if (PERF_CONFIG.debugMode) {
                console.log('🚀 Forced garbage collection');
            }
        }
    }
    
    // Progressive Loader - Lazy loads content and resources
    class ProgressiveLoader {
        constructor(memoryManager) {
            this.memoryManager = memoryManager;
            this.loadQueue = [];
            this.init();
        }
        
        init() {
            this.setupIntersectionObserver();
            this.setupImageLazyLoading();
        }
        
        setupIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadElement(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            // Observe elements marked for progressive loading
            document.querySelectorAll('.progressive-load').forEach(el => {
                observer.observe(el);
            });
            
            this.memoryManager.addObserver(observer);
        }
        
        loadElement(element) {
            element.classList.add('loaded');
            
            // Load any deferred content
            const deferredContent = element.dataset.deferredContent;
            if (deferredContent) {
                element.innerHTML = deferredContent;
            }
            
            // Trigger any deferred scripts
            const deferredScript = element.dataset.deferredScript;
            if (deferredScript) {
                this.loadScript(deferredScript);
            }
        }
        
        setupImageLazyLoading() {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
            
            this.memoryManager.addObserver(imageObserver);
        }
        
        loadScript(src) {
            if (this.loadQueue.includes(src)) return;
            
            this.loadQueue.push(src);
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            script.onload = () => {
                this.loadQueue = this.loadQueue.filter(url => url !== src);
            };
            document.head.appendChild(script);
        }
    }
    
    // Performance Monitor - Tracks and reports performance metrics
    class PerformanceMonitor {
        constructor() {
            this.metrics = new Map();
            this.init();
        }
        
        init() {
            this.setupPerformanceObserver();
            this.measureCoreWebVitals();
            this.reportMetrics();
        }
        
        setupPerformanceObserver() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        this.metrics.set(entry.name, {
                            duration: entry.duration,
                            startTime: entry.startTime,
                            type: entry.entryType
                        });
                    });
                });
                
                observer.observe({ entryTypes: ['measure', 'navigation'] });
            }
        }
        
        measureCoreWebVitals() {
            // Largest Contentful Paint
            if ('PerformanceObserver' in window) {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.set('LCP', Math.round(lastEntry.startTime));
                });
                
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            }
            
            // First Input Delay
            if ('PerformanceObserver' in window) {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        this.metrics.set('FID', Math.round(entry.processingStart - entry.startTime));
                    });
                });
                
                fidObserver.observe({ entryTypes: ['first-input'] });
            }
        }
        
        reportMetrics() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const metrics = {
                        loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                        DOMContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                        firstPaint: Math.round(perfData.loadEventStart - perfData.fetchStart),
                        LCP: this.metrics.get('LCP') || 'Not measured',
                        FID: this.metrics.get('FID') || 'Not measured'
                    };
                    
                    if (PERF_CONFIG.debugMode) {
                        console.log('🚀 JufipAI Performance Report:', metrics);
                    }
                    
                    // Report to analytics if enabled
                    if (PERF_CONFIG.enableAnalytics && window.gtag) {
                        gtag('event', 'performance_metrics', {
                            custom_map: metrics
                        });
                    }
                }, 1000);
            });
        }
    }
    
    // Initialize performance optimizations
    function initializePerformanceBoost() {
        // Device capability detection
        const deviceCapability = new DeviceCapability();
        
        // Memory management
        const memoryManager = new MemoryManager();
        
        // Animation optimization
        const animationManager = new AnimationManager(deviceCapability);
        
        // Progressive loading
        const progressiveLoader = new ProgressiveLoader(memoryManager);
        
        // Performance monitoring
        const performanceMonitor = new PerformanceMonitor();
        
        // Global performance utilities
        window.jufipaiPerf = {
            deviceMode: deviceCapability.mode,
            degradeAnimations: () => animationManager.degradeAnimations(),
            cleanup: () => memoryManager.cleanup(),
            metrics: () => performanceMonitor.metrics
        };
        
        if (PERF_CONFIG.debugMode) {
            console.log('🚀 JufipAI Performance Boost initialized');
            console.log('Device mode:', deviceCapability.mode);
        }
    }
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePerformanceBoost);
    } else {
        initializePerformanceBoost();
    }
    
    // Expose global utilities
    window.JufipaiPerformance = {
        init: initializePerformanceBoost,
        config: PERF_CONFIG
    };
    
})();