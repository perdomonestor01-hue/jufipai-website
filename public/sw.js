/**
 * JufipAI Service Worker
 * Caching strategies:
 * - Network-first for HTML (always try fresh, fall back to cache)
 * - Stale-while-revalidate for CSS, JS, images
 * - Cache-first for fonts and static assets
 */

const CACHE_VERSION = 'jufipai-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Assets to pre-cache on install
const PRE_CACHE_ASSETS = [
  '/',
  '/favicon.svg',
];

// --- Install: pre-cache essential assets ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRE_CACHE_ASSETS);
    })
  );
  // Activate immediately without waiting for old SW to finish
  self.skipWaiting();
});

// --- Activate: clean up old caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all open clients immediately
  self.clients.claim();
});

// --- Fetch: route requests to appropriate strategy ---
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin and GET requests
  if (request.method !== 'GET') return;

  // Skip caching for external API requests and analytics
  if (url.origin !== self.location.origin) return;

  // Route to appropriate strategy
  if (isHTMLRequest(request)) {
    event.respondWith(networkFirst(request));
  } else if (isFontRequest(url)) {
    event.respondWith(cacheFirst(request));
  } else if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

// --- Strategy: Network-first (HTML) ---
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;
    // If nothing in cache and offline, return a basic offline page
    return new Response('Offline - Please check your connection.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// --- Strategy: Stale-while-revalidate (CSS, JS, images) ---
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE);
        cache.then((c) => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(() => cachedResponse);

  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// --- Strategy: Cache-first (fonts, static assets) ---
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('', { status: 408 });
  }
}

// --- Request type detection helpers ---
function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html') || false;
}

function isFontRequest(url) {
  return (
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.ttf') ||
    url.pathname.endsWith('.otf')
  );
}

function isStaticAsset(url) {
  const staticExtensions = [
    '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.webp',
    '.svg', '.ico', '.avif',
  ];
  return staticExtensions.some((ext) => url.pathname.endsWith(ext));
}
