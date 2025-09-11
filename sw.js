/**
 * JufipAI Service Worker for Performance Optimization
 * Implements caching strategies for better Core Web Vitals
 */

const CACHE_NAME = 'jufipai-v1.0.4';
const OFFLINE_URL = '/';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
    '/',
    '/styles.css',
    '/script.js',
    '/favicon.svg',
    '/manifest.json'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CRITICAL_RESOURCES);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - implement cache-first strategy for static assets
self.addEventListener('fetch', event => {
    const { request } = event;
    
    // Only handle GET requests
    if (request.method !== 'GET') return;
    
    // Skip cross-origin requests
    if (!request.url.startsWith(self.location.origin)) return;
    
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            
            return fetch(request).then(response => {
                // Cache successful responses
                if (response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseToCache);
                    });
                }
                return response;
            }).catch(() => {
                // Return offline fallback for navigation requests
                if (request.mode === 'navigate') {
                    return caches.match(OFFLINE_URL);
                }
            });
        })
    );
});

// Background sync for form submissions (future enhancement)
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        event.waitUntil(
            // Handle offline form submissions
            handleOfflineFormSubmission()
        );
    }
});

// Handle offline form submissions
async function handleOfflineFormSubmission() {
    // Implementation for future enhancement
    return Promise.resolve();
}