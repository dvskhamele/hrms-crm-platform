// Basic service worker for PWA functionality
const CACHE_NAME = 'gem-pwa-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Handle push notifications
self.addEventListener('push', function(event) {
  console.log('Received a push notification', event);
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});