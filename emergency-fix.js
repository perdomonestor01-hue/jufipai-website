// Emergency Fix for Stuck Loading/Welcome Screens
// This script forcibly removes blocking overlays after a short delay

(function() {
    'use strict';

    // Function to remove all blocking overlays
    function removeBlockingOverlays() {
        console.log('🚨 Emergency fix: Removing blocking overlays...');

        // Remove loading screen
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
            loadingScreen.remove();
            console.log('✅ Loading screen removed');
        }

        // Remove welcome overlay
        const welcomeOverlay = document.getElementById('welcomeOverlay');
        if (welcomeOverlay) {
            welcomeOverlay.style.display = 'none';
            welcomeOverlay.remove();
            console.log('✅ Welcome overlay removed');
        }

        // Remove customer welcome overlay
        const customerWelcomeOverlay = document.getElementById('customerWelcomeOverlay');
        if (customerWelcomeOverlay) {
            customerWelcomeOverlay.style.display = 'none';
            customerWelcomeOverlay.remove();
            console.log('✅ Customer welcome overlay removed');
        }

        // Remove any other overlays with high z-index
        const allOverlays = document.querySelectorAll('.loading, .welcome-overlay, .customer-welcome-overlay');
        allOverlays.forEach(overlay => {
            overlay.style.display = 'none';
            overlay.remove();
        });

        // Ensure body is visible and scrollable
        document.body.style.overflow = 'auto';
        document.body.style.position = 'relative';
        document.documentElement.style.overflow = 'auto';

        console.log('🎉 All blocking overlays removed - website should be accessible now');
    }

    // Try to remove overlays immediately
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        removeBlockingOverlays();
    }

    // Also try when DOM is ready
    document.addEventListener('DOMContentLoaded', removeBlockingOverlays);

    // Fallback: Force remove after 2 seconds
    setTimeout(removeBlockingOverlays, 2000);

    // Nuclear option: Force remove after 5 seconds
    setTimeout(function() {
        removeBlockingOverlays();
        // Also hide anything with very high z-index
        const highZIndexElements = document.querySelectorAll('*');
        highZIndexElements.forEach(el => {
            const zIndex = window.getComputedStyle(el).zIndex;
            if (zIndex && parseInt(zIndex) > 9000) {
                el.style.display = 'none';
                console.log('🔥 Removed high z-index element:', el);
            }
        });
    }, 5000);

})();