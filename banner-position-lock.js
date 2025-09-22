// Banner Position Lock Script
// This script ensures the banner stays in fixed position and doesn't drift
(function() {
    'use strict';
    
    // Function to lock banner position
    function lockBannerPosition() {
        const banner = document.querySelector('.sticky-cta');
        if (banner) {
            // Force fixed positioning
            banner.style.position = 'fixed';
            banner.style.bottom = '20px';
            banner.style.left = '50%';
            banner.style.transform = 'translateX(-50%)';
            banner.style.zIndex = '9999';
            
            // Prevent any style changes
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        // Reapply our styles if they change
                        banner.style.position = 'fixed';
                        banner.style.bottom = '20px';
                        banner.style.left = '50%';
                        banner.style.transform = 'translateX(-50%)';
                        banner.style.zIndex = '9999';
                    }
                });
            });
            
            // Start observing
            observer.observe(banner, {
                attributes: true,
                attributeFilter: ['style']
            });
        }
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', lockBannerPosition);
    } else {
        lockBannerPosition();
    }
    
    // Also run after a delay to catch any late changes
    setTimeout(lockBannerPosition, 1000);
    setTimeout(lockBannerPosition, 3000);
    
    // Monitor for scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(lockBannerPosition, 100);
    });
})();