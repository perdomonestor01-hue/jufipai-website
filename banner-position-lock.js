// BANNER POSITION LOCK - JavaScript-based drift prevention
// This script ensures the banner stays perfectly centered regardless of CSS conflicts

(function() {
    'use strict';
    
    // Configuration
    const BANNER_ID = 'stickyCTA';
    const CHECK_INTERVAL = 100; // Check every 100ms
    const POSITION_TOLERANCE = 5; // Allow 5px deviation before correction
    
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
                
                // Apply nuclear CSS override directly via JavaScript
                const criticalStyles = {
                    'position': 'fixed',
                    'left': '50%',
                    'transform': 'translateX(-50%)',
                    'margin-left': '0',
                    'margin-right': '0',
                    'will-change': 'auto',
                    'right': 'auto'
                };
                
                // Apply each style with highest priority
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
        banner = document.getElementById(BANNER_ID);
        
        if (!banner) {
            console.warn('Banner element not found, retrying...');
            setTimeout(initializePositionLock, 500);
            return;
        }
        
        console.log('🔒 Banner position lock initialized');
        
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