
const CACHE_NAME = 'motivmove-v1';
const STATIC_CACHE = 'motivmove-static-v1';

const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event - stale while revalidate strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.match(event.request)
          .then((response) => {
            if (response) {
              // Return cached version and update in background
              fetch(event.request)
                .then((fetchResponse) => {
                  cache.put(event.request, fetchResponse.clone());
                });
              return response;
            }
            // Not in cache, fetch from network
            return fetch(event.request)
              .then((fetchResponse) => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
              });
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'exercise-sync') {
    event.waitUntil(syncExerciseData());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Time for a healthy stretch break!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    actions: [
      {
        action: 'do-now',
        title: 'Do Now'
      },
      {
        action: 'remind-later',
        title: 'Remind Later'
      }
    ],
    tag: 'exercise-reminder',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification('MotivMove Reminder', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'do-now') {
    event.waitUntil(
      clients.openWindow('/?action=exercise')
    );
  } else if (event.action === 'remind-later') {
    // Schedule another notification in 30 minutes
    setTimeout(() => {
      self.registration.showNotification('MotivMove Reminder', {
        body: 'Ready for that stretch break now?',
        icon: '/icon-192.png'
      });
    }, 30 * 60 * 1000);
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

async function syncExerciseData() {
  // Sync offline exercise completions when online
  console.log('Syncing exercise data...');
}
