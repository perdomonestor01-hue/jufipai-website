/**
 * Service Worker Registration
 * Registers the SW only in production (not on localhost).
 */

export function registerServiceWorker(): void {
    if (!('serviceWorker' in navigator)) {
        console.log('[SW] Service workers not supported');
        return;
    }

    // Only register in production
    if (
        location.hostname === 'localhost' ||
        location.hostname === '127.0.0.1' ||
        location.hostname === '0.0.0.0'
    ) {
        console.log('[SW] Skipping registration on localhost');
        return;
    }

    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
            });
            console.log('[SW] Registered successfully, scope:', registration.scope);

            // Listen for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (!newWorker) return;

                newWorker.addEventListener('statechange', () => {
                    if (
                        newWorker.state === 'activated' &&
                        navigator.serviceWorker.controller
                    ) {
                        console.log('[SW] New version activated');
                    }
                });
            });
        } catch (error) {
            console.error('[SW] Registration failed:', error);
        }
    });
}
