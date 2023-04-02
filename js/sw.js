const CACHE_NAME = 'cv-cache-v1';
const OFFLINE_PAGE_URL = '../offline.html';

// Cache the offline page on service worker installation
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.add(OFFLINE_PAGE_URL);
        })
    );
});

// Intercept network requests and serve cached responses
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // If the response is in the cache, return it
            if (response) {
                return response;
            }
            // If the response is not in the cache, fetch it from the network
            return fetch(event.request).then(networkResponse => {
                // If the network response is successful, cache it and return it
                if (networkResponse.ok) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    return networkResponse;
                }
                // If the network response is not successful, return the offline page
                return caches.match(OFFLINE_PAGE_URL);
            })
                .catch(() => {
                    // If fetching from the network fails, return the offline page
                    return caches.match(OFFLINE_PAGE_URL);
                });
        })
    );
});



