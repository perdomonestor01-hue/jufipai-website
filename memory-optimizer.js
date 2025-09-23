// Memory Optimizer - Prevents memory leaks and reduces RAM usage
(function() {
    'use strict';

    console.log('🧹 Memory Optimizer: Initializing...');

    // 1. Stop all animations after page load
    setTimeout(function() {
        // Stop all CSS animations on hidden elements
        const hiddenElements = document.querySelectorAll('.loading, .welcome-overlay, .customer-welcome-overlay');
        hiddenElements.forEach(el => {
            if (el) {
                el.style.animation = 'none';
                el.style.transition = 'none';
            }
        });

        // Stop particle animations if page is hidden
        if (document.hidden) {
            const particles = document.getElementById('particles');
            if (particles) particles.style.display = 'none';
        }

        console.log('✅ Stopped unnecessary animations');
    }, 10000); // After 10 seconds

    // 2. Clear unused event listeners
    const cleanupEventListeners = () => {
        // Remove scroll listeners on hidden elements
        const elements = document.querySelectorAll('.progressive-load.loaded');
        elements.forEach(el => {
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
        });
    };

    // 3. Garbage collection helper
    const forceGarbageCollection = () => {
        // Clear any stored data
        if (window.performanceData) {
            delete window.performanceData;
        }

        // Clear animation frames
        if (window.animationFrameId) {
            cancelAnimationFrame(window.animationFrameId);
        }

        // Clear intervals and timeouts
        const highestId = setTimeout(() => {}, 0);
        for (let i = highestId; i >= 0; i--) {
            clearTimeout(i);
            clearInterval(i);
        }

        console.log('🗑️ Forced garbage collection');
    };

    // 4. Reduce animation frame rate on low performance
    if (window.performanceMode === 'low') {
        const originalRAF = window.requestAnimationFrame;
        let skipFrame = false;
        window.requestAnimationFrame = function(callback) {
            if (skipFrame) {
                skipFrame = false;
                return originalRAF(callback);
            } else {
                skipFrame = true;
                return 0;
            }
        };
        console.log('⚡ Reduced animation frame rate for low performance mode');
    }

    // 5. Clean up on page hide
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Stop all animations
            document.querySelectorAll('*').forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.animationName !== 'none') {
                    el.style.animationPlayState = 'paused';
                }
            });

            // Clear particles
            const particles = document.getElementById('particles');
            if (particles) particles.innerHTML = '';

            console.log('💤 Page hidden - paused animations');
        }
    });

    // 6. Limit particle count
    const limitParticles = () => {
        const particles = document.getElementById('particles');
        if (particles && particles.children.length > 20) {
            while (particles.children.length > 20) {
                particles.removeChild(particles.firstChild);
            }
            console.log('🎯 Limited particle count to 20');
        }
    };

    // 7. Clean up large scripts after initialization
    setTimeout(() => {
        // Remove performance test script if it exists
        const perfTest = document.querySelector('script[src*="performance-test.js"]');
        if (perfTest) perfTest.remove();

        // Clear any test data
        if (window.performanceTestData) {
            delete window.performanceTestData;
        }

        cleanupEventListeners();
        forceGarbageCollection();
        limitParticles();

        console.log('✨ Memory optimization complete');
    }, 15000); // After 15 seconds

    // 8. Prevent memory leaks from setInterval
    const originalSetInterval = window.setInterval;
    const intervals = new Set();
    window.setInterval = function(fn, delay) {
        const id = originalSetInterval(fn, delay);
        intervals.add(id);
        if (intervals.size > 10) {
            console.warn('⚠️ Too many intervals running, clearing oldest');
            const firstInterval = intervals.values().next().value;
            clearInterval(firstInterval);
            intervals.delete(firstInterval);
        }
        return id;
    };

    // 9. Monitor memory usage (if available)
    if (performance.memory) {
        setInterval(() => {
            const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
            const limit = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
            const percent = Math.round((used / limit) * 100);

            if (percent > 80) {
                console.warn(`⚠️ High memory usage: ${used}MB / ${limit}MB (${percent}%)`);
                forceGarbageCollection();
            }
        }, 30000); // Check every 30 seconds
    }

    console.log('✅ Memory Optimizer: Active');
})();