// Service Worker for Park Passport Finder PWA
const CACHE_NAME = 'nps-stamps-v1';
const RUNTIME = 'runtime';

// Resources to cache immediately
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/data.js',
  '/park-sticker-mapping-complete.js',
  '/manifest.json',
  '/images/stamps/2024-stamps.jpg',
  '/images/stamps/2023-stamps.jpg'
];

// Install event - cache essential resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching essential resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        console.log('Service Worker: Deleting old cache', cacheToDelete);
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle different types of requests
  if (event.request.destination === 'document') {
    // HTML requests - network first, cache fallback
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else if (event.request.destination === 'image') {
    // Image requests - cache first, network fallback
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(response => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(RUNTIME).then(cache => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          });
        })
        .catch(() => {
          // Return offline fallback image if available
          return caches.match('/icons/offline-image.png');
        })
    );
  } else {
    // Other requests - cache first, network fallback
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request).then(response => {
            const responseClone = response.clone();
            caches.open(RUNTIME).then(cache => {
              cache.put(event.request, responseClone);
            });
            return response;
          });
        })
    );
  }
});

// Background sync for data updates
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Service Worker: Background sync triggered');
  // Could update stamp data or user preferences here
}

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New national park stamps available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore New Stamps',
        icon: '/icons/action-explore.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/action-close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Park Passport Finder', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close notification
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle app installation
self.addEventListener('appinstalled', event => {
  console.log('PWA: App was installed');
});

// Network status handling
self.addEventListener('online', () => {
  console.log('PWA: Back online');
});

self.addEventListener('offline', () => {
  console.log('PWA: Gone offline');
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'stamps-update') {
    event.waitUntil(updateStampsData());
  }
});

async function updateStampsData() {
  try {
    const response = await fetch('/data.js');
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put('/data.js', response);
      console.log('Service Worker: Stamps data updated');
    }
  } catch (error) {
    console.log('Service Worker: Failed to update stamps data', error);
  }
}