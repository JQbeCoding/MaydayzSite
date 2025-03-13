// Name of the cache storage
const CACHE_NAME = "maydayz-cache-v1";

// List of files to cache
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/src/css/index.css",
  "/src/css/loading.css",
  "/src/js/loading.js",
  "/src/html/menu.html",
  "/src/html/aboutUs.html",
  "/src/html/order.html",
  "/src/html/login.html",
  "/src/css/assets/Images/maydayz__64_x_64_px___logo__lLA_icon.ico",
  "/src/html/assets/Images/Maydayz.webp",
  "/src/css/assets/Images/webp_images/IG.webp",
];

// Install event - Cache the files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching essential files");
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch((error) => {
        console.error("Caching failed:", error);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - Serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log("Serving from cache:", event.request.url);
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
      })
  );
});
