// Mind Reader - Service Worker minimale per PWA
const CACHE = 'mindreader-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Network first, fallback to cache (così le modifiche vengono prese subito)
  // ma NON intercettiamo le chiamate API a Anthropic
  if (e.request.url.includes('api.anthropic.com')) return;

  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
