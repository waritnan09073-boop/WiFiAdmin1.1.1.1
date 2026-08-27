const CACHE_NAME = "wifi-login-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./logo.PNG",
  "./manifest.json"
];


/* =========================
   ติดตั้ง Service Worker
========================= */

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(
          FILES_TO_CACHE
        );

      })

  );

  self.skipWaiting();
});


/* =========================
   เปิดใช้งาน Service Worker
========================= */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()
      .then(keys => {

        return Promise.all(

          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))

        );

      })

  );

  self.clients.claim();
});


/* =========================
   ระบบโหลดไฟล์แบบ Offline
========================= */

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(cachedResponse => {

        if (cachedResponse) {

          return cachedResponse;

        }

        return fetch(event.request);

      })

  );

});
