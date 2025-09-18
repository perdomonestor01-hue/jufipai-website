// ULTRA-AGGRESSIVE BANNER POSITION LOCK - JavaScript-based drift annihilation
// This script uses brute force methods to eliminate ALL banner drift

(function() {
    'use strict';

    // Configuration
    const BANNER_ID = 'stickyCTA';
    const CHECK_INTERVAL = 50; // Check every 50ms (more aggressive)
    const POSITION_TOLERANCE = 2; // Allow only 2px deviation before correction

    // Inject ultra-aggressive CSS directly via JavaScript
    function injectUltraAggressiveCSS() {
        const style = document.createElement('style');
        style.setAttribute('data-banner-fix', 'ultra-aggressive');
        style.innerHTML = `
            .sticky-cta, #stickyCTA, *[id="stickyCTA"], *[class*="sticky-cta"] {
                transform: translateX(-50%) !important;
                left: 50% !important;
                margin-left: 0px !important;
                margin-right: 0px !important;
                will-change: auto !important;
                position: fixed !important;
                bottom: 20px !important;
            }

            /* Override ALL hover states */
            .sticky-cta:hover, #stickyCTA:hover {
                transform: translateX(-50%) translateY(-2px) !important;
                left: 50% !important;
                margin-left: 0px !important;
                margin-right: 0px !important;
                will-change: auto !important;
            }

            /* Override ALL animation states */
            .sticky-cta, .sticky-cta:hover, .sticky-cta:active, .sticky-cta.hidden {
                margin-left: 0px !important;
                margin-right: 0px !important;
                will-change: auto !important;
            }
        `;
        document.head.appendChild(style);
        console.log('🔥 Ultra-aggressive CSS injected directly into DOM');
    }
    
    let banner = null;
    let observer = null;
    let intervalId = null;
    let isLocked = false;
    
    // Calculate perfect center position
    function getExpectedPosition() {
        const viewportWidth = window.innerWidth;
        const bannerWidth = banner ? banner.offsetWidth : 0;
        return (viewportWidth / 2) - (bannerWidth / 2);
    }
    
    // Force banner to correct position
    function lockBannerPosition() {
        if (!banner || isLocked) return;
        
        isLocked = true;
        
        try {
            // Get current computed styles
            const computedStyle = window.getComputedStyle(banner);
            const currentLeft = banner.getBoundingClientRect().left;
            const expectedLeft = getExpectedPosition();
            
            // Check if banner has drifted
            if (Math.abs(currentLeft - expectedLeft) > POSITION_TOLERANCE) {
                console.log('🔧 Banner drift detected, correcting position...');
                
                // Apply ULTRA-NUCLEAR CSS override directly via JavaScript
                const criticalStyles = {
                    'position': 'fixed',
                    'left': '50%',
                    'transform': 'translateX(-50%)',
                    'margin-left': '0px',
                    'margin-right': '0px',
                    'margin-top': '0px',
                    'margin-bottom': '0px',
                    'margin': '0px',
                    'will-change': 'auto',
                    'right': 'auto',
                    'bottom': '20px'
                };

                // Apply each style with highest priority MULTIPLE TIMES
                Object.entries(criticalStyles).forEach(([property, value]) => {
                    banner.style.setProperty(property, value, 'important');
                    // Force it again with different methods
                    banner.style[property] = value;
                    banner.style.cssText += `${property}: ${value} !important;`;
                });

                // BRUTE FORCE: Remove all conflicting attributes
                banner.removeAttribute('style');
                Object.entries(criticalStyles).forEach(([property, value]) => {
                    banner.style.setProperty(property, value, 'important');
                });
                
                // Force reflow
                void banner.offsetHeight;
                
                console.log('✅ Banner position corrected');
            }
        } catch (error) {
            console.warn('Banner position lock error:', error);
        } finally {
            isLocked = false;
        }
    }
    
    // Initialize position monitoring
    function initializePositionLock() {
        // FIRST: Inject ultra-aggressive CSS
        injectUltraAggressiveCSS();

        banner = document.getElementById(BANNER_ID);

        if (!banner) {
            console.warn('Banner element not found, retrying...');
            setTimeout(initializePositionLock, 500);
            return;
        }

        console.log('🔒 Ultra-aggressive banner position lock initialized');
        
        // Initial position lock
        lockBannerPosition();
        
        // Continuous monitoring
        intervalId = setInterval(lockBannerPosition, CHECK_INTERVAL);
        
        // Monitor for DOM changes that might affect position
        if (window.MutationObserver) {
            observer = new MutationObserver(function(mutations) {
                let shouldCheck = false;
                
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && 
                        mutation.target === banner &&
                        (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                        shouldCheck = true;
                    }
                });
                
                if (shouldCheck) {
                    setTimeout(lockBannerPosition, 10);
                }
            });
            
            observer.observe(banner, {
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }
        
        // Monitor window resize
        window.addEventListener('resize', function() {
            setTimeout(lockBannerPosition, 100);
        });
        
        // Monitor scroll events that might trigger repositioning
        window.addEventListener('scroll', function() {
            setTimeout(lockBannerPosition, 50);
        }, { passive: true });
        
        // Monitor for dynamic style changes
        const originalSetProperty = banner.style.setProperty;
        banner.style.setProperty = function(property, value, priority) {
            const result = originalSetProperty.call(this, property, value, priority);
            
            // If someone tries to change positioning properties, immediately correct
            if (['left', 'transform', 'margin-left', 'margin-right', 'will-change'].includes(property)) {
                setTimeout(lockBannerPosition, 0);
            }
            
            return result;
        };
    }
    
    // Cleanup function
    function cleanup() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        
        console.log('🔓 Banner position lock cleanup completed');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePositionLock);
    } else {
        initializePositionLock();
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
    
    // Expose global function for manual correction
    window.fixBannerPosition = lockBannerPosition;
    
    // Debug function
    window.debugBannerPosition = function() {
        if (!banner) {
            console.log('Banner not found');
            return;
        }
        
        const rect = banner.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(banner);
        
        console.log('Banner Debug Info:', {
            'Current Left': rect.left + 'px',
            'Expected Left': getExpectedPosition() + 'px',
            'Computed Transform': computedStyle.transform,
            'Computed Left': computedStyle.left,
            'Computed Margin-Left': computedStyle.marginLeft,
            'Computed Will-Change': computedStyle.willChange,
            'Banner Width': banner.offsetWidth + 'px',
            'Viewport Width': window.innerWidth + 'px'
        });
    };
    
    console.log('🚀 Banner Position Lock script loaded');
})();