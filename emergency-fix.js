// NUCLEAR EMERGENCY FIX - Forcibly enables scrolling and removes ALL blocking elements
// This script runs immediately and repeatedly to ensure the website is always accessible

(function() {
    'use strict';

    console.log('🚨 NUCLEAR EMERGENCY FIX ACTIVATED - Forcing website accessibility...');

    // IMMEDIATE NUCLEAR SCROLL RESTORATION
    function nuclearScrollFix() {
        // Force enable scrolling on everything
        document.documentElement.style.setProperty('overflow', 'auto', 'important');
        document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
        document.documentElement.style.setProperty('overflow-x', 'hidden', 'important');
        document.documentElement.style.setProperty('position', 'relative', 'important');
        document.documentElement.style.setProperty('height', 'auto', 'important');

        document.body.style.setProperty('overflow', 'auto', 'important');
        document.body.style.setProperty('overflow-y', 'auto', 'important');
        document.body.style.setProperty('overflow-x', 'hidden', 'important');
        document.body.style.setProperty('position', 'relative', 'important');
        document.body.style.setProperty('height', 'auto', 'important');
        document.body.style.setProperty('min-height', '100vh', 'important');

        // Remove all classes that could block scrolling
        const badClasses = ['no-scroll', 'welcome-active', 'loading-active', 'frozen', 'locked', 'fixed-body'];
        badClasses.forEach(cls => {
            document.body.classList.remove(cls);
            document.documentElement.classList.remove(cls);
        });

        console.log('🔥 Nuclear scroll restoration applied');
    }

    // AGGRESSIVE OVERLAY REMOVAL
    function removeAllBlockingElements() {
        console.log('🚨 Removing ALL blocking elements...');

        // Remove by ID
        const blockingIds = [
            'loading', 'welcomeOverlay', 'customerWelcomeOverlay',
            'loadingScreen', 'splash', 'preloader', 'loader',
            'welcome-screen', 'intro-overlay', 'modal-overlay'
        ];

        blockingIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.setProperty('display', 'none', 'important');
                element.style.setProperty('visibility', 'hidden', 'important');
                element.style.setProperty('opacity', '0', 'important');
                element.remove();
                console.log(`✅ Removed element with ID: ${id}`);
            }
        });

        // Remove by class - more aggressive
        const blockingClasses = [
            '.loading', '.welcome-overlay', '.customer-welcome-overlay',
            '.loader', '.preloader', '.splash-screen', '.intro-overlay',
            '.modal-backdrop', '.overlay', '.popup-overlay', '.screen-overlay'
        ];

        blockingClasses.forEach(className => {
            const elements = document.querySelectorAll(className);
            elements.forEach(el => {
                el.style.setProperty('display', 'none', 'important');
                el.style.setProperty('visibility', 'hidden', 'important');
                el.style.setProperty('opacity', '0', 'important');
                el.remove();
            });
        });

        // Nuclear option: Remove ANY element with extremely high z-index
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            const zIndex = parseInt(computedStyle.zIndex);
            const position = computedStyle.position;

            // Remove elements that might be blocking
            if (zIndex > 1000 && (position === 'fixed' || position === 'absolute')) {
                const rect = el.getBoundingClientRect();
                // If it covers most of the screen, it's probably blocking
                if (rect.width > window.innerWidth * 0.8 && rect.height > window.innerHeight * 0.8) {
                    el.style.setProperty('display', 'none', 'important');
                    console.log('🔥 Removed potential blocking element:', el);
                }
            }
        });

        console.log('✅ All blocking elements removal completed');
    }

    // FORCE ENABLE INTERACTION
    function forceEnableInteraction() {
        // Remove pointer-events none from everything
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (window.getComputedStyle(el).pointerEvents === 'none') {
                // Only restore pointer events for non-decorative elements
                if (!el.classList.contains('particles') && !el.classList.contains('decoration')) {
                    el.style.setProperty('pointer-events', 'auto', 'important');
                }
            }
        });

        // Enable all forms of user interaction
        document.body.style.setProperty('user-select', 'auto', 'important');
        document.body.style.setProperty('pointer-events', 'auto', 'important');

        console.log('🔥 User interaction forcibly enabled');
    }

    // COMPREHENSIVE FIX FUNCTION
    function nuclearWebsiteFix() {
        nuclearScrollFix();
        removeAllBlockingElements();
        forceEnableInteraction();
        console.log('🎉 NUCLEAR FIX COMPLETE - Website should be fully accessible');
    }

    // RUN IMMEDIATELY - Don't wait for anything
    nuclearWebsiteFix();

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', nuclearWebsiteFix);
    }

    // Aggressive intervals - run every 500ms for first 10 seconds
    let fixCount = 0;
    const aggressiveInterval = setInterval(() => {
        nuclearWebsiteFix();
        fixCount++;
        if (fixCount >= 20) { // 10 seconds
            clearInterval(aggressiveInterval);
            console.log('🔥 Aggressive fix interval completed');
        }
    }, 500);

    // Fallback intervals
    setTimeout(nuclearWebsiteFix, 1000);
    setTimeout(nuclearWebsiteFix, 3000);
    setTimeout(nuclearWebsiteFix, 7000);
    setTimeout(nuclearWebsiteFix, 15000);

    // Watch for new elements being added
    if (window.MutationObserver) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Check if it's a potential blocking element
                        if (node.id && (node.id.includes('loading') || node.id.includes('overlay') || node.id.includes('welcome'))) {
                            setTimeout(() => {
                                node.style.setProperty('display', 'none', 'important');
                                node.remove();
                                console.log('🔥 Intercepted and removed blocking element:', node.id);
                            }, 100);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    console.log('🚨 NUCLEAR EMERGENCY FIX FULLY DEPLOYED AND MONITORING');

})();