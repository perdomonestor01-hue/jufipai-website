// Banner Position Lock Script - ABSOLUTE CENTER ENFORCEMENT
// This script ensures the banner stays perfectly centered and never drifts
(function() {
    'use strict';

    // Function to lock banner in absolute center
    function lockBannerPosition() {
        const banner = document.querySelector('.sticky-cta, #stickyCTA');
        if (banner) {
            // FORCE ABSOLUTE CENTER - Using auto margins method
            // This is the most reliable way to center a fixed element
            banner.style.cssText = `
                position: fixed !important;
                bottom: 20px !important;
                left: 0 !important;
                right: 0 !important;
                margin-left: auto !important;
                margin-right: auto !important;
                width: fit-content !important;
                max-width: 600px !important;
                transform: none !important;
                translate: none !important;
                z-index: 9999 !important;
            `;

            // Remove any conflicting classes or attributes
            banner.removeAttribute('data-aos');
            banner.classList.remove('aos-animate');

            // Prevent any style changes with aggressive observer
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        // Immediately reapply centered styles
                        banner.style.cssText = `
                            position: fixed !important;
                            bottom: 20px !important;
                            left: 0 !important;
                            right: 0 !important;
                            margin-left: auto !important;
                            margin-right: auto !important;
                            width: fit-content !important;
                            max-width: 600px !important;
                            transform: none !important;
                            translate: none !important;
                            z-index: 9999 !important;
                        `;
                    }
                });
            });

            // Start observing with aggressive settings
            observer.observe(banner, {
                attributes: true,
                attributeFilter: ['style', 'class'],
                attributeOldValue: true
            });
        }
    }

    // Force centering function - runs continuously
    function forceCenterBanner() {
        const banner = document.querySelector('.sticky-cta, #stickyCTA');
        if (banner) {
            // Check if banner is drifting
            const rect = banner.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const centerX = windowWidth / 2;
            const bannerCenterX = rect.left + (rect.width / 2);

            // If banner is not centered (more than 5px off), force center it
            if (Math.abs(bannerCenterX - centerX) > 5) {
                console.log('Banner drift detected - forcing center');
                lockBannerPosition();
            }
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', lockBannerPosition);
    } else {
        lockBannerPosition();
    }

    // Run multiple times to ensure it catches all initialization phases
    setTimeout(lockBannerPosition, 100);
    setTimeout(lockBannerPosition, 500);
    setTimeout(lockBannerPosition, 1000);
    setTimeout(lockBannerPosition, 2000);
    setTimeout(lockBannerPosition, 3000);

    // Monitor for scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(forceCenterBanner, 50);
    });

    // Monitor for resize events
    window.addEventListener('resize', function() {
        lockBannerPosition();
    });

    // Continuous monitoring - check every second
    setInterval(forceCenterBanner, 1000);

    // Override any animation libraries that might affect positioning
    window.addEventListener('load', function() {
        lockBannerPosition();
        // Disable AOS (Animate On Scroll) for the banner if it exists
        if (typeof AOS !== 'undefined') {
            const banner = document.querySelector('.sticky-cta, #stickyCTA');
            if (banner) {
                banner.setAttribute('data-aos', 'none');
            }
        }
    });
})();